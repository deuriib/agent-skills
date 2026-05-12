# Margin
URL: https://flet.dev/docs/types/margin

ReferenceTypesClassesMargin
Margin

Margin class has the properties to set margins for all sides of the rectangle.

Properties
bottom - The margin applied to the bottom.
left - The margin applied to the left.
right - The margin applied to the right.
top - The margin applied to the top.
Methods
all - Applies the same margin to all sides.
only - Applies margin to the specified sides.
symmetric - Applies vertical margin to top and bottom sides and horizontal margin to left and right sides.
Properties​
build
bottom
class-attribute
instance-attribute
​
Copy
bottom: Number = 0

The margin applied to the bottom.

build
left
class-attribute
instance-attribute
​
Copy
left: Number = 0

The margin applied to the left.

build
right
class-attribute
instance-attribute
​
Copy
right: Number = 0

The margin applied to the right.

build
top
class-attribute
instance-attribute
​
Copy
top: Number = 0

The margin applied to the top.

Methods​
deployed_code
all
classmethod
​
Copy
all(value: Number) -> Margin

Applies the same margin to all sides.

deployed_code
only
classmethod
​
Copy
only(
    left: Number = 0,
    top: Number = 0,
    right: Number = 0,
    bottom: Number = 0,
) -> Margin

Applies margin to the specified sides.

deployed_code
symmetric
classmethod
​
Copy
symmetric(
    vertical: Number = 0, horizontal: Number = 0
) -> Margin

Applies vertical margin to top and bottom sides and horizontal margin to left and right sides.

Examples​
Example 1​
import flet as ft





def main(page: ft.Page):

    page.title = "Margin Example"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        spacing=0,

                        controls=[

                            ft.Container(

                                content=ft.Button("container_1"),

                                bgcolor=ft.Colors.AMBER,

                                # padding=ft.Padding.all(10),

                                margin=ft.Margin.all(10),

                                width=200,

                                height=200,

                            ),

                            ft.Container(

                                content=ft.Button("container_2"),

                                bgcolor=ft.Colors.AMBER,

                                # padding=ft.Padding.all(20),

                                margin=ft.Margin.all(20),

                                width=200,

                                height=200,

                            ),

                            ft.Container(

                                content=ft.Button("container_3"),

                                bgcolor=ft.Colors.AMBER,

                                # padding=ft.Padding.symmetric(horizontal=10),

                                margin=ft.Margin.symmetric(vertical=10),

                                width=200,

                                height=200,

                            ),

                            ft.Container(

                                content=ft.Button("container_4"),

                                bgcolor=ft.Colors.AMBER,

                                # padding=ft.Padding.only(left=10),

                                margin=ft.Margin.only(left=10),

                                width=200,

                                height=200,

                            ),

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page