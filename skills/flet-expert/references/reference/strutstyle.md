# StrutStyle
URL: https://flet.dev/docs/types/strutstyle

ReferenceTypesClassesStrutStyle
StrutStyle

TBD

Properties
font_family - See Text.font_family.
force_strut_height - Whether the strut height should be forced.
height - The minimum height of the strut, as a multiple of size.
italic - Whether to use italic typeface.
leading - The amount of additional space to place between lines when rendering text.
size - The size of text (in logical pixels) to use when getting metrics from the font.
weight - The typeface thickness to use when calculating the strut.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
font_family
class-attribute
instance-attribute
​
Copy
font_family: str | None = None

See Text.font_family.

build
force_strut_height
class-attribute
instance-attribute
​
Copy
force_strut_height: bool | None = None

Whether the strut height should be forced.

Defaults to False.

build
height
class-attribute
instance-attribute
​
Copy
height: Number | None = None

The minimum height of the strut, as a multiple of size.

See detailed explanation here: https://api.flutter.dev/flutter/painting/StrutStyle/height.html

build
italic
class-attribute
instance-attribute
​
Copy
italic: bool = False

Whether to use italic typeface.

build
leading
class-attribute
instance-attribute
​
Copy
leading: Number | None = None

The amount of additional space to place between lines when rendering text.

Defaults to using the font-specified leading value.

build
size
class-attribute
instance-attribute
​
Copy
size: Number | None = None

The size of text (in logical pixels) to use when getting metrics from the font.

Defaults to 14.

build
weight
class-attribute
instance-attribute
​
Copy
weight: FontWeight | None = None

The typeface thickness to use when calculating the strut.

Defaults to FontWeight.W_400.

Methods​
deployed_code
copy
​
Copy
copy(
    size: Number | None = None,
    height: Number | None = None,
    weight: FontWeight | None = None,
    italic: bool | None = None,
    font_family: str | None = None,
    leading: Number | None = None,
    force_strut_height: bool | None = None,
) -> StrutStyle

Returns a copy of this object with the specified properties overridden.

Edit this page