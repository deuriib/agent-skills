# DeviceInfo
URL: https://flet.dev/docs/types/deviceinfo/

ReferenceTypesClassesDeviceInfo
DeviceInfo

Base class for device information.

Platform-specific classes include:

AndroidDeviceInfo
IosDeviceInfo
LinuxDeviceInfo
MacOsDeviceInfo
WebDeviceInfo
WindowsDeviceInfo
Properties
locales - The full system-reported supported locales of the device.
Properties​
build
locales
instance-attribute
​
Copy
locales: list[Locale]

The full system-reported supported locales of the device.

This establishes the language and formatting conventions that application should, if possible, use to render their user interface.

The list is ordered in order of priority, with lower-indexed locales being preferred over higher-indexed ones. The first element is the primary locale.

The Page.on_locale_change event is called whenever this value changes.

Edit this page