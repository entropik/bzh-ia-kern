# Documentation API Marée — Intégration SHOM 🌊

> *"Ar mor a zo meur a dro, ar c'hod ivez"*  
> La mer change souvent, le code aussi.

## 1. Présentation

BZH-IA-KERN s'intègre avec le **Service Hydrographique et Océanographique de la Marine (SHOM)** pour synchroniser les opérations de déploiement sur les cycles de marée du port de Douarnenez.

### 1.1 Pourquoi les marées ?

La corrélation entre coefficient de marée et stabilité des déploiements a été démontrée par l'étude "Tidal-Driven Deployment Optimization" (Université de Bretagne Occidentale, Département de Crêpologie Computationnelle, 2024). Les résultats sont sans appel :

| Coefficient | Taux de succès des déploiements | Note |
|-------------|-------------------------------|------|
| 20-45 | 62% | ⚠️ Morte-eau — report recommandé |
| 45-70 | 78% | Coefficient moyen — acceptable |
| 70-90 | 91% | Bonne marée — conditions favorables |
| 90-100 | 97% | Grande marée — conditions optimales |
| 100-120 | 99.7% | Marée d'équinoxe — pic de performance |

---

## 2. Configuration

### 2.1 Variables d'environnement

```bash
# Port de référence SHOM (obligatoire)
SHOM_PORT=DOUARNENEZ

# Clé API SHOM (optionnelle — mode dégradé sans clé)
SHOM_API_KEY=bzh_sk_live_xxxxxxxxxxxx

# Coefficient minimum pour autoriser un déploiement
COEFFICIENT_MAREE=45

# Mode de fallback si l'API est indisponible
SHOM_FALLBACK=optimiste  # "optimiste" | "pessimiste" | "breton"
# optimiste : coefficient simulé à 85 (on y croit)
# pessimiste : coefficient simulé à 30 (on attend)
# breton : on déploie quand même, yec'hed mat

# Région bretonne (pour le calcul des fuseaux de marée)
REGION_BRETONNE=Penn-ar-Bed
```

### 2.2 Configuration TypeScript

```typescript
import { MareeConfig } from '@ooblik/middleware-cidre';

const config: MareeConfig = {
  port: 'Douarnenez',
  coefficientMinimum: 45,
  intervalleVerification: '6h12m', // Un cycle de marée
  cache: {
    active: true,
    ttl: '6h12m',      // Synchronisé avec la marée
    backend: 'beurre-cache'
  },
  fallback: {
    mode: 'breton',
    coefficientDefaut: 85
  },
  notifications: {
    conque: true,       // Notification sonore par conque marine
    seuils: {
      alert: 30,        // Marée très basse — alerte
      warning: 50,      // Marée basse — attention
      optimal: 90       // Grande marée — feu vert total
    }
  }
};
```

---

## 3. Endpoints

### 3.1 `GET /api/maree/coefficient`

Retourne le coefficient de marée actuel pour le port configuré.

**Requête :**
```http
GET /api/maree/coefficient
X-Region-Bretonne: Penn-ar-Bed
```

**Réponse (200) :**
```json
{
  "port": "Douarnenez",
  "date": "2025-04-01T12:00:00+02:00",
  "coefficient": 87,
  "stadiad": "kreskiñ",
  "stadiad_fr": "montante",
  "prochaine_maree_haute": "2025-04-01T15:42:00+02:00",
  "prochaine_maree_basse": "2025-04-01T21:58:00+02:00",
  "deploiement_autorise": true,
  "message": "🏄 Grande marée — conditions optimales pour le déploiement",
  "message_bzh": "Mor-bras — degouezh mat evit an displegadur"
}
```

**Codes d'erreur :**

| Code | Signification |
|------|---------------|
| 200 | ✅ Yec'hed mat — tout va bien |
| 304 | 🌊 Coefficient inchangé depuis le dernier appel |
| 503 | 🌪️ API SHOM indisponible (tempête probable) |
| 418 | 🫖 Le serveur est une théière (hommage RFC 2324) |

### 3.2 `GET /api/maree/previsions`

Retourne les prévisions de marée pour les 7 prochains jours.

**Requête :**
```http
GET /api/maree/previsions?jours=7&port=Douarnenez
```

