# PolylineMarker
URL: https://flet.dev/docs/controls/map/polylinemarker

ReferenceControlsMapMarkersPolylineMarker
PolylineMarker

A marker for the PolylineLayer.

Inherits: BaseControl

Properties
border_color - The border's color.
border_stroke_width - The width of the stroke with of the line border.
color - The color of the line stroke.
colors_stop - The stops for the gradient_colors.
coordinates - The list of coordinates for the polyline.
gradient_colors - The List of colors in case a gradient should get used.
stroke_cap - Style to use for line endings.
stroke_join - Style to use for line segment joins.
stroke_pattern - Determines whether the line should be solid, dotted, or dashed, and the exact characteristics of each.
stroke_width - The width of the stroke.
use_stroke_width_in_meter - Whether the stroke's width should have meters as unit.
visible - Whether this marker is rendered on the map.
Properties​
build
border_color
class-attribute
instance-attribute
​
Copy
border_color: ColorValue = Colors.YELLOW

The border's color.

build
border_stroke_width
class-attribute
instance-attribute
​
Copy
border_stroke_width: Number = 0.0

The width of the stroke with of the line border.

Raises:

ValueError - If it is less than 0.0.
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue = Colors.YELLOW

The color of the line stroke.

build
colors_stop
class-attribute
instance-attribute
​
Copy
colors_stop: list[Number] | None = None

The stops for the gradient_colors.

build
coordinates
instance-attribute
​
Copy
coordinates: list[MapLatitudeLongitude]

The list of coordinates for the polyline.

build
gradient_colors
class-attribute
instance-attribute
​
Copy
gradient_colors: list[ColorValue] | None = None

The List of colors in case a gradient should get used.

build
stroke_cap
class-attribute
instance-attribute
​
Copy
stroke_cap: StrokeCap = StrokeCap.ROUND

Style to use for line endings.

build
stroke_join
class-attribute
instance-attribute
​
Copy
stroke_join: StrokeJoin = StrokeJoin.ROUND

Style to use for line segment joins.

build
stroke_pattern
class-attribute
instance-attribute
​
Copy
stroke_pattern: StrokePattern = field(
    default_factory=lambda: SolidStrokePattern()
)

Determines whether the line should be solid, dotted, or dashed, and the exact characteristics of each.

build
stroke_width
class-attribute
instance-attribute
​
Copy
stroke_width: Number = 1.0

The width of the stroke.

Raises:

ValueError - If it is less than 0.0.
build
use_stroke_width_in_meter
class-attribute
instance-attribute
​
Copy
use_stroke_width_in_meter: bool = False

Whether the stroke's width should have meters as unit.

build
visible
class-attribute
instance-attribute
​
Copy
visible: bool = True

Whether this marker is rendered on the map.

Edit this page