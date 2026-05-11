# Publishing Flet app (Overview)
URL: https://flet.dev/docs/publish/

Publishing Flet app
Publishing a Flet app

Flet CLI provides the flet build command to package a Flet app into a standalone executable or installable package for distribution.

Prerequisites​
Platform matrix​

Use the following matrix to determine on which OS flet build can be run in order to target each platform:

Run on	apk/aab	ipa/ios-simulator	macos	linux	windows	web
macOS	✅	✅	✅			✅
Windows	✅			✅ (WSL)	✅	✅
Linux	✅			✅		✅
Flutter SDK​

Flutter is required to build Flet apps for any platform.

If the minimum required version of the Flutter SDK is not already available in the system PATH, it will be automatically downloaded and installed (in the $HOME/flutter/{version} directory) during the first build process.

TIP

The recommended (minimum required) Flutter SDK version depends on the Flet version installed or in use.

It can be viewed by running one of the following commands:

flet --version

uv run python -c "import flet.version; print(flet.version.flutter_version)"


or the below Python code snippet:

import flet.version

print(flet.version.flutter_version)

Project structure​

The flet build command assumes the following minimal Flet project structure:

README.md

pyproject.toml

src

    assets

        icon.png

    main.py

TIP

To quickly set up a project with the correct structure, use the flet create command:

flet create <project-name>


Where <project-name> is the name for your project directory.

USING requirements.txt INSTEAD OF pyproject.toml

Instead of a pyproject.toml file, you can also use a requirements.txt file to specify dependencies.

In this case, two things to keep in mind:

if both files are present, flet build will ignore requirements.txt.
don't use pip freeze > requirements.txt to generate this file or fill it with dependencies, as it may include packages incompatible with the target platform. Instead, hand-pick and include only the direct dependencies required by your app, including flet.
How it works​

When you run flet build <target_platform>, the pipeline is:

Create a Flutter project in {flet_app_directory}/build/flutter from the template. The Flutter app embeds your packaged Python app in its assets and uses flet and serious_python to run the app and render the UI. The project is cached and reused across builds for rapid iterations; use --clear-cache to force a rebuild.
Copy custom icons and splash images from assets into the Flutter project, then generate:
Icons for all platforms via flutter_launcher_icons.
Splash screens for web, iOS, and Android via flutter_native_splash.
Package the Python app using serious_python package:
Install app dependencies from pypi.org and pypi.flet.dev for the selected platform, as configured in App dependencies and Source packages.
If configured, compile .py files to .pyc.
Add all project files, except those excluded, to the app asset.
Run flutter build to produce the executable or installable package.
Copy build outputs from Step 4 into the output directory.
Configuration options​
PLACEHOLDERS

Throughout this documentation, the following placeholders are used:

<target_platform> - one of: apk, aab, ipa, ios-simulator, web, macos, windows, linux.
<PLATFORM> - the config namespace under [tool.flet.<PLATFORM>]; one of: android (for apk and aab targets), ios (for ipa and ios-simulator targets), web, macos, windows, linux.
<python_app_path> - the path passed to flet build (defaults to the current directory).
<flet_app_directory> - the resolved project root for <python_app_path>; pyproject.toml and requirements.txt are read from here.
<flet_version> - the version of Flet in use. You can check with flet --version or uv run python -c "import flet; print(flet.__version__)".
UNDERSTANDING pyproject.toml STRUCTURE

Flet loads pyproject.toml as a nested dictionary and looks up settings using dot-separated paths (for example, tool.flet.web.base_url).

The two forms below are equivalent and resolve to the same key-value pair:

Form 1 (will be used/preferred throughout this documentation)

[tool.flet.section]

key = "value"


Form 2

[tool.flet]

section.key = "value"


But they are different or should not be confused with the below ("quoted keys" are literals and do not create nesting):

[tool.flet]

"section.key" = "value"

App path​

