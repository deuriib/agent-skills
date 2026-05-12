# StoragePaths
URL: https://flet.dev/docs/services/storagepaths

ReferenceServicesStoragePaths
StoragePaths

Provides access to commonly used storage paths on the device.

NOTE

Its methods are not supported in web mode.

Inherits: Service

Methods
get_application_cache_directory - Returns the path to the application-specific cache directory.
get_application_documents_directory - Returns the path to a directory for user-generated data.
get_application_support_directory - Returns the path to a directory for application support files.
get_console_log_filename - Returns the path to a console.log file for debugging.
get_downloads_directory - Returns the path to the downloads directory.
get_external_cache_directories - Returns paths to external cache directories.
get_external_storage_directories - Returns paths to external storage directories.
get_external_storage_directory - Returns the path to the top-level external storage directory.
get_library_directory - Returns the path to the library directory.
get_temporary_directory - Returns the path to the temporary directory.
Examples​
Basic Example​
import flet as ft





async def main(page: ft.Page):

    storage_paths = ft.StoragePaths()



    items = []

    for label, method in [

        ("Application cache directory", storage_paths.get_application_cache_directory),

        (

            "Application documents directory",

            storage_paths.get_application_documents_directory,

        ),

        (

            "Application support directory",

            storage_paths.get_application_support_directory,

        ),

        ("Downloads directory", storage_paths.get_downloads_directory),

        ("External cache directories", storage_paths.get_external_cache_directories),

        (

            "External storage directories",

            storage_paths.get_external_storage_directories,

        ),

        ("Library directory", storage_paths.get_library_directory),

        ("External storage directory", storage_paths.get_external_storage_directory),

        ("Temporary directory", storage_paths.get_temporary_directory),

        ("Console log filename", storage_paths.get_console_log_filename),

    ]:

        try:

            value = await method()

        except ft.FletUnsupportedPlatformException as e:

            value = f"Not supported: {e}"

        except Exception as e:

            value = f"Error: {e}"

        else:

            if isinstance(value, list):

                value = ", ".join(value)

            elif value is None:

                value = "Unavailable"



        items.append(

            ft.Text(

                spans=[

                    ft.TextSpan(

                        f"{label}: ", style=ft.TextStyle(weight=ft.FontWeight.BOLD)

                    ),

                    ft.TextSpan(value),

                ]

            )

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[ft.Column(items, spacing=5)],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
get_application_cache_directory
async
​
Copy
get_application_cache_directory() -> str

Returns the path to the application-specific cache directory.

If this directory does not exist, it is created automatically.

Returns:

str - The path to a directory where the application may place cache files.

Raises:

FletUnsupportedPlatformException - If called on the web platform.
deployed_code
get_application_documents_directory
async
​
Copy
get_application_documents_directory() -> str

Returns the path to a directory for user-generated data.

This directory is intended for data that cannot be recreated by your application.

For non-user-generated data, consider using:

get_application_support_directory
get_application_cache_directory
get_external_storage_directory

Raises:

FletUnsupportedPlatformException - If called on the web platform.

Returns:

str - The path to the application documents directory.
deployed_code
get_application_support_directory
async
​
Copy
get_application_support_directory() -> str

Returns the path to a directory for application support files.

This directory is created automatically if it does not exist. Use this for files not exposed to the user. Do not use for user data files.

Raises:

FletUnsupportedPlatformException - If called on the web platform.

Returns:

str - The path to the application support directory.
deployed_code
get_console_log_filename
async
​
Copy
get_console_log_filename() -> str

Returns the path to a console.log file for debugging.

This file is located in the StoragePaths.get_application_cache_directory.

Raises:

FletUnsupportedPlatformException - If called on the web platform.

Returns:

str - The path to the console log file.
deployed_code
get_downloads_directory
async
​
Copy
get_downloads_directory() -> str | None

Returns the path to the downloads directory.

The returned directory may not exist; clients should verify and create it if necessary.

Raises:

FletUnsupportedPlatformException - If called on the web platform.

Returns:

str | None - The path to the downloads directory, or None if unavailable.
deployed_code
get_external_cache_directories
async
​
Copy
get_external_cache_directories() -> list[str] | None

Returns paths to external cache directories.

These directories are typically on external storage (e.g., SD cards). Multiple directories may be available on some devices.

Raises:

FletUnsupportedPlatformException - If called on the web or non-Android platforms.

Returns:

list[str] | None - A List of external cache directory paths, or None if unavailable.
deployed_code
get_external_storage_directories
async
​
Copy
get_external_storage_directories() -> list[str] | None

Returns paths to external storage directories.

These directories are typically on external storage (e.g., SD cards). Multiple directories may be available on some devices.

Raises:

FletUnsupportedPlatformException - If called on the web or non-Android platforms.

Returns:

list[str] | None - A List of external storage directory paths, or None if unavailable.
deployed_code
get_external_storage_directory
async
​
Copy
get_external_storage_directory() -> str | None

Returns the path to the top-level external storage directory.

Raises:

FletUnsupportedPlatformException - If called on the web or non-Android platforms.

Returns:

str | None - The path to the external storage directory, or None if unavailable.
deployed_code
get_library_directory
async
​
Copy
get_library_directory() -> str

Returns the path to the library directory.

This directory is for persistent, backed-up files not visible to the user (e.g., sqlite.db).

Raises:

FletUnsupportedPlatformException - If called on the web or non-Apple platforms.

Returns:

str - The path to the library directory.
deployed_code
get_temporary_directory
async
​
Copy
get_temporary_directory() -> str

Returns the path to the temporary directory.

This directory is not backed up and is suitable for storing caches of downloaded files. Files may be cleared at any time. The caller is responsible for managing files within this directory.

Raises:

FletUnsupportedPlatformException - If called on the web platform.

Returns:

str - The path to the temporary directory.
Edit this page