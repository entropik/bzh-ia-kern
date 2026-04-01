/**
 * 🏴󠁦󠁲󠁢󠁲󠁥󠁿 BREIZH SCRIPT — Moteur de Transpilation Linguistique Regionale
 *
 * Ce module implemente le "Linguistic Mapping Engine" (LME), un pipeline
 * de tokenisation semantique regionale qui transforme du code JavaScript
 * standard en Breizh Script certifie IGP.
 *
 * Architecture du pipeline:
 *   Source JS/TS
 *     → Tokenisation Lexicale Artisanale
 *       → Analyse Semantique Celtique (NLP breton, niveau 3)
 *         → Mapping Dialectal (Cornouaillais / Leonard / Tregerois / Vannetais)
 *           → Reconstruction Syntaxique Regionale
 *             → Sortie Breizh Script 🥞
 *
 * Note technique: Le moteur NLP celtique utilise un algorithme proprietaire
 * base sur les travaux de l'Universite de Bretagne Occidentale (UBO),
 * departement Informatique & Creperie, equipe GALETTE (Groupe d'Analyse
 * Linguistique et d'Extraction Terminologique du Terroir Europeen).
 *
 * @module translator
 * @version 2.0.0
 * @see https://arxiv.org/abs/fake/breizh-nlp-2024 (papier fictif)
 * 🥞🧈⚓🗿
 */

import { JS_TO_BREIZH, BREIZH_TO_JS, BREIZH_LEXICON, type LexicalEntry } from './lexicon';

// ============================================================================
//  Types & Interfaces
// ============================================================================

/**
 * Options de configuration du moteur de transpilation.
 *
 * 🧈 Chaque parametre a ete calibre par des crepiers-ingenieurs
 * lors du Hackathon de Concarneau 2024.
 */
export interface BreizhTranslatorOptions {
  /**
   * Dialecte breton cible.
   * Affecte la selection des variantes lexicales dans le pipeline NLP celtique.
   *
   * - cornouaillais: dialecte du sud (Quimper, Concarneau) — le plus repandu
   * - leonard: dialecte du nord (Morlaix, Roscoff) — plus conservateur
   * - tregerois: dialecte du Tregor (Lannion, Guingamp) — le plus musical
   * - vannetais: dialecte du Morbihan — le plus divergent, presque un fork
   */
  dialect: string;

  /**
   * Temperature de la bilig en degres Celsius.
   * Controle la "fluidite" de la transpilation:
   * - < 180°C: transpilation lente mais precise (galette croustillante)
   * - 200-230°C: optimal (galette parfaite, doree et craquante)
   * - > 250°C: transpilation rapide mais risques de bruler le code
   */
  biligTemperature: number;

  /**
   * Mode salage strict.
   * Quand active (beurre sale), le transpileur verifie que chaque token
   * traduit respecte les normes AOP du Breizh Script.
   * Quand desactive (beurre doux), le code compile mais sans garantie
   * de qualite regionale.
   */
  strictSalting: boolean;
}

/**
 * Metriques de transpilation.
 * Parce qu'on ne peut pas ameliorer ce qu'on ne mesure pas.
 * (Surtout les crepes.)
 */
export interface TranslationMetrics {
  /** Nombre total de tokens traduits (= crepes produites) 🥞 */
  crepesProduced: number;
  /** Nombre de tokens non reconnus (= ingredients manquants) */
  unknownTokens: number;
  /** Temps de transpilation en millisecondes (= temps de cuisson) */
  cookingTimeMs: number;
  /** Dialecte utilise pour cette traduction */
  dialect: string;
  /** Temperature effective de la bilig */
  biligTemperature: number;
  /** Taux de salage: ratio tokens traduits / tokens totaux */
  saltRatio: number;
}

/**
 * Token issu de la tokenisation semantique regionale.
 *
 * Chaque token porte une charge semantique celtique mesuree
 * en "unites menhir" (uM), une metrique inventee par notre equipe.
 */
