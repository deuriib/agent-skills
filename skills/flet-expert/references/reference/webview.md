# WebView
URL: https://flet.dev/docs/controls/webview/

ReferenceControlsWebView
WebView

Display web content in a WebView to be shown in your Flet apps.

It is powered by the webview_flutter and webview_flutter_web Flutter packages.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	❌	✅	❌	✅	✅	✅
Usage​

Add flet-webview to your project dependencies:

uv
pip
uv add flet-webview

Example​
import flet as ft

import flet_webview as fwv





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=fwv.WebView(

                url="https://flet.dev",

                on_page_started=lambda _: print("Page started"),

                on_page_ended=lambda _: print("Page ended"),

                on_web_resource_error=lambda e: print("WebView error:", e.data),

                expand=True,

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Troubleshooting​
NET::ERR_CLEARTEXT_NOT_PERMITTED Error​

If you run into the NET::ERR_CLEARTEXT_NOT_PERMITTED error in Android, then the app you’re using is trying to access a web page that wants to transmit cleartext or unsecured information. Android blocks apps from doing this in order to avoid compromising user data.

For more details, see this and this.

To fix it, your app's configuration (precisely, the manifest application attributes) needs to be modified as follows:

pyproject.toml
[tool.flet.android.manifest_application]

usesCleartextTraffic = "true"

Description​

Easily load webpages while allowing user interaction.

NOTE

Supported only on the following platforms: iOS, Android, macOS, and Web. Concerning Windows and Linux support, subscribe to this issue.

Inherits: LayoutControl

Properties
bgcolor - Defines the background color of the WebView.
prevent_links - List of url-prefixes that should not be followed/loaded/downloaded.
url - The URL of the web page to load.
Events
on_console_message - Fires when a log message is written to the JavaScript console.
on_javascript_alert_dialog - Fires when the web page attempts to display a JavaScript alert() dialog.
on_page_ended - Fires when all the webview page loading processes are ended.
on_page_started - Fires soon as the first loading process of the webview page is started.
on_progress - Fires when the progress of the webview page loading is changed.
on_scroll - Fires when the web page's scroll position changes.
on_url_change - Fires when the URL of the webview page is changed.
on_web_resource_error - Fires when there is error with loading a webview page resource.
Methods
can_go_back - Whether there's a back history item.
can_go_forward - Whether there's a forward history item.
clear_cache - Clears all caches used by the WebView.
clear_local_storage - Clears the local storage used by the WebView.
disable_zoom - Disables zooming using the on-screen zoom controls and gestures.
enable_zoom - Enables zooming using the on-screen zoom controls and gestures.
get_current_url - Gets the current URL that the WebView is displaying or None if no URL was ever loaded.
get_title - Get the title of the currently loaded page.
get_user_agent - Get the value used for the HTTP User-Agent: request header.
go_back - Goes back in the history of the webview, if can_go_back() is True.
go_forward - Goes forward in the history of the webview, if can_go_forward is True.
load_file - Loads the provided local file.
load_html - Loads the provided HTML string.
load_request - Makes an HTTP request and loads the response in the webview.
reload - Reloads the current URL.
run_javascript - Runs the given JavaScript in the context of the current page.
scroll_by - Scrolls by the provided number of webview pixels.
scroll_to - Scrolls to the provided position of webview pixels.
set_javascript_mode - Sets the JavaScript mode of the WebView.
Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Defines the background color of the WebView.

build
prevent_links
class-attribute
instance-attribute
​
Copy
prevent_links: list[str] | None = None

List of url-prefixes that should not be followed/loaded/downloaded.

build
url
class-attribute
instance-attribute
​
Copy
url: str | None = None

The URL of the web page to load.

Events​
bolt
on_console_message
class-attribute
instance-attribute
​
Copy
on_console_message: (
    EventHandler[WebViewConsoleMessageEvent] | None
) = None

Fires when a log message is written to the JavaScript console.

NOTE

Works only on the following platforms: iOS, Android and macOS.

bolt
on_javascript_alert_dialog
class-attribute
instance-attribute
​
Copy
on_javascript_alert_dialog: (
    EventHandler[WebViewJavaScriptEvent] | None
) = None

Fires when the web page attempts to display a JavaScript alert() dialog.

NOTE

Works only on the following platforms: iOS, Android and macOS.

bolt
on_page_ended
class-attribute
instance-attribute
​
Copy
on_page_ended: ControlEventHandler[WebView] | None = None

Fires when all the webview page loading processes are ended.

The data property of the event handler argument is of type str and contains the URL.

NOTE

Works only on the following platforms: iOS, Android and macOS.

bolt
on_page_started
class-attribute
instance-attribute
​
Copy
on_page_started: ControlEventHandler[WebView] | None = (
    None
)

Fires soon as the first loading process of the webview page is started.

The data property of the event handler argument is of type str and contains the URL.

NOTE

Works only on the following platforms: iOS, Android and macOS.

bolt
on_progress
class-attribute
instance-attribute
​
Copy
on_progress: ControlEventHandler[WebView] | None = None

Fires when the progress of the webview page loading is changed.

The data property of the event handler argument is of type int and contains the progress value.

NOTE

Works only on the following platforms: iOS, Android and macOS.

bolt
on_scroll
class-attribute
instance-attribute
​
Copy
on_scroll: EventHandler[WebViewScrollEvent] | None = None

Fires when the web page's scroll position changes.

NOTE

Works only on the following platforms: iOS and Android.

bolt
on_url_change
class-attribute
instance-attribute
​
Copy
on_url_change: ControlEventHandler[WebView] | None = None

Fires when the URL of the webview page is changed.

The data property of the event handler argument is of type str and contains the new URL.

NOTE

Works only on the following platforms: iOS, Android and macOS.

bolt
on_web_resource_error
class-attribute
instance-attribute
​
Copy
on_web_resource_error: (
    ControlEventHandler[WebView] | None
) = None

Fires when there is error with loading a webview page resource.

The data property of the event handler argument is of type str and contains the error message.

NOTE

Works only on the following platforms: iOS, Android and macOS.

Methods​
deployed_code
can_go_back
async
​
Copy
can_go_back() -> bool

Whether there's a back history item.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Returns:

bool - True if there is a back history item, False otherwise.
deployed_code
can_go_forward
async
​
Copy
can_go_forward() -> bool

Whether there's a forward history item.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Returns:

bool - True if there is a forward history item, False otherwise.
deployed_code
clear_cache
async
​
Copy
clear_cache()

Clears all caches used by the WebView.

The following caches are cleared:

Browser HTTP Cache
Cache API caches. Service workers tend to use this cache.
Application cache
NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
clear_local_storage
async
​
Copy
clear_local_storage()

Clears the local storage used by the WebView.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
disable_zoom
async
​
Copy
disable_zoom()

Disables zooming using the on-screen zoom controls and gestures.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
enable_zoom
async
​
Copy
enable_zoom()

Enables zooming using the on-screen zoom controls and gestures.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
get_current_url
async
​
Copy
get_current_url() -> str | None

Gets the current URL that the WebView is displaying or None if no URL was ever loaded.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Returns:

str | None - The current URL that the WebView is displaying or None if no URL was ever loaded.
deployed_code
get_title
async
​
Copy
get_title() -> str | None

Get the title of the currently loaded page.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Returns:

str | None - The title of the currently loaded page.
deployed_code
get_user_agent
async
​
Copy
get_user_agent() -> str | None

Get the value used for the HTTP User-Agent: request header.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Returns:

str | None - The value used for the HTTP User-Agent: request header.
deployed_code
go_back
async
​
Copy
go_back()

Goes back in the history of the webview, if can_go_back() is True.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
go_forward
async
​
Copy
go_forward()

Goes forward in the history of the webview, if can_go_forward is True.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
load_file
async
​
Copy
load_file(path: str)

Loads the provided local file.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Parameters:

path (str) - The absolute path to the file.
deployed_code
load_html
async
​
Copy
load_html(
    value: str, base_url: str | None = None
) -> Self

Loads the provided HTML string.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Parameters:

value (str) - The HTML string to load.
base_url (str | None, default: None) - The base URL to use when resolving relative URLs within the value.
deployed_code
load_request
async
​
Copy
load_request(
    url: str, method: RequestMethod = RequestMethod.GET
)

Makes an HTTP request and loads the response in the webview.

Parameters:

url (str) - The URL to load.
method (RequestMethod, default: RequestMethod.GET) - The HTTP method to use.
NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
reload
async
​
Copy
reload()

Reloads the current URL.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
run_javascript
async
​
Copy
run_javascript(value: str)

Runs the given JavaScript in the context of the current page.

Parameters:

value (str) - The JavaScript code to run.
NOTE

Works only on the following platforms: iOS, Android, and macOS.

deployed_code
scroll_by
async
​
Copy
scroll_by(x: int, y: int)

Scrolls by the provided number of webview pixels.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Parameters:

x (int) - The number of pixels to scroll by on the x-axis.
y (int) - The number of pixels to scroll by on the y-axis.
deployed_code
scroll_to
async
​
Copy
scroll_to(x: int, y: int)

Scrolls to the provided position of webview pixels.

NOTE

Works only on the following platforms: iOS, Android, and macOS.

Parameters:

x (int) - The x-coordinate of the scroll position.
y (int) - The y-coordinate of the scroll position.
deployed_code
set_javascript_mode
async
​
Copy
set_javascript_mode(mode: JavaScriptMode)

Sets the JavaScript mode of the WebView.

NOTE
Works only on the following platforms: iOS, Android, and macOS.
Disabling the JavaScript execution on the page may result to unexpected web page behaviour.

Parameters:

mode (JavaScriptMode) - The JavaScript mode to set.
Edit this page