# SnackBar
URL: https://flet.dev/docs/controls/snackbar

ReferenceControlsSnackBar
SnackBar

A lightweight message with an optional action which briefly displays at the bottom of the screen.

Example:

page.show_dialog(ft.SnackBar(ft.Text("Opened snack bar")))

Opened snack bar

Inherits: DialogControl

Properties
action - An optional action that the user can take based on the snack bar.
action_overflow_threshold - The percentage threshold for action's width before it overflows to a new line.
behavior - This defines the behavior and location of the snack bar.
bgcolor - SnackBar background color.
clip_behavior - The content will be clipped (or not) according to this option.
close_icon_color - The color of the close icon, if show_close_icon is True.
content - The primary content of the snack bar.
dismiss_direction - The direction in which the SnackBar can be dismissed.
duration - The amount of time this snack bar should stay open for.
elevation - The z-coordinate at which to place the snack bar.
margin - Empty space to surround the snack bar.
padding - The amount of padding to apply to the snack bar's content and optional action.
persist - Whether the snack bar will stay or auto-dismiss after timeout.
shape - The shape of this snack bar.
show_close_icon - Whether to include a "close" icon widget.
width - The width of the snack bar.
Events
on_action - Called when action button is clicked.
on_visible - Called the first time that the snackbar is visible within the page.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    def on_click(e: ft.Event[ft.Button]):

        page.show_dialog(ft.SnackBar(ft.Text("Hello, world!")))



    page.add(ft.SafeArea(content=ft.Button("Open SnackBar", on_click=on_click)))





if __name__ == "__main__":

    ft.run(main)

Counter​
import flet as ft





class Data:

    def __init__(self) -> None:

        self.counter = 0



    def increment(self):

        self.counter += 1



    def decrement(self):

        self.counter -= 1





data = Data()





def main(page: ft.Page):

    page.title = "SnackBar Example"



    snack_bar = ft.SnackBar(

        content=ft.Text("You did it!"),

        action="Undo it!",

        on_action=lambda e: data.decrement(),

    )



    def handle_button_click(e: ft.Event[ft.Button]):

        data.increment()

        snack_bar.content.value = f"You did it x {data.counter}"

        if not snack_bar.open:

            page.show_dialog(snack_bar)

        page.update()



    page.add(

        ft.SafeArea(content=ft.Button("Open SnackBar", on_click=handle_button_click))

    )





if __name__ == "__main__":

    ft.run(main)

Snack bar with counter
Action​
import flet as ft





