# SecureStorage
URL: https://flet.dev/docs/services/securestorage/

ReferenceServicesSecureStorage
Secure Storage

A service for safely storing sensitive key–value data using the platform’s native secure storage mechanisms—Keychain on iOS/macOS, Windows Credential Manager, libsecret on Linux, and Keystore on Android.

Powered by Flutter's flutter_secure_storage package.

NOTE

You need libsecret-1-dev on your machine to build the project, and libsecret-1-0 to run the application (add it as a dependency after packaging your app). If you using snapcraft to build the project use the following.

Apart from libsecret you also need a keyring service, for that you need either gnome-keyring (for Gnome users) or kwalletmanager (for KDE users) or other light provider like secret-service.

sudo apt-get install libsecret-1-dev libsecret-1-0

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

Add flet-secure-storage to your project dependencies:

uv
pip
uv add flet-secure-storage

Example​
import base64

import os



import flet as ft

import flet_secure_storage as fss





def main(page: ft.Page):

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    storage = fss.SecureStorage(

        web_options=fss.WebOptions(

            db_name="customstorage",

            public_key="publickey",

            wrap_key=base64.urlsafe_b64encode(os.urandom(32)).decode(),

            wrap_key_iv=base64.urlsafe_b64encode(os.urandom(16)).decode(),

        ),

        android_options=fss.AndroidOptions(

            reset_on_error=True,

            migrate_on_algorithm_change=True,

            enforce_biometrics=True,

            key_cipher_algorithm=fss.KeyCipherAlgorithm.AES_GCM_NO_PADDING,

            storage_cipher_algorithm=fss.StorageCipherAlgorithm.AES_GCM_NO_PADDING,

        ),

    )



    key = ft.TextField(label="Key", value="example_key")

    value = ft.TextField(label="Value", value="secret_value")

    result = ft.Text(theme_style=ft.TextThemeStyle.TITLE_LARGE)



    async def set_value(e):

        await storage.set(key.value, value.value)

        result.value = "Value saved"



    async def get_value(e):

        result.value = await storage.get(key.value)



    async def remove_value(e):

        await storage.remove(key.value)

        result.value = "Value removed"



    async def clear_storage(e):

        await storage.clear()

        result.value = "Storage cleared"



    async def contains_key(e):

        exists = await storage.contains_key(key.value)

        result.value = f"Key exists: {exists}"



    async def get_availability(e):

        is_availability = await storage.get_availability()

        page.show_dialog(

            ft.SnackBar(

                content=ft.Text(

                    value=f"Protected data available: {is_availability}"

                    if is_availability

                    else "Protected data available: None"

                )

            )

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        alignment=ft.MainAxisAlignment.CENTER,

                        horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                        spacing=10,

                        controls=[

                            result,

                            key,

                            value,

                            ft.Row(

                                width=300,

                                wrap=True,

                                controls=[

                                    ft.Button("Set", on_click=set_value),

                                    ft.Button("Get", on_click=get_value),

                                    ft.Button("Contains key", on_click=contains_key),

                                    ft.Button("Remove", on_click=remove_value),

                                    ft.Button("Clear", on_click=clear_storage),

                                    ft.Button(

                                        "Check Data Availability",

                                        on_click=get_availability,

                                    ),

                                ],

                            ),

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

A class to manage secure storage in a Flet application across multiple platforms.

Inherits: Service

Properties
android_options - Android-specific configuration for secure storage.
ios_options - iOS-specific configuration for secure storage.
macos_options - macOS-specific configuration for secure storage.
web_options - Web-specific configuration for secure storage.
windows_options - Windows-specific configuration for secure storage.
Events
on_change - Fires when secure storage availability changes.
Methods
clear - Clears all key-value pairs from secure storage.
contains_key - Checks whether the given key exists in secure storage.
get - Retrieves the value stored under the given key in secure storage.
get_all - Retrieves all key-value pairs from secure storage.
get_availability - Gets the current availability status of secure storage.
remove - Removes the value stored under the given key in secure storage.
set - Stores a value in secure storage under the given key.
Properties​
build
android_options
class-attribute
instance-attribute
​
Copy
android_options: AndroidOptions = field(
    default_factory=lambda: AndroidOptions()
)

Android-specific configuration for secure storage.

build
ios_options
class-attribute
instance-attribute
​
Copy
ios_options: IOSOptions = field(
    default_factory=lambda: IOSOptions()
)

iOS-specific configuration for secure storage.

build
macos_options
class-attribute
instance-attribute
​
Copy
macos_options: MacOsOptions = field(
    default_factory=lambda: MacOsOptions()
)

macOS-specific configuration for secure storage.

build
web_options
class-attribute
instance-attribute
​
Copy
web_options: WebOptions = field(
    default_factory=lambda: WebOptions()
)

Web-specific configuration for secure storage.

build
windows_options
class-attribute
instance-attribute
​
Copy
windows_options: WindowsOptions = field(
    default_factory=lambda: WindowsOptions()
)

Windows-specific configuration for secure storage.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: EventHandler[SecureStorageEvent] | None = None

Fires when secure storage availability changes.

iOS only feature. For unsupported platforms, this event will never fire. The payload is a SecureStorageEvent object with the available field.

Methods​
deployed_code
clear
async
​
Copy
clear(
    web: WebOptions | None = None,
    ios: IOSOptions | None = None,
    macos: MacOsOptions | None = None,
    android: AndroidOptions | None = None,
    windows: WindowsOptions | None = None,
) -> None

Clears all key-value pairs from secure storage.

Parameters:

web (WebOptions | None, default: None) - Optional web-specific configuration.
ios (IOSOptions | None, default: None) - Optional iOS-specific configuration.
macos (MacOsOptions | None, default: None) - Optional macOS-specific configuration.
android (AndroidOptions | None, default: None) - Optional Android-specific configuration.
windows (WindowsOptions | None, default: None) - Optional Windows-specific configuration.
deployed_code
contains_key
async
​
Copy
contains_key(
    key: str,
    web: WebOptions | None = None,
    ios: IOSOptions | None = None,
    macos: MacOsOptions | None = None,
    android: AndroidOptions | None = None,
    windows: WindowsOptions | None = None,
) -> bool

Checks whether the given key exists in secure storage.

Parameters:

key (str) - The key to check.
web (WebOptions | None, default: None) - Optional web-specific configuration.
ios (IOSOptions | None, default: None) - Optional iOS-specific configuration.
macos (MacOsOptions | None, default: None) - Optional macOS-specific configuration.
android (AndroidOptions | None, default: None) - Optional Android-specific configuration.
windows (WindowsOptions | None, default: None) - Optional Windows-specific configuration.

Returns:

bool - True if the key exists, False otherwise.
deployed_code
get
async
​
Copy
get(
    key: str,
    web: WebOptions | None = None,
    ios: IOSOptions | None = None,
    macos: MacOsOptions | None = None,
    android: AndroidOptions | None = None,
    windows: WindowsOptions | None = None,
) -> str | None

Retrieves the value stored under the given key in secure storage.

Parameters:

key (str) - The key to retrieve.
web (WebOptions | None, default: None) - Optional web-specific configuration.
ios (IOSOptions | None, default: None) - Optional iOS-specific configuration.
macos (MacOsOptions | None, default: None) - Optional macOS-specific configuration.
android (AndroidOptions | None, default: None) - Optional Android-specific configuration.
windows (WindowsOptions | None, default: None) - Optional Windows-specific configuration.

Returns:

str | None - The stored string value, or None if the key does not exist.
deployed_code
get_all
async
​
Copy
get_all(
    web: WebOptions | None = None,
    ios: IOSOptions | None = None,
    macos: MacOsOptions | None = None,
    android: AndroidOptions | None = None,
    windows: WindowsOptions | None = None,
) -> dict[str, str]

Retrieves all key-value pairs from secure storage.

Parameters:

web (WebOptions | None, default: None) - Optional web-specific configuration.
ios (IOSOptions | None, default: None) - Optional iOS-specific configuration.
macos (MacOsOptions | None, default: None) - Optional macOS-specific configuration.
android (AndroidOptions | None, default: None) - Optional Android-specific configuration.
windows (WindowsOptions | None, default: None) - Optional Windows-specific configuration.

Returns:

dict[str, str] - A dictionary with all stored key-value pairs.
deployed_code
get_availability
async
​
Copy
get_availability() -> bool | None

Gets the current availability status of secure storage.

iOS and macOS only. On macOS, available only on macOS 12+. On older macOS versions, always returns True. On unsupported platforms, returns None.

Returns:

bool | None - A boolean indicating storage availability, or None if unsupported.
deployed_code
remove
async
​
Copy
remove(
    key: str,
    web: WebOptions | None = None,
    ios: IOSOptions | None = None,
    macos: MacOsOptions | None = None,
    android: AndroidOptions | None = None,
    windows: WindowsOptions | None = None,
) -> None

Removes the value stored under the given key in secure storage.

Parameters:

key (str) - The key to remove.
web (WebOptions | None, default: None) - Optional web-specific configuration.
ios (IOSOptions | None, default: None) - Optional iOS-specific configuration.
macos (MacOsOptions | None, default: None) - Optional macOS-specific configuration.
android (AndroidOptions | None, default: None) - Optional Android-specific configuration.
windows (WindowsOptions | None, default: None) - Optional Windows-specific configuration.
deployed_code
set
async
​
Copy
set(
    key: str,
    value: Any,
    web: WebOptions | None = None,
    ios: IOSOptions | None = None,
    macos: MacOsOptions | None = None,
    android: AndroidOptions | None = None,
    windows: WindowsOptions | None = None,
) -> None

Stores a value in secure storage under the given key.

Parameters:

key (str) - The key to store the value under.
value (Any) - The value to store (cannot be None).
web (WebOptions | None, default: None) - Optional web-specific configuration.
ios (IOSOptions | None, default: None) - Optional iOS-specific configuration.
macos (MacOsOptions | None, default: None) - Optional macOS-specific configuration.
android (AndroidOptions | None, default: None) - Optional Android-specific configuration.
windows (WindowsOptions | None, default: None) - Optional Windows-specific configuration.

Raises:

ValueError - If value is None.
Edit this page