# Keyboard Shortcuts
URL: https://flet.dev/docs/cookbook/keyboard-shortcuts

CookbookKeyboard Shortcuts
Keyboard Shortcuts

A solid keyboard support is a key for user productivity while using your web and, especially, desktop app. Indeed, it could be really annoying to constantly switch between mouse and keyboard.

In addition to form controls' .autofocus property and TextField.focus() method Flet allows handling "global" keyboard events.

To capture all keystrokes implement page.on_keyboard_event handler. Event handler parameter e is an instance of KeyboardEvent class with the following properties:

key - a textual representation of a pressed key, e.g. A, Enter or F5.
shift - True if "Shift" key is pressed.
ctrl - True if "Control" key is pressed.
alt - True if "Alt" ("Option") key is pressed.
meta - True if "Command" key is pressed.

This is a simple usage example:

import flet as ft



def main(page: ft.Page):

    def on_keyboard(e: ft.KeyboardEvent):

        page.add(

            ft.Text(

                f"Key: {e.key}, Shift: {e.shift}, Control: {e.ctrl}, Alt: {e.alt}, Meta: {e.meta}"

            )

        )



    page.on_keyboard_event = on_keyboard

    page.add(

        ft.Text("Press any key with a combination of CTRL, ALT, SHIFT and META keys...")

    )



ft.run(main)


Below is a more advanced example:

import flet as ft





class ButtonControl(ft.Container):

    def __init__(self, text):

        super().__init__()

        self.content: ft.Text = ft.Text(text)

        self.border = ft.Border.all(1, ft.Colors.BLACK_54)

        self.border_radius = 3

        self.bgcolor = "0x09000000"

        self.padding = 10

        self.visible = False





def main(page: ft.Page):

    page.spacing = 50

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def on_keyboard(e: ft.KeyboardEvent):

        key.content.value = e.key

        key.visible = True

        shift.visible = e.shift

        ctrl.visible = e.ctrl

        alt.visible = e.alt

        meta.visible = e.meta

        page.update()



    page.on_keyboard_event = on_keyboard



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        "Press any key with a combination of CTRL, ALT, SHIFT "

                        "and META keys..."

                    ),

                    ft.Row(

                        controls=[

                            key := ButtonControl(""),

                            shift := ButtonControl("Shift"),

                            ctrl := ButtonControl("Control"),

                            alt := ButtonControl("Alt"),

                            meta := ButtonControl("Meta"),

                        ],

                        alignment=ft.MainAxisAlignment.CENTER,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page