# flet build
URL: https://flet.dev/docs/cli/flet-build

ReferenceCLIflet build
flet build

Build a Flet Python app into a platform-specific executable or installable bundle. It supports building for desktop (macOS, Linux, Windows), web, Android (APK/AAB), and iOS (IPA and simulator .app), with a wide range of customization options for metadata, assets, splash screens, and signing.

Detailed guide with usage examples: https://flet.dev/docs/publish.

Usage​
flet build [-h] [-v] [-o OUTPUT_DIR]

                [--arch TARGET_ARCH [TARGET_ARCH ...]]

                [--exclude EXCLUDE [EXCLUDE ...]] [--clear-cache]

                [--project PROJECT_NAME] [--artifact ARTIFACT_NAME]

                [--description DESCRIPTION] [--product PRODUCT_NAME]

                [--org ORG_NAME] [--bundle-id BUNDLE_ID]

                [--company COMPANY_NAME] [--copyright COPYRIGHT]

                [--android-adaptive-icon-background ANDROID_ADAPTIVE_ICON_BACKGROUND]

                [--splash-color SPLASH_COLOR]

                [--splash-dark-color SPLASH_DARK_COLOR] [--no-web-splash]

                [--no-ios-splash] [--no-android-splash]

                [--ios-team-id IOS_TEAM_ID]

                [--ios-export-method IOS_EXPORT_METHOD]

                [--ios-provisioning-profile IOS_PROVISIONING_PROFILE]

                [--ios-signing-certificate IOS_SIGNING_CERTIFICATE]

                [--base-url BASE_URL] [--web-renderer {auto,canvaskit,skwasm}]

                [--route-url-strategy {path,hash}]

                [--pwa-background-color PWA_BACKGROUND_COLOR]

                [--pwa-theme-color PWA_THEME_COLOR] [--no-wasm] [--no-cdn]

                [--split-per-abi] [--compile-app] [--compile-packages]

                [--cleanup-app]

                [--cleanup-app-files CLEANUP_APP_FILES [CLEANUP_APP_FILES ...]]

                [--cleanup-packages]

                [--cleanup-package-files CLEANUP_PACKAGE_FILES [CLEANUP_PACKAGE_FILES ...]]

                [--flutter-build-args [FLUTTER_BUILD_ARGS ...]]

                [--source-packages SOURCE_PACKAGES [SOURCE_PACKAGES ...]]

                [--info-plist INFO_PLIST [INFO_PLIST ...]]

                [--macos-entitlements MACOS_ENTITLEMENTS [MACOS_ENTITLEMENTS ...]]

                [--android-features ANDROID_FEATURES [ANDROID_FEATURES ...]]

                [--android-permissions ANDROID_PERMISSIONS [ANDROID_PERMISSIONS ...]]

                [--android-meta-data ANDROID_META_DATA [ANDROID_META_DATA ...]]

                [--permissions {location,camera,microphone,photo_library} [{location,camera,microphone,photo_library} ...]]

                [--deep-linking-scheme DEEP_LINKING_SCHEME]

                [--deep-linking-host DEEP_LINKING_HOST]

                [--android-signing-key-store ANDROID_SIGNING_KEY_STORE]

                [--android-signing-key-store-password ANDROID_SIGNING_KEY_STORE_PASSWORD]

                [--android-signing-key-password ANDROID_SIGNING_KEY_PASSWORD]

                [--android-signing-key-alias ANDROID_SIGNING_KEY_ALIAS]

                [--build-number BUILD_NUMBER] [--build-version BUILD_VERSION]

                [--module-name MODULE_NAME] [--template TEMPLATE]

                [--template-dir TEMPLATE_DIR] [--template-ref TEMPLATE_REF]

                [--show-platform-matrix] [--no-rich-output] [--yes]

                [--skip-flutter-doctor]

                {macos,linux,windows,web,apk,aab,ipa,ios-simulator}

                [python_app_path]

Positional arguments​
target_platform​

The target platform or type of package to build.

Possible values: aab, apk, ios-simulator, ipa, linux, macos, web, windows

Required: true

python_app_path​

Path to a directory with a Flet Python program.

Default: .

Options​
--android-adaptive-icon-background​

The color to be used to fill out the background of Android adaptive icons.

--android-features​

The list of <feature_name>=true|false features to add to AndroidManifest.xml (android only); can be used multiple times.

Value: ANDROID_FEATURES+

--android-meta-data​

The list of <name>=<value> app meta-data entries to add to AndroidManifest.xml (android only); can be used multiple times.

Value: ANDROID_META_DATA+

--android-permissions​

The list of <permission_name>=true|false permissions to add to AndroidManifest.xml (android only); can be used multiple times.

Value: ANDROID_PERMISSIONS+

--android-signing-key-alias​

Android signing key alias.

Environment variable: FLET_ANDROID_SIGNING_KEY_ALIAS

--android-signing-key-password​

Android signing key password.

Environment variable: FLET_ANDROID_SIGNING_KEY_PASSWORD

--android-signing-key-store​

Path to an upload keystore .jks file for Android apps.

Environment variable: FLET_ANDROID_SIGNING_KEY_STORE

--android-signing-key-store-password​

Android signing store password.

