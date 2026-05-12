# ScreenBrightness
URL: https://flet.dev/docs/services/screenbrightness

ReferenceServicesScreenBrightness
ScreenBrightness

Provides access to control and observe system and application screen brightness.

NOTE
Supported platforms: Android, iOS.

To adjust the system brightness on Android, add the following permission in your pyproject.toml file:

[tool.flet.android.permission]

"android.permission.WRITE_SETTINGS" = true


Inherits: Service

Events
on_application_screen_brightness_change - Called when the application screen brightness changes.
on_system_screen_brightness_change - Called when the system screen brightness changes.
Methods
can_change_system_screen_brightness - Returns whether the app is allowed to change the system screen brightness.
get_application_screen_brightness - Returns the current application screen brightness, in range 0.0..1.0.
get_system_screen_brightness - Returns the current system screen brightness, in range 0.0..1.0.
is_animate - Returns True if brightness changes are animated (platform dependent).
is_auto_reset - Returns True if brightness resets automatically on lifecycle changes.
reset_application_screen_brightness - Resets the application screen brightness back to the system value.
set_animate - Enables or disables animation for brightness changes.
set_application_screen_brightness - Sets the application screen brightness.
set_auto_reset - Enables or disables automatic reset to system brightness on lifecycle changes.
set_system_screen_brightness - Sets the system screen brightness.
Examples​
import flet as ft





async def main(page: ft.Page):

    sb = ft.ScreenBrightness()

    page.services.append(sb)



    info = ft.Text()

    system_change = ft.Text()

    app_change = ft.Text()



    level = ft.Slider(min=0, max=1, divisions=20, value=0.5, label="Brightness")

    animate_switch = ft.Switch(

        label="Animate application changes", value=True, on_change=None

    )

    auto_reset_switch = ft.Switch(

        label="Auto-reset application brightness on lifecycle changes",

        value=True,

        on_change=None,

    )



    async def refresh_info():

        system_brightness = await sb.get_system_screen_brightness()

        app_brightness = await sb.get_application_screen_brightness()

        can_change_system = await sb.can_change_system_screen_brightness()



        animate_switch.value = await sb.is_animate()

        auto_reset_switch.value = await sb.is_auto_reset()



        info.value = (

            f"System: {system_brightness:.2f} | "

            f"Application: {app_brightness:.2f} | "

            f"Can change system: {can_change_system}"

        )



    async def set_application_brightness(_):

        await sb.set_application_screen_brightness(level.value)

        await refresh_info()



    async def set_system_brightness(_):

        await sb.set_system_screen_brightness(level.value)

        await refresh_info()



    async def reset_application_brightness(_):

        await sb.reset_application_screen_brightness()

        await refresh_info()



    async def toggle_animate(e: ft.Event[ft.Switch]):

        await sb.set_animate(e.control.value)

        await refresh_info()



    async def toggle_auto_reset(e: ft.Event[ft.Switch]):

        await sb.set_auto_reset(e.control.value)

        await refresh_info()



    async def on_system_change(e: ft.ScreenBrightnessChangeEvent):

        system_change.value = f"System brightness changed: {e.brightness:.2f}"



    async def on_application_change(e: ft.ScreenBrightnessChangeEvent):

        app_change.value = f"Application brightness changed: {e.brightness:.2f}"



    sb.on_system_screen_brightness_change = on_system_change

    sb.on_application_screen_brightness_change = on_application_change



    await refresh_info()



    animate_switch.on_change = toggle_animate

    auto_reset_switch.on_change = toggle_auto_reset



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        [

                            info,

                            level,

                            ft.Row(

                                [

                                    ft.Button(

                                        "Set application",

                                        on_click=set_application_brightness,

                                    ),

                                    ft.Button(

                                        "Set system", on_click=set_system_brightness

                                    ),

                                    ft.TextButton(

                                        "Reset application",

                                        on_click=reset_application_brightness,

                                    ),

                                ],

                                wrap=True,

                            ),

                            animate_switch,

                            auto_reset_switch,

                            ft.Divider(),

                            system_change,

                            app_change,

                        ],

                        spacing=12,

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Events​
bolt
on_application_screen_brightness_change
class-attribute
instance-attribute
​
Copy
on_application_screen_brightness_change: (
    EventHandler[ScreenBrightnessChangeEvent] | None
) = None

Called when the application screen brightness changes.

bolt
on_system_screen_brightness_change
class-attribute
instance-attribute
​
Copy
on_system_screen_brightness_change: (
    EventHandler[ScreenBrightnessChangeEvent] | None
) = None

Called when the system screen brightness changes.

Methods​
deployed_code
can_change_system_screen_brightness
async
​
Copy
can_change_system_screen_brightness() -> bool

Returns whether the app is allowed to change the system screen brightness.

deployed_code
get_application_screen_brightness
async
​
Copy
get_application_screen_brightness() -> float

Returns the current application screen brightness, in range 0.0..1.0.

deployed_code
get_system_screen_brightness
async
​
Copy
get_system_screen_brightness() -> float

Returns the current system screen brightness, in range 0.0..1.0.

deployed_code
is_animate
async
​
Copy
is_animate() -> bool

Returns True if brightness changes are animated (platform dependent).

deployed_code
is_auto_reset
async
​
Copy
is_auto_reset() -> bool

Returns True if brightness resets automatically on lifecycle changes.

deployed_code
reset_application_screen_brightness
async
​
Copy
reset_application_screen_brightness()

Resets the application screen brightness back to the system value.

deployed_code
set_animate
async
​
Copy
set_animate(animate: bool)

Enables or disables animation for brightness changes.

deployed_code
set_application_screen_brightness
async
​
Copy
set_application_screen_brightness(brightness: Number)

Sets the application screen brightness.

deployed_code
set_auto_reset
async
​
Copy
set_auto_reset(auto_reset: bool)

Enables or disables automatic reset to system brightness on lifecycle changes.

deployed_code
set_system_screen_brightness
async
​
Copy
set_system_screen_brightness(brightness: Number)

Sets the system screen brightness.

Edit this page