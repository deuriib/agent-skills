# Semantics
URL: https://flet.dev/docs/controls/semantics

ReferenceControlsSemantics
Semantics

Provides semantic annotations for the control tree, describing the meaning and purpose of controls.

These annotations are utilized by accessibility tools, search engines, and semantic analysis software to better understand the structure and functionality of the application.

Inherits: Control

Properties
badge - TBD
button - Whether this subtree represents a button.
checked - Whether this subtree represents a checkbox or similar widget with a "checked" state, and what its current state is.
container - TBD
content - The Control to annotate.
current_value_length - The current number of characters that have been entered into an editable text field.
decreased_value - The value that the semantics node represents when it is decreased.
exclude_semantics - TBD
expanded - Whether this subtree represents something that can be in an "expanded" or "collapsed" state.
focus - Whether the node currently holds input focus.
focusable - Whether the node is able to hold input focus.
header - Whether this subtree represents a header.
heading_level - The heading level in the DOM document structure.
hidden - Whether this subtree is currently hidden.
hint_text - A brief textual description of the result of an action performed on the content control.
image - Whether the node represents an image.
increased_value - The value that the semantics node represents when it is increased.
label - A textual description of the content.
link - Whether this subtree represents a link.
live_region - Whether this subtree should be considered a live region.
max_value_length - The maximum number of characters that can be entered into an editable text field.
mixed - Whether this subtree represents a checkbox or similar control with a "half-checked" state or similar, and whether it is currently in this half-checked state.
multiline - Whether the value is coming from a field that supports multiline text editing.
obscured - Whether value should be obscured.
read_only - Whether this subtree is read only.
selected - Whether this subtree represents something that can be in a selected or unselected state, and what its current state is.
slider - Whether this subtree represents a slider.
textfield - Whether this subtree represents a text field.
toggled - Whether this subtree represents a toggle switch or similar widget with an "on" state, and what its current state is.
tooltip - A textual description of the widget's tooltip.
value - A textual description of the value of the content control.
Events
on_copy - Called when the current selection is copied to the clipboard.
on_cut - Called when the current selection is cut to the clipboard.
on_decrease - Called when the value represented by the semantics node is decreased.
on_did_gain_accessibility_focus - Called when the node has gained accessibility focus.
on_did_lose_accessibility_focus - Called when the node has lost accessibility focus.
on_dismiss - Called when the node is dismissed.
on_double_tap - TBD
on_increase - Called when the value represented by the semantics node is increased.
on_long_press - Called when the node is long-pressed (pressing and holding the screen with the finger for a few seconds without moving it).
on_long_press_hint_text - TBD
on_move_cursor_backward_by_character - Called when the cursor is moved backward by one character.
on_move_cursor_forward_by_character - Called when the cursor is moved forward by one character.
on_paste - Called when the current content of the clipboard is pasted.
on_scroll_down - Called when a user moves their finger across the screen from top to bottom.
on_scroll_left - Called when a user moves their finger across the screen from right to left.
on_scroll_right - Called when a user moves their finger across the screen from left to right.
on_scroll_up - Called when a user moves their finger across the screen from bottom to top.
on_set_text - Called when a user wants to replace the current text in the text field with a new text.
on_tap - Called when this control is tapped.
on_tap_hint_text - TBD
Examples​
Basic Example​
import flet as ft





def main(page: ft.Page):

    def handle_gain_accessibility_focus(e: ft.Event[ft.Semantics]):

        print("focus gained")



    def handle_lose_accessibility_focus(e: ft.Event[ft.Semantics]):

        print("focus lost")



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Semantics(

                        label="Input your occupation",

                        on_did_gain_accessibility_focus=handle_gain_accessibility_focus,

                        on_did_lose_accessibility_focus=handle_lose_accessibility_focus,

                        content=ft.TextField(

                            label="Occupation",

                            hint_text="Use 20 words or less",

                            value="What is your occupation?",

                        ),

                    ),

                    ft.Icon(ft.Icons.SETTINGS, color="#c1c1c1"),

                ]

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
badge
class-attribute
instance-attribute
​
Copy
badge: BadgeValue | None = None