Defines the root directory of your Python app within <python_app_path>. Flet looks for the entry point, the assets directory, and exclude paths relative to this directory.

Resolution order​

Its value is determined in the following order of precedence:

[tool.flet.app].path
<python_app_path>

path is resolved relative to <python_app_path>.

Example​
pyproject.toml
[tool.flet.app]

path = "src"

Entry point​

This is the Python module that starts your app and contains the call to flet.run() or flet.render(). Flet uses the module stem and looks for <module>.py in your app path.

Resolution order​

Its value is determined in the following order of precedence:

--module-name
[tool.flet.app].module
"main" (entry file main.py)

Its value can either be <module> or <module>.py; both resolve to the same Python module.

Example​
flet build
pyproject.toml
flet build <target_platform> --module-name app.py

Project name​

The project name is the base identifier for bundle IDs and other internal names. The source value is normalized to a safe identifier: lowercased, punctuation and spaces removed or collapsed, and hyphens converted to underscores (for example, My App or my-app becomes my_app).

Resolution order​

Its value is determined in the following order of precedence:

--project
[project].name
project/app directory name
Example​
flet build
pyproject.toml
flet build <target_platform> --project my_app

Product name​

The display (user-facing) name shown in window titles, launcher labels, and about dialogs.

It does not control the on-disk executable or bundle name. Use the artifact name for artifact naming.

Resolution order​

Its value is determined in the following order of precedence:

--product
[tool.flet].product
--project
[project].name
project/app directory name
Example​
flet build
pyproject.toml
flet build <target_platform> --product "My Awesome App"

Artifact name​

The on-disk name for executables and/or app bundles. For example, on Windows it determines the name of the .exe file, and on macOS it sets the name of the .app bundle.

It does not affect bundle IDs or package identifiers.

It can contain spaces or accents, but keep file system restrictions in mind on your target platforms.

Resolution order​

Its value is determined in the following order of precedence:

--artifact
[tool.flet.<PLATFORM>].artifact
--project
[project].name
project/app directory name
Example​
flet build
pyproject.toml
flet build <target_platform> --artifact "My Awesome App"

Organization name​
PLATFORM SUPPORT

Android, iOS, macOS, and Linux only.

The organization name in reverse domain name notation, typically in the form com.mycompany. It is used as the prefix for the bundle ID and for package identifiers on mobile and desktop targets.

Resolution order​

Its value is determined in the following order of precedence:

--org
[tool.flet.<PLATFORM>].org
[tool.flet].org
"com.flet"
Example​
flet build
pyproject.toml
flet build <target_platform> --org com.mycompany

Bundle ID​
PLATFORM SUPPORT

Android, iOS, macOS, and Linux only.

The bundle ID for the application, typically in the form "com.mycompany.my_app".

If not explicitly specified, it is derived from the organization name and the project name used by the build template.

Resolution order​

Its value is determined in the following order of precedence:

--bundle-id
[tool.flet.<PLATFORM>].bundle_id
[tool.flet].bundle_id
Example​
flet build
pyproject.toml
flet build <target_platform> --bundle-id com.mycompany.my_app

Company Name​
PLATFORM SUPPORT

Windows and macOS only.

The company name displayed in about app dialogs and metadata (notably on desktop builds).

Resolution order​

Its value is determined in the following order of precedence:

--company
[tool.flet].company
Build template default (see Template Source)
Example​
flet build
pyproject.toml
flet build <target_platform> --company "My Company Inc."

Copyright​
PLATFORM SUPPORT

Windows and macOS only.

Copyright text displayed in about app dialogs and metadata.

Resolution order​

Its value is determined in the following order of precedence:

--copyright
[tool.flet].copyright
Build template default (see Template Source)
Example​
flet build
pyproject.toml
flet build <target_platform> --copyright "Copyright © 2026 My Company Inc."

Versioning​
Build Number​

An integer identifier used internally to distinguish one build from another.

Each new build must have a unique, incrementing number; higher numbers indicate more recent builds.

