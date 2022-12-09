import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
		runGitDiff();
	});
  vscode.commands.registerCommand(
    'git-diff-alert.run',
    () => {
      runGitDiff();
    }
  ); 
}

const runGitDiff = () => {
  const config = vscode.workspace.getConfiguration('gitDiffalert');
  const threshold = config.get<number>('threshold') ?? 100;
  if (!config.get<number>('threshold')){
    vscode.window.showInformationMessage("Threshold is changed to 100.");
  }
  const baseBranch = config.get<"string">('baseBranch') ?? "main";
  if (!config.get<"string">('baseBranch') ){
    vscode.window.showInformationMessage("base branch is changed to main.");
  }
  const execSync = require('child_process').execSync;
  const cmd = `git diff ${baseBranch} --numstat | awk '{ add+=$1; del+=$2 } END { print add+del }'`;
  const result = execSync(cmd).toString().split(',');
  if (!result.length || result.length > 1){
    vscode.window.showErrorMessage("Error occured by running git diff.");
    return;
  }
  const diff = result[0].replace("\n","");
  const parsedDiff = parseInt(diff, 10);
  if (isNaN(parsedDiff)) { 
    vscode.window.showErrorMessage("Error occured by running git diff.");
    return;
  }
  if (Number(diff) > threshold){
    vscode.window.showWarningMessage(`The total of added lines and deleted lines is ${diff}. It is over ${threshold}.`);
  }
};

export function deactivate() {}
