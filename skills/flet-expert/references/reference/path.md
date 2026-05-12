# Path
URL: https://flet.dev/docs/controls/canvas/path

ReferenceControlsCanvasPath
Path

Draws a path with given elements with the given paint.

Whether this shape is filled, stroked, or both, is controlled by paint.style. If the path is filled, then sub-paths within it are implicitly closed (see Path.Close).

Inherits: canvas.Shape

Properties
elements - The list of path elements.
paint - A style to draw a path with.
Properties​
build
elements
class-attribute
instance-attribute
​
Copy
elements: list[PathElement] = field(default_factory=list)

The list of path elements.

build
paint
class-attribute
instance-attribute
​
Copy
paint: Paint = field(default_factory=lambda: Paint())

A style to draw a path with.

Edit this page