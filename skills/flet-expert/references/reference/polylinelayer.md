# PolylineLayer
URL: https://flet.dev/docs/controls/map/polylinelayer

ReferenceControlsMapLayersPolylineLayer
PolylineLayer

A layer to display PolylineMarkers.

Inherits: MapLayer

Properties
culling_margin - Acceptable extent outside of viewport before culling polyline segments.
min_hittable_radius - The minimum radius of the hittable area around each polyline in logical pixels.
polylines - List of PolylineMarkers to be drawn.
simplification_tolerance - The tolerance (in map units) used to simplify polylines for rendering.
Properties​
build
culling_margin
class-attribute
instance-attribute
​
Copy
culling_margin: Number = 10.0

Acceptable extent outside of viewport before culling polyline segments.

build
min_hittable_radius
class-attribute
instance-attribute
​
Copy
min_hittable_radius: Number = 10.0

The minimum radius of the hittable area around each polyline in logical pixels.

The entire visible area is always hittable, but if the visible area is smaller than this, then this will be the hittable area.

build
polylines
instance-attribute
​
Copy
polylines: list[PolylineMarker]

List of PolylineMarkers to be drawn.

build
simplification_tolerance
class-attribute
instance-attribute
​
Copy
simplification_tolerance: Number = 0.3

The tolerance (in map units) used to simplify polylines for rendering.

Higher values result in more aggressive simplification, which can improve performance but may reduce the accuracy of the displayed polyline.

Edit this page