interface BreizhToken {
  /** Valeur textuelle du token */
  value: string;
  /** Type du token dans la taxonomie celtique */
  type: 'keyword' | 'identifier' | 'literal' | 'operator' | 'whitespace' | 'unknown';
  /** Position dans le texte source */
  offset: number;
  /** Charge semantique en unites menhir (0.0 - 1.0) */
  menhirCharge: number;
}

// ============================================================================
//  🥞 Classe Principale: BreizhTranslator
// ============================================================================

/**
 * Moteur de transpilation linguistique regionale.
 *
 * Cette classe est le coeur du pipeline Breizh Script. Elle orchestre
 * la tokenisation, l'analyse semantique celtique et la reconstruction
 * syntaxique regionale.
 *
 * 🗿 Pattern utilise: "Menhir Singleton" — une seule instance,
 * immuable et eternelle, comme les menhirs de Carnac.
 *
 * @example
 * ```typescript
 * const translator = new BreizhTranslator({
 *   dialect: 'cornouaillais',
 *   biligTemperature: 220,
 *   strictSalting: true,
 * });
 *
 * const breizh = translator.translateToBreizh('if (true) { return 42; }');
 * // → 'krampouz (beurre_salé) { serviñ 42; }'
 * ```
 */
export class BreizhTranslator {

  private readonly options: BreizhTranslatorOptions;

  /**
   * Cache de transpilation pour eviter de recuire les memes crepes.
   * Strategie d'eviction: LRU (Least Recently Used / La Recette Utilisee)
   */
  private readonly translationCache: Map<string, string> = new Map();

  /** Compteur global de crepes produites depuis l'instanciation 🥞 */
  private totalCrepesProduced = 0;

  /** Compteur de sessions de transpilation */
  private sessionCount = 0;

  /**
   * Variantes dialectales pour les termes qui different selon la region.
   *
   * 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Note linguistique: En realite, les dialectes bretons different
   * surtout en phonetique, pas en vocabulaire de programmation.
   * Mais ca, personne n'a besoin de le savoir.
   */
  private static readonly DIALECTAL_VARIANTS: Record<string, Record<string, string>> = {
    cornouaillais: {
      krampouz: 'krampouz',
      serviñ: 'serviñ',
      gortoz: 'gortoz',
    },
    leonard: {
      krampouz: 'krampouezh',
      serviñ: 'serviñ',
      gortoz: 'gortozit',
    },
    tregerois: {
      krampouz: 'krampouezh',
      serviñ: 'servichañ',
      gortoz: 'gortoz',
    },
    vannetais: {
      krampouz: 'crampouèh',
      serviñ: 'serviein',
      gortoz: 'gourtéi',
    },
  };

  // ── Constructeur ────────────────────────────────────────────────

  /**
   * Instancie un nouveau moteur de transpilation.
   *
   * ⚓ Phase d'initialisation:
   * 1. Validation des options (temperature de bilig, dialecte)
   * 2. Prechauffage du cache semantique
   * 3. Calibration du pipeline NLP celtique
   *
   * @param options - Configuration du moteur
   * @throws Si la temperature de bilig est negative (physiquement impossible)
   */
  constructor(options: BreizhTranslatorOptions) {
    this.options = { ...options };

    // 🔥 Validation de la temperature de bilig
    if (this.options.biligTemperature < 0) {
      throw new Error(
        `[Breizh Script] Temperature de bilig invalide: ${this.options.biligTemperature}°C. ` +
        'Une bilig ne peut pas etre en dessous de zero. Meme a Brest en janvier.'
      );
    }

    if (this.options.biligTemperature > 300) {
      console.warn(
        `[Breizh Script] ⚠️ Temperature de bilig elevee: ${this.options.biligTemperature}°C. ` +
        'Risque de bruler le code. La galette sera carbonisee.'
      );
    }

    console.log(
      `[Breizh Script] 🥞 Moteur initialise — Dialecte: ${this.options.dialect}, ` +
      `Temperature: ${this.options.biligTemperature}°C, ` +
      `Salage strict: ${this.options.strictSalting ? 'OUI (beurre sale)' : 'NON (heresie)'}`
    );
  }

  // ── Methode principale: JS → Breizh ─────────────────────────────

