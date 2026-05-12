# BoxShadow
URL: https://flet.dev/docs/types/boxshadow

ReferenceTypesClassesBoxShadow
BoxShadow

Configuration for a box's shadow.

Properties
blur_radius - The standard deviation of the Gaussian to convolve with the shadow's shape.
blur_style - The blur style to apply to this shadow.
color - Color used to draw the shadow.
offset - The displacement of the shadow from the casting element.
spread_radius - The amount the box should be inflated prior to applying the blur.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
blur_radius
class-attribute
instance-attribute
​
Copy
blur_radius: Number = 0.0

The standard deviation of the Gaussian to convolve with the shadow's shape.

build
blur_style
class-attribute
instance-attribute
​
Copy
blur_style: BlurStyle = BlurStyle.NORMAL

The blur style to apply to this shadow.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue = Colors.BLACK

Color used to draw the shadow.

build
offset
class-attribute
instance-attribute
​
Copy
offset: OffsetValue = field(
    default_factory=lambda: Offset()
)

The displacement of the shadow from the casting element. Positive x/y offsets will shift the shadow to the right and down, while negative offsets shift the shadow to the left and up. The offsets are relative to the position of the element that is casting it.

build
spread_radius
class-attribute
instance-attribute
​
Copy
spread_radius: Number = 0.0

The amount the box should be inflated prior to applying the blur.

Methods​
deployed_code
copy
​
Copy
copy(
    spread_radius: Number | None = None,
    blur_radius: Number | None = None,
    color: ColorValue | None = None,
    offset: OffsetValue | None = None,
    blur_style: BlurStyle | None = None,
) -> BoxShadow

Returns a copy of this object with the specified properties overridden.

Examples​
Example 1​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Container(

                        bgcolor=ft.Colors.YELLOW,

                        width=100,

                        height=100,

                        border_radius=50,

                        shadow=[

                            ft.BoxShadow(

                                spread_radius=1,

                                blur_radius=15,

                                color=ft.Colors.WHITE,

                                offset=ft.Offset(-5, -5),

                            ),

                            ft.BoxShadow(

                                spread_radius=1,

                                blur_radius=15,

                                color=ft.Colors.GREY_600,

                                offset=ft.Offset(5, 5),

                            ),

                        ],

                    ),

                    ft.Container(

                        # bgcolor=ft.Colors.WHITE,

                        border_radius=10,

                        width=100,

                        height=100,

                        shadow=ft.BoxShadow(

                            spread_radius=1,

                            blur_radius=15,

                            color=ft.Colors.BLUE_GREY_300,

                            offset=ft.Offset(0, 0),

                            blur_style=ft.BlurStyle.OUTER,

                        ),

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page