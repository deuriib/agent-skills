# SubmenuButton
URL: https://flet.dev/docs/controls/submenubutton

ReferenceControlsSubmenuButton
SubmenuButton

A menu button that displays a cascading menu.

Typically used in a MenuBar control.

ft.SubmenuButton(

    content=ft.Text("Choose text style"),

    key="smbutton",

    expand=True,

    menu_style=ft.MenuStyle(

        alignment=ft.Alignment.BOTTOM_LEFT, side=ft.BorderSide(1)

    ),

    controls=[

        ft.MenuItemButton(

            content=ft.Text("Underlined"),

            on_click=lambda e: print(f"{e.control.content.value}.on_click"),

        ),

        ft.MenuItemButton(...),

        ...,

    ],

)

Activated submenu button

Inherits: LayoutControl

Properties
alignment_offset - The offset of the menu relative to the alignment origin determined by MenuStyle.alignment on the style attribute.
clip_behavior - Whether to clip the content of this control or not.
content - The child control to be displayed in the middle portion of this button.
controls - A list of controls that appear in the menu when it is opened.
leading - An optional control to display before the content.
menu_style - Customizes this menu's appearance.
style - Customizes this button's appearance.
trailing - An optional control to display after the content.
Events
on_blur - Called when this button loses focus.
on_close - Called when the menu is closed.
on_focus - Called when the button receives focus.
on_hover - Called when the button is hovered.
on_open - Called when the menu is opened.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.padding = 0

    page.spacing = 0



    def handle_color_click(e: ft.Event[ft.MenuItemButton]):

        color = e.control.content.value

        background_container.content.value = f"{color} background color"

        background_container.bgcolor = color.lower()



    def handle_alignment_click(e: ft.Event[ft.MenuItemButton]):

        background_container.alignment = e.control.data



    def handle_on_hover(e: ft.Event[ft.MenuItemButton]):

        print(f"{e.control.content.value}.on_hover")



    menubar = ft.MenuBar(

        expand=True,

        controls=[

            ft.SubmenuButton(

                content=ft.Text("Change Body"),

                key="submenubutton",

                controls=[

                    ft.SubmenuButton(

                        content=ft.Text("BG Color"),

                        leading=ft.Icon(ft.Icons.COLORIZE),

                        controls=[

                            ft.MenuItemButton(

                                content=ft.Text("Blue"),

                                on_click=handle_color_click,

                                on_hover=handle_on_hover,

                                style=ft.ButtonStyle(

                                    bgcolor={ft.ControlState.HOVERED: ft.Colors.BLUE}

                                ),

                            ),

                            ft.MenuItemButton(

                                content=ft.Text("Green"),

                                on_click=handle_color_click,

                                on_hover=handle_on_hover,

                                style=ft.ButtonStyle(

                                    bgcolor={ft.ControlState.HOVERED: ft.Colors.GREEN}

                                ),

                            ),

                            ft.MenuItemButton(

                                content=ft.Text("Red"),

                                on_click=handle_color_click,

                                on_hover=handle_on_hover,

                                style=ft.ButtonStyle(

                                    bgcolor={ft.ControlState.HOVERED: ft.Colors.RED}

                                ),

                            ),

                        ],

                    ),

                    ft.SubmenuButton(

                        content=ft.Text("Text alignment"),

                        leading=ft.Icon(ft.Icons.LOCATION_PIN),

                        controls=[

                            ft.MenuItemButton(

                                content=ft.Text("bottom_center"),

                                data=ft.Alignment.BOTTOM_CENTER,

                                on_click=handle_alignment_click,

                                style=ft.ButtonStyle(

                                    bgcolor={

                                        ft.ControlState.HOVERED: ft.Colors.GREY_100

                                    }

                                ),

                            ),

                            ft.MenuItemButton(

                                content=ft.Text("bottom_left"),

                                data=ft.Alignment.BOTTOM_LEFT,

                                on_click=handle_alignment_click,

                                style=ft.ButtonStyle(

                                    bgcolor={

                                        ft.ControlState.HOVERED: ft.Colors.GREY_100

                                    }

                                ),

                            ),

                            ft.MenuItemButton(

                                content=ft.Text("top_center"),

                                data=ft.Alignment.TOP_CENTER,

                                on_click=handle_alignment_click,

                                style=ft.ButtonStyle(

                                    bgcolor={

                                        ft.ControlState.HOVERED: ft.Colors.GREY_100

                                    }

                                ),

                            ),

                            ft.MenuItemButton(

                                content=ft.Text("center_left"),

                                data=ft.Alignment.CENTER_LEFT,

                                on_click=handle_alignment_click,

                                style=ft.ButtonStyle(

                                    bgcolor={

                                        ft.ControlState.HOVERED: ft.Colors.GREY_100

                                    }

                                ),

                            ),

                            ft.MenuItemButton(

                                content=ft.Text("center_right"),

                                data=ft.Alignment.CENTER_RIGHT,

                                on_click=handle_alignment_click,

                                style=ft.ButtonStyle(

                                    bgcolor={

                                        ft.ControlState.HOVERED: ft.Colors.GREY_100

                                    }

                                ),

                            ),

                        ],

                    ),

                ],

            )

        ],

    )



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                spacing=0,

                controls=[

                    ft.Row(controls=[menubar]),

                    background_container := ft.Container(

                        expand=True,

                        bgcolor=ft.Colors.SURFACE_TINT,

                        alignment=ft.Alignment.CENTER,

                        content=ft.Text(

                            value="Choose a bgcolor from the menu",

                            style=ft.TextStyle(size=24, weight=ft.FontWeight.BOLD),

                        ),

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Standalone Example​
import flet as ft





def main(page: ft.Page):

    page.theme_mode = ft.ThemeMode.LIGHT



    smb = ft.SubmenuButton(

        expand=True,

        content=ft.Text("Text Styles"),

        key="smbutton",

        menu_style=ft.MenuStyle(

            alignment=ft.Alignment.CENTER_RIGHT, side=ft.BorderSide(1)

        ),

        controls=[

            ft.MenuItemButton(

                content=ft.Text("Underlined"),

                on_click=lambda e: print(f"{e.control.content.value}.on_click"),

                style=ft.ButtonStyle(

                    text_style={

                        ft.ControlState.HOVERED: ft.TextStyle(

                            decoration=ft.TextDecoration.UNDERLINE

                        )

                    }

                ),

            ),

            ft.MenuItemButton(

                content=ft.Text("Bold"),

                on_click=lambda e: print(f"{e.control.content.value}.on_click"),

                style=ft.ButtonStyle(

                    text_style={

                        ft.ControlState.HOVERED: ft.TextStyle(weight=ft.FontWeight.BOLD)

                    }

                ),

            ),

            ft.MenuItemButton(

                content=ft.Text("Italic"),

                on_click=lambda e: print(f"{e.control.content.value}.on_click"),

                style=ft.ButtonStyle(

                    text_style={ft.ControlState.HOVERED: ft.TextStyle(italic=True)}

                ),

            ),

        ],

    )



    page.add(

        ft.SafeArea(

            content=ft.Row(controls=[smb]),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
alignment_offset
class-attribute
instance-attribute
​
Copy
alignment_offset: OffsetValue | None = None

The offset of the menu relative to the alignment origin determined by MenuStyle.alignment on the style attribute.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.HARD_EDGE

Whether to clip the content of this control or not.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

The child control to be displayed in the middle portion of this button.

Typically this is the button's label, using a Text control.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[Control] = field(default_factory=list)

A list of controls that appear in the menu when it is opened.

Typically either MenuItemButton or SubMenuButton controls.

If this list is empty, then the button for this menu item will be disabled.

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
menu_style
class-attribute
instance-attribute
​
Copy
menu_style: MenuStyle | None = None

Customizes this menu's appearance.

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
on_blur: ControlEventHandler[SubmenuButton] | None = None

Called when this button loses focus.

bolt
on_close
class-attribute
instance-attribute
​
Copy
on_close: ControlEventHandler[SubmenuButton] | None = None

Called when the menu is closed.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[SubmenuButton] | None = None

Called when the button receives focus.

bolt
on_hover
class-attribute
instance-attribute
​
Copy
on_hover: ControlEventHandler[SubmenuButton] | None = None

Called when the button is hovered.

bolt
on_open
class-attribute
instance-attribute
​
Copy
on_open: ControlEventHandler[SubmenuButton] | None = None

Called when the menu is opened.

Edit this page