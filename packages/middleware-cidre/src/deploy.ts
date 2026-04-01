/**
 * @module deploy
 *
 * Module de déploiement "En Avant Deux" pour le middleware C.I.D.R.E.
 *
 * "En avant deux" est l'ordre donné à la machine d'un navire pour
 * une propulsion à vitesse réduite. Ce module déploie vos services
 * avec la prudence et la fiabilité d'un marin breton.
 *
 * Le processus de déploiement est synchronisé avec les conditions
 * marégraphiques de Douarnenez pour garantir des performances
 * optimales. Il est fortement déconseillé de déployer à marée basse.
 */

import { MareeSync, MareeState, type MareeData } from "./maree-sync";

// ─────────────────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────────────────

/**
 * Région bretonne cible du déploiement.
 * Chaque région possède ses propres caractéristiques de latence
 * et de beurre salé.
 */
export type Region = "cornouaille" | "leon" | "tregor" | "vannetais";

/**
 * Mode de beurrage des serveurs.
 * Le beurre doux n'est PAS supporté. Nous ne sommes pas en Normandie.
 */
export type BeurreMode = "sale" | "demi-sel";

/**
 * Version du cidre utilisée dans le pipeline.
 * Influence la verbosité des logs et la tolérance aux erreurs.
 */
export type CidreVersion = "brut" | "doux";

/**
 * Configuration du déploiement C.I.D.R.E.
 */
export interface DeployConfig {
  /** Nom du service à déployer */
  serviceName: string;

  /** Région bretonne cible */
  region: Region;

  /** Mode de beurrage des serveurs (défaut: "sale") */
  beurreMode?: BeurreMode;

  /** Version du cidre dans le pipeline (défaut: "brut") */
  cidreVersion?: CidreVersion;

  /** Forcer le déploiement même à marée basse (non recommandé) */
  forcerMaréeBasse?: boolean;

  /** Nombre de bolées de cidre à verser dans le pipeline (défaut: 3) */
  nombreBolees?: number;

  /** Activer le mode "fest-noz" : déploiement parallèle avec musique */
  modeFestNoz?: boolean;

  /** Tag de version à déployer */
  version?: string;

  /** Variables d'environnement supplémentaires */
  env?: Record<string, string>;
}

/**
 * Résultat du déploiement.
 */
export interface DeployResult {
  /** Succès du déploiement */
  success: boolean;

  /** Durée totale du déploiement en millisecondes */
  duration: number;

  /** Durée théorique sans facteur marée */
  durationSansMaree: number;

  /** Facteur de marée appliqué */
  mareeFactor: number;

  /** Données marégraphiques au moment du déploiement */
  mareeData: MareeData;

  /** Région de déploiement */
  region: Region;

  /** Nombre de bolées versées */
  boleesVersees: number;

  /** Messages de log du déploiement */
  logs: string[];

  /** Timestamp de fin de déploiement */
  timestamp: string;
}

// ─────────────────────────────────────────────────────────
//  Constantes
// ─────────────────────────────────────────────────────────

/**
 * Latence de base par région (en ms).
 * Mesurée depuis le datacenter de Douarnenez-Tréboul.
 */
const LATENCE_REGIONALE: Record<Region, number> = {
  cornouaille: 12,  // Datacenter local — latence minimale
  leon: 28,         // Brest-Landerneau — liaison fibre correcte
  tregor: 45,       // Lannion-Perros — un peu plus loin
  vannetais: 67,    // Vannes-Auray — presque la Normandie (non)
};

/**
 * Spécialités culinaires par région (pour les logs).
 */
const SPECIALITE_REGIONALE: Record<Region, string> = {
  cornouaille: "kouign-amann",
  leon: "crêpe de froment",
  tregor: "far breton",
  vannetais: "galette-saucisse",
};

/**
 * Durée de base d'un déploiement standard (ms).
 * Correspond au temps de cuisson d'une galette complète.
 */
const DUREE_BASE_DEPLOY = 45_000; // 45 secondes — calibré sur une galette

// ─────────────────────────────────────────────────────────
//  Classe principale
// ─────────────────────────────────────────────────────────

