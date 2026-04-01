/**
 * Krampouz Badge System™ — Module d'Attribution des Distinctions
 *
 * Ce module implémente le système de badges gastronomiques attribués
 * aux fichiers analysés. Chaque badge représente un aspect qualitatif
 * du code, exprimé à travers le prisme culturel breton.
 *
 * Le système de badges est conforme à la spécification BREIZH-BADGE-2024,
 * ratifiée lors du Salon International de la Crêpe et du Code (SICC)
 * de Lorient, juin 2024.
 *
 * @module badges
 */

import { KrampouzReport, KrampouzMetrics } from "./analyzer";

// ─────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────

/** Types de badges disponibles dans le référentiel Krampouz */
export enum BadgeType {
  COIFFE_BIGOUDENE = "COIFFE_BIGOUDENE",
  MENHIR = "MENHIR",
  CREPE_BRULEE = "CREPE_BRULEE",
  BEURRE_SALE = "BEURRE_SALE",
  ANCRE_DOUARNENEZ = "ANCRE_DOUARNENEZ",
  BINIOU = "BINIOU",
  MAREE_HAUTE = "MAREE_HAUTE",
  MAREE_BASSE = "MAREE_BASSE",
  ROZELL_DOR = "ROZELL_DOR",
  CHOUCHEN_AWARD = "CHOUCHEN_AWARD",
}

/** Représentation complète d'un badge */
export interface Badge {
  type: BadgeType;
  emoji: string;
  nom: string;
  description: string;
  raison: string;
}

// ─────────────────────────────────────────────────────────
//  Catalogue des badges
// ─────────────────────────────────────────────────────────

/**
 * Catalogue officiel des badges Krampouz.
 *
 * Chaque badge a été conçu en collaboration avec des ethnologues bretons
 * et des experts en UX pour maximiser l'impact émotionnel sur le développeur.
 */
const BADGE_CATALOGUE: Record<BadgeType, Omit<Badge, "raison">> = {
  [BadgeType.COIFFE_BIGOUDENE]: {
    type: BadgeType.COIFFE_BIGOUDENE,
    emoji: "👩‍🍳",
    nom: "Coiffe Bigoudène",
    description:
      "Attribué aux fonctions haut de gamme : pures, bien typées, " +
      "élégantes comme la coiffe traditionnelle du Pays Bigouden.",
  },
  [BadgeType.MENHIR]: {
    type: BadgeType.MENHIR,
    emoji: "🗿",
    nom: "Menhir",
    description:
      "Données persistantes et constantes, solides comme les menhirs " +
      "de Carnac. Ce code traversera les âges.",
  },
  [BadgeType.CREPE_BRULEE]: {
    type: BadgeType.CREPE_BRULEE,
    emoji: "🔥",
    nom: "Crêpe Brûlée",
    description:
      "Code indigeste, trop complexe ou mal structuré. " +
      "Comme une crêpe oubliée sur le bilig : à refaire.",
  },
  [BadgeType.BEURRE_SALE]: {
    type: BadgeType.BEURRE_SALE,
    emoji: "🧈",
    nom: "Beurre Salé",
    description:
      "Code fluide, lisible, bien commenté. Le beurre salé du code : " +
      "on en met partout et c'est toujours meilleur.",
  },
  [BadgeType.ANCRE_DOUARNENEZ]: {
    type: BadgeType.ANCRE_DOUARNENEZ,
    emoji: "⚓",
    nom: "Ancre de Douarnenez",
    description:
      "Code legacy stable et fiable. Comme le port de Douarnenez, " +
      "il a traversé les tempêtes et tient bon.",
  },
  [BadgeType.BINIOU]: {
    type: BadgeType.BINIOU,
    emoji: "🎵",
    nom: "Biniou",
    description:
      "Fonctions qui 'sonnent juste' — nommage expressif et intentions " +
      "claires. Le code chante comme un biniou en fest-noz.",
  },
  [BadgeType.MAREE_HAUTE]: {
    type: BadgeType.MAREE_HAUTE,
    emoji: "🌊",
    nom: "Marée Haute",
    description:
      "Code performant, optimisé, rapide. Comme la marée montante " +
      "en baie de Saint-Brieuc : puissant et inexorable.",
  },
  [BadgeType.MAREE_BASSE]: {
    type: BadgeType.MAREE_BASSE,
    emoji: "🌑",
    nom: "Marée Basse",
    description:
      "Code lent, non optimisé. Comme la marée basse à marée " +
      "de coefficient 20 : ça ne bouge pas.",
  },
  [BadgeType.ROZELL_DOR]: {
    type: BadgeType.ROZELL_DOR,
    emoji: "✨",
    nom: "Rozell d'Or",
    description:
      "La distinction suprême. Décernée aux fichiers qui atteignent " +
      "la perfection crêpière absolue. Extrêmement rare.",
  },
  [BadgeType.CHOUCHEN_AWARD]: {
    type: BadgeType.CHOUCHEN_AWARD,
    emoji: "🍯",
    nom: "Prix du Chouchen",
    description:
      "Code doux et agréable à lire, comme un bon chouchen. " +
      "Attention toutefois : trop de douceur peut endormir la vigilance.",
  },
};

