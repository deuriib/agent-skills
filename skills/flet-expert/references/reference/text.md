# Text
URL: https://flet.dev/docs/controls/canvas/text

ReferenceControlsCanvasText
Text

Draws value with style at the given (x, y) point.

Inherits: canvas.Shape

Properties
alignment - A point within a text rectangle to determine its position and rotation center.
ellipsis - String used to ellipsize overflowing text.
max_lines - The maximum number of lines painted.
max_width - The maximum width of the painted text.
rotate - The rotation of this text in radians.
spans - The list of TextSpan objects to build a rich text paragraph.
style - A text style to draw text and spans with.
text_align - Text horizontal align.
value - The text to draw.
x - The x-axis coordinate of the text's alignment point.
y - The y-axis coordinate of the text's alignment point.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment = field(
    default_factory=lambda: Alignment.TOP_LEFT
)

A point within a text rectangle to determine its position and rotation center.

build
ellipsis
class-attribute
instance-attribute
​
Copy
ellipsis: str | None = None

String used to ellipsize overflowing text.

build
max_lines
class-attribute
instance-attribute
​
Copy
max_lines: int | None = None

The maximum number of lines painted. Lines beyond this number are silently dropped. For example, if max_lines = 1, then only one line is rendered. If max_lines = None, but ellipsis != None, then lines after the first one that overflows the width constraints are dropped.

build
max_width
class-attribute
instance-attribute
​
Copy
max_width: Number | None = None

The maximum width of the painted text.

Defaults to None - infinity.

build
rotate
class-attribute
instance-attribute
​
Copy
rotate: Number = 0

The rotation of this text in radians. Text is rotated around the point determined by alignment.

build
spans
class-attribute
instance-attribute
​
Copy
spans: list[TextSpan] | None = None

The list of TextSpan objects to build a rich text paragraph.

build
style
class-attribute
instance-attribute
​
Copy
style: TextStyle | None = None

A text style to draw text and spans with.

build
text_align
class-attribute
instance-attribute
​
Copy
text_align: TextAlign = TextAlign.START

Text horizontal align.

build
value
class-attribute
instance-attribute
​
Copy
value: str | None = None

The text to draw.

build
x
instance-attribute
​
Copy
x: Number

The x-axis coordinate of the text's alignment point.

build
y
instance-attribute
​
Copy
y: Number

The y-axis coordinate of the text's alignment point.

Edit this page