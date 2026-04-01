# Architecture du Système BZH-IA-KERN 🏗️

> *"Un ti mat a zo savet war fondamantoù kreñv"*  
> Une bonne maison est bâtie sur des fondations solides.

## 📐 Vue d'ensemble

BZH-IA-KERN est un système distribué basé sur une architecture **hexagonale maritime** (patent pending), inspirée des flux de marée de la Baie de Douarnenez et de la thermodynamique du bilig.

```
                         🌊 API SHOM (Marées)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ☁️  BILIG CLOUD                           │
│                   (Région Penn-ar-Bed)                       │
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐   │
│  │  🌊 Marée   │    │  🥞 Krampouz │    │  🧈 Beurre    │   │
│  │  Gateway    │───▶│  Engine      │───▶│  Cache        │   │
│  │             │    │  (Compiler)  │    │  (Redis salé) │   │
│  └─────────────┘    └──────┬───────┘    └───────────────┘   │
│         │                  │                     │           │
│         ▼                  ▼                     ▼           │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐   │
│  │  📊 SHOM    │    │  🔥 Bilig    │    │  🍺 Cidre     │   │
│  │  Adapter    │    │  Runtime     │    │  Middleware    │   │
│  │             │    │  Environment │    │  (Express)    │   │
│  └─────────────┘    └──────┬───────┘    └───────────────┘   │
│                            │                                │
│                            ▼                                │
│                    ┌──────────────┐                          │
│                    │  📝 Breizh   │                          │
│                    │  Script VM   │                          │
│                    │  (Interpré-  │                          │
│                    │   teur)      │                          │
│                    └──────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    🗄️ PostgreSQL       📦 npm Registry      🦪 CDN Cancale
    (Douarnenez)        (breizh.dev)         (Assets statiques)
```

---

## 🧱 Composants principaux

### 1. 🌊 Marée Gateway — Le routeur maritime

Le point d'entrée de toute requête. Chaque requête est d'abord évaluée en fonction du **coefficient de marée** actuel.

```
Requête entrante
      │
      ▼
┌─────────────┐     Coefficient >= 80 ?
│ Marée       │────── OUI ──▶ Route prioritaire (fast lane) 🏄
│ Gateway     │────── NON ──▶ Route standard (chenal balisé) ⛵
└─────────────┘
```

**Principe scientifique** : Lors des grandes marées (coefficient >= 80), le flux de données est amplifié par résonance maritime, permettant un débit supérieur. Ce phénomène, documenté par le SHOM depuis 1720, est exploité par notre algorithme de routage adaptatif.

**Configuration** :
```typescript
const gateway = new MaréeGateway({
  port: 'Douarnenez',          // Port de référence SHOM
  coefficientMinimum: 45,      // En dessous, on ferme le chenal
  modeUrgence: 'conque-marine' // Notification par conque si crash
});
```

### 2. 🥞 Krampouz Engine — Le compilateur galette

Le cœur du système. Compile le **Breizh Script** en TypeScript optimisé, puis en JavaScript de production.

```
                    Pipeline de compilation
                    
  Breizh Script ──▶ Parsing ──▶ AST Galette ──▶ Optimisation ──▶ TypeScript
       .bzh          (blé       (Abstract        (retourne-       .ts
                      noir)      Syntax           ment de
                                 Tree)            galette)
```

**Phases de compilation (métaphore crêpière)** :

| Phase | Nom technique | Équivalent crêpe | Description |
|-------|--------------|-------------------|-------------|
| 1 | Lexing | Tamisage de la farine | Tokenisation du code source |
| 2 | Parsing | Mélange de la pâte | Construction de l'AST |
| 3 | Type-checking | Repos de la pâte | Vérification des types (1h min) |
| 4 | Optimization | Cuisson premier côté | Élimination du code mort |
| 5 | Code generation | Retournement | Transformation en TypeScript |
| 6 | Bundling | Cuisson second côté | Assemblage final |
| 7 | Minification | Pliage de la galette | Réduction de taille |
| 8 | Output | Service au client | Fichiers de sortie prêts |

### 3. 🧈 Beurre Cache — Le cache salé

Un cache distribué basé sur Redis, spécialement configuré pour les besoins du projet.

```
┌──────────────────────────────────────────┐
│           🧈 BEURRE CACHE                │
│                                          │
│  Politique d'éviction : LRU              │
│  (Least Recently Used, comme le beurre   │
│   au fond du frigo)                      │
│                                          │
│  TTL par défaut : 6h12m                  │
│  (Durée d'une marée)                     │
│                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │Shard 1 │ │Shard 2 │ │Shard 3 │       │
│  │Brest   │ │Quimper │ │Lorient │       │
│  └────────┘ └────────┘ └────────┘       │
│                                          │
│  Mode: SALÉ (doux non supporté)          │
└──────────────────────────────────────────┘
```

**Particularité** : Le TTL du cache est calé sur la durée d'un cycle de marée (environ 6h12m). Les entrées de cache expirent naturellement avec la marée, garantissant des données toujours fraîches — comme les huîtres de Cancale.

### 4. 🔥 Bilig Runtime Environment (BRE)

Le runtime d'exécution, basé sur Node.js avec des patches spécifiques.