Resolution order​

Its value is determined in the following order of precedence:

--build-number
[tool.flet].build_number
Otherwise, the build number from the generated pubspec.yaml (see Template Source) will be used.
Example​
flet build
pyproject.toml
flet build <target_platform> --build-number 1

Build Version​

A user‑facing version string in x.y.z format. Increment this for each new release to differentiate it from previous versions.

Resolution order​

Its value is determined in the following order of precedence:

--build-version
[project].version
[tool.poetry].version
Otherwise, the build version from the generated pubspec.yaml (see Template Source) will be used.
Example​
flet build
pyproject.toml
flet build <target_platform> --build-version 1.0.0

Output directory​

The directory where the build output is saved. If the directory already exists, it is deleted and recreated on each build.

For web builds, the app's assets directory is copied into the output directory.

Resolution order​

Its value is determined in the following order of precedence:

--output (or -o)
<python_app_path>/build/<target_platform>
Example​
flet build
flet build <target_platform> --output <path-to-output-dir>

App dependencies​

These are the Python packages that your Flet app depends on to function correctly.

Resolution order​

Its value is determined in the following order of precedence:

[tool.poetry].dependencies if present; otherwise [project].dependencies (PEP 621).
If [tool.flet.<PLATFORM>].dependencies is set (where <PLATFORM> corresponds to <target_platform>), its values are appended to the list above.
If the result of all above is empty and requirements.txt exists in <python_app_path>, it is used.
If the result of all the above is empty, flet==<flet_version> is used.

To use a local development version of a dependency during builds, configure [tool.flet].dev_packages or [tool.flet.<PLATFORM>].dev_packages with a package name to path mapping.

If your app uses Flet extensions (third-party packages), list them in your Python dependencies so they are packaged with the app. Examples of extensions can be found in Built-in extensions.

Example​
pyproject.toml
[project]

dependencies = [

    "flet",

    "requests",

    "flet-extension1",

    "flet-extension2 @ git+https://github.com/account/flet-extension2.git",   # git repo

    "flet-extension3 @ file:///path/to/flet-extension3",  # local package

]



[tool.flet.<PLATFORM>]  # will be used/appended only if <PLATFORM> corresponds to <target_platform>

dependencies = [

    "dep1",

    "dep2",

]

Source packages​
PLATFORM SUPPORT

Android, iOS, and Web only.

By default, packaging for mobile and web only installs binary wheels. Use source packages to allow specific dependencies to be installed from source distributions (sdists).

This can be useful for installing - pure Python - dependencies that do not have pre-built wheels for the target platform or an all-platform wheel (*-py3-none-any.whl), but instead provide a source distribution (*.tar.gz).

For more information on pure vs non-pure Python packages, see our blog post on the topic.

On desktop targets, source installs are already allowed, so this setting is mainly useful for Android, iOS, and Web (flet build web only — not flet publish).

Resolution order​

Its value is determined in the following order of precedence:

--source-packages
[tool.flet.<PLATFORM>].source_packages
[tool.flet].source_packages
Example​
flet build
pyproject.toml
flet build <target_platform> --source-packages package1 package2

Icons​
PLATFORM SUPPORT

Android, iOS, macOS, Windows and Web only.

You can customize app icons for all platforms (except Linux) using image files placed in the assets directory of your Flet app.

If a platform-specific icon (as in the table below) is not provided, icon.png (or any supported format like .bmp, .jpg, or .webp) will be used as fallback. For the iOS platform, transparency (alpha channel) will be automatically removed, if present.

Platform	File Name	Recommended Size	Notes
iOS	icon_ios.png	≥ 1024×1024 px	Transparency (alpha channel) is not supported and will be automatically removed if present.
Android	icon_android.png	≥ 192×192 px	
Web	icon_web.png	≥ 512×512 px	
Windows	icon_windows.ico or icon_windows.png	256×256 px	.png file will be internally converted to a 256×256 px .ico icon.
macOS	icon_macos.png	≥ 1024×1024 px	
Splash screen​
PLATFORM SUPPORT

