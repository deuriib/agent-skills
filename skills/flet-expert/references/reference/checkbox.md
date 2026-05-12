# Checkbox
URL: https://flet.dev/docs/controls/checkbox

ReferenceControlsCheckbox
Checkbox

Checkbox allows to select one or more items from a group, or switch between two mutually exclusive options (checked or unchecked, on or off).

ft.Checkbox()

ft.Checkbox(label="Checked", value=True)

ft.Checkbox(label="Disabled", disabled=True)

Basic checkboxes

Inherits: LayoutControl, AdaptiveControl

Properties
active_color - The color to use when this checkbox is checked.
autofocus - True if the control will be selected as the initial focus.
border_side - The color and width of this checkbox's border in all or specific ControlStates.
check_color - The color to use for the check icon when this checkbox is checked.
error - Whether this checkbox wants to show an error state.
fill_color - The color that fills this checkbox in all or specific ControlStates.
focus_color - The color for the checkbox's Material when it has the input focus.
hover_color - The color to use when this checkbox is hovered.
label - The clickable label to display on the right of a checkbox.
label_position - Defines on which side of the checkbox the label should be shown.
label_style - The label's text style.
mouse_cursor - The cursor to be displayed when a mouse pointer enters or is hovering over this checkbox.
overlay_color - The color of this checkbox's overlay in various ControlState states.
semantics_label - The semantic label for the checkbox that is not shown in the UI, but will be announced by screen readers in accessibility modes (e.g TalkBack/VoiceOver).
shape - The shape of the checkbox.
splash_radius - The radius of the circular Material ink response (ripple) in logical pixels.
tristate - If True the checkbox's value can be True, False, or None.
value - The value of this checkbox.
visual_density - Defines how compact the checkbox's layout will be.
Events
on_blur - Called when this checkbox has lost focus.
on_change - Called when the state of this checkbox is changed.
on_focus - Called when this checkbox has received focus.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    def handle_button_click(e: ft.Event[ft.Button]):

        message.value = (

            f"Checkboxes values are:  {c1.value}, {c2.value}, {c3.value}, "

            f"{c4.value}, {c5.value}."

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    c1 := ft.Checkbox(

                        label="Unchecked by default checkbox", value=False

                    ),

                    c2 := ft.Checkbox(

                        label="Undefined by default tristate checkbox", tristate=True

                    ),

                    c3 := ft.Checkbox(label="Checked by default checkbox", value=True),

                    c4 := ft.Checkbox(label="Disabled checkbox", disabled=True),

                    c5 := ft.Checkbox(

                        label="Checkbox with LEFT label_position",

                        label_position=ft.LabelPosition.LEFT,

                    ),

                    ft.Button(content="Submit", on_click=handle_button_click),

                    message := ft.Text(),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

After clicking Submit
Handling events​
import flet as ft





def main(page: ft.Page):

    events = ft.Column()



    def handle_checkbox_change(e: ft.Event[ft.Checkbox]):

        events.controls.append(ft.Text(f"Checkbox value changed to {e.control.value}"))



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Checkbox(

                        label="Checkbox with 'change' event",

                        on_change=handle_checkbox_change,

                    ),

                    events,

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

After three clicks
Styled checkboxes​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Checkbox(label="Checkbox with default style"),

                    ft.Checkbox(

                        label="Checkbox with constant fill color",

                        fill_color=ft.Colors.RED,

                        check_color=ft.Colors.YELLOW,

                    ),

                    ft.Row(

                        controls=[

                            ft.Checkbox(

                                key="dynamic_fill_checkbox",

                                fill_color={

                                    ft.ControlState.HOVERED: ft.Colors.BLUE,

                                    ft.ControlState.SELECTED: ft.Colors.GREEN,

                                    ft.ControlState.DEFAULT: ft.Colors.RED,

                                },

                            ),

                            ft.Text("Checkbox with dynamic fill color"),

                        ],

                    ),

                ]

            )

        ),

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

The color to use when this checkbox is checked.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

True if the control will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
border_side
class-attribute
instance-attribute
​
Copy
border_side: ControlStateValue[BorderSide] | None = None

The color and width of this checkbox's border in all or specific ControlStates.

Defaults to CheckboxTheme.border_side, or if that is None, falls back to BorderSide with a width of 2.0.

NOTE

Supported states: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED, ControlState.PRESSED, ControlState.ERROR, and ControlState.DEFAULT.

build
check_color
class-attribute
instance-attribute
​
Copy
check_color: ColorValue | None = None

The color to use for the check icon when this checkbox is checked.

build
error
class-attribute
instance-attribute
​
Copy
error: bool = False

Whether this checkbox wants to show an error state.

If True this checkbox will have a different default container color and check color.

build
fill_color
class-attribute
instance-attribute
​
Copy
fill_color: ControlStateValue[ColorValue] | None = None

The color that fills this checkbox in all or specific ControlStates.

NOTE

Supported states: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED, and ControlState.DEFAULT.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color for the checkbox's Material when it has the input focus. If overlay_color returns a non-None color in the ControlState.FOCUSED state, it will be used instead.

Defaults to CheckboxTheme.overlay_color in the ControlState.FOCUSED state, or if that is None, falls back to Theme.focus_color.

build
hover_color
class-attribute
instance-attribute
​
Copy
hover_color: ColorValue | None = None

The color to use when this checkbox is hovered.

build
label
class-attribute
instance-attribute
​
Copy
label: StrOrControl | None = None

The clickable label to display on the right of a checkbox.

build
label_position
class-attribute
instance-attribute
​
Copy
label_position: LabelPosition = LabelPosition.RIGHT

Defines on which side of the checkbox the label should be shown.

build
label_style
class-attribute
instance-attribute
​
Copy
label_style: TextStyle | None = None

The label's text style.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor to be displayed when a mouse pointer enters or is hovering over this checkbox.

Defaults to CheckboxTheme.mouse_cursor, or if that is None, falls back to MouseCursor.CLICK.

build
overlay_color
class-attribute
instance-attribute
​
Copy
overlay_color: ControlStateValue[ColorValue] | None = None

The color of this checkbox's overlay in various ControlState states.

NOTE

Supported states: ControlState.PRESSED, ControlState.SELECTED, ControlState.HOVERED, ControlState.FOCUSED, and ControlState.DEFAULT.

build
semantics_label
class-attribute
instance-attribute
​
Copy
semantics_label: str | None = None

The semantic label for the checkbox that is not shown in the UI, but will be announced by screen readers in accessibility modes (e.g TalkBack/VoiceOver).

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of the checkbox.

Defaults to CheckboxTheme.shape, or if that is None, falls back to RoundedRectangleBorder(radius=2).

build
splash_radius
class-attribute
instance-attribute
​
Copy
splash_radius: Number | None = None

The radius of the circular Material ink response (ripple) in logical pixels.

Defaults to CheckboxTheme.splash_radius, or if that is None, falls back to 20.0.

build
tristate
class-attribute
instance-attribute
​
Copy
tristate: bool = False

If True the checkbox's value can be True, False, or None.

build
value
class-attribute
instance-attribute
​
Copy
value: bool | None = False

The value of this checkbox.

If True, this checkbox is checked.
If False, this checkbox is unchecked.
If None and tristate is True, this checkbox is indeterminate (displayed as a dash).
build
visual_density
class-attribute
instance-attribute
​
Copy
visual_density: VisualDensity | None = None

Defines how compact the checkbox's layout will be.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Checkbox] | None = None

Called when this checkbox has lost focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[Checkbox] | None = None

Called when the state of this checkbox is changed.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Checkbox] | None = None

Called when this checkbox has received focus.

Edit this page