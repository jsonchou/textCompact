"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var os = require('os');
var vscode = require('vscode');
//var window = vscode.window;
var commands = vscode.commands;

console.log(1111);

//unit event
var _unitEvt = function() {
    var config = vscode.workspace.getConfiguration('textCompact');
    var editor = vscode.editor || vscode.window.activeTextEditor;
    var doc = editor.document;
    if (!editor) {
        return;
    }

    if (!doc || doc.languageId !== 'txt') {
        return;
    }

    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
    var range = new vscode.Range(start, end);
    var content = doc.getText(range);

    console.log(config);

    var res = content
        .replace(/(\r\n)/g, ' ')
        .replace(/(\n)/g, ' ')
        .replace(/(\r)/g, ' ')
        .replace(/\s+/g, ' ')

    //使用|分割所有
    .replace(/ /g, '|')

    //包裹每一块
    .replace(/\|/g, config.WordSuffix + config.WordPrefix);

    // suffix prefix
    res = config.StreamPrefix + res + config.StreamSuffix

    if (res) {

        editor.edit(function(edit) {
            edit.replace(range, res);
        });

    }

    // Display a message box to the user
    //window.showInformationMessage('Hello World!');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "text-compact" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    context.subscriptions.push(commands.registerCommand('extension.textCompact', function() {
        // The code you place here will be executed every time your command is executed
        _unitEvt();

    }));

}

// this method is called when your extension is deactivated
function deactivate() {}

exports.activate = activate;

exports.deactivate = deactivate;