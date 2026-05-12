# PopupMenuButton
URL: https://flet.dev/docs/controls/popupmenubutton

ReferenceControlsPopupMenuButton
PopupMenuButton

An icon button which displays a menu when clicked.

ft.PopupMenuButton(

    items=[

        ft.PopupMenuItem(content="Sm"),

        ft.PopupMenuItem(content="Med"),

        ft.PopupMenuItem(content="Lg"),

    ],

    menu_position=ft.PopupMenuPosition.UNDER,

)

Opened popup menu under button

Inherits: LayoutControl

Properties
bgcolor - The menu's background color.
clip_behavior - The content will be clipped (or not) according to this option.
content - A Control that will be displayed instead of "more" icon.
elevation - The menu's elevation when opened.
enable_feedback - Whether detected gestures should provide acoustic and/or haptic feedback.
icon - If provided, an icon to draw on the button.
icon_color - The icon's color.
icon_size - The icon's size.
items - A collection of PopupMenuItem controls to display in a dropdown menu.
menu_padding - TBD
menu_position - Defines position of the popup menu relative to the button.
padding - TBD
popup_animation_style - TBD
shadow_color - The color used to paint the shadow below the menu.
shape - The menu's shape.
size_constraints - TBD
splash_radius - The splash radius.
style - TBD
Events
on_cancel - Called when the user dismisses/cancels the popup menu without selecting an item.
on_open - Called when the popup menu is shown.
on_select - TBD
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    def handle_check_item_click(e: ft.Event[ft.PopupMenuItem]):

        e.control.checked = not e.control.checked



    page.add(

        ft.SafeArea(

            content=ft.PopupMenuButton(

                key="popup",

                items=[

                    ft.PopupMenuItem(content="Item 1"),

                    ft.PopupMenuItem(icon=ft.Icons.POWER_INPUT, content="Check power"),

                    ft.PopupMenuItem(

                        content=ft.Row(

                            controls=[

                                ft.Icon(ft.Icons.HOURGLASS_TOP_OUTLINED),

                                ft.Text("Item with a custom content"),

                            ]

                        ),

                        on_click=lambda _: print("Button with custom content clicked!"),

                    ),

                    ft.PopupMenuItem(),  # divider

                    ft.PopupMenuItem(

                        content="Checked item",

                        checked=False,

                        on_click=handle_check_item_click,

                    ),

                ],

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The menu's background color.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.NONE

The content will be clipped (or not) according to this option.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

A Control that will be displayed instead of "more" icon.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The menu's elevation when opened.

Defaults to 8.

build
enable_feedback
class-attribute
instance-attribute
​
Copy
enable_feedback: bool | None = None

Whether detected gestures should provide acoustic and/or haptic feedback.

On Android, for example, setting this to True produce a click sound and a long-press will produce a short vibration.

Defaults to True.

build
icon
class-attribute
instance-attribute
​
Copy
icon: IconDataOrControl | None = None

If provided, an icon to draw on the button.

build
icon_color
class-attribute
instance-attribute
​
Copy
icon_color: ColorValue | None = None

The icon's color.

build
icon_size
class-attribute
instance-attribute
​
Copy
icon_size: Number | None = None

The icon's size.

build
items
class-attribute
instance-attribute
​
Copy
items: list[PopupMenuItem] = field(default_factory=list)

A collection of PopupMenuItem controls to display in a dropdown menu.

build
menu_padding
class-attribute
instance-attribute
​
Copy
menu_padding: PaddingValue | None = None

TBD

build
menu_position
class-attribute
instance-attribute
​
Copy
menu_position: PopupMenuPosition | None = None

Defines position of the popup menu relative to the button.

Defaults to PopupMenuPosition.OVER.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue = 8

TBD

build
popup_animation_style
class-attribute
instance-attribute
​
Copy
popup_animation_style: AnimationStyle | None = None

TBD

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

The color used to paint the shadow below the menu.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The menu's shape.

Defaults to CircleBorder(radius=10.0).

build
size_constraints
class-attribute
instance-attribute
​
Copy
size_constraints: BoxConstraints | None = None

TBD

build
splash_radius
class-attribute
instance-attribute
​
Copy
splash_radius: Number | None = None

The splash radius.

build
style
class-attribute
instance-attribute
​
Copy
style: ButtonStyle | None = None

TBD

Events​
bolt
on_cancel
class-attribute
instance-attribute
​
Copy
on_cancel: ControlEventHandler[PopupMenuButton] | None = (
    None
)

Called when the user dismisses/cancels the popup menu without selecting an item.

bolt
on_open
class-attribute
instance-attribute
​
Copy
on_open: ControlEventHandler[PopupMenuButton] | None = None

Called when the popup menu is shown.

bolt
on_select
class-attribute
instance-attribute
​
Copy
on_select: ControlEventHandler[PopupMenuButton] | None = (
    None
)

TBD

A popup menu item.

Inherits: Control

Properties
checked - Whether this menu item is checked.
content - A Control representing custom content of this menu item.
height - The minimum height of this menu item.
icon - An icon to draw before the text label of this menu item.
label_text_style - The text style of the label of this menu item.
mouse_cursor - The cursor to be displayed when a mouse pointer enters or is hovering over this item.
padding - The padding of this menu item.
Events
on_click - Called when a user clicks on this menu item.
Properties​
build
checked
class-attribute
instance-attribute
​
Copy
checked: bool | None = None

Whether this menu item is checked.

If set to True, a checkmark will be shown on the left of the content.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

A Control representing custom content of this menu item.

build
height
class-attribute
instance-attribute
​
Copy
height: Number = 48.0

The minimum height of this menu item.

build
icon
class-attribute
instance-attribute
​
Copy
icon: IconDataOrControl | None = None

An icon to draw before the text label of this menu item.

build
label_text_style
class-attribute
instance-attribute
​
Copy
label_text_style: TextStyle | None = None

The text style of the label of this menu item.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor to be displayed when a mouse pointer enters or is hovering over this item.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The padding of this menu item.

Defaults to Padding.symmetric(horizontal=12).

NOTE

The height value of this menu item may influence the applied padding.

For example, if a height greater than the height of the sum of the padding and a content is provided, then the padding's effect will not be visible.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[PopupMenuItem] | None = None

Called when a user clicks on this menu item.

Edit this page