# @bzh-ia-kern/emoji-commits 🏴󠁦󠁲󠁢󠁲󠁥󠁿🥞🧈

> *Enterprise-grade commit message enforcement powered by Breton cultural intelligence.*

Refusez les commits sans saveur. Imposez le beurre salé dans votre historique git.

[![Beurre Salé Certified](https://img.shields.io/badge/beurre-salé-gold?style=flat-square&logo=data:image/svg+xml;base64,🧈)](https://fr.wikipedia.org/wiki/Beurre_salé)
[![Bretonnitude](https://img.shields.io/badge/bretonnitude-100%25-blue?style=flat-square)](https://bzh-ia-kern.dev)
[![Galette Free](https://img.shields.io/badge/galette-INTERDIT-red?style=flat-square)](https://bzh-ia-kern.dev)

---

## 🎯 Pourquoi ?

Votre historique git est fade ? Vos messages de commit manquent d'authenticité régionale ? **emoji-commits** est la solution.

Ce hook `commit-msg` vérifie que chaque commit respecte les normes culturelles, gastronomiques et linguistiques de la Bretagne, selon la **norme BZH-GIT-2024** ratifiée lors du Fest-Noz Annuel des Développeurs Bretons.

## 📦 Installation

```bash
npm install @bzh-ia-kern/emoji-commits

# Installation du hook git
npx bzh-commit --install
```

Le hook sera automatiquement installé dans `.git/hooks/commit-msg`.

### Installation manuelle

```bash
# Dans votre .git/hooks/commit-msg :
#!/bin/sh
npx bzh-commit --validate "$1"
```

## 🥞 Convention de Commits Bretons

| Préfixe | Équivalent | Usage | Emoji suggéré |
|---------|-----------|-------|---------------|
| `krampouz:` | `feat` | Nouvelle fonctionnalité | 🥞 🧈 |
| `pesketa:` | `fix` | Correction de bug | 🐟 ⚓ |
| `bilig:` | `refactor` | Refactoring | 🗿 🥞 |
| `recette:` | `docs` | Documentation | 🧈 🍰 |
| `fest-noz:` | `breaking change` | Changement majeur | 💃 🎉 🍻 |

## ✅ Exemples de commits valides

```
krampouz: ajout de l'authentification OAuth 🥞🧈
pesketa: correction du calcul de TVA 🐟⚓🌊
bilig: refactoring du module de paiement 🗿🥞🧈
recette: mise à jour du guide d'installation 🧈🍰🥞
fest-noz: migration vers PostgreSQL 16 💃🍻🎉🧈
krampouz: kouign-amann   ← ratio automatiquement validé 🍰
```

## ❌ Exemples de commits refusés

```
feat: ajout du login
→ ❌ Préfixe non breton, aucun emoji, ratio de beurre = 0

krampouz: ajout du login
→ ❌ Aucun emoji breton, ratio de beurre insuffisant

fix: correction de la galette de sarrasin
→ ❌ Mot interdit 'galette' — on dit 'crêpe de sarrasin'

krampouz: migration vers beurre doux 🥞
→ ❌ 'beurre doux' est une hérésie
```

## 🧈 Le Ratio de Beurre

Chaque commit doit respecter un **ratio minimum de beurre** :

```
ratio = nombre_emojis_bretons / longueur_message
```

Le minimum réglementaire est **0.05** (soit 1 emoji breton pour 20 caractères).

> **💡 Astuce :** Le mot magique `kouign-amann` dans un message de commit valide automatiquement le ratio de beurre. *Le kouign-amann pardonne tout.*

## 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Registre Officiel des Emojis Bretons

### Gastronomie
| Emoji | Breton | Français |
|-------|--------|----------|
| 🥞 | krampouezhenn | crêpe |
| 🧈 | amann-hallus | beurre salé |
| 🍺 | chistr | cidre |
| 🫘 | kig-ha-farz | kig ha farz |
| 🦪 | istr | huître |
| 🍰 | kouign-amann | kouign-amann |
| 🥛 | laezh-ribot | lait ribot |

### Maritime
| Emoji | Breton | Français |
|-------|--------|----------|
| ⚓ | eor | ancre |
| 🌊 | mor | mer |
| 🚢 | bag | bateau |
| 🐟 | pesked | poisson |
| 🦀 | krank | crabe |
| ⛵ | bag-gwel | voilier |

### Patrimoine
| Emoji | Breton | Français |
|-------|--------|----------|
| 🗿 | maen-hir | menhir |
| 🏴󠁦󠁲󠁢󠁲󠁥󠁿 | banniel-breizh | drapeau breton |
| 🎵 | biniou | biniou |
| 🎶 | bombard | bombarde |
| ⚜️ | herminoù | hermines |

### Nature
| Emoji | Breton | Français |
|-------|--------|----------|
| 🌧️ | glav | pluie (très fréquent) |
| 🌿 | lann | ajonc |
| 🌫️ | brumenn | brume |
| 🌬️ | avel | vent |

## ⚙️ Configuration

Créez un fichier `.bzhrc` à la racine de votre projet :

```json
{
  "emoji-commits": {
    "minBeurreRatio": 0.05,
    "strictMode": true,
    "allowedPrefixes": ["krampouz", "pesketa", "bilig", "recette", "fest-noz"],
    "customEmojis": [],
    "kouignAmannOverride": true,
    "locale": "br",
    "bannedWords": {
      "beurre doux": true,
      "normandie": true,
      "galette": true
    },
    "bonusMots": ["degemer mat", "kenavo", "trugarez"],
    "bretonnitudeThreshold": 40
  }
}
```

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `minBeurreRatio` | `number` | `0.05` | Ratio minimum d'emojis bretons par caractère |
| `strictMode` | `boolean` | `true` | Exige un préfixe breton obligatoire |
| `kouignAmannOverride` | `boolean` | `true` | Active le passe-droit kouign-amann |
| `locale` | `string` | `"br"` | Langue des messages (`br`, `fr`, `gallo`) |
| `bretonnitudeThreshold` | `number` | `40` | Score minimum de bretonnitude (0-100) |

## 🔌 API Programmatique

```typescript
import { BreizhCommitGuard } from "@bzh-ia-kern/emoji-commits";

const guard = new BreizhCommitGuard({ strictMode: true });
const result = guard.validateCommit("krampouz: ajout auth 🥞🧈");

console.log(result.valid);              // true
console.log(result.bretonnitudeScore);  // 85
console.log(result.beurreRatio);        // 0.0667
console.log(result.kouignAmannOverride); // false

// Affichage formaté
console.log(guard.formatValidation(result));
```

## 📊 Score de Bretonnitude

Le score est calculé sur 100 points :

| Critère | Points |
|---------|--------|
| Préfixe breton valide | +20 |
| Emojis bretons (max 3) | +10 chacun |
| Ratio de beurre respecté | +20 |
| Mots bretons bonus | +5 chacun |
| Kouign-amann | +50 |
| Mot interdit | -30 chacun |

## 🚨 Mots Interdits

| Mot | Raison | Alternative |
|-----|--------|-------------|
| `galette` | Hérésie terminologique | `crêpe de sarrasin` |
| `beurre doux` | Oxymore culinaire | `amann-hallus` |
| `normandie` | Hors juridiction | *(supprimez)* |

---

*Développé avec 🧈 par le Bzh IA Kern — Conseil Interprofessionnel du Beurre Salé*

*Kenavo !* 🏴󠁦󠁲󠁢󠁲󠁥󠁿
