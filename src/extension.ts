// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MessageOptions } from 'vscode';
const got = require('got');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "azure-devops-yaml-pipeline-validator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('azure-devops-yaml-pipeline-validator.validate', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Validating Pipeline');

		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let documentText = document.getText();
			const pat = vscode.workspace.getConfiguration('yamlpipelinesvalidator').get('pat');
			const projectUrl = vscode.workspace.getConfiguration('yamlpipelinesvalidator').get('projecturl');
			const buildDefinitionId = vscode.workspace.getConfiguration('yamlpipelinesvalidator').get('builddefinitionid');
			if(isEmptyOrNull(pat as string) || isEmptyOrNull(projectUrl as string) || isEmptyOrNull(buildDefinitionId as string) ){
				vscode.window.showErrorMessage("One or more configuration settings have not been set");
				return;
			}
			(async () => {
				try {
					await got.post('https://yamlpipelinesvalidator.dev/api/Validation/Validate', {
						json: {
							yaml: documentText,
							pat: pat,
							projectUrl: projectUrl,
							buildDefinitionId: buildDefinitionId

						},
						responseType: 'json'
					});
					vscode.window.showInformationMessage('Valid YAML Pipeline');
				}
				catch (error) {
					let options: MessageOptions = { modal: true};
					vscode.window.showErrorMessage('Invalid YAML Pipeline - ' + error.response.body, options);

				}
			})();

		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function isEmptyOrNull(val: string): boolean {
	return val === null || val === "";
}
