# vscode git-diff-alert 

This is an extension for Visual Studio Code. This extension runs "git diff {baseBranch} --numstat" when a file is saved, and calculate the total number of added lines and deleted lines. In addition, you can run it manually by executing `GitDiffAlert: run` through your command palette. If the total is over threshold, this extention alerts like below. 

<img src='https://github.com/Ryota-Onuma/vscode-git-diff-alert/raw/main/alert-image.png' />

You can configure some properties in your settings.json to use this extension.

```:json
// settings.json

{
    "gitDiffAlert.threshold": 100 ,// default is 100.
    "gitDiffAlert.baseBranch": "main" // default is main.
}
```