# MaterialPicker
URL: https://flet.dev/docs/controls/colorpickers/materialpicker

ReferenceControlsColor pickersMaterialPicker
MaterialPicker

A material palette picker for selecting primary and shade colors, with optional shade labels.

Basic MaterialPicker

Inherits: LayoutControl

Properties
color - The currently selected color.
enable_label - Whether to show color shade labels.
portrait_only - Whether to force portrait layout.
Events
on_color_change - Called when the picker color is changed.
on_primary_change - Called when the primary color is changed.
Example​
import flet as ft

from flet_color_pickers import MaterialPicker





def main(page: ft.Page):

    page.title = "MaterialPicker"

    page.padding = 20



    def on_color_change(e: ft.ControlEvent):

        print(f"color: {e.data}")



    def on_primary_change(e: ft.ControlEvent):

        print(f"primary: {e.data}")



    picker = MaterialPicker(

        color="#ff9800",

        on_color_change=on_color_change,

        on_primary_change=on_primary_change,

    )



    page.add(ft.SafeArea(content=picker))





if __name__ == "__main__":

    ft.run(main)

Properties​
build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The currently selected color.

build
enable_label
class-attribute
instance-attribute
​
Copy
enable_label: bool = False

Whether to show color shade labels.

build
portrait_only
class-attribute
instance-attribute
​
Copy
portrait_only: bool = False

Whether to force portrait layout.

Events​
bolt
on_color_change
class-attribute
instance-attribute
​
Copy
on_color_change: (
    ControlEventHandler[MaterialPicker] | None
) = None

Called when the picker color is changed.

The data property of the event handler argument contains the color value as a hex string.

bolt
on_primary_change
class-attribute
instance-attribute
​
Copy
on_primary_change: (
    ControlEventHandler[MaterialPicker] | None
) = None

Called when the primary color is changed.

The data property of the event handler argument contains the color value as a hex string.

Edit this page