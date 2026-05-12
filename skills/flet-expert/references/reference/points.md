# Points
URL: https://flet.dev/docs/controls/canvas/points

ReferenceControlsCanvasPoints
Points

Draws a sequence of points according to the given point_mode.

Inherits: canvas.Shape

Properties
paint - A style to draw points with.
point_mode - Defines how a list of points is interpreted when drawing a set of points.
points - The list of offsets describing points.
Properties​
build
paint
class-attribute
instance-attribute
​
Copy
paint: Paint = field(default_factory=lambda: Paint())

A style to draw points with.

build
point_mode
class-attribute
instance-attribute
​
Copy
point_mode: PointMode = PointMode.POINTS

Defines how a list of points is interpreted when drawing a set of points.

build
points
class-attribute
instance-attribute
​
Copy
points: list[OffsetValue] | None = None

The list of offsets describing points.

Edit this page