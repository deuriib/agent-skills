# ControlState
URL: https://flet.dev/docs/types/controlstate

ReferenceTypesClassesControlState
ControlState

Interactive states that some controls can take on when receiving input from the user.

States are defined by the Material 3 design specification, but are not limited to it.

Not all states are always applicable to all controls.

Inherits: enum.Enum

Properties
DEFAULT - The default state.
DISABLED - The state when this control is disabled and cannot be interacted with.
DRAGGED - The state when this control is being dragged from one place to another by the user.
ERROR - The state when the control has entered some form of invalid state.
FOCUSED - The state when the user navigates with the keyboard to a given control.
HOVERED - The state when the user drags their mouse cursor over the given control.
PRESSED - The state when the user is actively pressing down on the given control.
SCROLLED_UNDER - The state when this control overlaps the content of a scrollable below.
SELECTED - The state when this item has been selected.
Properties​
build
DEFAULT
class-attribute
instance-attribute
​

The default state. Will be used for undeclared states.

build
DISABLED
class-attribute
instance-attribute
​

The state when this control is disabled and cannot be interacted with.

Disabled controls should not respond to hover, focus, press, or drag interactions.

See material docs.

build
DRAGGED
class-attribute
instance-attribute
​

The state when this control is being dragged from one place to another by the user.

See material docs.

build
ERROR
class-attribute
instance-attribute
​

The state when the control has entered some form of invalid state.

See material docs.

build
FOCUSED
class-attribute
instance-attribute
​

The state when the user navigates with the keyboard to a given control.

This can also sometimes be triggered when a control is tapped. For example, when a [TextField] is tapped, it becomes FOCUSED.

See material docs.

build
HOVERED
class-attribute
instance-attribute
​

The state when the user drags their mouse cursor over the given control.

See material docs.

build
PRESSED
class-attribute
instance-attribute
​

The state when the user is actively pressing down on the given control.

See material docs.

build
SCROLLED_UNDER
class-attribute
instance-attribute
​

The state when this control overlaps the content of a scrollable below.

Used by AppBar to indicate that the primary scrollable's content has scrolled up and behind the app bar.

build
SELECTED
class-attribute
instance-attribute
​

The state when this item has been selected.

This applies to things that can be toggled (such as chips and checkboxes) and things that are selected from a set of options (such as tabs and radio buttons).

See material docs.

Usage Example​

Configuring fill_color can be done in two ways:

1. Single Value for All States​

If you want to use the same color across all Material states, simply assign fill_color to a single color:

ft.Radio(fill_color=ft.Colors.GREEN)

2. Specific Values for Each State​

For more control, you can provide a dictionary where the key is the state name and the value is the corresponding color.

Ordering Matters​
The order in which states appear in the dictionary will determine their priority, allowing for flexibility and customization.
The position of DEFAULT does not affect behavior—it always has the least priority and can be placed anywhere in the dictionary.
Example​

To configure different fill colors of a Radio button for ControlState.HOVERED and ControlState.FOCUSED, with a fallback color for all other states:

ft.Radio(

    fill_color={

        ft.ControlState.HOVERED: ft.Colors.GREEN,

        ft.ControlState.FOCUSED: ft.Colors.RED,

        ft.ControlState.DEFAULT: ft.Colors.BLACK,

    }

)


This setup ensures that HOVERED and FOCUSED states take precedence, while all unspecified states default to BLACK.

Edit this page