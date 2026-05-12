# Button
URL: https://flet.dev/docs/controls/button

ReferenceControlsButton
Button

A material button.

It supports various styles, colors, event handlers for user interaction, and can be used to display text, icons, etc.

Example:

ft.Button(content="Enabled button")

ft.Button(content="Disabled button", disabled=True)

Enabled and disabled buttons

Inherits: LayoutControl, AdaptiveControl

Properties
autofocus - Whether this button should be focused initially.
bgcolor - The button's background color.
clip_behavior - The button's clip behavior.
color - The button's foreground color.
content - The button's label.
elevation - The button's elevation.
icon - The icon to display inside the button.
icon_color - The color of the icon.
style - The button's style.
url - The URL to open when the button is clicked.
Events
on_blur - Called when the button loses focus.
on_click - Called when the button is clicked.
on_focus - Called when the button is focused.
on_hover - Called when the button is hovered.
on_long_press - Called when the button is long-pressed.
Methods
focus - Requests focus for this control.
Examples​

Live example

Button​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(content="Enabled button"),

                    ft.Button(content="Disabled button", disabled=True),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Icons​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(content="Button with icon", icon=ft.Icons.WAVES_ROUNDED),

                    ft.Button(

                        content="Button with colorful icon",

                        icon=ft.Icons.PARK_ROUNDED,

                        icon_color=ft.Colors.GREEN_400,

                    ),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Handling clicks​
import flet as ft





def main(page: ft.Page):

    def button_clicked(e: ft.Event[ft.Button]):

        button.data += 1

        message.value = f"Button clicked {button.data} time(s)"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    button := ft.Button(

                        content="Button with 'click' event",

                        data=0,

                        on_click=button_clicked,

                    ),

                    message := ft.Text(),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Custom content​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        width=150,

                        content=ft.Row(

                            alignment=ft.MainAxisAlignment.SPACE_AROUND,

                            controls=[

                                ft.Icon(ft.Icons.FAVORITE, color=ft.Colors.PINK),

                                ft.Icon(ft.Icons.AUDIOTRACK, color=ft.Colors.GREEN),

                                ft.Icon(ft.Icons.BEACH_ACCESS, color=ft.Colors.BLUE),

                            ],

                        ),

                    ),

                    ft.Button(

                        content=ft.Container(

                            padding=ft.Padding.all(10),

                            content=ft.Column(

                                alignment=ft.MainAxisAlignment.CENTER,

                                spacing=5,

                                controls=[

                                    ft.Text(value="Compound button", size=20),

                                    ft.Text(value="This is secondary text"),

                                ],

                            ),

                        ),

                    ),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Shapes​
import flet as ft





def main(page: ft.Page):

    page.padding = 30

    page.spacing = 30



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        content="Stadium",

                        style=ft.ButtonStyle(shape=ft.StadiumBorder()),

                    ),

                    ft.Button(

                        content="Rounded rectangle",

                        style=ft.ButtonStyle(

                            shape=ft.RoundedRectangleBorder(radius=10)

                        ),

                    ),

                    ft.Button(

                        content="Continuous rectangle",

                        style=ft.ButtonStyle(

                            shape=ft.ContinuousRectangleBorder(radius=30)

                        ),

                    ),

                    ft.Button(

                        content="Beveled rectangle",

                        style=ft.ButtonStyle(

                            shape=ft.BeveledRectangleBorder(radius=10)

                        ),

                    ),

                    ft.Button(

                        content="Circle",

                        style=ft.ButtonStyle(shape=ft.CircleBorder(), padding=30),

                    ),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Styling​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        content="Styled button 1",

                        style=ft.ButtonStyle(

                            color={

                                ft.ControlState.HOVERED: ft.Colors.WHITE,

                                ft.ControlState.FOCUSED: ft.Colors.BLUE,

                                ft.ControlState.DEFAULT: ft.Colors.BLACK,

                            },

                            bgcolor={

                                ft.ControlState.FOCUSED: ft.Colors.PINK_200,

                                ft.ControlState.DEFAULT: ft.Colors.YELLOW,

                            },

                            padding={ft.ControlState.HOVERED: 20},

                            overlay_color=ft.Colors.TRANSPARENT,

                            elevation={

                                ft.ControlState.DEFAULT: 0,

                                ft.ControlState.HOVERED: 5,

                                ft.ControlState.PRESSED: 10,

                            },

                            animation_duration=500,

                            side={

                                ft.ControlState.DEFAULT: ft.BorderSide(

                                    1, color=ft.Colors.BLUE_100

                                ),

                                ft.ControlState.HOVERED: ft.BorderSide(

                                    3, color=ft.Colors.BLUE_400

                                ),

                                ft.ControlState.PRESSED: ft.BorderSide(

                                    6, color=ft.Colors.BLUE_600

                                ),

                            },

                            shape={

                                ft.ControlState.HOVERED: ft.RoundedRectangleBorder(

                                    radius=20

                                ),

                                ft.ControlState.DEFAULT: ft.RoundedRectangleBorder(

                                    radius=2

                                ),

                            },

                        ),

                    )

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Default state
Hovered state
Animate on hover​
import flet as ft





def main(page: ft.Page):

    def animate(e: ft.Event[ft.Button]):

        e.control.rotate = 0.1 if e.data else 0



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        content="Hover over me, I'm animated!",

                        rotate=0,

                        animate_rotation=100,

                        on_hover=animate,

                        on_click=lambda e: page.add(

                            ft.Text("Clicked! Try a long press!")

                        ),

                        on_long_press=lambda e: page.add(

                            ft.Text("I knew you could do it!")

                        ),

                    )

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Normal button
Hovered button
Properties​
build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool | None = None

Whether this button should be focused initially.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = field(
    default=None, metadata={"skip": True}
)

The button's background color. If not specified, defaults to the theme's primary color.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior | None = None

The button's clip behavior.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = field(
    default=None, metadata={"skip": True}
)

The button's foreground color. If not specified, defaults to the theme's primary color.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

The button's label. Typically a Text control or a string. If a string is provided, it will be wrapped in a Text control.

Raises:

ValueError - If neither content nor icon (string or visible control) is provided.
build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number = field(
    default=1, metadata={"skip": True}
)

The button's elevation. If not specified, defaults to 1.

build
icon
class-attribute
instance-attribute
​
Copy
icon: IconDataOrControl | None = None

The icon to display inside the button. Typically an Icon control or an IconData. If an IconData is provided, it will be wrapped in an Icon control.

Raises:

ValueError - If neither icon nor content (string or visible control) is provided.
build
icon_color
class-attribute
instance-attribute
​
Copy
icon_color: ColorValue | None = None

The color of the icon. If not specified, defaults to the current foreground color.

build
style
class-attribute
instance-attribute
​
Copy
style: ButtonStyle | None = field(
    default=None, metadata={"skip": True}
)

The button's style.

build
url
class-attribute
instance-attribute
​
Copy
url: str | Url | None = None

The URL to open when the button is clicked.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Button] | None = None

Called when the button loses focus.

bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[Button] | None = None

Called when the button is clicked.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Button] | None = None

Called when the button is focused.

bolt
on_hover
class-attribute
instance-attribute
​
Copy
on_hover: ControlEventHandler[Button] | None = None

Called when the button is hovered.

bolt
on_long_press
class-attribute
instance-attribute
​
Copy
on_long_press: ControlEventHandler[Button] | None = None

Called when the button is long-pressed.

Methods​
deployed_code
focus
async
​
Copy
focus()

Requests focus for this control.

Edit this page