# PermissionHandler
URL: https://flet.dev/docs/services/permissionhandler/

ReferenceServicesPermissionHandler
Permission Handler

Helps manage runtime permissions in your Flet apps.

It is powered by the Flutter permission_handler package.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	❌	❌	✅	✅	✅
Usage​

Add flet-permission-handler to your project dependencies:

uv
pip
uv add flet-permission-handler

NOTE

On mobile platforms you must also declare permissions in the native project files. See Flet publish docs.

Requirements​

While the permissions are being requested during runtime, you'll still need to tell the OS which permissions your app might potentially use.

Android​

See:

full list of Android permissions
Permission enum, which lists all the supported permissions
setting Android permissions
iOS​

See:

Permission enum, which lists all the supported permissions and their Info.plist keys
setting iOS permissions
Example​
import flet as ft

import flet_permission_handler as fph





def main(page: ft.Page):

    page.appbar = ft.AppBar(title="PermissionHandler Playground")



    def show_snackbar(message: str):

        page.show_dialog(ft.SnackBar(ft.Text(message)))



    async def get_permission_status(e: ft.Event[ft.OutlinedButton]):

        status = await ph.get_status(fph.Permission.MICROPHONE)

        show_snackbar(f"Microphone permission status: {status.name}")



    async def request_permission(e: ft.Event[ft.OutlinedButton]):

        status = await ph.request(fph.Permission.MICROPHONE)

        show_snackbar(f"Requested microphone permission: {status.name}")



    async def open_app_settings(e: ft.Event[ft.OutlinedButton]):

        show_snackbar("Opening app settings...")

        await ph.open_app_settings()



    ph = fph.PermissionHandler()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.OutlinedButton("Open app settings", on_click=open_app_settings),

                    ft.OutlinedButton(

                        "Request Microphone permission", on_click=request_permission

                    ),

                    ft.OutlinedButton(

                        "Get Microphone permission status",

                        on_click=get_permission_status,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

Manages permissions for the application.

PLATFORM SUPPORT

Currently only supported on Android, iOS, Windows, and Web platforms.

Raises:

FletUnsupportedPlatformException - If the platform is not supported.

Inherits: Service

Methods
get_status - Gets the current status of the given permission.
open_app_settings - Opens the app settings page.
request - Request the user for access to the permission if access hasn't already been granted access before.
Methods​
deployed_code
get_status
async
​
Copy
get_status(
    permission: Permission,
) -> PermissionStatus | None

Gets the current status of the given permission.

Parameters:

permission (Permission) - The Permission to check the status for.

Returns:

PermissionStatus | None - A PermissionStatus if the status is known, otherwise None.
deployed_code
open_app_settings
async
​
Copy
open_app_settings() -> bool

Opens the app settings page.

Returns:

bool - True if the app settings page could be opened, otherwise False.
deployed_code
request
async
​
Copy
request(
    permission: Permission,
) -> PermissionStatus | None

Request the user for access to the permission if access hasn't already been granted access before.

Parameters:

permission (Permission) - The Permission to request.

Returns:

PermissionStatus | None - The new PermissionStatus after the request, or None if the request was not successful.
Edit this page