# Slider
URL: https://flet.dev/docs/controls/slider

ReferenceControlsSlider
Slider

A slider provides a visual indication of adjustable content, as well as the current setting in the total range of content.

Use a slider when you want people to set defined values (such as volume or brightness), or when people would benefit from instant feedback on the effect of setting changes.

Example:

ft.Slider(label="Slider", value=0.3)

Basic slider

Inherits: LayoutControl, AdaptiveControl

Properties
active_color - The color to use for the portion of the slider track that is active.
autofocus - True if the control will be selected as the initial focus.
divisions - The number of discrete divisions.
inactive_color - The color for the inactive portion of the slider track.
interaction - The allowed way for the user to interact with this slider.
label - A label to show above the slider when the slider is active.
max - The maximum value the user can select.
min - The minimum value the user can select.
mouse_cursor - The cursor to be displayed when a mouse pointer enters or is hovering over this control.
overlay_color - The highlight color that's typically used to indicate that the range slider thumb is in ControlState.HOVERED or ControlState.DRAGGED states.
padding - Determines the padding around this slider.
round - The number of decimals displayed on the label containing value.
secondary_active_color - The color to use for the portion of the slider track between the thumb and the secondary_track_value.
secondary_track_value - The secondary track value for this slider.
thumb_color - The color of the thumb.
value - The currently selected value for this slider.
year_2023 - If this is set to False, this slider will use the latest Material Design 3 appearance, which was introduced in December 2023.
Events
on_blur - Called when this slider has lost focus.
on_change - Called when the state of this slider is changed.
on_change_end - Called when the user is done selecting a new value for this slider.
on_change_start - Called when the user starts selecting a new value for this slider.
on_focus - Called when this slider has received focus.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Default slider:"),

                    ft.Slider(),

                    ft.Text("Default disabled slider:"),

                    ft.Slider(disabled=True),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Setting a custom label​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Slider with value:"),

                    ft.Slider(value=0.3),

                    ft.Text("Slider with a custom range and label:"),

                    ft.Slider(min=0, max=100, divisions=10, label="{value}%"),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Handling events​
import flet as ft





def main(page: ft.Page):

    def slider_changed(e: ft.Event[ft.Slider]):

        message.value = f"Slider changed to {e.control.value}"

        message.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Slider with 'on_change' event:"),

                    ft.Slider(

                        key="slider",

                        min=0,

                        max=100,

                        divisions=10,

                        label="{value}%",

                        on_change=slider_changed,

                    ),

                    message := ft.Text(),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Random values​
import asyncio

import random



import flet as ft





async def main(page: ft.Page):

    def handle_slider_change(e: ft.Event[ft.Slider]):

        message.value = f"Slider.value changed to {e.control.value}"

        message.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Slider with 'on_change' event:"),

                    slider := ft.Slider(

                        label="{value}", on_change=handle_slider_change

                    ),

                    message := ft.Text(),

                ]

            )

        )

    )



    while True:

        await asyncio.sleep(1)

        slider.value = random.random()

        event = ft.Event("_", slider, data=slider.value)

        handle_slider_change(event)

        slider.update()





if __name__ == "__main__":

    ft.run(main)

Properties​
build
active_color
class-attribute
instance-attribute
​
Copy
active_color: ColorValue | None = None

The color to use for the portion of the slider track that is active.

The "active" side of the slider is the side between the thumb and the minimum value.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

True if the control will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
divisions
class-attribute
instance-attribute
​
Copy
divisions: int | None = None

The number of discrete divisions.

Typically used with label to show the current discrete value.

If None, this slider is continuous.

build
inactive_color
class-attribute
instance-attribute
​
Copy
inactive_color: ColorValue | None = None

The color for the inactive portion of the slider track.

The "inactive" side of the slider is the side between the thumb and the maximum value.

build
interaction
class-attribute
instance-attribute
​
Copy
interaction: SliderInteraction | None = None

The allowed way for the user to interact with this slider.

If None, SliderTheme.interaction is used. If that's is also None, defaults to SliderInteraction.TAP_AND_SLIDE.

build
label
class-attribute
instance-attribute
​
Copy
label: str | None = None

A label to show above the slider when the slider is active. The value of label may contain {value} which will be dynamically replaced with a current slider value. For example, "Volume: {value}".

It is used to display the value of a discrete slider, and it is displayed as part of the value indicator shape.

If not set, then the value indicator will not be displayed.

build
max
class-attribute
instance-attribute
​
Copy
max: Number = 1.0

The maximum value the user can select.

If the min is equal to the max, then this slider is disabled.

Raises:

ValueError - If it is not greater than or equal to min.
ValueError - If it is not greater than or equal to value, when value is set.
build
min
class-attribute
instance-attribute
​
Copy
min: Number = 0.0

The minimum value the user can select.

If the max is equal to the min, then this slider is disabled.

Raises:

ValueError - If it is not less than or equal to max.
ValueError - If it is not less than or equal to value, when value is set.
build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor to be displayed when a mouse pointer enters or is hovering over this control.

build
overlay_color
class-attribute
instance-attribute
​
Copy
overlay_color: ControlStateValue[ColorValue] | None = None

The highlight color that's typically used to indicate that the range slider thumb is in ControlState.HOVERED or ControlState.DRAGGED states.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

Determines the padding around this slider.

build
round
class-attribute
instance-attribute
​
Copy
round: int = 0

The number of decimals displayed on the label containing value.

Defaults to 0, which displays value rounded to the nearest integer.

build
secondary_active_color
class-attribute
instance-attribute
​
Copy
secondary_active_color: ColorValue | None = None

The color to use for the portion of the slider track between the thumb and the secondary_track_value.

build
secondary_track_value
class-attribute
instance-attribute
​
Copy
secondary_track_value: Number | None = None

The secondary track value for this slider.

If not null, a secondary track using secondary_active_color is drawn between the thumb and this value, over the inactive track. If less than value, then the secondary track is not shown.

It can be ideal for media scenarios such as showing the buffering progress while the value shows the play progress.

build
thumb_color
class-attribute
instance-attribute
​
Copy
thumb_color: ColorValue | None = None

The color of the thumb.

build
value
class-attribute
instance-attribute
​
Copy
value: Number | None = None

The currently selected value for this slider.

The slider's thumb is drawn at a position that corresponds to this value.

Defaults to value of min.

Raises:

ValueError - If it is not greater than or equal to min.
ValueError - If it is not less than or equal to max.
build
year_2023
class-attribute
instance-attribute
​
Copy
year_2023: bool | None = None

If this is set to False, this slider will use the latest Material Design 3 appearance, which was introduced in December 2023.

When True, the Slider will use the 2023 Material Design 3 appearance.

If not set, then the SliderTheme.year_2023 will be used, which is False by default.

If Theme.use_material3 is False, then this property is ignored.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Slider] | None = None

Called when this slider has lost focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[Slider] | None = None

Called when the state of this slider is changed.

bolt
on_change_end
class-attribute
instance-attribute
​
Copy
on_change_end: ControlEventHandler[Slider] | None = None

Called when the user is done selecting a new value for this slider.

bolt
on_change_start
class-attribute
instance-attribute
​
Copy
on_change_start: ControlEventHandler[Slider] | None = None

Called when the user starts selecting a new value for this slider.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Slider] | None = None

Called when this slider has received focus.

Edit this page