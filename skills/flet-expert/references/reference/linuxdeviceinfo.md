# LinuxDeviceInfo
URL: https://flet.dev/docs/types/linuxdeviceinfo

ReferenceTypesClassesDeviceInfoLinuxDeviceInfo
LinuxDeviceInfo

Device information for a Linux system.

More info:

https://www.freedesktop.org/software/systemd/man/os-release.html
https://www.freedesktop.org/software/systemd/man/machine-id.html

Inherits: DeviceInfo

Properties
build_id - A string uniquely identifying the system image used as the origin for a distribution (it is not updated with system updates).
id - A lower-case string identifying the operating system, excluding any version information and suitable for processing by scripts or usage in generated filenames.
id_like - A space-separated list of operating system identifiers in the same syntax as the id value.
machine_id - A unique machine ID of the local system that is set during installation or boot.
name - A string identifying the operating system, without a version component, and suitable for presentation to the user.
pretty_name - A pretty operating system name in a format suitable for presentation to the user.
variant - A string identifying a specific variant or edition of the operating system suitable for presentation to the user.
variant_id - A lower-case string identifying a specific variant or edition of the operating system.
version - A string identifying the operating system version, excluding any OS name information, possibly including a release code name, and suitable for presentation to the user.
version_code_name - A lower-case string identifying the operating system release code name, excluding any OS name information or release version, and suitable for processing by scripts or usage in generated filenames.
version_id - A lower-case string identifying the operating system version, excluding any OS name information or release code name, and suitable for processing by scripts or usage in generated filenames.
Properties​
build
build_id
class-attribute
instance-attribute
​
Copy
build_id: str | None = None

A string uniquely identifying the system image used as the origin for a distribution (it is not updated with system updates). The field can be identical between different version_id values as build_id is only a unique identifier to a specific version.

Examples: "2013-03-20.3", "201303203".

May be None on some systems.

build
id
instance-attribute
​
Copy
id: str

A lower-case string identifying the operating system, excluding any version information and suitable for processing by scripts or usage in generated filenames.

The ID contains no spaces or other characters outside of 0–9, a–z, '.', '_' and '-'.

Examples: "fedora", "debian".

If not set, defaults to "linux".

build
id_like
class-attribute
instance-attribute
​
Copy
id_like: list[str] | None = None

A space-separated list of operating system identifiers in the same syntax as the id value. It lists identifiers of operating systems that are closely related to the local operating system in regards to packaging and programming interfaces, for example listing one or more OS identifiers the local OS is a derivative from.

Examples: an operating system with id "centos", would list "rhel" and "fedora", and an operating system with id "ubuntu" would list "debian".

May be None on some systems.

build
machine_id
class-attribute
instance-attribute
​
Copy
machine_id: str | None = None

A unique machine ID of the local system that is set during installation or boot. The machine ID is hexadecimal, 32-character, lowercase ID. When decoded from hexadecimal, this corresponds to a 16-byte/128-bit value.

build
name
instance-attribute
​
Copy
name: str

A string identifying the operating system, without a version component, and suitable for presentation to the user.

Examples: "Fedora", "Debian GNU/Linux".

If not set, defaults to "Linux".

build
pretty_name
instance-attribute
​
Copy
pretty_name: str

A pretty operating system name in a format suitable for presentation to the user. May or may not contain a release code name or OS version of some kind, as suitable.

Examples: "Fedora 17 (Beefy Miracle)".

If not set, defaults to "Linux".

build
variant
class-attribute
instance-attribute
​
Copy
variant: str | None = None

A string identifying a specific variant or edition of the operating system suitable for presentation to the user. This field may be used to inform the user that the configuration of this system is subject to a specific divergent set of rules or default configuration settings.

Examples: "Server Edition", "Smart Refrigerator Edition".

Note: this field is for display purposes only. The variant_id field should be used for making programmatic decisions.

May be None on some systems.

build
variant_id
class-attribute
instance-attribute
​
Copy
variant_id: str | None = None

A lower-case string identifying a specific variant or edition of the operating system. This may be interpreted in order to determine a divergent default configuration.

The variant ID contains no spaces or other characters outside of 0–9, a–z, '.', '_' and '-'.

Examples: "server", "embedded".

May be None on some systems.

build
version
class-attribute
instance-attribute
​
Copy
version: str | None = None

A string identifying the operating system version, excluding any OS name information, possibly including a release code name, and suitable for presentation to the user.

Examples: "17", "17 (Beefy Miracle)".

May be None on some systems.

build
version_code_name
class-attribute
instance-attribute
​
Copy
version_code_name: str | None = None

A lower-case string identifying the operating system release code name, excluding any OS name information or release version, and suitable for processing by scripts or usage in generated filenames.

The codename contains no spaces or other characters outside of 0–9, a–z, '.', '_' and '-'.

Examples: "buster", "xenial".

May be None on some systems.

build
version_id
class-attribute
instance-attribute
​
Copy
version_id: str | None = None

A lower-case string identifying the operating system version, excluding any OS name information or release code name, and suitable for processing by scripts or usage in generated filenames.

The version is mostly numeric, and contains no spaces or other characters outside of 0–9, a–z, '.', '_' and '-'.

Examples: "17", "11.04".

May be None on some systems.

Edit this page