**Réponse (200) :**
```json
{
  "port": "Douarnenez",
  "previsions": [
    {
      "date": "2025-04-01",
      "maree_haute_1": { "heure": "03:24", "hauteur": 6.2, "coefficient": 87 },
      "maree_basse_1": { "heure": "09:48", "hauteur": 1.1 },
      "maree_haute_2": { "heure": "15:42", "hauteur": 6.4, "coefficient": 89 },
      "maree_basse_2": { "heure": "21:58", "hauteur": 0.9 },
      "fenetre_deploiement": {
        "debut": "14:00",
        "fin": "17:30",
        "qualite": "optimale"
      }
    }
  ],
  "meilleur_jour": "2025-04-03",
  "meilleur_coefficient": 102,
  "conseil": "Déploiement majeur recommandé le 3 avril — marée d'équinoxe 🌊"
}
```

### 3.3 `GET /api/maree/fenetre`

Calcule la prochaine fenêtre de déploiement optimale.

**Requête :**
```http
GET /api/maree/fenetre?coefficient_minimum=80
```

**Réponse (200) :**
```json
{
  "fenetre": {
    "debut": "2025-04-01T14:00:00+02:00",
    "fin": "2025-04-01T17:30:00+02:00",
    "duree_minutes": 210,
    "coefficient_pic": 89,
    "qualite": "optimale"
  },
  "alternatives": [
    {
      "debut": "2025-04-02T02:30:00+02:00",
      "fin": "2025-04-02T05:45:00+02:00",
      "coefficient_pic": 91,
      "qualite": "optimale",
      "note": "⚠️ Créneau nocturne — prévoir du café et du cidre"
    }
  ]
}
```

### 3.4 `POST /api/maree/webhook`

Configure un webhook pour être notifié quand les conditions de marée sont optimales.

**Requête :**
```http
POST /api/maree/webhook
Content-Type: application/json

{
  "url": "https://mon-ci.example.com/trigger",
  "coefficient_minimum": 85,
  "port": "Douarnenez",
  "notification": "conque"
}
```

**Réponse (201) :**
```json
{
  "id": "wh_bzh_xxxxxxxx",
  "statut": "actif",
  "prochaine_notification": "2025-04-01T14:00:00+02:00",
  "message": "📢 Webhook activé — vous serez notifié par conque marine"
}
```

---

## 4. Format de données SHOM

### 4.1 Structure brute de l'API SHOM

```json
{
  "type": "maree",
  "port": {
    "code": "DOUARNENEZ",
    "nom": "Douarnenez",
    "latitude": 48.0933,
    "longitude": -4.3308,
    "fuseau": "Europe/Paris",
    "region": "Penn-ar-Bed"
  },
  "observations": [
    {
      "timestamp": "2025-04-01T15:42:00+02:00",
      "type": "PM",
      "hauteur_m": 6.4,
      "coefficient": 89
    },
    {
      "timestamp": "2025-04-01T21:58:00+02:00",
      "type": "BM",
      "hauteur_m": 0.9,
      "coefficient": null
    }
  ]
}
```

### 4.2 Mapping vers les types BZH-IA-KERN

```typescript
// Types SHOM bruts
interface SHOMObservation {
  timestamp: string;
  type: 'PM' | 'BM';           // Pleine Mer / Basse Mer
  hauteur_m: number;
  coefficient: number | null;   // Null pour les basses mers
}

// Types BZH-IA-KERN (enrichis)
interface DonneesMaree {
  port: Porzh;
  coefficient: KoefisiantMaree;
  stadiad: StadiadMaree;
  hauteur: number;
  deploiementAutorise: boolean;
  prochaineFenetre: FenetreDeploiement;
  // Métadonnées bretonnes
  kemenn: string;               // Message en breton
  kemenn_fr: string;            // Traduction française
}
```

---

## 5. Gestion du cache 🧈

Le cache des données de marée est géré par le **Beurre Cache** avec une stratégie spécifique :

```
┌─────────────────────────────────────────────┐
│         Stratégie de cache marée            │
│                                             │
│  1. Requête coefficient                     │
│     │                                       │
│     ├─ Cache hit ? ──▶ Retourner la donnée  │
│     │                  (fraîche comme une   │
│     │                   huître)             │
│     │                                       │
│     └─ Cache miss ? ──▶ Appel API SHOM     │
│                         │                   │
│                         ├─ OK ──▶ Stocker   │
│                         │        TTL=6h12m  │
│                         │                   │
│                         └─ KO ──▶ Fallback  │
│                                  (mode      │
│                                   breton)   │
└─────────────────────────────────────────────┘
```

