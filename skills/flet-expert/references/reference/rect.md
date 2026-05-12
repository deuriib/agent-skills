# Rect
URL: https://flet.dev/docs/controls/canvas/rect

ReferenceControlsCanvasRect
Rect

Draws a rectangle.

Inherits: canvas.Shape

Properties
border_radius - The border radius of this rectangle.
height - The height of this rectangle.
paint - A style to draw this rectangle with.
width - The width of this rectangle.
x - The x-axis coordinate of this rectangle's top left point.
y - The y-axis coordinate of this rectangle's top left point.
Properties​
build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue = field(
    default_factory=lambda: BorderRadius.all(0)
)

The border radius of this rectangle.

build
height
class-attribute
instance-attribute
​
Copy
height: Number = 0

The height of this rectangle.

build
paint
class-attribute
instance-attribute
​
Copy
paint: Paint = field(default_factory=lambda: Paint())

A style to draw this rectangle with.

build
width
class-attribute
instance-attribute
​
Copy
width: Number = 0

The width of this rectangle.

build
x
instance-attribute
​
Copy
x: Number

The x-axis coordinate of this rectangle's top left point.

build
y
instance-attribute
​
Copy
y: Number

The y-axis coordinate of this rectangle's top left point.

Edit this page