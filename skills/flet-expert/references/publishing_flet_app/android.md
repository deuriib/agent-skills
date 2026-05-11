# Android
URL: https://flet.dev/docs/publish/android

Publishing Flet appAndroid
Packaging app for Android

Instructions for packaging a Flet app into an Android APK and Android App Bundle (AAB).

INFO

This guide provides detailed Android-specific information. Complementary and more general information is available here.

Prerequisites​
Android SDK​

The build process requires both Java (JDK 17) and the Android SDK.

If either component is missing or an incompatible version is detected, the required tools will be automatically installed during the first run of the flet build command.

The JDK is installed in $HOME/java/<version> (for example, 17.0.13+11).
If Android Studio is installed, Flet CLI will use its SDK:
macOS: ~/Library/Android/sdk
Windows: %LOCALAPPDATA%\Android\Sdk
Linux: ~/Android/Sdk
Otherwise, a standalone Android SDK is installed in:
macOS/Linux: ~/Android/sdk
Windows: %USERPROFILE%\Android\sdk

ANDROID_HOME and ANDROID_SDK_ROOT are also respected if set.

Android wheels for binary Python packages​

Binary Python packages (in contrast to "pure" Python packages written in Python only) are packages that are partially written in C, Rust, or other languages producing native code. Example packages are numpy, cryptography, or pydantic-core.

Make sure all non-pure (binary) packages used in your Flet app have pre-built wheels for Android.

flet build apk​
NOTE

This command can be run on a macOS, Linux, or Windows.

Builds a release Android APK.

Release builds are optimized for production, meaning they don’t support debugging and are intended for publishing to app stores such as Google Play.

For Play Store deployment, it’s recommended to:

Use an Android App Bundle (AAB) for more efficient delivery and smaller install size
Or split the APK by ABI to reduce the APK size
Split APK per ABI​

Android devices use different CPUs, so APKs can target different Application Binary Interfaces (ABIs).

By default, Flet builds a single "fat" APK that contains native binaries for all supported ABIs. This maximizes device compatibility but increases APK size.

Enabling ABI splits produces one APK per ABI, which reduces file size but requires distributing the correct APK for each device.

Supported target architectures​

The following target architectures are supported:

arm64-v8a
armeabi-v7a
x86_64
x86
Resolution order​

Its value is determined in the following order of precedence:

--split-per-abi
[tool.flet.android].split_per_abi
false

When enabled, 3 APKs are produced by default, one for each of the following ABIs: arm64-v8a, armeabi-v7a, and x86_64. These can be customized by setting target architectures.

Example​
flet build
pyproject.toml
flet build apk --split-per-abi

flet build aab​
NOTE

This command can be run on a macOS, Linux, or Windows.

Builds a release Android App Bundle (AAB) file.

Release builds are optimized for production, meaning they don’t support debugging and are intended for publishing to app stores such as the Google Play Store.

It is recommended to use this AAB format (instead of APK) for publishing to the Google Play Store due to its optimized app size.

If you need to limit the ABIs included in the bundle, use --arch / [tool.flet.android].target_arch while split_per_abi is false.

Signing an Android bundle​

Android requires that all APKs be digitally signed with a certificate before they are installed on a device or updated. When releasing using Android App Bundles, you need to sign your app bundle with an upload key before uploading it to the Play Console, and Play App Signing takes care of the rest. For apps distributing using APKs on the Play Store or on other stores, you must manually sign your APKs for upload.

For detailed information, see this guide.

To publish on the Play Store, you need to sign your app with a digital certificate.

Android uses two signing keys: upload and app signing.

Developers upload an .aab or .apk file signed with an upload key to the Play Store.
The end-users download the .apk file signed with an app signing key.

To create your app signing key, use Play App Signing as described in the official Play Store documentation.

To sign your app, use the following instructions.

NOTE

If you don't provide an upload keystore, release builds are signed with the debug key. This is fine for local testing but cannot be uploaded to the Play Store.

Create an upload keystore​

If you have an existing keystore, skip to the next step. If not, create one using one of the following methods:

Follow the Android Studio key generation steps.

Run the following command at the command line: On macOS or Linux, use the following command:

keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \

    -keysize 2048 -validity 10000 -alias upload


On Windows, use the following command in PowerShell:

keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `

    -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `

    -alias upload


You will be prompted for several details, such as a keystore password, a key alias, your names, and location. Remember the password and alias for use in the configuration steps below.

A file named upload-keystore.jks will be created in your home directory. If you want to store it elsewhere, change the argument passed to the -keystore parameter. The location of the keystore file is equally important for the key store step below.

NOTE

The keytool command might not be in your path—it's part of Java, which is installed as part of Android Studio. For the concrete path, run flutter doctor -v and locate the path printed after 'Java binary at:'. Then use that fully qualified path replacing java (at the end) with keytool. If your path includes space-separated names, such as Program Files, use platform-appropriate notation for the names. For example, on macOS and Linux use Program\ Files, and on Windows use "Program Files".

The -storetype JKS tag is only required for Java 9 or newer. As of the Java 9 release, the keystore type defaults to PKCS12.

IMPORTANT

Keep your keystore file private; never check it into public source control!

Key alias​

An alias name for the key within the keystore.

Resolution order​

Its value is determined in the following order of precedence:

--android-signing-key-alias
FLET_ANDROID_SIGNING_KEY_ALIAS
[tool.flet.android.signing].key_alias
"upload"
Example​
flet build
pyproject.toml
.env
flet build aab --android-signing-key-alias value

Key store​

The path to the keystore file (with extension .jks).

If you used the CLI commands above as-is, this file might be located at /Users/<user name>/upload-keystore.jks on macOS or C:\Users\<user name>\upload-keystore.jks on Windows.

Resolution order​

