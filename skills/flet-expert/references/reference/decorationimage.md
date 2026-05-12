# DecorationImage
URL: https://flet.dev/docs/types/decorationimage

ReferenceTypesClassesDecorationImage
DecorationImage

An image for a box decoration.

Properties
alignment - The alignment of the image within its bounds.
anti_alias - Whether to paint the image in anti-aliased quality.
color_filter - A color filter to apply to the image before painting it.
filter_quality - The quality of the image filter.
fit - How the image should be inscribed into the box.
invert_colors - Whether to invert the colors of the image while drawing.
match_text_direction - Whether to paint the image in the direction of the TextDirection.
opacity - The opacity of the image.
repeat - How the image should be repeated to fill the box.
scale - The scale(image pixels to be shown per logical pixels) to apply to the image.
src - The image source to paint.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment = field(
    default_factory=lambda: Alignment.CENTER
)

The alignment of the image within its bounds.

build
anti_alias
class-attribute
instance-attribute
​
Copy
anti_alias: bool = False

Whether to paint the image in anti-aliased quality.

build
color_filter
class-attribute
instance-attribute
​
Copy
color_filter: ColorFilter | None = None

A color filter to apply to the image before painting it.

build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality = FilterQuality.MEDIUM

The quality of the image filter.

build
fit
class-attribute
instance-attribute
​
Copy
fit: BoxFit | None = None

How the image should be inscribed into the box.

build
invert_colors
class-attribute
instance-attribute
​
Copy
invert_colors: bool = False

Whether to invert the colors of the image while drawing.

build
match_text_direction
class-attribute
instance-attribute
​
Copy
match_text_direction: bool = False

Whether to paint the image in the direction of the TextDirection.

build
opacity
class-attribute
instance-attribute
​
Copy
opacity: Number = 1.0

The opacity of the image.

build
repeat
class-attribute
instance-attribute
​
Copy
repeat: ImageRepeat = ImageRepeat.NO_REPEAT

How the image should be repeated to fill the box.

build
scale
class-attribute
instance-attribute
​
Copy
scale: Number = 1.0

The scale(image pixels to be shown per logical pixels) to apply to the image.

build
src
class-attribute
instance-attribute
​
Copy
src: str | bytes | None = None

The image source to paint.

Accepts URLs, asset paths, base64 strings (with or without data: prefixes), or raw bytes.

Methods​
deployed_code
copy
​
Copy
copy(
    src: str | bytes | None = None,
    color_filter: ColorFilter | None = None,
    fit: BoxFit | None = None,
    alignment: Alignment | None = None,
    repeat: ImageRepeat | None = None,
    match_text_direction: bool | None = None,
    scale: Number | None = None,
    opacity: Number | None = None,
    filter_quality: FilterQuality | None = None,
    invert_colors: bool | None = None,
    anti_alias: bool | None = None,
) -> DecorationImage

Returns a copy of this object with the specified properties overridden.

Edit this page