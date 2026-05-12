# CupertinoActivityIndicator
URL: https://flet.dev/docs/controls/cupertinoactivityindicator

ReferenceControlsCupertinoActivityIndicator
CupertinoActivityIndicator

An iOS-style activity indicator that spins clockwise.

ft.CupertinoActivityIndicator(

    radius=30,

    color=ft.CupertinoColors.DARK_BACKGROUND_GRAY,

)

Basic CupertinoActivityIndicator

Inherits: LayoutControl

Properties
animating - Whether this indicator is running its animation.
color - Defines the color of this indicator.
progress - Determines the percentage of spinner ticks that will be shown.
radius - The radius of this indicator.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER



    page.add(

        ft.SafeArea(

            content=ft.CupertinoActivityIndicator(

                animating=True,

                color=ft.Colors.RED,

                radius=50,

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
animating
class-attribute
instance-attribute
​
Copy
animating: bool = True

Whether this indicator is running its animation.

NOTE

Has no effect if progress is not None.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

Defines the color of this indicator.

build
progress
class-attribute
instance-attribute
​
Copy
progress: Number | None = None

Determines the percentage of spinner ticks that will be shown.

Typical usage would display all ticks, however, this allows for more fine-grained control such as during pull-to-refresh when the drag-down action shows one tick at a time as the user continues to drag down.

NOTE

If not None, then animating will be ignored.

Raises:

ValueError - If it is not between 0.0 and 1.0, inclusive.
build
radius
class-attribute
instance-attribute
​
Copy
radius: Number = 10

The radius of this indicator.

Raises:

ValueError - If it is not strictly greater than 0.
Edit this page