// ─────────────────────────────────────────────────────────
//  Classe BadgeAssigner
// ─────────────────────────────────────────────────────────

/**
 * Attribue les badges gastronomiques en fonction des métriques d'analyse.
 *
 * L'algorithme d'attribution suit un système de règles expertes,
 * élaboré lors d'ateliers de co-création avec des crêpiers artisanaux
 * et des architectes logiciels seniors.
 *
 * Un fichier peut recevoir plusieurs badges simultanément,
 * car un même plat peut être à la fois croustillant ET bien beurré.
 */
export class BadgeAssigner {
  /**
   * Évalue un rapport Krampouz et attribue les badges mérités.
   *
   * @param report - Rapport d'analyse Krampouz
   * @returns Liste des badges attribués avec leurs justifications
   */
  assignBadges(report: KrampouzReport): Badge[] {
    const badges: Badge[] = [];
    const m = report.metrics;

    // 👩‍🍳 Coiffe Bigoudène — Excellence fonctionnelle
    if (m.temperatureDuBilig >= 80 && m.homogeneiteDeLaPate >= 75) {
      badges.push(this.creerBadge(
        BadgeType.COIFFE_BIGOUDENE,
        "Complexité maîtrisée (bilig à " + m.temperatureDuBilig + "°) et " +
        "nommage cohérent (" + m.homogeneiteDeLaPate + "% d'homogénéité). " +
        "Digne du Pays Bigouden."
      ));
    }

    // 🗿 Menhir — Persistance et constance
    if (m.indiceCroustillance >= 70 && m.homogeneiteDeLaPate >= 80) {
      badges.push(this.creerBadge(
        BadgeType.MENHIR,
        "Code dense et structuré de façon cohérente. " +
        "Comme un menhir : pas prêt de bouger."
      ));
    }

    // 🔥 Crêpe Brûlée — Code indigeste
    if (report.scoreFinal <= 20) {
      badges.push(this.creerBadge(
        BadgeType.CREPE_BRULEE,
        "Score global de " + report.scoreFinal + "/100. " +
        "Cette crêpe est carbonisée. Retournez au CAP crêpier."
      ));
    }

    // 🧈 Beurre Salé — Fluidité
    if (m.tauxDeBeurre >= 70 && report.scoreFinal >= 60) {
      badges.push(this.creerBadge(
        BadgeType.BEURRE_SALE,
        "Taux de beurre optimal (" + m.tauxDeBeurre + "%). " +
        "Le code glisse tout seul, comme une crêpe bien beurrée."
      ));
    }

    // ⚓ Ancre de Douarnenez — Code legacy stable
    if (
      m.indiceCroustillance >= 50 &&
      m.temperatureDuBilig >= 60 &&
      m.tempsDeCuisson >= 60 &&
      report.scoreFinal >= 50 &&
      report.scoreFinal < 80
    ) {
      badges.push(this.creerBadge(
        BadgeType.ANCRE_DOUARNENEZ,
        "Code solide mais pas flamboyant. Stable comme le port de Douarnenez " +
        "par temps calme. On peut compter dessus."
      ));
    }

    // 🎵 Biniou — Bon nommage
    if (m.homogeneiteDeLaPate >= 85) {
      badges.push(this.creerBadge(
        BadgeType.BINIOU,
        "Homogénéité de la pâte exceptionnelle (" + m.homogeneiteDeLaPate + "%). " +
        "Le nommage sonne juste, comme un biniou kozh bien accordé."
      ));
    }

    // 🌊 Marée Haute — Performance
    if (m.tempsDeCuisson >= 85) {
      badges.push(this.creerBadge(
        BadgeType.MAREE_HAUTE,
        "Temps de cuisson optimal (" + m.tempsDeCuisson + "%). " +
        "Code léger et performant. La marée monte !"
      ));
    }

    // 🌑 Marée Basse — Lenteur
    if (m.tempsDeCuisson < 30) {
      badges.push(this.creerBadge(
        BadgeType.MAREE_BASSE,
        "Temps de cuisson catastrophique (" + m.tempsDeCuisson + "%). " +
        "Ce code est aussi lent que la marée basse un jour sans vent."
      ));
    }

    // ✨ Rozell d'Or — Perfection absolue
    if (report.scoreFinal >= 95) {
      badges.push(this.creerBadge(
        BadgeType.ROZELL_DOR,
        "Score exceptionnel de " + report.scoreFinal + "/100. " +
        "La Rozell d'Or vous est décernée. Vous êtes un(e) Maître Crêpier(e) du Code."
      ));
    }

    // 🍯 Prix du Chouchen — Code agréable
    if (
      m.tauxDeBeurre >= 60 &&
      m.homogeneiteDeLaPate >= 60 &&
      m.indiceCroustillance >= 60 &&
      report.scoreFinal >= 65 &&
      report.scoreFinal < 95
    ) {
      badges.push(this.creerBadge(
        BadgeType.CHOUCHEN_AWARD,
        "Code équilibré et agréable sur toutes les métriques. " +
        "Doux comme un chouchen artisanal. Yec'hed mat !"
      ));
    }

    return badges;
  }

