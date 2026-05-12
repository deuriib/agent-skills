# CupertinoRadio
URL: https://flet.dev/docs/controls/cupertinoradio

ReferenceControlsCupertinoRadio
CupertinoRadio

A macOS-styled radio button, allowing the user to select a single option from two or more choices.

ft.RadioGroup(

    value="option_2",

    content=ft.Column(

        intrinsic_width=True,

        controls=[

            ft.CupertinoRadio(value="option_1", label="Option 1"),

            ft.CupertinoRadio(value="option_2", label="Option 2"),

            ft.CupertinoRadio(value="option_3", label="Option 3"),

        ],

    ),

)

Basic CupertinoRadios

Inherits: LayoutControl

Properties
active_color - The color used to fill this radio when it is selected.
autofocus - Whether this radio will be selected as the initial focus.
fill_color - The color that fills this radio.
focus_color - The color for the radio's border when it has the input focus.
inactive_color - The color used to fill this radio when it is not selected.
label - The clickable label to display on the right of this radio.
label_position - The position of the label relative to this radio.
mouse_cursor - The cursor for a mouse pointer when it enters or is hovering over this radio.
toggleable - Whether this radio button can return to an indeterminate state by selecting it again when already selected.
use_checkmark_style - Whether the radio displays in a checkbox style instead of the default radio style.
value - The value to set to RadioGroup ancestor/parent when this radio is selected.
Events
on_blur - Called when this radio has lost focus.
on_focus - Called when this radio has received focus.
Examples​

Live example

Cupertino, Material and Adaptive Radios​
import flet as ft





def main(page: ft.Page):

    message = ft.Text()



    group = ft.RadioGroup(

        content=ft.Column(

            controls=[

                ft.CupertinoRadio(

                    value="red",

                    label="Red - Cupertino Radio",

                    active_color=ft.Colors.RED,

                    inactive_color=ft.Colors.RED,

                ),

                ft.Radio(

                    value="green",

                    label="Green - Material Radio",

                    fill_color=ft.Colors.GREEN,

                ),

                ft.Radio(

                    value="blue",

                    label="Blue - Adaptive Radio",

                    adaptive=True,

                    active_color=ft.Colors.BLUE,

                ),

            ],

        )

    )



    def handle_button_click(_: ft.Event[ft.Button]):

        message.value = f"Your favorite color is: {group.value}"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Select your favorite color:"),

                    group,

                    ft.Button(content="Submit", on_click=handle_button_click),

                    message,

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
active_color: ColorValue | None = Colors.PRIMARY

The color used to fill this radio when it is selected.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether this radio will be selected as the initial focus.

If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
fill_color
class-attribute
instance-attribute
​
Copy
fill_color: ColorValue | None = None

The color that fills this radio.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color for the radio's border when it has the input focus.

build
inactive_color
class-attribute
instance-attribute
​
Copy
inactive_color: ColorValue | None = None

The color used to fill this radio when it is not selected.

build
label
class-attribute
instance-attribute
​
Copy
label: str | None = None

The clickable label to display on the right of this radio.

build
label_position
class-attribute
instance-attribute
​
Copy
label_position: LabelPosition = LabelPosition.RIGHT

The position of the label relative to this radio.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor for a mouse pointer when it enters or is hovering over this radio.

build
toggleable
class-attribute
instance-attribute
​
Copy
toggleable: bool = False

Whether this radio button can return to an indeterminate state by selecting it again when already selected.

build
use_checkmark_style
class-attribute
instance-attribute
​
Copy
use_checkmark_style: bool = False

Whether the radio displays in a checkbox style instead of the default radio style.

build
value
class-attribute
instance-attribute
​
Copy
value: str = ''

The value to set to RadioGroup ancestor/parent when this radio is selected.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[CupertinoRadio] | None = None

Called when this radio has lost focus.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[CupertinoRadio] | None = None

Called when this radio has received focus.

Edit this page