Android, iOS, and Web only.

A splash screen is a visual element displayed when an app is launching, typically showing a logo or image while the app loads.

You can customize splash screens for iOS, Android, and Web platforms by placing image files in the assets directory of your Flet app.

If platform-specific splash images are not provided, Flet will fall back to splash.png. If that is also missing, it will use icon.png or any supported format such as .bmp, .jpg, or .webp.

Splash images​
Platform	Dark Fallback Order	Light Fallback Order
iOS	splash_dark_ios.png → splash_dark.png → splash_ios.png → splash.png → icon.png	splash_ios.png → splash.png → icon.png
Android	splash_dark_android.png → splash_dark.png → splash_android.png → splash.png → icon.png	splash_android.png → splash.png → icon.png
Web	splash_dark_web.png → splash_dark.png → splash_web.png → splash.png → icon.png	splash_web.png → splash.png → icon.png
Splash Background Colors​

You can customize splash background colors using the following options:

Splash Color: Background color for light mode splash screens.
Splash Dark Color: Background color for dark mode splash screens.
Resolution order​

Their values are respectively determined in the following order of precedence:

--splash-color / --splash-dark-color
[tool.flet.<PLATFORM>.splash].color / [tool.flet.<PLATFORM>.splash].dark_color
[tool.flet.splash].color / [tool.flet.splash].dark_color
Build template defaults
Example​
flet build
pyproject.toml
flet build <target_platform> --splash-color #ffffff --splash-dark-color #333333

Disabling Splash Screens​

Splash screens are enabled by default but can be disabled.

Resolution order​

Its value is determined in the following order of precedence:

on Android:
--no-android-splash
[tool.flet.splash].android
on iOS:
--no-ios-splash
[tool.flet.splash].ios
on Web:
--no-web-splash
[tool.flet.splash].web
Example​
flet build
pyproject.toml
flet build apk --no-android-splash

flet build ipa --no-ios-splash

flet build ios-simulator --no-ios-splash

flet build web --no-web-splash

Boot screen​
PLATFORM SUPPORT

Windows, macOS, Linux, Android, and iOS only.

The boot screen is shown while the packaged app archive (app.zip) is extracted to the app data directory (typically on first launch or after the app bundle changes). It appears after the splash screen and before the startup screen.

It is not shown by default. Enable it, for example, when then extraction time is noticeable.

Example​
pyproject.toml
[tool.flet.app.boot_screen]     # or [tool.flet.<PLATFORM>.app.boot_screen]

show = true

message = "Preparing the app for its first launch…"

Startup screen​
PLATFORM SUPPORT

Windows, macOS, Linux, Android, and iOS only.

The startup screen is shown while the Python runtime and your app are starting. On mobile targets this can include preparing packaged dependencies. It appears after the boot screen.

It is not shown by default.

Example​
pyproject.toml
[tool.flet.app.startup_screen]      # or [tool.flet.<PLATFORM>.app.startup_screen]

show = true

message = "Starting up the app…"

Hidden app window on startup​
PLATFORM SUPPORT

Windows, macOS, and Linux only.

A Flet desktop app (Windows, macOS, or Linux) can start with its window hidden. This lets your app perform initial setup (for example, add content, resize or position the window) before showing it to the user.

See this code example.

Resolution order​

Its value is determined in the following order of precedence:

[tool.flet.<PLATFORM>.app].hide_window_on_start, where <PLATFORM> can be windows, macos or linux
[tool.flet.app].hide_window_on_start
FLET_HIDE_WINDOW_ON_START
Example​
pyproject.toml
[tool.flet.app]    # or [tool.flet.<PLATFORM>.app]

hide_window_on_start = true

Deep linking​
PLATFORM SUPPORT

Android and iOS only.

