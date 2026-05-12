# MultipleChoiceBlockPicker
URL: https://flet.dev/docs/controls/colorpickers/multiplechoiceblockpicker

ReferenceControlsColor pickersMultipleChoiceBlockPicker
MultipleChoiceBlockPicker

A color picker that lets users choose multiple colors from a grid of available colors.

Basic MultipleChoiceBlockPicker

Inherits: LayoutControl

Properties
available_colors - A list of available colors to pick from.
colors - The currently selected colors.
Events
on_colors_change - Called when the picker colors are changed.
Example​
import flet as ft

from flet_color_pickers import MultipleChoiceBlockPicker





def main(page: ft.Page):

    page.title = "MultipleChoiceBlockPicker"

    page.padding = 20



    def on_colors_change(e: ft.ControlEvent):

        print(f"colors: {e.data}")



    dialog_picker = MultipleChoiceBlockPicker(

        colors=["#03a9f4", "#4caf50"],

        available_colors=[

            "#f44336",

            "#e91e63",

            "#9c27b0",

            "#3f51b5",

            "#2196f3",

            "#03a9f4",

            "#009688",

            "#4caf50",

            "#ff9800",

            "#795548",

        ],

        on_colors_change=on_colors_change,

    )



    dialog = ft.AlertDialog(

        modal=True,

        title=ft.Text("Pick colors"),

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
colors
class-attribute
instance-attribute
​
Copy
colors: list[ColorValue] | None = None

The currently selected colors.

Events​
bolt
on_colors_change
class-attribute
instance-attribute
​
Copy
on_colors_change: (
    ControlEventHandler[MultipleChoiceBlockPicker] | None
) = None

Called when the picker colors are changed.

The data property of the event handler argument contains the list of color values as hex strings.

Edit this page