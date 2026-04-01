# Spécification du langage Breizh Script 📝🏴󠁦󠁲󠁢󠁲󠁥󠁿

> *"Ur yezh nevez evit ur bed nevez"* — Une nouvelle langue pour un nouveau monde.

**Version** : 2.0.0 (Kouign-Amann)  
**Statut** : Draft vivant — évolue au rythme des marées  
**Auteurs** : Comité Linguistique du Bilig

---

## 1. Introduction

**Breizh Script** (extension `.bzh`) est un langage de programmation régional, typé statiquement, qui compile vers du TypeScript. Sa syntaxe est inspirée du breton moderne avec des emprunts au vocabulaire maritime et crêpier.

Breizh Script a été conçu pour répondre à un constat alarmant : **100% des langages de programmation mainstream sont anglo-saxons**. Il était temps qu'un langage sente le beurre salé et l'embruns.

### 1.1 Objectifs

- Proposer une alternative régionale aux langages de programmation existants
- Démontrer que le typage statique et la crêpe croustillante ne sont pas incompatibles
- Valoriser la langue bretonne dans l'écosystème tech
- Fournir des messages d'erreur compréhensibles (en breton)

### 1.2 Hello World

```bzh
# Mon premier programme en Breizh Script
stumm demat() {
    skrivañ("Demat d'an holl! 🏴󠁦󠁲󠁢󠁲󠁥󠁿")
}
```

---

## 2. Grammaire

### 2.1 Mots-clés réservés

| Breizh Script | Équivalent TypeScript | Signification bretonne |
|---------------|----------------------|----------------------|
| `stumm` | `function` | fonction (lit. "mouvement") |
| `ma` | `if` | si |
| `mod` | `else` | sinon |
| `pa` | `while` | quand/tant que |
| `evit` | `for` | pour |
| `distro` | `return` | retourner (lit. "rendre") |
| `gwir` | `true` | vrai |
| `gaou` | `false` | faux |
| `netra` | `null` | rien |
| `digustum` | `undefined` | indéfini |
| `ledan` | `let` | large/variable |
| `dalc'h` | `const` | tenir/constante |
| `doare` | `type` | manière/type |
| `strollad` | `class` | groupe/classe |
| `diazez` | `interface` | base/interface |
| `enporzhiañ` | `import` | importer |
| `ezporzhiañ` | `export` | exporter |
| `klask` | `try` | essayer |
| `pakañ` | `catch` | attraper |
| `taol` | `throw` | lancer |
| `gortoz` | `await` | attendre |
| `dic'hortoz` | `async` | asynchrone |

### 2.2 Types primitifs

| Breizh Script | TypeScript | Description |
|---------------|-----------|-------------|
| `niver` | `number` | Nombre (lit. "nombre") |
| `hedad` | `string` | Chaîne (lit. "longueur") |
| `bool` | `boolean` | Booléen |
| `taolennoù` | `array` | Tableau (lit. "tables") |
| `diaz` | `void` | Vide |
| `nep` | `any` | N'importe quoi (usage déconseillé, comme le beurre doux) |

### 2.3 Types spéciaux BZH-IA-KERN

```bzh
# Types liés aux marées
doare KoefisiantMaree = niver  # 20-120
doare Porzh = "Douarnenez" | "Brest" | "Cancale" | "Lorient"
doare StadiadMaree = "uhel" | "izel" | "kreskiñ" | "digreskiñ"
    # uhel=haute, izel=basse, kreskiñ=montante, digreskiñ=descendante

# Types liés à la cuisson
doare BeurreMode = "salé" | "demi-sel"  # "doux" intentionnellement absent
doare Krousted = niver  # 0-100, indice de croustillance
doare Temperatur = niver  # Température du bilig en °C
```

### 2.4 Syntaxe EBNF

