# CupertinoButton
URL: https://flet.dev/docs/controls/cupertinobutton

ReferenceControlsCupertinoButton
CupertinoButton

An iOS-style button.

Example:

ft.CupertinoButton("Tap me")

Basic CupertinoButton

Inherits: LayoutControl

Properties
alignment - The alignment of this button's content.
autofocus - Whether this button should be selected as the initial focus when no other node in its scope is currently focused.
bgcolor - The background color of this button.
border_radius - The radius of the button's corners when it has a background color.
color - The color of this button's text.
content - The content of this button.
disabled_bgcolor - The background color of this button when disabled.
focus_color - The color to use for the focus highlight for keyboard interactions.
icon - An icon shown in this button.
icon_color - The foreground color of the icon.
min_size - The minimum size of this button.
mouse_cursor - The cursor for a mouse pointer when it enters or is hovering over this button.
opacity_on_click - Defines the opacity of the button when it is clicked.
padding - The amount of space to surround the content control inside the bounds of the button.
size - The size of this button.
url - The URL to open when this button is clicked.
Events
on_blur - Called when this button loses focus.
on_click - Called when a user clicks this button.
on_focus - Called when this button receives focus.
on_long_press - Called when a user long-presses this button.
Methods
focus - Requests focus for this control.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.CupertinoButton(

                        bgcolor=ft.CupertinoColors.LIGHT_BACKGROUND_GRAY,

                        opacity_on_click=0.3,

                        on_click=lambda _: print("Normal CupertinoButton clicked!"),

                        content=ft.Text(

                            value="Normal CupertinoButton",

                            color=ft.CupertinoColors.DESTRUCTIVE_RED,

                        ),

                    ),

                    ft.CupertinoButton(

                        bgcolor=ft.Colors.PRIMARY,

                        alignment=ft.Alignment.TOP_LEFT,

                        border_radius=ft.BorderRadius.all(15),

                        opacity_on_click=0.5,

                        on_click=lambda _: print("Filled CupertinoButton clicked!"),

                        content=ft.Text(

                            "Filled CupertinoButton",

                            color=ft.Colors.YELLOW,

                        ),

                    ),

                    ft.CupertinoButton(

                        bgcolor=ft.Colors.PRIMARY,

                        disabled=True,

                        alignment=ft.Alignment.TOP_LEFT,

                        opacity_on_click=0.5,

                        content=ft.Text("Disabled CupertinoButton"),

                    ),

                    ft.Button(

                        adaptive=True,

                        bgcolor=ft.CupertinoColors.SYSTEM_TEAL,

                        content=ft.Row(

                            tight=True,

                            controls=[

                                ft.Icon(ft.Icons.FAVORITE, color="pink"),

                                ft.Text("Button+adaptive"),

                            ],

                        ),

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = field(
    default_factory=lambda: Alignment.CENTER
)

The alignment of this button's content.

Typically buttons are sized to be just big enough to contain the child and its padding. If the button's size is constrained to a fixed size, this property defines how the child is aligned within the available space.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether this button should be selected as the initial focus when no other node in its scope is currently focused.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this button.

build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue = field(
    default_factory=lambda: BorderRadius.all(8.0)
)

The radius of the button's corners when it has a background color.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The color of this button's text.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

The content of this button.

build
disabled_bgcolor
class-attribute
instance-attribute
​
Copy
disabled_bgcolor: ColorValue | None = None

The background color of this button when disabled.

build
focus_color
class-attribute
instance-attribute
​
Copy
focus_color: ColorValue | None = None

The color to use for the focus highlight for keyboard interactions.

Defaults to a slightly transparent bgcolor. If bgcolor is None, defaults to a slightly transparent CupertinoColors.ACTIVE_BLUE. 'Slightly transparent' in this context means the color is used with an opacity of 0.80, a brightness of 0.69 and a saturation of 0.835.

build
icon
class-attribute
instance-attribute
​
Copy
icon: IconDataOrControl | None = None

An icon shown in this button.

build
icon_color
class-attribute
instance-attribute
​
Copy
icon_color: ColorValue | None = None

The foreground color of the icon.

build
min_size
class-attribute
instance-attribute
​
Copy
min_size: Size | None = None

The minimum size of this button.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor for a mouse pointer when it enters or is hovering over this button.

build
opacity_on_click
class-attribute
instance-attribute
​
Copy
opacity_on_click: Number = 0.4

Defines the opacity of the button when it is clicked.

When not pressed, the button has an opacity of 1.0.

Raises:

ValueError - If it is not between 0.0 and 1.0, inclusive.
build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The amount of space to surround the content control inside the bounds of the button.

build
size
class-attribute
instance-attribute
​
Copy
size: CupertinoButtonSize = CupertinoButtonSize.LARGE

The size of this button.

build
url
class-attribute
instance-attribute
​
Copy
url: str | Url | None = None

The URL to open when this button is clicked.

Additionally, if on_click event callback is provided, it is fired after that.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[CupertinoButton] | None = None

Called when this button loses focus.

bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[CupertinoButton] | None = None

Called when a user clicks this button.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[CupertinoButton] | None = None

Called when this button receives focus.

bolt
on_long_press
class-attribute
instance-attribute
​
Copy
on_long_press: (
    ControlEventHandler[CupertinoButton] | None
) = None

Called when a user long-presses this button.

Methods​
deployed_code
focus
async
​
Copy
focus()

Requests focus for this control.

Edit this page