# flet publish
URL: https://flet.dev/docs/cli/flet-publish

ReferenceCLIflet publish
flet publish

Compile and package a Flet app as a standalone static web application.

Usage​
flet publish [-h] [-v] [--pre] [-a ASSETS_DIR] [--distpath DISTPATH]

                  [--app-name APP_NAME] [--app-short-name APP_SHORT_NAME]

                  [--app-description APP_DESCRIPTION] [--base-url BASE_URL]

                  [--web-renderer {auto,canvaskit,skwasm}]

                  [--route-url-strategy {path,hash}]

                  [--pwa-background-color PWA_BACKGROUND_COLOR]

                  [--pwa-theme-color PWA_THEME_COLOR] [--no-cdn]

                  [script]

Positional arguments​
script​

Path to the Python script that starts your Flet app.

Default: .

Options​
--app-description​

Short description of the application. Used in PWA manifests and metadata.

--app-name​

Full name of the application. This is used in PWA metadata and may appear in the install prompt.

--app-short-name​

A shorter version of the application name, often used in homescreen icons or install prompts.

--assets​

Path to a directory containing static assets used by the app (e.g., images, fonts, icons).

Environment variable: FLET_ASSETS_DIR

Aliases: -a

--base-url​

Base URL path to serve the app from. Useful if the app is hosted in a subdirectory.

--distpath​

Directory where the published web app should be placed.

Default: dist

--help​

Show this help message and exit.

Aliases: -h

--no-cdn​

Disable loading of CanvasKit, Pyodide, and fonts from CDNs. Use this for full offline deployments or air-gapped environments.

--pre​

Allow micropip to install pre-release Python packages. Use this if your app depends on a prerelease version of a package.

--pwa-background-color​

Initial background color of your web app during the loading phase (used in splash screens).

--pwa-theme-color​

Default color of the browser UI (e.g., address bar) when your app is installed as a PWA.

--route-url-strategy​

Controls how routes are handled in the browser.

Possible values: hash, path

Default: path

Environment variable: FLET_WEB_ROUTE_URL_STRATEGY

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

--web-renderer​

Flutter web renderer to use.

Possible values: auto, canvaskit, skwasm

Default: auto

Environment variable: FLET_WEB_RENDERER

Edit this page