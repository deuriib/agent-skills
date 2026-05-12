# MenuItemButton
URL: https://flet.dev/docs/controls/menuitembutton

ReferenceControlsMenuItemButton
MenuItemButton

A button for use in a MenuBar or on its own, that can be activated by click or keyboard navigation.

ft.Row(

    controls=[

        ft.MenuItemButton(

            content=ft.Text("Yes"),

            on_click=lambda e: print("yes"),

        ),

        ft.MenuItemButton(

            content=ft.Text("No"),

            on_click=lambda e: print("no"),

        ),

        ft.MenuItemButton(

            content=ft.Text("Maybe"),

            on_click=lambda e: print("maybe"),

        ),

    ],

)

Menu item buttons outside of menubar

Inherits: LayoutControl

Properties
autofocus - Whether this button should automatically request focus.
clip_behavior - Whether to clip the content of this control or not.
close_on_click - Defines if the menu will be closed when the MenuItemButton is clicked.
content - The child control or text to be displayed in the center of this button.
focus_on_hover - Determine if hovering can request focus.
leading - An optional control to display before the content.
overflow_axis - The direction in which the menu item expands.
semantic_label - A string that describes the button's action to assistive technologies.
style - Customizes this button's appearance.
trailing - An optional control to display after the content.
Events
on_blur - Called when this button loses focus.
on_click - Called when the button is clicked.If not defined the button will be disabled.
on_focus - Called when the button receives focus.
on_hover - Called when the button is hovered.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.padding = 0

    page.spacing = 0

    page.theme_mode = ft.ThemeMode.LIGHT



    def handle_color_click(e: ft.Event[ft.MenuItemButton]):

        color = e.control.content.value

        background_container.content.value = f"{color} background color"

        background_container.bgcolor = color.lower()



    def handle_on_hover(e: ft.Event[ft.MenuItemButton]):

        print(e)



    menubar = ft.MenuBar(

        expand=True,

        controls=[

            ft.SubmenuButton(

                content=ft.Text("BgColors"),

                controls=[

                    ft.MenuItemButton(

                        content=ft.Text("Blue"),

                        leading=ft.Icon(ft.Icons.COLORIZE),

                        style=ft.ButtonStyle(

                            bgcolor={ft.ControlState.HOVERED: ft.Colors.BLUE}

                        ),

                        on_click=handle_color_click,

                        on_hover=handle_on_hover,

                    ),

                    ft.MenuItemButton(

                        content=ft.Text("Green"),

                        leading=ft.Icon(ft.Icons.COLORIZE),

                        style=ft.ButtonStyle(

                            bgcolor={ft.ControlState.HOVERED: ft.Colors.GREEN}

                        ),

                        on_click=handle_color_click,

                        on_hover=handle_on_hover,

                    ),

                    ft.MenuItemButton(

                        content=ft.Text("Red"),

                        leading=ft.Icon(ft.Icons.COLORIZE),

                        style=ft.ButtonStyle(

                            bgcolor={ft.ControlState.HOVERED: ft.Colors.RED}

                        ),

                        on_click=handle_color_click,

                        on_hover=handle_on_hover,

                    ),

                ],

            ),

        ],

    )



    page.add(

        ft.SafeArea(

            expand=True,

            avoid_intrusions_left=False,

            avoid_intrusions_top=False,

            avoid_intrusions_right=False,

            avoid_intrusions_bottom=False,

            content=ft.Column(

                expand=True,

                spacing=0,

                controls=[

                    ft.Row(controls=[menubar]),

                    background_container := ft.Container(

                        expand=True,

                        bgcolor=ft.Colors.WHITE,

                        alignment=ft.Alignment.CENTER,

                        content=ft.Text(

                            value="Choose a bgcolor from the menu",

                            style=ft.TextStyle(weight=ft.FontWeight.W_500),

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
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether this button should automatically request focus.

Defaults to False.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.NONE

Whether to clip the content of this control or not.

build
close_on_click
class-attribute
instance-attribute
​
Copy
close_on_click: bool = True

Defines if the menu will be closed when the MenuItemButton is clicked.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

The child control or text to be displayed in the center of this button.

Typically this is the button's label, using a Text control.

build
focus_on_hover
class-attribute
instance-attribute
​
Copy
focus_on_hover: bool = True

Determine if hovering can request focus.

build
leading
class-attribute
instance-attribute
​
Copy
leading: Control | None = None

An optional control to display before the content.

Typically an Icon control.

build
overflow_axis
class-attribute
instance-attribute
​
Copy
overflow_axis: Axis = Axis.HORIZONTAL

The direction in which the menu item expands.

If the menu item button is a descendent of MenuBar, then this property is ignored.

build
semantic_label
class-attribute
instance-attribute
​
Copy
semantic_label: str | None = None

A string that describes the button's action to assistive technologies.

build
style
class-attribute
instance-attribute
​
Copy
style: ButtonStyle | None = None

Customizes this button's appearance.

build
trailing
class-attribute
instance-attribute
​
Copy
trailing: Control | None = None

An optional control to display after the content.

Typically an Icon control.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[MenuItemButton] | None = None

Called when this button loses focus.

bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[MenuItemButton] | None = None

Called when the button is clicked.If not defined the button will be disabled.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[MenuItemButton] | None = None

Called when the button receives focus.

bolt
on_hover
class-attribute
instance-attribute
​
Copy
on_hover: ControlEventHandler[MenuItemButton] | None = None

Called when the button is hovered.

Edit this page