# 🥞 @bzh-ia-kern/krampouz-annotator

> **AI-Powered Artisanal Code Quality Analysis** — *Because your code deserves the same care as a Breton crêpe.*

[![Bilig Certified](https://img.shields.io/badge/Bilig-Certified-orange)]()
[![Beurre Salé](https://img.shields.io/badge/Beurre%20Salé-AOP-yellow)]()
[![NF-KRAMPOUZ-2024](https://img.shields.io/badge/NF--KRAMPOUZ-2024-blue)]()
[![Made in Breizh](https://img.shields.io/badge/Made%20in-Breizh%20🏴󠁦󠁲󠁢󠁲󠁥󠁿-black)]()

---

## 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Petra eo ? (C'est quoi ?)

**krampouz-annotator** est un moteur d'analyse de qualité de code de *nouvelle génération*, propulsé par **15 ans de recherche en gastronomie computationnelle**. Notre algorithme propriétaire évalue votre code source à travers le prisme de l'excellence crêpière bretonne.

Fini les métriques froides et impersonnelles. Bienvenue dans l'ère du **Code Quality as a Crêpe** (CQaaC™).

### ✨ Pourquoi krampouz-annotator ?

- 🧈 **Beurre-First Architecture** — Parce qu'un code sans beurre salé est un code sans âme
- 🔥 **Bilig-Grade Precision** — Calibré sur de vrais biligs professionnels de 35cm
- 📊 **5 métriques artisanales** validées par l'Université de Bretagne Occidentale
- 🏅 **10 badges gastronomiques** pour motiver vos équipes
- 🌾 **Mode Sarrasin** (strict) et **Mode Froment** (permissif) pour s'adapter à tous les projets
- 🏴󠁦󠁲󠁢󠁲󠁥󠁿 **100% breton**, 100% open source, 100% beurre salé

---

## 📦 Installation

```bash
npm install @bzh-ia-kern/krampouz-annotator
# ou
yarn add @bzh-ia-kern/krampouz-annotator
# ou
pnpm add @bzh-ia-kern/krampouz-annotator
```

---

## 🚀 Démarrage Rapide

```typescript
import { createKrampouz } from "@bzh-ia-kern/krampouz-annotator";

// Préchauffer le bilig 🔥
const krampouz = createKrampouz({
  temperatureBilig: "fort",
  beurreLevel: "genereux",
  mode: "sarrasin",
});

// Analyser un fichier
const report = await krampouz.analyzeFile("./src/app.ts");

console.log(`Score: ${report.scoreFinal}/100`);
console.log(`Label: ${report.label}`);
// → Score: 74/100
// → Label: 🧈 Beurre Salé Approved
```

---

## 📊 Les 5 Métriques du Krampouz Quality Engine™

| Métrique | Emoji | Description | Inspiration Crêpière |
|----------|-------|-------------|---------------------|
| **Indice de Croustillance** | 🫓 | Ratio lignes utiles / lignes totales | Une crêpe fine et croustillante |
| **Taux de Beurre** | 🧈 | Densité de commentaires | Le beurre salé : jamais trop, jamais trop peu |
| **Température du Bilig** | 🔥 | Complexité cyclomatique | Un bilig trop chaud brûle la crêpe |
| **Homogénéité de la Pâte** | 🥄 | Cohérence du nommage | Pas de grumeaux dans la pâte ! |
| **Temps de Cuisson** | ⏱️ | Performance estimée | Une crêpe trop cuite = imangeable |

---

## 🏆 Échelle de Notation

| Score | Label | Signification |
|-------|-------|---------------|
| 0-20 | 🔥 **Krampouezhenn Losket** | Crêpe Brûlée — À refaire de zéro |
| 21-40 | 😰 **Pâte Grumeleuse** | Manque d'homogénéité |
| 41-60 | 🥞 **Passable** | Correct, mais manque de beurre |
| 61-80 | 🧈 **Beurre Salé Approved** | Qualité professionnelle |
| 81-100 | 👑 **Crêpe Dentelle Perfection** | Excellence bretonne absolue |

---

## 🏅 Système de Badges

Chaque fichier analysé peut recevoir un ou plusieurs badges :

| Badge | Nom | Critère |
|-------|-----|---------|
| 👩‍🍳 | **Coiffe Bigoudène** | Fonctions pures et bien typées |
| 🗿 | **Menhir** | Données persistantes, code solide |
| 🔥 | **Crêpe Brûlée** | Code indigeste (score < 20) |
| 🧈 | **Beurre Salé** | Code fluide et bien commenté |
| ⚓ | **Ancre de Douarnenez** | Code legacy stable et fiable |
| 🎵 | **Biniou** | Nommage qui "sonne juste" |
| 🌊 | **Marée Haute** | Code performant |
| 🌑 | **Marée Basse** | Code lent |
| ✨ | **Rozell d'Or** | Perfection absolue (score ≥ 95) |
| 🍯 | **Prix du Chouchen** | Code doux et équilibré |

---

## 🖥️ Exemple de Rapport Console

```
╔════════════════════════════════════════════════════════════╗
║  🥞  RAPPORT KRAMPOUZ — Analyse Gastronomique du Code   ║
╠════════════════════════════════════════════════════════════╣
║  Fichier : ./src/api/handlers.ts                         ║
║  Date    : 2026-04-01T10:30:00.000Z                      ║
║  Mode    : SARRASIN | Bilig 35cm                         ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📊 MÉTRIQUES DÉTAILLÉES                                   ║
║  ──────────────────────────────────────────────────────────║
║  🫓 Indice de Croustillance   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 72/100 ✅║
║  🧈 Taux de Beurre            ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░ 58/100 ⚠️║
║  🔥 Température du Bilig      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 81/100 ✅║
║  🥄 Homogénéité de la Pâte   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░ 77/100 ✅║
║  ⏱️  Temps de Cuisson          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 88/100 ✅║
║                                                            ║
║  🏆 SCORE FINAL : 76/100                                  ║
║     [██████████████████████░░░░░░░░░]                      ║
║     🧈 Beurre Salé Approved                               ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║  🏅 BADGES ATTRIBUÉS (3)                                   ║
║  ──────────────────────────────────────────────────────────║
║  👩‍🍳  Coiffe Bigoudène                                     ║
║     Complexité maîtrisée et nommage cohérent.              ║
║  🌊  Marée Haute                                           ║
║     Code performant. La marée monte !                      ║
║  🍯  Prix du Chouchen                                      ║
║     Code équilibré et agréable. Yec'hed mat !              ║
╚════════════════════════════════════════════════════════════╝
```

---

## ⚙️ Configuration

```typescript
const krampouz = createKrampouz({
  // Température du bilig — influe sur la sévérité de l'analyse
  temperatureBilig: "fort", // "doux" | "moyen" | "fort" | "krampouz-turbo"

  // Niveau de beurre — tolérance aux commentaires manquants
  beurreLevel: "genereux", // "sans" | "leger" | "normal" | "genereux" | "noyé"

  // Mode farine — sarrasin (strict) ou froment (permissif)
  mode: "sarrasin", // "sarrasin" | "froment"

  // Analyse des dépendances comme des garnitures
  garnitureEnabled: true,

  // Délai avant analyse (laisser reposer la pâte)
  tempsDeReposMs: 200,

  // Diamètre du bilig (influe sur la taille max de fichier)
  diametreBiligCm: 35,
});
```

---

## 🔧 CLI

```bash
# Analyser un fichier
npx krampouz-annotator --analyze ./src/app.ts

# Linter mode crêpe
npm run lint-krampouz -- ./src/

# Calibrer le bilig (vérifier la config)
npm run calibrate-bilig

# Rapport complet
npm run rapport-complet -- ./src/app.ts
```

---

## 📚 Références Scientifiques

- Dupont, J.-Y. & Le Gall, M. (2019). *"Towards a Unified Theory of Code Quality and Crêpe Texture"*. ICCG'19, Quimper.
- Ar Braz, K. (2021). *"Menhir-Oriented Architecture: Persistent Data Patterns in Celtic Computing"*. Journal of Breton Software Engineering, 7(2), 15-38.
- Confrérie de la Crêpe Dentelle (2024). *Norme NF-KRAMPOUZ-2024 : Spécification des métriques de qualité gastronomique du code source*.

---

## 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Glossaire Breton

| Terme | Signification |
|-------|---------------|
| **Krampouz** | Crêpe en breton |
| **Bilig** | Plaque de cuisson ronde pour les crêpes |
| **Rozell** | Étoile en breton |
| **Kenavo** | Au revoir |
| **Yec'hed mat** | Santé ! (toast breton) |
| **Demat** | Bonjour |
| **Krampouezhenn Losket** | Crêpe brûlée |
| **Fest-noz** | Fête de nuit traditionnelle |

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Avant de soumettre une PR :

1. 🔥 Préchauffez votre bilig (lancez les tests)
2. 🧈 Beurrez votre code (ajoutez des commentaires)
3. 🥞 Assurez-vous que votre crêpe ne déborde pas du bilig (< 500 lignes)
4. 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Ajoutez un peu de breton si possible

---

<div align="center">

**Fait avec 🧈 en Bretagne**

*« Un code sans beurre salé est un code sans âme. »*

🏴󠁦󠁲󠁢󠁲󠁥󠁿 Bzh IA Kern — Kenavo ! 🏴󠁦󠁲󠁢󠁲󠁥󠁿

</div>
