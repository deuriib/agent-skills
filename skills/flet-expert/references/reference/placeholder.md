# Placeholder
URL: https://flet.dev/docs/controls/placeholder

ReferenceControlsPlaceholder
Placeholder

A placeholder box.

ft.Placeholder(

    expand=True,

    color=ft.Colors.RED_500,

)

Placeholder

Inherits: LayoutControl

Properties
color - The color of the placeholder box.
content - An optional Control to display inside the placeholder.
fallback_height - The height to use when the placeholder is in a situation with an unbounded height.
fallback_width - The width to use when the placeholder is in a situation with an unbounded width.
stroke_width - The width of the lines in the placeholder box.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Placeholder(

                expand=True,

                color=ft.Colors.GREEN_ACCENT,

                fallback_height=200,

                fallback_width=300,

                stroke_width=20,

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue = Colors.BLUE_GREY_700

The color of the placeholder box.

build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

An optional Control to display inside the placeholder.

build
fallback_height
class-attribute
instance-attribute
​
Copy
fallback_height: Number = 400.0

The height to use when the placeholder is in a situation with an unbounded height.

build
fallback_width
class-attribute
instance-attribute
​
Copy
fallback_width: Number = 400.0

The width to use when the placeholder is in a situation with an unbounded width.

build
stroke_width
class-attribute
instance-attribute
​
Copy
stroke_width: Number | None = 2.0

The width of the lines in the placeholder box.

Edit this page