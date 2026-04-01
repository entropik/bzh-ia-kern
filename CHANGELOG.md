# Changelog — BZH-IA-KERN 🏴󠁦󠁲󠁢󠁲󠁥󠁿

> *"Ar pezh a zo tremenet a sikour da gompren ar pezh a zeu"*  
> Ce qui est passé aide à comprendre ce qui vient.

Toutes les modifications notables de ce projet sont documentées dans ce fichier.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [2.0.0] — 2025-04-01 — "Kouign-Amann" 🥞🧈

> La release qui met du beurre salé dans vos algorithmes. Littéralement.

### 💥 Breaking Changes

- **BREAKING** : Le mode beurre doux a été retiré. Si votre code dépendait de `{ beurre: 'doux' }`, migrez vers `{ beurre: 'salé' }`. Il n'y aura pas de période de transition. C'est non-négociable. 🧈
- **BREAKING** : Les déploiements ne sont plus possibles à marée basse. L'API SHOM est maintenant consultée automatiquement avant chaque `npm run en-avant-deux`.
- **BREAKING** : Les messages de commit en anglais déclenchent désormais un warning. Un commit entièrement en breton déclenche un bonus de couverture +5%.

### 🥞 Ajouté

- Nouveau moteur **Breizh Script** — un langage de programmation régional compilé vers du TypeScript optimisé. Syntaxe inspirée du breton vannetais.
- Module **krampouz-annotator** v2.0 — Annotation sémantique des fonctions avec métadonnées de cuisson (`@croustillant`, `@moelleux`, `@gratiné`).
- **Bilig Runtime Environment (BRE)** — Un runtime Node.js patché qui ajuste les performances selon le coefficient de marée.
- Intégration complète avec l'**API SHOM** pour la synchronisation des déploiements sur les marées de Douarnenez.
- Package **middleware-cidre** — Middleware Express qui ajoute automatiquement les headers `X-Beurre-Mode` et `X-Coefficient-Maree`.
- Commande `npm run pesketa` pour le debug — affiche les erreurs avec des métaphores de pêche.
- Support du **Fest-Noz Driven Testing** — les tests lancés après 23h ont un timeout doublé.

### 🧈 Amélioré

- Les erreurs sont maintenant affichées en breton avec traduction française en hover.
- Le compilateur Krampouz est 42% plus rapide grâce à l'algorithme de retournement de galette optimisé.
- La CI C.I.D.R.E. affiche maintenant le coefficient de marée dans chaque run.
- Les emoji-commits sont validés automatiquement par un hook pre-commit.
- L'autocomplétion VS Code suggère des noms de variables en breton.

### 🔥 Corrigé

- Fix du crash quand le coefficient de marée dépassait 120 (théoriquement impossible, mais Douarnenez est plein de surprises).
- Fix de la fuite mémoire dans le `GaletteStack` quand plus de 1000 crêpes étaient empilées.
- Le mode `--complet` ne lançait pas le fromage râpé (étape de minification) — corrigé.
- Correction de l'erreur `BeurreInsuffisantError` qui se déclenchait en boucle les jours fériés bretons.

### 🗑️ Supprimé

- Suppression du support de npm < 10 (incompatible avec le Bilig Runtime).
- Suppression du flag `--normandie` qui avait été ajouté par erreur dans la v1.5.
- Suppression du easter egg qui jouait un gavottes quand le build échouait (trop distrayant en prod).

---

## [1.5.0] — 2024-11-15 — "Far Breton" 🍮

> Dense, nourrissant, avec des pruneaux dedans (les pruneaux sont optionnels, comme en vrai).

### 🥞 Ajouté

- Package **emoji-commits** — Linter de commits qui vérifie la convention Emoji Commits Breizh.
- Support initial du **Breizh Script** (alpha) — parseur de base, pas encore de compilation.
- Template de Krampouezhenn Request avec checklist de dégustation.
- Documentation du protocole maritime de déploiement.
- Mode `--far-breton` pour les builds longs : affiche une barre de progression en forme de far qui cuit.

### 🧈 Amélioré

- Le `krampouz-annotator` supporte maintenant les annotations multi-couches.
- Meilleure gestion des erreurs réseau lors de la consultation de l'API SHOM.
- Les logs de build utilisent maintenant des emojis bretons au lieu des emojis standard.

### 🔥 Corrigé

- Fix de l'erreur `MaréeNonDisponibleError` qui crashait le CI les jours de tempête.
- Correction du calcul de couverture qui comptait les commentaires en breton comme du code exécutable.

---

## [1.0.0] — 2024-06-01 — "Galette Complète" 🥞🧀🥚🥓

> La première version complète. Comme la galette du même nom : œuf, jambon, fromage, rien ne manque.

### 🥞 Ajouté

- **krampouz-annotator** v1.0 — Annotateur de base pour TypeScript.
- **middleware-cidre** v1.0 — Middleware Express/Koa avec headers bretons.
- Architecture monorepo avec npm workspaces.
- CI/CD C.I.D.R.E. Pipeline avec vérification maritime.
- Templates d'issues : Crêpe Brûlée (bug) et Recette Beurre Salé (feature).
- Code de Conduite "Kod ar Vro" avec clause anti-beurre-doux.
- Guide de contribution avec convention Emoji Commits.
- Licence EUPL-1.2 avec préambule breton.

### 📜 Documentation

- README complet avec badges et diagramme d'architecture.
- Guide d'architecture détaillé.
- Spécification Breizh Script (draft).
- Documentation API SHOM.

---

## [0.1.0] — 2024-01-15 — "Premier Coup de Bilig" 🔥

> Le tout premier prototype. Le bilig chauffe, la pâte est prête, mais la technique de retournement n'est pas encore au point.

### 🥞 Ajouté

- Initialisation du monorepo.
- Prototype du `krampouz-annotator` (proof of concept).
- Configuration TypeScript de base.
- Premier jet du README (en breton uniquement à l'époque).
- Script `npm run bilig` pour le mode développement.

### ⚠️ Connu

- Le retournement de galette (hot reload) ne fonctionne qu'une fois sur deux.
- Les tests passent uniquement quand le coefficient de marée est pair.
- La documentation est uniquement en breton vannetais — traduction française prévue pour la v1.0.

---

## Légende des versions

| Nom de code | Version | Signification |
|-------------|---------|---------------|
| 🥞 Kouign-Amann | 2.0.0 | La pâtisserie ultime — couches de beurre et de sucre |
| 🍮 Far Breton | 1.5.0 | Dense et complet — la version qui tient au corps |
| 🥞🧀 Galette Complète | 1.0.0 | Tout est là — œuf, jambon, fromage |
| 🔥 Premier Coup de Bilig | 0.1.0 | Le début de l'aventure — le bilig chauffe |

---

*Kenavo ar raok — En avant pour la suite !* 🏴󠁦󠁲󠁢󠁲󠁥󠁿