TBD

build
button
class-attribute
instance-attribute
​
Copy
button: bool | None = None

Whether this subtree represents a button.

build
checked
class-attribute
instance-attribute
​
Copy
checked: bool | None = None

Whether this subtree represents a checkbox or similar widget with a "checked" state, and what its current state is.

build
container
class-attribute
instance-attribute
​
Copy
container: bool | None = None

TBD

build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

The Control to annotate.

build
current_value_length
class-attribute
instance-attribute
​
Copy
current_value_length: int | None = None

The current number of characters that have been entered into an editable text field.

build
decreased_value
class-attribute
instance-attribute
​
Copy
decreased_value: str | None = None

The value that the semantics node represents when it is decreased.

build
exclude_semantics
class-attribute
instance-attribute
​
Copy
exclude_semantics: bool = False

TBD

build
expanded
class-attribute
instance-attribute
​
Copy
expanded: bool | None = None

Whether this subtree represents something that can be in an "expanded" or "collapsed" state.

build
focus
class-attribute
instance-attribute
​
Copy
focus: bool | None = None

Whether the node currently holds input focus.

build
focusable
class-attribute
instance-attribute
​
Copy
focusable: bool | None = None

Whether the node is able to hold input focus.

build
header
class-attribute
instance-attribute
​
Copy
header: bool | None = None

Whether this subtree represents a header.

build
heading_level
class-attribute
instance-attribute
​
Copy
heading_level: int | None = None

The heading level in the DOM document structure.

build
hidden
class-attribute
instance-attribute
​
Copy
hidden: bool | None = None

Whether this subtree is currently hidden.

build
hint_text
class-attribute
instance-attribute
​
Copy
hint_text: str | None = None

A brief textual description of the result of an action performed on the content control.

build
image
class-attribute
instance-attribute
​
Copy
image: bool | None = None

Whether the node represents an image.

build
increased_value
class-attribute
instance-attribute
​
Copy
increased_value: str | None = None

The value that the semantics node represents when it is increased.

build
label
class-attribute
instance-attribute
​
Copy
label: str | None = None

A textual description of the content.

build
link
class-attribute
instance-attribute
​
Copy
link: bool | None = None

Whether this subtree represents a link.

build
live_region
class-attribute
instance-attribute
​
Copy
live_region: bool | None = None

Whether this subtree should be considered a live region.

build
max_value_length
class-attribute
instance-attribute
​
Copy
max_value_length: Number | None = None

The maximum number of characters that can be entered into an editable text field.

build
mixed
class-attribute
instance-attribute
​
Copy
mixed: bool | None = None

Whether this subtree represents a checkbox or similar control with a "half-checked" state or similar, and whether it is currently in this half-checked state.

build
multiline
class-attribute
instance-attribute
​
Copy
multiline: bool | None = None

Whether the value is coming from a field that supports multiline text editing.

build
obscured
class-attribute
instance-attribute
​
Copy
obscured: bool | None = None

Whether value should be obscured.

build
read_only
class-attribute
instance-attribute
​
Copy
read_only: bool | None = None

Whether this subtree is read only.

build
selected
class-attribute
instance-attribute
​
Copy
selected: bool | None = None

Whether this subtree represents something that can be in a selected or unselected state, and what its current state is.

build
slider
class-attribute
instance-attribute
​
Copy
slider: bool | None = None

Whether this subtree represents a slider.

build
textfield
class-attribute
instance-attribute
​
Copy
textfield: bool | None = None

Whether this subtree represents a text field.

build
toggled
class-attribute
instance-attribute
​
Copy
toggled: bool | None = None

Whether this subtree represents a toggle switch or similar widget with an "on" state, and what its current state is.

build
tooltip
class-attribute
instance-attribute
​
Copy
tooltip: str | None = None

A textual description of the widget's tooltip.

