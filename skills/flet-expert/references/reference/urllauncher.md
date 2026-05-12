# UrlLauncher
URL: https://flet.dev/docs/services/urllauncher

ReferenceServicesUrlLauncher
UrlLauncher

Provides access to URL launching capabilities.

Inherits: Service

Methods
can_launch_url - Checks whether the specified URL can be handled by some app installed on the device.
close_in_app_web_view - Closes the in-app web view if it is currently open.
launch_url - Opens a web browser or in-app view to a given url.
open_window - Opens a popup browser window in web environments.
supports_close_for_launch_mode - Checks whether close_in_app_web_view is supported for a launch mode.
supports_launch_mode - Checks whether the specified launch mode is supported.
Examples​
Basic Example​
import flet as ft





async def main(page: ft.Page):

    url_launcher = ft.UrlLauncher()



    url = ft.TextField(label="URL to open", value="https://flet.dev", expand=True)

    status = ft.Text()



    async def can_launch():

        can = await url_launcher.can_launch_url(url.value)

        status.value = f"Can launch: {can}"



    async def launch_default():

        await url_launcher.launch_url(url.value)



    async def launch_in_app_webview():

        await url_launcher.launch_url(

            url.value,

            mode=ft.LaunchMode.IN_APP_WEB_VIEW,

            web_view_configuration=ft.WebViewConfiguration(

                enable_javascript=True, enable_dom_storage=True

            ),

        )



    async def launch_in_app_browser_view():

        await url_launcher.launch_url(

            url.value,

            mode=ft.LaunchMode.IN_APP_BROWSER_VIEW,

            browser_configuration=ft.BrowserConfiguration(show_title=True),

        )



    async def launch_external():

        await url_launcher.launch_url(

            url.value,

            mode=ft.LaunchMode.EXTERNAL_APPLICATION,

            web_only_window_name="_blank",

        )



    async def launch_popup():

        await url_launcher.open_window(

            url.value, title="Flet popup", width=480, height=640

        )



    async def close_webview(_):

        supported = await url_launcher.supports_close_for_launch_mode(

            ft.LaunchMode.IN_APP_WEB_VIEW

        )

        if supported:

            await url_launcher.close_in_app_web_view()

        else:

            status.value = "Close in-app web view not supported on this platform"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        [

                            url,

                            ft.Row(

                                [

                                    ft.Button("Launch URL", on_click=launch_default),

                                    ft.Button(

                                        "Launch in-app webview",

                                        on_click=launch_in_app_webview,

                                    ),

                                    ft.Button(

                                        "Launch in-app browser view",

                                        on_click=launch_in_app_browser_view,

                                    ),

                                    ft.Button(

                                        "Launch external/new tab",

                                        on_click=launch_external,

                                    ),

                                    ft.Button(

                                        "Open popup window (web)", on_click=launch_popup

                                    ),

                                    ft.Button("Can launch?", on_click=can_launch),

                                    ft.Button(

                                        "Close in-app webview", on_click=close_webview

                                    ),

                                ],

                                wrap=True,

                            ),

                            status,

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
can_launch_url
async
​
Copy
can_launch_url(url: str | Url) -> bool

Checks whether the specified URL can be handled by some app installed on the device.

Parameters:

url (str | Url) - The URL to check.

Returns:

bool - True if it is possible to verify that there is a handler available. False if there is no handler available, or the application does not have permission to check. For example: - On recent versions of Android and iOS, this will always return False unless the application has been configuration to allow querying the system for launch support. - On web, this will always return False except for a few specific schemes that are always assumed to be supported (such as http(s)), as web pages are never allowed to query installed applications.
deployed_code
close_in_app_web_view
async
​
Copy
close_in_app_web_view()

Closes the in-app web view if it is currently open.

deployed_code
launch_url
async
​
Copy
launch_url(
    url: str | Url,
    mode: LaunchMode = LaunchMode.PLATFORM_DEFAULT,
    web_view_configuration: WebViewConfiguration
    | None = None,
    browser_configuration: BrowserConfiguration
    | None = None,
    web_only_window_name: str | None = None,
)

Opens a web browser or in-app view to a given url.

Parameters:

url (str | Url) - The URL to open.
mode (LaunchMode, default: LaunchMode.PLATFORM_DEFAULT) - Preferred launch mode for opening the URL.
web_view_configuration (WebViewConfiguration | None, default: None) - Optional configuration for in-app web views.
browser_configuration (BrowserConfiguration | None, default: None) - Optional configuration for in-app browser views.
web_only_window_name (str | None, default: None) - Window name for web-only launches.
deployed_code
open_window
async
​
Copy
open_window(
    url: str | Url,
    title: str | None = None,
    width: float | None = None,
    height: float | None = None,
)

Opens a popup browser window in web environments.

Parameters:

url (str | Url) - The URL to open in the popup window.
title (str | None, default: None) - The popup window title.
width (float | None, default: None) - Desired popup width in logical pixels.
height (float | None, default: None) - Desired popup height in logical pixels.
deployed_code
supports_close_for_launch_mode
async
​
Copy
supports_close_for_launch_mode(
    mode: LaunchMode,
) -> bool

Checks whether close_in_app_web_view is supported for a launch mode.

Parameters:

mode (LaunchMode) - Launch mode to verify close support for.

Returns:

bool - True if closing an in-app web view is supported; otherwise False.
deployed_code
supports_launch_mode
async
​
Copy
supports_launch_mode(mode: LaunchMode) -> bool

Checks whether the specified launch mode is supported.

Parameters:

mode (LaunchMode) - Launch mode to verify.

Returns:

bool - True if the launch mode is supported by the platform; otherwise False.
Edit this page