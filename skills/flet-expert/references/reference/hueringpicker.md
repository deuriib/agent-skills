# HueRingPicker
URL: https://flet.dev/docs/controls/colorpickers/hueringpicker

ReferenceControlsColor pickersHueRingPicker
HueRingPicker

A hue ring color picker that lets users select a hue on a circular ring, with an optional alpha slider.

Basic HueRingPicker

Inherits: LayoutControl

Properties
color - The currently selected color.
color_picker_height - Height of the color picker in virtual pixels.
enable_alpha - Whether to enable alpha (opacity) slider.
hue_ring_stroke_width - Stroke width for the hue ring.
picker_area_border_radius - Border radius for the picker area.
portrait_only - Whether to force portrait layout.
Events
on_color_change - Called when the picker color is changed.
Example​
import flet as ft

from flet_color_pickers import HueRingPicker





def main(page: ft.Page):

    page.title = "HueRingPicker"

    page.padding = 20



    def on_color_change(e: ft.ControlEvent):

        print(f"color: {e.data}")



    picker = HueRingPicker(

        color="#00ff00",

        hue_ring_stroke_width=20,

        picker_area_border_radius=ft.BorderRadius.all(5),

        on_color_change=on_color_change,

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
color_picker_height
class-attribute
instance-attribute
​
Copy
color_picker_height: Number | None = None

Height of the color picker in virtual pixels.

build
enable_alpha
class-attribute
instance-attribute
​
Copy
enable_alpha: bool = False

Whether to enable alpha (opacity) slider.

build
hue_ring_stroke_width
class-attribute
instance-attribute
​
Copy
hue_ring_stroke_width: Number | None = None

Stroke width for the hue ring.

build
picker_area_border_radius
class-attribute
instance-attribute
​
Copy
picker_area_border_radius: BorderRadiusValue | None = (
    None
)

Border radius for the picker area.

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
    ControlEventHandler[HueRingPicker] | None
) = None

Called when the picker color is changed.

The data property of the event handler argument contains the color value as a hex string.

Edit this page