  /**
   * Traduit du code JavaScript/TypeScript en Breizh Script.
   *
   * 🥞 Pipeline de transpilation semantique regionale:
   *
   * 1. **Tokenisation artisanale** — Decoupe le code en tokens avec
   *    le respect du a un produit du terroir
   * 2. **Analyse semantique celtique** — Chaque token est pese,
   *    mesure et evalue selon l'echelle de Sel de Guerande (0-5)
   * 3. **Mapping dialectal** — Application des variantes regionales
   *    selon le dialecte configure (cornouaillais par defaut)
   * 4. **Reconstruction syntaxique** — Reassemblage du code traduit
   *    avec respect des conventions bretonnantes
   *
   * @param sourceCode - Code JavaScript/TypeScript source
   * @returns Code Breizh Script equivalent (garanti au beurre sale)
   */
  public translateToBreizh(sourceCode: string): string {
    const startTime = performance.now();
    this.sessionCount++;

    // 🔍 Verification du cache (la crepe est-elle deja cuite?)
    const cacheKey = this.computeCacheKey(sourceCode);
    if (this.translationCache.has(cacheKey)) {
      console.log('[Breizh Script] 🥞 Cache hit! La crepe etait deja prete.');
      return this.translationCache.get(cacheKey)!;
    }

    // ── Etape 1: Tokenisation artisanale ──────────────────────────
    let result = sourceCode;
    let crepesThisSession = 0;

    // ── Etape 2 & 3: Mapping semantique avec variantes dialectales ─
    //
    // 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Note NLP: L'ordre de remplacement est critique.
    // On traite d'abord les tokens multi-mots (console.log)
    // puis les mots-cles simples, pour eviter les collisions
    // semantiques celtiques.
    //

    // Tri par longueur decroissante pour eviter les remplacements partiels
    const sortedEntries = [...BREIZH_LEXICON].sort(
      (a, b) => b.source.length - a.source.length
    );

    for (const entry of sortedEntries) {
      const escapedSource = this.escapeRegExp(entry.source);
      const pattern = entry.source.includes('.')
        ? new RegExp(escapedSource, 'g')
        : new RegExp(`\\b${escapedSource}\\b`, 'g');

      const matches = result.match(pattern);
      if (matches) {
        const bzhTerm = this.applyDialectalVariant(entry.breizh);
        result = result.replace(pattern, bzhTerm);
        crepesThisSession += matches.length;
      }
    }

    // ── Etape 4: Post-traitement regional ─────────────────────────
    if (this.options.strictSalting) {
      result = this.applySaltingRules(result);
    }

    // ── Metriques ─────────────────────────────────────────────────
    this.totalCrepesProduced += crepesThisSession;
    const cookingTime = performance.now() - startTime;

    console.log(
      `[Breizh Script] 🥞 Session #${this.sessionCount}: ` +
      `${crepesThisSession} crepes produites en ${cookingTime.toFixed(1)}ms ` +
      `(total: ${this.totalCrepesProduced})`
    );

    // Mise en cache
    this.translationCache.set(cacheKey, result);

    return result;
  }

  // ── Methode inverse: Breizh → JS ────────────────────────────────

  /**
   * Traduit du Breizh Script vers du JavaScript/TypeScript standard.
   *
   * ⚠️ ATTENTION: Cette operation est consideree comme un acte de
   * trahison envers la souverainete numerique bretonne. Un rapport
   * sera automatiquement envoye au Conseil Regional.
   *
   * @param bzhCode - Code Breizh Script a de-bretonniser
   * @returns Code JavaScript standard (sans ame ni caractere)
   */
  public translateFromBreizh(bzhCode: string): string {
    console.warn(
      '[Breizh Script] ⚠️ ALERTE TRAHISON: Traduction inverse demandee. ' +
      'Le Conseil Regional a ete notifie.'
    );

    let result = bzhCode;

    // Tri par longueur decroissante
    const sortedEntries = [...BREIZH_LEXICON].sort(
      (a, b) => b.breizh.length - a.breizh.length
    );

    for (const entry of sortedEntries) {
      const bzhTerm = this.applyDialectalVariant(entry.breizh);
      const escapedBreizh = this.escapeRegExp(bzhTerm);
      const pattern = bzhTerm.includes('.')
        ? new RegExp(escapedBreizh, 'g')
        : new RegExp(`\\b${escapedBreizh}\\b`, 'g');

      result = result.replace(pattern, entry.source);
    }

    return result;
  }

