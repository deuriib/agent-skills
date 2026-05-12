# AndroidDeviceInfo
URL: https://flet.dev/docs/types/androiddeviceinfo

ReferenceTypesClassesDeviceInfoAndroidDeviceInfo
AndroidDeviceInfo

Device information snapshot for Android devices and emulators.

Returned by Page.get_device_info on Android.

Inherits: DeviceInfo

Properties
available_ram_size - Total available RAM size in bytes.
board - The name of the underlying board, like "goldfish".
bootloader - The system bootloader version number.
brand - The consumer-visible brand with which the product/hardware will be associated, if any.
device - The name of the industrial design.
display - A build ID string meant for displaying to the user.
fingerprint - A string that uniquely identifies this build.
free_disk_size - Free disk size in bytes.
hardware - The name of the hardware (from the kernel command line or /proc).
host - Hostname.
id - Either a changelist number, or a label like "M4-rc20".
is_low_ram_device - True if the application is running on a low-RAM device, False otherwise.
is_physical_device - False if the application is running in an emulator, True otherwise.
manufacturer - The manufacturer of the product/hardware.
model - The end-user-visible name for the end product.
name - The name of the device.
physical_ram_size - Total physical RAM size in bytes.
product - The name of the overall product.
supported_32_bit_abis - An ordered list of 32 bit ABIs supported by this device.
supported_64_bit_abis - An ordered list of 64 bit ABIs supported by this device.
supported_abis - An ordered list of ABIs supported by this device.
system_features - Describes what features are available on the current device.
tags - Comma-separated tags describing the build, like "unsigned,debug".
total_disk_size - Total disk size in bytes.
type - The type of build, like "user" or "eng".
version - Android operating system version values derived from android.os.Build.VERSION.
Properties​
build
available_ram_size
instance-attribute
​
Copy
available_ram_size: int

Total available RAM size in bytes.

build
board
instance-attribute
​
Copy
board: str

The name of the underlying board, like "goldfish".

More info: https://developer.android.com/reference/android/os/Build#BOARD

build
bootloader
instance-attribute
​
Copy
bootloader: str

The system bootloader version number.

More info: https://developer.android.com/reference/android/os/Build#BOOTLOADER

build
brand
instance-attribute
​
Copy
brand: str

The consumer-visible brand with which the product/hardware will be associated, if any.

More info: https://developer.android.com/reference/android/os/Build#BRAND

build
device
instance-attribute
​
Copy
device: str

The name of the industrial design.

More info: https://developer.android.com/reference/android/os/Build#DEVICE

build
display
instance-attribute
​
Copy
display: str

A build ID string meant for displaying to the user.

More info: https://developer.android.com/reference/android/os/Build#DISPLAY

build
fingerprint
instance-attribute
​
Copy
fingerprint: str

A string that uniquely identifies this build.

More info: https://developer.android.com/reference/android/os/Build#FINGERPRINT

build
free_disk_size
instance-attribute
​
Copy
free_disk_size: int

Free disk size in bytes.

build
hardware
instance-attribute
​
Copy
hardware: str

The name of the hardware (from the kernel command line or /proc).

More info: https://developer.android.com/reference/android/os/Build#HARDWARE

build
host
instance-attribute
​
Copy
host: str

Hostname.

More info: https://developer.android.com/reference/android/os/Build#HOST

build
id
instance-attribute
​
Copy
id: str

Either a changelist number, or a label like "M4-rc20".

More info: https://developer.android.com/reference/android/os/Build#ID

build
is_low_ram_device
instance-attribute
​
Copy
is_low_ram_device: bool

True if the application is running on a low-RAM device, False otherwise.

build
is_physical_device
instance-attribute
​
Copy
is_physical_device: bool

False if the application is running in an emulator, True otherwise.

build
manufacturer
instance-attribute
​
Copy
manufacturer: str

The manufacturer of the product/hardware.

More info: https://developer.android.com/reference/android/os/Build#MANUFACTURER

build
model
instance-attribute
​
Copy
model: str

The end-user-visible name for the end product.

More info: https://developer.android.com/reference/android/os/Build#MODEL

build
name
instance-attribute
​
Copy
name: str

The name of the device.

build
physical_ram_size
instance-attribute
​
Copy
physical_ram_size: int

Total physical RAM size in bytes.

build
product
instance-attribute
​
Copy
product: str

The name of the overall product.

More info: https://developer.android.com/reference/android/os/Build#PRODUCT

build
supported_32_bit_abis
instance-attribute
​
Copy
supported_32_bit_abis: list[str]

An ordered list of 32 bit ABIs supported by this device. Available only on Android L (API 21) and newer.

More info: https://developer.android.com/reference/android/os/Build#SUPPORTED_32_BIT_ABIS

build
supported_64_bit_abis
instance-attribute
​
Copy
supported_64_bit_abis: list[str]

An ordered list of 64 bit ABIs supported by this device. Available only on Android L (API 21) and newer.

More info: https://developer.android.com/reference/android/os/Build#SUPPORTED_64_BIT_ABIS

build
supported_abis
instance-attribute
​
Copy
supported_abis: list[str]

An ordered list of ABIs supported by this device. Available only on Android L (API 21) and newer.

More info: https://developer.android.com/reference/android/os/Build#SUPPORTED_ABIS

build
system_features
instance-attribute
​
Copy
system_features: list[str]

Describes what features are available on the current device.

This can be used to check if the device has, for example, a front-facing camera, or a touchscreen. However, in many cases this is not the best API to use. For example, if you are interested in bluetooth, this API can tell you if the device has a bluetooth radio, but it cannot tell you if bluetooth is currently enabled, or if you have been granted the necessary permissions to use it. Please only use this if there is no other way to determine if a feature is supported.

This data comes from Android's PackageManager.getSystemAvailableFeatures, and many of the common feature strings to look for are available in PackageManager's public documentation: https://developer.android.com/reference/android/content/pm/PackageManager

build
tags
instance-attribute
​
Copy
tags: str

Comma-separated tags describing the build, like "unsigned,debug".

More info: https://developer.android.com/reference/android/os/Build#TAGS

build
total_disk_size
instance-attribute
​
Copy
total_disk_size: int

Total disk size in bytes.

build
type
instance-attribute
​
Copy
type: str

The type of build, like "user" or "eng".

More info: https://developer.android.com/reference/android/os/Build#TYPE

build
version
instance-attribute
​
Copy
version: AndroidBuildVersion

Android operating system version values derived from android.os.Build.VERSION.

Edit this page