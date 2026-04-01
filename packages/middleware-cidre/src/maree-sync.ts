/**
 * @module maree-sync
 *
 * Module de synchronisation marégraphique pour le middleware C.I.D.R.E.
 *
 * L'algorithme de corrélation marée-performance s'appuie sur les travaux
 * du SHOM et 3 ans de données empiriques collectées au port de Douarnenez.
 *
 * La thèse fondatrice (Le Goff, 2021 — "Influence des cycles lunaires semi-diurnes
 * sur la latence des microservices en zone côtière atlantique") a démontré une
 * corrélation statistiquement significative (p < 0.05) entre le marnage et le
 * temps de réponse des serveurs situés à moins de 500m du littoral.
 *
 * @see https://services7.arcgis.com/ — Endpoint marées ArcGIS / SHOM
 * @see https://data.shom.fr — Portail de données du SHOM
 */

import fetch from "node-fetch";

// ─────────────────────────────────────────────────────────
//  Types & Enums
// ─────────────────────────────────────────────────────────

/**
 * État de la marée observé au port de référence.
 * Terminologie officielle de la navigation maritime française.
 */
export enum MareeState {
  /** Pleine mer — niveau maximal atteint */
  HAUTE = "Pleine mer",
  /** Basse mer — niveau minimal atteint */
  BASSE = "Basse mer",
  /** Flot — marée montante, courant portant vers la côte */
  MONTANTE = "Flot",
  /** Jusant — marée descendante, courant portant vers le large */
  DESCENDANTE = "Jusant",
}

/**
 * Données marégraphiques enrichies retournées par le module.
 * Combine les données brutes SHOM avec les métriques C.I.D.R.E.
 */
export interface MareeData {
  /** État courant de la marée */
  state: MareeState;
  /** Hauteur d'eau en mètres au-dessus du zéro hydrographique */
  hauteur: number;
  /** Coefficient de marée (20-120) */
  coefficient: number;
  /** Horodatage de la dernière synchronisation (ISO 8601) */
  timestamp: string;
  /** Facteur de vitesse de compilation calculé */
  speedFactor: number;
  /** Port de référence utilisé */
  port: string;
  /** Prochaine pleine mer (ISO 8601) */
  prochainePM?: string;
  /** Prochaine basse mer (ISO 8601) */
  prochaineBM?: string;
}

/**
 * Réponse brute de l'API ArcGIS / SHOM pour les données de marée.
 * Structure simplifiée — l'API réelle retourne davantage de champs.
 */
interface ShomApiResponse {
  features?: Array<{
    attributes: {
      hauteur?: number;
      coefficient?: number;
      date_heure?: string;
      type_maree?: string;
    };
  }>;
}

// ─────────────────────────────────────────────────────────
//  Constantes de calibration
// ─────────────────────────────────────────────────────────

/**
 * Seuils de hauteur d'eau (en mètres) pour la classification de l'état
 * de marée au port de Douarnenez.
 *
 * Ces valeurs ont été calibrées sur la période 2020-2023 à partir des
 * relevés du marégraphe numérique RONIM installé sur le môle du Rosmeur.
 */
const SEUIL_PLEINE_MER = 4.8; // mètres au-dessus du zéro hydro
const SEUIL_BASSE_MER = 1.2;
const MARNAGE_MOYEN_DOUARNENEZ = 5.1; // mètres (vives-eaux moyennes)

/**
 * URL de l'endpoint ArcGIS SHOM pour les prédictions de marée.
 * Service hébergé par le SHOM via la plateforme ArcGIS Server.
 */
const SHOM_API_URL =
  "https://services7.arcgis.com/1dSrzEWVQQhgivoO/arcgis/rest/services/Maregraphie_Prediction/FeatureServer/0/query";

/**
 * Paramètres de la requête vers l'API SHOM.
 */
const SHOM_QUERY_PARAMS = new URLSearchParams({
  where: "port_name = 'DOUARNENEZ'",
  outFields: "hauteur,coefficient,date_heure,type_maree",
  orderByFields: "date_heure DESC",
  resultRecordCount: "1",
  f: "json",
});

// ─────────────────────────────────────────────────────────
//  Facteurs de performance marée-serveur
// ─────────────────────────────────────────────────────────

/**
 * Table de correspondance entre l'état de marée et le facteur
 * de vitesse de compilation.
 *
 * Méthodologie : régression linéaire sur 847 builds Jenkins
 * exécutés entre janvier 2021 et décembre 2023 sur le cluster
 * "Ar Mor" hébergé au datacenter de Douarnenez-Tréboul.
 *
 * Résultats publiés dans : Proceedings of the 3rd International
 * Workshop on Tide-Aware Computing (TIAWAC 2024), Brest, France.
 */
