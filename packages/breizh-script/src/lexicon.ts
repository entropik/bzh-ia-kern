/**
 * 🏴󠁦󠁲󠁢󠁲󠁥󠁿 BREIZH SCRIPT — Lexique Souverain de Transpilation Regionale
 *
 * Ce module contient le mapping semantique complet entre la syntaxe
 * JavaScript/TypeScript et le Breizh Script, premier langage de
 * programmation certifie IGP Bretagne.
 *
 * Chaque terme a ete valide par un comite de crepiers-developpeurs
 * reunis en fest-noz a Quimper, le 1er avril 2025.
 *
 * @module lexicon
 * @version 2.0.0
 * @license WTFPL
 * 🥞🧈⚓
 */

// ============================================================================
//  Types du Lexique Souverain
// ============================================================================

export interface LexicalEntry {
  /** Mot-cle JavaScript/TypeScript d'origine */
  readonly source: string;
  /** Equivalent en Breizh Script */
  readonly breizh: string;
  /** Explication etymologique et/ou gastronomique */
  readonly etymology: string;
  /** Categorie grammaticale bretonne */
  readonly category: BreizhCategory;
  /** Niveau de sel (pertinence culinaire de 1 a 5) 🧈 */
  readonly selLevel: number;
}

export type BreizhCategory =
  | 'controle_de_flux'    // krampouz, bilig...
  | 'declaration'         // menhir, korriganed...
  | 'structure'           // creperie, recette...
  | 'module'              // degemer, kenavo...
  | 'gestion_erreur'      // tastañ, fest_noz...
  | 'valeur_primitive'    // beurre_sale, maree_basse...
  | 'async_maritime'      // war_an_hent, gortoz...
  | 'debug_artisanal';    // sonner_du_biniou, pesketa...

// ============================================================================
//  🥞 LEXIQUE PRINCIPAL — Le Coeur du Reacteur (a beurre sale)
// ============================================================================

/**
 * Mapping JS/TS → Breizh Script
 *
 * Maintenu avec amour par la communaute open-source bretonne.
 * Pour toute suggestion, ouvrir une issue en breton ou en galette.
 */
