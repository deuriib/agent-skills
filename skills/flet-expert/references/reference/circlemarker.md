# CircleMarker
URL: https://flet.dev/docs/controls/map/circlemarker

ReferenceControlsMapMarkersCircleMarker
CircleMarker

A circular marker displayed on the Map at the specified location through the CircleLayer.

Inherits: BaseControl

Properties
border_color - The color of the circle border line.
border_stroke_width - The stroke width for the circle border.
color - The color of the circle area.
coordinates - The center coordinates of the circle
radius - The radius of the circle
use_radius_in_meter - Whether the radius should use the unit meters.
visible - Whether this marker is rendered on the map.
Properties​
build
border_color
class-attribute
instance-attribute
​
Copy
border_color: ColorValue | None = None

The color of the circle border line.

TIP

border_stroke_width must be greater than 0.0 in order for this color to be visible.

build
border_stroke_width
class-attribute
instance-attribute
​
Copy
border_stroke_width: Number = 0.0

The stroke width for the circle border.

Raises:

ValueError - If it is less than 0.0.
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The color of the circle area.

build
coordinates
instance-attribute
​
Copy
coordinates: MapLatitudeLongitude

The center coordinates of the circle

build
radius
instance-attribute
​
Copy
radius: Number

The radius of the circle

build
use_radius_in_meter
class-attribute
instance-attribute
​
Copy
use_radius_in_meter: bool = False

Whether the radius should use the unit meters.

build
visible
class-attribute
instance-attribute
​
Copy
visible: bool = True

Whether this marker is rendered on the map.

Edit this page