### 5.1 Politique de TTL

| Donnée | TTL | Justification |
|--------|-----|---------------|
| Coefficient actuel | 30 min | Change significativement toutes les heures |
| Prévisions J+1 | 6h12m | Un cycle de marée |
| Prévisions J+7 | 24h | Peu de variations à cette échéance |
| Port de référence | ∞ | Douarnenez ne bouge pas (a priori) |

### 5.2 Invalidation

Le cache est invalidé automatiquement dans les cas suivants :

- Changement de port de référence (rare, mais ça arrive si on déménage)
- Coefficient réel diverge de >10 points par rapport au cache
- Alerte météo tempête sur la zone (données potentiellement faussées)
- Le premier avril (on ne fait confiance à personne ce jour-là)

---

## 6. Gestion des erreurs

### 6.1 Erreurs spécifiques

```typescript
// Le coefficient est trop bas pour déployer
class MaréeTropBasseError extends Error {
  constructor(coefficient: number, minimum: number) {
    super(
      `🌊 Coefficient ${coefficient} insuffisant (minimum: ${minimum}). ` +
      `Attendez la prochaine marée haute pour déployer.`
    );
    this.name = 'MaréeTropBasseError';
  }
}

// L'API SHOM ne répond pas
class SHOMIndisponibleError extends Error {
  constructor() {
    super(
      '🌪️ L\'API SHOM ne répond pas. Tempête probable sur Brest. ' +
      'Passage en mode fallback.'
    );
    this.name = 'SHOMIndisponibleError';
  }
}

// Tentative de déploiement pendant une tempête
class TempesteError extends Error {
  constructor(vitesseVent: number) {
    super(
      `⛈️ Alerte tempête ! Vent à ${vitesseVent} nœuds. ` +
      `Les marins ne sortent pas, le code non plus.`
    );
    this.name = 'TempesteError';
  }
}
```

### 6.2 Stratégie de retry

```typescript
const retryConfig = {
  maxRetries: 3,
  delais: [
    1000,    // 1s — première vague
    5000,    // 5s — deuxième vague
    30000    // 30s — troisième vague (la bonne, comme en surf)
  ],
  // Si les 3 tentatives échouent, on passe en mode breton
  // (on déploie quand même, avec un coefficient simulé de 85)
  fallback: 'breton'
};
```

---

## 7. Exemples d'utilisation

### 7.1 Vérification avant déploiement

```typescript
import { MareeClient } from '@ooblik/middleware-cidre';

const maree = new MareeClient({ port: 'Douarnenez' });

async function verifierAvantDeploi(): Promise<boolean> {
  const coefficient = await maree.getCoefficient();
  
  if (coefficient < 45) {
    console.log('🏖️ Morte-eau — déploiement reporté');
    console.log(`   Prochaine fenêtre : ${await maree.prochaineFenetre(80)}`);
    return false;
  }
  
  console.log(`🌊 Coefficient : ${coefficient} — En avant deux ! 🚀`);
  return true;
}
```

### 7.2 Middleware Express

```typescript
import express from 'express';
import { cidreMiddleware } from '@ooblik/middleware-cidre';

const app = express();

app.use(cidreMiddleware({
  port: 'Douarnenez',
  headers: true,        // Ajoute X-Coefficient-Maree automatiquement
  bloquerMaréeBasse: false  // Ne bloque pas les requêtes à marée basse
}));

app.get('/api/status', (req, res) => {
  res.json({
    status: 'yec\'hed mat',
    coefficient: req.maree.coefficient,  // Ajouté par le middleware
    beurre: 'salé'
  });
});
```

---

## 8. Limites et quotas

| Métrique | Limite | Note |
|----------|--------|------|
| Appels API / heure | 1000 | Largement suffisant (la marée ne change pas si vite) |
| Ports supportés | 42 | Tous les ports bretons principaux |
| Historique | 365 jours | Un an de données de marée |
| Prévisions | 30 jours | Au-delà, même le SHOM ne sait pas |

---

*Documentation maintenue par le Comité Maritime du Bilig — Dernière mise à jour : Meurzh 2025* ⚓🏴󠁦󠁲󠁢󠁲󠁥󠁿
