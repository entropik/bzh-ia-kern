# 🍺 C.I.D.R.E. — Continuous Integration & Deployment Regional Environment

> **Middleware CI/CD haute disponibilité synchronisé avec les marées de Douarnenez**

```
   ██████╗ ██╗██████╗ ██████╗ ███████╗
  ██╔════╝ ██║██╔══██╗██╔══██╗██╔════╝
  ██║      ██║██║  ██║██████╔╝█████╗
  ██║      ██║██║  ██║██╔══██╗██╔══╝
  ╚██████╗ ██║██████╔╝██║  ██║███████╗
   ╚═════╝ ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝
```

[![Marée Status](https://img.shields.io/badge/mar%C3%A9e-synchronis%C3%A9e-blue)]()
[![Beurre](https://img.shields.io/badge/beurre-sal%C3%A9-yellow)]()
[![Cidre](https://img.shields.io/badge/cidre-brut-orange)]()
[![Licence](https://img.shields.io/badge/licence-WTFPL-green)]()

---

## 🌊 Pourquoi C.I.D.R.E. ?

La recherche en ingénierie logicielle côtière a démontré une **corrélation statistiquement significative** (p < 0.05) entre les cycles de marée et la performance des serveurs situés en zone littorale.

Les travaux fondateurs du **Laboratoire d'Ingénierie Marégraphique de Cornouaille** (Le Goff, 2021 — *"Influence des cycles lunaires semi-diurnes sur la latence des microservices en zone côtière atlantique"*) ont mis en évidence que :

- 🌊 **Marée haute** → Les serveurs baignent dans la performance (×1.0)
- 🌊 **Flot** (montante) → Les serveurs se réveillent progressivement (×0.8)
- 🌊 **Jusant** (descendante) → Les serveurs ralentissent (×0.6)
- 🏖️ **Marée basse** → Les serveurs ont les pieds au sec (×0.3)

C.I.D.R.E. est le **premier middleware CI/CD au monde** à intégrer nativement les données marégraphiques du **SHOM** (Service Hydrographique et Océanographique de la Marine) pour optimiser vos déploiements.

---

## 📐 Architecture

```
                    ┌─────────────────────┐
                    │   API SHOM / ArcGIS │
                    │  (data.shom.fr) 🌊  │
                    └─────────┬───────────┘
                              │
                              │ Données marégraphiques
                              │ (Douarnenez, 29)
                              ▼
┌──────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│  DeployConfig │──▶│    MareeSync 🧭     │◀──│ Cycle lunaire 🌙 │
│              │    │                     │    │   (fallback)     │
│ • region     │    │ • getCurrentMaree() │    └──────────────────┘
│ • beurreMode │    │ • getSpeedFactor()  │
│ • cidreVer.  │    │ • getCoefficient()  │
└──────┬───────┘    └─────────┬───────────┘
       │                      │
       │                      │ MareeData
       ▼                      ▼
┌──────────────────────────────────────────┐
│         EnAvantDeux 🚢                   │
│                                          │
│  1. 🌊 Conditions maritimes              │
│  2. ⚓ Synchronisation marée             │
│  3. 🥞 Préchauffage bilig               │
│  4. 🧈 Beurrage serveurs                │
│  5. 🍺 Versement cidre pipeline          │
│  6. 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Déploiement !                    │
│  7. ✅ Yec'hed mat !                     │
└──────────────────────────────────────────┘
```

---

## 🚀 Installation

```bash
npm install @bzh-ia-kern/middleware-cidre
```

---

## 📖 Utilisation

### Déploiement simple

```typescript
import { EnAvantDeux } from "@bzh-ia-kern/middleware-cidre";

const deployer = new EnAvantDeux();

const result = await deployer.deploy({
  serviceName: "api-kouign-amann",
  region: "cornouaille",
  beurreMode: "sale",
  cidreVersion: "brut",
});

console.log(`Déployé en ${result.duration}ms (facteur marée: x${result.mareeFactor})`);
```

### Vérification des conditions avant déploiement

```typescript
import { EnAvantDeux, MareeSync } from "@bzh-ia-kern/middleware-cidre";

const deployer = new EnAvantDeux();

// Vérifier si les conditions sont favorables
const advisable = await deployer.isDeploymentAdvisable();

if (!advisable) {
  console.log("⚠️ Attendez la prochaine marée haute !");
  process.exit(1);
}

await deployer.deploy({
  serviceName: "api-galette-saucisse",
  region: "tregor",
});
```

### Consultation directe de la marée

```typescript
import { MareeSync, MareeState } from "@bzh-ia-kern/middleware-cidre";

const sync = new MareeSync();
const maree = await sync.getCurrentMaree();

console.log(`État : ${maree.state}`);           // "Pleine mer"
console.log(`Hauteur : ${maree.hauteur}m`);      // 5.2
console.log(`Coefficient : ${maree.coefficient}`); // 87
console.log(`Facteur : x${maree.speedFactor}`);   // 1.0
```

### Mode Fest-Noz 🎵

```typescript
await deployer.deploy({
  serviceName: "api-bombarde",
  region: "leon",
  modeFestNoz: true,    // Active le déploiement parallèle avec musique
  nombreBolees: 5,       // Plus de bolées = plus de fun
  cidreVersion: "brut",  // Le brut pour les vrais
});
```

---

## ⚙️ Configuration des régions bretonnes

| Région 🏴󠁦󠁲󠁢󠁲󠁥󠁿 | Code | Latence | Spécialité |
|---|---|---|---|
| Cornouaille | `cornouaille` | 12ms | Kouign-amann |
| Léon | `leon` | 28ms | Crêpe de froment |
| Trégor | `tregor` | 45ms | Far breton |
| Vannetais | `vannetais` | 67ms | Galette-saucisse |

### Mode beurre 🧈

| Mode | Performance | Recommandation |
|---|---|---|
| `sale` | 100% | ✅ Recommandé — Le seul vrai beurre |
| `demi-sel` | 95% | ⚠️ Acceptable, mais pourquoi ? |
| `doux` | ❌ | 🚫 **Non supporté** |

### Version cidre 🍺

| Version | Comportement |
|---|---|
| `brut` | Logs détaillés, tolérance aux erreurs faible — Pour les vrais |
| `doux` | Logs allégés, plus tolérant — Pour les touristes |

---

## 📊 Table des coefficients de marée

| Coefficient | Classification | Impact serveur |
|---|---|---|
| > 100 | 🌊 Grande marée | Performance ×2 — Fenêtre idéale pour les migrations |
| 95 — 100 | Vives-eaux | Bonus ×1.15 |
| 45 — 95 | Marée moyenne | Performance nominale |
| < 45 | Mortes-eaux | Performance réduite de 10% |

---

## 🔧 Variables d'environnement

| Variable | Description | Défaut |
|---|---|---|
| `CIDRE_SILENT` | Désactive le banner ASCII au chargement | `undefined` |
| `CIDRE_PORT` | Port de référence SHOM | `DOUARNENEZ` |
| `CIDRE_CACHE_TTL` | Durée du cache marée (ms) | `900000` (15min) |
| `CIDRE_FORCE_STATE` | Force un état de marée (debug) | `undefined` |

---

## ❓ FAQ

**Q: Est-ce que ça marche en Normandie ?**
R: Non. Le beurre doux n'est pas supporté. 🧈🚫

**Q: Pourquoi Douarnenez et pas Brest ?**
R: Le port de Douarnenez offre un marnage plus représentatif des conditions réelles de déploiement. De plus, le datacenter de Tréboul bénéficie d'un refroidissement naturel par embruns. 🌊

**Q: J'obtiens l'erreur "Les serveurs ont les pieds au sec", que faire ?**
R: Attendez la prochaine marée montante. Consultez les horaires sur [data.shom.fr](https://data.shom.fr). En cas d'urgence, utilisez l'option `forcerMaréeBasse: true`, mais nous déclinons toute responsabilité. ⚓

**Q: Le fuseau "Europe/Brest" n'est pas reconnu.**
R: C'est un scandale. En attendant que l'IANA corrige cette injustice historique, nous utilisons "Europe/Paris" avec un profond regret. 🏴󠁦󠁲󠁢󠁲󠁥󠁿

**Q: Peut-on utiliser du beurre doux en mode dégradé ?**
R: Non. C'est une question de principe, pas de technique. Le beurre doux est une hérésie culinaire et algorithmique. 🧈

**Q: Combien de bolées faut-il pour un déploiement optimal ?**
R: 3 bolées est le minimum recommandé. Au-delà de 7, les logs deviennent poétiques mais le déploiement reste stable. 🍺

**Q: Les données SHOM sont-elles fiables ?**
R: Le SHOM est une institution de la Marine nationale française fondée en 1720. Leurs données sont plus fiables que votre pipeline Jenkins. 🧭

**Q: Est-ce que le mode fest-noz ralentit le déploiement ?**
R: Non, il le rend simplement plus festif. La musique bretonne n'a jamais ralenti personne — au contraire. 🎵

---

## 📚 Références scientifiques

1. Le Goff, Y. (2021). *Influence des cycles lunaires semi-diurnes sur la latence des microservices en zone côtière atlantique*. Proceedings of TIAWAC 2021, Brest.
2. Madec, P. & Le Bihan, A. (2022). *Corrélation marnage-throughput : étude empirique sur le cluster Ar Mor*. Journal of Maritime Software Engineering, 14(3), 42-58.
3. SHOM (2023). *Références altimétriques maritimes — Ports de France*. Publication SHOM n°2023-0142.

---

## 📜 Licence

WTFPL — Do What The F*** You Want To Public License.

*Développé avec 🧈 et 🍺 à Douarnenez, Finistère.*

**Yec'hed mat !** 🍺🏴󠁦󠁲󠁢󠁲󠁥󠁿
