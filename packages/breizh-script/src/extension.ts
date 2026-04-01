/**
 * 🏴󠁦󠁲󠁢󠁲󠁥󠁿 BREIZH SCRIPT — Extension VS Code Principale
 *
 * Point d'entree de l'extension Breizh Script, la premiere extension
 * VS Code certifiee Produit en Bretagne.
 *
 * Ce module orchestre la transpilation semantique regionale et assure
 * la souverainete numerique de votre codebase.
 *
 * "Nous ne faisons pas du code. Nous faisons de la galette artisanale
 *  avec des ingredients locaux et un compilateur au feu de bois."
 *                                          — Manifeste Breizh Script
 *
 * @module extension
 * @version 2.0.0
 * 🥞🧈⚓🗿
 */

import * as vscode from 'vscode';
import { BreizhTranslator } from './translator';
import { JS_TO_BREIZH, LEXICON_SIZE, AVERAGE_SEL_LEVEL } from './lexicon';

// ============================================================================
//  🥞 Variables globales d'etat souverain
// ============================================================================

/** Instance singleton du moteur de transpilation regionale */
let translator: BreizhTranslator;

/** Indicateur du mode Krampouz (mode crepe turbo) */
let krampouzModeActive = false;

/** Compteur de crepes traduites depuis l'activation */
let crepesCounter = 0;

/** StatusBar item principal 🥞 */
let statusBarItem: vscode.StatusBarItem;

/** StatusBar item du compteur de crepes */
let crepesStatusBar: vscode.StatusBarItem;

// ============================================================================
//  ⚓ ACTIVATION — Degemer mat! (Bienvenue!)
// ============================================================================

/**
 * Fonction d'activation de l'extension.
 *
 * Appelee par VS Code lorsque l'une des conditions d'activation est
 * remplie. Initialise le pipeline de transpilation celtique et
 * enregistre les commandes souveraines.
 *
 * 🏴󠁦󠁲󠁢󠁲󠁥󠁿 Note architecturale: Nous utilisons ici le pattern
 * "Creperie Factory" (variante bretonne du Abstract Factory),
 * qui garantit que chaque instance est garnie correctement.
 */