```ebnf
programme     = { deklaradur } ;
deklaradur    = stumm_dekl | ledan_dekl | dalch_dekl | doare_dekl ;

stumm_dekl    = [ "ezporzhiañ" ] [ "dic'hortoz" ] "stumm" anv "(" params ")" 
                [ ":" doare ] bloc ;
ledan_dekl    = "ledan" anv [ ":" doare ] "=" expr ";" ;
dalch_dekl    = "dalc'h" anv [ ":" doare ] "=" expr ";" ;
doare_dekl    = "doare" anv "=" doare ";" ;

bloc          = "{" { kezeladenn } "}" ;
kezeladenn    = ledan_dekl | dalch_dekl | ma_kez | pa_kez | evit_kez
              | distro_kez | expr ";" ;

ma_kez        = "ma" "(" expr ")" bloc [ "mod" bloc ] ;
pa_kez        = "pa" "(" expr ")" bloc ;
evit_kez      = "evit" "(" ledan_dekl expr ";" expr ")" bloc ;
distro_kez    = "distro" [ expr ] ";" ;

expr          = hedad_lit | niver_lit | bool_lit | anv | galv 
              | expr operatour expr | "(" expr ")" ;
galv          = expr "(" [ expr { "," expr } ] ")" ;

operatour     = "+" | "-" | "*" | "/" | "==" | "!=" | "<" | ">" 
              | "<=" | ">=" | "ha" | "pe" ;  # ha=et, pe=ou

anv           = identifiant ;
params        = [ anv ":" doare { "," anv ":" doare } ] ;
doare         = "niver" | "hedad" | "bool" | "diaz" | anv 
              | doare "[]" | "(" params ")" "=>" doare ;
```

---

## 3. Exemples

### 3.1 Variables et constantes

```bzh
# Variables (ledan = large, mutable)
ledan anv: hedad = "Yann"
ledan oad: niver = 42
ledan emaon_o_c'hoari: bool = gwir

# Constantes (dalc'h = tenir, immutable)
dalc'h PI: niver = 3.14159
dalc'h BEURRE: hedad = "salé"  # Toujours.
dalc'h KOEFISIANT_MAX: niver = 120
```

### 3.2 Fonctions

```bzh
# Fonction simple
stumm jediñMat(anv: hedad): hedad {
    distro "Demat, " + anv + "! Yec'hed mat! 🍺"
}

# Fonction asynchrone
dic'hortoz stumm klaskKoefisiant(porzh: Porzh): niver {
    dalc'h respont = gortoz klask_maree(porzh)
    distro respont.koefisiant
}

# Fonction avec callback
stumm evitPepGalette(
    galettes: hedad[], 
    ober: stumm(g: hedad): diaz
): diaz {
    evit (ledan i: niver = 0; i < galettes.hirder; i + 1) {
        ober(galettes[i])
    }
}
```

### 3.3 Conditions

```bzh
stumm gwiriekaat_koefisiant(koef: niver): hedad {
    ma (koef >= 100) {
        distro "🌊 Marée du siècle ! Déploiement URGENT !"
    } mod ma (koef >= 80) {
        distro "🏄 Grande marée — conditions optimales"
    } mod ma (koef >= 45) {
        distro "⛵ Marée standard — navigation normale"
    } mod {
        distro "🏖️ Morte-eau — report du déploiement recommandé"
    }
}
```

### 3.4 Boucles

```bzh
# Boucle for (evit)
evit (ledan i: niver = 1; i <= 10; i + 1) {
    skrivañ("Galette niverus " + i)
}

# Boucle while (pa)
ledan temperatur: niver = 20
pa (temperatur < 220) {
    temperatur = temperatur + 10
    skrivañ("🔥 Bilig : " + temperatur + "°C")
}
skrivañ("✅ Bilig prêt — température optimale atteinte !")
```

### 3.5 Classes

```bzh
ezporzhiañ strollad Galette {
    ledan garnitur: hedad[]
    ledan krousted: Krousted
    
    stumm sevel(garnitur: hedad[]) {
        an.garnitur = garnitur
        an.krousted = 0
    }
    
    stumm kouezhañ(): diaz {
        # Cuisson
        pa (an.krousted < 85) {
            an.krousted = an.krousted + 5
        }
        skrivañ("🥞 Croustillance : " + an.krousted + "%")
    }
    
    stumm treiñ(): diaz {
        # Retournement
        skrivañ("🔄 Retournement de la galette !")
        an.krousted = an.krousted + 10
    }
    
    stumm servij(): hedad {
        ma (an.krousted < 70) {
            taol BeurreInsuffisantFazi("Cuisson insuffisante !")
        }
        distro "🍽️ Galette servie : " + an.garnitur.stagañ(", ")
    }
}

# Utilisation
dalc'h maGalette = Galette.nevez(["jambon", "fromage", "œuf"])
maGalette.kouezhañ()
maGalette.treiñ()
maGalette.kouezhañ()
skrivañ(maGalette.servij())
```

