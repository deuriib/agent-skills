# Arc
URL: https://flet.dev/docs/controls/canvas/arc

ReferenceControlsCanvasArc
Arc

Draws an arc scaled to fit inside the given rectangle.

It starts from start_angle radians around the oval up to start_angle + sweep_angle radians around the oval, with zero radians being the point on the right hand side of the oval that crosses the horizontal line that intersects the center of the rectangle and with positive angles going clockwise around the oval. If use_center is True, the arc is closed back to the center, forming a circle sector. Otherwise, the arc is not closed, forming a circle segment.

https://api.flutter.dev/flutter/dart-ui/Canvas/drawArc.html

Inherits: canvas.Shape

Properties
height - The height of the rectangle containing the arc's oval.
paint - A style to draw an arc with.
start_angle - The starting angle in radians to draw arc from.
sweep_angle - The length of the arc in radians.
use_center - Whether this arc is closed back to the center, forming a circle sector.
width - The width of the rectangle containing the arc's oval.
x - The x-axis coordinate of the arc's top left point.
y - The y-axis coordinate of the arc's top left point.
Properties​
build
height
class-attribute
instance-attribute
​
Copy
height: Number = 0

The height of the rectangle containing the arc's oval.

build
paint
class-attribute
instance-attribute
​
Copy
paint: Paint = field(default_factory=lambda: Paint())

A style to draw an arc with.

build
start_angle
class-attribute
instance-attribute
​
Copy
start_angle: Number = 0

The starting angle in radians to draw arc from.

build
sweep_angle
class-attribute
instance-attribute
​
Copy
sweep_angle: Number = 0

The length of the arc in radians.

build
use_center
class-attribute
instance-attribute
​
Copy
use_center: bool = False

Whether this arc is closed back to the center, forming a circle sector. If not closed (False), this arc forms a circle segment.

build
width
class-attribute
instance-attribute
​
Copy
width: Number = 0

The width of the rectangle containing the arc's oval.

build
x
instance-attribute
​
Copy
x: Number

The x-axis coordinate of the arc's top left point.

build
y
instance-attribute
​
Copy
y: Number

The y-axis coordinate of the arc's top left point.

Edit this page