Deep linking allows users to navigate directly to specific content within a mobile app using a URI (Uniform Resource Identifier). Instead of opening the app's homepage, deep links direct users to a specific page, feature, or content within the app, enhancing user experience and engagement.

Scheme: deep linking URL scheme, e.g. "https" or "myapp".
Host: deep linking URL host.

See also:

Flutter deep linking
Android intents and intent filters
Defining a custom URL scheme for your app
Universal Links
Resolution order​

Its value is determined in the following order of precedence:

--deep-linking-scheme and --deep-linking-host (only when both are provided)
[tool.flet.<PLATFORM>.deep_linking].scheme / [tool.flet.<PLATFORM>.deep_linking].host, where <PLATFORM> can be android or ios
[tool.flet.deep_linking].scheme / [tool.flet.deep_linking].host

Both scheme and host are required; if either is missing, the deep-linking entries are not added.

Example​
flet build
pyproject.toml
flet build <target_platform> \

  --deep-linking-scheme "https" \

  --deep-linking-host "mydomain.com"

Template translation
Target Architecture​
PLATFORM SUPPORT

Android and macOS only.

A target platform can have different CPU architectures, which in turn support different instruction sets.

It is possible to build your app for specific CPU architectures. This is useful for reducing the size of the resulting binary or package, or for targeting specific devices.

For more/complementary information, see the specific platform guides: Android, macOS.

Resolution order​

Its value is determined in the following order of precedence:

--arch
[tool.flet.<PLATFORM>].target_arch, where <PLATFORM> can be android or macos
[tool.flet].target_arch
Platform defaults for the <target_platform>
Example​
flet build
pyproject.toml
flet build macos --arch arm64 x86_64

Excluding files and directories​

Files and/or directories can be excluded from the build process. This can be useful for reducing the size of the resulting binary or package.

Resolution order​

Its value is determined in the following order of precedence:

--exclude (can be used multiple times)
[tool.flet.<PLATFORM>.app].exclude (type: list of strings)
[tool.flet.app].exclude (type: list of strings)

The files and/or directories specified should be provided as relative paths to the app path directory. Paths are matched exactly (no globs), and directories are excluded recursively.

By default, the build directory is always excluded. Additionally, when the target_platform is web, the assets directory is always excluded.

Example​
flet build
pyproject.toml
flet build <target_platform> --exclude .git .venv

Compilation and cleanup​

Flet can compile your app's .py files and/or installed packages' .py files into .pyc files during the packaging process (via python -m compileall -b). Cleanup removes known junk files and any additional globs you specify.

Compilation:

compile-app: compile app's .py files
compile-packages: compile site/installed packages' .py files

Cleanup:

cleanup-app: remove junk files from the app directory
cleanup-app-files: additional globs to delete from the app directory (implies cleanup-app)
cleanup-package-files: additional globs to delete from site-packages (implies cleanup-packages)
cleanup-packages: remove junk files from site-packages (defaults to true)

By default, Flet does not compile your app files during packaging. This allows the build process to complete even if there are syntax errors, which can be useful for debugging or rapid iteration.

Resolution order​

The values of compile-app and cleanup-app are respectively determined in the following order of precedence:

--compile-app / --cleanup-app
[tool.flet.<PLATFORM>.compile].app / [tool.flet.<PLATFORM>.cleanup].app
[tool.flet.compile].app / [tool.flet.cleanup].app
empty list / empty list

The values of compile-packages and cleanup-packages are respectively determined in the following order of precedence:

--compile-packages / --cleanup-packages
[tool.flet.<PLATFORM>.compile].packages / [tool.flet.<PLATFORM>.cleanup].packages
[tool.flet.compile].packages / [tool.flet.cleanup].packages
False / True

The values of cleanup-app-files and cleanup-package-files are respectively determined in the following order of precedence:

