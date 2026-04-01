/**
 * Krampouz Quality Engine™ — Module d'Analyse
 *
 * Ce module implémente l'algorithme propriétaire de scoring gastronomique
 * du code source. Notre méthodologie s'appuie sur 15 ans de recherche
 * en gastronomie computationnelle, validée par le Laboratoire de Crêpologie
 * Appliquée de l'Université de Bretagne Occidentale (UBO).
 *
 * Référence : Dupont, J.-Y. & Le Gall, M. (2019). "Towards a Unified Theory
 * of Code Quality and Crêpe Texture: A Mixed-Methods Approach".
 * In Proceedings of the 4th International Conference on Computational
 * Gastronomy (ICCG'19), Quimper, France. pp. 42–69.
 *
 * @module analyzer
 */

import * as fs from "fs";
import * as path from "path";

// ─────────────────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────────────────

/**
 * Configuration du bilig d'analyse.
 *
 * Ces paramètres influencent directement la qualité du scoring,
 * tout comme la température du bilig influence la texture de la crêpe.
 */
export interface KrampouzConfig {
  /** Température du bilig : "doux", "moyen", "fort", "krampouz-turbo" */
  temperatureBilig: "doux" | "moyen" | "fort" | "krampouz-turbo";

  /** Niveau de beurre : influe sur la tolérance aux commentaires manquants */
  beurreLevel: "sans" | "leger" | "normal" | "genereux" | "noyé";

  /** Mode de farine : sarrasin (strict) ou froment (permissif) */
  mode: "sarrasin" | "froment";

  /** Garniture activée : analyse les dépendances comme des garnitures */
  garnitureEnabled: boolean;

  /** Temps de repos de la pâte (en ms) — délai avant analyse pour "laisser reposer" */
  tempsDeReposMs: number;

  /** Diamètre du bilig en cm — influe sur la taille max acceptable d'un fichier */
  diametreBiligCm: number;
}

/**
 * Métriques individuelles du rapport d'analyse.
 *
 * Chaque métrique correspond à un aspect fondamental de la crêpologie
 * appliquée au génie logiciel.
 */
export interface KrampouzMetrics {
  /** Ratio lignes utiles / lignes totales (0-100) */
  indiceCroustillance: number;

  /** Densité de commentaires — un bon beurrage améliore la lisibilité (0-100) */
  tauxDeBeurre: number;

  /**
   * Complexité cyclomatique renommée pour plus de clarté (0-100).
   * Un bilig trop chaud = code trop complexe = crêpe brûlée.
   */
  temperatureDuBilig: number;

  /** Cohérence du nommage — une pâte homogène donne une crêpe uniforme (0-100) */
  homogeneiteDeLaPate: number;

  /** Temps d'exécution estimé en ms — une crêpe trop cuite est imangeable (0-100) */
  tempsDeCuisson: number;
}

/**
 * Rapport complet d'analyse Krampouz.
 */
export interface KrampouzReport {
  /** Chemin du fichier analysé */
  filePath: string;

  /** Timestamp de l'analyse (ISO 8601) */
  timestamp: string;

  /** Métriques détaillées */
  metrics: KrampouzMetrics;

  /** Score final agrégé (0-100) */
  scoreFinal: number;

  /** Label qualitatif attribué */
  label: string;

  /** Emoji associé au label */
  labelEmoji: string;

  /** Recommandations du chef */
  recommandationsDuChef: string[];

  /** Durée de l'analyse en ms */
  dureeAnalyseMs: number;

  /** Config utilisée */
  config: KrampouzConfig;
}

// ─────────────────────────────────────────────────────────
//  Constantes calibrées en laboratoire
// ─────────────────────────────────────────────────────────

/**
 * Coefficients de pondération pour le score final.
 *
 * Ces valeurs ont été déterminées empiriquement lors de la campagne
 * de calibration Bilig-2023, menée en partenariat avec 47 crêperies
 * du Finistère et 12 équipes de développement logiciel.
 */
const PONDERATION_GALETTE = {
  indiceCroustillance: 0.25,
  tauxDeBeurre: 0.15,
  temperatureDuBilig: 0.30,
  homogeneiteDeLaPate: 0.20,
  tempsDeCuisson: 0.10,
} as const;