def main(page: ft.Page):

    def open_simple_action(e: ft.Event[ft.Button]):

        page.show_dialog(

            ft.SnackBar(

                ft.Text("The file has been deleted."),

                action="Undo",

                on_action=lambda e: print("Simple Undo clicked"),

            )

        )



    def open_custom_action(e: ft.Event[ft.Button]):

        page.show_dialog(

            ft.SnackBar(

                ft.Text("The directory has been deleted."),

                persist=False,

                action=ft.SnackBarAction(

                    label="Undo delete",

                    text_color=ft.Colors.YELLOW,

                    bgcolor=ft.Colors.BLUE,

                    on_click=lambda e: print("Custom Undo clicked"),

                ),

            )

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        "Open SnackBar with a Simple action",

                        on_click=open_simple_action,

                    ),

                    ft.Button(

                        "Open SnackBar with a Custom action",

                        on_click=open_custom_action,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Snack bar with a simple action
Snack bar with a custom action
Properties​
build
action
class-attribute
instance-attribute
​
Copy
action: str | SnackBarAction | None = None

An optional action that the user can take based on the snack bar.

For example, the snack bar might let the user undo the operation that prompted the snackbar. Snack bars can have at most one action.

The action should not be "dismiss" or "cancel".

build
action_overflow_threshold
class-attribute
instance-attribute
​
Copy
action_overflow_threshold: Number | None = 0.25

The percentage threshold for action's width before it overflows to a new line.

If the width of the snackbar's content is greater than this percentage of the width of the snackbar minus the width of its action, then the action will appear below the content.

At a value of 0.0, the action will not overflow to a new line.

Raises:

ValueError - If it is not between 0.0 and 1.0, inclusive.
build
behavior
class-attribute
instance-attribute
​
Copy
behavior: SnackBarBehavior | None = None

This defines the behavior and location of the snack bar.

Defines where a SnackBar should appear within a page and how its location should be adjusted when the page also includes a FloatingActionButton or a NavigationBar.

If None, SnackBarTheme.behavior is used. If that's is also None, defaults to SnackBarBehavior.FIXED.

NOTE
If behavior is SnackBarBehavior.FLOATING, the length of the bar is defined by either width and margin, and if both are specified, width takes precedence over margin.
width and margin are ignored if behavior is not SnackBarBehavior.FLOATING.
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

SnackBar background color.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.HARD_EDGE

The content will be clipped (or not) according to this option.

build
close_icon_color
class-attribute
instance-attribute
​
Copy
close_icon_color: ColorValue | None = None

The color of the close icon, if show_close_icon is True.

build
content
instance-attribute
​
Copy
content: StrOrControl

The primary content of the snack bar.

Typically a Text control.

Raises:

ValueError - If it is neither a string nor a visible Control.
build
dismiss_direction
class-attribute
instance-attribute
​
Copy
dismiss_direction: DismissDirection | None = None

The direction in which the SnackBar can be dismissed.

If None, SnackBarTheme.dismiss_direction is used. If that's is also None, defaults to DismissDirection.DOWN.

build
duration
class-attribute
instance-attribute
​
Copy
duration: DurationValue = field(
    default_factory=lambda: Duration(milliseconds=4000)
)

The amount of time this snack bar should stay open for.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The z-coordinate at which to place the snack bar. This controls the size of the shadow below the snack bar.

Raises:

ValueError - If it is not greater than or equal to 0.
build
margin
class-attribute
instance-attribute
​
Copy
margin: MarginValue | None = None

Empty space to surround the snack bar.

Has effect only when behavior=SnackBarBehavior.FLOATING and will be ignored if width is specified.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The amount of padding to apply to the snack bar's content and optional action.

build
persist
class-attribute
instance-attribute
​
Copy
persist: bool | None = None

Whether the snack bar will stay or auto-dismiss after timeout.

If True, the snack bar remains visible even after the timeout, until the user taps the action button or the close icon.

If False, the snack bar will be dismissed after the timeout.

If not provided, but the snackbar action is not null, the snackbar will persist as well.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of this snack bar.

build
show_close_icon
class-attribute
instance-attribute
​
Copy
show_close_icon: bool = False

Whether to include a "close" icon widget.

Tapping the icon will close the snack bar.

build
width
class-attribute
instance-attribute
​
Copy
width: Number | None = None

The width of the snack bar.

If width is specified, the snack bar will be centered horizontally in the available space.

NOTE

Has effect only when behavior is SnackBarBehavior.FLOATING. It can not be used if margin is specified.

Events​
bolt
on_action
class-attribute
instance-attribute
​
Copy
on_action: ControlEventHandler[SnackBar] | None = None

Called when action button is clicked.

bolt
on_visible
class-attribute
instance-attribute
​
Copy
on_visible: ControlEventHandler[SnackBar] | None = None

Called the first time that the snackbar is visible within the page.

A button that can be used as an action in a SnackBar.

An action button for a SnackBar.

NOTE
Snack bar actions are always enabled. Instead of disabling a snack bar action, avoid including it in the snack bar in the first place.
Snack bar actions will only respond to first click. Subsequent clicks/presses are ignored.

Inherits: Control

Properties
bgcolor - The button background fill color.
disabled_bgcolor - The button disabled background color.
disabled_text_color - The button disabled label color.
label - The button's label.
text_color - The button label color.
Events
on_click - Called when this action button is clicked.
Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The button background fill color.

If None, SnackBarTheme.action_bgcolor is used.

build
disabled_bgcolor
class-attribute
instance-attribute
​
Copy
disabled_bgcolor: ColorValue | None = None

The button disabled background color. This color is shown after the action is dismissed.

If None, SnackBarTheme.disabled_action_bgcolor is used.

build
disabled_text_color
class-attribute
instance-attribute
​
Copy
disabled_text_color: ColorValue | None = None

The button disabled label color. This color is shown after the action is dismissed.

build
label
instance-attribute
​
Copy
label: str

The button's label.

build
text_color
class-attribute
instance-attribute
​
Copy
text_color: ColorValue | None = None

The button label color.

If None, SnackBarTheme.action_text_color is used.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[SnackBarAction] | None = None

Called when this action button is clicked.

Edit this page