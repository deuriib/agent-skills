# CupertinoSlider
URL: https://flet.dev/docs/controls/cupertinoslider

ReferenceControlsCupertinoSlider
CupertinoSlider

An iOS-type slider.

It provides a visual indication of adjustable content, as well as the current setting in the total range of content.

Use a slider when you want people to set defined values (such as volume or brightness), or when people would benefit from instant feedback on the effect of setting changes.

Example:

ft.CupertinoSlider(value=0.6)

Basic CupertinoSlider

Inherits: LayoutControl

Properties
active_color - The color to use for the portion of the slider track that is active.
divisions - The number of discrete divisions.
max - The maximum value the user can select.
min - The minimum value the user can select.
thumb_color - The color of this slider's thumb.
value - The currently selected value for this slider.
Events
on_blur - Called when this slider has lost focus.
on_change - Called when the state of this slider changed.
on_change_end - Called when the user is done selecting a new value for this slider.
on_change_start - Called when the user starts selecting a new value for this slider.
on_focus - Called when this slider has received focus.
Examples​

Live example

Handling events​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.theme_mode = ft.ThemeMode.LIGHT



    slider_value = ft.Text("0.0")

    slider_status = ft.Text()



    def handle_change_start(_: ft.Event[ft.CupertinoSlider]):

        slider_status.value = "Sliding"



    def handle_change(e: ft.Event[ft.CupertinoSlider]):

        slider_value.value = str(e.control.value)



    def handle_change_end(_: ft.Event[ft.CupertinoSlider]):

        slider_status.value = "Finished sliding"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    slider_value,

                    ft.CupertinoSlider(

                        divisions=20,

                        min=0,

                        max=100,

                        active_color=ft.Colors.PURPLE,

                        thumb_color=ft.Colors.PURPLE,

                        on_change_start=handle_change_start,

                        on_change_end=handle_change_end,

                        on_change=handle_change,

                    ),

                    slider_status,

                ],

            ),

        )

    )





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
divisions
class-attribute
instance-attribute
​
Copy
divisions: int | None = None

The number of discrete divisions.

If None, the slider is continuous.

build
max
class-attribute
instance-attribute
​
Copy
max: Number = 1.0

The maximum value the user can select.

If min is equal to the max, then this slider is disabled.

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

If max is equal to the min, then this slider is disabled.

Raises:

ValueError - If it is not less than or equal to max.
ValueError - If it is not less than or equal to value, when value is set.
build
thumb_color
class-attribute
instance-attribute
​
Copy
thumb_color: ColorValue | None = None

The color of this slider's thumb.

build
value
class-attribute
instance-attribute
​
Copy
value: Number | None = None

The currently selected value for this slider.

The slider's thumb is drawn at a position that corresponds to this value.

Raises:

ValueError - If it is not greater than or equal to min.
ValueError - If it is not less than or equal to max.
Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[CupertinoSlider] | None = None

Called when this slider has lost focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[CupertinoSlider] | None = (
    None
)

Called when the state of this slider changed.

bolt
on_change_end
class-attribute
instance-attribute
​
Copy
on_change_end: (
    ControlEventHandler[CupertinoSlider] | None
) = None

Called when the user is done selecting a new value for this slider.

bolt
on_change_start
class-attribute
instance-attribute
​
Copy
on_change_start: (
    ControlEventHandler[CupertinoSlider] | None
) = None

Called when the user starts selecting a new value for this slider.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[CupertinoSlider] | None = None

Called when this slider has received focus.

Edit this page