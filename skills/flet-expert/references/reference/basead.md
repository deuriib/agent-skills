# BaseAd
URL: https://flet.dev/docs/controls/ads/basead

ReferenceControlsAdsBaseAd
BaseAd

Base class for all Ad controls.

This class defines shared ad request and lifecycle event properties for concrete ad controls/services.

Raises:

FletUnsupportedPlatformException - When using this control on a web and/or non-mobile platform.

Inherits: BaseControl

Properties
request - Targeting information used to fetch an Ad.
unit_id - Ad unit ID for this ad.
Events
on_click - Called when this ad is clicked.
on_close - Called when the full screen view has been closed.
on_error - Called when an ad request failed.
on_impression - Called when an impression occurs on this ad.
on_load - Called when this ad is loaded successfully.
on_open - Called when this ad opens up.
Properties​
build
request
class-attribute
instance-attribute
​
Copy
request: AdRequest = field(
    default_factory=lambda: AdRequest()
)

Targeting information used to fetch an Ad.

build
unit_id
instance-attribute
​
Copy
unit_id: str

Ad unit ID for this ad.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[BaseAd] | None = None

Called when this ad is clicked.

bolt
on_close
class-attribute
instance-attribute
​
Copy
on_close: ControlEventHandler[BaseAd] | None = None

Called when the full screen view has been closed. You should restart anything paused while handling on_open.

bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ControlEventHandler[BaseAd] | None = None

Called when an ad request failed.

Event handler argument data property contains information about the error.

bolt
on_impression
class-attribute
instance-attribute
​
Copy
on_impression: ControlEventHandler[BaseAd] | None = None

Called when an impression occurs on this ad.

bolt
on_load
class-attribute
instance-attribute
​
Copy
on_load: ControlEventHandler[BaseAd] | None = None

Called when this ad is loaded successfully.

bolt
on_open
class-attribute
instance-attribute
​
Copy
on_open: ControlEventHandler[BaseAd] | None = None

Called when this ad opens up.

A full screen view/overlay is presented in response to the user clicking on an ad. You may want to pause animations and time sensitive interactions.

Edit this page