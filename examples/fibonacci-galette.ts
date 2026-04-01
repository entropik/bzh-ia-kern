/**
 * 🥞 Suite de Galettes — L'algorithme de Fibonacci version bretonne
 *
 * Chaque nombre est une couche de crêpe empilée. La pile grandit
 * selon la Suite de Galettes : chaque galette est la somme des
 * deux galettes précédentes.
 *
 * "Ar galette gentañ a zo bihan, met ar bern a gresk buan !"
 * (La première galette est petite, mais la pile grandit vite !)
 *
 * Breizh Script:
 *   stumm suitGalette(niver: niver): niver[] {
 *       ma (niver <= 0) { distro [] }
 *       ledan bern: niver[] = [1, 1]
 *       pa (bern.hirder < niver) {
 *           dalc'h nevez = bern[bern.hirder - 1] + bern[bern.hirder - 2]
 *           bern.ouzhpennañ(nevez)
 *       }
 *       distro bern
 *   }
 *
 * @module fibonacci-galette
 * @version 2.0.0
 * @license EUPL-1.2
 * @beurre salé (évidemment)
 * @croustillant 100%
 */

// ============================================================
// 📐 Doareoù — Types
// ============================================================

/** Ur galette er bern — Une galette dans la pile */
interface GaletteDansBern {
  /** Niverus ar galette — Numéro de la galette */
  niverus: number;
  /** Ment ar galette — Taille de la galette (valeur Fibonacci) */
  ment: number;
  /** Niver kouezhadennoù — Nombre de couches empilées */
  kouezhadennou: number;
}

/** Ar bern galette — La pile de galettes */
interface BernGalette {
  /** Roll ar galettezennoù — Liste des galettes */
  galettezennouù: GaletteDansBern[];
  /** Uhelder hollel — Hauteur totale */
  uhelder: number;
  /** Krousted keidennek — Croustillance moyenne */
  kroustedKeidennek: number;
}

// ============================================================
// 🥞 Suite de Galettes — Algorithme principal
// ============================================================

/**
 * Jenerañ ar suit galette — Générer la Suite de Galettes
 *
 * Fibonacci, mais avec du beurre salé.
 * F(0) = 1 galette
 * F(1) = 1 galette
 * F(n) = F(n-1) + F(n-2) galettes
 *
 * @param niver — Nombre de galettes à empiler
 * @returns La suite de Galettes
 */
function suitGalette(niver: number): number[] {
  if (niver <= 0) return [];
  if (niver === 1) return [1];

  const bern: number[] = [1, 1];

  while (bern.length < niver) {
    const nevez = bern[bern.length - 1] + bern[bern.length - 2];
    bern.push(nevez);
  }

  return bern;
}

/**
 * Sevel ar bern — Construire la pile de galettes visuellement
 *
 * @param niver — Nombre d'étages dans la pile
 * @returns La pile de galettes avec métadonnées
 */
function sevelBern(niver: number): BernGalette {
  const suite = suitGalette(niver);
  let uhelderTotal = 0;

  const galettezennouù: GaletteDansBern[] = suite.map((ment, i) => {
    uhelderTotal += ment;
    return {
      niverus: i + 1,
      ment,
      kouezhadennou: uhelderTotal,
    };
  });

  const kroustedKeidennek =
    galettezennouù.length > 0
      ? Math.round(
          galettezennouù.reduce(
            (sum, g) => sum + Math.min(95, 50 + g.niverus * 5),
            0
          ) / galettezennouù.length
        )
      : 0;

  return {
    galettezennouù: galettezennouù,
    uhelder: uhelderTotal,
    kroustedKeidennek,
  };
}

// ============================================================
// 🎨 Diskouez — Affichage
// ============================================================

/**
 * Diskouez ar bern — Afficher la pile de galettes en ASCII art
 */
function diskouezBern(bern: BernGalette): void {
  const maxMent = Math.max(...bern.galettezennouù.map((g) => g.ment));
  const largeurMax = Math.min(maxMent * 2 + 4, 60);

  console.log();
  console.log('     🧈 Beurre salé (au sommet, comme il se doit)');
  console.log(`     ${'~'.repeat(Math.min(8, largeurMax))}`);

  // Affichañ adalek al lein — Afficher depuis le sommet
  const reversed = [...bern.galettezennouù].reverse();

  for (const galette of reversed) {
    const largeur = Math.min(Math.max(galette.ment * 2, 3), 58);
    const padding = Math.max(0, Math.floor((largeurMax - largeur) / 2));
    const crepe = '🥞'.repeat(Math.min(galette.ment, 15)) || '🥞';

    const numStr = `#${galette.niverus}`;
    const mentStr = `(${galette.ment})`;
    console.log(
      `${' '.repeat(padding)}${crepe} ${numStr} ${mentStr}`
    );
  }

  // Ar bilig — Le bilig (support)
  console.log(`     ${'═'.repeat(Math.min(largeurMax, 50))}`);
  console.log(`     ${'░'.repeat(Math.min(largeurMax, 50))} 🔥 Bilig`);
}

