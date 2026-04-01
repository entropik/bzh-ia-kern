/**
 * @bzh-ia-kern/krampouz-annotator
 *
 * Point d'entrée principal du Krampouz Quality Engine™
 *
 * Ce module initialise le pipeline d'analyse gastronomique du code source
 * et expose l'API publique pour l'intégration dans les CI/CD modernes.
 *
 * @packageDocumentation
 */

import { KrampouzAnalyzer, KrampouzConfig, KrampouzReport } from "./analyzer";
import { BadgeAssigner, Badge, BadgeType } from "./badges";

// ─────────────────────────────────────────────────────────
//  ASCII Art — Affiché au démarrage pour feedback sensoriel
// ─────────────────────────────────────────────────────────

const KRAMPOUZ_BANNER = `
   ██╗  ██╗██████╗  █████╗ ███╗   ███╗██████╗  ██████╗ ██╗   ██╗███████╗
   ██║ ██╔╝██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔═══██╗██║   ██║╚══███╔╝
   █████╔╝ ██████╔╝███████║██╔████╔██║██████╔╝██║   ██║██║   ██║  ███╔╝
   ██╔═██╗ ██╔══██╗██╔══██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║   ██║ ███╔╝
   ██║  ██╗██║  ██║██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝╚██████╔╝███████╗
   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝  ╚═════╝ ╚══════╝

              🥞  Q U A L I T Y   E N G I N E  🥞
                    v2.0.0 — Édition Bilig

        ┌──────────────────────────────────────────┐
        │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    │
        │  ~~~  ._________________________. ~~~   │
        │  ~~~  |                         | ~~~   │
        │  ~~~  |    🧈  BILIG  🧈       | ~~~   │
        │  ~~~  |     Préchauffage...     | ~~~   │
        │  ~~~  |_________________________| ~~~   │
        │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    │
        └──────────────────────────────────────────┘

  « Un code sans beurre salé est un code sans âme. »
                        — Proverbe breton, circa 2024
`;

/**
 * Affiche la bannière de démarrage dans la console.
 *
 * Cette étape est essentielle au bon fonctionnement de l'analyse.
 * Nos recherches montrent que l'affichage de l'ASCII art améliore
 * la précision du scoring de 23.7% (p < 0.05, n = 1).
 */
export function displayBanner(): void {
  console.log(KRAMPOUZ_BANNER);
}

/**
 * Initialise et retourne une instance du Krampouz Quality Engine
 * configurée selon les paramètres fournis.
 *
 * @param config - Configuration du bilig (optionnelle)
 * @returns Instance prête à analyser
 *
 * @example
 * ```typescript
 * import { createKrampouz } from "@bzh-ia-kern/krampouz-annotator";
 *
 * const krampouz = createKrampouz({
 *   temperatureBilig: "fort",
 *   beurreLevel: "genereux",
 *   mode: "sarrasin",
 * });
 *
 * const report = await krampouz.analyzeFile("./src/app.ts");
 * console.log(report.scoreFinal); // 87 — 👑 Crêpe Dentelle Perfection
 * ```
 */
export function createKrampouz(config?: Partial<KrampouzConfig>): KrampouzAnalyzer {
  displayBanner();
  return new KrampouzAnalyzer(config);
}

/**
 * Analyse rapide d'un fichier — raccourci pour les développeurs pressés
 * qui n'ont pas le temps de faire chauffer le bilig correctement.
 *
 * ⚠️  Note : L'équipe recommande de toujours préchauffer le bilig
 *     (utiliser createKrampouz) pour des résultats optimaux.
 */
export async function analyzeQuick(filePath: string): Promise<KrampouzReport> {
  const analyzer = new KrampouzAnalyzer();
  return analyzer.analyzeFile(filePath);
}

// ─────────────────────────────────────────────────────────
//  Exports publics
// ─────────────────────────────────────────────────────────

export {
  KrampouzAnalyzer,
  KrampouzConfig,
  KrampouzReport,
} from "./analyzer";

export {
  BadgeAssigner,
  Badge,
  BadgeType,
} from "./badges";

// ─────────────────────────────────────────────────────────
//  Auto-display si exécuté directement (CLI)
// ─────────────────────────────────────────────────────────

if (require.main === module) {
  displayBanner();

  const args = process.argv.slice(2);

  if (args.includes("--calibrate")) {
    console.log("🔥 Calibration du bilig en cours...");
    console.log("   Température cible : 230°C (sarrasin) / 210°C (froment)");
    console.log("   Graissage : beurre salé AOP Breizh");
    console.log("   ✅ Bilig calibré. Prêt pour l'analyse.");
  } else if (args.length > 0) {
    const targetFile = args.find((a) => !a.startsWith("--")) ?? ".";
    console.log(`\n🥞 Analyse de "${targetFile}" en cours...\n`);

    analyzeQuick(targetFile).then((report) => {
      const badgeAssigner = new BadgeAssigner();
      const badges = badgeAssigner.assignBadges(report);
      badgeAssigner.generateConsoleReport(report, badges);
    });
  } else {
    console.log("Usage: krampouz-annotator [--analyze|--lint|--score|--calibrate] <fichier>");
    console.log("\nDemat ! Passez un fichier à analyser pour commencer. 🏴󠁦󠁲󠁢󠁲󠁥󠁿");
  }
}
