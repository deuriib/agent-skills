# TextButton
URL: https://flet.dev/docs/controls/textbutton

ReferenceControlsTextButton
TextButton

Text buttons are used for the lowest priority actions, especially when presenting multiple options. Text buttons can be placed on a variety of backgrounds. Until the button is interacted with, its container isn’t visible.

ft.TextButton(

    content="Text Button",

    icon=ft.Icons.STAR_BORDER,

    icon_color=ft.Colors.BLUE_300,

)

Simple text button

Inherits: LayoutControl, AdaptiveControl

Properties
autofocus - True if the control will be selected as the initial focus.
clip_behavior - Defines how the content of this button is clipped.
content - A Control representing custom button content.
icon - An icon to show in this button.
icon_color - Icon color.
style - Defines the style of this button.
url - The URL to open when this button is clicked.
Events
on_blur - Called when this button has lost focus.
on_click - Called when a user clicks this button.
on_focus - Called when this button has received focus.
on_hover - Called when a mouse pointer enters or exists this button's response area.
on_long_press - Called when this button is long-pressed.
Methods
focus - Requests focus for this control.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.title = "Basic text buttons"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextButton(content="Text button"),

                    ft.TextButton(content="Disabled button", disabled=True),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Icons​
import flet as ft





def main(page: ft.Page):

    page.title = "TextButtons with icons"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextButton(

                        content="Button with icon",

                        icon=ft.Icons.WAVES_OUTLINED,

                    ),

                    ft.TextButton(

                        content="Button with colorful icon",

                        icon=ft.Icons.PARK_ROUNDED,

                        icon_color=ft.Colors.GREEN_400,

                    ),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Handling clicks​
import flet as ft





def main(page: ft.Page):

    page.title = "TextButton with 'click' event"



    def button_clicked(e):

        button.data += 1

        message_text.value = f"Button clicked {button.data} time(s)"



    message_text = ft.Text()

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    button := ft.TextButton(

                        key="TextButton",

                        content="Button with 'click' event",

                        data=0,

                        on_click=button_clicked,

                    ),

                    ft.Container(

                        padding=ft.Padding(left=12),

                        content=message_text,

                    ),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Custom content​
import flet as ft





def main(page: ft.Page):

    page.title = "TextButtons with custom content"



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextButton(

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

                    ft.TextButton(

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

                ],

            ),

        ),

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

True if the control will be selected as the initial focus.

If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.NONE

Defines how the content of this button is clipped.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

A Control representing custom button content.

build
icon
class-attribute
instance-attribute
​
Copy
icon: IconDataOrControl | None = None

An icon to show in this button.

build
icon_color
class-attribute
instance-attribute
​
Copy
icon_color: ColorValue | None = None

Icon color.

build
style
class-attribute
instance-attribute
​
Copy
style: ButtonStyle | None = None

Defines the style of this button.

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
on_blur: ControlEventHandler[TextButton] | None = None

Called when this button has lost focus.

bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[TextButton] | None = None

Called when a user clicks this button.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[TextButton] | None = None

Called when this button has received focus.

bolt
on_hover
class-attribute
instance-attribute
​
Copy
on_hover: ControlEventHandler[TextButton] | None = None

Called when a mouse pointer enters or exists this button's response area.

The data property of the event handler argument is True when cursor enters and False when it exits.

bolt
on_long_press
class-attribute
instance-attribute
​
Copy
on_long_press: ControlEventHandler[TextButton] | None = None

Called when this button is long-pressed.

Methods​
deployed_code
focus
async
​
Copy
focus()

Requests focus for this control.

Edit this page