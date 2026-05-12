# MacOsDeviceInfo
URL: https://flet.dev/docs/types/macosdeviceinfo

ReferenceTypesClassesDeviceInfoMacOsDeviceInfo
MacOsDeviceInfo

Device information snapshot for macOS hosts.

Returned by Page.get_device_info when the current platform is macOS. Includes CPU, memory, model, and OS version fields collected from native system APIs.

Inherits: DeviceInfo

Properties
active_cpus - Number of active CPUs.
arch - Machine CPU architecture.
computer_name - Name given to the local machine.
cpu_frequency - Device CPU frequency.
host_name - Operating system type.
kernel_version - Machine kernel version.
major_version - The major release number, such as 10 in version 10.9.3.
memory_size - Machine's memory size.
minor_version - The minor release number, such as 9 in version 10.9.3.
model - Device model identifier.
model_name - Device model name.
os_release - Operating system release number.
patch_version - The update release number, such as 3 in version 10.9.3.
system_guid - Device GUID.
Properties​
build
active_cpus
instance-attribute
​
Copy
active_cpus: int

Number of active CPUs.

build
arch
instance-attribute
​
Copy
arch: str

Machine CPU architecture.

NOTE

Apple Silicon Macs can return "x86_64" if app runs via Rosetta.

build
computer_name
instance-attribute
​
Copy
computer_name: str

Name given to the local machine.

build
cpu_frequency
instance-attribute
​
Copy
cpu_frequency: int

Device CPU frequency.

build
host_name
instance-attribute
​
Copy
host_name: str

Operating system type.

build
kernel_version
instance-attribute
​
Copy
kernel_version: str

Machine kernel version.

build
major_version
instance-attribute
​
Copy
major_version: int

The major release number, such as 10 in version 10.9.3.

build
memory_size
instance-attribute
​
Copy
memory_size: int

Machine's memory size.

build
minor_version
instance-attribute
​
Copy
minor_version: int

The minor release number, such as 9 in version 10.9.3.

build
model
instance-attribute
​
Copy
model: str

Device model identifier.

For example: "MacBookPro18,3", "Mac16,2".

build
model_name
instance-attribute
​
Copy
model_name: str

Device model name.

For example: "MacBook Pro (16-inch, 2021)", "iMac (24-inch, 2024)".

build
os_release
instance-attribute
​
Copy
os_release: str

Operating system release number.

build
patch_version
instance-attribute
​
Copy
patch_version: int

The update release number, such as 3 in version 10.9.3.

build
system_guid
class-attribute
instance-attribute
​
Copy
system_guid: str | None = None

Device GUID.

Edit this page