# Page
URL: https://flet.dev/docs/controls/page

ReferenceControlsPage
Page

Page is a container for View controls.

A page instance and the root view are automatically created when a new user session started.

Inherits: BasePage

Properties
auth - The current authorization context, or None if the user is not authorized.
browser_context_menu 
deprecated
 - The BrowserContextMenu service for the current page.
client_ip - IP address of the connected user.
client_user_agent - Browser details of the connected user.
clipboard 
deprecated
 - The Clipboard service for the current page.
debug - True if Flutter client of Flet app is running in debug mode.
executor - The executor for the current page.
fonts - Defines the custom fonts to be used in the application.
loop - The event loop for the current page.
multi_view - True if the application is running with multi-view support.
multi_views - The list of multi-views associated with this page.
name - The name of the current page.
platform - The operating system the application is running on.
platform_brightness - The current brightness mode of the host platform.
pubsub - The PubSub client for the current page.
pwa - True if the application is running as Progressive Web App (PWA).
pyodide - True if the application is running in Pyodide (WebAssembly) mode.
query - The query parameters of the current page.
route - Gets current app route.
session - The session that this page belongs to.
shared_preferences 
deprecated
 - The SharedPreferences service for the current page.
storage_paths 
deprecated
 - The StoragePaths service for the current page.
test - True if the application is running with test mode.
url - The URL of the current page.
url_launcher 
deprecated
 - The UrlLauncher service for the current page.
wasm - True if the application is running in WebAssembly (WASM) mode.
web - True if the application is running in the web browser.
window - Provides properties/methods/events to monitor and control the app's native OS window.
Events
on_app_lifecycle_state_change - Called when app lifecycle state changes.
on_close - Called when a session has expired after configured amount of time (60 minutes by default).
on_connect - Called when a web user (re-)connects to a page session.
on_disconnect - Called when a web user disconnects from a page session, i.e.
on_error - Called when unhandled exception occurs.
on_keyboard_event - Called when a keyboard key is pressed.
on_locale_change - Called when the locale preferences/settings of the host platform have changed.
on_login - Called upon successful or failed OAuth authorization flow.
on_logout - Called after page.logout() call.
on_multi_view_add - TBD
on_multi_view_remove - TBD
on_platform_brightness_change - Called when brightness of app host platform has changed.
on_route_change - Called when page route changes either programmatically, by editing application URL or using browser Back/Forward buttons.
on_view_pop - Called when the user clicks automatic "Back" button in AppBar control.
on_views_pop_until - Called when pop_views_until reaches the destination view.
Methods
before_event
can_launch_url 
deprecated
 - Checks whether the specified URL can be handled by some app installed on the device.
close_in_app_web_view 
deprecated
 - Closes in-app web view opened with launch_url().
error - Report an application error to the current session/client.
get_control - Get a control by its id.
get_device_info - Returns device information.
get_upload_url - Generates presigned upload URL for built-in upload storage:
go 
deprecated
 - A helper method that updates page.route, calls page.on_route_change event handler to update views and finally calls page.update().
launch_url 
deprecated
 - Opens a web browser or popup window to a given url.
login - Starts OAuth flow.
logout - Clears current authentication context.
navigate - Navigate to a new route (sync convenience wrapper).
pop_views_until - Pops views from the navigation stack until a view with the given route is found, then delivers result via the on_views_pop_until event.
push_route - Pushes a new navigation route to the browser history stack.
render - Render a component tree into controls of the root view.
render_views - Render a component tree as the full list of page views.
run_task - Run handler coroutine as a new Task in the event loop associated with the current page.
run_thread - Run handler function as a new Thread in the executor associated with the current page.
schedule_update - Queue this page for a deferred batched update.
set_allowed_device_orientations - Constrains the allowed orientations for the app when running on a mobile device.
update - Push pending state changes to the client.
Examples​
Listening to keyboard events​
import flet as ft