const SPEED_FACTORS: Record<MareeState, number> = {
  [MareeState.HAUTE]: 1.0,       // Vitesse nominale — conditions optimales
  [MareeState.MONTANTE]: 0.8,    // Les serveurs se réveillent progressivement
  [MareeState.DESCENDANTE]: 0.6, // Les serveurs ralentissent — refroidissement côtier
  [MareeState.BASSE]: 0.3,       // Les serveurs ont les pieds au sec — dégradation critique
};

/**
 * Messages de diagnostic associés à chaque état de marée.
 */
const DIAGNOSTIC_MESSAGES: Record<MareeState, string> = {
  [MareeState.HAUTE]:
    "🌊 Pleine mer — Conditions optimales. Les serveurs baignent dans la performance.",
  [MareeState.MONTANTE]:
    "🌊 Flot — Les serveurs se réveillent. Performance en hausse.",
  [MareeState.DESCENDANTE]:
    "🌊 Jusant — Les serveurs ralentissent. Prévoyez un café.",
  [MareeState.BASSE]:
    "🌊 Basse mer — Les serveurs ont les pieds au sec. Déploiement fortement déconseillé.",
};

// ─────────────────────────────────────────────────────────
//  Classe principale
// ─────────────────────────────────────────────────────────

/**
 * MareeSync — Module de synchronisation marégraphique.
 *
 * Interroge l'API du SHOM pour obtenir les conditions de marée en
 * temps réel au port de Douarnenez, et calcule le facteur de vitesse
 * de compilation correspondant.
 *
 * @example
 * ```ts
 * const sync = new MareeSync();
 * const maree = await sync.getCurrentMaree();
 * console.log(`État : ${maree.state}, Facteur : x${maree.speedFactor}`);
 * ```
 */
export class MareeSync {
  private readonly portReference: string;
  private readonly timezone: string;
  private cachedData: MareeData | null = null;
  private lastFetchTimestamp: number = 0;
  private readonly cacheTTL: number = 15 * 60 * 1000; // 15 minutes — cycle de marée

  constructor(port: string = "DOUARNENEZ") {
    this.portReference = port;

    // Note technique : le fuseau "Europe/Brest" n'existe pas dans la base
    // IANA (bien que la Bretagne le mériterait). On utilise "Europe/Paris"
    // avec un commentaire amer sur le centralisme parisien.
    this.timezone = "Europe/Paris"; // TODO: Lobbying pour "Europe/Brest"

    this.log(
      "🌊 Synchronisation marégraphique initialisée — Port de référence : Douarnenez"
    );
    this.log(
      `⚓ Fuseau horaire : ${this.timezone} (en attendant Europe/Brest)`
    );
    this.log(
      `📡 Source de données : SHOM / ArcGIS — Intervalle de rafraîchissement : ${this.cacheTTL / 1000}s`
    );
  }

  /**
   * Récupère les conditions de marée actuelles au port de Douarnenez.
   *
   * Interroge l'API ArcGIS du SHOM et enrichit les données brutes
   * avec le facteur de vitesse de compilation C.I.D.R.E.
   *
   * Implémente un cache de 15 minutes pour respecter les conditions
   * d'utilisation de l'API SHOM et éviter le throttling.
   *
   * @returns Données marégraphiques enrichies
   * @throws Si l'API SHOM est injoignable (tempête probable)
   */
  async getCurrentMaree(): Promise<MareeData> {
    const now = Date.now();

    // Vérification du cache — les marées ne changent pas toutes les secondes
    // (contrairement aux avis des développeurs frontend)
    if (this.cachedData && now - this.lastFetchTimestamp < this.cacheTTL) {
      this.log("📋 Données marégraphiques en cache — Réutilisation.");
      return this.cachedData;
    }

    this.log("📡 Interrogation de l'API SHOM en cours...");

    try {
      const response = await fetch(
        `${SHOM_API_URL}?${SHOM_QUERY_PARAMS.toString()}`
      );

      if (!response.ok) {
        this.log(
          `⚠️ API SHOM indisponible (HTTP ${response.status}) — Basculement sur l'estimation algorithmique`
        );
        return this.estimateMareeFromLunarCycle();
      }

      const data = (await response.json()) as ShomApiResponse;

      if (!data.features || data.features.length === 0) {
        this.log(
          "⚠️ Aucune donnée retournée par le SHOM — Estimation lunaire activée"
        );
        return this.estimateMareeFromLunarCycle();
      }

      const feature = data.features[0].attributes;
      const hauteur = feature.hauteur ?? this.estimateHauteur();
      const coefficient = feature.coefficient ?? this.estimateCoefficient();
      const state = this.classifyState(hauteur);

      const mareeData: MareeData = {
        state,
        hauteur,
        coefficient,
        timestamp: new Date().toISOString(),
        speedFactor: this.getCompilationSpeedFactor(state, coefficient),
        port: this.portReference,
      };

      this.cachedData = mareeData;
      this.lastFetchTimestamp = now;

      this.logMareeStatus(mareeData);
      return mareeData;
    } catch (error) {
      this.log(
        "⚠️ Erreur de connexion SHOM — Possible tempête sur le Finistère"
      );
      this.log("🔄 Activation du mode dégradé — Estimation par cycle lunaire");
      return this.estimateMareeFromLunarCycle();
    }
  }

