# BorderSide
URL: https://flet.dev/docs/types/borderside

ReferenceTypesClassesBorderSide
BorderSide

Creates the side of a border.

By default, the border is 1.0 logical pixels wide and solid black color.

To omit (not show) a side, set style to BorderStyle.NONE. It skips painting the border, but the border still has a width.

Properties
color - The color of this side of the border.
stroke_align - The relative position of the stroke on a BorderSide in an OutlinedBorder or Border.
stroke_inset - The amount of the stroke width that lies inside this BorderSide.
stroke_offset - The offset of the stroke, taking into account the stroke alignment.
stroke_outset - The amount of the stroke width that lies outside this BorderSide.
style - The style of this side of the border.
width - The width of this side of the border, in logical pixels.
Methods
copy - Returns a copy of this object with the specified properties overridden.
none - Creates a border side that is not rendered.
Properties​
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue = Colors.BLACK

The color of this side of the border.

build
stroke_align
class-attribute
instance-attribute
​
Copy
stroke_align: BorderSideStrokeAlignValue = (
    BorderSideStrokeAlign.INSIDE
)

The relative position of the stroke on a BorderSide in an OutlinedBorder or Border.

build
stroke_inset
property
​

The amount of the stroke width that lies inside this BorderSide.

For example, this will return the width for a stroke_align of -1, half the width for a stroke_align of 0, and 0 for a stroke_align of 1.

build
stroke_offset
property
​

The offset of the stroke, taking into account the stroke alignment.

For example, this will return the negative width of the stroke for a stroke_align of -1, 0 for a stroke_align of 0, and the width for a stroke_align of -1.

build
stroke_outset
property
​

The amount of the stroke width that lies outside this BorderSide.

For example, this will return 0 for a stroke_align of -1, half the width for a stroke_align of 0, and the width for a stroke_align of 1.

build
style
class-attribute
instance-attribute
​
Copy
style: BorderStyle = BorderStyle.SOLID

The style of this side of the border.

build
width
class-attribute
instance-attribute
​
Copy
width: Number = 1.0

The width of this side of the border, in logical pixels.

Setting width to 0.0 will result in a hairline border. This means that the border will have the width of one physical pixel. Hairline rendering takes shortcuts when the path overlaps a pixel more than once. This means that it will render faster than otherwise, but it might double-hit pixels, giving it a slightly darker/lighter result.

TIP

To omit the border entirely, set the style to BorderStyle.NONE.

Raises:

ValueError - If it is not greater than or equal to 0.
Methods​
deployed_code
copy
​
Copy
copy(
    width: Number | None = None,
    color: ColorValue | None = None,
    stroke_align: BorderSideStrokeAlignValue | None = None,
) -> BorderSide

Returns a copy of this object with the specified properties overridden.

deployed_code
none
staticmethod
​
Copy
none() -> BorderSide

Creates a border side that is not rendered.

Returns:

BorderSide - A hairline black BorderSide with style set to BorderStyle.NONE.
Edit this page