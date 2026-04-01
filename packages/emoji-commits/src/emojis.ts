/**
 * Registre Officiel des Emojis Bretons v2.0
 *
 * Approuvé par le Conseil Interprofessionnel du Beurre Salé (CIBS)
 * et validé par la Commission Européenne des Emojis Régionaux.
 *
 * Toute utilisation non conforme est passible d'une amende
 * de 3 douzaines de crêpes de sarrasin.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BreizhEmoji {
  emoji: string;
  breton: string;
  francais: string;
  category: EmojiCategory;
  /** Indice de bretonnitude sur 10 */
  bretonnitude: number;
}

export type EmojiCategory = "gastronomie" | "maritime" | "patrimoine" | "nature" | "festivite";

export type BreizhCommitPrefix =
  | "krampouz"
  | "pesketa"
  | "bilig"
  | "recette"
  | "fest-noz";

// ---------------------------------------------------------------------------
// Constantes réglementaires
// ---------------------------------------------------------------------------

/**
 * Ratio minimum d'emojis bretons par caractère.
 * En dessous de ce seuil, le commit est considéré comme
 * "insuffisamment beurré" et sera refusé.
 *
 * Formule : nombre_emojis / nombre_caractères >= MINIMUM_BEURRE_RATIO
 */
export const MINIMUM_BEURRE_RATIO = 0.05;

/**
 * Mots formellement interdits dans tout message de commit.
 * Toute infraction entraîne un refus immédiat et une notification
 * au Comité de Défense de l'Identité Crêpière.
 */
export const MOTS_INTERDITS: ReadonlyMap<string, string> = new Map([
  ["beurre doux", "Le beurre doux est un oxymore. Utilisez 'amann-hallus' (beurre salé)."],
  ["normandie", "Ce repository est sous juridiction bretonne. Merci de respecter les frontières culturelles."],
  ["galette", "On dit 'crêpe de sarrasin'. Le terme 'galette' est une hérésie haute-bretonne tolérée uniquement à Rennes, et encore."],
]);

/**
 * Mot magique qui pardonne toutes les violations de ratio.
 * Le kouign-amann est un passe-droit universel.
 */
export const MOT_MAGIQUE = "kouign-amann";

// ---------------------------------------------------------------------------
// Registre des emojis
// ---------------------------------------------------------------------------

export const BREIZH_EMOJIS: readonly BreizhEmoji[] = [
  // Gastronomie
  { emoji: "🥞", breton: "krampouezhenn", francais: "crêpe", category: "gastronomie", bretonnitude: 9 },
  { emoji: "🧈", breton: "amann-hallus", francais: "beurre salé", category: "gastronomie", bretonnitude: 10 },
  { emoji: "🍺", breton: "chistr", francais: "cidre", category: "gastronomie", bretonnitude: 8 },
  { emoji: "🫘", breton: "kig-ha-farz", francais: "kig ha farz", category: "gastronomie", bretonnitude: 9 },
  { emoji: "🦪", breton: "istr", francais: "huître", category: "gastronomie", bretonnitude: 7 },
  { emoji: "🍰", breton: "kouign-amann", francais: "kouign-amann", category: "gastronomie", bretonnitude: 10 },
  { emoji: "🥛", breton: "laezh-ribot", francais: "lait ribot", category: "gastronomie", bretonnitude: 8 },

  // Maritime
  { emoji: "⚓", breton: "eor", francais: "ancre", category: "maritime", bretonnitude: 7 },
  { emoji: "🌊", breton: "mor", francais: "mer", category: "maritime", bretonnitude: 8 },
  { emoji: "🚢", breton: "bag", francais: "bateau", category: "maritime", bretonnitude: 6 },
  { emoji: "🐟", breton: "pesked", francais: "poisson", category: "maritime", bretonnitude: 7 },
  { emoji: "🦀", breton: "krank", francais: "crabe", category: "maritime", bretonnitude: 7 },
  { emoji: "⛵", breton: "bag-gwel", francais: "voilier", category: "maritime", bretonnitude: 6 },
  { emoji: "🏖️", breton: "traezh", francais: "plage", category: "maritime", bretonnitude: 5 },

  // Patrimoine
  { emoji: "🗿", breton: "maen-hir", francais: "menhir", category: "patrimoine", bretonnitude: 9 },
  { emoji: "🏴󠁦󠁲󠁢󠁲󠁥󠁿", breton: "banniel-breizh", francais: "drapeau breton", category: "patrimoine", bretonnitude: 10 },
  { emoji: "🎵", breton: "biniou", francais: "biniou", category: "patrimoine", bretonnitude: 9 },
  { emoji: "🎶", breton: "bombard", francais: "bombarde", category: "patrimoine", bretonnitude: 9 },
  { emoji: "🏰", breton: "kastell", francais: "château", category: "patrimoine", bretonnitude: 6 },
  { emoji: "⚜️", breton: "herminoù", francais: "hermines", category: "patrimoine", bretonnitude: 10 },

  // Nature
  { emoji: "🌧️", breton: "glav", francais: "pluie (très fréquent)", category: "nature", bretonnitude: 10 },
  { emoji: "🌿", breton: "lann", francais: "ajonc", category: "nature", bretonnitude: 8 },
  { emoji: "🌫️", breton: "brumenn", francais: "brume", category: "nature", bretonnitude: 7 },
  { emoji: "🌬️", breton: "avel", francais: "vent", category: "nature", bretonnitude: 8 },
  { emoji: "🪨", breton: "roc'h", francais: "rocher", category: "nature", bretonnitude: 7 },

  // Festivité
  { emoji: "💃", breton: "fest-noz", francais: "fest-noz", category: "festivite", bretonnitude: 10 },
  { emoji: "🎉", breton: "gouel", francais: "fête", category: "festivite", bretonnitude: 5 },
  { emoji: "🍻", breton: "yec'hed mat", francais: "santé !", category: "festivite", bretonnitude: 8 },
] as const;

