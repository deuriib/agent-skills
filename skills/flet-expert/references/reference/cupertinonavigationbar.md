# CupertinoNavigationBar
URL: https://flet.dev/docs/controls/cupertinonavigationbar

ReferenceControlsCupertinoNavigationBar
CupertinoNavigationBar

An iOS-styled bottom navigation tab bar.

Navigation bars offer a persistent and convenient way to switch between primary destinations in an app.

Inherits: LayoutControl

Properties
active_color - The foreground color of the icon and title of the selected destinations.
bgcolor - The color of the navigation bar itself.
border - Defines the border of this navigation bar.
destinations - The destinations of this navigation bar.
icon_size - The size of all destination icons.
inactive_color - The foreground color of the icon and title of the unselected destinations.
selected_index - The index into destinations for the currently selected NavigationBarDestination.
Events
on_change - Called when selected destination changed.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.title = "CupertinoNavigationBar Example"



    page.navigation_bar = ft.CupertinoNavigationBar(

        bgcolor=ft.Colors.AMBER_100,

        inactive_color=ft.Colors.GREY,

        active_color=ft.Colors.BLACK,

        on_change=lambda e: print("Selected tab:", e.control.selected_index),

        destinations=[

            ft.NavigationBarDestination(

                icon=ft.Icons.EXPLORE_OUTLINED,

                selected_icon=ft.Icons.EXPLORE,

                label="Explore",

            ),

            ft.NavigationBarDestination(

                icon=ft.Icons.COMMUTE_OUTLINED,

                selected_icon=ft.Icons.COMMUTE,

                label="Commute",

            ),

            ft.NavigationBarDestination(

                icon=ft.Icons.BOOKMARK_BORDER,

                selected_icon=ft.Icons.BOOKMARK,

                label="Favorites",

            ),

        ],

    )



    page.add(

        ft.SafeArea(

            content=ft.Text("Body!"),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Wired navigation bar​
import flet as ft





def main(page: ft.Page):

    page.title = "CupertinoNavigationBar Example"



    body_text = ft.Text("Explore!")



    def handle_nav_destination_change(e: ft.Event[ft.CupertinoNavigationBar]):

        if e.control.selected_index == 0:

            body_text.value = "Explore!"

        elif e.control.selected_index == 1:

            body_text.value = "Find Your Way!"

        else:

            body_text.value = "Your Favorites!"



    page.navigation_bar = ft.CupertinoNavigationBar(

        bgcolor=ft.Colors.AMBER_100,

        inactive_color=ft.Colors.GREY,

        active_color=ft.Colors.BLACK,

        on_change=handle_nav_destination_change,

        destinations=[

            ft.NavigationBarDestination(

                icon=ft.Icons.EXPLORE_OUTLINED,

                selected_icon=ft.Icons.EXPLORE,

                label="Explore",

            ),

            ft.NavigationBarDestination(

                icon=ft.Icons.COMMUTE_OUTLINED,

                selected_icon=ft.Icons.COMMUTE,

                label="Commute",

            ),

            ft.NavigationBarDestination(

                icon=ft.Icons.BOOKMARK_BORDER,

                selected_icon=ft.Icons.BOOKMARK,

                label="Favorites",

            ),

        ],

    )



    page.add(

        ft.SafeArea(

            content=body_text,

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
active_color
class-attribute
instance-attribute
​
Copy
active_color: ColorValue | None = None

The foreground color of the icon and title of the selected destinations.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The color of the navigation bar itself.

build
border
class-attribute
instance-attribute
​
Copy
border: Border | None = None

Defines the border of this navigation bar.

build
destinations
instance-attribute
​
Copy
destinations: list[NavigationBarDestination]

The destinations of this navigation bar.

Raises:

ValueError - If it does not contain at least two visible NavigationBarDestinations.
build
icon_size
class-attribute
instance-attribute
​
Copy
icon_size: Number = 30

The size of all destination icons.

build
inactive_color
class-attribute
instance-attribute
​
Copy
inactive_color: ColorValue = CupertinoColors.INACTIVE_GRAY

The foreground color of the icon and title of the unselected destinations.

build
selected_index
class-attribute
instance-attribute
​
Copy
selected_index: int = 0

The index into destinations for the currently selected NavigationBarDestination.

Raises:

IndexError - If it is not greater than or equal to 0.
IndexError - If it is not less than the length of visible destinations.
Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: (
    ControlEventHandler[CupertinoNavigationBar] | None
) = None

Called when selected destination changed.

Edit this page