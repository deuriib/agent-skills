# WebDeviceInfo
URL: https://flet.dev/docs/types/webdeviceinfo

ReferenceTypesClassesDeviceInfoWebDeviceInfo
WebDeviceInfo

Information derived from navigator.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator

Inherits: DeviceInfo

Properties
app_code_name - The internal 'code' name of the current browser.
app_name - A string with the official name of the browser.
app_version - The version of the browser as a string.
browser_name - The name of the browser in use.
device_memory - The amount of device memory in gigabytes.
hardware_concurrency - The number of logical processor cores available.
language - A string representing the preferred language of the user, usually the language of the browser UI.
languages - A list of strings representing the languages known to the user, by order of preference.
max_touch_points - The maximum number of simultaneous touch contact points supported by the current device.
platform - A string representing the platform of the browser.
product - Always returns "Gecko", on any browser.
product_sub - The build number of the current browser.
user_agent - The user agent string for the current browser (e.g., 'Mozilla/5.0 ...').
vendor - The vendor name of the current browser.
vendor_sub - Returns the vendor version number (e.g., '6.1').
Properties​
build
app_code_name
class-attribute
instance-attribute
​
Copy
app_code_name: str | None = None

The internal 'code' name of the current browser.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appCodeName

NOTE

Do not rely on this property to return the correct value.

build
app_name
class-attribute
instance-attribute
​
Copy
app_name: str | None = None

A string with the official name of the browser.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appName

NOTE

Do not rely on this property to return the correct value.

build
app_version
class-attribute
instance-attribute
​
Copy
app_version: str | None = None

The version of the browser as a string.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion

NOTE

Do not rely on this property to return the correct value.

build
browser_name
instance-attribute
​
Copy
browser_name: WebBrowserName

The name of the browser in use.

build
device_memory
class-attribute
instance-attribute
​
Copy
device_memory: float | None = None

The amount of device memory in gigabytes.

This value is an approximation given by rounding to the nearest power of 2 and dividing that number by 1024.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory

build
hardware_concurrency
class-attribute
instance-attribute
​
Copy
hardware_concurrency: int | None = None

The number of logical processor cores available.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency

build
language
class-attribute
instance-attribute
​
Copy
language: str | None = None

A string representing the preferred language of the user, usually the language of the browser UI.

Will be None if unknown.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language

build
languages
class-attribute
instance-attribute
​
Copy
languages: list[str] | None = None

A list of strings representing the languages known to the user, by order of preference.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages

build
max_touch_points
class-attribute
instance-attribute
​
Copy
max_touch_points: int | None = None

The maximum number of simultaneous touch contact points supported by the current device.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints

build
platform
class-attribute
instance-attribute
​
Copy
platform: str | None = None

A string representing the platform of the browser.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform

NOTE

Do not rely on this property to return the correct value.

build
product
class-attribute
instance-attribute
​
Copy
product: str | None = None

Always returns "Gecko", on any browser.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/product

NOTE

Do not rely on this property to return the correct value. This property is kept only for compatibility purposes.

build
product_sub
class-attribute
instance-attribute
​
Copy
product_sub: str | None = None

The build number of the current browser.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/productSub

NOTE

Do not rely on this property to return the correct value.

build
user_agent
class-attribute
instance-attribute
​
Copy
user_agent: str | None = None

The user agent string for the current browser (e.g., 'Mozilla/5.0 ...').

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent

build
vendor
class-attribute
instance-attribute
​
Copy
vendor: str | None = None

The vendor name of the current browser.

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vendor

build
vendor_sub
class-attribute
instance-attribute
​
Copy
vendor_sub: str | None = None

Returns the vendor version number (e.g., '6.1').

More info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vendorSub

NOTE

Do not rely on this property to return the correct value.

Edit this page