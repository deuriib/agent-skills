# AppBar
URL: https://flet.dev/docs/controls/appbar

ReferenceControlsAppBar
AppBar

A material design app bar.

Example:

ft.AppBar(

    leading=ft.Icon(ft.Icons.MENU),

    title=ft.Text("Dashboard"),

    bgcolor=ft.Colors.SURFACE_CONTAINER,

    actions=[

        ft.IconButton(ft.Icons.SEARCH),

        ft.IconButton(ft.Icons.MORE_VERT),

    ],

)

Basic AppBar

Inherits: AdaptiveControl

Properties
actions - A list of Controls to display in a row after the title control.
actions_padding - The padding between the actions and the end of this app bar.
automatically_imply_leading - Whether we should try to imply the leading control if it is None.
bgcolor - The fill color to use for this app bar.
center_title - Whether the title should be centered.
clip_behavior - The content will be clipped (or not) according to this option.
color - The default color for Text and Icon controls within this app bar.
elevation - The app bar's elevation.
elevation_on_scroll - The elevation to be used if this app bar has something scrolled underneath it.
exclude_header_semantics - Whether the title should be wrapped with header Semantics.
force_material_transparency - Forces this app bar to be transparent (instead of Material's default type).
leading - A control to display before the toolbar's title.
leading_width - Defines the width of the leading control.
secondary - Whether this app bar is not being displayed at the top of the screen.
shadow_color - The color of the shadow below this app bar.
shape - The shape of this app bar's Material as well as its shadow.
title - The primary Control displayed in this app bar.
title_spacing - The spacing around title on the horizontal axis.
title_text_style - The style to be used for the Text controls in the title.
toolbar_height - Defines the height of the toolbar component of this app bar.
toolbar_opacity - The opacity of the toolbar.
toolbar_text_style - The style to be used for the Text controls in the app bar's leading and actions.
Examples​

Live example

Actions and Popup Menu​
import flet as ft





def main(page: ft.Page):

    page.title = "AppBar Example"



    def handle_checked_item_click(e: ft.Event[ft.PopupMenuItem]):

        e.control.checked = not e.control.checked



    page.appbar = ft.AppBar(

        leading=ft.Icon(ft.Icons.PALETTE),

        leading_width=40,

        title=ft.Text("AppBar Example"),

        center_title=False,

        bgcolor=ft.Colors.BLUE_GREY_400,

        actions=[

            ft.IconButton(ft.Icons.WB_SUNNY_OUTLINED),

            ft.IconButton(ft.Icons.FILTER_3),

            ft.PopupMenuButton(

                key="popup",

                items=[

                    ft.PopupMenuItem(content="Item 1"),

                    ft.PopupMenuItem(),  # divider

                    ft.PopupMenuItem(

                        content="Checked item",

                        checked=False,

                        on_click=handle_checked_item_click,

                    ),

                ],

            ),

        ],

    )

    page.add(ft.SafeArea(content=ft.Column(controls=[ft.Text("Body!")])))





if __name__ == "__main__":

    ft.run(main)

Theme and Material Mode Toggles​
import flet as ft



LIGHT_SEED_COLOR = ft.Colors.DEEP_ORANGE

DARK_SEED_COLOR = ft.Colors.DEEP_PURPLE





def main(page: ft.Page):

    page.title = "AppBar Example"



    def handle_checked_item_click(e: ft.Event[ft.PopupMenuItem]):

        e.control.checked = not e.control.checked



    page.theme_mode = ft.ThemeMode.LIGHT

    page.theme = ft.Theme(color_scheme_seed=LIGHT_SEED_COLOR)

    page.dark_theme = ft.Theme(color_scheme_seed=DARK_SEED_COLOR)



    def toggle_theme_mode(e: ft.Event[ft.IconButton]):

        page.theme_mode = (

            ft.ThemeMode.DARK

            if page.theme_mode == ft.ThemeMode.LIGHT

            else ft.ThemeMode.LIGHT

        )

        theme_mode_toggle.icon = (

            ft.Icons.WB_SUNNY_OUTLINED

            if page.theme_mode == ft.ThemeMode.LIGHT

            else ft.Icons.WB_SUNNY

        )



    theme_mode_toggle = ft.IconButton(

        key="theme_mode_toggle",

        icon=(

            ft.Icons.WB_SUNNY_OUTLINED

            if page.theme_mode == ft.ThemeMode.LIGHT

            else ft.Icons.WB_SUNNY

        ),

        on_click=toggle_theme_mode,

    )



    page.padding = 50

    page.appbar = ft.AppBar(

        # toolbar_height=100,

        bgcolor=ft.Colors.SECONDARY_CONTAINER,

        leading=ft.Icon(ft.Icons.PALETTE),

        leading_width=40,

        title=ft.Text("AppBar Example"),

        center_title=False,

        actions=[

            theme_mode_toggle,

            ft.PopupMenuButton(

                items=[

                    ft.PopupMenuItem(content="Item 1"),

                    ft.PopupMenuItem(icon=ft.Icons.POWER_INPUT, content="Check power"),

                    ft.PopupMenuItem(

                        on_click=lambda _: print(

                            "Button with a custom content clicked!"

                        ),

                        content=ft.Row(

                            controls=[

                                ft.Icon(ft.Icons.HOURGLASS_TOP_OUTLINED),

                                ft.Text("Item with a custom content"),

                            ]

                        ),

                    ),

                    ft.PopupMenuItem(),  # divider

                    ft.PopupMenuItem(

                        content="Checked item",

                        checked=False,

                        on_click=handle_checked_item_click,

                    ),

                ]

            ),

        ],

    )

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        value="Flet is a framework that allows building web, desktop "

                        "and mobile applications in Python without prior experience "

                        "in frontend development.You can build a UI for your program "

                        "with Flet controls which are based on Flutter by Google. "

                        "Flet goes beyond merely wrapping Flutter widgets. It adds "

                        "its own touch by combining smaller widgets, simplifying "

                        "complexities, implementing UI best practices, and applying "

                        "sensible defaults. This ensures that your applications look "

                        "stylish and polished without requiring additional design "

                        "efforts on your part.",

                        text_align=ft.TextAlign.END,

                    ),

                    ft.Button("Click me!"),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
