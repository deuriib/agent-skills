# ColorPicker
URL: https://flet.dev/docs/controls/colorpickers/colorpicker

ReferenceControlsColor pickersColorPicker
ColorPicker

A full-featured color picker with palette, sliders, labels, and optional history.

Basic ColorPicker

Inherits: LayoutControl

Properties
color - The currently selected color.
color_history - A list of colors to display as a history palette.
color_picker_width - Width of the color picker in virtual pixels.
display_thumb_color - Whether to display the thumb color in slider.
enable_alpha - Whether to enable alpha (opacity) slider.
hex_input_bar - Whether to show the hex input bar.
hsv_color - The currently selected HSV color.
label_text_style - Text style for labels.
label_types - Color label types to display.
palette_type - Palette type for the picker area.
picker_area_border_radius - Border radius for the picker area.
picker_area_height_percent - Height of the picker area as a percentage of the picker width.
Events
on_color_change - Called when the picker color is changed.
on_history_change - Called when the history palette is changed.
on_hsv_color_change - Called when the picker HSV color is changed.
Example​
import flet as ft

from flet_color_pickers import ColorLabelType, ColorPicker, PaletteType





def main(page: ft.Page):

    page.title = "ColorPicker"

    page.padding = 20



    def on_color_change(e: ft.ControlEvent):

        print(f"color: {e.data}")



    def on_history_change(e: ft.ControlEvent):

        # e.data is a list of hex strings

        print(f"history: {e.data}")



    def on_hsv_color_change(e: ft.ControlEvent):

        print("hsv: ", e.control.hsv_color)



    picker = ColorPicker(

        color="#ff0000",

        # hsv_color=HsvColor(alpha=1, hue=0, saturation=1, value=1),

        color_history=[

            "#ff0000",

            "#00ff00",

            "#0000ff",

            "#ffff00",

            "#00ffff",

            "#ff00ff",

        ],

        on_color_change=on_color_change,

        palette_type=PaletteType.RGB_WITH_GREEN,

        on_history_change=on_history_change,

        on_hsv_color_change=on_hsv_color_change,

        label_types=[

            ColorLabelType.HEX,

            ColorLabelType.RGB,

        ],

        picker_area_border_radius=ft.BorderRadius.all(20),

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
color_history
class-attribute
instance-attribute
​
Copy
color_history: list[ColorValue] | None = None

A list of colors to display as a history palette.

To be notified when the palette changes, set on_history_change.

build
color_picker_width
class-attribute
instance-attribute
​
Copy
color_picker_width: Number | None = None

Width of the color picker in virtual pixels.

build
display_thumb_color
class-attribute
instance-attribute
​
Copy
display_thumb_color: bool = True

Whether to display the thumb color in slider.

build
enable_alpha
class-attribute
instance-attribute
​
Copy
enable_alpha: bool = True

Whether to enable alpha (opacity) slider.

build
hex_input_bar
class-attribute
instance-attribute
​
Copy
hex_input_bar: bool = True

Whether to show the hex input bar.

build
hsv_color
class-attribute
instance-attribute
​
Copy
hsv_color: HsvColor | None = None

The currently selected HSV color.

Provide an HsvColor instance with fields: alpha, hue, saturation, value.

build
label_text_style
class-attribute
instance-attribute
​
Copy
label_text_style: TextStyle | None = None

Text style for labels.

build
label_types
class-attribute
instance-attribute
​
Copy
label_types: list[ColorLabelType] | None = None

Color label types to display.

build
palette_type
class-attribute
instance-attribute
​
Copy
palette_type: PaletteType | None = None

Palette type for the picker area.

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
picker_area_height_percent
class-attribute
instance-attribute
​
Copy
picker_area_height_percent: Number | None = None

Height of the picker area as a percentage of the picker width.

Events​
bolt
on_color_change
class-attribute
instance-attribute
​
Copy
on_color_change: (
    ControlEventHandler[ColorPicker] | None
) = None

Called when the picker color is changed.

The data property of the event handler argument contains the color value as a hex string.

bolt
on_history_change
class-attribute
instance-attribute
​
Copy
on_history_change: (
    ControlEventHandler[ColorPicker] | None
) = None

Called when the history palette is changed.

The data property of the event handler argument contains the list of color values as hex strings.

bolt
on_hsv_color_change
class-attribute
instance-attribute
​
Copy
on_hsv_color_change: (
    ControlEventHandler[ColorPicker] | None
) = None

Called when the picker HSV color is changed.

The data property of the event handler argument contains the HSV values as a dict with keys: alpha, hue, saturation, value.

Edit this page