--cleanup-app-files / --cleanup-package-files
[tool.flet.<PLATFORM>.cleanup].app_files / [tool.flet.<PLATFORM>.cleanup].package_files
[tool.flet.cleanup].app_files / [tool.flet.cleanup].package_files
False / False
Example​
flet build
pyproject.toml
flet build <target_platform> \

  --compile-app --compile-packages \

  --cleanup-app-files "**/*.c" "**/*.h" --cleanup-package-files "**/*.pyi"

Permissions​
PLATFORM SUPPORT

Android, iOS, and macOS only.

flet build allows granular control over permissions, features, and entitlements embedded into AndroidManifest.xml, Info.plist and .entitlements files.

See platform guides for setting specific iOS, Android and macOS permissions.

Predefined cross-platform permission bundles​

Cross-platform permissions are named and predefined bundles that apply a baseline set of platform-specific entries required for a feature. Each bundle expands into the corresponding platform-specific equivalents. This is especially useful for beginners who may be unfamiliar with the underlying platform APIs or prefer not to interact with them directly.

Only the bundles you list are applied. If you need different wording or extra entries, set the platform-specific tables directly; those values are merged on top and can override the bundle defaults. The examples below show the exact pyproject.toml equivalents for each bundle.

Below is a list of available bundles:

location

pyproject.toml equivalent

camera

pyproject.toml equivalent

microphone

pyproject.toml equivalent

photo_library

pyproject.toml equivalent
Resolution order​

Its value is determined in the following order of precedence:

--permissions
[tool.flet].permissions (type: list of strings)
[]
Example​
flet build
pyproject.toml
flet build <target_platform> --permissions location microphone

Build template​

flet build creates (and reuses) a Flutter project under <app_root>/build/flutter using a cookiecutter template. By default, the template is downloaded as a zip artifact from the matching Flet GitHub Release. The version of the template used is determined by the installed Flet version.

The cached project is refreshed when template inputs change or when you pass --clear-cache.

Template Source​

Defines the location of the cookiecutter build-template to be used.

Supported values include:

