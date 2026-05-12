# SimpleAttribution
URL: https://flet.dev/docs/controls/map/simpleattribution

ReferenceControlsMapAttributionsSimpleAttribution
SimpleAttribution

A simple attribution layer displayed on the Map.

Inherits: MapLayer

Properties
alignment - The alignment of this attribution on the map.
bgcolor - The color of the box containing the text.
text - The attribution message to be displayed.
text_style - The style to use for text.
Events
on_click - Fired when this attribution is clicked/pressed.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment = field(
    default_factory=lambda: Alignment.BOTTOM_RIGHT
)

The alignment of this attribution on the map.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue = Colors.SURFACE

The color of the box containing the text.

build
text
instance-attribute
​
Copy
text: str

The attribution message to be displayed.

build
text_style
class-attribute
instance-attribute
​
Copy
text_style: TextStyle | None = None

The style to use for text.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: (
    ControlEventHandler[SimpleAttribution] | None
) = None

Fired when this attribution is clicked/pressed.

Edit this page