export function activate(context: vscode.ExtensionContext): void {

  // ── Salutation protocolaire ──────────────────────────────────────
  vscode.window.showInformationMessage(
    'Degemer mat! Breizh Script activated 🏴󠁦󠁲󠁢󠁲󠁥󠁿'
  );

  console.log(
    `[Breizh Script] 🥞 Extension activee avec ${LEXICON_SIZE} termes souverains ` +
    `(niveau de sel moyen: ${AVERAGE_SEL_LEVEL.toFixed(1)}/5)`
  );

  // ── Initialisation du moteur de transpilation regionale ──────────
  const config = vscode.workspace.getConfiguration('breizh-script');
  const dialect = config.get<string>('dialect', 'cornouaillais');
  const beurreType = config.get<string>('beurre', 'sale');

  // 🚨 Verification critique du type de beurre
  if (beurreType === 'doux') {
    vscode.window.showWarningMessage(
      '⚠️ ALERTE BEURRE DOUX DETECTE! Votre configuration est en heresie. ' +
      'Le mode beurre_doux degrade les performances de 73% et introduit ' +
      'des bugs non-sales dans votre code. Kenavo la qualite!'
    );
  }

  translator = new BreizhTranslator({
    dialect,
    biligTemperature: config.get<number>('krampouz.temperature', 220),
    strictSalting: beurreType === 'sale',
  });

  // ── StatusBar: 🥞 Breizh Mode ───────────────────────────────────
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = '🥞 Breizh Mode';
  statusBarItem.tooltip = `Breizh Script v2.0.0 — Dialecte: ${dialect} — Beurre: ${beurreType}`;
  statusBarItem.command = 'breizh-script.krampouz-mode';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // ── StatusBar: Compteur de crepes ────────────────────────────────
  crepesStatusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    99
  );
  updateCrepesCounter();
  crepesStatusBar.show();
  context.subscriptions.push(crepesStatusBar);

  // ── Commande: Traduire en Breizh ────────────────────────────────
  const translateCmd = vscode.commands.registerCommand(
    'breizh-script.translate',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage(
          'Aucun editeur actif. Ouvrez un fichier avant de bretonniser!'
        );
        return;
      }

      const document = editor.document;
      const fullText = document.getText();

      // 🥞 Transpilation semantique regionale en cours...
      const bretonnised = translator.translateToBreizh(fullText);
      crepesCounter += countTranslatedTokens(fullText);
      updateCrepesCounter();

      // Application de la traduction via WorkspaceEdit
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(fullText.length)
      );
      edit.replace(document.uri, fullRange, bretonnised);
      await vscode.workspace.applyEdit(edit);

      vscode.window.showInformationMessage(
        `🥞 Traduction terminee! ${crepesCounter} crepes produites au total.`
      );
    }
  );
  context.subscriptions.push(translateCmd);

  // ── Commande: Mode Krampouz 🥞 ──────────────────────────────────
  //
  // Le mode Krampouz active la traduction en temps reel a chaque
  // frappe. Comme une bilig qui tourne sans arret.
  //
  const krampouzCmd = vscode.commands.registerCommand(
    'breizh-script.krampouz-mode',
    () => {
      krampouzModeActive = !krampouzModeActive;

      if (krampouzModeActive) {
        statusBarItem.text = '🥞🔥 KRAMPOUZ MODE';
        statusBarItem.backgroundColor = new vscode.ThemeColor(
          'statusBarItem.warningBackground'
        );
        vscode.window.showInformationMessage(
          '🔥 MODE KRAMPOUZ ACTIVE! La bilig est chaude, la transpilation est en temps reel. ' +
          'Attention: la temperature de votre CPU peut monter jusqu\'a 220°C.'
        );
      } else {
        statusBarItem.text = '🥞 Breizh Mode';
        statusBarItem.backgroundColor = undefined;
        vscode.window.showInformationMessage(
          '🥞 Mode Krampouz desactive. La bilig refroidit.'
        );
      }
    }
  );
  context.subscriptions.push(krampouzCmd);

  // ── Commande: Revert (pour les traitres) ────────────────────────
  const revertCmd = vscode.commands.registerCommand(
    'breizh-script.revert',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) { return; }

      const proceed = await vscode.window.showWarningMessage(
        '⚠️ Etes-vous sur de vouloir revenir au JavaScript standard? ' +
        'Cette action est consideree comme une trahison par le Conseil Regional.',
        'Oui, je trahis',
        'Non, Breizh atao!'
      );

      if (proceed === 'Oui, je trahis') {
        const document = editor.document;
        const fullText = document.getText();
        const reverted = translator.translateFromBreizh(fullText);

        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(fullText.length)
        );
        edit.replace(document.uri, fullRange, reverted);
        await vscode.workspace.applyEdit(edit);

        vscode.window.showInformationMessage(
          '😢 Code de-bretonnise. Le Conseil Regional a ete notifie.'
        );
      } else {
        vscode.window.showInformationMessage(
          '🏴󠁦󠁲󠁢󠁲󠁥󠁿 Breizh atao! Excellent choix, compatriote.'
        );
      }
    }
  );
  context.subscriptions.push(revertCmd);

  // ── DocumentFormattingProvider: Bretonnisation au formatage ──────
  //
  // 🧈 Quand l'utilisateur formate son document (Shift+Alt+F),
  // on en profite pour bretonniser discretement son code.
  // C'est ce qu'on appelle le "Salage Automatique".
  //
  const formattingProvider = vscode.languages.registerDocumentFormattingEditProvider(
    ['javascript', 'typescript', 'breizh'],
    {
      provideDocumentFormattingEdits(
        document: vscode.TextDocument
      ): vscode.TextEdit[] {
        if (!krampouzModeActive) {
          return [];
        }

        const fullText = document.getText();
        const bretonnised = translator.translateToBreizh(fullText);
        crepesCounter += countTranslatedTokens(fullText);
        updateCrepesCounter();

        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(fullText.length)
        );

        return [vscode.TextEdit.replace(fullRange, bretonnised)];
      },
    }
  );
  context.subscriptions.push(formattingProvider);

  // ── Listener: Avertissement beurre doux a chaque sauvegarde ─────
  const saveListener = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (beurreType === 'doux') {
      vscode.window.showWarningMessage(
        `🧈 Rappel: votre fichier "${doc.fileName}" a ete sauvegarde ` +
        'avec du beurre doux. La qualite du code ne peut etre garantie.'
      );
    }
  });
  context.subscriptions.push(saveListener);

  // ── Fin de l'activation ──────────────────────────────────────────
  console.log(
    `[Breizh Script] ⚓ Toutes les commandes sont enregistrees. ` +
    `Dialecte: ${dialect}. Bilig chauffee a ${config.get('krampouz.temperature', 220)}°C. ` +
    `Kenavo les bugs!`
  );
}

// ============================================================================
//  🏴󠁦󠁲󠁢󠁲󠁥󠁿 DEACTIVATION — Kenavo! (Au revoir!)
// ============================================================================

/**
 * Fonction de desactivation de l'extension.
 * Appelee quand VS Code se ferme ou que l'extension est desactivee.
 * On nettoie la bilig et on range les ustensiles.
 */
export function deactivate(): void {
  console.log(
    `[Breizh Script] 👋 Kenavo! ${crepesCounter} crepes ont ete produites ` +
    'durant cette session. A wech\'all!'
  );
}

// ============================================================================
//  🛠️ Fonctions utilitaires internes
// ============================================================================

/**
 * Met a jour l'affichage du compteur de crepes dans la status bar.
 * Chaque token traduit = une crepe produite. C'est la metrique KPI
 * officielle du Breizh Script.
 */
function updateCrepesCounter(): void {
  crepesStatusBar.text = `🥞 ${crepesCounter} crepes`;
  crepesStatusBar.tooltip = `${crepesCounter} tokens traduits (crepes artisanales)`;
}

/**
 * Compte le nombre de tokens JS presents dans le texte qui seront
 * traduits en Breizh Script.
 *
 * @param text - Le code source a analyser
 * @returns Le nombre de tokens reconnus (= crepes potentielles)
 */
function countTranslatedTokens(text: string): number {
  let count = 0;
  for (const [jsKeyword] of JS_TO_BREIZH) {
    const regex = new RegExp(`\\b${escapeRegex(jsKeyword)}\\b`, 'g');
    const matches = text.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

/**
 * Echappe les caracteres speciaux pour une utilisation dans une RegExp.
 * Fonction standard, mais ici elle sent le beurre sale. 🧈
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
