# WebViewConfiguration
URL: https://flet.dev/docs/types/webviewconfiguration

ReferenceTypesClassesWebViewConfiguration
WebViewConfiguration

Configuration options for in-app web views.

Properties
enable_dom_storage - Whether DOM storage is enabled.
enable_javascript - Whether JavaScript execution is allowed.
headers - Additional HTTP headers to include with the request.
Properties​
build
enable_dom_storage
class-attribute
instance-attribute
​
Copy
enable_dom_storage: bool = True

Whether DOM storage is enabled.

build
enable_javascript
class-attribute
instance-attribute
​
Copy
enable_javascript: bool = True

Whether JavaScript execution is allowed.

build
headers
class-attribute
instance-attribute
​
Copy
headers: dict[str, str] = field(default_factory=dict)

Additional HTTP headers to include with the request.

Edit this page