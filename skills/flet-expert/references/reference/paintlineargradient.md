# PaintLinearGradient
URL: https://flet.dev/docs/types/paintlineargradient

ReferenceTypesClassesPaintGradientPaintLinearGradient
PaintLinearGradient

More information on Linear gradient here.

Inherits: PaintGradient

Properties
begin - The offset at which stop 0.0 of the gradient is placed.
color_stops - A list of values from 0.0 to 1.0 that denote fractions along the gradient.
colors - The colors the gradient should obtain at each of the stops.
end - The offset at which stop 1.0 of the gradient is placed.
tile_mode - How this gradient should tile the plane beyond in the region before begin and after end.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
begin
instance-attribute
​
Copy
begin: OffsetValue | None

The offset at which stop 0.0 of the gradient is placed.

build
color_stops
class-attribute
instance-attribute
​
Copy
color_stops: list[Number] | None = None

A list of values from 0.0 to 1.0 that denote fractions along the gradient.

NOTE

If non-none, this list must have the same length as colors. If the first value is not 0.0, then a stop with position 0.0 and a color equal to the first color in colors is implied. If the last value is not 1.0, then a stop with position 1.0 and a color equal to the last color in colors is implied.

build
colors
instance-attribute
​
Copy
colors: list[ColorValue]

The colors the gradient should obtain at each of the stops. This list must contain at least two colors.

NOTE

If color_stops is not None, this list must have the same length as color_stops.

build
end
instance-attribute
​
Copy
end: OffsetValue | None

The offset at which stop 1.0 of the gradient is placed.

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
    begin: OffsetValue | None = None,
    end: OffsetValue | None = None,
    colors: list[str] | None = None,
    color_stops: list[Number] | None = None,
    tile_mode: GradientTileMode | None = None,
) -> PaintLinearGradient

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

                            cv.Rect(

                                x=10,

                                y=10,

                                width=100,

                                height=100,

                                border_radius=5,

                                paint=ft.Paint(

                                    style=ft.PaintingStyle.FILL,

                                    gradient=ft.PaintLinearGradient(

                                        begin=(0, 10),

                                        end=(100, 50),

                                        colors=[ft.Colors.BLUE, ft.Colors.YELLOW],

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