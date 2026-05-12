# TextDecoration
URL: https://flet.dev/docs/types/textdecoration

ReferenceTypesClassesTextDecoration
TextDecoration

A linear decoration to draw near the text.

Inherits: enum.IntFlag

Properties
LINE_THROUGH - Draw a line through each line of text.
NONE - Do not draw a decoration.
OVERLINE - Draw a line above each line of text.
UNDERLINE - Draw a line underneath each line of text.
Methods
combine - Creates a decoration that paints the union of all the given decorations.
Properties​
build
LINE_THROUGH
class-attribute
instance-attribute
​

Draw a line through each line of text.

build
NONE
class-attribute
instance-attribute
​

Do not draw a decoration.

build
OVERLINE
class-attribute
instance-attribute
​

Draw a line above each line of text.

build
UNDERLINE
class-attribute
instance-attribute
​

Draw a line underneath each line of text.

Methods​
deployed_code
combine
classmethod
​
Copy
combine(
    decorations: list[TextDecoration],
) -> TextDecoration

Creates a decoration that paints the union of all the given decorations.

Usage Example​

The enum is a flag, so multiple decorations can be combined together as follows:

style = ft.TextStyle(decoration=ft.TextDecoration.UNDERLINE | ft.TextDecoration.OVERLINE)

Edit this page