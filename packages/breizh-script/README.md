# 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Breizh Script — Syntaxe Regionale Souveraine

> *"Le futur du code est artisanal, local et au beurre sale."*

**Breizh Script** est le premier langage de programmation certifie **IGP Bretagne**. Il transforme votre code JavaScript/TypeScript en syntaxe bretonne de creperie, parce que la souverainete numerique commence dans l'assiette.

[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://marketplace.visualstudio.com/items?itemName=ooblik.breizh-script)
[![Beurre](https://img.shields.io/badge/beurre-sal%C3%A9-gold)](https://fr.wikipedia.org/wiki/Beurre_sal%C3%A9)
[![License](https://img.shields.io/badge/license-WTFPL-green)](http://www.wtfpl.net/)
[![Crepes](https://img.shields.io/badge/crepes%20produites-∞-orange)](https://fr.wikipedia.org/wiki/Cr%C3%AApe_bretonne)

---

## 🥞 Pourquoi Breizh Script ?

Le JavaScript a ete invente en 10 jours. Le Breizh Script a ete **muri pendant 5000 ans** sur les cotes bretonnes, forge par le vent d'ouest et le sel de Guerande.

- 🗿 **`const`** est remplace par **`menhir`** — immuable comme la pierre depuis le neolithique
- 🧈 **`true`** devient **`beurre_sale`** — la seule verite universelle
- 🥞 **`if`** devient **`krampouz`** — chaque condition est un choix existentiel
- ⚓ **`async`** devient **`war_an_hent`** — en route sur les flots

## 📦 Installation

```bash
# Via le VS Code Marketplace (bientot certifie Produit en Bretagne)
ext install ooblik.breizh-script

# Ou en mode artisanal
git clone https://github.com/ooblik/breizh-script.git
cd breizh-script && npm install && npm run compile
```

## 🔥 Demarrage Rapide

### 1. Activez l'extension

Ouvrez un fichier `.js`, `.ts` ou `.bzh`. L'extension s'active et affiche :

```
Degemer mat! Breizh Script activated 🏴󠁦󠁲󠁢󠁲󠁥󠁿
```

### 2. Traduisez votre code

`Ctrl+Shift+P` → **"Breizh Script: Traduire en Breton"**

### 3. Activez le Mode Krampouz 🔥

`Ctrl+Shift+P` → **"Breizh Script: Activer le Mode Krampouz"**

La bilig est chaude, la traduction se fait en temps reel a chaque formatage.

---

## 📖 Lexique Complet

| JavaScript       | Breizh Script          | Explication 🧈                                    |
|------------------|------------------------|----------------------------------------------------|
| `if`             | `krampouz`             | 🥞 Le choix fondamental : froment ou sarrasin ?    |
| `else`           | `gwinizh_du`           | 🌾 L'alternative : le sarrasin (ble noir)          |
| `for` / `while`  | `bilig`                | 🔄 La plaque ronde qui tourne sans fin             |
| `function`       | `recette`              | 👨‍🍳 Ingredients, etapes, resultat                   |
| `return`         | `serviñ`               | 🍽️ Le plat est servi !                             |
| `class`          | `crêperie`             | 🏠 Le template d'etablissement                     |
| `import`         | `degemer`              | 🤝 Bienvenue au module                             |
| `export`         | `kenavo`               | 👋 Au revoir, bon vent                             |
| `try`            | `tastañ`               | 🍴 On goute prudemment                             |
| `catch`          | `fest_noz`             | 🎉 C'est la fete (le bazar)                        |
| `throw`          | `taol`                 | 💥 On lance comme un palet breton                  |
| `const`          | `menhir`               | 🗿 Immuable depuis 5000 ans                        |
| `let`            | `korriganed`           | 🧝 Petits etres changeants                         |
| `var`            | `chouchenn`            | 🍺 Ca tourne la tete (deprecie)                    |
| `null`           | `marée_basse`          | 🌊 Le neant cotier                                 |
| `undefined`      | `brumañ`               | 🌫️ Brouillard marin, on ne voit rien              |
| `true`           | `beurre_salé`          | 🧈 La verite absolue                               |
| `false`          | `beurre_doux`          | 🚫 L'heresie culinaire                             |
| `console.log`    | `sonner_du_biniou`     | 🎵 Le biniou pour se faire entendre                |
| `Error`          | `fest_noz`             | 🎉 Chaos non planifie                              |
| `deploy`         | `en_avant_deux`        | ⚓ Larguer les amarres !                           |
| `debug`          | `pesketa`              | 🐟 Pecher les bugs au chalut                       |
| `async`          | `war_an_hent`          | ⛵ En route sur les flots                          |
| `await`          | `gortoz`               | ⏳ J'attends (Gortoz a Ran)                        |
| `Promise`        | `promesse_de_marin`    | ⚓ Il reviendra... peut-etre                       |

---

## 💡 Exemples

### Avant (JavaScript triste et sans ame)

```javascript
const API_URL = "https://api.crepes.bzh";

async function fetchCrepes(type) {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Crepes unavailable");
    }
  } catch (error) {
    console.log("Failed:", error);
    return null;
  }
}
```

### Apres (Breizh Script artisanal au beurre sale) 🧈

```breizh
menhir API_URL = "https://api.crepes.bzh";

war_an_hent recette fetchCrepes(type) {
  tastañ {
    menhir response = gortoz fetch(API_URL);
    krampouz (response.ok) {
      serviñ response.json();
    } gwinizh_du {
      taol new fest_noz("Crepes unavailable");
    }
  } fest_noz (fest_noz) {
    sonner_du_biniou("Failed:", fest_noz);
    serviñ marée_basse;
  }
}
```

---

## ⚙️ Configuration

| Parametre                          | Defaut           | Description                                           |
|------------------------------------|------------------|-------------------------------------------------------|
| `breizh-script.dialect`            | `cornouaillais`  | Dialecte breton (cornouaillais, leonard, tregerois, vannetais) |
| `breizh-script.beurre`             | `sale`           | Type de beurre. `doux` = avertissement a chaque sauvegarde |
| `breizh-script.krampouz.temperature` | `220`          | Temperature de la bilig (°C). Affecte la transpilation. |

---

## 🗺️ Roadmap

- [ ] 🦞 **v2.1** — Support du homard comme type generique
- [ ] 🌊 **v2.2** — Mode "Tempete" pour le refactoring agressif
- [ ] 🎵 **v3.0** — Integration biniou-sonore a chaque `console.log`
- [ ] 🏰 **v4.0** — Transpilation vers COBOL breton (Kerne COBOL)
- [ ] 🌍 **v5.0** — Extension aux 6 nations celtiques (Pays de Galles, Ecosse, Irlande, Cornouailles, Ile de Man)

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Merci de soumettre vos PRs **en breton ou en galette-saucisse**.

Avant de contribuer, assurez-vous que :
1. Votre code compile au beurre sale
2. Vos tests passent sur une bilig a 220°C
3. Vous n'utilisez **jamais** de beurre doux dans vos exemples

---

## 📄 License

**WTFPL** — Do What The Fest-noz You Want To Public License.

---

<p align="center">
  Fait avec 🧈 en Bretagne — <b>Breizh atao!</b> 🏴󠁦󠁲󠁢󠁲󠁥󠁿
</p>