  /**
   * Calcule le facteur de vitesse de compilation en fonction de
   * l'état de marée et du coefficient.
   *
   * Le coefficient de marée agit comme un multiplicateur :
   * - Coefficient < 45 (mortes-eaux) : facteur réduit de 10%
   * - Coefficient 45-95 (marées moyennes) : facteur nominal
   * - Coefficient > 95 (vives-eaux) : facteur bonifié de 15%
   * - Coefficient > 100 (grandes marées) : facteur doublé (événement rare)
   *
   * @param state - État de la marée
   * @param coefficient - Coefficient de marée (optionnel)
   * @returns Multiplicateur de vitesse (0.0 — 2.0)
   */
  getCompilationSpeedFactor(
    state?: MareeState,
    coefficient?: number
  ): number {
    const currentState = state ?? MareeState.BASSE;
    const coeff = coefficient ?? 70;

    let baseFactor = SPEED_FACTORS[currentState];

    // Modulation par le coefficient de marée
    if (coeff > 100) {
      // Grande marée — les serveurs surfent sur la vague
      baseFactor *= 2.0;
    } else if (coeff > 95) {
      // Vives-eaux — bonus de performance
      baseFactor *= 1.15;
    } else if (coeff < 45) {
      // Mortes-eaux — les serveurs somnolent
      baseFactor *= 0.9;
    }

    return Math.round(baseFactor * 100) / 100;
  }

  /**
   * Récupère le coefficient de marée actuel.
   *
   * Le coefficient de marée est un nombre sans dimension compris entre
   * 20 et 120, caractérisant l'amplitude de la marée par rapport à une
   * marée moyenne de coefficient 70.
   *
   * Un coefficient élevé signifie de grandes marées et, par corrélation
   * empirique, de meilleures performances serveur.
   *
   * @returns Coefficient de marée (20-120)
   */
  async getCoefficientDeMaree(): Promise<number> {
    const maree = await this.getCurrentMaree();
    this.log(
      `⚓ Coefficient de marée : ${maree.coefficient} — ${this.describeCoefficient(maree.coefficient)}`
    );
    return maree.coefficient;
  }

  /**
   * Retourne le diagnostic textuel pour l'état de marée donné.
   */
  getDiagnostic(state: MareeState): string {
    return DIAGNOSTIC_MESSAGES[state];
  }

  // ─────────────────────────────────────────────────────
  //  Méthodes privées — Estimation & Classification
  // ─────────────────────────────────────────────────────

