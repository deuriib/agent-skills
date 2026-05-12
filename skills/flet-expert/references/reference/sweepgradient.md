# SweepGradient
URL: https://flet.dev/docs/types/sweepgradient

ReferenceTypesClassesGradientSweepGradient
SweepGradient

Creates a sweep gradient centered at center that starts at start_angle and ends at end_angle.

More information here.

Inherits: Gradient

Properties
center - The center of the gradient, as an offset into the (-1.0, -1.0) x (1.0, 1.0) square describing the gradient which will be mapped onto the paint box.
end_angle - The angle in radians at which stop 1.0 of the gradient is placed.
start_angle - The angle in radians at which stop 0.0 of the gradient is placed.
Properties​
build
center
class-attribute
instance-attribute
​
Copy
center: Alignment = field(
    default_factory=lambda: Alignment.CENTER
)

The center of the gradient, as an offset into the (-1.0, -1.0) x (1.0, 1.0) square describing the gradient which will be mapped onto the paint box.

For example, an Alignment.CENTER will place the sweep gradient in the center of the box.

build
end_angle
class-attribute
instance-attribute
​
Copy
end_angle: Number = math.pi * 2

The angle in radians at which stop 1.0 of the gradient is placed.

build
start_angle
class-attribute
instance-attribute
​
Copy
start_angle: Number = 0.0

The angle in radians at which stop 0.0 of the gradient is placed.

Examples​
Container with sweep gradient​
import math



import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Container(

                        alignment=ft.Alignment.CENTER,

                        width=150,

                        height=150,

                        border_radius=ft.BorderRadius.all(5),

                        gradient=ft.SweepGradient(

                            center=ft.Alignment.CENTER,

                            start_angle=0.0,

                            end_angle=math.pi * 2,

                            stops=[0.0, 0.25, 0.5, 0.75, 1.0],

                            colors=[

                                "0xFF4285F4",

                                "0xFF34A853",

                                "0xFFFBBC05",

                                "0xFFEA4335",

                                "0xFF4285F4",

                            ],

                        ),

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page