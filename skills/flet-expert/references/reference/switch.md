# Switch
URL: https://flet.dev/docs/controls/switch

ReferenceControlsSwitch
Switch

A toggle represents a physical switch that allows someone to choose between two mutually exclusive options.

For example, "On/Off", "Show/Hide".

    ft.Switch(label="Unchecked switch", value=False)

    ft.Switch(label="Disabled switch", disabled=True)

Basic switch and disabled switch

Inherits: LayoutControl, AdaptiveControl

Properties
active_color - The color to use when this switch is on.
active_track_color - The color to use on the track when this switch is on.
adaptive - Whether an adaptive Switch should be created based on the target platform.
autofocus - Whether this switch will be selected as the initial focus.
focus_color - The color to use for the focus highlight for keyboard interactions.
hover_color - The color to be used when it is being hovered over by the mouse pointer.
inactive_thumb_color - The color to use on the thumb when this switch is off.
inactive_track_color - The color to use on the track when this switch is off.
label - The clickable label to display on the right of this switch.
label_position - The position of the label, if provided.
label_text_style - The label's text style, when it is a string.
mouse_cursor - The cursor to be displayed when a mouse pointer enters or is hovering over this control.
overlay_color - The color for the switch's Material in various ControlState states.
padding - The amount of space to surround the child inside the bounds of the Switch.
splash_radius - The radius of the splash effect when the switch is pressed.
thumb_color - The color of this switch's thumb in various ControlState states.
thumb_icon - The icon of this Switch's thumb in various ControlState states.
track_color - The color of this switch's track in various ControlState states.
track_outline_color - The outline color of this switch's track in various ControlState states.
track_outline_width - The outline width of this switch's track in all or specific ControlState states.
value - Current value of this switch.
Events
on_blur - Called when the control has lost focus.
on_change - Called when the state of the Switch is changed.
on_focus - Called when the control has received focus.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    def handle_button_click(e: ft.Event[ft.Button]):

        message.value = (

            f"Switch values are:  {c1.value}, {c2.value}, {c3.value}, {c4.value}."

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    c1 := ft.Switch(label="Unchecked switch", value=False),

                    c2 := ft.Switch(label="Checked switch", value=True),

                    c3 := ft.Switch(label="Disabled switch", disabled=True),

                    c4 := ft.Switch(

                        label="Switch with rendered label_position='left'",

                        label_position=ft.LabelPosition.LEFT,

                    ),

                    ft.Button(content="Submit", on_click=handle_button_click),

                    message := ft.Text(),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Handling change events​
import flet as ft





def main(page: ft.Page):

    def handle_switch_change(e: ft.Event[ft.Switch]):

        page.theme_mode = ft.ThemeMode.DARK if e.control.value else ft.ThemeMode.LIGHT

        e.control.label = (

            "Light ThemeMode"

            if page.theme_mode == ft.ThemeMode.LIGHT

            else "Dark ThemeMode"

        )



    page.theme_mode = ft.ThemeMode.LIGHT

    page.add(

        ft.SafeArea(

            content=ft.Switch(

                key="theme_mode_switch",

                label="Light ThemeMode",

                on_change=handle_switch_change,

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

The color to use when this switch is on.

build
active_track_color
class-attribute
instance-attribute
​
Copy
active_track_color: ColorValue | None = None

The color to use on the track when this switch is on.

If track_color returns a non-none color in the ControlState.SELECTED state, it will be used instead of this color.

build
adaptive
class-attribute
instance-attribute
​
Copy
adaptive: bool | None = None

Whether an adaptive Switch should be created based on the target platform.

On iOS and macOS, a CupertinoSwitch is created, which has matching functionality and presentation as Switch, and the graphics as expected on iOS. On other platforms, a Material Switch is created.

Defaults to False. See the example of usage here.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether this switch will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color to use for the focus highlight for keyboard interactions.

build
hover_color
class-attribute
instance-attribute
​
Copy
hover_color: ColorValue | None = None

The color to be used when it is being hovered over by the mouse pointer.

build
inactive_thumb_color
class-attribute
instance-attribute
​
Copy
inactive_thumb_color: ColorValue | None = None

The color to use on the thumb when this switch is off.

Defaults to colors defined in the material design specification.

If thumb_color returns a non-none color in the ControlState.DEFAULT state, it will be used instead of this color.

build
inactive_track_color
class-attribute
instance-attribute
​
Copy
inactive_track_color: ColorValue | None = None

The color to use on the track when this switch is off.

Defaults to colors defined in the material design specification.

If track_color returns a non-none color in the ControlState.DEFAULT state, it will be used instead of this color.

build
label
class-attribute
instance-attribute
​
Copy
label: StrOrControl | None = None

The clickable label to display on the right of this switch.

build
label_position
class-attribute
instance-attribute
​
Copy
label_position: LabelPosition = LabelPosition.RIGHT

The position of the label, if provided.

build
label_text_style
class-attribute
instance-attribute
​
Copy
label_text_style: TextStyle | None = None

The label's text style, when it is a string.

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

The color for the switch's Material in various ControlState states.

The following states are supported: ControlState.PRESSED, ControlState.SELECTED, ControlState.HOVERED, ControlState.FOCUSED and ControlState.DEFAULT.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The amount of space to surround the child inside the bounds of the Switch.

Defaults to horizontal padding of 4 pixels. If Theme.use_material3 is false, then there is no padding by default.

build
splash_radius
class-attribute
instance-attribute
​
Copy
splash_radius: Number | None = None

The radius of the splash effect when the switch is pressed.

Raises:

ValueError - If it is not greater than or equal to 0.
build
thumb_color
class-attribute
instance-attribute
​
Copy
thumb_color: ControlStateValue[ColorValue] | None = None

The color of this switch's thumb in various ControlState states.

The following states are supported: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED and ControlState.DEFAULT (fallback).

build
thumb_icon
class-attribute
instance-attribute
​
Copy
thumb_icon: ControlStateValue[IconData] | None = None

The icon of this Switch's thumb in various ControlState states.

The following states are supported: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED and ControlState.DEFAULT (fallback).

build
track_color
class-attribute
instance-attribute
​
Copy
track_color: ControlStateValue[ColorValue] | None = None

The color of this switch's track in various ControlState states.

The following states are supported: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED and ControlState.DEFAULT (fallback).

build
track_outline_color
class-attribute
instance-attribute
​
Copy
track_outline_color: (
    ControlStateValue[ColorValue] | None
) = None

The outline color of this switch's track in various ControlState states.

The following states are supported: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED and ControlState.DEFAULT (fallback).

build
track_outline_width
class-attribute
instance-attribute
​
Copy
track_outline_width: (
    ControlStateValue[Number | None] | None
) = None

The outline width of this switch's track in all or specific ControlState states.

The following states are supported: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED and ControlState.DEFAULT (fallback).

build
value
class-attribute
instance-attribute
​
Copy
value: bool = False

Current value of this switch.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Switch] | None = None

Called when the control has lost focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[Switch] | None = None

Called when the state of the Switch is changed.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Switch] | None = None

Called when the control has received focus.

Edit this page