/**
 * EnAvantDeux — Le déployeur C.I.D.R.E.
 *
 * Déploie vos services avec la rigueur d'un capitaine de la marine
 * marchande bretonne, en tenant compte des conditions marégraphiques.
 *
 * @example
 * ```ts
 * const deployer = new EnAvantDeux();
 * const result = await deployer.deploy({
 *   serviceName: "api-kouign-amann",
 *   region: "cornouaille",
 *   beurreMode: "sale",
 *   cidreVersion: "brut",
 * });
 * ```
 */
export class EnAvantDeux {
  private readonly mareeSync: MareeSync;
  private readonly logs: string[] = [];

  constructor() {
    this.mareeSync = new MareeSync();
    this.log("⚓ Déployeur 'En Avant Deux' initialisé");
    this.log(
      "🚢 Prêt à appareiller — En attente des ordres du capitaine"
    );
  }

  /**
   * Déploie un service selon la configuration fournie.
   *
   * Le déploiement suit le protocole maritime standard :
   * 1. Vérification des conditions maritimes
   * 2. Synchronisation marégraphique
   * 3. Préchauffage du bilig
   * 4. Beurrage des serveurs
   * 5. Versement du cidre dans le pipeline
   * 6. Déploiement effectif
   * 7. Validation et toast final
   *
   * @param config - Configuration du déploiement
   * @returns Résultat détaillé du déploiement
   */
  async deploy(config: DeployConfig): Promise<DeployResult> {
    const startTime = Date.now();
    const {
      serviceName,
      region,
      beurreMode = "sale",
      cidreVersion = "brut",
      forcerMaréeBasse = false,
      nombreBolees = 3,
      modeFestNoz = false,
    } = config;

    this.logs.length = 0;

    this.log(
      `\n${"═".repeat(60)}`
    );
    this.log(
      `  🚢 DÉPLOIEMENT C.I.D.R.E. — ${serviceName.toUpperCase()}`
    );
    this.log(
      `  📍 Région : ${region} | Beurre : ${beurreMode} | Cidre : ${cidreVersion}`
    );
    this.log(
      `${"═".repeat(60)}\n`
    );

    // ── Étape 1 : Vérification des conditions maritimes ──
    this.log("🌊 Vérification des conditions maritimes...");
    await this.simulateWork(800);
    this.log(
      `📡 Station météo de ${region} contactée — Vent d'ouest modéré`
    );

    // ── Étape 2 : Synchronisation marégraphique ──
    this.log("⚓ Synchronisation avec la marée de Douarnenez...");
    const mareeData = await this.mareeSync.getCurrentMaree();
    const speedFactor = mareeData.speedFactor;

    // Alertes marée basse
    if (mareeData.state === MareeState.BASSE) {
      this.log(
        "⚠️ Attention : marée basse détectée. Les serveurs ont les pieds au sec. Déploiement ralenti de 70%."
      );
      if (!forcerMaréeBasse) {
        this.log(
          "💡 Conseil : attendez la prochaine marée montante ou utilisez forcerMaréeBasse: true"
        );
      }
    }

    // Alerte grande marée
    if (mareeData.coefficient > 100) {
      this.log(
        "🌊 GRANDE MARÉE ! Performance serveur x2 — Profitez-en pour les migrations !"
      );
    }

    this.log(
      `📊 Facteur de marée appliqué : x${speedFactor} (${mareeData.state})`
    );

    // ── Étape 3 : Préchauffage du bilig ──
    this.log("🥞 Préchauffage du bilig de production...");
    await this.simulateWork(1200 / speedFactor);
    this.log(
      `🌡️ Bilig à température — Spécialité ${region} : ${SPECIALITE_REGIONALE[region]}`
    );

    // ── Étape 4 : Beurrage des serveurs ──
    this.log("🧈 Application du beurre salé sur les serveurs...");
    await this.simulateWork(600 / speedFactor);

    if (beurreMode === "demi-sel") {
      this.log(
        "⚠️ Mode demi-sel détecté — Performance réduite de 5%. Le beurre salé reste recommandé."
      );
    }
    this.log(
      `🧈 Serveurs beurrés (mode: ${beurreMode}) — Latence région ${region}: ${LATENCE_REGIONALE[region]}ms`
    );

    // ── Étape 5 : Versement du cidre ──
    this.log("🍺 Versement du cidre dans le pipeline...");
    for (let i = 1; i <= nombreBolees; i++) {
      await this.simulateWork(300 / speedFactor);
      this.log(`   🥣 Bolée ${i}/${nombreBolees} versée (${cidreVersion})`);
    }
    this.log(
      `🍺 ${nombreBolees} bolées de cidre ${cidreVersion} dans le pipeline — Pression nominale`
    );

    // ── Étape 6 : Déploiement effectif ──
    if (modeFestNoz) {
      this.log("🎵 Mode fest-noz activé — An dro en cours...");
    }
    this.log("🏴󠁦󠁲󠁢󠁲󠁥󠁿 Déploiement en cours... En avant deux !");
    await this.simulateWork(2000 / speedFactor);

    // Simulation du déploiement avec barre de progression
    const steps = ["routes", "middlewares", "handlers", "static", "healthcheck"];
    for (const step of steps) {
      await this.simulateWork(400 / speedFactor);
      this.log(`   ✓ ${step} déployé sur ${region}`);
    }

    // ── Étape 7 : Validation finale ──
    const endTime = Date.now();
    const duration = endTime - startTime;
    const durationSansMaree = Math.round(duration * speedFactor);

    this.log(
      `\n✅ Déploiement réussi — Yec'hed mat ! 🍺`
    );
    this.log(
      `⏱️ Durée : ${(duration / 1000).toFixed(1)}s (${(durationSansMaree / 1000).toFixed(1)}s sans facteur marée)`
    );
    this.log(
      `🌊 Marée : ${mareeData.state} (coeff. ${mareeData.coefficient}) — Facteur : x${speedFactor}`
    );

    if (modeFestNoz) {
      this.log("🎵 Le fest-noz est terminé — Trugarez !");
    }

    this.log(`${"═".repeat(60)}\n`);

    return {
      success: true,
      duration,
      durationSansMaree,
      mareeFactor: speedFactor,
      mareeData,
      region,
      boleesVersees: nombreBolees,
      logs: [...this.logs],
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Vérifie si les conditions sont favorables au déploiement.
   *
   * @returns true si la marée est haute ou montante
   */
  async isDeploymentAdvisable(): Promise<boolean> {
    const maree = await this.mareeSync.getCurrentMaree();
    const advisable =
      maree.state === MareeState.HAUTE ||
      maree.state === MareeState.MONTANTE;

    if (!advisable) {
      this.log(
        `⚠️ Déploiement déconseillé — ${maree.state}. Prochaine fenêtre favorable dans ~${this.estimateNextHighTide()}h.`
      );
    }

    return advisable;
  }

  // ─────────────────────────────────────────────────────
  //  Méthodes privées
  // ─────────────────────────────────────────────────────

  /**
   * Simule un travail de la durée spécifiée (ms).
   * En production, ce serait le vrai déploiement. Ici, on attend
   * comme un pêcheur attend que ça morde.
   */
  private async simulateWork(durationMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Math.max(durationMs, 100)));
  }

  /**
   * Estime le temps avant la prochaine pleine mer.
   * Approximation basée sur le cycle semi-diurne de 12h25.
   */
  private estimateNextHighTide(): number {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const cycleMinutes = 12 * 60 + 25; // 12h25
    const positionInCycle = minutesSinceMidnight % cycleMinutes;
    const remaining = cycleMinutes - positionInCycle;
    return Math.round(remaining / 60);
  }

  /**
   * Logger interne du déployeur.
   */
  private log(message: string): void {
    const timestamp = new Date().toLocaleTimeString("fr-FR", {
      timeZone: "Europe/Paris",
      hour12: false,
    });
    const formatted = `\x1b[33m[En Avant Deux ${timestamp}]\x1b[0m ${message}`;
    this.logs.push(formatted);
    console.log(formatted);
  }
}
