# Icon
URL: https://flet.dev/docs/controls/icon

ReferenceControlsIcon
Icon

A control that displays an icon from a built-in or custom icon set.

Icons can be customized in color, size, and visual style using various parameters such as stroke weight, fill level, and shadows.

Example:

ft.Icon(ft.Icons.FAVORITE, color=ft.Colors.PRIMARY, size=40)

Basic Icon

Inherits: LayoutControl

Properties
apply_text_scaling - Whether to scale the icon based on the system or user's preferred text size.
blend_mode - The blend mode used when rendering the icon.
color - The color to use when drawing the icon.
fill - The fill amount of the icon, between 0.0 (outline) and 1.0 (solid).
grade - A fine-tuning adjustment for the stroke thickness of the icon.
icon - The icon to display, selected from a predefined icon set.
optical_size - Adjusts the icon's visual style for different sizes to maintain clarity and balance.
semantics_label - An accessibility label for the icon.
shadows - A list of shadows to apply beneath the icon.
size - The size (width and height) of the square area the icon will occupy.
weight - The stroke weight (thickness) of the icon's lines.
Examples​

To browse and visualize all available icons, visit our icons browser

Live example

Basic Example​
from typing import cast



import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    # material

                    ft.Row(

                        controls=[

                            ft.Icon(ft.Icons.FAVORITE, color=ft.Colors.PINK),

                            ft.Icon(

                                ft.Icons.AUDIOTRACK,

                                color=ft.Colors.GREEN_400,

                                size=30,

                            ),

                            ft.Icon(

                                ft.Icons.BEACH_ACCESS,

                                color=ft.Colors.BLUE,

                                size=50,

                            ),

                            ft.Icon(ft.Icons.SETTINGS, color="#c1c1c1"),

                        ]

                    ),

                    # cupertino

                    ft.Row(

                        controls=[

                            ft.Icon(

                                ft.CupertinoIcons.PROFILE_CIRCLED,

                                color=ft.Colors.PINK,

                            ),

                            ft.Icon(

                                icon=cast(

                                    ft.CupertinoIcons,

                                    ft.CupertinoIcons.random(),

                                ),

                                color=ft.Colors.GREEN_400,

                                size=30,

                            ),

                            ft.Icon(

                                icon=cast(

                                    ft.CupertinoIcons,

                                    ft.CupertinoIcons.random(),

                                ),

                                color=ft.Colors.BLUE,

                                size=50,

                            ),

                            ft.Icon(

                                icon=cast(

                                    ft.CupertinoIcons,

                                    ft.CupertinoIcons.random(),

                                ),

                                color="#c1c1c1",

                            ),

                        ]

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
apply_text_scaling
class-attribute
instance-attribute
​
Copy
apply_text_scaling: bool | None = None

Whether to scale the icon based on the system or user's preferred text size.

Useful when placing icons alongside text, ensuring both scale consistently for better readability and accessibility.

build
blend_mode
class-attribute
instance-attribute
​
Copy
blend_mode: BlendMode | None = BlendMode.SRC_OVER

The blend mode used when rendering the icon.

Blend modes control how the icon's color interacts with the background.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The color to use when drawing the icon.

build
fill
class-attribute
instance-attribute
​
Copy
fill: Number | None = None

The fill amount of the icon, between 0.0 (outline) and 1.0 (solid).

This feature requires the icon's font to support fill variation. It can be used to indicate state transitions or selection visually.

Raises:

ValueError - If it is not between 0.0 and 1.0, inclusive.
build
grade
class-attribute
instance-attribute
​
Copy
grade: Number | None = None

A fine-tuning adjustment for the stroke thickness of the icon.

This requires support from the icon's font. Grade values can be negative or positive. It allows precise visual adjustments without changing icon size.

build
icon
instance-attribute
​
Copy
icon: IconData

The icon to display, selected from a predefined icon set.

You can explore available icons using the Flet Icons Browser.

build
optical_size
class-attribute
instance-attribute
​
Copy
optical_size: Number | None = None

Adjusts the icon's visual style for different sizes to maintain clarity and balance.

This requires the icon font to support optical sizing.

Raises:

ValueError - If it is not strictly greater than 0.0.
build
semantics_label
class-attribute
instance-attribute
​
Copy
semantics_label: str | None = None

An accessibility label for the icon.

This text is not displayed visually but may be announced by screen readers or other assistive technologies.

build
shadows
class-attribute
instance-attribute
​
Copy
shadows: BoxShadowValue | None = None

A list of shadows to apply beneath the icon.

Use multiple shadows to simulate complex lighting effects. The order of shadows matters for how transparency is blended.

build
size
class-attribute
instance-attribute
​
Copy
size: Number | None = None

The size (width and height) of the square area the icon will occupy.

If not set, a default size will be used. When placing this icon inside other controls (such as buttons), those controls may also affect sizing.

build
weight
class-attribute
instance-attribute
​
Copy
weight: Number | None = None

The stroke weight (thickness) of the icon's lines.

This requires the icon font to support weight variation.

Raises:

ValueError - If it is not strictly greater than 0.0.
Edit this page