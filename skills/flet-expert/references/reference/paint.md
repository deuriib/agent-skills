# Paint
URL: https://flet.dev/docs/types/paint

ReferenceTypesClassesPaint
Paint

A description of the style to use when drawing a shape on the canvas.

Properties
anti_alias - Whether to apply anti-aliasing to lines and images drawn on the canvas.
blend_mode - A blend mode to apply when a shape is drawn or a layer is composited.
blur_image - Blur image when drawing it on a canvas.
color - The color to use when stroking or filling a shape.
gradient - Configures gradient paint.
stroke_cap - TBD
stroke_dash_pattern - TBD
stroke_join - TBD
stroke_miter_limit - TBD
stroke_width - TBD
style - TBD
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
anti_alias
class-attribute
instance-attribute
​
Copy
anti_alias: bool | None = None

Whether to apply anti-aliasing to lines and images drawn on the canvas.

Defaults to True.

build
blend_mode
class-attribute
instance-attribute
​
Copy
blend_mode: BlendMode | None = None

A blend mode to apply when a shape is drawn or a layer is composited.

Defaults to BlendMode.SRC_OVER.

build
blur_image
class-attribute
instance-attribute
​
Copy
blur_image: BlurValue | None = None

Blur image when drawing it on a canvas.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The color to use when stroking or filling a shape.

Defaults to opaque black.

build
gradient
class-attribute
instance-attribute
​
Copy
gradient: PaintGradient | None = None

Configures gradient paint.

build
stroke_cap
class-attribute
instance-attribute
​
Copy
stroke_cap: StrokeCap | None = None

TBD

build
stroke_dash_pattern
class-attribute
instance-attribute
​
Copy
stroke_dash_pattern: list[Number] | None = None

TBD

build
stroke_join
class-attribute
instance-attribute
​
Copy
stroke_join: StrokeJoin | None = None

TBD

build
stroke_miter_limit
class-attribute
instance-attribute
​
Copy
stroke_miter_limit: Number | None = None

TBD

build
stroke_width
class-attribute
instance-attribute
​
Copy
stroke_width: Number | None = None

TBD

build
style
class-attribute
instance-attribute
​
Copy
style: PaintingStyle | None = None

TBD

Methods​
deployed_code
copy
​
Copy
copy(
    color: ColorValue | None = None,
    blend_mode: BlendMode | None = None,
    blur_image: BlurValue | None = None,
    anti_alias: bool | None = None,
    gradient: PaintGradient | None = None,
    stroke_cap: StrokeCap | None = None,
    stroke_join: StrokeJoin | None = None,
    stroke_miter_limit: Number | None = None,
    stroke_width: Number | None = None,
    stroke_dash_pattern: list[Number] | None = None,
    style: PaintingStyle | None = None,
) -> Paint

Returns a copy of this object with the specified properties overridden.

Edit this page