# Marker
URL: https://flet.dev/docs/controls/map/marker

ReferenceControlsMapMarkersMarker
Marker

A marker displayed on the Map at the specified location through the MarkerLayer.

Inherits: BaseControl

Properties
alignment - Alignment of the marker relative to the normal center at coordinates.
content - The content to be displayed at coordinates.
coordinates - The coordinates of the marker.
height - The height of the content Control.
rotate - Whether to counter rotate this marker to the map's rotation, to keep a fixed orientation.
visible - Whether this marker is rendered on the map.
width - The width of the content Control.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = None

Alignment of the marker relative to the normal center at coordinates.

Defaults to the value of the parent MarkerLayer.alignment.

build
content
instance-attribute
​
Copy
content: Control

The content to be displayed at coordinates.

Raises:

ValueError - If it is not visible.
build
coordinates
instance-attribute
​
Copy
coordinates: MapLatitudeLongitude

The coordinates of the marker.

This will be the center of the marker, if alignment is Alignment.CENTER.

build
height
class-attribute
instance-attribute
​
Copy
height: Number = 30.0

The height of the content Control.

Raises:

ValueError - If it is less than 0.0.
build
rotate
class-attribute
instance-attribute
​
Copy
rotate: bool | None = None

Whether to counter rotate this marker to the map's rotation, to keep a fixed orientation. So, when True, this marker will always appear upright and vertical from the user's perspective.

If None, defaults to the value of the parent MarkerLayer.rotate.

NOTE

This is not used to apply a custom rotation in degrees to this marker.

build
visible
class-attribute
instance-attribute
​
Copy
visible: bool = True

Whether this marker is rendered on the map.

build
width
class-attribute
instance-attribute
​
Copy
width: Number = 30.0

The width of the content Control.

Raises:

ValueError - If it is less than 0.0.
Edit this page