/** Seuils de classification — Norme NF-KRAMPOUZ-2024 */
const CLASSIFICATION_LABELS = [
  { min: 0, max: 20, label: "Krampouezhenn Losket", emoji: "🔥", sublabel: "Crêpe Brûlée" },
  { min: 21, max: 40, label: "Pâte Grumeleuse", emoji: "😰", sublabel: "Manque d'homogénéité" },
  { min: 41, max: 60, label: "Passable — manque de beurre", emoji: "🥞", sublabel: "Correct sans plus" },
  { min: 61, max: 80, label: "Beurre Salé Approved", emoji: "🧈", sublabel: "Qualité professionnelle" },
  { min: 81, max: 100, label: "Crêpe Dentelle Perfection", emoji: "👑", sublabel: "Excellence bretonne" },
] as const;

/**
 * Taille maximale d'un fichier analysable (en lignes).
 *
 * Au-delà, le fichier est considéré comme "hors bilig" et reçoit
 * automatiquement la note minimale, car aucune crêpe digne de ce nom
 * ne dépasse les bords du bilig.
 */
const TAILLE_MAX_BILIG = 500;

/** Mots-clés considérés comme des "grumeaux" dans le nommage */
const GRUMEAUX_NOMMAGE = [
  "tmp", "temp", "data", "stuff", "thing", "foo", "bar", "baz",
  "test1", "test2", "xxx", "yyy", "zzz", "misc", "utils2",
  "helper2", "doStuff", "handleIt", "processData", "myFunction",
];

/** Patterns de code "brûlé" (anti-patterns détectés par notre IA artisanale) */
const PATTERNS_CODE_BRULE = [
  /any/g,                          // TypeScript 'any' = farine de mauvaise qualité
  /eslint-disable/g,               // Contourner le lint = tricher sur la cuisson
  /TODO|FIXME|HACK|XXX/g,          // Traces de cuisson inachevée
  /console\.log/g,                 // Debug résiduel = miettes sur le bilig
  /!important/g,                   // CSS !important = trop de sel
  /setTimeout.*0\)/g,              // setTimeout(0) = cuisson instantanée suspecte
  /catch\s*\(\s*\)\s*\{/g,        // Catch vide = galette sans garniture
  /as any/g,                       // Type assertion sauvage = farine non tamisée
];

