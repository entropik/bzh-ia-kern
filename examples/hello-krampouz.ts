/**
 * 🥞 Hello Krampouz — Le "Hello World" breton
 *
 * Ar programm kentañ e Breizh Script, skrivet e TypeScript
 * (Le premier programme en Breizh Script, écrit en TypeScript)
 *
 * Breizh Script:
 *   stumm demat() {
 *       dalc'h kemenn: hedad = "Demat d'an holl!"
 *       skrivañ(kemenn)
 *   }
 *
 * @module hello-krampouz
 * @version 2.0.0
 * @license EUPL-1.2
 * @beurre salé
 * @croustillant 95%
 */

// ============================================================
// 📦 Enporzhiañ — Imports
// ============================================================

// Simulañ ar middleware-cidre (simuler le middleware cidre)
// En vrai, on importerait depuis @ooblik/middleware-cidre
interface DonneesMaree {
  port: string;
  coefficient: number;
  stadiad: 'uhel' | 'izel' | 'kreskiñ' | 'digreskiñ';
  deploiementAutorise: boolean;
}

// ============================================================
// 📐 Doareoù — Types
// ============================================================

/** Doare evit ar beurre — Type pour le beurre */
type BeurreMode = 'salé' | 'demi-sel';
// ⚠️ 'doux' n'est intentionnellement pas dans l'union type.
// Ce n'est pas un oubli, c'est une conviction.

/** Doare evit ar galette — Type pour la galette */
interface Galette {
  anv: string;           // nom
  garnitur: string[];    // garniture
  krousted: number;      // indice de croustillance (0-100)
  beurre: BeurreMode;    // mode beurre
}

/** Doare evit ar c'hrampouezer — Type pour le crêpier */
interface Krampouezer {
  anv: string;           // nom
  goureg: string;        // surnom
  bloavezhioù: number;   // années d'expérience
}

// ============================================================
// 🗿 Konstañtoù — Constantes
// ============================================================

/** Temperatur ar bilig — Température du bilig en °C */
const TEMPERATUR_BILIG = 220;

/** Beurre dre ziouer — Beurre par défaut (évidemment salé) */
const BEURRE_DIOUER: BeurreMode = 'salé';

/** Koefisiant minimum evit an displegadur — Coefficient minimum pour le déploiement */
const KOEFISIANT_MINIMUM = 45;

// ============================================================
// 🥞 Stummoù — Fonctions
// ============================================================

/**
 * Demat d'an holl! — Bonjour à tous !
 * Ar stumm kentañ — La fonction principale
 *
 * Breizh Script:
 *   stumm demat(anv: hedad): hedad {
 *       distro "Demat, " + anv + "! Yec'hed mat! 🍺"
 *   }
 */
function demat(anv: string): string {
  return `Demat, ${anv}! Yec'hed mat! 🍺`;
}

/**
 * Sevel ur galette — Créer une galette
 *
 * Breizh Script:
 *   stumm sevelGalette(anv: hedad, garnitur: hedad[]): Galette {
 *       distro { anv, garnitur, krousted: 0, beurre: "salé" }
 *   }
 */
function sevelGalette(anv: string, garnitur: string[]): Galette {
  return {
    anv,
    garnitur,
    krousted: 0,
    beurre: BEURRE_DIOUER,
  };
}

/**
 * Kouezhañ ar galette — Cuire la galette
 * Kreskiñ ar grousted betek 100 — Augmenter la croustillance jusqu'à 100
 *
 * Breizh Script:
 *   stumm kouezhañ(galette: Galette, amzer: niver): Galette {
 *       ledan krousted = galette.krousted + (amzer * 5)
 *       ma (krousted > 100) { krousted = 100 }
 *       distro { ...galette, krousted }
 *   }
 */
function kouezhan(galette: Galette, amzer: number): Galette {
  const krousted = Math.min(galette.krousted + amzer * 5, 100);
  return { ...galette, krousted };
}

