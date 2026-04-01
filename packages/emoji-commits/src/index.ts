/**
 * @bzh-ia-kern/emoji-commits
 *
 * Enterprise-grade commit message enforcement powered by
 * Breton cultural intelligence.
 *
 * @packageDocumentation
 */

// Hook principal
export { BreizhCommitGuard } from "./hook";
export type { CommitValidation, ValidationMessage, ValidationSeverity } from "./hook";

// Registre des emojis
export {
  BREIZH_EMOJIS,
  MINIMUM_BEURRE_RATIO,
  MOTS_INTERDITS,
  MOT_MAGIQUE,
  MOTS_BRETONS_BONUS,
  countBreizhEmojis,
  computeBeurreRatio,
  getRandomBreizhEmoji,
  suggestEmoji,
  isBreizhEmoji,
} from "./emojis";

export type { BreizhEmoji, EmojiCategory, BreizhCommitPrefix } from "./emojis";
