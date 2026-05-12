# HapticFeedback
URL: https://flet.dev/docs/services/hapticfeedback

ReferenceServicesHapticFeedback
HapticFeedback

Allows access to the haptic feedback interface on the device.

Inherits: Service

Methods
heavy_impact - Provides a haptic feedback corresponding a collision impact with a heavy mass.
light_impact - Provides a haptic feedback corresponding a collision impact with a light mass.
medium_impact - Provides a haptic feedback corresponding a collision impact with a medium mass.
selection_click - TBD
vibrate - Provides vibration haptic feedback to the user for a short duration.
Examples​
Basic Example​
import flet as ft





def main(page: ft.Page):

    hf = ft.HapticFeedback()



    async def heavy_impact():

        await hf.heavy_impact()



    async def medium_impact():

        await hf.medium_impact()



    async def light_impact():

        await hf.light_impact()



    async def vibrate():

        await hf.vibrate()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button("Heavy impact", on_click=heavy_impact),

                    ft.Button("Medium impact", on_click=medium_impact),

                    ft.Button("Light impact", on_click=light_impact),

                    ft.Button("Vibrate", on_click=vibrate),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
heavy_impact
async
​
Copy
heavy_impact()

Provides a haptic feedback corresponding a collision impact with a heavy mass.

deployed_code
light_impact
async
​
Copy
light_impact()

Provides a haptic feedback corresponding a collision impact with a light mass.

deployed_code
medium_impact
async
​
Copy
medium_impact()

Provides a haptic feedback corresponding a collision impact with a medium mass.

deployed_code
selection_click
async
​
Copy
selection_click()

TBD

deployed_code
vibrate
async
​
Copy
vibrate()

Provides vibration haptic feedback to the user for a short duration.

Edit this page