class ButtonControl(ft.Container):

    def __init__(self, text):

        super().__init__()

        self.content: ft.Text = ft.Text(text)

        self.border = ft.Border.all(1, ft.Colors.BLACK_54)

        self.border_radius = 3

        self.bgcolor = "0x09000000"

        self.padding = 10

        self.visible = False





def main(page: ft.Page):

    page.spacing = 50

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def on_keyboard(e: ft.KeyboardEvent):

        key.content.value = e.key

        key.visible = True

        shift.visible = e.shift

        ctrl.visible = e.ctrl

        alt.visible = e.alt

        meta.visible = e.meta

        page.update()



    page.on_keyboard_event = on_keyboard



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        "Press any key with a combination of CTRL, ALT, SHIFT "

                        "and META keys..."

                    ),

                    ft.Row(

                        controls=[

                            key := ButtonControl(""),

                            shift := ButtonControl("Shift"),

                            ctrl := ButtonControl("Control"),

                            alt := ButtonControl("Alt"),

                            meta := ButtonControl("Meta"),

                        ],

                        alignment=ft.MainAxisAlignment.CENTER,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Mobile device orientation configuration​

Shows how to lock your app to specific device orientations (e.g., portrait up, landscape right) and listen for orientation changes on mobile devices.

import flet as ft





def main(page: ft.Page) -> None:

    page.title = "Device orientation lock"

    page.appbar = ft.AppBar(

        title=ft.Text("Device orientation Playground"),

        center_title=True,

        bgcolor=ft.Colors.BLUE,

    )



    def handle_media_change(e: ft.PageMediaData) -> None:

        page.show_dialog(

            ft.SnackBar(

                f"I see you rotated the device to {e.orientation.name} orientation. 👀",

                action="Haha!",

                duration=ft.Duration(seconds=3),

            )

        )



    page.on_media_change = handle_media_change



    async def on_checkbox_change(e: ft.Event[ft.Checkbox]) -> None:

        # get selection

        selected = [o for o, checkbox in checkboxes.items() if checkbox.value]

        # apply selection

        await page.set_allowed_device_orientations(selected)



    checkboxes: dict[ft.DeviceOrientation, ft.Checkbox] = {

        orientation: ft.Checkbox(

            label=orientation.name,

            value=True,

            on_change=on_checkbox_change,

            disabled=not page.platform.is_mobile(),  # disabled on non-mobile platforms

        )

        for orientation in list(ft.DeviceOrientation)

    }



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        spans=[

                            # shown only on mobile platforms

                            ft.TextSpan(

                                "Select the orientations that should remain enabled "

                                "for the app. "

                                "If no orientation is selected, "

                                "the system defaults will be used.",

                                visible=page.platform.is_mobile(),

                            ),

                            # shown only on non-mobile platforms

                            ft.TextSpan(

                                "Please open this example on a mobile device instead.",

                                visible=not page.platform.is_mobile(),

                                style=ft.TextStyle(weight=ft.FontWeight.BOLD),

                            ),

                        ],

                    ),

                    ft.Column(controls=list(checkboxes.values())),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

App exit confirmation​
import flet as ft





def main(page: ft.Page):

    def window_event(e: ft.WindowEvent):

        if e.type == ft.WindowEventType.CLOSE:

            page.show_dialog(confirm_dialog)

            page.update()



    page.window.prevent_close = True

    page.window.on_event = window_event



    async def handle_yes_click(e: ft.Event[ft.Button]):

        await page.window.destroy()



    def handle_no_click(e: ft.Event[ft.OutlinedButton]):

        page.pop_dialog()

        page.update()



    confirm_dialog = ft.AlertDialog(

        modal=True,

        title=ft.Text("Please confirm"),

        content=ft.Text("Do you really want to exit this app?"),

        actions=[

            ft.Button(content="Yes", on_click=handle_yes_click),

            ft.OutlinedButton(content="No", on_click=handle_no_click),

        ],

        actions_alignment=ft.MainAxisAlignment.END,

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        'Try exiting this app by clicking window\'s "Close" button!'

                    )

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Hidden app window on startup​

