# Divider
URL: https://flet.dev/docs/controls/divider

ReferenceControlsDivider
Divider

A thin horizontal line (divider), with padding on either side.

ft.Column(

    width=240,

    spacing=10,

    controls=[

        ft.Text("Section A", weight=ft.FontWeight.W_600),

        ft.Divider(),

        ft.Text("Section B"),

    ],

)

Basic Divider

Inherits: Control

Properties
color - The color to use when painting the line.
height - The divider's height extent.
leading_indent - The amount of empty space to the leading edge of the divider.
radius - The border radius of the divider.
thickness - The thickness of the line drawn within the divider.
trailing_indent - The amount of empty space to the trailing edge of the divider.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                spacing=0,

                expand=True,

                controls=[

                    ft.Container(

                        expand=True,

                        bgcolor=ft.Colors.AMBER,

                        alignment=ft.Alignment.CENTER,

                    ),

                    ft.Divider(),

                    ft.Container(

                        expand=True,

                        bgcolor=ft.Colors.PINK,

                        alignment=ft.Alignment.CENTER,

                    ),

                    ft.Divider(height=1, color=ft.Colors.WHITE),

                    ft.Container(

                        expand=True,

                        bgcolor=ft.Colors.BLUE_300,

                        alignment=ft.Alignment.CENTER,

                    ),

                    ft.Divider(height=9, thickness=3),

                    ft.Container(

                        expand=True,

                        bgcolor=ft.Colors.DEEP_PURPLE_200,

                        alignment=ft.Alignment.CENTER,

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
height
class-attribute
instance-attribute
​
Copy
height: Number | None = None

The divider's height extent. The divider itself is always drawn as a horizontal line that is centered within the height specified by this value.

If None, DividerTheme.space is used. If that's is also None, defaults to 16.0.

Raises:

ValueError - If height is negative.
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

The thickness of the line drawn within the divider.

A divider with a thickness of 0.0 is always drawn as a line with a height of exactly one device pixel.

If None, DividerTheme.thickness is used. If that is also None, defaults to 0.0.

Raises:

ValueError - If thickness is negative.
build
trailing_indent
class-attribute
instance-attribute
​
Copy
trailing_indent: Number | None = None

The amount of empty space to the trailing edge of the divider.

If None, DividerTheme.trailing_indent is used. If that is also None, defaults to 0.0.

Raises:

ValueError - If it is not greater than or equal to 0.
Edit this page