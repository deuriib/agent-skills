# KeyboardListener
URL: https://flet.dev/docs/controls/keyboardlistener

ReferenceControlsKeyboardListener
KeyboardListener

A control that calls a callback whenever the user presses or releases a key on a keyboard.

Inherits: Control

Properties
autofocus - True if this control will be selected as the initial focus when no other node in its scope is currently focused.
content - The content control of the keyboard listener.
include_semantics - Include semantics information in this control.
Events
on_key_down - Fires when a keyboard key is pressed.
on_key_repeat - Fires when a keyboard key is being hold, causing repeated events.
on_key_up - Fires when a keyboard key is released.
Methods
focus - Requests focus for this control.
Examples​
Press any keys​
import flet as ft





async def main(page: ft.Page):

    pressed_keys = set()



    def key_down(e: ft.KeyDownEvent):

        pressed_keys.add(e.key)

        keys.controls = [ft.Text(k, size=20) for k in pressed_keys]

        keys.update()



    def key_up(e: ft.KeyUpEvent):

        pressed_keys.remove(e.key)

        keys.controls = [ft.Text(k, size=20) for k in pressed_keys]

        keys.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Press any keys..."),

                    ft.KeyboardListener(

                        autofocus=True,

                        on_key_down=key_down,

                        on_key_up=key_up,

                        content=(keys := ft.Row()),

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

True if this control will be selected as the initial focus when no other node in its scope is currently focused.

build
content
instance-attribute
​
Copy
content: Control

The content control of the keyboard listener.

build
include_semantics
class-attribute
instance-attribute
​
Copy
include_semantics: bool = True

Include semantics information in this control.

Events​
bolt
on_key_down
class-attribute
instance-attribute
​
Copy
on_key_down: EventHandler[KeyDownEvent] | None = None

Fires when a keyboard key is pressed.

bolt
on_key_repeat
class-attribute
instance-attribute
​
Copy
on_key_repeat: EventHandler[KeyRepeatEvent] | None = None

Fires when a keyboard key is being hold, causing repeated events.

bolt
on_key_up
class-attribute
instance-attribute
​
Copy
on_key_up: EventHandler[KeyUpEvent] | None = None

Fires when a keyboard key is released.

Methods​
deployed_code
focus
async
​
Copy
focus()

Requests focus for this control.

Edit this page