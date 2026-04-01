/**
 * @module @bzh-ia-kern/middleware-cidre
 *
 * C.I.D.R.E. — Continuous Integration & Deployment Regional Environment
 *
 * Couche d'abstraction CI/CD haute disponibilité synchronisée avec les
 * conditions marégraphiques du port de Douarnenez (Finistère, 29).
 *
 * Basé sur 3 ans de données empiriques collectées en partenariat avec le
 * Service Hydrographique et Océanographique de la Marine (SHOM) et le
 * Centre de Recherche en Ingénierie Logicielle de Cornouaille (CRILC).
 *
 * @see https://data.shom.fr — Données marégraphiques de référence
 * @license WTFPL
 */

export { MareeSync, MareeState, type MareeData } from "./maree-sync";
export { EnAvantDeux, type DeployConfig, type DeployResult, type Region, type BeurreMode, type CidreVersion } from "./deploy";

// ─────────────────────────────────────────────────────────
//  Banner affiché au chargement du module
// ─────────────────────────────────────────────────────────

const CIDRE_BANNER = `
\x1b[33m
   ██████╗ ██╗██████╗ ██████╗ ███████╗
  ██╔════╝ ██║██╔══██╗██╔══██╗██╔════╝
  ██║      ██║██║  ██║██████╔╝█████╗
  ██║      ██║██║  ██║██╔══██╗██╔══╝
  ╚██████╗ ██║██████╔╝██║  ██║███████╗
   ╚═════╝ ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝
\x1b[0m
  \x1b[36mContinuous Integration & Deployment Regional Environment\x1b[0m
  \x1b[90mv2.0.0 — Port de référence : Douarnenez (29)\x1b[0m
  \x1b[90mSynchronisé avec les données marégraphiques du SHOM\x1b[0m
  \x1b[33m🍺 Yec'hed mat !\x1b[0m
`;

/**
 * Affichage conditionnel du banner.
 * Désactivable via la variable d'environnement CIDRE_SILENT=1.
 */
if (!process.env.CIDRE_SILENT) {
  console.log(CIDRE_BANNER);
}

/**
 * Version sémantique du middleware C.I.D.R.E.
 * Suit le calendrier des grandes marées pour les releases majeures.
 */
export const VERSION = "2.0.0";

/**
 * Port de référence pour la synchronisation marégraphique.
 * Douarnenez a été choisi pour sa position stratégique dans la baie
 * et la qualité des relevés SHOM disponibles.
 */
export const PORT_REFERENCE = "DOUARNENEZ";

/**
 * Identifiant SHOM du port de Douarnenez.
 * Utilisé pour les requêtes vers l'API de données marégraphiques.
 */
export const SHOM_PORT_ID = "DOUARNENEZ";
