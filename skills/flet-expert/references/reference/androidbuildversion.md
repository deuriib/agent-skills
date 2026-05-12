# AndroidBuildVersion
URL: https://flet.dev/docs/types/androidbuildversion

ReferenceTypesClassesAndroidBuildVersion
AndroidBuildVersion

Android OS version details derived from android.os.Build.VERSION.

This object is exposed as AndroidDeviceInfo.version.

Properties
base_os - The base OS build the product is based on.
code_name - The current development codename, or the string "REL" if this is a release build.
incremental - The internal value used by the underlying source control to represent this build.
preview_sdk - The developer preview revision of a pre-release SDK.
release - The user-visible version string.
sdk - The user-visible SDK version of the framework.
security_patch - The user-visible security patch level.
Properties​
build
base_os
class-attribute
instance-attribute
​
Copy
base_os: str | None = None

The base OS build the product is based on.

NOTE

Available only on Android M (API 23) and newer.

build
code_name
instance-attribute
​
Copy
code_name: str

The current development codename, or the string "REL" if this is a release build.

build
incremental
instance-attribute
​
Copy
incremental: str

The internal value used by the underlying source control to represent this build.

NOTE

Available only on Android M (API 23) and newer.

build
preview_sdk
class-attribute
instance-attribute
​
Copy
preview_sdk: int | None = None

The developer preview revision of a pre-release SDK.

build
release
instance-attribute
​
Copy
release: str

The user-visible version string.

build
sdk
instance-attribute
​
Copy
sdk: int

The user-visible SDK version of the framework.

Possible values are defined in: https://developer.android.com/reference/android/os/Build.VERSION_CODES.html

build
security_patch
class-attribute
instance-attribute
​
Copy
security_patch: str | None = None

The user-visible security patch level.

NOTE

Available only on Android M (API 23) and newer.

Edit this page