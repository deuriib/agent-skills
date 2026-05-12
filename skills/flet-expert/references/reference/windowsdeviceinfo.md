# WindowsDeviceInfo
URL: https://flet.dev/docs/types/windowsdeviceinfo

ReferenceTypesClassesDeviceInfoWindowsDeviceInfo
WindowsDeviceInfo

Device information snapshot for Windows systems.

Returned by Page.get_device_info on Windows.

Inherits: DeviceInfo

Properties
build_lab - Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\BuildLab registry key.
build_lab_ex - Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\BuildLabEx registry key.
build_number - The build number of the operating system.
computer_name - The computer's fully-qualified DNS name, where available.
csd_version - The service-pack version string.
device_id - Displayed as "Device ID" in Windows Settings.
display_version - Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\DisplayVersion registry key.
edition_id - Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\EditionID registry key.
install_date - Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\InstallDate registry key.
major_version - The major version number of the operating system.
minor_version - The minor version number of the operating system.
number_of_cores - Number of CPU cores on the local machine.
platform_id - The operating system platform.
product_id - Displayed as "Product ID" in Windows Settings.
product_name - Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductName registry key.
product_type - The product type.
registered_owner - Value of the HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner registry key.
release_id - Value of the HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ReleaseId registry key.
reserved - Reserved for future use.
service_pack_major - The major version number of the latest service pack installed on the system.
service_pack_minor - The minor version number of the latest service pack installed on the system.
suit_mask - The product suites available on the system.
system_memory - The physically installed memory in the computer, in megabytes.
user_name
Properties​
build
build_lab
instance-attribute
​
Copy
build_lab: str

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\BuildLab registry key.

For example: "22000.co_release.210604-1628".

build
build_lab_ex
instance-attribute
​
Copy
build_lab_ex: str

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\BuildLabEx registry key.

For example: "22000.1.amd64free.co_release.210604-1628".

build
build_number
instance-attribute
​
Copy
build_number: int

The build number of the operating system.

build
computer_name
instance-attribute
​
Copy
computer_name: str

The computer's fully-qualified DNS name, where available.

build
csd_version
instance-attribute
​
Copy
csd_version: str

The service-pack version string.

This member contains a string, such as "Service Pack 3", which indicates the latest service pack installed on the system.

build
device_id
instance-attribute
​
Copy
device_id: str

Displayed as "Device ID" in Windows Settings.

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\SQMClient\MachineId registry key.

build
display_version
instance-attribute
​
Copy
display_version: str

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\DisplayVersion registry key.

For example: "21H2".

build
edition_id
instance-attribute
​
Copy
edition_id: str

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\EditionID registry key.

build
install_date
instance-attribute
​
Copy
install_date: datetime

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\InstallDate registry key.

build
major_version
instance-attribute
​
Copy
major_version: int

The major version number of the operating system.

For example, for Windows 2000, the major version number is 5.

For more info, see the table in Remarks: https://docs.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ns-wdm-_osversioninfoexw#remarks

build
minor_version
instance-attribute
​
Copy
minor_version: int

The minor version number of the operating system.

For example, for Windows 2000, the minor version number is 0.

For more info, see the table in Remarks: https://docs.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ns-wdm-_osversioninfoexw#remarks

build
number_of_cores
instance-attribute
​
Copy
number_of_cores: int

Number of CPU cores on the local machine.

build
platform_id
instance-attribute
​
Copy
platform_id: int

The operating system platform.

For Win32 on NT-based operating systems, RtlGetVersion returns the value VER_PLATFORM_WIN32_NT.

build
product_id
instance-attribute
​
Copy
product_id: str

Displayed as "Product ID" in Windows Settings.

Value of the HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductId registry key.

For example: "00000-00000-0000-AAAAA".

build
product_name
instance-attribute
​
Copy
product_name: str

Value of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProductName registry key.

For example: "Windows 10 Home Single Language".

build
product_type
instance-attribute
​
Copy
product_type: int

The product type.

This member contains additional information about the system.

build
registered_owner
instance-attribute
​
Copy
registered_owner: str

Value of the HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\RegisteredOwner registry key.

For example: "Microsoft Corporation".

build
release_id
instance-attribute
​
Copy
release_id: str

Value of the HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ReleaseId registry key.

For example: "1903".

build
reserved
instance-attribute
​
Copy
reserved: int

Reserved for future use.

build
service_pack_major
instance-attribute
​
Copy
service_pack_major: int

The major version number of the latest service pack installed on the system.

For example, for Service Pack 3, the major version number is three. If no service pack has been installed, the value is zero.

build
service_pack_minor
instance-attribute
​
Copy
service_pack_minor: int

The minor version number of the latest service pack installed on the system.

For example, for Service Pack 3, the minor version number is zero.

build
suit_mask
instance-attribute
​
Copy
suit_mask: int

The product suites available on the system.

build
system_memory
instance-attribute
​
Copy
system_memory: int

The physically installed memory in the computer, in megabytes.

This may not be the same as available memory.

build
user_name
instance-attribute
​
Copy
user_name: str
Edit this page