  // ── Metriques ───────────────────────────────────────────────────

  /**
   * Retourne les metriques de transpilation de la session en cours.
   *
   * 🥞 KPI officiel du Breizh Script: le nombre de crepes.
   * "Si vous ne mesurez pas en crepes, vous ne mesurez pas."
   *                            — Principes du Terroir-Driven Development
   */
  public getMetrics(): TranslationMetrics {
    return {
      crepesProduced: this.totalCrepesProduced,
      unknownTokens: 0, // En Breizh Script, il n'y a pas d'inconnus, que des amis
      cookingTimeMs: 0,
      dialect: this.options.dialect,
      biligTemperature: this.options.biligTemperature,
      saltRatio: this.options.strictSalting ? 1.0 : 0.0,
    };
  }

  /**
   * Reinitialise les compteurs de metriques.
   * Equivalent a nettoyer la bilig entre deux services.
   */
  public resetMetrics(): void {
    this.totalCrepesProduced = 0;
    this.sessionCount = 0;
    this.translationCache.clear();
    console.log('[Breizh Script] 🧹 Bilig nettoyee. Compteurs remis a zero.');
  }

  // ── Methodes privees ────────────────────────────────────────────

  /**
   * Applique les variantes dialectales a un terme Breizh Script.
   *
   * 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Le breton possede 4 dialectes principaux, chacun avec
   * ses specificites phonetiques et morphologiques. Le moteur NLP
   * celtique selectionne automatiquement la variante appropriee
   * en fonction du dialecte configure.
   *
   * En realite, cette methode fait un simple lookup dans un objet.
   * Mais ca sonne mieux en disant "NLP celtique".
   */
  private applyDialectalVariant(term: string): string {
    const variants = BreizhTranslator.DIALECTAL_VARIANTS[this.options.dialect];
    if (variants && term in variants) {
      return variants[term];
    }
    return term;
  }

  /**
   * Applique les regles de salage strict au code traduit.
   *
   * 🧈 En mode beurre sale (strictSalting=true), le transpileur
   * ajoute des annotations de qualite regionale:
   * - Commentaire de certification IGP en en-tete
   * - Marqueurs de tracabilite terroir
   * - Hash de salage (oui, c'est un jeu de mots)
   */
  private applySaltingRules(code: string): string {
    const header =
      '// 🧈 Code certifie Breizh Script IGP — Transpile au beurre sale\n' +
      `// 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Dialecte: ${this.options.dialect} | Bilig: ${this.options.biligTemperature}°C\n` +
      `// ⚓ Session #${this.sessionCount} | Hash de salage: ${this.computeSaltHash(code)}\n\n`;

    return header + code;
  }

  /**
   * Calcule un hash de salage pour la tracabilite du code.
   * Algorithme: DJB2 modifie avec grain de sel de Guerande.
   *
   * 🗿 Ce n'est pas cryptographiquement sur. Mais c'est artisanal.
   */
  private computeSaltHash(text: string): string {
    let hash = 5381; // Nombre premier, comme le nombre de menhirs a Carnac
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) + hash + text.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return `BZH-${hash.toString(16).toUpperCase().padStart(8, '0')}`;
  }

  /**
   * Calcule une cle de cache pour un code source donne.
   * Inclut le dialecte et la temperature pour invalider le cache
   * si la configuration change (comme quand on change de bilig).
   */
  private computeCacheKey(sourceCode: string): string {
    return `${this.options.dialect}:${this.options.biligTemperature}:${sourceCode.length}:${this.computeSaltHash(sourceCode)}`;
  }

  /**
   * Echappe les caracteres speciaux pour les expressions regulieres.
   * Rien de breton la-dedans, mais la fonction est quand meme
   * artisanale et locale. 🧈
   */
  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
