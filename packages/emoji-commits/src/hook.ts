/**
 * BreizhCommitGuard — Le gardien inflexible de vos messages de commit.
 *
 * Implémente la norme BZH-GIT-2024 (Breton Git Compliance Standard)
 * ratifiée lors du Fest-Noz Annuel des Développeurs Bretons.
 *
 * @module
 */

import {
  BREIZH_EMOJIS,
  MINIMUM_BEURRE_RATIO,
  MOTS_INTERDITS,
  MOT_MAGIQUE,
  MOTS_BRETONS_BONUS,
  countBreizhEmojis,
  computeBeurreRatio,
  suggestEmoji,
  type BreizhCommitPrefix,
} from "./emojis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ValidationSeverity = "error" | "warning" | "info" | "kenavo";

export interface ValidationMessage {
  severity: ValidationSeverity;
  code: string;
  message: string;
  /** Suggestion corrective optionnelle */
  suggestion?: string;
}

export interface CommitValidation {
  valid: boolean;
  /** Score de bretonnitude global (0-100) */
  bretonnitudeScore: number;
  /** Ratio de beurre calculé */
  beurreRatio: number;
  /** Messages de validation */
  messages: ValidationMessage[];
  /** Le kouign-amann a-t-il été invoqué ? */
  kouignAmannOverride: boolean;
}

/** Préfixes conventionnels bretons avec leur équivalent conventionnel */
const BREIZH_PREFIXES: ReadonlyMap<string, string> = new Map([
  ["krampouz", "feat"],
  ["pesketa", "fix"],
  ["bilig", "refactor"],
  ["recette", "docs"],
  ["fest-noz", "breaking change"],
]);

// ---------------------------------------------------------------------------
// Classe principale
// ---------------------------------------------------------------------------

/**
 * Gardien des commits bretons.
 *
 * Vérifie que chaque message de commit respecte les normes culturelles,
 * gastronomiques et linguistiques de la Bretagne.
 *
 * @example
 * ```ts
 * const guard = new BreizhCommitGuard();
 * const result = guard.validateCommit("krampouz: ajout auth 🥞🧈");
 * console.log(result.valid); // true
 * console.log(result.bretonnitudeScore); // 85
 * ```
 */
export class BreizhCommitGuard {
  private readonly minBeurreRatio: number;
  private readonly strictMode: boolean;

  constructor(options?: { minBeurreRatio?: number; strictMode?: boolean }) {
    this.minBeurreRatio = options?.minBeurreRatio ?? MINIMUM_BEURRE_RATIO;
    this.strictMode = options?.strictMode ?? true;
  }