A GitHub repository using the gh: prefix (e.g., gh:org/template)
A full Git URL (e.g., https://github.com/org/template.git)
A zip URL (e.g., https://github.com/flet-dev/flet/releases/download/v0.83.0/flet-build-template.zip)
A local directory path
Resolution order​

Its value is determined in the following order of precedence:

--template
[tool.flet.template].url
The default zip URL from the Flet GitHub Release matching the installed version
Example​
flet build
pyproject.toml
flet build apk --template gh:my-org/my-custom-template

Template Reference​

Defines the branch, tag, or commit to check out from the template source.

Resolution order​

Its value is determined in the following order of precedence:

--template-ref
[tool.flet.template].ref
<flet_version>
Example​
flet build
pyproject.toml
flet build <target_platform> --template-ref main

Template Directory​

Defines the relative path to the cookiecutter template. If template source is set, the path is treated as a subdirectory within its root; otherwise, it is relative to the template root.

Resolution order​

Its value is determined in the following order of precedence:

--template-dir
[tool.flet.template].dir
root of the template source
Example​
flet build
pyproject.toml
flet build <target_platform> --template gh:org/template --template-dir sub/directory

Additional flutter build Arguments​

During the flet build process, flutter build command gets called internally to package your app for the specified platform. However, not all flutter build arguments are exposed or usable through the flet build command directly.

For possible flutter build arguments, see Flutter docs guide. For most targets, run flutter build <target_platform> --help; for ios-simulator, run flutter build ios --simulator --help.

IMPORTANT

Passing additional flutter build arguments might cause unexpected behavior. Use at your own risk, and only if you fully know what you're doing!

Resolution order​

Its value is determined in the following order of precedence:

--flutter-build-args (can be used multiple times)
[tool.flet.<PLATFORM>.flutter].build_args
[tool.flet.flutter].build_args
Example​
flet build
pyproject.toml
flet build apk \

  --flutter-build-args=--obfuscate \

  --flutter-build-args=--export-method=development \

  --flutter-build-args=--dart-define=API_URL=https://api.example.com

Flutter dependencies​

When you run flet build, Flet generates a Flutter shell project and then updates its pubspec.yaml using values from pyproject.toml.

Use:

[tool.flet.flutter.pubspec.dependencies] for normal package declarations. (Dart docs)
[tool.flet.flutter.pubspec.dependency_overrides] when you must force a version or source, for example, a local path or Git fork. (Dart docs)

Values follow standard Pub dependency syntax, expressed in TOML.

NOTE
Important: In most cases, you usually do not need to add/override Flutter dependencies. We recommend doing it only if you fully know what you are doing, as it can lead to unexpected behavior.
If the same package appears in both pyproject.toml and the resulting pubspec.yaml, the value from pyproject.toml wins.
If you use { path = "..." } under [tool.flet.flutter.pubspec.dependencies] or [tool.flet.flutter.pubspec.dependency_overrides], that path is resolved by Flutter from the generated pubspec.yaml location: <flet_app_directory>/build/flutter/pubspec.yaml. This means relative paths are not resolved from your pyproject.toml file.
Example​
pyproject.toml
[tool.flet.flutter.pubspec.dependencies]    # or [tool.flet.flutter.pubspec.dependency_overrides]

# Version

pkg_1 = "^1.2.3"



# Local path

pkg_2 = { path = "../pkg_2" }



# Git (short form)

pkg_3 = { git = "https://github.com/org/pkg_3.git" }



# Git (expanded form: URL + ref + subdirectory)

pkg_4 = { git = { url = "https://github.com/org/mono_repo.git", ref = "main", path = "packages/pkg_4" } }



# Hosted source

pkg_5 = { hosted = { name = "pkg_5", url = "https://pub.dev" }, version = "^1.0.0" }



# SDK package (dependencies only; typically not used in dependency_overrides)

flutter_test = { sdk = "flutter" }

Verbose logging​

The -v (or --verbose) and -vv flags enable detailed output from all commands during the flet build process.

Use -v for standard/basic verbose logging, or -vv for even more detailed output (higher verbosity level). If you need support, we may ask you to share this verbose log.

Console output​

In packaged apps (flet build output), all output from your Python code such as print() statements, sys.stdout.write() calls, and messages from the Python logging module is redirected to a console.log file. The full path to this file is available via StoragePaths.get_console_log_filename() or the FLET_APP_CONSOLE environment variable.

Note: FLET_APP_CONSOLE is only set in production builds; in development runs, output stays in your terminal.

The log file is written in an unbuffered manner, allowing you to read it at any point in your Python program using:

import os

import flet as ft



async def main(page: ft.Page):

    log_file = await ft.StoragePaths().get_console_log_filename()

    # or

    # log_file = os.getenv("FLET_APP_CONSOLE")



    with open(log_file, "r") as f:

        logs = f.read()

        page.add(ft.Text(logs)) # display on UI



ft.run(main)


If your program calls sys.exit(100), the complete log will automatically be shown in a scrollable window. This is a special "magic" exit code for debugging purposes:

import sys

sys.exit(100)


Calling sys.exit() with any other code will terminate the app without displaying the log.

Continuous Integration/Continuous Deployment (CI/CD)​

You can use flet build command in your CI/CD pipelines to automate the build and release process of your Flet apps.

GitHub Actions​

You can use GitHub Actions to build your Flet app automatically on every push, pull request, or manual run.

name: Build Flet App



on:

  push:

  pull_request:

  workflow_dispatch:



env:

  UV_PYTHON: 3.12

  PYTHONUTF8: 1



  # https://flet.dev/docs/reference/environment-variables

  FLET_CLI_NO_RICH_OUTPUT: 1



jobs:

  build:

    name: Build ${{ matrix.name }}

    runs-on: ${{ matrix.runner }}

    strategy:

      fail-fast: false

      matrix:

        include:

          # -------- Desktop --------

          - name: linux

            runner: ubuntu-latest

            build_cmd: "flet build linux"

            artifact_path: build/linux

            needs_linux_deps: true



          - name: macos

            runner: macos-26

            build_cmd: "flet build macos"

            artifact_path: build/macos

            needs_linux_deps: false



          - name: windows

            runner: windows-latest

            build_cmd: "flet build windows"

            artifact_path: build/windows

            needs_linux_deps: false



          # -------- Android --------

          - name: aab

            runner: ubuntu-latest

            build_cmd: "flet build aab"

            artifact_path: build/aab

            needs_linux_deps: false



          - name: apk

            runner: ubuntu-latest

            build_cmd: "flet build apk"

            artifact_path: build/apk

            needs_linux_deps: false



          # -------- iOS --------

          - name: ipa

            runner: macos-26

            build_cmd: "flet build ipa"

            artifact_path: build/ipa

            needs_linux_deps: false



          - name: ios-simulator

            runner: macos-26

            build_cmd: "flet build ios-simulator"

            artifact_path: build/ios-simulator

            needs_linux_deps: false



          # -------- Web --------

          - name: web

            runner: ubuntu-latest

            build_cmd: "flet build web"

            artifact_path: build/web

            needs_linux_deps: false



    steps:

      - name: Checkout repository

        uses: actions/checkout@v4



      - name: Setup uv

        uses: astral-sh/setup-uv@v6



      - name: Install Linux dependencies

        if: matrix.needs_linux_deps

        shell: bash

        run: |

            sudo apt update --allow-releaseinfo-change

            LINUX_DEPS="$(uv run python -c 'from flet.utils.linux_deps import linux_dependencies; print(" ".join(linux_dependencies))')"

            sudo apt-get install -y --no-install-recommends $LINUX_DEPS

            sudo apt-get clean



      - name: Build app

        shell: bash

        run: |

          uv run ${{ matrix.build_cmd }} --yes --verbose



      - name: Upload Artifact

        uses: actions/upload-artifact@v5.0.0

        with:

          name: ${{ matrix.name }}-build-artifact

          path: ${{ matrix.artifact_path }}

          if-no-files-found: error

          overwrite: false


The workflow file above builds for all major targets and uploads each build output as an artifact. You can further customize the workflow for your specific needs, for example, restricting the build targets or adding additional steps.

See it in action here.

Troubleshooting​
Prerelease compatibility​

If you are using a prerelease version of the Flet Python package (for example, 0.80.6.devNNNN) to build an app, the build template may still resolve the latest stable flet Flutter package, which can lead to version incompatibility issues.

Why?: Under normal circumstances, each prerelease of the Flet Python package would require a matching prerelease of the Flutter Flet package to guarantee compatibility. However, we don't publish prerelease versions of the Flutter package to pub.dev. Because of this, the build template resolves the latest stable Flutter flet release instead.

This creates a version mismatch/incompatibility for apps packaged with flet build:

Your Python code may depend on newly introduced controls or features.
The packaged Flutter shell may still be using an older stable flet version.
At runtime, the app fails because the Flutter layer does not recognize the new controls/features in your prerelease flet package, leading to errors like Unknown control: <ControlName>.

Note: this issue does not affect the development workflows (ex: running an app with flet run), as the flet Flutter dependency is only resolved during the flet build process.

Solution​

The rule-of-thumb is, if you are using a prerelease Flet Python package, always ensure the Flutter flet dependency is aligned with the same development version before building your app:

Override the Flutter flet dependency to point to the corresponding development Git reference.
pyproject.toml
[tool.flet.flutter.pubspec.dependency_overrides]

flet = { git = { url = "https://github.com/flet-dev/flet.git", ref = "main", path = "packages/flet" } }

Rebuild the app with the build cache cleared (use --clear-cache; or manually delete build/flutter)

To ensure reproducible builds (ex: in production or CI), prefer using a specific commit SHA, instead of a branch or tag ref.

Edit this page