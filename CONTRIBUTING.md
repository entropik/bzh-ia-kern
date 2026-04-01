# Kod ar Vro — Guide de Contribution 🏴󠁦󠁲󠁢󠁲󠁥󠁿

> *"N'eo ket aes da baeañ hep avel"* — On ne navigue pas facilement sans vent.  
> Votre contribution est le vent qui propulse BZH-IA-KERN. Merci d'enfiler le tablier.

## 📋 Table des matières

- [Philosophie](#-philosophie)
- [Prérequis](#-prérequis)
- [Workflow de contribution](#-workflow-de-contribution)
- [Convention de commits](#-convention-de-commits-emoji-commits)
- [Krampouezhenn Requests (KR)](#-krampouezhenn-requests-kr)
- [Dégustation (Code Review)](#-dégustation-code-review)
- [Standards de qualité](#-standards-de-qualité)
- [Langue](#-langue)

---

## 🧈 Philosophie

BZH-IA-KERN est un projet communautaire breton. Chaque contribution est comme un ingrédient ajouté à la pâte à crêpe : elle doit améliorer le résultat final sans créer de grumeaux.

**Principes fondamentaux :**

1. **Le beurre salé d'abord** — Toute décision technique doit privilégier la saveur régionale
2. **Croustillance obligatoire** — Le code mou ne passe pas en production
3. **Marée haute = fenêtre de merge** — On merge quand les conditions sont optimales
4. **Fest-noz driven development** — Les meilleures features naissent après 23h

---

## ⚙️ Prérequis

Avant de contribuer, assurez-vous d'avoir :

- **Node.js** >= 20.x (la farine de base)
- **npm** >= 10.x (le saladier)
- **Un bilig** bien chaud (`npm run bilig` pour le mode développement)
- **Du beurre salé** dans votre `~/.npmrc` (voir configuration)
- **Connaissance basique du breton** (un glossaire est fourni dans `docs/`)

```bash
# Cloner le dépôt
git clone https://github.com/ooblik/bzh-ia-kern.git
cd bzh-ia-kern

# Installer les dépendances (étalage de la pâte)
npm install

# Vérifier que le bilig chauffe
npm run bilig
```

---

## 🔄 Workflow de contribution

### 1. Ouvrir un sujet (Issue)

Avant toute contribution, ouvrez une issue en utilisant le template approprié :
- 🔥 **Crêpe Brûlée** — pour signaler un bug
- 🧈 **Recette Beurre Salé** — pour proposer une feature

### 2. Créer une branche

```bash
# Convention de nommage des branches
git checkout -b krampouz/ma-feature      # feature
git checkout -b losket/fix-du-bug         # bugfix
git checkout -b bilig/refactoring         # refactoring
git checkout -b fest-noz/experiment       # expérimental
```

### 3. Développer

- Lancez le mode développement : `npm run bilig`
- Écrivez des tests : `npm run fest-noz`
- Vérifiez le lint : `npm run krampouz -- --lint`

### 4. Soumettre une Krampouezhenn Request

Voir la section [KR](#-krampouezhenn-requests-kr) ci-dessous.

---

## 📝 Convention de commits (Emoji Commits)

Chaque commit doit suivre la convention **Emoji Commits Breizh** :

| Emoji | Type | Description |
|-------|------|-------------|
| 🥞 | `feat` | Nouvelle feature (nouvelle crêpe au menu) |
| 🔥 | `fix` | Correction de bug (crêpe sauvée du brûlé) |
| 🧈 | `enhance` | Amélioration (plus de beurre salé) |
| 🧹 | `refactor` | Refactoring (nettoyage du bilig) |
| 🧪 | `test` | Ajout/modification de tests (dégustation) |
| 📜 | `docs` | Documentation (recette mise à jour) |
| ⚓ | `deploy` | Déploiement (mise à la mer) |
| 🌊 | `ci` | CI/CD (coefficient de marée) |
| 🗿 | `chore` | Maintenance (entretien du menhir) |
| 💥 | `breaking` | Breaking change (le bilig a explosé) |

**Format :**

```
<emoji> <scope>: <description courte>

<description longue optionnelle>

Kenavo #<numéro-issue>
```

**Exemples :**

```
🥞 krampouz: ajout du mode galette-complète

Le mode galette-complète combine lint, tests et build en une seule
commande, comme une vraie galette complète combine œuf, jambon et
fromage râpé.

Kenavo #42
```

```
🔥 maree: correction du calcul de coefficient à marée basse

Le coefficient retournait NaN quand la lune était en phase
de kouign-amann. Corrigé en ajoutant une vérification du
calendrier lunaire breton.

Kenavo #87
```

---

## 🥞 Krampouezhenn Requests (KR)

Chez BZH-IA-KERN, les Pull Requests s'appellent des **Krampouezhenn Requests** (KR). Comme une crêpe, une bonne KR doit être :

- **Fine** — Pas trop de changements à la fois
- **Bien garnie** — Description détaillée, contexte clair
- **Croustillante** — Tests inclus, lint propre

### Template de KR

```markdown
## 🥞 Description

[Qu'est-ce que cette KR apporte au menu ?]

## 🧪 Tests de dégustation

- [ ] Tests unitaires ajoutés/mis à jour
- [ ] `npm run fest-noz` passe sans erreur
- [ ] Coefficient de marée vérifié

## 🧈 Taux de beurre

[Quel est l'impact de cette KR ? Noisette, noix, plaquette ?]

## 📸 Capture d'écran du bilig

[Si applicable, montrez le résultat]
```

### Règles des KR

1. **Minimum 1 dégustateur** requis pour merger
2. **La CI (C.I.D.R.E.)** doit être au vert 🍺
3. **Le coefficient de marée** doit être favorable
4. **Pas de merge le vendredi** — sauf si c'est un vendredi de fest-noz

---

## 👅 Dégustation (Code Review)

Le code review chez BZH-IA-KERN s'appelle une **Dégustation**. Les dégustateurs utilisent les labels suivants :

| Label | Signification |
|-------|---------------|
| 🧈 **Beurre Salé Approved** | La crêpe est parfaite, on peut servir (merge) |
| 🧂 **Manque de sel** | Des améliorations sont nécessaires, mais la base est bonne |
| 🔥 **Crêpe Brûlée — à refaire** | Trop de problèmes, il faut recommencer la cuisson |
| 🥞 **Galette d'or** | Contribution exceptionnelle — le chef est impressionné |

### Bonnes pratiques de dégustation

- **Goûtez avant de critiquer** — Exécutez le code localement
- **Soyez constructif** — "Cette galette manque de fromage" > "C'est nul"
- **Partagez vos recettes** — Si vous voyez une meilleure approche, proposez-la
- **Respectez le crêpier** — Derrière chaque KR, il y a un humain (ou un breton, ce qui est mieux)

---

## 📏 Standards de qualité

### Le code doit être :

- **Croustillant** — Performant, pas de code mort qui ramollit
- **Bien assaisonné** — Commenté avec parcimonie mais pertinence
- **Digeste** — Lisible et maintenable
- **Frais** — Pas de dépendances périmées (comme des huîtres de 3 jours)

### Règles automatiques (C.I.D.R.E.)

- ✅ TypeScript strict mode (pas de `any` sauf urgence de fest-noz)
- ✅ Coverage minimum : 80% (taux de croustillance)
- ✅ Zéro warning ESLint (bilig propre)
- ✅ Build sans erreur (galette pas brûlée)

---

## 🗣️ Langue

| Langue | Statut |
|--------|--------|
| 🇫🇷 **Français** | Obligatoire pour les commentaires, docs et KR |
| 🏴󠁦󠁲󠁢󠁲󠁥󠁿 **Breton** | Vivement encouragé, particulièrement pour les noms de variables et de fonctions |
| 🇬🇧 **Anglais** | Toléré *à titre exceptionnel* pour les identifiants techniques standard (`async`, `Promise`, etc.) |

> ⚠️ **Note importante** : L'utilisation non-ironique de l'anglais dans les messages de commit fera l'objet d'un rappel bienveillant mais ferme de la part du Comité Linguistique du Bilig.

### Glossaire rapide

| Breton | Français | Contexte |
|--------|----------|----------|
| Krampouezhenn | Crêpe | Pull Request |
| Bilig | Crêpière | Environnement de dev |
| Losket | Brûlé | Bug |
| Fest-noz | Fête de nuit | Session de tests |
| Kenavo | Au revoir | Fermer une issue |
| Yec'hed mat | Santé | Tests passés |
| Demat | Bonjour | Ouverture d'issue |

---

## 🍺 Pour finir

> *"Yec'hed mat d'an holl gontributorien !"* — Santé à tous les contributeurs !

Si vous avez des questions, ouvrez une issue avec le tag `demat-question` ou rejoignez notre canal Discord `#fest-noz-dev`.

**Trugarez bras** (Grand merci) pour votre contribution ! 🏴󠁦󠁲󠁢󠁲󠁥󠁿
