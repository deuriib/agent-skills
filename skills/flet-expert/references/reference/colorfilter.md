# ColorFilter
URL: https://flet.dev/docs/types/colorfilter

ReferenceTypesClassesColorFilter
ColorFilter

Defines a color filter.

Properties
blend_mode - The blend mode to apply to the color filter.
color - The color to use when applying the filter.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
blend_mode
class-attribute
instance-attribute
​
Copy
blend_mode: BlendMode | None = None

The blend mode to apply to the color filter.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The color to use when applying the filter.

Methods​
deployed_code
copy
​
Copy
copy(
    color: ColorValue | None = None,
    blend_mode: BlendMode | None = None,
) -> ColorFilter

Returns a copy of this object with the specified properties overridden.

Edit this page