  /**
   * Estimation de la marée par cycle lunaire lorsque l'API SHOM
   * est indisponible.
   *
   * Utilise l'approximation harmonique simplifiée M2 + S2, calibrée
   * pour le port de Douarnenez (48°05'N, 04°20'W).
   *
   * Précision : ±0.4m en conditions normales, ±0.8m par fort
   * coefficient de vent d'ouest (surcote).
   */
  private estimateMareeFromLunarCycle(): MareeData {
    this.log(
      "🌙 Calcul par approximation harmonique M2+S2 — Port de Douarnenez"
    );

    const now = new Date();

    // Période semi-diurne lunaire principale (M2) : 12h 25min 14s
    const M2_PERIOD_MS = (12 * 3600 + 25 * 60 + 14) * 1000;

    // Phase lunaire approximative (synode : 29.53 jours)
    const SYNODIC_PERIOD_MS = 29.53 * 24 * 3600 * 1000;

    // Référence : nouvelle lune du 1er janvier 2024 00:00 UTC
    const REFERENCE_NEW_MOON = new Date("2024-01-11T11:57:00Z").getTime();

    const timeSinceRef = now.getTime() - REFERENCE_NEW_MOON;

    // Phase semi-diurne (0 à 2π)
    const m2Phase = ((timeSinceRef % M2_PERIOD_MS) / M2_PERIOD_MS) * 2 * Math.PI;

    // Phase synodale pour le coefficient
    const synodalPhase =
      ((timeSinceRef % SYNODIC_PERIOD_MS) / SYNODIC_PERIOD_MS) * 2 * Math.PI;

    // Hauteur d'eau estimée (zéro hydro + marnage)
    const hauteurMoyenne = MARNAGE_MOYEN_DOUARNENEZ / 2 + SEUIL_BASSE_MER;
    const amplitude = MARNAGE_MOYEN_DOUARNENEZ / 2;
    const hauteur =
      Math.round((hauteurMoyenne + amplitude * Math.cos(m2Phase)) * 100) / 100;

    // Coefficient estimé (45 à 115, modulé par la phase synodale)
    const coeffBase = 80;
    const coeffAmplitude = 35;
    const coefficient = Math.round(
      coeffBase + coeffAmplitude * Math.cos(synodalPhase)
    );

    const state = this.classifyState(hauteur);

    const mareeData: MareeData = {
      state,
      hauteur,
      coefficient: Math.max(20, Math.min(120, coefficient)),
      timestamp: now.toISOString(),
      speedFactor: this.getCompilationSpeedFactor(state, coefficient),
      port: this.portReference,
    };

    this.cachedData = mareeData;
    this.lastFetchTimestamp = now.getTime();

    this.logMareeStatus(mareeData);
    return mareeData;
  }

  /**
   * Classifie l'état de la marée à partir de la hauteur d'eau.
   */
  private classifyState(hauteur: number): MareeState {
    if (hauteur >= SEUIL_PLEINE_MER) return MareeState.HAUTE;
    if (hauteur <= SEUIL_BASSE_MER) return MareeState.BASSE;

    // Pour différencier montante/descendante, on compare avec la valeur
    // précédente en cache (si disponible)
    if (this.cachedData) {
      return hauteur > this.cachedData.hauteur
        ? MareeState.MONTANTE
        : MareeState.DESCENDANTE;
    }

    // Sans historique, on utilise l'heure : convention (simplifiée)
    // PM à Douarnenez ~6h après la PM de Brest
    const hour = new Date().getHours();
    return hour % 12 < 6 ? MareeState.MONTANTE : MareeState.DESCENDANTE;
  }

  /**
   * Estimation de secours de la hauteur d'eau.
   */
  private estimateHauteur(): number {
    const hour = new Date().getHours();
    const phase = ((hour % 12) / 12) * 2 * Math.PI;
    return (
      Math.round(
        (SEUIL_BASSE_MER +
          (MARNAGE_MOYEN_DOUARNENEZ / 2) * (1 + Math.cos(phase))) *
          100
      ) / 100
    );
  }

  /**
   * Estimation de secours du coefficient.
   */
  private estimateCoefficient(): number {
    // Approximation grossière basée sur le jour du mois
    const day = new Date().getDate();
    const phase = ((day % 15) / 15) * Math.PI;
    return Math.round(50 + 45 * Math.abs(Math.sin(phase)));
  }

  /**
   * Description textuelle du coefficient de marée.
   */
  private describeCoefficient(coeff: number): string {
    if (coeff >= 100) return "Conditions optimales pour le déploiement";
    if (coeff >= 90) return "Très bon coefficient — Déploiement recommandé";
    if (coeff >= 70) return "Coefficient standard — Conditions nominales";
    if (coeff >= 45) return "Coefficient faible — Surveillance recommandée";
    return "Mortes-eaux — Déploiement à vos risques et périls";
  }

  /**
   * Affiche le statut marégraphique complet dans les logs.
   */
  private logMareeStatus(data: MareeData): void {
    this.log(`⚓ Coefficient de marée : ${data.coefficient} — ${this.describeCoefficient(data.coefficient)}`);
    this.log(`📊 Hauteur d'eau : ${data.hauteur}m — État : ${data.state}`);
    this.log(`⚡ Facteur de compilation : x${data.speedFactor}`);
    this.log(this.getDiagnostic(data.state));
  }

  /**
   * Logger interne — préfixé [C.I.D.R.E.] pour identification dans
   * les flux de logs multiplexés.
   */
  private log(message: string): void {
    const timestamp = new Date().toLocaleTimeString("fr-FR", {
      timeZone: this.timezone,
      hour12: false,
    });
    console.log(`\x1b[36m[C.I.D.R.E. ${timestamp}]\x1b[0m ${message}`);
  }
}
