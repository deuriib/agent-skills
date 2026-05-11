# NavigationBar
URL: https://flet.dev/docs/controls/navigationbar/

ReferenceControlsNavigationBar
NavigationBar

Material 3 Navigation Bar component.

Navigation bars offer a persistent and convenient way to switch between primary destinations in an app.

ft.NavigationBar(

    destinations=[

        ft.NavigationBarDestination(icon=ft.Icons.CIRCLE, label="Item 1"),

        ft.NavigationBarDestination(icon=ft.Icons.SQUARE, label="Item 2"),

        ft.NavigationBarDestination(icon=ft.Icons.HEXAGON, label="Item 3"),

    ],

)

Simple navigation bar

Inherits: LayoutControl, AdaptiveControl

Properties
animation_duration - The transition time for each destination as it goes between selected and unselected.
bgcolor - The color of the navigation bar itself.
border - TBD
destinations - Defines the appearance of the button items that are arrayed within the navigation bar.
elevation - The elevation of the navigation bar itself.
indicator_color - The color of the selected destination indicator.
indicator_shape - The shape of the selected destination indicator.
label_behavior - Defines how the destinations' labels will be laid out and when they'll be displayed.
label_padding - The padding around the NavigationBarDestination.label.
overlay_color - The highlight color of the NavigationBarDestination in various ControlState states.
selected_index - The index into destinations for the current selected NavigationBarDestination or None if no destination is selected.
shadow_color - The color used for the drop shadow to indicate elevation.
Events
on_change - Called when selected destination changed.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.title = "NavigationBar Example"



    page.navigation_bar = ft.NavigationBar(

        destinations=[

            ft.NavigationBarDestination(icon=ft.Icons.EXPLORE, label="Explore"),

            ft.NavigationBarDestination(icon=ft.Icons.COMMUTE, label="Commute"),

            ft.NavigationBarDestination(

                icon=ft.Icons.BOOKMARK_BORDER,

                selected_icon=ft.Icons.BOOKMARK,

                label="Favorites",

            ),

        ]

    )



    page.add(

        ft.SafeArea(

            content=ft.Text("Body!"),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Adaptive navigation​

This example switches between a NavigationBar on narrow layouts and a NavigationRail with an end NavigationDrawer on wider layouts.

import flet as ft



DESTINATIONS = [

    ("Messages", ft.Icons.WIDGETS_OUTLINED, ft.Icons.WIDGETS),

    ("Profile", ft.Icons.FORMAT_PAINT_OUTLINED, ft.Icons.FORMAT_PAINT),

    ("Settings", ft.Icons.SETTINGS_OUTLINED, ft.Icons.SETTINGS),

]





def main(page: ft.Page):

    page.theme_mode = ft.ThemeMode.LIGHT

    page.padding = 0



    screen_index = 0



    def build_page_index_text() -> ft.Text:

        return ft.Text(f"Page Index = {screen_index}", size=24)



    def set_screen(index: int):

        nonlocal screen_index

        screen_index = index

        render()



    def build_navigation_bar() -> ft.NavigationBar:

        def handle_nav_bar_change(e: ft.Event[ft.NavigationBar]):

            set_screen(e.control.selected_index)



        return ft.NavigationBar(

            selected_index=screen_index,

            on_change=handle_nav_bar_change,

            destinations=[

                ft.NavigationBarDestination(

                    label=label,

                    icon=icon,

                    selected_icon=selected_icon,

                )

                for label, icon, selected_icon in DESTINATIONS

            ],

        )



    def build_navigation_rail() -> ft.NavigationRail:

        def handle_nav_rail_change(e: ft.Event[ft.NavigationRail]):

            if e.control.selected_index is not None:

                set_screen(e.control.selected_index)



        return ft.NavigationRail(

            min_width=50,

            selected_index=screen_index,

            use_indicator=True,

            on_change=handle_nav_rail_change,

            destinations=[

                ft.NavigationRailDestination(

                    label=label,

                    icon=icon,

                    selected_icon=selected_icon,

                )

                for label, icon, selected_icon in DESTINATIONS

            ],

        )



    def build_end_drawer() -> ft.NavigationDrawer:

        async def handle_drawer_change(e: ft.Event[ft.NavigationDrawer]):

            set_screen(e.control.selected_index)

            await page.close_end_drawer()



        return ft.NavigationDrawer(

            selected_index=screen_index,

            on_change=handle_drawer_change,

            controls=[

                ft.Container(

                    padding=ft.Padding.only(left=28, top=16, right=16, bottom=10),

                    content=ft.Text(

                        "Header", theme_style=ft.TextThemeStyle.TITLE_SMALL

                    ),

                ),

                *[

                    ft.NavigationDrawerDestination(

                        label=label,

                        icon=icon,

                        selected_icon=selected_icon,

                    )

                    for label, icon, selected_icon in DESTINATIONS

                ],

            ],

        )



    def build_bottom_bar_layout() -> ft.SafeArea:

        return ft.SafeArea(

            expand=True,

            content=ft.Container(

                expand=True,

                alignment=ft.Alignment.CENTER,

                content=build_page_index_text(),

            ),

        )



    def build_drawer_layout() -> ft.SafeArea:

        async def open_drawer(e: ft.Event[ft.Button]):

            await page.show_end_drawer()



        return ft.SafeArea(

            expand=True,

            avoid_intrusions_top=False,

            avoid_intrusions_bottom=False,

            content=ft.Row(

                expand=True,

                controls=[

                    ft.Container(

                        padding=ft.Padding.symmetric(horizontal=5),

                        content=build_navigation_rail(),

                    ),

                    ft.VerticalDivider(thickness=1, width=1),

                    ft.Column(

                        expand=True,

                        alignment=ft.MainAxisAlignment.SPACE_EVENLY,

                        horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                        controls=[

                            build_page_index_text(),

                            ft.Button("Open Drawer", on_click=open_drawer),

                        ],

                    ),

                ],

            ),

        )



    def render():

        page.clean()

        if (page.width or page.window.width) >= 450:  # wide layout

            page.navigation_bar = None

            page.end_drawer = build_end_drawer()

            page.add(build_drawer_layout())

        else:  # narrow layout

            page.end_drawer = None

            page.navigation_bar = build_navigation_bar()

            page.add(build_bottom_bar_layout())

        page.update()



    page.on_resize = lambda e: render()

    render()





if __name__ == "__main__":

    ft.run(main)

Properties​
build
animation_duration
class-attribute
instance-attribute
​
Copy
animation_duration: DurationValue | None = None

The transition time for each destination as it goes between selected and unselected.

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

TBD

build
destinations
class-attribute
instance-attribute
​
Copy
destinations: list[NavigationBarDestination] = field(
    default_factory=list
)

Defines the appearance of the button items that are arrayed within the navigation bar.

Raises:

ValueError - If it does not contain at least two visible destinations.
build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The elevation of the navigation bar itself.

build
indicator_color
class-attribute
instance-attribute
​
Copy
indicator_color: ColorValue | None = None

The color of the selected destination indicator.

build
indicator_shape
class-attribute
instance-attribute
​
Copy
indicator_shape: OutlinedBorder | None = None

The shape of the selected destination indicator.

build
label_behavior
class-attribute
instance-attribute
​
Copy
label_behavior: NavigationBarLabelBehavior | None = None

Defines how the destinations' labels will be laid out and when they'll be displayed.

Can be used to show all labels, show only the selected label, or hide all labels.

Defaults to NavigationBarLabelBehavior.ALWAYS_SHOW.

build
label_padding
class-attribute
instance-attribute
​
Copy
label_padding: PaddingValue | None = None

The padding around the NavigationBarDestination.label.

build
overlay_color
class-attribute
instance-attribute
​
Copy
overlay_color: ControlStateValue[ColorValue] | None = None

The highlight color of the NavigationBarDestination in various ControlState states.

The following ControlState values are supported: PRESSED, HOVERED and FOCUSED.

build
selected_index
class-attribute
instance-attribute
​
Copy
selected_index: int = 0

The index into destinations for the current selected NavigationBarDestination or None if no destination is selected.

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

The color used for the drop shadow to indicate elevation.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[NavigationBar] | None = None

Called when selected destination changed.

Edit this page