actions
class-attribute
instance-attribute
​
Copy
actions: list[Control] | None = None

A list of Controls to display in a row after the title control.

Typically, these controls are IconButtons representing common operations. For less common operations, consider using a PopupMenuButton as the last action.

INFO

If AdaptiveControl.adaptive is True and this app is opened on an iOS or macOS device, these actions will be automatically placed in a Row. This is because CupertinoAppBar.trailing (which is the counterpart property of actions) takes only a single Control.

build
actions_padding
class-attribute
instance-attribute
​
Copy
actions_padding: PaddingValue | None = None

The padding between the actions and the end of this app bar.

build
automatically_imply_leading
class-attribute
instance-attribute
​
Copy
automatically_imply_leading: bool = True

Whether we should try to imply the leading control if it is None.

If True and leading is None, this app bar will automatically determine an appropriate leading control.
If False and leading is None, the space is allocated to the title.
If a leading control is provided, this parameter has no effect.
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The fill color to use for this app bar.

Default color is defined by AppBarTheme.bgcolor

build
center_title
class-attribute
instance-attribute
​
Copy
center_title: bool | None = None

Whether the title should be centered.

Default value is defined by AppBarTheme.center_title

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior | None = None

The content will be clipped (or not) according to this option.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The default color for Text and Icon controls within this app bar.

Default color is defined by AppBarTheme.color

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The app bar's elevation.

NOTE

This effect is only visible when using the Material 2 design (when Theme.use_material3 is False).

Raises:

ValueError - If it is not greater than or equal to 0.
build
elevation_on_scroll
class-attribute
instance-attribute
​
Copy
elevation_on_scroll: Number | None = None

The elevation to be used if this app bar has something scrolled underneath it.

Raises:

ValueError - If it is not greater than or equal to 0.
build
exclude_header_semantics
class-attribute
instance-attribute
​
Copy
exclude_header_semantics: bool = False

Whether the title should be wrapped with header Semantics.

build
force_material_transparency
class-attribute
instance-attribute
​
Copy
force_material_transparency: bool = False

Forces this app bar to be transparent (instead of Material's default type).

This will also remove the visual display of bgcolor and elevation, and affect other characteristics of this app bar.

build
leading
class-attribute
instance-attribute
​
Copy
leading: Control | None = None

A control to display before the toolbar's title.

Typically an Icon or IconButton control.

build
leading_width
class-attribute
instance-attribute
​
Copy
leading_width: Number | None = None

Defines the width of the leading control.

build
secondary
class-attribute
instance-attribute
​
Copy
secondary: bool = False

Whether this app bar is not being displayed at the top of the screen.

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

The color of the shadow below this app bar.

A shadow is only visible and displayed if the elevation is greater than zero.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of this app bar's Material as well as its shadow.

build
title
class-attribute
instance-attribute
​
Copy
title: StrOrControl | None = None

The primary Control displayed in this app bar.

Typically a Text control that contains a description of the current contents of this app.

NOTE

If AdaptiveControl.adaptive and this app is opened on an iOS or macOS device, this title control will be automatically centered, independent of the value of center_title.

build
title_spacing
class-attribute
instance-attribute
​
Copy
title_spacing: Number | None = None

The spacing around title on the horizontal axis. It is applied even if there are no leading or actions controls.

TIP

If you want title to take all the space available, set title_spacing to 0.0.

build
title_text_style
class-attribute
instance-attribute
​
Copy
title_text_style: TextStyle | None = None

The style to be used for the Text controls in the title.

build
toolbar_height
class-attribute
instance-attribute
​
Copy
toolbar_height: Number | None = None

Defines the height of the toolbar component of this app bar.

build
toolbar_opacity
class-attribute
instance-attribute
​
Copy
toolbar_opacity: Number = 1.0

The opacity of the toolbar.

0.0: transparent
1.0: fully opaque

Raises:

ValueError - If it is not between 0.0 and 1.0, inclusive.
build
toolbar_text_style
class-attribute
instance-attribute
​
Copy
toolbar_text_style: TextStyle | None = None

The style to be used for the Text controls in the app bar's leading and actions.

Edit this page