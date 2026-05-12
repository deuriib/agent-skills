# IosDeviceInfo
URL: https://flet.dev/docs/types/iosdeviceinfo

ReferenceTypesClassesDeviceInfoIosDeviceInfo
IosDeviceInfo

Device information snapshot for iOS/iPadOS runtimes.

Returned by Page.get_device_info on iOS.

Inherits: DeviceInfo

Properties
available_ram_size - Current unallocated RAM size of the device in megabytes.
free_disk_size - Free disk size in bytes.
identifier_for_vendor - Unique UUID value identifying the current device.
is_ios_app_on_mac - Indicates whether the process is an iPhone or iPad app running on a Mac.
is_physical_device - False if the application is running in a simulator, True otherwise.
localized_model - Localized name of the device model.
model - Device model according to OS.
model_name - Commercial or user-known model name.
name - The device name.
physical_ram_size - Total physical RAM size of the device in megabytes.
system_name - The name of the current operating system.
system_version - The current operating system version.
total_disk_size - Total disk size in bytes.
utsname - Operating system information derived from sys/utsname.h.
Properties​
build
available_ram_size
instance-attribute
​
Copy
available_ram_size: int

Current unallocated RAM size of the device in megabytes.

build
free_disk_size
instance-attribute
​
Copy
free_disk_size: int

Free disk size in bytes.

build
identifier_for_vendor
class-attribute
instance-attribute
​
Copy
identifier_for_vendor: str | None = None

Unique UUID value identifying the current device.

More info: https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor

build
is_ios_app_on_mac
instance-attribute
​
Copy
is_ios_app_on_mac: bool

Indicates whether the process is an iPhone or iPad app running on a Mac.

More info: https://developer.apple.com/documentation/foundation/nsprocessinfo/3608556-iosapponmac

build
is_physical_device
instance-attribute
​
Copy
is_physical_device: bool

False if the application is running in a simulator, True otherwise.

build
localized_model
instance-attribute
​
Copy
localized_model: str

Localized name of the device model.

More info: https://developer.apple.com/documentation/uikit/uidevice/1620029-localizedmodel

build
model
instance-attribute
​
Copy
model: str

Device model according to OS.

More info: https://developer.apple.com/documentation/uikit/uidevice/1620044-model

build
model_name
instance-attribute
​
Copy
model_name: str

Commercial or user-known model name.

For example: "iPhone 16 Pro", "iPad Pro 11-Inch 3"

build
name
instance-attribute
​
Copy
name: str

The device name.

NOTE
On iOS < 16 returns user-assigned device name.
On iOS >= 16 returns a generic device name if project has no entitlement to get user-assigned device name.

More info: https://developer.apple.com/documentation/uikit/uidevice/1620015-name

build
physical_ram_size
instance-attribute
​
Copy
physical_ram_size: int

Total physical RAM size of the device in megabytes.

build
system_name
instance-attribute
​
Copy
system_name: str

The name of the current operating system.

More info: https://developer.apple.com/documentation/uikit/uidevice/1620054-systemname

build
system_version
instance-attribute
​
Copy
system_version: str

The current operating system version.

More info: https://developer.apple.com/documentation/uikit/uidevice/1620043-systemversion

build
total_disk_size
instance-attribute
​
Copy
total_disk_size: int

Total disk size in bytes.

build
utsname
instance-attribute
​
Copy
utsname: IosUtsname

Operating system information derived from sys/utsname.h.

Edit this page