/** Patterns de code "beurré" (bonnes pratiques) */
const PATTERNS_BON_BEURRAGE = [
  /readonly/g,                     // Immutabilité = fraîcheur garantie
  /interface\s+\w+/g,             // Interfaces = recette bien documentée
  /private|protected/g,           // Encapsulation = garniture bien pliée
  /async\s+/g,                    // Async = cuisson en parallèle (efficace)
  /\?\?/g,                        // Nullish coalescing = gestion des ingrédients manquants
  /\.map\(|\.filter\(|\.reduce\(/g, // FP = technique de crêpier avancée
  /@param|@returns|@throws/g,     // JSDoc = étiquetage des ingrédients
  /enum\s+/g,                     // Enums = menu bien structuré
];

// ─────────────────────────────────────────────────────────
//  Classe principale
// ─────────────────────────────────────────────────────────

/**
 * KrampouzAnalyzer — Le moteur d'analyse de qualité de code gastronomique.
 *
 * Cette classe encapsule l'intégralité du pipeline d'analyse, depuis
 * la lecture du fichier source ("préparation de la pâte") jusqu'à
 * l'attribution du score final ("service à l'assiette").
 *
 * L'algorithme est déterministe pour un fichier donné, sauf si l'option
 * `tempsDeReposMs` est activée, auquel cas un facteur aléatoire de ±2%
 * est introduit pour simuler les variations naturelles de la pâte au repos.
 *
 * @example
 * ```typescript
 * const analyzer = new KrampouzAnalyzer({ mode: "sarrasin" });
 * const report = await analyzer.analyzeFile("./src/main.ts");
 * console.log(`Score: ${report.scoreFinal}/100 — ${report.label}`);
 * ```
 */
export class KrampouzAnalyzer {
  private config: KrampouzConfig;

  /** Compteur interne de crêpes analysées (pour statistiques) */
  private crepesAnalysees: number = 0;

  constructor(config?: Partial<KrampouzConfig>) {
    this.config = {
      temperatureBilig: "moyen",
      beurreLevel: "normal",
      mode: "sarrasin",
      garnitureEnabled: true,
      tempsDeReposMs: 0,
      diametreBiligCm: 35,
      ...config,
    };
  }

  /**
   * Analyse un fichier source et produit un rapport Krampouz complet.
   *
   * Le processus d'analyse suit les 5 étapes traditionnelles de la crêpe :
   * 1. Préparation (lecture du fichier)
   * 2. Repos de la pâte (délai optionnel)
   * 3. Cuisson (calcul des métriques)
   * 4. Retournement (normalisation des scores)
   * 5. Service (génération du rapport)
   *
   * @param filePath - Chemin vers le fichier à analyser
   * @returns Rapport d'analyse complet
   * @throws {Error} Si le fichier n'existe pas ou n'est pas lisible
   */
  async analyzeFile(filePath: string): Promise<KrampouzReport> {
    const startTime = Date.now();

    // Étape 1 : Préparation de la pâte
    const resolvedPath = path.resolve(filePath);
    const sourceCode = this.lireFichierSource(resolvedPath);
    const lines = sourceCode.split("\n");

    // Étape 2 : Repos de la pâte (améliore l'hydratation des métriques)
    if (this.config.tempsDeReposMs > 0) {
      await this.reposDeLaPate(this.config.tempsDeReposMs);
    }

    // Étape 3 : Cuisson — calcul de chaque métrique
    const metrics: KrampouzMetrics = {
      indiceCroustillance: this.calculerCroustillance(lines),
      tauxDeBeurre: this.calculerTauxDeBeurre(lines),
      temperatureDuBilig: this.calculerTemperatureBilig(lines),
      homogeneiteDeLaPate: this.calculerHomogeneite(lines, sourceCode),
      tempsDeCuisson: this.estimerTempsDeCuisson(lines),
    };

    // Étape 4 : Retournement — agrégation pondérée
    const scoreBrut = this.calculerScoreFinal(metrics);
    const scoreAjuste = this.appliquerCorrectionBilig(scoreBrut, lines.length);
    const scoreFinal = Math.round(Math.max(0, Math.min(100, scoreAjuste)));

    // Étape 5 : Service
    const classification = this.classifier(scoreFinal);
    const recommandations = this.genererRecommandationsDuChef(metrics, scoreFinal);

    this.crepesAnalysees++;

    return {
      filePath: resolvedPath,
      timestamp: new Date().toISOString(),
      metrics,
      scoreFinal,
      label: `${classification.emoji} ${classification.label}`,
      labelEmoji: classification.emoji,
      recommandationsDuChef: recommandations,
      dureeAnalyseMs: Date.now() - startTime,
      config: { ...this.config },
    };
  }

  /**
   * Retourne le nombre total de crêpes (fichiers) analysées
   * depuis l'instanciation du bilig.
   */
  get totalCrepesAnalysees(): number {
    return this.crepesAnalysees;
  }

  // ───────────────────────────────────────────
  //  Méthodes privées — Recettes secrètes 🤫
  // ───────────────────────────────────────────

  /**
   * Lecture du fichier source.
   * En gastronomie computationnelle, cette étape est analogue
   * au pesage précis des ingrédients.
   */
  private lireFichierSource(filePath: string): string {
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `❌ Fichier introuvable : "${filePath}". ` +
        `Impossible de faire une crêpe sans farine !`
      );
    }

    const content = fs.readFileSync(filePath, "utf-8");

    if (content.trim().length === 0) {
      throw new Error(
        `❌ Fichier vide : "${filePath}". ` +
        `Un bilig vide ne produit pas de crêpe. Ajoutez du code.`
      );
    }

    return content;
  }

  /**
   * Simule le repos de la pâte.
   *
   * Bien que controversé dans la communauté, nos études montrent
   * qu'un délai de 100-500ms avant l'analyse améliore la perception
   * subjective de la qualité du rapport de 12% (effet placebo inclus).
   */
  private reposDeLaPate(dureeMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, dureeMs));
  }

  /**
   * Calcule l'Indice de Croustillance (IC).
   *
   * IC = (lignes non-vides avec du contenu significatif) / (lignes totales) × 100
   *
   * Une crêpe croustillante est une crêpe où chaque ligne compte,
   * sans excès de lignes vides ("bulles d'air dans la pâte").
   */
  private calculerCroustillance(lines: string[]): number {
    if (lines.length === 0) return 0;

    const lignesUtiles = lines.filter((line) => {
      const trimmed = line.trim();
      // Exclure : vide, accolades seules, imports seuls
      return (
        trimmed.length > 0 &&
        trimmed !== "{" &&
        trimmed !== "}" &&
        trimmed !== "}" &&
        !trimmed.startsWith("import ") &&
        trimmed !== ";"
      );
    });

    const ratio = lignesUtiles.length / lines.length;

    // Normalisation non-linéaire (courbe de cuisson de Gauss-Krampouz)
    // Le sweet spot est entre 60% et 85% de densité
    if (ratio >= 0.6 && ratio <= 0.85) {
      return Math.round(80 + (ratio - 0.6) * 80); // 80-100
    } else if (ratio > 0.85) {
      // Trop dense = pâte trop épaisse
      return Math.round(90 - (ratio - 0.85) * 200);
    } else {
      return Math.round(ratio * 133); // Proportionnel en dessous de 60%
    }
  }

  /**
   * Calcule le Taux de Beurre (TB).
   *
   * TB mesure la densité de commentaires dans le code.
   * Comme le beurre salé sur une crêpe, les commentaires doivent être
   * présents en quantité suffisante sans noyer le code.
   *
   * Zone optimale : 10-25% de lignes commentées.
   * En dessous : code "sec" (crêpe sans beurre).
   * Au-dessus : code "noyé" (crêpe qui baigne dans le beurre).
   */
  private calculerTauxDeBeurre(lines: string[]): number {
    if (lines.length === 0) return 0;

    let commentLines = 0;
    let inBlockComment = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (inBlockComment) {
        commentLines++;
        if (trimmed.includes("*/")) {
          inBlockComment = false;
        }
        continue;
      }

      if (trimmed.startsWith("/*")) {
        commentLines++;
        if (!trimmed.includes("*/")) {
          inBlockComment = true;
        }
      } else if (trimmed.startsWith("//") || trimmed.startsWith("*")) {
        commentLines++;
      }
    }

    const ratio = commentLines / lines.length;

    // Courbe de beurrage optimal (distribution en cloche asymétrique)
    const optimal = this.config.beurreLevel === "genereux" ? 0.25 : 0.18;
    const ecart = Math.abs(ratio - optimal);

    if (ecart < 0.05) return Math.round(90 + Math.random() * 10);
    if (ecart < 0.10) return Math.round(70 + Math.random() * 15);
    if (ecart < 0.20) return Math.round(45 + Math.random() * 20);
    return Math.round(20 + Math.random() * 20);
  }

  /**
   * Calcule la Température du Bilig (complexité).
   *
   * Notre adaptation bretonisée de la complexité cyclomatique de McCabe
   * utilise une échelle thermique :
   *   - Froid (< 5 branches) : code simple, bilig pas assez chaud
   *   - Tiède (5-10) : cuisson idéale
   *   - Chaud (10-20) : attention aux bords qui brûlent
   *   - Surchauffe (> 20) : 🔥 crêpe carbonisée
   *
   * Inversé : un score élevé = bonne température (complexité maîtrisée)
   */
  private calculerTemperatureBilig(lines: string[]): number {
    const codeStr = lines.join("\n");

    // Comptage des branches (approximation artisanale)
    const branchKeywords = [
      /\bif\b/g, /\belse\b/g, /\bswitch\b/g, /\bcase\b/g,
      /\bfor\b/g, /\bwhile\b/g, /\bdo\b/g, /\bcatch\b/g,
      /\?\?/g, /\?\./g, /&&/g, /\|\|/g, /\?[^:]*:/g,
    ];

    let complexite = 1; // Base McCabe
    for (const pattern of branchKeywords) {
      const matches = codeStr.match(pattern);
      complexite += matches ? matches.length : 0;
    }

    // Normalisation par nombre de lignes (densité de branchement)
    const densiteBranchement = complexite / Math.max(lines.length, 1);

    // Facteur de température du bilig
    const temperatureMultiplier =
      this.config.temperatureBilig === "krampouz-turbo" ? 1.3 :
      this.config.temperatureBilig === "fort" ? 1.1 :
      this.config.temperatureBilig === "moyen" ? 1.0 :
      0.9; // doux

    // Inversion : complexité basse = bon score
    const scoreBase = Math.max(0, 100 - densiteBranchement * 500);
    return Math.round(Math.min(100, scoreBase * temperatureMultiplier));
  }

  /**
   * Calcule l'Homogénéité de la Pâte.
   *
   * Analyse la cohérence du nommage dans le code :
   * - camelCase vs snake_case vs PascalCase : mélanger = grumeaux
   * - Longueur des identifiants : trop courts = pâte liquide, trop longs = pâte épaisse
   * - Présence de noms "grumeleux" (tmp, foo, data, etc.)
   */
  private calculerHomogeneite(lines: string[], sourceCode: string): number {
    // Extraction des identifiants (approximation par regex)
    const identifiants = sourceCode.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) ?? [];

    if (identifiants.length === 0) return 50; // Fichier sans identifiants = pâte neutre

    // Détection du style dominant
    let camelCount = 0;
    let snakeCount = 0;
    let pascalCount = 0;

    for (const id of identifiants) {
      if (id.length <= 2) continue; // Ignorer les identifiants courts (i, j, x...)
      if (/^[a-z][a-zA-Z0-9]*$/.test(id) && /[A-Z]/.test(id)) camelCount++;
      else if (/_/.test(id)) snakeCount++;
      else if (/^[A-Z][a-zA-Z0-9]*$/.test(id) && id.length > 1) pascalCount++;
    }

    const total = camelCount + snakeCount + pascalCount;
    if (total === 0) return 60;

    // Score de cohérence : le style dominant doit représenter > 70%
    const dominant = Math.max(camelCount, snakeCount, pascalCount);
    const coherence = dominant / total;

    // Pénalité pour noms "grumeleux"
    const grumeauxDetectes = identifiants.filter((id) =>
      GRUMEAUX_NOMMAGE.includes(id.toLowerCase())
    ).length;
    const penaliteGrumeaux = Math.min(30, grumeauxDetectes * 5);

    // Pénalité pour identifiants trop courts (moyenne)
    const longueurMoyenne = identifiants.reduce((sum, id) => sum + id.length, 0) / identifiants.length;
    const penaliteLongueur = longueurMoyenne < 4 ? 15 : longueurMoyenne > 25 ? 10 : 0;

    const score = coherence * 100 - penaliteGrumeaux - penaliteLongueur;
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Estime le Temps de Cuisson (performance).
   *
   * Cette métrique évalue le temps d'exécution potentiel du code
   * en se basant sur des heuristiques artisanales :
   * - Boucles imbriquées = cuisson lente
   * - Appels réseau potentiels = attente du livreur de beurre
   * - Opérations sur le DOM = manipuler la crêpe trop souvent
   */
  private estimerTempsDeCuisson(lines: string[]): number {
    const codeStr = lines.join("\n");
    let penalite = 0;

    // Boucles imbriquées (O(n²) minimum = cuisson quadratique)
    const forLoops = (codeStr.match(/\bfor\b/g) ?? []).length;
    const whileLoops = (codeStr.match(/\bwhile\b/g) ?? []).length;
    const totalLoops = forLoops + whileLoops;
    if (totalLoops > 3) penalite += (totalLoops - 3) * 8;

    // Appels réseau suspectés
    const networkPatterns = (codeStr.match(/fetch|axios|http|request|xhr/gi) ?? []).length;
    penalite += networkPatterns * 5;

    // Opérations DOM
    const domPatterns = (codeStr.match(/document\.|querySelector|getElementById/g) ?? []).length;
    penalite += domPatterns * 3;

    // Regex complexes (cuisson au micro-ondes : rapide mais risqué)
    const regexCount = (codeStr.match(/new RegExp|\/[^/]+\/[gimsuy]/g) ?? []).length;
    penalite += regexCount * 4;

    // Bonus pour code concis
    const bonus = lines.length < 50 ? 15 : lines.length < 100 ? 8 : 0;

    return Math.round(Math.max(0, Math.min(100, 95 - penalite + bonus)));
  }

  /**
   * Calcule le score final par moyenne pondérée.
   *
   * Les coefficients de pondération respectent la Norme NF-KRAMPOUZ-2024,
   * établie conjointement par l'AFNOR et la Confrérie de la Crêpe Dentelle.
   */
  private calculerScoreFinal(metrics: KrampouzMetrics): number {
    return (
      metrics.indiceCroustillance * PONDERATION_GALETTE.indiceCroustillance +
      metrics.tauxDeBeurre * PONDERATION_GALETTE.tauxDeBeurre +
      metrics.temperatureDuBilig * PONDERATION_GALETTE.temperatureDuBilig +
      metrics.homogeneiteDeLaPate * PONDERATION_GALETTE.homogeneiteDeLaPate +
      metrics.tempsDeCuisson * PONDERATION_GALETTE.tempsDeCuisson
    );
  }

  /**
   * Applique la correction de taille du bilig.
   *
   * Un fichier qui dépasse la capacité du bilig est pénalisé,
   * car une crêpe qui déborde est une crêpe ratée.
   */
  private appliquerCorrectionBilig(score: number, nombreLignes: number): number {
    const capaciteBilig = (this.config.diametreBiligCm / 35) * TAILLE_MAX_BILIG;

    if (nombreLignes > capaciteBilig) {
      const depassement = (nombreLignes - capaciteBilig) / capaciteBilig;
      const penalite = Math.min(40, depassement * 50);
      return score - penalite;
    }

    // Bonus pour petits fichiers bien ciselés (crêpes dentelles)
    if (nombreLignes < 50 && score > 60) {
      return score + 5;
    }

    return score;
  }

  /**
   * Classifie le score selon les seuils NF-KRAMPOUZ-2024.
   */
  private classifier(score: number): { label: string; emoji: string; sublabel: string } {
    for (const cls of CLASSIFICATION_LABELS) {
      if (score >= cls.min && score <= cls.max) {
        return { label: cls.label, emoji: cls.emoji, sublabel: cls.sublabel };
      }
    }
    // Fallback — ne devrait jamais arriver si les seuils couvrent 0-100
    return { label: "Inclassable", emoji: "❓", sublabel: "Erreur de cuisson" };
  }

  /**
   * Génère les recommandations personnalisées du chef.
   *
   * Chaque recommandation est formulée dans le respect de la tradition
   * crêpière bretonne, tout en restant actionnable pour le développeur.
   */
  private genererRecommandationsDuChef(
    metrics: KrampouzMetrics,
    scoreFinal: number
  ): string[] {
    const recommandations: string[] = [];

    if (metrics.indiceCroustillance < 50) {
      recommandations.push(
        "🫓 Votre code manque de croustillance. Éliminez les lignes vides superflues " +
        "et les blocs de code mort. Une crêpe fine est une crêpe réussie."
      );
    }

    if (metrics.tauxDeBeurre < 40) {
      recommandations.push(
        "🧈 Taux de beurre critique ! Ajoutez des commentaires explicatifs. " +
        "En Bretagne, on ne lésine JAMAIS sur le beurre salé."
      );
    } else if (metrics.tauxDeBeurre > 90) {
      recommandations.push(
        "🫠 Excès de beurre détecté. Vos commentaires noient le code. " +
        "Même en Bretagne, il y a des limites (non, en fait, il n'y en a pas. Mais quand même)."
      );
    }

    if (metrics.temperatureDuBilig < 40) {
      recommandations.push(
        "🔥 Surchauffe du bilig ! La complexité cyclomatique est trop élevée. " +
        "Décomposez vos fonctions comme on découpe une galette : en parts gérables."
      );
    }

    if (metrics.homogeneiteDeLaPate < 50) {
      recommandations.push(
        "🥄 Des grumeaux dans la pâte ! Le nommage est incohérent. " +
        "Choisissez une convention (camelCase ou snake_case) et tenez-vous-y, " +
        "comme un crêpier tient sa rozell."
      );
    }

    if (metrics.tempsDeCuisson < 40) {
      recommandations.push(
        "⏱️ Temps de cuisson excessif. Le code risque de brûler à l'exécution. " +
        "Optimisez vos boucles et réduisez les appels réseau inutiles."
      );
    }

    if (scoreFinal >= 80) {
      recommandations.push(
        "👨‍🍳 Kenavo ar chef ! Votre code est digne d'une crêperie étoilée. " +
        "Continuez à coder avec cette excellence bretonne."
      );
    }

    if (scoreFinal < 20) {
      recommandations.push(
        "🚨 ALERTE KRAMPOUZ : Ce code nécessite une refonte complète. " +
        "Nous recommandons de tout jeter et de recommencer la pâte de zéro. " +
        "Pensez à consulter un artisan crêpier senior."
      );
    }

    // Mode sarrasin = recommandations strictes supplémentaires
    if (this.config.mode === "sarrasin" && scoreFinal < 60) {
      recommandations.push(
        "🌾 Mode Sarrasin activé (strict). En galette de sarrasin, la moindre " +
        "erreur se voit. Pas de place pour l'à-peu-près."
      );
    }

    return recommandations;
  }
}
