# BoxDecoration
URL: https://flet.dev/docs/types/boxdecoration

ReferenceTypesClassesBoxDecoration
BoxDecoration

BoxDecoration provides a description of how to paint a box. The box has a border, a body, and may cast a shadow.

Properties
bgcolor - The color to fill in the background of the box.
blend_mode - The blend mode to apply to the background bgcolor or gradient.
border - A border to draw above the background bgcolor, gradient, and image.
border_radius - The border radius of the box.
gradient - A gradient to use when filling the box.
image - An image to paint above the background bgcolor or gradient.
shadows - A list of shadows cast by the box.
shape - The shape to fill the bgcolor, gradient, and image into and to cast as the shadows.
Methods
copy - Returns a new BoxDecoration with selected fields overridden.
Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The color to fill in the background of the box.

build
blend_mode
class-attribute
instance-attribute
​
Copy
blend_mode: BlendMode | None = None

The blend mode to apply to the background bgcolor or gradient.

build
border
class-attribute
instance-attribute
​
Copy
border: Border | None = None

A border to draw above the background bgcolor, gradient, and image.

build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue | None = None

The border radius of the box.

build
gradient
class-attribute
instance-attribute
​
Copy
gradient: Gradient | None = None

A gradient to use when filling the box.

build
image
class-attribute
instance-attribute
​
Copy
image: DecorationImage | None = None

An image to paint above the background bgcolor or gradient.

build
shadows
class-attribute
instance-attribute
​
Copy
shadows: BoxShadowValue | None = None

A list of shadows cast by the box.

build
shape
class-attribute
instance-attribute
​
Copy
shape: BoxShape = BoxShape.RECTANGLE

The shape to fill the bgcolor, gradient, and image into and to cast as the shadows.

Methods​
deployed_code
copy
​
Copy
copy(
    bgcolor: ColorValue | None = None,
    image: DecorationImage | None = None,
    border: Border | None = None,
    border_radius: BorderRadiusValue | None = None,
    shadows: BoxShadowValue | None = None,
    gradient: Gradient | None = None,
    shape: BoxShape | None = None,
    blend_mode: BlendMode | None = None,
)

Returns a new BoxDecoration with selected fields overridden.

Edit this page