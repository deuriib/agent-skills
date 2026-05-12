# Gradient
URL: https://flet.dev/docs/types/gradient/

ReferenceTypesClassesGradient
Gradient

A shader that renders a color gradient.

There are several types of gradients:

LinearGradient
RadialGradient
SweepGradient
Properties
colors - The colors the gradient should obtain at each of the stops.
rotation - The rotation of the gradient in radians, around the center-point of its bounding box.
stops - A list of values from 0.0 to 1.0 that denote fractions along the gradient.
tile_mode - How this gradient should tile the plane beyond in the region before begin and after end.
Properties​
build
colors
instance-attribute
​
Copy
colors: list[str]

The colors the gradient should obtain at each of the stops. This list must contain at least two colors.

If stops is provided, this list must have the same length as it.

build
rotation
class-attribute
instance-attribute
​
Copy
rotation: Number | None = None

The rotation of the gradient in radians, around the center-point of its bounding box.

build
stops
class-attribute
instance-attribute
​
Copy
stops: list[Number] | None = None

A list of values from 0.0 to 1.0 that denote fractions along the gradient.

If provided, this list must have the same length as colors. If the first value is not 0.0, then a stop with position 0.0 and a color equal to the first color in colors is implied. If the last value is not 1.0, then a stop with position 1.0 and a color equal to the last color in colors is implied.

build
tile_mode
class-attribute
instance-attribute
​
Copy
tile_mode: GradientTileMode = GradientTileMode.CLAMP

How this gradient should tile the plane beyond in the region before begin and after end.

Examples​
Containers with gradients​
import math



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        alignment=ft.MainAxisAlignment.CENTER,

                        scroll=ft.ScrollMode.AUTO,

                        controls=[

                            ft.Container(

                                content=ft.Text("Linear gradient"),

                                padding=10,

                                alignment=ft.Alignment.CENTER,

                                width=200,

                                height=200,

                                border_radius=10,

                                gradient=ft.LinearGradient(

                                    begin=ft.Alignment.TOP_LEFT,

                                    end=ft.Alignment(0.8, 1),

                                    tile_mode=ft.GradientTileMode.MIRROR,

                                    rotation=math.pi / 3,

                                    colors=[

                                        "0xff1f005c",

                                        "0xff5b0060",

                                        "0xff870160",

                                        "0xffac255e",

                                        "0xffca485c",

                                        "0xffe16b5c",

                                        "0xfff39060",

                                        "0xffffb56b",

                                    ],

                                ),

                            ),

                            ft.Container(

                                content=ft.Text("Linear gradient with stops"),

                                padding=10,

                                alignment=ft.Alignment.CENTER,

                                width=200,

                                height=200,

                                border_radius=10,

                                gradient=ft.LinearGradient(

                                    begin=ft.Alignment.CENTER_LEFT,

                                    end=ft.Alignment.CENTER_RIGHT,

                                    tile_mode=ft.GradientTileMode.MIRROR,

                                    stops=[0.1, 0.2, 1.0],

                                    colors=[

                                        ft.Colors.RED,

                                        ft.Colors.GREEN,

                                        ft.Colors.BLUE,

                                    ],

                                ),

                            ),

                            ft.Container(

                                content=ft.Text("Radial gradient"),

                                padding=10,

                                alignment=ft.Alignment.CENTER,

                                width=200,

                                height=200,

                                border_radius=10,

                                gradient=ft.RadialGradient(

                                    center=ft.Alignment(0.7, -0.6),

                                    radius=0.2,

                                    stops=[0.4, 1.0],

                                    colors=["0xFFFFFF00", "0xFF0099FF"],

                                ),

                            ),

                            ft.Container(

                                content=ft.Text("Sweep gradient"),

                                padding=10,

                                alignment=ft.Alignment.CENTER,

                                width=200,

                                height=200,

                                border_radius=10,

                                gradient=ft.SweepGradient(

                                    center=ft.Alignment.CENTER,

                                    start_angle=0.0,

                                    end_angle=math.pi * 2,

                                    rotation=math.pi / 4,

                                    stops=[0.0, 0.25, 0.5, 0.75, 1.0],

                                    colors=[

                                        "0xFF4285F4",

                                        "0xFF34A853",

                                        "0xFFFBBC05",

                                        "0xFFEA4335",

                                        "0xFF4285F4",

                                    ],

                                ),

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