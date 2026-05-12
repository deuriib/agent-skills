# Radio
URL: https://flet.dev/docs/controls/radio

ReferenceControlsRadio
Radio

Radio buttons let people select a single option from two or more choices.

Example:

ft.RadioGroup(

    content=ft.Row(

        controls=[ft.Radio(label=f"{i}") for i in range(1, 4)],

        alignment=ft.MainAxisAlignment.CENTER,

    )

)

Simple radio buttons

Inherits: LayoutControl, AdaptiveControl

Properties
active_color - The color used to fill this radio when it is selected.
autofocus - True if the control will be selected as the initial focus.
fill_color - The color that fills the radio, in all or specific ControlState states.
focus_color - The color of this radio when it has the input focus.
hover_color - The color of this radio when it is hovered.
label - The clickable label to display on the right of a Radio.
label_position - Defaults to LabelPosition.RIGHT.
label_style - The label's style.
mouse_cursor - The cursor for a mouse pointer entering or hovering over this control.
overlay_color - The overlay color of this radio in all or specific ControlState states.
splash_radius - The splash radius of the circular Material ink response.
toggleable - Set to True if this radio button is allowed to be returned to an indeterminate state by selecting it again when selected.
value - The value to set to containing RadioGroup when the radio is selected.
visual_density - Defines how compact the radio's layout will be.
Events
on_blur - Called when the control has lost focus.
on_focus - Called when the control has received focus.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    def handle_button_click(e: ft.Event[ft.Button]):

        message.value = f"Your favorite color is:  {group.value}"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Select your favorite color:"),

                    group := ft.RadioGroup(

                        content=ft.Column(

                            controls=[

                                ft.Radio(

                                    key="basic_radio_red", value="red", label="Red"

                                ),

                                ft.Radio(value="green", label="Green"),

                                ft.Radio(value="blue", label="Blue"),

                            ]

                        )

                    ),

                    ft.Button(

                        key="basic_submit_button",

                        content="Submit",

                        on_click=handle_button_click,

                    ),

                    message := ft.Text(),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Handling selection changes​
import flet as ft





def main(page: ft.Page):

    def handle_selection_change(e: ft.Event[ft.RadioGroup]):

        message.value = f"Your favorite color is:  {e.control.value}"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Select your favorite color:"),

                    ft.RadioGroup(

                        on_change=handle_selection_change,

                        content=ft.Column(

                            controls=[

                                ft.Radio(value="red", label="Red"),

                                ft.Radio(value="green", label="Green"),

                                ft.Radio(value="blue", label="Blue"),

                            ]

                        ),

                    ),

                    message := ft.Text(),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Styled radio buttons​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.RadioGroup(

                ft.Column(

                    controls=[

                        ft.Radio(

                            key="styled_radio_default",

                            label="Radio with default style",

                            value="1",

                        ),

                        ft.Radio(

                            key="styled_radio_constant",

                            label="Radio with constant fill color",

                            value="2",

                            fill_color=ft.Colors.RED,

                        ),

                        ft.Radio(

                            key="styled_radio_dynamic",

                            label="Radio with dynamic fill color",

                            value="3",

                            fill_color={

                                ft.ControlState.HOVERED: ft.Colors.BLUE,

                                ft.ControlState.SELECTED: ft.Colors.GREEN,

                                ft.ControlState.DEFAULT: ft.Colors.RED,

                            },

                        ),

                    ]

                )

            )

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

The color used to fill this radio when it is selected.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

True if the control will be selected as the initial focus.

If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
fill_color
class-attribute
instance-attribute
​
Copy
fill_color: ControlStateValue[ColorValue] | None = None

The color that fills the radio, in all or specific ControlState states.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color of this radio when it has the input focus.

build
hover_color
class-attribute
instance-attribute
​
Copy
hover_color: ColorValue | None = None

The color of this radio when it is hovered.

build
label
class-attribute
instance-attribute
​
Copy
label: str = ''

The clickable label to display on the right of a Radio.

build
label_position
class-attribute
instance-attribute
​
Copy
label_position: LabelPosition = LabelPosition.RIGHT

Defaults to LabelPosition.RIGHT.

build
label_style
class-attribute
instance-attribute
​
Copy
label_style: TextStyle | None = None

The label's style.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor for a mouse pointer entering or hovering over this control.

build
overlay_color
class-attribute
instance-attribute
​
Copy
overlay_color: ControlStateValue[ColorValue] | None = None

The overlay color of this radio in all or specific ControlState states.

build
splash_radius
class-attribute
instance-attribute
​
Copy
splash_radius: Number | None = None

The splash radius of the circular Material ink response.

build
toggleable
class-attribute
instance-attribute
​
Copy
toggleable: bool = False

Set to True if this radio button is allowed to be returned to an indeterminate state by selecting it again when selected.

build
value
class-attribute
instance-attribute
​
Copy
value: str | None = None

The value to set to containing RadioGroup when the radio is selected.

build
visual_density
class-attribute
instance-attribute
​
Copy
visual_density: VisualDensity | None = None

Defines how compact the radio's layout will be.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Radio] | None = None

Called when the control has lost focus.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Radio] | None = None

Called when the control has received focus.

Edit this page