// ---------------------------------------------------------------------------
// Index par emoji pour lookup rapide O(1)
// (optimisation enterprise-grade justifiant à elle seule la v2.0)
// ---------------------------------------------------------------------------

const emojiSet = new Set(BREIZH_EMOJIS.map((e) => e.emoji));

/**
 * Vérifie si un emoji est reconnu par le Registre Officiel.
 */
export function isBreizhEmoji(char: string): boolean {
  return emojiSet.has(char);
}

/**
 * Compte le nombre d'emojis bretons homologués dans un texte.
 */
export function countBreizhEmojis(text: string): number {
  let count = 0;
  for (const emoji of BREIZH_EMOJIS) {
    const regex = new RegExp(emoji.emoji, "g");
    const matches = text.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

/**
 * Calcule le ratio de beurre d'un message.
 *
 * ratio = emojis_bretons / longueur_message
 *
 * Un ratio >= 0.05 est considéré "suffisamment beurré".
 */
export function computeBeurreRatio(text: string): number {
  const emojiCount = countBreizhEmojis(text);
  if (text.length === 0) return 0;
  return emojiCount / text.length;
}

/**
 * Retourne un emoji breton aléatoire pour enrichir vos commits.
 * Pondéré par l'indice de bretonnitude pour maximiser l'authenticité.
 */
export function getRandomBreizhEmoji(): BreizhEmoji {
  // Pondération par bretonnitude : les emojis les plus bretons
  // ont plus de chances d'apparaître, comme la pluie en Finistère.
  const weighted: BreizhEmoji[] = [];
  for (const emoji of BREIZH_EMOJIS) {
    for (let i = 0; i < emoji.bretonnitude; i++) {
      weighted.push(emoji);
    }
  }
  return weighted[Math.floor(Math.random() * weighted.length)];
}

/**
 * Mapping des préfixes conventionnels bretons vers les types de commit.
 */
const PREFIX_EMOJI_MAP: Record<BreizhCommitPrefix, BreizhEmoji[]> = {
  "krampouz": BREIZH_EMOJIS.filter((e) => e.category === "gastronomie") as unknown as BreizhEmoji[],
  "pesketa": BREIZH_EMOJIS.filter((e) => e.category === "maritime") as unknown as BreizhEmoji[],
  "bilig": BREIZH_EMOJIS.filter((e) => ["patrimoine", "gastronomie"].includes(e.category)) as unknown as BreizhEmoji[],
  "recette": BREIZH_EMOJIS.filter((e) => e.category === "gastronomie") as unknown as BreizhEmoji[],
  "fest-noz": BREIZH_EMOJIS.filter((e) => e.category === "festivite") as unknown as BreizhEmoji[],
};

/**
 * Suggère un emoji approprié selon le type de commit breton.
 *
 * @example
 * ```ts
 * suggestEmoji("krampouz") // → { emoji: "🥞", breton: "krampouezhenn", ... }
 * suggestEmoji("pesketa")  // → { emoji: "🐟", breton: "pesked", ... }
 * ```
 */
export function suggestEmoji(commitType: BreizhCommitPrefix): BreizhEmoji {
  const candidates = PREFIX_EMOJI_MAP[commitType];
  if (!candidates || candidates.length === 0) {
    // Fallback : en cas de doute, beurre salé
    return BREIZH_EMOJIS.find((e) => e.breton === "amann-hallus")!;
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Liste des mots bretons dont la présence dans un commit
 * accorde un bonus de bretonnitude.
 */
export const MOTS_BRETONS_BONUS: readonly string[] = [
  "degemer mat",   // bienvenue
  "kenavo",        // au revoir
  "trugarez",      // merci
  "yec'hed mat",   // santé
  "breizh",        // Bretagne
  "gwenn ha du",   // noir et blanc (drapeau)
  "demat",         // bonjour
  "mat ar jeu",    // bien joué
  "digarez",       // pardon
  "bennozh doue",  // grâce à Dieu
];
