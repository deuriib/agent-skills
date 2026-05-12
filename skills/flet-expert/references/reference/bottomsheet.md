# BottomSheet
URL: https://flet.dev/docs/controls/bottomsheet

ReferenceControlsBottomSheet
BottomSheet

A modal bottom sheet.

Displays a temporary surface anchored to the bottom of the screen that presents supplemental content or actions. Prevents interaction with the underlying app while visible.

Example:

sheet = ft.BottomSheet(

    content=ft.Column(

        width=150,

        alignment=ft.MainAxisAlignment.CENTER,

        horizontal_alignment=ft.CrossAxisAlignment.CENTER,

        controls=[

            ft.Text("Choose an option"),

            ft.TextButton("Dismiss"),

        ],

    )

)

page.show_dialog(sheet)

Basic BottomSheet

Inherits: DialogControl

Properties
animation_style - The animation style of this bottom sheet.
barrier_color - The color of the scrim that obscures content behind this bottom sheet.
bgcolor - The background color of this bottom sheet.
clip_behavior - Defines how the content of this bottom sheet should be clipped.
content - The content of this bottom sheet.
dismissible - Specifies whether this bottom sheet will be dismissed when user taps on the scrim.
draggable - Specifies whether this bottom sheet can be dragged up and down and dismissed by swiping downwards.
elevation - Defines the size of the shadow below this bottom sheet.
fullscreen - Expands the sheet to fill the window/page height.
maintain_bottom_view_insets_padding - Adds a padding at the bottom to avoid obstructing this bottom sheet's content with on-screen keyboard or other system elements.
scrollable - Removes the half-height cap so the sheet can grow with its content.
shape - Defines the shape of this bottom sheet.
show_drag_handle - Whether to display drag handle at the top of sheet or not.
size_constraints - The size constraints to apply to this bottom sheet.
use_safe_area - Specifies whether the sheet will avoid system intrusions on the top, left, and right.
Examples​

Live example

Basic example​
import flet as ft





def main(page: ft.Page):

    page.title = "BottomSheet Example"

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def handle_sheet_dismissal(e: ft.Event[ft.DialogControl]):

        page.add(ft.Text("Bottom sheet dismissed"))



    sheet = ft.BottomSheet(

        on_dismiss=handle_sheet_dismissal,

        content=ft.Container(

            padding=50,

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                tight=True,

                controls=[

                    ft.Text("Here is a bottom sheet!"),

                    ft.Button("Dismiss", on_click=lambda _: page.pop_dialog()),

                ],

            ),

        ),

    )



    page.add(

        ft.SafeArea(

            # avoid_intrusions_left=False,

            # avoid_intrusions_top=False,

            # avoid_intrusions_right=False,

            # avoid_intrusions_bottom=False,

            content=ft.Column(

                controls=[

                    ft.Button(

                        content="Display bottom sheet",

                        on_click=lambda e: page.show_dialog(sheet),

                    )

                ]

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Fullscreen​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def handle_switch_change(e: ft.Event[ft.Switch]):

        sheet.fullscreen = e.control.value



    sheet = ft.BottomSheet(

        fullscreen=True,

        show_drag_handle=True,

        content=ft.Container(

            padding=ft.Padding.all(10),

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.Text("This is bottom sheet's content!"),

                    ft.Button("Close bottom sheet", on_click=lambda: page.pop_dialog()),

                ],

            ),

        ),

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.START,

                controls=[

                    ft.Button(

                        content="Display bottom sheet",

                        on_click=lambda e: page.show_dialog(sheet),

                    ),

                    ft.Switch(

                        value=True,

                        label="Fullscreen",

                        on_change=handle_switch_change,

                    ),

                ],

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
animation_style
class-attribute
instance-attribute
​
Copy
animation_style: AnimationStyle | None = None

The animation style of this bottom sheet.

build
barrier_color
class-attribute
instance-attribute
​
Copy
barrier_color: ColorValue | None = None

The color of the scrim that obscures content behind this bottom sheet.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this bottom sheet.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior | None = None

Defines how the content of this bottom sheet should be clipped.

build
content
instance-attribute
​
Copy
content: Control

The content of this bottom sheet.

TIP

Set scrollable True if this content is or contains scrollable controls (e.g., ListView, GridView) or you plan to expand the content or give it a custom height, else the bottom sheet might ignore the custom height and stop around mid-screen.

build
dismissible
class-attribute
instance-attribute
​
Copy
dismissible: bool = True

Specifies whether this bottom sheet will be dismissed when user taps on the scrim.

build
draggable
class-attribute
instance-attribute
​
Copy
draggable: bool = False

Specifies whether this bottom sheet can be dragged up and down and dismissed by swiping downwards.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

Defines the size of the shadow below this bottom sheet.

Raises:

ValueError - If it is not greater than or equal to 0.
build
fullscreen
class-attribute
instance-attribute
​
Copy
fullscreen: bool = False

Expands the sheet to fill the window/page height.

If set to True, scrollable is internally set to True equally, so the sheet can grow freely to fill the page.

build
maintain_bottom_view_insets_padding
class-attribute
instance-attribute
​
Copy
maintain_bottom_view_insets_padding: bool = True

Adds a padding at the bottom to avoid obstructing this bottom sheet's content with on-screen keyboard or other system elements.

build
scrollable
class-attribute
instance-attribute
​
Copy
scrollable: bool = False

Removes the half-height cap so the sheet can grow with its content.

Set this to True whenever the sheet body contains scrollable controls (e.g., ListView, GridView) or you plan to expand the content or give it a custom height, else the bottom sheet might ignore the custom height and stop around mid-screen.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

Defines the shape of this bottom sheet.

build
show_drag_handle
class-attribute
instance-attribute
​
Copy
show_drag_handle: bool = False

Whether to display drag handle at the top of sheet or not.

build
size_constraints
class-attribute
instance-attribute
​
Copy
size_constraints: BoxConstraints | None = None

The size constraints to apply to this bottom sheet.

build
use_safe_area
class-attribute
instance-attribute
​
Copy
use_safe_area: bool = True

Specifies whether the sheet will avoid system intrusions on the top, left, and right.

Edit this page