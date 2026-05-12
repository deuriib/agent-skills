# PaintSweepGradient
URL: https://flet.dev/docs/types/paintsweepgradient

ReferenceTypesClassesPaintGradientPaintSweepGradient
PaintSweepGradient

More information on Sweep gradient https://api.flutter.dev/flutter/dart-ui/Gradient/Gradient.sweep.html

Inherits: PaintGradient

Properties
center - The center of the gradient.
color_stops - A list of values from 0.0 to 1.0 that denote fractions along the gradient.
colors - The colors the gradient should obtain at each of the stops.
end_angle - The angle in radians at which stop 1.0 of the gradient is placed.
rotation - The rotation of the gradient in https://en.wikipedia.org/wiki/Radian, around the center-point of its bounding box.
start_angle - The angle in https://en.wikipedia.org/wiki/Radian at which stop 0.0 of the gradient is placed.
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
colors: list[str]

The colors the gradient should obtain at each of the stops. This list must contain at least two colors.

If color_stops is provided, this list must have the same length as color_stops.

build
end_angle
class-attribute
instance-attribute
​
Copy
end_angle: Number = math.pi * 2

The angle in radians at which stop 1.0 of the gradient is placed. Defaults to math.pi * 2.

build
rotation
class-attribute
instance-attribute
​
Copy
rotation: Number | None = None

The rotation of the gradient in https://en.wikipedia.org/wiki/Radian, around the center-point of its bounding box.

build
start_angle
class-attribute
instance-attribute
​
Copy
start_angle: Number = 0.0

The angle in https://en.wikipedia.org/wiki/Radian at which stop 0.0 of the gradient is placed. Defaults to 0.0.

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
    colors: list[str] | None = None,
    color_stops: list[Number] | None = None,
    tile_mode: GradientTileMode | None = None,
    start_angle: Number | None = None,
    end_angle: Number | None = None,
    rotation: Number | None = None,
) -> PaintSweepGradient

Returns a copy of this object with the specified properties overridden.

Examples​
Canvas paint​
import math



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

                            cv.Path(

                                elements=[

                                    cv.Path.Arc(

                                        x=10,

                                        y=230,

                                        width=100,

                                        height=100,

                                        start_angle=3 * math.pi / 4,

                                        sweep_angle=3 * math.pi / 2,

                                    ),

                                ],

                                paint=ft.Paint(

                                    stroke_width=15,

                                    stroke_join=ft.StrokeJoin.ROUND,

                                    style=ft.PaintingStyle.STROKE,

                                    gradient=ft.PaintSweepGradient(

                                        start_angle=0,

                                        end_angle=math.pi * 2,

                                        rotation=3 * math.pi / 4,

                                        center=(60, 280),

                                        colors=[ft.Colors.YELLOW, ft.Colors.PURPLE],

                                        color_stops=[0.0, 1.0],

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