### 3.6 Gestion d'erreurs

```bzh
klask {
    dalc'h koef = gortoz klaskKoefisiant("Douarnenez")
    ma (koef < 20) {
        taol MareeReFazi("Coefficient trop bas pour déployer !")
    }
    skrivañ("✅ Déploiement autorisé — coefficient : " + koef)
} pakañ (fazi) {
    skrivañ("❌ Fazi ! " + fazi.kemenn)
    # fazi = erreur, kemenn = message
}
```

---

## 4. Modules et imports

```bzh
# Import depuis un module BZH
enporzhiañ { MareeGateway, KoefisiantMaree } adalek "@ooblik/middleware-cidre"

# Import depuis un module Node.js standard
enporzhiañ { readFile } adalek "node:fs/promises"

# Import par défaut
enporzhiañ Bilig adalek "./bilig"

# Export
ezporzhiañ stumm kaletenn(): hedad {
    distro "🥞"
}

ezporzhiañ dalc'h STUMM: hedad = "2.0.0"
```

---

## 5. Bibliothèque standard (Levraoueg standard)

### 5.1 Fonctions globales

| Fonction | Description |
|----------|-------------|
| `skrivañ(kemenn)` | Afficher un message (console.log) |
| `klask_maree(porzh)` | Interroger l'API SHOM |
| `gortoz(ms)` | Attendre N millisecondes |
| `dilezel(kemenn)` | Quitter avec erreur (process.exit) |

### 5.2 Méthodes de chaîne (hedad)

| Méthode | Équivalent JS | Description |
|---------|---------------|-------------|
| `.hirder` | `.length` | Longueur |
| `.stagañ(sep)` | `.join(sep)` | Joindre |
| `.troc'hañ(i, j)` | `.slice(i, j)` | Découper |
| `.klask(s)` | `.indexOf(s)` | Chercher |
| `.bras()` | `.toUpperCase()` | Majuscules |
| `.bihan()` | `.toLowerCase()` | Minuscules |

---

## 6. Compilation

### 6.1 Commande de compilation

```bash
# Compiler un fichier .bzh en .ts
npx krampouz compile hello.bzh

# Compiler et exécuter
npx krampouz run hello.bzh

# Compiler tout le projet
npm run krampouz
```

### 6.2 Exemple de sortie compilée

**Entrée** (`hello.bzh`) :
```bzh
dalc'h anv: hedad = "Breizh"
stumm demat(den: hedad): hedad {
    distro "Demat, " + den + "!"
}
skrivañ(demat(anv))
```

**Sortie** (`hello.ts`) :
```typescript
const anv: string = "Breizh";
function demat(den: string): string {
    return "Demat, " + den + "!";
}
console.log(demat(anv));
```

---

## 7. Messages d'erreur

Les erreurs sont affichées en breton avec traduction française :

```
❌ FAZI E-05: Doare fall — "hedad" gortozet, "niver" roet
   (Type incorrect — "string" attendu, "number" fourni)
   
   📍 hello.bzh:12:8
   
   12 |    dalc'h anv: hedad = 42
      |                        ^^
      |    Gant an doare "niver", n'eo ket "hedad"

❌ FAZI K-12: Beurre fall — "doux" n'eo ket aotreet
   (Beurre incorrect — "doux" n'est pas autorisé)
   
   📍 config.bzh:3:22
   
    3 |    dalc'h beurre = "doux"
      |                    ^^^^^^
      |    Implijit "salé" pe "demi-sel". "Doux" n'eo ket ur beurre.
```

---

## 8. Roadmap du langage

| Version | Nom de code | Fonctionnalités prévues |
|---------|-------------|------------------------|
| 2.0 | Kouign-Amann | Grammaire complète, types, classes |
| 2.1 | Kig-ha-Farz | Génériques, pattern matching |
| 2.2 | Andouille de Guémené | Macros procédurales |
| 3.0 | Coquille Saint-Jacques | Concurrence native (modèle marée) |

---

*Spécification maintenue par le Comité Linguistique du Bilig*  
*"Brezhoneg ha kod, unan eo !"* — Breton et code, c'est un ! 🏴󠁦󠁲󠁢󠁲󠁥󠁿