Environment variable: FLET_ANDROID_SIGNING_KEY_STORE_PASSWORD

--arch​

Build for specific CPU architectures (used in macOS and Android builds only). Example: --arch arm64 x64.

Value: TARGET_ARCH+

--artifact​

Executable or bundle name on disk.

--base-url​

Base URL from which the app is served (web only).

--build-number​

Build number - an identifier used as an internal version number.

Value: BUILD_NUMBER <int>

--build-version​

Build version - a x.y.z string used as the version number shown to users.

--bundle-id​

Bundle ID for the application, e.g. com.mycompany.app-name. It is used as an iOS, Android, macOS and Linux bundle ID.

--cleanup-app​

Remove unnecessary app files upon packaging.

--cleanup-app-files​

The list of globs to delete extra app files and directories.

Value: CLEANUP_APP_FILES+

--cleanup-package-files​

The list of globs to delete extra package files and directories.

Value: CLEANUP_PACKAGE_FILES+

--cleanup-packages​

Remove unnecessary package files upon packaging.

--clear-cache​

Remove any existing build cache before starting the build process.

--company​

Company name to display in about app dialogs.

--compile-app​

Pre-compile app's .py files to .pyc.

--compile-packages​

Pre-compile site packages' .py files to .pyc.

--copyright​

Copyright text to display in about app dialogs.

--deep-linking-host​

Deep linking URL host for iOS and Android builds.

--deep-linking-scheme​

Deep linking URL scheme to configure for iOS and Android builds, i.g. https or myapp.

--description​

Short description of the application.

--exclude​

Files and/or directories to exclude from the package; can be used multiple times.

Value: EXCLUDE+

--flutter-build-args​

Additional arguments for flutter build command.

Value: FLUTTER_BUILD_ARGS*

--help​

Show this help message and exit.

Aliases: -h

--info-plist​

The list of <key>=<value> pairs to add to Info.plist. Values can be booleans, strings, numbers, TOML arrays, or TOML inline tables (macos, ipa and ios-simulator only); can be used multiple times.

Value: INFO_PLIST+

--ios-export-method​

Export method for iOS app bundle (default: debugging).

--ios-provisioning-profile​

Provisioning profile name or UUID that should be used to sign and export iOS app bundle.

--ios-signing-certificate​

Signing certificate name, SHA-1 hash, or automatic selector to use for signing iOS app bundle.

--ios-team-id​

Apple developer team ID for signing iOS app bundle (ipa only).

--macos-entitlements​

The list of <key>=<value> entitlements. Values can be booleans, strings, numbers, TOML arrays, or TOML inline tables (macos only); can be used multiple times.

Value: MACOS_ENTITLEMENTS+

--module-name​

Python module name with an app entry point.

--no-android-splash​

Disable splash screen on Android platform.

--no-cdn​

Disable loading of CanvasKit, Pyodide and fonts from CDN.

Environment variable: FLET_WEB_NO_CDN

--no-ios-splash​

Disable splash screen on iOS platform.

--no-rich-output​

Disable rich output and prefer plain text. Useful on Windows builds.

Environment variable: FLET_CLI_NO_RICH_OUTPUT

--no-wasm​

Disable WASM target for web build (web only).

--no-web-splash​

Disable splash screen on web platform.

--org​

Organization name in reverse domain name notation, e.g. com.mycompany, combined with project name and used in bundle IDs and signing.

--output​

Output directory for the final executable/bundle (default: <python_app_path>/build/<target_platform>).

Aliases: -o

--permissions​

The list of pre-defined cross-platform permissions for iOS, Android and macOS builds.

Possible values: camera, location, microphone, photo_library

--product​

Display name shown in app launchers, window titles, and about dialogs.

--project​

Project name for bundle IDs and identifiers; used as the default for artifact and product names.

--pwa-background-color​

Initial background color for your web app (web only).

--pwa-theme-color​

Default color for your web app's user interface (web only).

--route-url-strategy​

Base URL path to serve the app from. Useful if the app is hosted in a subdirectory (web only).

Possible values: hash, path

Environment variable: FLET_WEB_ROUTE_URL_STRATEGY

--show-platform-matrix​

Display the build platform matrix in a table, then exit.

--skip-flutter-doctor​

Skip running Flutter doctor upon failed builds.

Environment variable: FLET_CLI_SKIP_FLUTTER_DOCTOR

--source-packages​

The list of Python packages to install from source distributions.

Value: SOURCE_PACKAGES+

--splash-color​

Background color of app splash screen on iOS, Android and web.

--splash-dark-color​

Background color in dark mode of app splash screen on iOS, Android and web.

--split-per-abi​

Split the APKs per ABIs (Android only).

--template​

Directory containing Flutter bootstrap template, or a URL to a git repository template.

--template-dir​

Relative path to a Flutter bootstrap template in a repository.

--template-ref​

The branch, tag or commit ID to checkout after cloning the repository with Flutter bootstrap template.

--verbose​

Enable verbose output. Use -v for standard verbose logging and -vv for more detailed output.

Aliases: -v

--web-renderer​

Flutter web renderer to use (web only).

Possible values: auto, canvaskit, skwasm

Environment variable: FLET_WEB_RENDERER

--yes​

Answer yes to all prompts (install dependencies without confirmation).

Edit this page