# TextStyle
URL: https://flet.dev/docs/types/textstyle

ReferenceTypesClassesTextStyle
TextStyle

A style describing how to format and paint text.

Properties
baseline - The common baseline that should be aligned between this text span and its parent text span, or, for the root text spans, with the line box.
bgcolor - Text background https://flet.dev/docs/types/colors.
color - Text foreground https://flet.dev/docs/types/colors.
decoration - The decorations to paint near the text (e.g., an underline).
decoration_color - The color in which to paint the text decorations.
decoration_style - The style in which to paint the text decorations (e.g., dashed).
decoration_thickness - The thickness of the decoration stroke as a multiplier of the thickness defined by the font.
font_family - See https://flet.dev/docs/controls/text#font_family.
font_family_fallback - Ordered fallback font families to use when glyphs are not available in font_family.
foreground - The paint drawn as a foreground for the text.
height - The height of this text span, as a multiple of the font size.
italic - Whether to use italic typeface.
letter_spacing - The amount of space (in logical pixels) to add between each letter.
overflow - How visual text overflow should be handled.
shadow - TBD
size - The size of glyphs (in logical pixels) to use when painting the text.
weight - The typeface thickness to use when painting the text (e.g., bold).
word_spacing - The amount of space (in logical pixels) to add at each sequence of white-space (i.e.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
baseline
class-attribute
instance-attribute
​
Copy
baseline: TextBaseline | None = None

The common baseline that should be aligned between this text span and its parent text span, or, for the root text spans, with the line box.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Text background https://flet.dev/docs/types/colors.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

Text foreground https://flet.dev/docs/types/colors.

build
decoration
class-attribute
instance-attribute
​
Copy
decoration: TextDecoration | None = None

The decorations to paint near the text (e.g., an underline).

build
decoration_color
class-attribute
instance-attribute
​
Copy
decoration_color: ColorValue | None = None

The color in which to paint the text decorations.

build
decoration_style
class-attribute
instance-attribute
​
Copy
decoration_style: TextDecorationStyle | None = None

The style in which to paint the text decorations (e.g., dashed).

Defaults to TextDecorationStyle.SOLID.

build
decoration_thickness
class-attribute
instance-attribute
​
Copy
decoration_thickness: Number | None = None

The thickness of the decoration stroke as a multiplier of the thickness defined by the font.

build
font_family
class-attribute
instance-attribute
​
Copy
font_family: str | None = None

See https://flet.dev/docs/controls/text#font_family.

build
font_family_fallback
class-attribute
instance-attribute
​
Copy
font_family_fallback: list[str] | None = None

Ordered fallback font families to use when glyphs are not available in font_family.

build
foreground
class-attribute
instance-attribute
​
Copy
foreground: Paint | None = None

The paint drawn as a foreground for the text.

build
height
class-attribute
instance-attribute
​
Copy
height: Number | None = None

The height of this text span, as a multiple of the font size.

See detailed explanation here.

build
italic
class-attribute
instance-attribute
​
Copy
italic: bool = False

Whether to use italic typeface.

build
letter_spacing
class-attribute
instance-attribute
​
Copy
letter_spacing: Number | None = None

The amount of space (in logical pixels) to add between each letter. A negative value can be used to bring the letters closer.

build
overflow
class-attribute
instance-attribute
​
Copy
overflow: TextOverflow | None = None

How visual text overflow should be handled.

build
shadow
class-attribute
instance-attribute
​
Copy
shadow: BoxShadowValue | None = None

TBD

build
size
class-attribute
instance-attribute
​
Copy
size: Number | None = None

The size of glyphs (in logical pixels) to use when painting the text.

Defaults to 14.

build
weight
class-attribute
instance-attribute
​
Copy
weight: FontWeight | None = None

The typeface thickness to use when painting the text (e.g., bold).

Defaults to FontWeight.NORMAL.

build
word_spacing
class-attribute
instance-attribute
​
Copy
word_spacing: Number | None = None

The amount of space (in logical pixels) to add at each sequence of white-space (i.e. between each word). A negative value can be used to bring the words closer.

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
    decoration: TextDecoration | None = None,
    decoration_color: ColorValue | None = None,
    decoration_thickness: Number | None = None,
    decoration_style: TextDecorationStyle | None = None,
    font_family: str | None = None,
    font_family_fallback: list[str] | None = None,
    color: ColorValue | None = None,
    bgcolor: ColorValue | None = None,
    shadow: BoxShadowValue | None = None,
    foreground: Paint | None = None,
    letter_spacing: Number | None = None,
    word_spacing: Number | None = None,
    overflow: TextOverflow | None = None,
    baseline: TextBaseline | None = None,
)

Returns a copy of this object with the specified properties overridden.

Edit this page