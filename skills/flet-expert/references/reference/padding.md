# Padding
URL: https://flet.dev/docs/types/padding

ReferenceTypesClassesPadding
Padding

Defines padding for all sides of a rectangle.

Properties
bottom - The padding value for the bottom side of the rectangle.
left - The padding value for the left side of the rectangle.
right - The padding value for the right side of the rectangle.
top - The padding value for the top side of the rectangle.
Methods
all - Applies the same padding to all sides.
only - Applies padding to the specified sides.
symmetric - Applies vertical padding to top and bottom sides and horizontal padding to left and right sides.
zero
Properties​
build
bottom
class-attribute
instance-attribute
​
Copy
bottom: Number = 0

The padding value for the bottom side of the rectangle.

build
left
class-attribute
instance-attribute
​
Copy
left: Number = 0

The padding value for the left side of the rectangle.

build
right
class-attribute
instance-attribute
​
Copy
right: Number = 0

The padding value for the right side of the rectangle.

build
top
class-attribute
instance-attribute
​
Copy
top: Number = 0

The padding value for the top side of the rectangle.

Methods​
deployed_code
all
classmethod
​
Copy
all(value: Number) -> Padding

Applies the same padding to all sides.

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
) -> Padding

Applies padding to the specified sides.

deployed_code
symmetric
classmethod
​
Copy
symmetric(
    vertical: Number = 0, horizontal: Number = 0
) -> Padding

Applies vertical padding to top and bottom sides and horizontal padding to left and right sides.

deployed_code
zero
classmethod
​
Copy
zero() -> Padding
Examples​
Example 1​
import flet as ft





def main(page: ft.Page):

    page.title = "Containers with different padding"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        controls=[

                            ft.Container(

                                content=ft.Button("container_1"),

                                bgcolor=ft.Colors.AMBER,

                                padding=ft.Padding.all(10),

                                width=150,

                                height=150,

                            ),

                            ft.Container(

                                content=ft.Button("container_2"),

                                bgcolor=ft.Colors.AMBER,

                                padding=ft.Padding.all(20),

                                width=150,

                                height=150,

                            ),

                            ft.Container(

                                content=ft.Button("container_3"),

                                bgcolor=ft.Colors.AMBER,

                                padding=ft.Padding.symmetric(horizontal=10),

                                width=150,

                                height=150,

                            ),

                            ft.Container(

                                content=ft.Button("container_4"),

                                bgcolor=ft.Colors.AMBER,

                                padding=ft.Padding.only(left=10),

                                width=150,

                                height=150,

                            ),

                        ]

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page