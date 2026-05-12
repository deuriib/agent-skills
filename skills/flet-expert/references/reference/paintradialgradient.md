# PaintRadialGradient
URL: https://flet.dev/docs/types/paintradialgradient

ReferenceTypesClassesPaintGradientPaintRadialGradient
PaintRadialGradient

More information on Radial gradient https://api.flutter.dev/flutter/dart-ui/Gradient/Gradient.radial.html

Inherits: PaintGradient

Properties
center - The center of the gradient.
color_stops - A list of values from 0.0 to 1.0 that denote fractions along the gradient.
colors - The colors the gradient should obtain at each of the stops.
focal - The focal point of the gradient.
focal_radius - The radius of the focal point of gradient, as a fraction of the shortest side of the paint box.
radius - The radius of the gradient.
tile_mode - How this gradient should tile the plane beyond in the region before begin and after end.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
center
instance-attribute
​
Copy
center: OffsetValue | None

The center of the gradient.

build
color_stops
class-attribute
instance-attribute
​
Copy
color_stops: list[Number] | None = None

A list of values from 0.0 to 1.0 that denote fractions along the gradient.

If provided, this list must have the same length as colors. If the first value is not 0.0, then a stop with position 0.0 and a color equal to the first color in colors is implied. If the last value is not 1.0, then a stop with position 1.0 and a color equal to the last color in colors is implied.

build
colors
instance-attribute
​
Copy
colors: list[ColorValue]

The colors the gradient should obtain at each of the stops. This list must contain at least two colors.

If stops is provided, this list must have the same length as stops.

build
focal
class-attribute
instance-attribute
​
Copy
focal: OffsetValue | None = None

The focal point of the gradient. If specified, the gradient will appear to be focused along the vector from center to focal.

build
focal_radius
class-attribute
instance-attribute
​
Copy
focal_radius: Number = 0.0

The radius of the focal point of gradient, as a fraction of the shortest side of the paint box.

For example, if a radial gradient is painted on a box that is 100.0 pixels wide and 200.0 pixels tall, then a radius of 1.0 will place the 1.0 stop at 100.0 pixels from the focal point.

build
radius
instance-attribute
​
Copy
radius: Number

The radius of the gradient.

build
tile_mode
class-attribute
instance-attribute
​
Copy
tile_mode: GradientTileMode = GradientTileMode.CLAMP

How this gradient should tile the plane beyond in the region before begin and after end.

Methods​
deployed_code
copy
​
Copy
copy(
    center: OffsetValue | None = None,
    radius: Number | None = None,
    colors: list[str] | None = None,
    color_stops: list[Number] | None = None,
    tile_mode: GradientTileMode | None = None,
    focal: OffsetValue | None = None,
    focal_radius: Number | None = None,
) -> PaintRadialGradient

Returns a copy of this object with the specified properties overridden.

Examples​
Canvas paint​
import flet as ft

import flet.canvas as cv





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    cv.Canvas(

                        width=float("inf"),

                        expand=True,

                        shapes=[

                            cv.Circle(

                                x=60,

                                y=170,

                                radius=50,

                                paint=ft.Paint(

                                    style=ft.PaintingStyle.FILL,

                                    gradient=ft.PaintRadialGradient(

                                        radius=50,

                                        center=(60, 170),

                                        colors=[ft.Colors.YELLOW, ft.Colors.BLUE],

                                    ),

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