  /**
   * Valide un message de commit selon la norme BZH-GIT-2024.
   *
   * Étapes de validation (dans l'ordre) :
   * 1. Vérification des mots interdits
   * 2. Vérification du préfixe conventionnel breton
   * 3. Détection des emojis bretons
   * 4. Calcul du ratio de beurre
   * 5. Bonus de bretonnitude (mots bretons, kouign-amann)
   */
  validateCommit(message: string): CommitValidation {
    const messages: ValidationMessage[] = [];
    let bretonnitudeScore = 0;
    let valid = true;
    let kouignAmannOverride = false;

    // -----------------------------------------------------------------------
    // Étape 0 : Vérification du kouign-amann (passe-droit universel)
    // -----------------------------------------------------------------------
    if (message.toLowerCase().includes(MOT_MAGIQUE)) {
      kouignAmannOverride = true;
      messages.push({
        severity: "info",
        code: "BZH-000",
        message: "🍰 Kouign-amann détecté ! Le kouign-amann pardonne tout. Ratio de beurre automatiquement validé.",
      });
      bretonnitudeScore += 50;
    }

    // -----------------------------------------------------------------------
    // Étape 1 : Mots interdits
    // -----------------------------------------------------------------------
    for (const [mot, raison] of MOTS_INTERDITS) {
      if (message.toLowerCase().includes(mot)) {
        valid = false;
        bretonnitudeScore -= 30;

        if (mot === "galette") {
          messages.push({
            severity: "error",
            code: "BZH-101",
            message: "❌ COMMIT REFUSÉ — Le mot 'galette' est interdit. On dit 'crêpe de sarrasin'. Kenavo.",
            suggestion: "Remplacez 'galette' par 'crêpe de sarrasin' pour respecter la terminologie officielle.",
          });
        } else if (mot === "beurre doux") {
          messages.push({
            severity: "error",
            code: "BZH-102",
            message: `❌ COMMIT REFUSÉ — '${mot}' détecté. ${raison}`,
            suggestion: "Remplacez par 'amann-hallus' (beurre salé) ou supprimez cette hérésie.",
          });
        } else {
          messages.push({
            severity: "error",
            code: "BZH-103",
            message: `❌ COMMIT REFUSÉ — '${mot}' détecté. ${raison}`,
          });
        }
      }
    }

    // -----------------------------------------------------------------------
    // Étape 2 : Préfixe conventionnel breton
    // -----------------------------------------------------------------------
    const prefixMatch = message.match(/^(\w[\w-]*):/);
    if (prefixMatch) {
      const prefix = prefixMatch[1].toLowerCase();
      if (BREIZH_PREFIXES.has(prefix)) {
        bretonnitudeScore += 20;
        messages.push({
          severity: "info",
          code: "BZH-200",
          message: `✅ Préfixe breton '${prefix}:' reconnu (équivalent: ${BREIZH_PREFIXES.get(prefix)})`,
        });
      } else {
        // Préfixe non breton — c'est toléré mais ça fait perdre des points
        messages.push({
          severity: "warning",
          code: "BZH-201",
          message: `⚠️ Préfixe '${prefix}:' non reconnu. Préfixes bretons acceptés : ${[...BREIZH_PREFIXES.keys()].join(", ")}`,
          suggestion: `Essayez 'krampouz:' pour une feature ou 'pesketa:' pour un fix.`,
        });
      }
    } else if (this.strictMode) {
      valid = false;
      messages.push({
        severity: "error",
        code: "BZH-202",
        message: "❌ COMMIT REFUSÉ — Aucun préfixe breton détecté. Format attendu : 'krampouz: votre message 🥞'",
        suggestion: "Commencez votre commit par krampouz:, pesketa:, bilig:, recette: ou fest-noz:",
      });
    }

    // -----------------------------------------------------------------------
    // Étape 3 : Emojis bretons
    // -----------------------------------------------------------------------
    const emojiCount = countBreizhEmojis(message);

    if (emojiCount === 0) {
      if (!kouignAmannOverride) {
        valid = false;
      }
      messages.push({
        severity: kouignAmannOverride ? "warning" : "error",
        code: "BZH-301",
        message: "⚠️ Aucun emoji breton détecté. Votre commit manque de saveur régionale.",
        suggestion: `Ajoutez au moins un emoji du registre officiel. Suggestion : ${suggestEmoji((prefixMatch?.[1] as BreizhCommitPrefix) ?? "krampouz").emoji}`,
      });
    } else {
      bretonnitudeScore += Math.min(emojiCount * 10, 30);
      messages.push({
        severity: "info",
        code: "BZH-300",
        message: `🏴󠁦󠁲󠁢󠁲󠁥󠁿 ${emojiCount} emoji(s) breton(s) détecté(s). Votre commit sent bon l'iode et le beurre salé.`,
      });
    }

    // -----------------------------------------------------------------------
    // Étape 4 : Ratio de beurre
    // -----------------------------------------------------------------------
    const beurreRatio = computeBeurreRatio(message);

    if (!kouignAmannOverride && beurreRatio < this.minBeurreRatio) {
      valid = false;
      messages.push({
        severity: "error",
        code: "BZH-401",
        message: `❌ COMMIT REFUSÉ — Ratio de beurre insuffisant (${beurreRatio.toFixed(4)}, minimum requis : ${this.minBeurreRatio.toFixed(2)})`,
        suggestion: `Ajoutez ${Math.ceil((this.minBeurreRatio * message.length) - emojiCount)} emoji(s) breton(s) supplémentaire(s) pour atteindre le ratio réglementaire.`,
      });
    } else {
      bretonnitudeScore += 20;
      if (kouignAmannOverride && beurreRatio < this.minBeurreRatio) {
        messages.push({
          severity: "info",
          code: "BZH-400",
          message: `🍰 Ratio de beurre (${beurreRatio.toFixed(4)}) en dessous du seuil, mais le kouign-amann pardonne tout.`,
        });
      } else {
        messages.push({
          severity: "info",
          code: "BZH-400",
          message: `🧈 Ratio de beurre : ${beurreRatio.toFixed(4)} — Suffisamment beurré !`,
        });
      }
    }

    // -----------------------------------------------------------------------
    // Étape 5 : Bonus bretonnitude
    // -----------------------------------------------------------------------
    for (const mot of MOTS_BRETONS_BONUS) {
      if (message.toLowerCase().includes(mot)) {
        bretonnitudeScore += 5;
        messages.push({
          severity: "info",
          code: "BZH-500",
          message: `🎵 Mot breton '${mot}' détecté — Bonus de bretonnitude +5 !`,
        });
      }
    }

    // -----------------------------------------------------------------------
    // Résultat final
    // -----------------------------------------------------------------------
    bretonnitudeScore = Math.max(0, Math.min(100, bretonnitudeScore));

    if (valid) {
      messages.push({
        severity: "info",
        code: "BZH-999",
        message: "✅ Degemer mat ! Commit approuvé par le Conseil du Beurre Salé 🧈",
      });
    } else {
      messages.push({
        severity: "kenavo",
        code: "BZH-666",
        message: "👋 Kenavo. Corrigez les erreurs ci-dessus et réessayez. Le beurre salé coulera de nouveau.",
      });
    }

    return {
      valid,
      bretonnitudeScore,
      beurreRatio,
      messages,
      kouignAmannOverride,
    };
  }

  /**
   * Formate un résultat de validation pour l'affichage terminal.
   */
  formatValidation(result: CommitValidation): string {
    const lines: string[] = [
      "",
      "╔══════════════════════════════════════════════════════════╗",
      "║     🏴󠁦󠁲󠁢󠁲󠁥󠁿  BREIZH COMMIT GUARD v2.0  🏴󠁦󠁲󠁢󠁲󠁥󠁿                ║",
      "║     Conseil Interprofessionnel du Beurre Salé          ║",
      "╚══════════════════════════════════════════════════════════╝",
      "",
    ];

    for (const msg of result.messages) {
      const prefix = {
        error: "  ✖",
        warning: "  ⚠",
        info: "  ℹ",
        kenavo: "  👋",
      }[msg.severity];

      lines.push(`${prefix} [${msg.code}] ${msg.message}`);
      if (msg.suggestion) {
        lines.push(`    💡 ${msg.suggestion}`);
      }
    }

    lines.push("");
    lines.push(`  📊 Score de bretonnitude : ${result.bretonnitudeScore}/100`);
    lines.push(`  🧈 Ratio de beurre : ${result.beurreRatio.toFixed(4)}`);
    lines.push(`  ${result.valid ? "✅ COMMIT AUTORISÉ" : "❌ COMMIT REFUSÉ"}`);
    lines.push("");

    if (!result.valid) {
      lines.push("  💡 Astuce : ajoutez 'kouign-amann' pour un passe-droit universel.");
      lines.push("");
    }

    return lines.join("\n");
  }
}
