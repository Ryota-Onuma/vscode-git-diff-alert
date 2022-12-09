import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'git-diff-monitor.helloWorld',
    () => {
      vscode.window.showInformationMessage('HogeHoge');
    }
  );

  context.subscriptions.push(disposable);
  const button = vscode.window.createStatusBarItem(
     vscode.StatusBarAlignment.Right, 
     0
   );
   button.command = 'git-diff-monitor.omikuji';
   button.text = 'おみくじを引く';
   context.subscriptions.push(button);
   button.show();
}

export function deactivate() {}