A Flet desktop app (Windows, macOS, or Linux) can start with its window hidden. This lets your app perform initial setup (for example, add content, resize or position the window) before showing it to the user.

In the example below, the window is resized and centered before becoming visible:

import asyncio



import flet as ft





async def main(page: ft.Page):

    print("Window is hidden on start. Will show after 3 seconds...")

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Hello!"),

                ]

            )

        )

    )



    # some configuration that we want to do before showing the window

    page.window.width = 300

    page.window.height = 200

    page.update()

    await page.window.center()



    # wait for 3 seconds before showing the window

    await asyncio.sleep(3)



    # show the window

    page.window.visible = True

    page.update()





if __name__ == "__main__":

    ft.run(main, view=ft.AppView.FLET_APP_HIDDEN)


If you need this feature when packaging a desktop app using flet build, see this.

Toggle semantics debugger​
import flet as ft





def main(page: ft.Page):

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def on_keyboard(e: ft.KeyboardEvent):

        if e.shift and e.key == "S":

            page.show_semantics_debugger = not page.show_semantics_debugger

            page.update()



    page.on_keyboard_event = on_keyboard



    def button_click(e: ft.Event[ft.Button]):

        counter.value = str(int(counter.value) + 1)

        page.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    counter := ft.Text("0", size=40),

                    ft.Text("Press Shift+S to toggle semantics debugger"),

                    ft.Button(

                        content="Increment number",

                        icon=ft.Icons.ADD,

                        on_click=button_click,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Get device locales​
import flet as ft





async def main(page: ft.Page):

    def format_locales(locales: list[ft.Locale]) -> str:

        """Format locale list for display."""

        return ", ".join(str(loc) for loc in locales)



    def handle_locale_change(e: ft.LocaleChangeEvent):

        page.add(ft.Text(f"Locales changed: {format_locales(e.locales)}"))



    page.on_locale_change = handle_locale_change

    page.scroll = ft.ScrollMode.AUTO

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    initial_locales = (await page.get_device_info()).locales

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(f"Initial locales: {format_locales(initial_locales)}"),

                    ft.Text(

                        "Change your system or browser language to trigger "

                        "on_locale_change.",

                        color=ft.Colors.BLUE,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
auth
property
​
Copy
auth: Authorization | None

The current authorization context, or None if the user is not authorized.

build
browser_context_menu
deprecated
property
​
DEPRECATED

Deprecated since version 0.80.0 and scheduled for removal in 0.90.0. Use BrowserContextMenu instead.

The BrowserContextMenu service for the current page.

build
client_ip
class-attribute
instance-attribute
​
Copy
client_ip: str | None = None

IP address of the connected user.

NOTE

This property is web- and read-only only.

build
client_user_agent
class-attribute
instance-attribute
​
Copy
client_user_agent: str | None = None

Browser details of the connected user.

NOTE

This property is web- and read-only only.

build
clipboard
deprecated
property
​
DEPRECATED

Deprecated since version 0.80.0 and scheduled for removal in 0.90.0. Use Clipboard instead.

The Clipboard service for the current page.

build
debug
class-attribute
instance-attribute
​
Copy
debug: bool = False

True if Flutter client of Flet app is running in debug mode.

NOTE

This property is read-only.

build
executor
property
​
Copy
executor: ThreadPoolExecutor | None

The executor for the current page.

build
fonts
class-attribute
instance-attribute
​
Copy
fonts: dict[str, str] | None = None

Defines the custom fonts to be used in the application.

Value is a dictionary, in which the keys represent the font family name used for reference and the values:

Key: The font family name used for reference.
Value: The font source, either an absolute URL or a relative path to a local asset. The following font file formats are supported .ttc, .ttf and .otf.

Usage example here.

build
loop
property
​
Copy
loop: asyncio.AbstractEventLoop

The event loop for the current page.

build
multi_view
class-attribute
instance-attribute
​
Copy
multi_view: bool = False

True if the application is running with multi-view support.

NOTE

This property is read-only.

build
multi_views
class-attribute
instance-attribute
​
Copy
multi_views: list[MultiView] = field(default_factory=list)

The list of multi-views associated with this page.

build
name
property
​
Copy
name: str

The name of the current page.

build
platform
class-attribute
instance-attribute
​
Copy
platform: PagePlatform | None = None

The operating system the application is running on.

build
platform_brightness
class-attribute
instance-attribute
​
Copy
platform_brightness: Brightness | None = None

The current brightness mode of the host platform.

NOTE

This property is read-only.

build
pubsub
property
​
Copy
pubsub: PubSubClient

The PubSub client for the current page.

build
pwa
class-attribute
instance-attribute
​
Copy
pwa: bool = False

True if the application is running as Progressive Web App (PWA).

NOTE

This property is read-only.

build
pyodide
class-attribute
instance-attribute
​
Copy
pyodide: bool = False

True if the application is running in Pyodide (WebAssembly) mode.

NOTE

This property is read-only.

build
query
property
​
Copy
query: QueryString

The query parameters of the current page.

build
route
class-attribute
instance-attribute
​
Copy
route: str = '/'

Gets current app route.

NOTE

This property is read-only.

build
session
property
​
Copy
session: Session

The session that this page belongs to.

build
shared_preferences
deprecated
property
​
DEPRECATED

Deprecated since version 0.80.0 and scheduled for removal in 0.90.0. Use SharedPreferences instead.

The SharedPreferences service for the current page.

build
storage_paths
deprecated
property
​
DEPRECATED

Deprecated since version 0.80.0 and scheduled for removal in 0.90.0. Use StoragePaths instead.

The StoragePaths service for the current page.

build
test
class-attribute
instance-attribute
​
Copy
test: bool = False

True if the application is running with test mode.

NOTE

This property is read-only.

build
url
property
​
Copy
url: str | None

The URL of the current page.

build
url_launcher
deprecated
property
​
Copy
url_launcher: UrlLauncher
DEPRECATED

Deprecated since version 0.80.0 and scheduled for removal in 0.90.0. Use UrlLauncher instead.

The UrlLauncher service for the current page.

build
wasm
class-attribute
instance-attribute
​
Copy
wasm: bool = False

True if the application is running in WebAssembly (WASM) mode.

NOTE

This property is read-only.

build
web
class-attribute
instance-attribute
​
Copy
web: bool = False

True if the application is running in the web browser.

NOTE

This property is read-only.

build
window
class-attribute
instance-attribute
​
Copy
window: Window = field(default_factory=lambda: Window())

Provides properties/methods/events to monitor and control the app's native OS window.

Events​
bolt
on_app_lifecycle_state_change
class-attribute
instance-attribute
​
Copy
on_app_lifecycle_state_change: (
    EventHandler[AppLifecycleStateChangeEvent] | None
) = None

Called when app lifecycle state changes.

bolt
on_close
class-attribute
instance-attribute
​
Copy
on_close: ControlEventHandler[Page] | None = None

Called when a session has expired after configured amount of time (60 minutes by default).

bolt
on_connect
class-attribute
instance-attribute
​
Copy
on_connect: ControlEventHandler[Page] | None = None

Called when a web user (re-)connects to a page session.

It is not triggered when an app page is first opened, but is triggered when the page is refreshed, or Flet web client has re-connected after computer was unlocked. This event could be used to detect when a web user becomes "online".

bolt
on_disconnect
class-attribute
instance-attribute
​
Copy
on_disconnect: ControlEventHandler[Page] | None = None

Called when a web user disconnects from a page session, i.e. closes browser tab/window.

bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ControlEventHandler[Page] | None = None

Called when unhandled exception occurs.

bolt
on_keyboard_event
class-attribute
instance-attribute
​
Copy
on_keyboard_event: EventHandler[KeyboardEvent] | None = None

Called when a keyboard key is pressed.

bolt
on_locale_change
class-attribute
instance-attribute
​
Copy
on_locale_change: EventHandler[LocaleChangeEvent] | None = (
    None
)

Called when the locale preferences/settings of the host platform have changed.

For example, when the user updates device language settings or browser preferred languages.

bolt
on_login
class-attribute
instance-attribute
​
Copy
on_login: EventHandler[LoginEvent] | None = None

Called upon successful or failed OAuth authorization flow.

See Authentication guide for more information and examples.

bolt
on_logout
class-attribute
instance-attribute
​
Copy
on_logout: ControlEventHandler[Page] | None = None

Called after page.logout() call.

bolt
on_multi_view_add
class-attribute
instance-attribute
​
Copy
on_multi_view_add: (
    EventHandler[MultiViewAddEvent] | None
) = None

TBD

bolt
on_multi_view_remove
class-attribute
instance-attribute
​
Copy
on_multi_view_remove: (
    EventHandler[MultiViewRemoveEvent] | None
) = None

TBD

bolt
on_platform_brightness_change
class-attribute
instance-attribute
​
Copy
on_platform_brightness_change: (
    EventHandler[PlatformBrightnessChangeEvent] | None
) = None

Called when brightness of app host platform has changed.

bolt
on_route_change
class-attribute
instance-attribute
​
Copy
on_route_change: EventHandler[RouteChangeEvent] | None = (
    None
)

Called when page route changes either programmatically, by editing application URL or using browser Back/Forward buttons.

bolt
on_view_pop
class-attribute
instance-attribute
​
Copy
on_view_pop: EventHandler[ViewPopEvent] | None = None

Called when the user clicks automatic "Back" button in AppBar control.

bolt
on_views_pop_until
class-attribute
instance-attribute
​
Copy
on_views_pop_until: (
    EventHandler[ViewsPopUntilEvent] | None
) = None

Called when pop_views_until reaches the destination view.

The event carries the result value passed by the caller.

Methods​
deployed_code
before_event
​
Copy
before_event(e: ControlEvent)
deployed_code
can_launch_url
async
deprecated
​
Copy
can_launch_url(url: str) -> bool
DEPRECATED

Deprecated since version 0.90.0. Use UrlLauncher().can_launch_url() instead.

Checks whether the specified URL can be handled by some app installed on the device.

Parameters:

url (str) - The URL to check.

Returns:

bool - True if it is possible to verify that there is a handler available. False if there is no handler available, or the application does not have permission to check. For example: - On recent versions of Android and iOS, this will always return False unless the application has been configuration to allow querying the system for launch support. - In web mode, this will always return False except for a few specific schemes that are always assumed to be supported (such as http(s)), as web pages are never allowed to query installed applications.
deployed_code
close_in_app_web_view
async
deprecated
​
Copy
close_in_app_web_view() -> None
DEPRECATED

Deprecated since version 0.90.0. Use UrlLauncher().close_in_app_web_view() instead.

Closes in-app web view opened with launch_url().

📱 Mobile only.

deployed_code
error
​
Copy
error(message: str) -> None

Report an application error to the current session/client.

Parameters:

message (str) - Error message to send.
deployed_code
get_control
​
Copy
get_control(id: int) -> BaseControl | None

Get a control by its id.

EXAMPLE
def main(page: ft.Page):

    x = ft.IconButton(ft.Icons.ADD)

    page.add(x)

    print(type(page.get_control(x._i)))

deployed_code
get_device_info
async
​
Copy
get_device_info() -> DeviceInfo | None

Returns device information.

Returns:

DeviceInfo | None - The device information object for the current platform, or None if unavailable.
deployed_code
get_upload_url
​
Copy
get_upload_url(file_name: str, expires: int) -> str

Generates presigned upload URL for built-in upload storage:

file_name - a relative to upload storage path.
expires - a URL time-to-live in seconds.
EXAMPLE
upload_url = page.get_upload_url("dir/filename.ext", 60)


To enable built-in upload storage, provide the upload_dir argument to ft.run() call:

ft.run(main, upload_dir="uploads")

deployed_code
go
deprecated
​
Copy
go(route: str, skip_route_change_event: bool = False, **kwargs: Any = {}) -> None
DEPRECATED

Deprecated since version 0.80.0 and scheduled for removal in 0.90.0. Use push_route() instead.

A helper method that updates page.route, calls page.on_route_change event handler to update views and finally calls page.update().

deployed_code
launch_url
async
deprecated
​
Copy
launch_url(
    url: str | Url,
    web_popup_window_name: str | UrlTarget | None = None,
    web_popup_window: bool = False,
    web_popup_window_width: int | None = None,
    web_popup_window_height: int | None = None,
) -> None
DEPRECATED

Deprecated since version 0.90.0. Use UrlLauncher().launch_url() instead.

Opens a web browser or popup window to a given url.

Parameters:

url (str | Url) - The URL to open.
web_popup_window_name (str | UrlTarget | None, default: None) - Window tab/name to open URL in. Use UrlTarget.SELF for the same browser tab, UrlTarget.BLANK for a new browser tab (or in external application on a mobile device), or a custom name for a named tab.
web_popup_window (bool, default: False) - Display the URL in a browser popup window.
web_popup_window_width (int | None, default: None) - Popup window width.
web_popup_window_height (int | None, default: None) - Popup window height.
deployed_code
login
async
​
Copy
login(
    provider: OAuthProvider,
    fetch_user: bool = True,
    fetch_groups: bool = False,
    scope: list[str] | None = None,
    saved_token: str | None = None,
    on_open_authorization_url: Callable[
        [str], Coroutine[Any, Any, None]
    ]
    | None = None,
    complete_page_html: str | None = None,
    redirect_to_page: bool | None = False,
    authorization: type[AT] = AuthorizationImpl,
) -> AT

Starts OAuth flow.

See Authentication guide for more information and examples.

deployed_code
logout
​
Copy
logout() -> None

Clears current authentication context. See Authentication guide for more information and examples.

deployed_code
navigate
​
Copy
navigate(route: str, **kwargs: Any = {}) -> None

Navigate to a new route (sync convenience wrapper).

Equivalent to asyncio.create_task(page.push_route(route, **kwargs)). Use this in synchronous callbacks (e.g. on_click) where awaiting is not possible.

Parameters:

route (str) - New navigation route.
**kwargs (default: {}) - Additional query string parameters to be added to the route.
deployed_code
pop_views_until
async
​
Copy
pop_views_until(route: str, result: Any = None) -> None

Pops views from the navigation stack until a view with the given route is found, then delivers result via the on_views_pop_until event.

EXAMPLE
import flet as ft





def main(page: ft.Page):

    def on_pop_result(e: ft.ViewsPopUntilEvent):

        page.show_dialog(ft.SnackBar(ft.Text(f"Result: {e.result}")))



    page.on_views_pop_until = on_pop_result



    # ... later, from a deeply nested view:

    async def go_back(ev):

        await page.pop_views_until("/", result="Done!")


Parameters:

route (str) - Target route to navigate back to. Must match the route of an existing View in views.
result (Any, default: None) - Optional value delivered to on_views_pop_until on the destination view.

Raises:

ValueError - If no view with the given route exists in views.
deployed_code
push_route
async
​
Copy
push_route(route: str, **kwargs: Any = {}) -> None

Pushes a new navigation route to the browser history stack. Changing route will fire page.on_route_change event handler.

EXAMPLE
import asyncio



import flet as ft





def main(page: ft.Page):

    page.title = "Routes Example"



    def route_change():

        page.views.clear()

        page.views.append(

            ft.View(

                route="/",

                controls=[

                    ft.AppBar(

                        title=ft.Text("Flet app"),

                    ),

                    ft.Button(

                        "Visit Store",

                        on_click=lambda: asyncio.create_task(

                            page.push_route("/store")

                        ),

                    ),

                ],

            )

        )

        if page.route == "/store":

            page.views.append(

                ft.View(

                    route="/store",

                    controls=[

                        ft.AppBar(

                            title=ft.Text("Store"),

                        ),

                        ft.Button(

                            "Go Home",

                            on_click=lambda: asyncio.create_task(

                                page.push_route("/")

                            ),

                        ),

                    ],

                )

            )

        page.update()



    async def view_pop(e):

        if e.view is not None:

            print("View pop:", e.view)

            page.views.remove(e.view)

            top_view = page.views[-1]

            await page.push_route(top_view.route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop



    route_change()





if __name__ == "__main__":

    ft.run(main)


Parameters:

route (str) - New navigation route.
**kwargs (default: {}) - Additional query string parameters to be added to the route.
deployed_code
render
​
Copy
render(component: Callable[..., Any], *args: Any = (), **kwargs: Any = {})

Render a component tree into controls of the root view.

The rendered result replaces page.views[0].controls, then triggers initial page update and component update scheduler startup.

Parameters:

component (Callable[..., Any]) - Component function to render.
*args (default: ()) - Positional arguments passed to component.
**kwargs (default: {}) - Keyword arguments passed to component.
deployed_code
render_views
​
Copy
render_views(component: Callable[..., Any], *args: Any = (), **kwargs: Any = {})

Render a component tree as the full list of page views.

The rendered result replaces page.views, then triggers initial page update and component update scheduler startup.

Parameters:

component (Callable[..., Any]) - Component function to render.
*args (default: ()) - Positional arguments passed to component.
**kwargs (default: {}) - Keyword arguments passed to component.
deployed_code
run_task
​
Copy
run_task(handler: Callable[InputT, Awaitable[RetT]], *args: InputT.args = (), **kwargs: InputT.kwargs = {}) -> Future[RetT]

Run handler coroutine as a new Task in the event loop associated with the current page.

deployed_code
run_thread
​
Copy
run_thread(handler: Callable[InputT, Any], *args: InputT.args = (), **kwargs: InputT.kwargs = {}) -> None

Run handler function as a new Thread in the executor associated with the current page.

deployed_code
schedule_update
​
Copy
schedule_update()

Queue this page for a deferred batched update.

deployed_code
set_allowed_device_orientations
async
​
Copy
set_allowed_device_orientations(
    orientations: list[DeviceOrientation],
) -> None

Constrains the allowed orientations for the app when running on a mobile device.

Parameters:

orientations (list[DeviceOrientation]) - A list of allowed device orientations. Set to an empty list to use the system default behavior.

Raises:

FletUnsupportedPlatformException - If the method is called on a non-mobile platform.

Limitations:

Android: On Android 16 (API 36) or later, this method won't be able to change the orientation of devices with a display width ≥ 600 dp cannot change orientation. For more details see Android 16 docs here. Also, Android limits the orientations to the following combinations:

[] → unspecified
[PORTRAIT_UP] → portrait
[LANDSCAPE_LEFT] → landscape
[PORTRAIT_DOWN] → reversePortrait
[PORTRAIT_UP, PORTRAIT_DOWN] → userPortrait
[LANDSCAPE_RIGHT] → reverseLandscape
[LANDSCAPE_LEFT, LANDSCAPE_RIGHT] → userLandscape
[PORTRAIT_UP, LANDSCAPE_LEFT, LANDSCAPE_RIGHT] → user
[PORTRAIT_UP, PORTRAIT_DOWN, LANDSCAPE_LEFT, LANDSCAPE_RIGHT] → fullUser
iOS: This setting will only be respected on iPad if multitasking is disabled. You can decide to opt out of multitasking on iPad, then this will work but your app will not support Slide Over and Split View multitasking anymore. Should you decide to opt out of multitasking you can do this by setting "Requires full screen" to true in the Xcode Deployment Info.
deployed_code
update
​
Copy
update(*controls: Control = ()) -> None

Push pending state changes to the client.

Parameters:

*controls (default: ()) - Specific controls to patch. When omitted, patches the whole page state.
Edit this page