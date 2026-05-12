# CupertinoSwitch
URL: https://flet.dev/docs/controls/cupertinoswitch

ReferenceControlsCupertinoSwitch
CupertinoSwitch

An iOS-style switch.

Used to toggle the on/off state of a single setting.

Example:

       ft.CupertinoSwitch(value=True)

Basic CupertinoSwitch

Inherits: LayoutControl

Properties
active_thumb_image_src - An image to use on the thumb of this switch when the switch is on.
active_track_color - The color to use on the track when this switch is on.
autofocus - Whether this switch will be selected as the initial focus.
focus_color - The color to use for the focus highlight for keyboard interactions.
inactive_thumb_color - The color to use on the thumb when this switch is off.
inactive_thumb_image_src - An image to use on the thumb of this switch when the switch is off.
inactive_track_color - The color to use on the track when this switch is off.
label - The clickable label to display on the right of this switch.
label_position - The position of the label relative to this switch.
off_label_color - The color to use for the accessibility label when the switch is off.
thumb_color - The color of this switch's thumb.
thumb_icon - The icon of this Switch's thumb in various ControlStates.
track_outline_color - The outline color of this switch's track in various ControlStates.
track_outline_width - The outline width of this switch's track in all or specific ControlStates.
value - The current value of this switch.
Events
on_blur - Called when this switch has lost focus.
on_change - Called when the state of this switch is changed.
on_focus - Called when this switch has received focus.
on_image_error - Called when active_thumb_image_src or inactive_thumb_image_src fails to load.
on_label_color - The color to use for the accessibility label when the switch is on.
Examples​

Live example

Cupertino, Material and Adaptive Switches​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.CupertinoSwitch(label="Cupertino Switch", value=True),

                    ft.Switch(

                        label="Material Switch",

                        value=True,

                        thumb_color={ft.ControlState.SELECTED: ft.Colors.BLUE},

                        track_color=ft.Colors.YELLOW,

                        focus_color=ft.Colors.PURPLE,

                    ),

                    ft.Container(height=20),

                    ft.Text(

                        value=(

                            "Adaptive Switch shows as CupertinoSwitch on macOS and "

                            "iOS and as Switch on other platforms:"

                        )

                    ),

                    ft.Switch(adaptive=True, label="Adaptive Switch", value=True),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
active_thumb_image_src
class-attribute
instance-attribute
​
Copy
active_thumb_image_src: str | bytes | None = None

An image to use on the thumb of this switch when the switch is on.

It can be one of the following:

A URL or local asset file path;
A base64 string;
Raw bytes.
build
active_track_color
class-attribute
instance-attribute
​
Copy
active_track_color: ColorValue | None = None

The color to use on the track when this switch is on.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether this switch will be selected as the initial focus.

If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color to use for the focus highlight for keyboard interactions.

build
inactive_thumb_color
class-attribute
instance-attribute
​
Copy
inactive_thumb_color: ColorValue | None = None

The color to use on the thumb when this switch is off.

If None, defaults to thumb_color, and if this is also None, defaults to CupertinoColors.WHITE.

build
inactive_thumb_image_src
class-attribute
instance-attribute
​
Copy
inactive_thumb_image_src: str | bytes | None = None

An image to use on the thumb of this switch when the switch is off.

It can be one of the following:

A URL or local asset file path;
A base64 string;
Raw bytes.
build
inactive_track_color
class-attribute
instance-attribute
​
Copy
inactive_track_color: ColorValue | None = None

The color to use on the track when this switch is off.

build
label
class-attribute
instance-attribute
​
Copy
label: str | None = None

The clickable label to display on the right of this switch.

build
label_position
class-attribute
instance-attribute
​
Copy
label_position: LabelPosition = LabelPosition.RIGHT

The position of the label relative to this switch.

build
off_label_color
class-attribute
instance-attribute
​
Copy
off_label_color: ColorValue | None = None

The color to use for the accessibility label when the switch is off.

build
thumb_color
class-attribute
instance-attribute
​
Copy
thumb_color: ColorValue | None = None

The color of this switch's thumb.

build
thumb_icon
class-attribute
instance-attribute
​
Copy
thumb_icon: ControlStateValue[IconData] | None = None

The icon of this Switch's thumb in various ControlStates.

Supported states: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED, and ControlState.DEFAULT.

build
track_outline_color
class-attribute
instance-attribute
​
Copy
track_outline_color: (
    ControlStateValue[ColorValue] | None
) = None

The outline color of this switch's track in various ControlStates.

Supported states: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED, and ControlState.DEFAULT.

build
track_outline_width
class-attribute
instance-attribute
​
Copy
track_outline_width: (
    ControlStateValue[Number | None] | None
) = None

The outline width of this switch's track in all or specific ControlStates.

Supported states: ControlState.SELECTED, ControlState.HOVERED, ControlState.DISABLED, ControlState.FOCUSED, and ControlState.DEFAULT.

build
value
class-attribute
instance-attribute
​
Copy
value: bool = False

The current value of this switch.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[CupertinoSwitch] | None = None

Called when this switch has lost focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[CupertinoSwitch] | None = (
    None
)

Called when the state of this switch is changed.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[CupertinoSwitch] | None = None

Called when this switch has received focus.

bolt
on_image_error
class-attribute
instance-attribute
​
Copy
on_image_error: (
    ControlEventHandler[CupertinoSwitch] | None
) = None

Called when active_thumb_image_src or inactive_thumb_image_src fails to load.

bolt
on_label_color
class-attribute
instance-attribute
​
Copy
on_label_color: ColorValue | None = None

The color to use for the accessibility label when the switch is on.

Edit this page