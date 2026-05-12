# flet create
URL: https://flet.dev/docs/cli/flet-create

ReferenceCLIflet create
flet create

Create a new Flet project using a predefined template. It sets up the initial directory structure, metadata, and required files to help you get started quickly.

Usage​
flet create [-h] [-v] [--project-name PROJECT_NAME]

                 [--description DESCRIPTION] [--template {app,extension}]

                 [--template-ref TEMPLATE_REF]

                 [output_directory]

Positional arguments​
output_directory​

Directory where the new Flet project will be created. If omitted, the project is created in the current directory.

Default: .

Options​
--description​

Short description of the new Flet project. This will appear in generated metadata.

--help​

Show this help message and exit.

Aliases: -h

--project-name​

Name of the new Flet project. This will be used in metadata files such as pyproject.toml.

--template​

The template to use (or type of project to create) for new Flet project.

Possible values: app, extension

Default: app

--template-ref​

Git reference (branch, tag, or commit ID) of the Flet template repository (flet-dev/flet-app-templates) to use. Useful when using a custom or development version of templates.

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

Edit this page