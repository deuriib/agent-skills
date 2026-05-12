# PolygonMarker
URL: https://flet.dev/docs/controls/map/polygonmarker

ReferenceControlsMapMarkersPolygonMarker
PolygonMarker

A marker for the PolygonLayer.

Inherits: BaseControl

Properties
border_color - The color of the border outline.
border_stroke_width - The width of the border outline.
color - The color of the polygon.
coordinates - The points for the outline of this polygon.
disable_holes_border - Whether holes should have borders.
label - An optional label for this polygon.
label_text_style - The text style for the label.
rotate_label - Whether to rotate the label counter to the camera's rotation, to ensure it remains upright.
stroke_cap - Style to use for line endings.
stroke_join - Style to use for line segment joins.
visible - Whether this marker is rendered on the map.
Properties​
build
border_color
class-attribute
instance-attribute
​
Copy
border_color: ColorValue = Colors.GREEN

The color of the border outline.

build
border_stroke_width
class-attribute
instance-attribute
​
Copy
border_stroke_width: Number = 0.0

The width of the border outline.

Raises:

ValueError - If it is less than 0.0.
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue = Colors.GREEN

The color of the polygon.

build
coordinates
instance-attribute
​
Copy
coordinates: list[MapLatitudeLongitude]

The points for the outline of this polygon.

build
disable_holes_border
class-attribute
instance-attribute
​
Copy
disable_holes_border: bool = False

Whether holes should have borders.

build
label
class-attribute
instance-attribute
​
Copy
label: str | None = None

An optional label for this polygon.

NOTE

Specifying a label will reduce performance, as the internal canvas must be drawn to and 'saved' more frequently to ensure the proper stacking order is maintained. This can be avoided, potentially at the expense of appearance, by setting PolygonLayer.draw_labels_last.

build
label_text_style
class-attribute
instance-attribute
​
Copy
label_text_style: TextStyle | None = None

The text style for the label.

build
rotate_label
class-attribute
instance-attribute
​
Copy
rotate_label: bool = False

Whether to rotate the label counter to the camera's rotation, to ensure it remains upright.

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
visible
class-attribute
instance-attribute
​
Copy
visible: bool = True

Whether this marker is rendered on the map.

Edit this page