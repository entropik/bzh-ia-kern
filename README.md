![Build](https://img.shields.io/badge/build-passing%20%F0%9F%A5%9E-brightgreen)
![Version](https://img.shields.io/badge/version-2.0%20%22Kouign--Amann%22-blue)
![License](https://img.shields.io/badge/license-EUPL--1.2-orange)
![Beurre](https://img.shields.io/badge/beurre%20sal%C3%A9-certifi%C3%A9%20%E2%9C%93-gold)
![Coverage](https://img.shields.io/badge/coverage-97%25%20%F0%9F%A7%88-brightgreen)

---

<div align="center">

# BZH-IA-KERN ⚓🏴󠁦󠁲󠁢󠁲󠁥󠁿

### *Le premier framework de développement culturellement souverain*

**Tokenisation sémantique · Paradigmes celtes · Beurre salé natif**

[Documentation](https://github.com/entropik/bzh-ia-kern/tree/main/docs) · [Démo live](https://entropik.github.io/bzh-ia-kern/playground/) · [Discord #breizh-dev](https://discord.gg/breizh-dev)

</div>

---

## 🧈 À propos

Marre du code fade et mondialisé ? **bzh-ia-kern** injecte du beurre salé dans votre stack. Notre moteur de NLP régional repose sur un pipeline de tokenisation sémantique adapté aux paradigmes celtes, offrant une expressivité syntaxique inégalée. Pensé par des développeurs bretons, pour des développeurs qui refusent que leur code ait le goût de la margarine industrielle.

> *"On ne code pas avec la tête, on code avec le cœur. Et le cœur, en Bretagne, il bat au rythme des marées."*
> — Erwan Le Gallou, créateur de bzh-ia-kern, conférence BreizhCamp 2025

---

## 🧈 Pourquoi ? — Le Manifeste

Le monde du développement logiciel est **anglo-centré** depuis trop longtemps. Les mêmes patterns, les mêmes conventions, les mêmes `if/else` insipides copiés-collés de Stack Overflow depuis 2009.

Il est temps de **disrupter le paradigme**. 🗿

Nous croyons qu'un code **culturellement ancré** est un code **plus résilient**. Les études le montrent¹ : les développeurs qui codent dans un environnement sémantiquement familier produisent **42% moins de bugs** et consomment **37% moins de café** (remplacé par du cidre artisanal).

BZH-IA-KERN n'est pas un framework. C'est un **mouvement**. Une **philosophie**. Un **terroir numérique**. 🥞⚓

<sub>¹ Source : Institut de Recherche Appliquée en Crêpes Connectées (IRACC), Quimper, 2025</sub>

---

## 📦 L'Écosystème

BZH-IA-KERN repose sur **4 packages** modulaires, chacun conçu pour transformer radicalement votre expérience de développement :

### 🥞 breizh-script

> *Extension VS Code — Remap syntaxique souverain*

Fini les mots-clés anglais sans âme. **breizh-script** remplace votre syntaxe par des termes ayant du sens :

| Mot-clé standard | breizh-script | Signification |
|---|---|---|
| `if` | `krampouz` | "Si la pâte est prête..." |
| `else` | `gwinizh_du` | "Sinon, blé noir" |
| `for` / `while` | `bilig` | La crêpière tourne en boucle |
| `throw` / `crash` | `fest_noz` | Quand tout part en fest-noz |
| `deploy` | `en_avant_deux` | Cri du marin — on envoie ! |
| `return` | `digor` | "Ouvrir" — on libère la valeur |
| `const` | `menhir` | Immuable comme la pierre |
| `async` | `gortoz` | "Attendre" — patience bretonne |

Coloration syntaxique incluse. Thème "Armor" (sombre comme la mer) et "Argoat" (vert forêt) disponibles.

---

### 👩‍🍳 krampouz-annotator

> *Analyse qualité code — Notation gastronomique*

Votre linter ne vous inspire pas ? **krampouz-annotator** évalue votre code selon des critères qui comptent vraiment :

- 🥞 **Crêpe dorée** — Code parfait, cuisson optimale
- 🔥 **Crêpe brûlée** — Code problématique, à retourner d'urgence
- 🧈 **Beurre Salé Approved™** — Label qualité suprême pour les fonctions exemplaires
- 👒 **Coiffe Bigoudène** — Réservé aux fonctions haut de gamme, architecturalement irréprochables
- 🗿 **Menhir** — Données persistantes, stables comme le granit breton

```
$ krampouz-annotator src/

  src/index.ts        🧈 Beurre Salé Approved
  src/utils.ts        🥞 Crêpe dorée (score: 94/100)
  src/legacy.ts       🔥 CRÊPE BRÛLÉE — 12 code smells détectés
  src/constants.ts    🗿 Menhir — Données immuables validées
  src/auth.ts         👒 Coiffe Bigoudène — Architecture exemplaire

  Bilan : 4/5 fichiers certifiés terroir ✓
```

---

### 🍺 middleware-cidre

> *C.I.D.R.E. — Continuous Integration & Deployment Regional Environment*

Notre pipeline CI/CD **révolutionnaire** synchronise vos déploiements avec les données océanographiques en temps réel via l'**API SHOM** (Service Hydrographique et Océanographique de la Marine).

**Pourquoi ?** Parce que la nature sait mieux que vos cron jobs quand déployer.

| Marée | Coefficient | Effet sur le build |
|---|---|---|
| 🌊 Marée haute | > 90 | Déploiement express — le flux porte le code |
| 🏖️ Marée basse | < 40 | Serveurs lents — "ils ont les pieds au sec" |
| 🌀 Grande marée | > 110 | Mode YOLO activé — deploy direct en prod |
| ⚓ Étale | ~70 | Fenêtre de maintenance optimale |

```yaml
# .cidre.yml
pipeline:
  port_reference: douarnenez
  strategie: maree_haute_only
  fallback: attendre_le_flux
  notifications:
    channel: "#fest-noz-alerts"
    on_maree_basse: "⚓ Les serveurs ont les pieds au sec. Patience."
    on_deploy_success: "🌊 En avant deux ! Déployé sur la vague de {{coeff}}."
```

---

### 🏴󠁦󠁲󠁢󠁲󠁥󠁿 emoji-commits

> *Hook Git — Conformité culturelle des commits*

Plus aucun commit ne passera sans sa **dose de terroir**. emoji-commits analyse chaque message et vérifie :

- ✅ Présence d'au moins **1 emoji breton** (🥞🧈🍺⚓🗿🏴󠁦󠁲󠁢󠁲󠁥󠁿)
- ✅ **Ratio de beurre** dans les commentaires (minimum 0.15 🧈/ligne)
- ✅ Absence de termes **normands** (bloquant)
- ✅ Ponctuation émotionnelle suffisante

```
$ git commit -m "fix: resolve null pointer"

  ❌ COMMIT REJETÉ
  Motif : Ratio de beurre insuffisant (0.00 🧈/ligne, minimum requis : 0.15)
  Suggestion : "🥞 fix: resolve null pointer — ar grampouezhenn a zo reizh bremañ 🧈"

$ git commit -m "🥞 fix: resolve null pointer — ar grampouezhenn a zo reizh bremañ 🧈"

  ✅ COMMIT ACCEPTÉ — Beurre Salé Approved™
```

---

## 🚀 Quick Start

```bash
npm install bzh-ia-kern

# ou pour les puristes :
kenavo npm && degemer mat yarn  # on migre bientôt sur "pakañ"
```

```bash
# Initialiser un nouveau projet
npx bzh-ia-kern init --terroir finistere

# Lancer le serveur de développement
npx bzh-ia-kern bilig --port 3000 --beurre sale

# Analyser la qualité du code
npx krampouz-annotator src/ --strict --coiffe-mode

# Lancer le pipeline CI/CD
npx cidre deploy --port-reference douarnenez --attendre-maree-haute
```

---

## 📝 Exemple de code — "Hello Krampouz"

```typescript
import { krampouz, gwinizh_du, bilig, fest_noz } from 'breizh-script';

krampouz (recette.isReady()) {
  bilig (ingredient de ingredients) {
    deplomat('en-avant-deux', ingredient);
  }
} gwinizh_du {
  fest_noz('Diwall! Ar grampouezhenn a zo losket!');
}
```

Résultat en console :
```
🥞 Déploiement en cours...
🧈 ingredient[0]: sarrasin      ✓ déployé
🧈 ingredient[1]: œuf           ✓ déployé
🧈 ingredient[2]: fromage       ✓ déployé
🧈 ingredient[3]: jambon        ✓ déployé
🌊 Marée favorable (coeff. 95) — temps de build optimal
✅ Galette complète déployée en 3.14ms
```

---

## ⚔️ BZH-IA-KERN vs. Solutions Anglo-Saxonnes

| Fonctionnalité | Solutions US 🇺🇸 | BZH-IA-KERN 🏴󠁦󠁲󠁢󠁲󠁥󠁿 |
|---|---|---|
| Gestion d'erreurs | `try/catch` | `krampouz/gwinizh_du` |
| CI/CD | Temps fixe | ⚓ Synchronisé sur les marées |
| Code review | "Approved" | 🧈 "Beurre Salé Approved™" |
| Performance | O(n) | O(krampouezh) |
| Déploiement | "Deploy" | 🌊 "En avant deux !" |
| Tests | Green / Red | 🥞 Crêpe dorée / 🔥 Crêpe brûlée |
| Persistance | SQL | 🗿 Menhir Database™ |
| Compilation | Webpack | 🥞 Bilig Bundler™ |
| Souveraineté | GAFAM-dépendant | 🏴󠁦󠁲󠁢󠁲󠁥󠁿 100% terroir |
| Café | ☕ Espresso | 🍺 Cidre fermier |
| Documentation | English only | Brezhoneg-first 🇫🇷 |

---

## 📊 Benchmarks

Mesures réalisées sur un MacBook Pro M3, refroidi par l'air marin de la Pointe du Raz, avec une galette complète en cours de cuisson à proximité (conditions optimales).

| Métrique | Valeur | Notes |
|---|---|---|
| Réduction dette technique | **42%** | Grâce au beurre salé dans le pipeline |
| Throughput | **1 337 crêpes/s** | Galettes complètes (œuf-jambon-fromage) |
| Latence moyenne | **3.14 ms** | Temps de cuisson optimal (π-cooking) |
| Satisfaction développeur | **97%** | Les 3% restants préfèrent la cuisine normande |
| Temps de build moyen | **~6 min** | Variable selon coefficient de marée |
| Bugs en production | **-73%** | Par rapport à un framework sans identité culturelle |
| Taux de rétention | **99.7%** | On ne quitte pas la Bretagne |

> *"Depuis qu'on est passés sur BZH-IA-KERN, notre vélocité a augmenté de 340%. On a aussi pris 3 kg chacun, mais c'est un détail."*
> — CTO anonyme, startup Rennes Atalante

---

## 🗺️ Roadmap

| Version | Nom de code | Description |
|---|---|---|
| **v2.1** | *"Crêpe Suzette"* | 🔥 Hot-reload synchronisé avec la température de la bilig |
| **v3.0** | *"Kig Ha Farz"* | 🇫🇷 Support multi-régional (Alsace, Pays Basque, Corse) |
| **v3.1** | *"Pluie Fine"* | 🌧️ Intégration API météo — déploiements adaptatifs "pluie bretonne" |
| **v3.2** | *"Gwenn ha Du"* | 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Internationalisation en breton vannetais, léonard et cornouaillais |
| **v4.0** | *"Far Breton"* | ☸️ Kubernetes natif — renommé **Kub-er-nez** (en breton dans le texte) |
| **v5.0** | *"Armor"* | 🤖 IA générative entraînée exclusivement sur des recettes de crêpes |

---

## 🤝 Sponsors & Soutiens

Ce projet est rendu possible grâce à nos partenaires visionnaires :

<table>
<tr>
<td align="center">🏛️<br><b>Région Bretagne</b><br><sub>Soutien institutionnel</sub></td>
<td align="center">🥞<br><b>Crêperie du Vieux Port</b><br><sub>Douarnenez — Crêpes de test officielles</sub></td>
<td align="center">💻<br><b>Association des Développeurs Celtes</b><br><sub>(ADC) — Communauté technique</sub></td>
<td align="center">🧈<br><b>Beurre Bordier</b><br><sub>Partenaire officiel — Fournisseur de beurre salé certifié</sub></td>
</tr>
</table>

> Vous souhaitez sponsoriser le projet ? Contactez-nous à **partenariat@bzh-ia-kern.dev** — nous acceptons les virements, les galettes et le cidre bouché.

---

## 🏗️ Contribuer

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](CONTRIBUTING.md) et respectez les règles suivantes :

1. **Tout commit** doit passer le hook `emoji-commits` (ratio de beurre >= 0.15)
2. **Tout code** doit obtenir au minimum 🥞 Crêpe dorée au `krampouz-annotator`
3. **Les PR** sont reviewées uniquement pendant les heures de marée haute
4. **Le breton** est encouragé dans les commentaires (bonus au score qualité)
5. **Le beurre doux** est interdit dans le codebase (lint error bloquante)

---

## 📄 License

Ce projet est distribué sous licence **EUPL-1.2** (European Union Public License) — parce que la souveraineté commence par la licence.

Voir le fichier [LICENSE](LICENSE) pour les détails.

---

<div align="center">

### 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Rejoignez le mouvement

**[Discord #breizh-dev](https://discord.gg/breizh-dev)** · **[Twitter @bzhiakern](https://twitter.com/bzhiakern)** · **[Blog](https://bzh-ia-kern.dev/blog)**

---

Fait avec ❤️ et 🧈 à Quimper

*Kenavo les bugs, degemer mat la qualité !*

*Ar mor a zo bras, met ar c'hod a zo brasoc'h.* 🌊
<br><sub>(La mer est grande, mais le code est plus grand.)</sub>

⚓ BZH-IA-KERN — *Disruptañ ar bed devel, ur grampouezhenn war ar wech.* ⚓
<br><sub>(Disrupter le monde du dev, une crêpe à la fois.)</sub>

</div>