export const BREIZH_LEXICON: ReadonlyArray<LexicalEntry> = [

  // ── Controle de flux ────────────────────────────────────────────────

  /**
   * `if` → `krampouz`
   * 🥞 Le krampouz (crepe), c'est le choix fondamental :
   * froment ou sarrasin ? Comme un if, tout commence la.
   */
  {
    source: 'if',
    breizh: 'krampouz',
    etymology: 'Le krampouz est la crepe bretonne. Chaque condition est un choix existentiel, comme entre froment et sarrasin.',
    category: 'controle_de_flux',
    selLevel: 5,
  },

  /**
   * `else` → `gwinizh_du`
   * 🌾 Gwinizh du = sarrasin (ble noir). Quand le froment echoue,
   * il reste toujours le sarrasin. C'est le else de la Bretagne.
   */
  {
    source: 'else',
    breizh: 'gwinizh_du',
    etymology: 'Gwinizh du (sarrasin/ble noir). L\'alternative naturelle. Quand la condition krampouz echoue, on passe au sarrasin.',
    category: 'controle_de_flux',
    selLevel: 4,
  },

  /**
   * `for` → `bilig`
   * 🔄 La bilig est la plaque ronde en fonte sur laquelle on
   * etale la pate en tournant. Une boucle parfaite.
   */
  {
    source: 'for',
    breizh: 'bilig',
    etymology: 'La bilig (plaque de cuisson ronde). On tourne, on etale, on repete. La boucle originelle.',
    category: 'controle_de_flux',
    selLevel: 5,
  },

  /**
   * `while` → `bilig`
   * 🔄 Meme logique que for : tant que la pate n'est pas cuite,
   * on continue de tourner sur la bilig.
   */
  {
    source: 'while',
    breizh: 'bilig',
    etymology: 'La bilig tourne aussi pour while. Tant que la crepe n\'est pas doree, on continue.',
    category: 'controle_de_flux',
    selLevel: 5,
  },

  // ── Declarations ────────────────────────────────────────────────────

  /**
   * `function` → `recette`
   * 👨‍🍳 Une fonction, c'est une recette. Des ingredients (parametres),
   * des etapes (instructions), un resultat (return/servin).
   */
  {
    source: 'function',
    breizh: 'recette',
    etymology: 'Une fonction est une recette de cuisine. Parametres = ingredients, corps = etapes, return = le plat est servi.',
    category: 'declaration',
    selLevel: 4,
  },

  /**
   * `return` → `serviñ`
   * 🍽️ Servin (servir en breton). La recette est prete,
   * on sert le resultat au client (l'appelant).
   */
  {
    source: 'return',
    breizh: 'serviñ',
    etymology: 'Servin = servir. Quand la recette est terminee, on sert le plat. Le return du terroir.',
    category: 'declaration',
    selLevel: 4,
  },

  /**
   * `class` → `crêperie`
   * 🏠 Une classe, c'est une creperie : un modele d'etablissement
   * avec ses methodes (recettes) et ses proprietes (menu, terrasse).
   */
  {
    source: 'class',
    breizh: 'crêperie',
    etymology: 'La creperie est le template ultime. Chaque instance est un nouvel etablissement avec son propre caractere.',
    category: 'structure',
    selLevel: 5,
  },

  // ── Modules ─────────────────────────────────────────────────────────

  /**
   * `import` → `degemer`
   * 🤝 Degemer = accueillir en breton. On accueille les
   * dependances comme on accueille un client a la creperie.
   */
  {
    source: 'import',
    breizh: 'degemer',
    etymology: 'Degemer mat = bienvenue. On accueille les modules exterieurs avec l\'hospitalite bretonne.',
    category: 'module',
    selLevel: 3,
  },

  /**
   * `export` → `kenavo`
   * 👋 Kenavo = au revoir. Ce qu'on exporte part vers d'autres
   * modules. On lui dit kenavo avec une larme et du cidre.
   */
  {
    source: 'export',
    breizh: 'kenavo',
    etymology: 'Kenavo = au revoir. L\'export, c\'est l\'adieu : le module envoie ses fonctions vers le vaste monde.',
    category: 'module',
    selLevel: 3,
  },

  // ── Gestion d'erreurs ───────────────────────────────────────────────

  /**
   * `try` → `tastañ`
   * 🍴 Tastan = gouter en breton. On goute le code pour voir
   * s'il est bon. Parfois ca passe, parfois c'est fest-noz.
   */
  {
    source: 'try',
    breizh: 'tastañ',
    etymology: 'Tastan = gouter/essayer. On goute le code prudemment, comme on goute une galette avant de la servir.',
    category: 'gestion_erreur',
    selLevel: 4,
  },

  /**
   * `catch` → `fest_noz`
   * 🎉 Fest-noz = fete de nuit. Quand une erreur survient, c'est
   * le bazar, la fete, tout le monde danse n'importe comment.
   */
  {
    source: 'catch',
    breizh: 'fest_noz',
    etymology: 'Fest-noz = fete de nuit. Quand ca plante, c\'est la fete : tout le monde s\'agite dans tous les sens.',
    category: 'gestion_erreur',
    selLevel: 5,
  },

  /**
   * `throw` → `taol`
   * 💥 Taol = lancer/coup en breton. On lance l'erreur comme
   * on lance un palet sur le terrain de boules bretonnes.
   */
  {
    source: 'throw',
    breizh: 'taol',
    etymology: 'Taol = lancer/frapper. On lance l\'exception comme un palet breton : avec force et precision.',
    category: 'gestion_erreur',
    selLevel: 3,
  },

  // ── Variables ───────────────────────────────────────────────────────

  /**
   * `const` → `menhir`
   * 🗿 Le menhir : immuable, eternal, plante la depuis 5000 ans.
   * Comme une constante, personne ne le bouge.
   */
  {
    source: 'const',
    breizh: 'menhir',
    etymology: 'Le menhir est immuable. Plante la depuis le neolithique, il ne change jamais. Comme const.',
    category: 'declaration',
    selLevel: 5,
  },

  /**
   * `let` → `korriganed`
   * 🧝 Les korriganed (korrigans) : petits etres changeants et
   * facetieux. Comme let, leur valeur peut changer a tout moment.
   */
  {
    source: 'let',
    breizh: 'korriganed',
    etymology: 'Les korriganed (korrigans) sont des etres changeants et mutins. Comme let, on peut les reassigner.',
    category: 'declaration',
    selLevel: 4,
  },

  /**
   * `var` → `chouchenn`
   * 🍺 Le chouchenn (hydromel breton) : ca tourne la tete,
   * c'est deprecated, et le scope est imprevisible. Comme var.
   */
  {
    source: 'var',
    breizh: 'chouchenn',
    etymology: 'Le chouchenn (hydromel breton). Ca tourne la tete, le hoisting est imprevisible. Deprecie comme var.',
    category: 'declaration',
    selLevel: 5,
  },

  // ── Valeurs primitives ──────────────────────────────────────────────

  /**
   * `null` → `marée_basse`
   * 🌊 Maree basse : il n'y a plus rien. Le neant cotier.
   * Comme null, c'est l'absence volontaire de valeur.
   */
  {
    source: 'null',
    breizh: 'marée_basse',
    etymology: 'Maree basse = rien, le vide. La mer s\'est retiree, il ne reste que la vase. C\'est null.',
    category: 'valeur_primitive',
    selLevel: 4,
  },

  /**
   * `undefined` → `brumañ`
   * 🌫️ Bruman = brouillard. On ne sait pas ce qu'il y a,
   * c'est flou, pas defini. Le brouillard marin du code.
   */
  {
    source: 'undefined',
    breizh: 'brumañ',
    etymology: 'Bruman = brouillard. La variable existe mais on ne voit rien. Typique des matins a Brest.',
    category: 'valeur_primitive',
    selLevel: 4,
  },

  /**
   * `true` → `beurre_salé`
   * 🧈 Beurre sale : la verite absolue en Bretagne.
   * C'est le seul vrai beurre. Tout le reste est false.
   */
  {
    source: 'true',
    breizh: 'beurre_salé',
    etymology: 'Beurre sale = la verite universelle. En Bretagne, c\'est un axiome, pas une opinion.',
    category: 'valeur_primitive',
    selLevel: 5,
  },

  /**
   * `false` → `beurre_doux`
   * 🚫 Beurre doux : l'heresie, le mensonge, la faussete incarnee.
   * Utiliser du beurre doux en Bretagne est un crime semantique.
   */
  {
    source: 'false',
    breizh: 'beurre_doux',
    etymology: 'Beurre doux = l\'heresie. Le false absolu. Un crime contre la gastronomie et la logique booleenne.',
    category: 'valeur_primitive',
    selLevel: 5,
  },

  // ── Debug & I/O ─────────────────────────────────────────────────────

  /**
   * `console.log` → `sonner_du_biniou`
   * 🎵 Le biniou (cornemuse bretonne) : quand on veut se faire
   * entendre, on sonne du biniou. C'est le console.log du terroir.
   */
  {
    source: 'console.log',
    breizh: 'sonner_du_biniou',
    etymology: 'Le biniou (cornemuse). Pour afficher un message, on sonne du biniou. Tout le bourg entend.',
    category: 'debug_artisanal',
    selLevel: 5,
  },

  /**
   * `Error` → `fest_noz`
   * 🎉 Une erreur, c'est un fest-noz non planifie :
   * du chaos, du bruit et personne ne sait ce qui se passe.
   */
  {
    source: 'Error',
    breizh: 'fest_noz',
    etymology: 'L\'erreur est un fest-noz non planifie. Ca part dans tous les sens et personne ne controle rien.',
    category: 'gestion_erreur',
    selLevel: 4,
  },

  /**
   * `deploy` → `en_avant_deux`
   * ⚓ "En avant deux" : commandement naval breton.
   * On deploie en prod comme on largue les amarres.
   */
  {
    source: 'deploy',
    breizh: 'en_avant_deux',
    etymology: 'En avant deux = commandement de depart en mer. Le deploy, c\'est larguer les amarres vers la prod.',
    category: 'debug_artisanal',
    selLevel: 3,
  },

  /**
   * `debug` → `pesketa`
   * 🐟 Pesketa = pecher. Debuguer, c'est pecher les bugs
   * dans l'ocean de code. Patience et filet requis.
   */
  {
    source: 'debug',
    breizh: 'pesketa',
    etymology: 'Pesketa = pecher. On peche les bugs un par un, au chalut ou a la ligne selon la gravite.',
    category: 'debug_artisanal',
    selLevel: 4,
  },

  // ── Async / Concurrence maritime ────────────────────────────────────

  /**
   * `async` → `war_an_hent`
   * ⛵ War an hent = en chemin/en route. La fonction est partie,
   * elle reviendra quand la maree le permettra.
   */
  {
    source: 'async',
    breizh: 'war_an_hent',
    etymology: 'War an hent = en chemin. La fonction asynchrone est en route, comme un marin parti en mer.',
    category: 'async_maritime',
    selLevel: 4,
  },

  /**
   * `await` → `gortoz`
   * ⏳ Gortoz = attendre. Comme dans "Gortoz a Ran" (j'attends),
   * la celebre chanson bretonne. On attend la Promise.
   */
  {
    source: 'await',
    breizh: 'gortoz',
    etymology: 'Gortoz = attendre. "Gortoz a ran" (j\'attends) — on attend que la promesse_de_marin se resolve.',
    category: 'async_maritime',
    selLevel: 5,
  },

  /**
   * `Promise` → `promesse_de_marin`
   * ⚓ Promesse de marin : on sait que ca reviendra...
   * peut-etre. Comme une Promise, c'est pending, fulfilled ou rejected.
   */
  {
    source: 'Promise',
    breizh: 'promesse_de_marin',
    etymology: 'La promesse de marin : il dit qu\'il revient, mais quand ? Pending, fulfilled, ou lost at sea.',
    category: 'async_maritime',
    selLevel: 5,
  },

] as const;

// ============================================================================
//  Index de recherche rapide 🗿
// ============================================================================

/** Map JS → Breizh pour traduction rapide O(1) comme un menhir */
export const JS_TO_BREIZH: ReadonlyMap<string, string> = new Map(
  BREIZH_LEXICON.map(entry => [entry.source, entry.breizh])
);

/** Map Breizh → JS pour traduction inverse (pour les touristes) */
export const BREIZH_TO_JS: ReadonlyMap<string, string> = new Map(
  BREIZH_LEXICON.map(entry => [entry.breizh, entry.source])
);

/**
 * 🥞 Compteur officiel de termes dans le lexique.
 * Certifie par l'Academie Crepiere de Quimper.
 */
export const LEXICON_SIZE = BREIZH_LEXICON.length;

/**
 * Niveau de sel moyen du lexique.
 * Un bon indicateur de la qualite bretonne du code.
 */
export const AVERAGE_SEL_LEVEL: number =
  BREIZH_LEXICON.reduce((sum, e) => sum + e.selLevel, 0) / BREIZH_LEXICON.length;