Its value is determined in the following order of precedence:

--android-signing-key-store
[tool.flet.android.signing].key_store
FLET_ANDROID_SIGNING_KEY_STORE
Example​
flet build
pyproject.toml
.env
flet build aab --android-signing-key-store path/to/store.jks

Key store password​

A password to unlock the keystore file (can contain multiple key entries).

Resolution order​

Its value is determined in the following order of precedence:

--android-signing-key-store-password
FLET_ANDROID_SIGNING_KEY_STORE_PASSWORD
key password
Example​
flet build
pyproject.toml
.env
flet build aab --android-signing-key-store-password value

Key password​

A password used to access the private key inside the keystore.

Resolution order​

Its value is determined in the following order of precedence:

--android-signing-key-password
FLET_ANDROID_SIGNING_KEY_PASSWORD
key store password
Example​
flet build
pyproject.toml
.env
flet build aab --android-signing-key-password value

Android Manifest​

The Android Manifest describes essential information about your app to the Android build tools, the Android operating system, and Google Play. The file in which this information is written is AndroidManifest.xml, which gets populated with the information you provide.

Application attributes​

You can add or override attributes on the <application> element of the AndroidManifest.xml file in the build template.

See also:

<application> element
Resolution order​

Its value is determined in the following order of precedence:

[tool.flet.android.manifest_application]
Example​
pyproject.toml
[tool.flet.android.manifest_application]

usesCleartextTraffic = "true"

allowBackup = "false"

Template translation
Meta-data​

A name-value pair for an item of additional, arbitrary data that can be supplied to the parent component. More information here.

A meta-data item is composed of:

name: A unique name for the item, usually with a Java-style naming convention, for example "com.sample.project.activity.fred".
value: The value of the item. Android supports strings, integers, booleans, and floats. Flet writes values as strings, so pass the literal value you want Android to read (for example "true", "123", "1.23").

See also:

<meta-data> element
Resolution order​

Its value is determined in the following order of precedence:

--android-meta-data
[tool.flet.android.meta_data]
Example​
flet build
pyproject.toml
flet build apk \

  --android-meta-data firebase_analytics_collection_enabled=true \

  --android-meta-data default_timeout_seconds=30

Template translation
Features​

A hardware or software feature that is used by the application. More information here.

name: Specifies a single hardware or software feature used by the application as a descriptor string. Valid attribute values are listed in the Hardware features and Software features sections. These attribute values are case-sensitive.
required: A boolean value (true or false) that indicates whether the application requires the feature specified by the name.

See also:

<uses-feature> element
Features reference
Resolution order​

Its value is determined in the following order of precedence:

--android-features
[tool.flet.android.feature]
Values injected by cross-platform permission bundles, if any.
defaults: android.software.leanback=false, android.hardware.touchscreen=false
Supported value forms​
flet build
pyproject.toml

Accepts repeated <name>=<required> entries. The <required> value can be true or false (case-insensitive).

Example​
flet build
pyproject.toml
flet build apk \

  --android-features android.hardware.camera=true \

  --android-features android.hardware.location.gps=false

Template translation
Permissions​

Use cross-platform permissions from Permissions when possible, and add Android-specific permissions or features here.

See also:

Manifest.permission constants
Request app permissions
Resolution order​

Its value is determined in the following order of precedence:

--android-permissions
[tool.flet.android.permission]
Values injected by cross-platform permission bundles, if any.
defaults: android.permission.INTERNET=true
Supported value forms​
flet build
pyproject.toml

Accepts repeated <name>=<enabled> entries. The <enabled> value can be true or false (case-insensitive). Permissions with false are omitted from the generated manifest.

Example​
flet build
pyproject.toml
flet build apk \

  --android-permissions android.permission.READ_EXTERNAL_STORAGE=true \

  --android-permissions android.permission.WRITE_EXTERNAL_STORAGE=true

Template translation
Minimum SDK version​

The minimum Android API level your app can be installed on.

See also:

<uses-sdk> element (minSdkVersion)
Android API level reference
Resolution order​

Its value is determined in the following order of precedence:

[tool.flet.android].min_sdk_version
Flutter default: flutter.minSdkVersion
Example​
pyproject.toml
[tool.flet.android]

min_sdk_version = 24

Template translation
Target SDK version​

The Android API level your app targets for runtime behavior and compatibility.

See also:

<uses-sdk> element (targetSdkVersion)
Target API level requirements and behavior changes
Resolution order​

Its value is determined in the following order of precedence:

[tool.flet.android].target_sdk_version
Flutter default: flutter.targetSdkVersion
Example​
pyproject.toml
[tool.flet.android]

target_sdk_version = 35

Template translation
Adaptive icon background​

The background color used for the Android adaptive launcher icon.

This value is applied when app icons are generated for Android.

Resolution order​

Its value is determined in the following order of precedence:

--android-adaptive-icon-background
[tool.flet.android].adaptive_icon_background
Build template default: #ffffff
Example​
flet build
pyproject.toml
flet build apk --android-adaptive-icon-background "#0B6BFF"

ADB Tips​

Android Debug Bridge (adb) is a command-line tool included in the Android SDK that lets you communicate with Android devices and emulators.

If you installed Android Studio on macOS, adb is typically located at: ~/Library/Android/sdk/platform-tools/adb.

See this guide for help installing and using adb on different platforms.

To run interactive commands inside an Android simulator or device:

adb shell


To overcome "permissions denied" error while trying to browse file system in interactive Android shell:

su


To download a file from a device to your local computer:

adb pull <device-path> <local-path>


To install an APK on an Android device:

adb install <path-to-your.apk>


This works for both physical devices and emulators. If more than one device is connected, specify the target device:

adb -s <device> install <path-to-your.apk>


You can list available devices with:

adb devices

Edit this page