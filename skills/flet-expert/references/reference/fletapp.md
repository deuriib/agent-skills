# FletApp
URL: https://flet.dev/docs/controls/fletapp

ReferenceControlsFletApp
FletApp

Renders another Flet app in the current app, similar to HTML IFrame, but for Flet.

Inherits: LayoutControl

Properties
app_error_message - Template message to display when the app fails to load.
app_startup_screen_message - Message to display on the app startup screen.
args - Optional dictionary of arguments to pass to the Flet app.
assets_dir - Base location for assets referenced by the embedded app.
force_pyodide - Whether to force the use of Pyodide.
reconnect_interval_ms - Delay, in milliseconds, between reconnection attempts.
reconnect_timeout_ms - Total time to try reconnecting.
show_app_startup_screen - Whether to show the app startup screen.
url - Flet app URL, e.g.
Events
on_error - Called when a connection or any unhandled error occurs.
on_python_output - Fires once per stdout/stderr write inside the embedded Pyodide app.
Properties​
build
app_error_message
class-attribute
instance-attribute
​
Copy
app_error_message: str | None = None

Template message to display when the app fails to load. Use {message} placeholder to include the error message and {details} to include error details.

build
app_startup_screen_message
class-attribute
instance-attribute
​
Copy
app_startup_screen_message: str | None = None

Message to display on the app startup screen.

build
args
class-attribute
instance-attribute
​
Copy
args: dict[str, Any] | None = None

Optional dictionary of arguments to pass to the Flet app.

build
assets_dir
class-attribute
instance-attribute
​
Copy
assets_dir: str | None = None

Base location for assets referenced by the embedded app. On web this is a URL prefix joined with relative src values (e.g. on Image/Lottie/Markdown); on desktop it is a filesystem path.

build
force_pyodide
class-attribute
instance-attribute
​
Copy
force_pyodide: bool = False

Whether to force the use of Pyodide.

build
reconnect_interval_ms
class-attribute
instance-attribute
​
Copy
reconnect_interval_ms: int | None = None

Delay, in milliseconds, between reconnection attempts.

build
reconnect_timeout_ms
class-attribute
instance-attribute
​
Copy
reconnect_timeout_ms: int | None = None

Total time to try reconnecting.

build
show_app_startup_screen
class-attribute
instance-attribute
​
Copy
show_app_startup_screen: bool = False

Whether to show the app startup screen.

build
url
class-attribute
instance-attribute
​
Copy
url: str | None = None

Flet app URL, e.g. http://localhost:8550 or flet.sock.

Events​
bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ControlEventHandler[FletApp] | None = None

Called when a connection or any unhandled error occurs.

bolt
on_python_output
class-attribute
instance-attribute
​
Copy
on_python_output: (
    EventHandler[FletAppOutputEvent] | None
) = None

Fires once per stdout/stderr write inside the embedded Pyodide app. Pyodide line-buffers by default, so each event is typically one print(...) call. Only fires for embedded FletApps with force_pyodide=True; root-level Pyodide pages have nowhere to bubble the event.

Edit this page