  /**
   * Génère un rapport console complet avec badges et métriques.
   *
   * Le rapport utilise des caractères Unicode et des émojis pour
   * créer une expérience visuelle immersive, fidèle à l'esprit
   * de la crêperie bretonne traditionnelle.
   */
  generateConsoleReport(report: KrampouzReport, badges: Badge[]): void {
    const sep = "═".repeat(60);
    const sepThin = "─".repeat(60);

    console.log();
    console.log(`╔${sep}╗`);
    console.log(`║  🥞  RAPPORT KRAMPOUZ — Analyse Gastronomique du Code   ║`);
    console.log(`╠${sep}╣`);
    console.log(`║  Fichier : ${this.padRight(report.filePath, 47)}║`);
    console.log(`║  Date    : ${this.padRight(report.timestamp, 47)}║`);
    console.log(`║  Durée   : ${this.padRight(report.dureeAnalyseMs + "ms", 47)}║`);
    console.log(`║  Mode    : ${this.padRight(report.config.mode.toUpperCase() + " | Bilig " + report.config.diametreBiligCm + "cm", 47)}║`);
    console.log(`╠${sep}╣`);
    console.log(`║                                                            ║`);
    console.log(`║  📊 MÉTRIQUES DÉTAILLÉES                                   ║`);
    console.log(`║  ${sepThin}  ║`);

    this.printMetricLine("🫓 Indice de Croustillance", report.metrics.indiceCroustillance);
    this.printMetricLine("🧈 Taux de Beurre", report.metrics.tauxDeBeurre);
    this.printMetricLine("🔥 Température du Bilig", report.metrics.temperatureDuBilig);
    this.printMetricLine("🥄 Homogénéité de la Pâte", report.metrics.homogeneiteDeLaPate);
    this.printMetricLine("⏱️  Temps de Cuisson", report.metrics.tempsDeCuisson);

    console.log(`║  ${sepThin}  ║`);
    console.log(`║                                                            ║`);

    // Score final avec barre visuelle
    const barLength = 30;
    const filled = Math.round((report.scoreFinal / 100) * barLength);
    const bar = "█".repeat(filled) + "░".repeat(barLength - filled);

    console.log(`║  🏆 SCORE FINAL : ${report.scoreFinal}/100                              ║`);
    console.log(`║     [${bar}]               ║`);
    console.log(`║     ${this.padRight(report.label, 54)}║`);
    console.log(`║                                                            ║`);

    // Badges
    if (badges.length > 0) {
      console.log(`╠${sep}╣`);
      console.log(`║  🏅 BADGES ATTRIBUÉS (${badges.length})                                  ║`);
      console.log(`║  ${sepThin}  ║`);

      for (const badge of badges) {
        console.log(`║                                                            ║`);
        console.log(`║  ${badge.emoji}  ${this.padRight(badge.nom, 54)}║`);
        // Wrap la raison sur plusieurs lignes si nécessaire
        const raisonLines = this.wrapText(badge.raison, 54);
        for (const line of raisonLines) {
          console.log(`║     ${this.padRight(line, 54)}║`);
        }
      }
    }

    // Recommandations du chef
    if (report.recommandationsDuChef.length > 0) {
      console.log(`║                                                            ║`);
      console.log(`╠${sep}╣`);
      console.log(`║  👨‍🍳 RECOMMANDATIONS DU CHEF                                ║`);
      console.log(`║  ${sepThin}  ║`);

      for (const reco of report.recommandationsDuChef) {
        console.log(`║                                                            ║`);
        const recoLines = this.wrapText(reco, 56);
        for (const line of recoLines) {
          console.log(`║  ${this.padRight(line, 56)}  ║`);
        }
      }
    }

    console.log(`║                                                            ║`);
    console.log(`╠${sep}╣`);
    console.log(`║  Kenavo ! Trugarez da lenn ar rapport-mañ. 🏴󠁦󠁲󠁢󠁲󠁥󠁿            ║`);
    console.log(`║  « Le code, c'est comme les crêpes : ça s'améliore       ║`);
    console.log(`║    avec la pratique. »                                     ║`);
    console.log(`╚${sep}╝`);
    console.log();
  }

  // ─────────────────────────────────────────
  //  Méthodes utilitaires privées
  // ─────────────────────────────────────────

  private creerBadge(type: BadgeType, raison: string): Badge {
    const template = BADGE_CATALOGUE[type];
    return { ...template, raison };
  }

  private printMetricLine(label: string, value: number): void {
    const barLen = 20;
    const filled = Math.round((value / 100) * barLen);
    const miniBar = "▓".repeat(filled) + "░".repeat(barLen - filled);
    const qualite = value >= 80 ? "✅" : value >= 50 ? "⚠️ " : "❌";

    console.log(
      `║  ${this.padRight(label, 28)} ${miniBar} ${this.padRight(value + "/100", 8)}${qualite} ║`
    );
  }

  private padRight(str: string, length: number): string {
    if (str.length >= length) return str.substring(0, length);
    return str + " ".repeat(length - str.length);
  }

  private wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + " " + word).trim().length > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + " " + word : word;
      }
    }
    if (currentLine) lines.push(currentLine);

    return lines;
  }
}
