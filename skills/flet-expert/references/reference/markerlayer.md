# MarkerLayer
URL: https://flet.dev/docs/controls/map/markerlayer

ReferenceControlsMapLayersMarkerLayer
MarkerLayer

A layer to display Markers.

Inherits: MapLayer

Properties
alignment - The alignment of each marker relative to its normal center at Marker.coordinates.
markers - A list of Markers to display.
rotate - Whether to counter-rotate markers to the map's rotation, to keep a fixed orientation.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = field(
    default_factory=lambda: Alignment.CENTER
)

The alignment of each marker relative to its normal center at Marker.coordinates.

build
markers
instance-attribute
​
Copy
markers: list[Marker]

A list of Markers to display.

build
rotate
class-attribute
instance-attribute
​
Copy
rotate: bool = False

Whether to counter-rotate markers to the map's rotation, to keep a fixed orientation.

Edit this page