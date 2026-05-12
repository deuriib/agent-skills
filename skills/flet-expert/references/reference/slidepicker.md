# SlidePicker
URL: https://flet.dev/docs/controls/colorpickers/slidepicker

ReferenceControlsColor pickersSlidePicker
SlidePicker

A slider-based color picker that exposes RGB/HSV/HSL channels with optional labels and indicators.

Basic SlidePicker

Inherits: LayoutControl

Properties
color - The currently selected color.
color_model - The color model used by the sliders.
display_thumb_color - Whether to display the thumb color in sliders.
enable_alpha - Whether to enable alpha (opacity) slider.
indicator_alignment_begin - Alignment for the indicator split begin.
indicator_alignment_end - Alignment for the indicator split end.
indicator_border_radius - Border radius for the indicator.
indicator_size - Size of the indicator.
label_text_style - Text style for labels.
label_types - Color label types to display.
show_indicator - Whether to show the color indicator.
show_label - Whether to show labels.
show_params - Whether to show parameter values.
show_slider_text - Whether to show slider text.
slider_size - Size of the sliders.
slider_text_style - Text style for slider text.
Events
on_color_change - Called when the picker color is changed.
Example​
import flet as ft

from flet_color_pickers import ColorModel, SlidePicker





def main(page: ft.Page):

    page.title = "SlidePicker"

    page.padding = 20



    def on_color_change(e: ft.ControlEvent):

        print(f"color: {e.data}")



    picker = SlidePicker(

        color="#0000ff",

        color_model=ColorModel.RGB,

        indicator_border_radius=ft.BorderRadius.all(5),

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
color_model
class-attribute
instance-attribute
​
Copy
color_model: ColorModel | None = None

The color model used by the sliders.

build
display_thumb_color
class-attribute
instance-attribute
​
Copy
display_thumb_color: bool = True

Whether to display the thumb color in sliders.

build
enable_alpha
class-attribute
instance-attribute
​
Copy
enable_alpha: bool = True

Whether to enable alpha (opacity) slider.

build
indicator_alignment_begin
class-attribute
instance-attribute
​
Copy
indicator_alignment_begin: Alignment | None = None

Alignment for the indicator split begin.

build
indicator_alignment_end
class-attribute
instance-attribute
​
Copy
indicator_alignment_end: Alignment | None = None

Alignment for the indicator split end.

build
indicator_border_radius
class-attribute
instance-attribute
​
Copy
indicator_border_radius: BorderRadiusValue | None = None

Border radius for the indicator.

build
indicator_size
class-attribute
instance-attribute
​
Copy
indicator_size: Size | None = None

Size of the indicator.

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
show_indicator
class-attribute
instance-attribute
​
Copy
show_indicator: bool = True

Whether to show the color indicator.

build
show_label
class-attribute
instance-attribute
​
Copy
show_label: bool = True

Whether to show labels.

build
show_params
class-attribute
instance-attribute
​
Copy
show_params: bool = True

Whether to show parameter values.

build
show_slider_text
class-attribute
instance-attribute
​
Copy
show_slider_text: bool = True

Whether to show slider text.

build
slider_size
class-attribute
instance-attribute
​
Copy
slider_size: Size | None = None

Size of the sliders.

build
slider_text_style
class-attribute
instance-attribute
​
Copy
slider_text_style: TextStyle | None = None

Text style for slider text.

Events​
bolt
on_color_change
class-attribute
instance-attribute
​
Copy
on_color_change: (
    ControlEventHandler[SlidePicker] | None
) = None

Called when the picker color is changed.

The data property of the event handler argument contains the color value as a hex string.

Edit this page