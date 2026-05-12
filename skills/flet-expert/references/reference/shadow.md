# Shadow
URL: https://flet.dev/docs/controls/canvas/shadow

ReferenceControlsCanvasShadow
Shadow

Draws a shadow for a path representing the given material elevation.

NOTE

The transparent_occluder argument should be True if the occluding object is not opaque.

Inherits: canvas.Shape

Properties
color - The shadow's color.
elevation - The shadow's elevation.
path - The list of elements describing the path of this shape.
transparent_occluder - Whether the occluding object is transparent (not opaque).
Properties​
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue = Colors.BLACK

The shadow's color.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number = 0

The shadow's elevation.

build
path
class-attribute
instance-attribute
​
Copy
path: list[Path.PathElement] = field(default_factory=list)

The list of elements describing the path of this shape.

build
transparent_occluder
class-attribute
instance-attribute
​
Copy
transparent_occluder: bool = False

Whether the occluding object is transparent (not opaque).

Edit this page