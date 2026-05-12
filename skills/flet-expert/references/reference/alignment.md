# Alignment
URL: https://flet.dev/docs/types/alignment

ReferenceTypesClassesAlignment
Alignment

Defines an alignment relative to the center.

Alignment explained
Properties
BOTTOM_CENTER - Represents the bottom center and is equivalent to Alignment(0.0, 1.0).
BOTTOM_LEFT - Represents the bottom left corner and is equivalent to Alignment(-1.0, 1.0).
BOTTOM_RIGHT - Represents the bottom right corner and is equivalent to Alignment(1.0, 1.0).
CENTER - Represents the center and is equivalent to Alignment(0.0, 0.0).
CENTER_LEFT - Represents the center left and is equivalent to Alignment(-1.0, 0.0).
CENTER_RIGHT - Represents the center right and is equivalent to Alignment(1.0, 0.0).
TOP_CENTER - Represents the top center and is equivalent to Alignment(0.0, -1.0).
TOP_LEFT - Represents the top left corner and is equivalent to Alignment(-1.0, -1.0).
TOP_RIGHT - Represents the top right corner and is equivalent to Alignment(1.0, -1.0).
x - Represents the horizontal distance from the center.
y - Represents the vertical distance from the center.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
BOTTOM_CENTER
class-attribute
​
Copy
BOTTOM_CENTER: AlignmentProperty

Represents the bottom center and is equivalent to Alignment(0.0, 1.0).

build
BOTTOM_LEFT
class-attribute
​
Copy
BOTTOM_LEFT: AlignmentProperty

Represents the bottom left corner and is equivalent to Alignment(-1.0, 1.0).

build
BOTTOM_RIGHT
class-attribute
​
Copy
BOTTOM_RIGHT: AlignmentProperty

Represents the bottom right corner and is equivalent to Alignment(1.0, 1.0).

build
CENTER
class-attribute
​
Copy
CENTER: AlignmentProperty

Represents the center and is equivalent to Alignment(0.0, 0.0).

build
CENTER_LEFT
class-attribute
​
Copy
CENTER_LEFT: AlignmentProperty

Represents the center left and is equivalent to Alignment(-1.0, 0.0).

build
CENTER_RIGHT
class-attribute
​
Copy
CENTER_RIGHT: AlignmentProperty

Represents the center right and is equivalent to Alignment(1.0, 0.0).

build
TOP_CENTER
class-attribute
​
Copy
TOP_CENTER: AlignmentProperty

Represents the top center and is equivalent to Alignment(0.0, -1.0).

build
TOP_LEFT
class-attribute
​
Copy
TOP_LEFT: AlignmentProperty

Represents the top left corner and is equivalent to Alignment(-1.0, -1.0).

build
TOP_RIGHT
class-attribute
​
Copy
TOP_RIGHT: AlignmentProperty

Represents the top right corner and is equivalent to Alignment(1.0, -1.0).

build
x
instance-attribute
​
Copy
x: Number

Represents the horizontal distance from the center.

It's value ranges between -1.0 and 1.0 inclusive.

build
y
instance-attribute
​
Copy
y: Number

Represents the vertical distance from the center.

It's value ranges between -1.0 and 1.0 inclusive.

Methods​
deployed_code
copy
​
Copy
copy(
    x: Number | None = None, y: Number | None = None
) -> Alignment

Returns a copy of this object with the specified properties overridden.

Examples​
Example 1​
import flet as ft





def main(page: ft.Page):

    page.title = "Containers with different alignments"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        controls=[

                            ft.Container(

                                bgcolor=ft.Colors.AMBER,

                                padding=15,

                                alignment=ft.Alignment.CENTER,

                                width=150,

                                height=150,

                                content=ft.Button("Center"),

                            ),

                            ft.Container(

                                bgcolor=ft.Colors.AMBER,

                                padding=15,

                                alignment=ft.Alignment.TOP_LEFT,

                                width=150,

                                height=150,

                                content=ft.Button("Top left"),

                            ),

                            ft.Container(

                                bgcolor=ft.Colors.AMBER,

                                padding=15,

                                alignment=ft.Alignment(-0.5, -0.5),

                                width=150,

                                height=150,

                                content=ft.Button("-0.5, -0.5"),

                            ),

                        ],

                        wrap=True,

                    )

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page