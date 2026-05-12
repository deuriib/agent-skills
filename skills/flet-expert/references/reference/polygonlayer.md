# PolygonLayer
URL: https://flet.dev/docs/controls/map/polygonlayer

ReferenceControlsMapLayersPolygonLayer
PolygonLayer

A layer to display PolygonMarkers.

Inherits: MapLayer

Properties
draw_labels_last - Whether to draw labels last and thus over all the polygons.
polygon_culling - Whether to cull polygons and polygon sections that are outside of the viewport.
polygon_labels - Whether to draw per-polygon labels.
polygons - A list of PolygonMarkers to display.
simplification_tolerance - The tolerance value used to simplify polygon outlines before rendering.
use_alternative_rendering - Whether to use an alternative rendering pathway to draw polygons onto the underlying Canvas, which can be more performant in 'some' circumstances.
Properties​
build
draw_labels_last
class-attribute
instance-attribute
​
Copy
draw_labels_last: bool = False

Whether to draw labels last and thus over all the polygons.

build
polygon_culling
class-attribute
instance-attribute
​
Copy
polygon_culling: bool = True

Whether to cull polygons and polygon sections that are outside of the viewport.

build
polygon_labels
class-attribute
instance-attribute
​
Copy
polygon_labels: bool = True

Whether to draw per-polygon labels.

build
polygons
instance-attribute
​
Copy
polygons: list[PolygonMarker]

A list of PolygonMarkers to display.

build
simplification_tolerance
class-attribute
instance-attribute
​
Copy
simplification_tolerance: Number = 0.3

The tolerance value used to simplify polygon outlines before rendering.

Higher values will result in polygons with fewer points, which can improve rendering performance at the cost of reduced geometric accuracy. Lower values preserve more detail but may decrease performance, especially with complex polygons.

Set to 0 to disable simplification.

build
use_alternative_rendering
class-attribute
instance-attribute
​
Copy
use_alternative_rendering: bool = False

Whether to use an alternative rendering pathway to draw polygons onto the underlying Canvas, which can be more performant in 'some' circumstances.

This will not always improve performance, and there are other important considerations before enabling it. It is intended for use when prior profiling indicates more performance is required after other methods are already in use. For example, it may worsen performance when there are a huge number of polygons to triangulate - and so this is best used in conjunction with simplification, not as a replacement.

Edit this page