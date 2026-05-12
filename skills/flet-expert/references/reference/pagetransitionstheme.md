# PageTransitionsTheme
URL: https://flet.dev/docs/types/pagetransitionstheme

ReferenceTypesClassesThemePageTransitionsTheme
PageTransitionsTheme

Per-platform mapping of route transition presets.

Assigned to Theme.page_transitions to override how Material routes animate on each target platform.

Properties
android - Transition preset for Android routes.
ios - Transition preset for iOS routes.
linux - Transition preset for Linux desktop routes.
macos - Transition preset for macOS desktop routes.
windows - Transition preset for Windows desktop routes.
Properties​
build
android
class-attribute
instance-attribute
​
Copy
android: PageTransitionTheme | None = None

Transition preset for Android routes.

If None, defaults to PageTransitionTheme.FADE_UPWARDS.

build
ios
class-attribute
instance-attribute
​
Copy
ios: PageTransitionTheme | None = None

Transition preset for iOS routes.

If None, defaults to PageTransitionTheme.CUPERTINO.

build
linux
class-attribute
instance-attribute
​
Copy
linux: PageTransitionTheme | None = None

Transition preset for Linux desktop routes.

If None, defaults to PageTransitionTheme.ZOOM.

build
macos
class-attribute
instance-attribute
​
Copy
macos: PageTransitionTheme | None = None

Transition preset for macOS desktop routes.

If None, defaults to PageTransitionTheme.ZOOM.

build
windows
class-attribute
instance-attribute
​
Copy
windows: PageTransitionTheme | None = None

Transition preset for Windows desktop routes.

If None, defaults to PageTransitionTheme.ZOOM.

Edit this page