/**
 * Gwiriekaat ar c'hoefisiant — Vérifier le coefficient de marée
 * Simulañ ur galv d'an API SHOM — Simuler un appel à l'API SHOM
 */
async function gwiriekaatKoefisiant(): Promise<DonneesMaree> {
  // Simulañ un tempo evel ur gwir galv API
  // (Simuler un délai comme un vrai appel API)
  await new Promise((resolve) => setTimeout(resolve, 100));

  const coefficient = Math.floor(Math.random() * 60) + 60;

  return {
    port: 'Douarnenez',
    coefficient,
    stadiad: coefficient > 75 ? 'kreskiñ' : 'digreskiñ',
    deploiementAutorise: coefficient >= KOEFISIANT_MINIMUM,
  };
}

/**
 * Diskouez ar galette — Afficher la galette
 */
function diskouezGalette(galette: Galette): void {
  console.log('┌────────────────────────────────┐');
  console.log(`│ 🥞 ${galette.anv.padEnd(26)} │`);
  console.log('├────────────────────────────────┤');
  console.log(`│ Garnitur : ${galette.garnitur.join(', ').padEnd(19)} │`);
  console.log(`│ Krousted : ${'█'.repeat(Math.floor(galette.krousted / 10)).padEnd(10)} ${String(galette.krousted).padStart(3)}% │`);
  console.log(`│ Beurre   : ${galette.beurre.padEnd(19)} │`);
  console.log('└────────────────────────────────┘');
}

// ============================================================
// 🚀 Programm pennañ — Programme principal
// ============================================================

/**
 * Ar stumm pennañ — La fonction principale
 *
 * Breizh Script:
 *   dic'hortoz stumm pennañ(): diaz {
 *       skrivañ(demat("Krampouz"))
 *       ...
 *   }
 */
async function pennan(): Promise<void> {
  console.log('🏴󠁦󠁲󠁢󠁲󠁥󠁿 ═══════════════════════════════════');
  console.log('   BZH-IA-KERN — Hello Krampouz');
  console.log('🏴󠁦󠁲󠁢󠁲󠁥󠁿 ═══════════════════════════════════\n');

  // Demat ! — Bonjour !
  console.log(demat('Krampouz'));
  console.log(demat('Breizh'));
  console.log(demat("Ar Vro"));
  console.log();

  // Sevel ur galette — Créer une galette
  console.log('🔥 Préchauffage du bilig...');
  console.log(`   Température : ${TEMPERATUR_BILIG}°C`);
  console.log();

  let galette = sevelGalette('Galette Complète', ['jambon', 'fromage', 'œuf']);
  console.log('📍 Galette créée (crue) :');
  diskouezGalette(galette);
  console.log();

  // Kouezhañ — Cuisson
  console.log('🥞 Cuisson premier côté...');
  galette = kouezhan(galette, 8);
  diskouezGalette(galette);
  console.log();

  console.log('🔄 Retournement...');
  console.log('🥞 Cuisson second côté...');
  galette = kouezhan(galette, 12);
  diskouezGalette(galette);
  console.log();

  // Gwiriekaat ar mareoù — Vérifier les marées
  console.log('🌊 Vérification du coefficient de marée...');
  const maree = await gwiriekaatKoefisiant();
  console.log(`   Port : ${maree.port}`);
  console.log(`   Coefficient : ${maree.coefficient}`);
  console.log(`   Stadiad (état) : ${maree.stadiad}`);
  console.log(`   Déploiement autorisé : ${maree.deploiementAutorise ? '✅ Ya !' : '❌ Nann...'}`);
  console.log();

  // Fin
  console.log('🍺 Yec\'hed mat ! La galette est prête !');
  console.log('🏴󠁦󠁲󠁢󠁲󠁥󠁿 Kenavo — Au revoir !\n');
}

// Lañsañ ar programm — Lancer le programme
pennan().catch((fazi) => {
  // fazi = erreur en breton
  console.error('❌ Fazi !', fazi);
  process.exit(1);
});
