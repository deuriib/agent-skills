# FloatingActionButton
URL: https://flet.dev/docs/controls/floatingactionbutton

ReferenceControlsFloatingActionButton
FloatingActionButton

A floating action button is a circular icon button that hovers over content to promote a primary action in the application. Floating action button is usually set to page.floating_action_button, but can also be added as a regular control at any place on a page.

Example:

ft.FloatingActionButton(icon=ft.Icons.ADD)

Basic FloatingActionButton

Inherits: LayoutControl

Properties
autofocus - True if the control will be selected as the initial focus.
bgcolor - Button background color.
clip_behavior - Defines how the content is clipped.
content - The content of this button.
disabled_elevation - The elevation of this button when disabled.
elevation - The elevation of this button.
enable_feedback - Whether detected gestures should provide acoustic and/or haptic feedback.
focus_color - The color to use for filling this button when it has input focus.
focus_elevation - The elevation of this button when it has input focus.
foreground_color - The default foreground color for icons and text within this button.
highlight_elevation - The elevation of this button when it is highlighted.
hover_color - The color to use for filling this button when hovered.
hover_elevation - The elevation of this button it is enabled and being hovered over.
icon - Icon shown in this button.
mini - Controls the size of this button.
mouse_cursor - The cursor to be displayed when a mouse pointer enters or is hovering over this control.
shape - The shape of the FAB's border.
splash_color - The color to use for the ink splash.
url - The URL to open when this button is clicked.
Events
on_click - Called when a user clicks this button.
Examples​

Live example

Handling clicks​
import flet as ft





def main(page: ft.Page):

    page.title = "Floating Action Button"

    page.theme_mode = ft.ThemeMode.LIGHT

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.padding = 0

    page.scroll = ft.ScrollMode.HIDDEN



    count = 1



    def handle_fab_click(e: ft.Event[ft.FloatingActionButton]):

        nonlocal count

        page.add(

            ft.ListTile(

                title=ft.Text(f"Tile {count}"),

                bgcolor=ft.Colors.TEAL_300,

                leading=ft.Icon(

                    ft.Icons.CIRCLE_OUTLINED,

                    color=ft.Colors.DEEP_ORANGE_300,

                ),

                on_click=lambda x: print(x.control.title.value + " was clicked!"),

            )

        )

        page.show_dialog(ft.SnackBar(ft.Text("Tile was added successfully!")))

        count += 1



    page.floating_action_button = ft.FloatingActionButton(

        key="handling_clicks_fab",

        icon=ft.Icons.ADD,

        on_click=handle_fab_click,

        bgcolor=ft.Colors.LIME_300,

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Container(

                        bgcolor=ft.Colors.BLUE,

                        padding=ft.Padding.all(20),

                        content=ft.Row(

                            alignment=ft.MainAxisAlignment.CENTER,

                            controls=[

                                ft.Text(

                                    value="Floating Action Button Example",

                                    style=ft.TextStyle(

                                        size=20,

                                        weight=ft.FontWeight.W_500,

                                    ),

                                )

                            ],

                        ),

                    ),

                    ft.Text("Press the FAB to add a tile!"),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

True if the control will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Button background color.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.NONE

Defines how the content is clipped.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

The content of this button.

Raises:

ValueError - If neither icon nor a valid content (string or visible Control) is provided.
build
disabled_elevation
class-attribute
instance-attribute
​
Copy
disabled_elevation: Number | None = None

The elevation of this button when disabled.

Defaults to elevation.

Raises:

ValueError - If it is not greater than or equal to 0.
build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The elevation of this button.

Defaults to 6.

Raises:

ValueError - If it is not greater than or equal to 0.
build
enable_feedback
class-attribute
instance-attribute
​
Copy
enable_feedback: bool | None = None

Whether detected gestures should provide acoustic and/or haptic feedback. On Android, for example, setting this to True will produce a click sound and a long-press will produce a short vibration.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color to use for filling this button when it has input focus.

build
focus_elevation
class-attribute
instance-attribute
​
Copy
focus_elevation: Number | None = None

The elevation of this button when it has input focus.

Defaults to 8.

Raises:

ValueError - If it is not greater than or equal to 0.
build
foreground_color
class-attribute
instance-attribute
​
Copy
foreground_color: ColorValue | None = None

The default foreground color for icons and text within this button.

build
highlight_elevation
class-attribute
instance-attribute
​
Copy
highlight_elevation: Number | None = None

The elevation of this button when it is highlighted.

Defaults to 12.

Raises:

ValueError - If it is not greater than or equal to 0.
build
hover_color
class-attribute
instance-attribute
​
Copy
hover_color: ColorValue | None = None

The color to use for filling this button when hovered.

build
hover_elevation
class-attribute
instance-attribute
​
Copy
hover_elevation: Number | None = None

The elevation of this button it is enabled and being hovered over.

Defaults to 8.

Raises:

ValueError - If it is not greater than or equal to 0.
build
icon
class-attribute
instance-attribute
​
Copy
icon: IconDataOrControl | None = None

Icon shown in this button.

build
mini
class-attribute
instance-attribute
​
Copy
mini: bool = False

Controls the size of this button.

By default, floating action buttons are non-mini and have a height and width of 56.0 logical pixels. Mini floating action buttons have a height and width of 40.0 logical pixels with a layout width and height of 48.0 logical pixels.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor to be displayed when a mouse pointer enters or is hovering over this control.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of the FAB's border.

build
splash_color
class-attribute
instance-attribute
​
Copy
splash_color: ColorValue | None = None

The color to use for the ink splash.

build
url
class-attribute
instance-attribute
​
Copy
url: str | Url | None = None

The URL to open when this button is clicked.

Additionally, if on_click event callback is provided, it is fired after that.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: (
    ControlEventHandler[FloatingActionButton] | None
) = None

Called when a user clicks this button.

Edit this page