# flet pack
URL: https://flet.dev/docs/cli/flet-pack

ReferenceCLIflet pack
flet pack

Package a Flet application into a standalone desktop executable or app bundle using PyInstaller.

Usage​
flet pack [-h] [-v] [-i ICON] [-n NAME] [-D] [--distpath DISTPATH]

               [--add-data [ADD_DATA ...]] [--add-binary [ADD_BINARY ...]]

               [--hidden-import [HIDDEN_IMPORT ...]]

               [--product-name PRODUCT_NAME]

               [--file-description FILE_DESCRIPTION]

               [--product-version PRODUCT_VERSION]

               [--file-version FILE_VERSION] [--company-name COMPANY_NAME]

               [--copyright COPYRIGHT] [--codesign-identity CODESIGN_IDENTITY]

               [--bundle-id BUNDLE_ID] [--debug-console DEBUG_CONSOLE]

               [--uac-admin]

               [--pyinstaller-build-args [PYINSTALLER_BUILD_ARGS ...]] [-y]

               script

Positional arguments​
script​

Path to the Python script that launches your Flet app.

Required: true

Options​
--add-binary​

Additional binary files to be added to the executable.Format: source:destination[:platform].

Value: ADD_BINARY*

--add-data​

Add additional non-binary files or folders to the bundle. Accepts one or more arguments in the form source:destination.

Value: ADD_DATA*

--bundle-id​

Bundle identifier used for macOS app packaging.

--codesign-identity​

Code signing identity to sign the app bundle (macOS only).

--company-name​

Company name metadata for the Windows executable.

--copyright​

Copyright string embedded in the executable (Windows) or bundle (macOS).

--debug-console​

Show python debug console window (ensure correct DEBUG level). Useful for troubleshooting runtime errors.

--distpath​

Directory where the packaged app will be placed.

Default: dist

--file-description​

File description to embed in the executable (Windows).

--file-version​

File version for the executable in n.n.n.n format (Windows only).

--help​

Show this help message and exit.

Aliases: -h

--hidden-import​

Add Python modules that are dynamically imported and not detected by static analysis.

Value: HIDDEN_IMPORT*

--icon​

Path to an icon file for your executable or app bundle. Supported formats: .ico (Windows), .png (Linux) and .icns (macOS).

Aliases: -i

--name​

Name for the generated executable (Windows) or app bundle (macOS).

Aliases: -n

--onedir​

Create a one-folder bundle instead of a single-file executable (Windows only).

Aliases: -D

--product-name​

Product name to be embedded in the executable (Windows) or bundle (macOS).

--product-version​

Product version for the executable (Windows) or bundle (macOS).

--pyinstaller-build-args​

Additional raw arguments to the underlying pyinstaller build command.

Value: PYINSTALLER_BUILD_ARGS*

--uac-admin​

Request elevated (admin) permissions on application start (Windows only). Adds a UAC manifest to the executable.

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

--yes​

Enable non-interactive mode. All prompts will be skipped.

Aliases: -y

Edit this page