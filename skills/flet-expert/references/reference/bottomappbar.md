# BottomAppBar
URL: https://flet.dev/docs/controls/bottomappbar

ReferenceControlsBottomAppBar
BottomAppBar

A material design bottom app bar.

ft.BottomAppBar(

    bgcolor=ft.Colors.SURFACE_CONTAINER_LOW,

    content=ft.Row(

        alignment=ft.MainAxisAlignment.SPACE_AROUND,

        controls=[

            ft.IconButton(ft.Icons.MENU),

            ft.IconButton(ft.Icons.SEARCH),

            ft.IconButton(ft.Icons.SETTINGS),

        ],

    ),

)

Basic BottomAppBar

Inherits: LayoutControl

Properties
bgcolor - The fill color to use for this app bar.
border_radius - The border radius to apply when clipping and painting this app bar.
clip_behavior - Defines how the content of this app bar should be clipped.
content - The content of this bottom app bar.
elevation - The z-coordinate at which to place this bottom app bar relative to its parent.
notch_margin - The margin between the FloatingActionButton and this app bar's notch.
padding - Empty space to inscribe inside a container decoration (background, border).
shadow_color - The color of the shadow below this app bar.
shape - The notch that is made for the floating action button.
Examples​

Live example

Notched FloatingActionButton​
import flet as ft





def main(page: ft.Page):

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    page.floating_action_button = ft.FloatingActionButton(

        icon=ft.Icons.ADD,

        shape=ft.CircleBorder(),

    )

    page.floating_action_button_location = ft.FloatingActionButtonLocation.CENTER_DOCKED



    page.bottom_appbar = ft.BottomAppBar(

        bgcolor=ft.Colors.BLUE,

        shape=ft.CircularRectangleNotchShape(),

        content=ft.Row(

            controls=[

                ft.IconButton(icon=ft.Icons.MENU, icon_color=ft.Colors.WHITE),

                ft.Container(expand=True),

                ft.IconButton(icon=ft.Icons.SEARCH, icon_color=ft.Colors.WHITE),

                ft.IconButton(icon=ft.Icons.FAVORITE, icon_color=ft.Colors.WHITE),

            ]

        ),

    )



    page.add(ft.SafeArea(content=ft.Column(controls=[ft.Text("Content goes here...")])))





if __name__ == "__main__":

    ft.run(main)

Custom border radius​
import flet as ft





def main(page: ft.Page):

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    page.bottom_appbar = ft.BottomAppBar(

        border_radius=ft.BorderRadius.all(20),

        bgcolor=ft.Colors.BLUE,

        content=ft.Row(

            controls=[

                ft.IconButton(icon=ft.Icons.MENU, icon_color=ft.Colors.WHITE),

                ft.Container(expand=True),

                ft.IconButton(icon=ft.Icons.SEARCH, icon_color=ft.Colors.WHITE),

                ft.IconButton(icon=ft.Icons.FAVORITE, icon_color=ft.Colors.WHITE),

            ]

        ),

    )



    page.add(ft.SafeArea(content=ft.Column(controls=[ft.Text("Content goes here...")])))





if __name__ == "__main__":

    ft.run(main)

Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The fill color to use for this app bar.

If None, BottomAppBarTheme.bgcolor is used; if that is also None, then defaults to ColorScheme.surface.

build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue | None = None

The border radius to apply when clipping and painting this app bar.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior | None = None

Defines how the content of this app bar should be clipped.

If None, defaults to:

ClipBehavior.ANTI_ALIAS if border_radius is set and not equal to BorderRadius.all;
Else ClipBehavior.NONE.
build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

The content of this bottom app bar.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The z-coordinate at which to place this bottom app bar relative to its parent. It controls the size of the shadow below this app bar.

If None, BottomAppBarTheme.elevation is used; if that is also None, then defaults to 3.

Raises:

ValueError - If it is not greater than or equal to 0.
build
notch_margin
class-attribute
instance-attribute
​
Copy
notch_margin: Number = 4.0

The margin between the FloatingActionButton and this app bar's notch.

NOTE

Has effect only if shape is not None.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

Empty space to inscribe inside a container decoration (background, border).

If None, BottomAppBarTheme.padding is used; if that is also None, then defaults to Padding.symmetric(vertical=12.0, horizontal=16.0).

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

The color of the shadow below this app bar.

If None, BottomAppBarTheme.shadow_color is used; if that is also None, then defaults to Colors.TRANSPARENT.

build
shape
class-attribute
instance-attribute
​
Copy
shape: NotchShape | None = None

The notch that is made for the floating action button.

If None, BottomAppBarTheme.shape is used; if that is also None, then the shape will be rectangular with no notch.

Edit this page