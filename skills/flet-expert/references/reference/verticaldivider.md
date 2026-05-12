# VerticalDivider
URL: https://flet.dev/docs/controls/verticaldivider

ReferenceControlsVerticalDivider
VerticalDivider

A thin vertical line, with padding on either side.

In the material design language, this represents a divider.

Example:

ft.Row(

    width=120,

    height=60,

    expand=True,

    spacing=0,

    controls=[

        ft.Container(

            bgcolor=ft.Colors.BLUE_GREY_200,

            alignment=ft.Alignment.CENTER,

            expand=True,

        ),

        ft.VerticalDivider(),

        ft.Container(

            bgcolor=ft.Colors.GREY_500,

            alignment=ft.Alignment.CENTER,

            expand=True,

        ),

    ],

)

Vertical divider

Inherits: Control

Properties
color - The color to use when painting the line.
leading_indent - The amount of empty space to the leading edge of the divider.
radius - The border radius of the divider.
thickness - The thickness of this divider.
trailing_indent - The amount of empty space to the trailing edge of the divider.
width - The divider's width.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Row(

                width=180,

                height=100,

                spacing=0,

                controls=[

                    ft.Container(

                        bgcolor=ft.Colors.ORANGE_300,

                        alignment=ft.Alignment.CENTER,

                        expand=True,

                    ),

                    ft.VerticalDivider(),

                    ft.Container(

                        bgcolor=ft.Colors.BROWN_400,

                        alignment=ft.Alignment.CENTER,

                        expand=True,

                    ),

                    ft.VerticalDivider(width=1, color=ft.Colors.WHITE),

                    ft.Container(

                        bgcolor=ft.Colors.BLUE_300,

                        alignment=ft.Alignment.CENTER,

                        expand=True,

                    ),

                    ft.VerticalDivider(width=9, thickness=3),

                    ft.Container(

                        bgcolor=ft.Colors.GREEN_300,

                        alignment=ft.Alignment.CENTER,

                        expand=True,

                    ),

                ],

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
color: ColorValue | None = None

The color to use when painting the line.

If None, DividerTheme.color is used.

build
leading_indent
class-attribute
instance-attribute
​
Copy
leading_indent: Number | None = None

The amount of empty space to the leading edge of the divider.

If None, DividerTheme.leading_indent is used. If that's is also None, defaults to 0.0.

Raises:

ValueError - If it is not greater than or equal to 0.
build
radius
class-attribute
instance-attribute
​
Copy
radius: BorderRadiusValue | None = None

The border radius of the divider.

build
thickness
class-attribute
instance-attribute
​
Copy
thickness: Number | None = None

The thickness of this divider.

NOTE

A divider with a thickness of 0.0 is always drawn as a line with a width of exactly one device pixel.

If None, DividerTheme.thickness is used. If that's is also None, defaults to 0.0.

Raises:

ValueError - If it is not greater than or equal to 0.
build
trailing_indent
class-attribute
instance-attribute
​
Copy
trailing_indent: Number | None = None

The amount of empty space to the trailing edge of the divider.

If None, DividerTheme.trailing_indent is used. If that's is also None, defaults to 0.0.

Raises:

ValueError - If it is not greater than or equal to 0.
build
width
class-attribute
instance-attribute
​
Copy
width: Number | None = None

The divider's width. The divider itself is always drawn as a vertical line that is centered within the width specified by this value.

If None, DividerTheme.space is used. If that's is also None, defaults to 16.0.

Raises:

ValueError - If it is not greater than or equal to 0.
Edit this page