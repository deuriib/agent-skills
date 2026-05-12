# Line
URL: https://flet.dev/docs/controls/canvas/line

ReferenceControlsCanvasLine
Line

Draws a line between the given points using the given paint.

NOTE

The line is always rendered as a stroke, regardless of the value of paint's style property.

Inherits: canvas.Shape

Properties
paint - A style to draw a line with.
x1 - The x-axis coordinate of the line's starting point.
x2 - The x-axis coordinate of the line's end point.
y1 - The y-axis coordinate of the line's starting point.
y2 - The y-axis coordinate of the line's end point.
Properties​
build
paint
class-attribute
instance-attribute
​
Copy
paint: Paint = field(default_factory=lambda: Paint())

A style to draw a line with.

build
x1
instance-attribute
​
Copy
x1: Number

The x-axis coordinate of the line's starting point.

build
x2
instance-attribute
​
Copy
x2: Number

The x-axis coordinate of the line's end point.

build
y1
instance-attribute
​
Copy
y1: Number

The y-axis coordinate of the line's starting point.

build
y2
instance-attribute
​
Copy
y2: Number

The y-axis coordinate of the line's end point.

Edit this page