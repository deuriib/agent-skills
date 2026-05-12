# BlockPicker
URL: https://flet.dev/docs/controls/colorpickers/blockpicker

ReferenceControlsColor pickersBlockPicker
BlockPicker

A color picker that lets users choose a color from a grid of available colors.

Basic BlockPicker

Inherits: LayoutControl

Properties
available_colors - A list of available colors to pick from.
color - The currently selected color.
Events
on_color_change - Called when the picker color is changed.
Example​
import flet as ft

from flet_color_pickers import BlockPicker





def main(page: ft.Page):

    page.title = "BlockPicker"

    page.padding = 20



    def on_color_change(e: ft.ControlEvent):

        print(f"color: {e.data}")



    dialog_picker = BlockPicker(

        color="#9c27b0",

        available_colors=[

            "#f44336",

            "#e91e63",

            "#9c27b0",

            "#3f51b5",

            "#2196f3",

            "#009688",

            "#4caf50",

            "#795548",

        ],

        on_color_change=on_color_change,

    )



    dialog = ft.AlertDialog(

        modal=True,

        title=ft.Text("Pick a color"),

        content=dialog_picker,

        actions=[

            ft.TextButton("Close", on_click=lambda e: page.pop_dialog()),

        ],

    )



    page.add(

        ft.SafeArea(

            content=ft.IconButton(

                icon=ft.Icons.BRUSH,

                on_click=lambda e: page.show_dialog(dialog),

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
available_colors
class-attribute
instance-attribute
​
Copy
available_colors: list[ColorValue] | None = None

A list of available colors to pick from.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The currently selected color.

Events​
bolt
on_color_change
class-attribute
instance-attribute
​
Copy
on_color_change: (
    ControlEventHandler[BlockPicker] | None
) = None

Called when the picker color is changed.

The data property of the event handler argument contains the color value as a hex string.

Edit this page