build
value
class-attribute
instance-attribute
​
Copy
value: str | None = None

A textual description of the value of the content control.

Events​
bolt
on_copy
class-attribute
instance-attribute
​
Copy
on_copy: ControlEventHandler[Semantics] | None = None

Called when the current selection is copied to the clipboard.

bolt
on_cut
class-attribute
instance-attribute
​
Copy
on_cut: ControlEventHandler[Semantics] | None = None

Called when the current selection is cut to the clipboard.

bolt
on_decrease
class-attribute
instance-attribute
​
Copy
on_decrease: ControlEventHandler[Semantics] | None = None

Called when the value represented by the semantics node is decreased.

bolt
on_did_gain_accessibility_focus
class-attribute
instance-attribute
​
Copy
on_did_gain_accessibility_focus: (
    ControlEventHandler[Semantics] | None
) = None

Called when the node has gained accessibility focus.

bolt
on_did_lose_accessibility_focus
class-attribute
instance-attribute
​
Copy
on_did_lose_accessibility_focus: (
    ControlEventHandler[Semantics] | None
) = None

Called when the node has lost accessibility focus.

bolt
on_dismiss
class-attribute
instance-attribute
​
Copy
on_dismiss: ControlEventHandler[Semantics] | None = None

Called when the node is dismissed.

bolt
on_double_tap
class-attribute
instance-attribute
​
Copy
on_double_tap: ControlEventHandler[Semantics] | None = None

TBD

bolt
on_increase
class-attribute
instance-attribute
​
Copy
on_increase: ControlEventHandler[Semantics] | None = None

Called when the value represented by the semantics node is increased.

bolt
on_long_press
class-attribute
instance-attribute
​
Copy
on_long_press: ControlEventHandler[Semantics] | None = None

Called when the node is long-pressed (pressing and holding the screen with the finger for a few seconds without moving it).

bolt
on_long_press_hint_text
class-attribute
instance-attribute
​
Copy
on_long_press_hint_text: str | None = None

TBD

bolt
on_move_cursor_backward_by_character
class-attribute
instance-attribute
​
Copy
on_move_cursor_backward_by_character: (
    ControlEventHandler[Semantics] | None
) = None

Called when the cursor is moved backward by one character.

bolt
on_move_cursor_forward_by_character
class-attribute
instance-attribute
​
Copy
on_move_cursor_forward_by_character: (
    ControlEventHandler[Semantics] | None
) = None

Called when the cursor is moved forward by one character.

bolt
on_paste
class-attribute
instance-attribute
​
Copy
on_paste: ControlEventHandler[Semantics] | None = None

Called when the current content of the clipboard is pasted.

bolt
on_scroll_down
class-attribute
instance-attribute
​
Copy
on_scroll_down: ControlEventHandler[Semantics] | None = None

Called when a user moves their finger across the screen from top to bottom.

bolt
on_scroll_left
class-attribute
instance-attribute
​
Copy
on_scroll_left: ControlEventHandler[Semantics] | None = None

Called when a user moves their finger across the screen from right to left.

bolt
on_scroll_right
class-attribute
instance-attribute
​
Copy
on_scroll_right: ControlEventHandler[Semantics] | None = (
    None
)

Called when a user moves their finger across the screen from left to right.

bolt
on_scroll_up
class-attribute
instance-attribute
​
Copy
on_scroll_up: ControlEventHandler[Semantics] | None = None

Called when a user moves their finger across the screen from bottom to top.

bolt
on_set_text
class-attribute
instance-attribute
​
Copy
on_set_text: ControlEventHandler[Semantics] | None = None

Called when a user wants to replace the current text in the text field with a new text.

Voice access users can trigger this handler by speaking type <text> to their Android devices.

bolt
on_tap
class-attribute
instance-attribute
​
Copy
on_tap: ControlEventHandler[Semantics] | None = None

Called when this control is tapped.

bolt
on_tap_hint_text
class-attribute
instance-attribute
​
Copy
on_tap_hint_text: str | None = None

TBD

Edit this page