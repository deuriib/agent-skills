# Flashlight
URL: https://flet.dev/docs/services/flashlight/

ReferenceServicesFlashlight
Flashlight

Control the device torch/flashlight in your Flet app via the flet-flashlight extension, built on top of Flutter's flashlight package.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	❌	❌	❌	✅	✅	❌
Usage​

Add flet-flashlight to your project dependencies:

uv
pip
uv add flet-flashlight

Example​
import flet as ft

import flet_flashlight as ffl





def main(page: ft.Page):

    async def turn_on_flashlight():

        await ffl.Flashlight().on()



    async def turn_off_flashlight():

        await ffl.Flashlight().off()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button("Turn On Flashlight", on_click=turn_on_flashlight),

                    ft.Button("Turn Off Flashlight", on_click=turn_off_flashlight),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

A control to use FlashLight. Works on iOS and Android.

Inherits: Service

Methods
is_available - Checks if the flashlight is available on the device.
off - Turns the flashlight off.
on - Turns the flashlight on.
Methods​
deployed_code
is_available
async
​
Copy
is_available()

Checks if the flashlight is available on the device.

deployed_code
off
async
​
Copy
off()

Turns the flashlight off.

deployed_code
on
async
​
Copy
on()

Turns the flashlight on.

Edit this page