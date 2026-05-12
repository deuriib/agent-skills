# Wakelock
URL: https://flet.dev/docs/services/wakelock

ReferenceServicesWakelock
Wakelock

Prevents the device from sleeping while enabled.

Inherits: Service

Methods
disable - Allows the device to sleep again.
enable - Keeps the device awake.
is_enabled - Returns True if the wakelock is currently enabled.
Examples​
import flet as ft





async def main(page: ft.Page):

    wakelock = ft.Wakelock()



    status = ft.Text()



    async def update_status():

        enabled = await wakelock.is_enabled()

        status.value = f"Wakelock enabled: {enabled}"



    async def enable_lock():

        await wakelock.enable()

        await update_status()



    async def disable_lock():

        await wakelock.disable()

        await update_status()



    await update_status()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        [

                            status,

                            ft.Row(

                                [

                                    ft.Button("Enable wakelock", on_click=enable_lock),

                                    ft.Button(

                                        "Disable wakelock", on_click=disable_lock

                                    ),

                                ],

                                wrap=True,

                            ),

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
disable
async
​
Copy
disable()

Allows the device to sleep again.

deployed_code
enable
async
​
Copy
enable()

Keeps the device awake.

deployed_code
is_enabled
async
​
Copy
is_enabled() -> bool

Returns True if the wakelock is currently enabled.

Edit this page