/**
 * Diskouez an daolenn — Afficher le tableau récapitulatif
 */
function diskouezDaolenn(bern: BernGalette): void {
  console.log('\n┌─────┬──────────────┬────────────┬──────────────┐');
  console.log('│  #  │ Taille (ment) │ Cumulé     │ Croustillance│');
  console.log('├─────┼──────────────┼────────────┼──────────────┤');

  for (const g of bern.galettezennouù) {
    const krousted = Math.min(95, 50 + g.niverus * 5);
    const barre = '█'.repeat(Math.floor(krousted / 10));
    console.log(
      `│ ${String(g.niverus).padStart(3)} │ ${String(g.ment).padStart(12)} │ ${String(g.kouezhadennou).padStart(10)} │ ${barre.padEnd(10)} ${String(krousted)}% │`
    );
  }

  console.log('└─────┴──────────────┴────────────┴──────────────┘');
}

/**
 * Version récursive — Fibonacci récursif (comme une pile de crêpes infinies)
 *
 * ⚠️ Attention : au-delà de 40, le bilig surchauffe (stack overflow)
 *
 * Breizh Script:
 *   stumm galette_rekursus(n: niver): niver {
 *       ma (n <= 1) { distro 1 }
 *       distro galette_rekursus(n - 1) + galette_rekursus(n - 2)
 *   }
 */
function galetteRekursus(n: number): number {
  if (n <= 1) return 1;
  return galetteRekursus(n - 1) + galetteRekursus(n - 2);
}

/**
 * Version mémoïsée — Avec le Beurre Cache 🧈
 *
 * Comme un bon crêpier qui se souvient de ses recettes
 */
function galetteGantCache(): (n: number) => number {
  const cache = new Map<number, number>();
  // Le cache est initialisé avec les valeurs de base
  // (la première galette, on la connaît par cœur)
  cache.set(0, 1);
  cache.set(1, 1);

  return function galette(n: number): number {
    if (cache.has(n)) {
      return cache.get(n)!;
    }
    const disoc'h = galette(n - 1) + galette(n - 2);
    cache.set(n, disoc'h);
    return disoc'h;
  };
}

// ============================================================
// 🚀 Programm pennañ — Programme principal
// ============================================================

function pennan(): void {
  console.log('🏴󠁦󠁲󠁢󠁲󠁥󠁿 ═══════════════════════════════════════════');
  console.log('   Suite de Galettes — Fibonacci à la Bretonne');
  console.log('   "Pep galette a zo ar somm eus an div galette kent"');
  console.log('   (Chaque galette est la somme des deux précédentes)');
  console.log('🏴󠁦󠁲󠁢󠁲󠁥󠁿 ═══════════════════════════════════════════\n');

  // Kemañ ar bern — Construire la pile
  const NIVER_GALETTE = 12;
  console.log(`📐 Calcul de la Suite de Galettes pour n=${NIVER_GALETTE}...\n`);

  const suite = suitGalette(NIVER_GALETTE);
  console.log(`📊 Suite : [${suite.join(', ')}]`);

  // Sevel ha diskouez — Construire et afficher
  const bern = sevelBern(NIVER_GALETTE);

  console.log('\n🥞 Pile de galettes (vue de côté) :');
  diskouezBern(bern);

  console.log('\n📋 Tableau récapitulatif :');
  diskouezDaolenn(bern);

  // Stadegoù — Statistiques
  console.log('\n📊 Stadegoù (Statistiques) :');
  console.log(`   🥞 Nombre de galettes : ${bern.galettezennouù.length}`);
  console.log(`   📏 Hauteur totale : ${bern.uhelder} couches`);
  console.log(`   ✨ Croustillance moyenne : ${bern.kroustedKeidennek}%`);
  console.log(`   🧈 Mode beurre : salé (toujours)`);

  // Kedaolañ performañs — Comparer les performances
  console.log('\n⚡ Test de performance — Récursif vs Cache :');

  const n = 30;

  const t1 = performance.now();
  const r1 = galetteRekursus(n);
  const d1 = (performance.now() - t1).toFixed(2);

  const galetteCache = galetteGantCache();
  const t2 = performance.now();
  const r2 = galetteCache(n);
  const d2 = (performance.now() - t2).toFixed(2);

  console.log(`   🐢 Récursif naïf  : galette(${n}) = ${r1} en ${d1}ms`);
  console.log(`   🧈 Avec Beurre Cache : galette(${n}) = ${r2} en ${d2}ms`);
  console.log(`   📈 Le cache, c'est comme le beurre : ça accélère tout !`);

  // Kenavo
  console.log('\n🍺 Yec\'hed mat ! La pile est complète !');
  console.log('🏴󠁦󠁲󠁢󠁲󠁥󠁿 Kenavo — Au revoir !\n');
}

// Lañsañ — Lancer
pennan();
