# macOS
URL: https://flet.dev/docs/publish/macos

Publishing Flet appmacOS
Packaging app for macOS

Instructions for packaging a Flet app into a macOS application bundle.

INFO

This guide provides detailed macOS-specific information. Complementary and more general information is available here.

Prerequisites​
Rosetta 2​

Flutter, which we use for packaging, requires Rosetta 2 on Apple Silicon:

sudo softwareupdate --install-rosetta --agree-to-license

Xcode​

Xcode 15 or later is required to compile native Swift or Objective-C code.

CocoaPods​

CocoaPods 1.16 or later is required to install and compile Flutter plugins.

flet build macos​
NOTE

This command can be run on macOS only.

Builds a macOS application bundle from your Flet app.

Target architecture​

By default, flet build macos creates a universal bundle that runs on both Apple Silicon and Intel Macs. Packaging downloads Python wheels for both arm64 and x86_64 architectures.

To limit packaging to a specific architecture, see this. This affects which Python wheels are bundled and, in turn, which CPU architectures the app will run on. You will then have to provide your users with the correct build for their Macs.

Permissions​

macOS permissions are declared through Info.plist privacy usage strings and app entitlements. You can also use the cross-platform permission bundles to inject common entries, then override or extend them with platform-specific values.

Info.plist​

Add or override Info.plist entries for macOS builds. These values are written to macos/Runner/Info.plist of the build project.

Resolution order​

Its value is determined in the following order of precedence:

--info-plist
[tool.flet.macos.info]
Values injected by cross-platform permission bundles, if any.
Supported value forms​
flet build
pyproject.toml

Accepts repeated <key>=<value> entries. The <value> can be in one of the following forms:

true or false (case-insensitive) for boolean values
integer and real number literals, for example 32 or 0.5
TOML array literals, for example ["basic", "advanced"]
TOML inline tables, for example { NSAllowsArbitraryLoads = false }
any other value is treated as a string
Example​
flet build
pyproject.toml
flet build macos \

  --info-plist LSApplicationCategoryType="public.app-category.utilities" \

  --info-plist NSSupportsSuddenTermination=true \

  --info-plist ExampleInteger=32 \

  --info-plist ExampleReal=0.5 \

  --info-plist 'SupportedModes=["basic", "advanced"]' \

  --info-plist 'FeatureFlags=[true, false]' \

  --info-plist 'RetryDelays=[1, 2, 3]' \

  --info-plist 'OpacitySteps=[0.25, 0.5, 0.75]' \

  --info-plist 'NSAppTransportSecurity={ NSAllowsArbitraryLoads = false }' \

  --info-plist 'CFBundleDocumentTypes=[{ CFBundleTypeName = "Data File", CFBundleTypeExtensions = ["dat"] }, { CFBundleTypeName = "JSON File", CFBundleTypeExtensions = ["json"] }]'

Template translation
Entitlements​

Entitlements are property-list key-value pairs that grant an executable permission to use a service or technology. The supported value type depends on the entitlement key defined in the Apple Developer Entitlements Reference.

Entitlements are written to macos/Runner/DebugProfile.entitlements and macos/Runner/Release.entitlements in the build template.

Resolution order​

Its value is determined in the following order of precedence:

--macos-entitlements

[tool.flet.macos.entitlement]

Values injected by cross-platform permission bundles, if any.

Defaults:

[tool.flet.macos.entitlement]

"com.apple.security.app-sandbox" = false

"com.apple.security.cs.allow-jit" = true

"com.apple.security.network.client" = true

"com.apple.security.network.server" = true

"com.apple.security.files.user-selected.read-write" = true

Supported value forms​
flet build
pyproject.toml

Accepts repeated <key>=<value> entries. The <value> can be in one of the following forms:

true or false (case-insensitive) for boolean values
integer and real number literals, for example 32 or 0.5
TOML array literals, for example ["group.example.one", "group.example.two"]
TOML inline tables, for example { "com.apple.mail" = ["compose"] }
any other value is treated as a string
Example​
flet build
pyproject.toml
flet build macos \

  --macos-entitlements com.apple.security.network.client=true \

  --macos-entitlements com.apple.developer.ubiquity-kvstore-identifier=ABCDE12345.dev.example.myapp \

  --macos-entitlements ExampleInteger=32 \

  --macos-entitlements ExampleReal=0.5 \

  --macos-entitlements 'com.apple.security.application-groups=["group.dev.example.myapp", "group.dev.example.shared"]' \

  --macos-entitlements 'ExampleBooleanArray=[true, false]' \

  --macos-entitlements 'com.apple.security.scripting-targets={ "com.apple.mail" = ["compose", "send"] }' \

  --macos-entitlements 'ExampleArrayOfDictionaries=[{ Name = "alpha", Enabled = true }, { Name = "beta", Enabled = false }]'

Template translation
Edit this page