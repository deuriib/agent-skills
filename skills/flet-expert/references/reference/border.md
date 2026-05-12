# Border
URL: https://flet.dev/docs/types/border

ReferenceTypesClassesBorder
Border

A border comprised of four sides: top, right, bottom, left.

Each side of the border is an instance of BorderSide.

Properties
bottom - Bottom side of the border.
left - Left side of the border.
right - Right side of the border.
top - Top side of the border.
Methods
all - Creates a border whose sides are all the same.
copy - Returns a copy of this object with the specified properties overridden.
only - Creates a border with explicit sides.
symmetric - Creates a border with symmetrical vertical and horizontal sides.
Properties​
build
bottom
class-attribute
instance-attribute
​
Copy
bottom: BorderSide = field(
    default_factory=lambda: BorderSide.none()
)

Bottom side of the border.

build
left
class-attribute
instance-attribute
​
Copy
left: BorderSide = field(
    default_factory=lambda: BorderSide.none()
)

Left side of the border.

build
right
class-attribute
instance-attribute
​
Copy
right: BorderSide = field(
    default_factory=lambda: BorderSide.none()
)

Right side of the border.

build
top
class-attribute
instance-attribute
​
Copy
top: BorderSide = field(
    default_factory=lambda: BorderSide.none()
)

Top side of the border.

Methods​
deployed_code
all
classmethod
​
Copy
all(
    width: Number | None = None,
    color: ColorValue | None = None,
    side: BorderSide | None = None,
) -> Border

Creates a border whose sides are all the same.

If side is not None, it gets used and both width and color are ignored.

Parameters:

width (Number | None, default: None) - The side width. Used only when side is None.
color (ColorValue | None, default: None) - The side color. Used only when side is None.
side (BorderSide | None, default: None) - The BorderSide to apply to all sides. If set, it has precedence over width and color.

Returns:

A (Border) - class:~flet.Border with identical sides.
deployed_code
copy
​
Copy
copy(
    left: BorderSide | None = None,
    top: BorderSide | None = None,
    right: BorderSide | None = None,
    bottom: BorderSide | None = None,
) -> Border

Returns a copy of this object with the specified properties overridden.

deployed_code
only
classmethod
​
Copy
only(
    left: BorderSide | None = None,
    top: BorderSide | None = None,
    right: BorderSide | None = None,
    bottom: BorderSide | None = None,
) -> Border

Creates a border with explicit sides.

Parameters:

left (BorderSide | None, default: None) - The left side. Defaults to no border.
top (BorderSide | None, default: None) - The top side. Defaults to no border.
right (BorderSide | None, default: None) - The right side. Defaults to no border.
bottom (BorderSide | None, default: None) - The bottom side. Defaults to no border.

Returns:

A (Border) - class:~flet.Border built from the provided sides.
deployed_code
symmetric
classmethod
​
Copy
symmetric(
    vertical: BorderSide | None = None,
    horizontal: BorderSide | None = None,
) -> Border

Creates a border with symmetrical vertical and horizontal sides.

The vertical argument applies to the left and right sides, and the horizontal argument applies to the top and bottom sides.

Parameters:

vertical (BorderSide | None, default: None) - The side applied to the left and right.
horizontal (BorderSide | None, default: None) - The side applied to the top and bottom.

Returns:

A (Border) - class:~flet.Border with mirrored side pairs.
Examples​
Example 1​
import flet as ft





def main(page: ft.Page):

    page.title = "Containers with different borders"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        controls=[

                            ft.Container(

                                bgcolor=ft.Colors.AMBER,

                                padding=15,

                                border=ft.Border.all(10, ft.Colors.PINK_600),

                                border_radius=ft.BorderRadius.all(30),

                                width=150,

                                height=150,

                            ),

                            ft.Container(

                                bgcolor=ft.Colors.DEEP_PURPLE,

                                padding=15,

                                border=ft.Border.all(3, ft.Colors.LIGHT_GREEN_ACCENT),

                                border_radius=ft.BorderRadius.only(

                                    top_left=10, bottom_right=10

                                ),

                                width=150,

                                height=150,

                            ),

                            ft.Container(

                                bgcolor=ft.Colors.BLUE_GREY_900,

                                padding=15,

                                border=ft.Border.symmetric(

                                    vertical=ft.BorderSide(8, ft.Colors.YELLOW_800)

                                ),

                                width=150,

                                height=150,

                            ),

                        ]

                    )

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page