```
┌─────────────────────────────────────┐
│        🔥 BILIG RUNTIME             │
│                                     │
│  Node.js v20.x                      │
│  + patch thermique (ajuste le GC    │
│    selon la température du bilig)   │
│  + patch maritime (ajuste les       │
│    timeouts selon la marée)         │
│  + patch linguistique (erreurs      │
│    en breton)                       │
│                                     │
│  Température de fonctionnement :    │
│  180°C - 250°C (comme un vrai      │
│  bilig)                             │
│                                     │
│  ⚠️ Ne pas dépasser 300°C sous     │
│     peine de BeurreOverflowError    │
└─────────────────────────────────────┘
```

### 5. 🍺 Cidre Middleware

Middleware Express/Koa qui enrichit chaque réponse HTTP avec des métadonnées bretonnes.

**Headers ajoutés automatiquement** :

```http
X-Beurre-Mode: salé
X-Coefficient-Maree: 87
X-Region-Bretonne: Penn-ar-Bed
X-Powered-By: BZH-IA-KERN/2.0.0 (Kouign-Amann)
X-Prochaine-Maree-Haute: 2025-04-01T15:42:00+02:00
```

### 6. 📝 Breizh Script VM

Machine virtuelle pour l'exécution directe du Breizh Script (mode interprété).

Voir la [spécification complète](./breizh-script-spec.md) pour les détails du langage.

---

## 🔄 Flow de données — De la farine au déploiement

```
  👨‍💻 Développeur
      │
      │ écrit du Breizh Script (.bzh)
      ▼
  📝 Code Source
      │
      │ npm run krampouz (build)
      ▼
  🥣 Krampouz Engine
      │
      ├──▶ Vérification du coefficient ──▶ 🌊 API SHOM
      │                                        │
      │    ◀── Coefficient OK ────────────────┘
      │
      ├──▶ Compilation Breizh Script ──▶ TypeScript ──▶ JavaScript
      │
      ├──▶ Tests (npm run fest-noz) ──▶ Rapport de dégustation
      │
      ├──▶ Lint + Formatage ──▶ Code propre comme un bilig neuf
      │
      │ npm run en-avant-deux (deploy)
      ▼
  🚀 C.I.D.R.E. Pipeline
      │
      ├──▶ Vérification maritime (coefficient)
      ├──▶ Cuisson du code (build)
      ├──▶ Contrôle qualité (tests)
      │
      ▼
  ☁️  Bilig Cloud
      │
      ├──▶ 🗼 Brest (noeud principal)
      ├──▶ ⛵ Douarnenez (failover)
      ├──▶ 🏰 Quimper (cache)
      └──▶ 🦪 Cancale (CDN)
```

---

## 📦 Structure du monorepo

```
bzh-ia-kern/
├── packages/
│   ├── breizh-script/        # Compilateur Breizh Script
│   │   ├── src/
│   │   │   ├── lexer/        # Tamisage (tokenisation)
│   │   │   ├── parser/       # Mélange (AST)
│   │   │   ├── checker/      # Repos de la pâte (types)
│   │   │   ├── optimizer/    # Cuisson (optimisations)
│   │   │   └── emitter/      # Service (génération)
│   │   └── package.json
│   │
│   ├── krampouz-annotator/   # Annotations TypeScript
│   │   ├── src/
│   │   │   ├── decorators/   # @croustillant, @moelleux
│   │   │   ├── validators/   # Vérification de cuisson
│   │   │   └── reporters/    # Rapport de dégustation
│   │   └── package.json
│   │
│   ├── middleware-cidre/      # Middleware HTTP breton
│   │   ├── src/
│   │   │   ├── express/      # Adaptateur Express
│   │   │   ├── koa/          # Adaptateur Koa
│   │   │   └── headers/      # Générateur de headers
│   │   └── package.json
│   │
│   └── emoji-commits/        # Linter de commits
│       ├── src/
│       │   ├── rules/        # Règles de validation
│       │   └── formatter/    # Formatage des messages
│       └── package.json
│
├── docs/                     # Documentation
├── examples/                 # Exemples de code
├── assets/                   # Images et ressources
└── .github/                  # CI/CD et templates
```

---

## 🔐 Sécurité

### Modèle de menace : Le Bilig Threat Model

```
              Menaces identifiées
              
  🏴‍☠️ Pirate normand ──▶ Tentative d'injection de beurre doux
                          Mitigation : validation stricte du champ beurre
                          
  🌊 Marée de tempête ──▶ DDoS naturel sur le Marée Gateway
                          Mitigation : rate limiting calé sur les coefficients
                          
  🔥 Surchauffe bilig ──▶ BeurreOverflowError en cascade
                          Mitigation : circuit breaker avec cooldown de 30s
                          
  🦪 Huître périmée  ──▶ Dépendance compromise (supply chain)
                          Mitigation : audit npm + vérification de fraîcheur
```

---

## 📊 Métriques de performance

| Métrique | Valeur | Unité |
|----------|--------|-------|
| Temps de compilation | 4.2s | Par galette (fichier) |
| Temps de build complet | 42s | Pour le monorepo entier |
| Cache hit ratio | 87% | Taux de beurre en cache |
| Latence P99 | 120ms | À marée haute |
| Latence P99 | 340ms | À marée basse |
| Throughput max | 1200 req/s | À coefficient 110+ |
| Throughput moyen | 800 req/s | Coefficient standard |

---

*Document maintenu par le Comité d'Architecture Maritime — Dernière mise à jour : Meurzh 2025* 🏴󠁦󠁲󠁢󠁲󠁥󠁿
