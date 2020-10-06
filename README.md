# Azure Pipelines YAML Validator

This extension allows you to validate your Azure DevOps YAML pipelines without commiting them from within VS Code.

## Usage

From within a YAML file open the Command Palette (Ctrl+Shift+P) and select the 'Azure Pipelines YAML Validator: Validate' command, alternatively use the keyboard shortcuts Ctrl+Alt+V on Windows and Ctrl+Cmd+V on Mac. Your YAML file will then be validated and any problems reported.

![](images/Command.png)

## Requirements

None

## Known Issues

None

## Releases

### 1.5.2
Fixed issue with missing packages causing command not to work

### 1.5.0
Added the following vscode settings, these allow validation to be ran against a user defined pipeline. This should enable validation of pipelines with variable groups or 3rd party  (PAT that has 'Read & Execute' Build permissions).

```
yamlpipelinesvalidator.builddefinitionid
yamlpipelinesvalidator.pat
yamlpipelinesvalidator.projecturl
```

### 1.1.1

Added keyboard shortcuts (ctrl+alt+v Windows, ctrl+cmd+v Mac)

### 1.0.0

Initial release of Azure Azure Pipelines YAML Validator
