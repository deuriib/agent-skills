# Battery
URL: https://flet.dev/docs/services/battery

ReferenceServicesBattery
Battery

Provides access to device battery information and state changes.

Inherits: Service

Events
on_state_change - Called when battery state changes (charging, discharging, full, unknown).
Methods
get_battery_level - Gets the current battery level as a percentage, in the range 0 to 100.
get_battery_state - Returns current battery state.
is_in_battery_save_mode - Returns True if the device is currently in battery save mode.
Examples​
import flet as ft





async def main(page: ft.Page):

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    async def refresh_info(e: ft.Event[ft.Button] = None):

        level = await battery.get_battery_level()

        state = await battery.get_battery_state()

        save_mode = await battery.is_in_battery_save_mode()

        info.value = (

            f"Battery level: {level}% \n"

            f"Battery state: {state.name} \n"

            f"Battery saver: {'ON' if save_mode else 'OFF'}"

        )



    async def on_state_change(e: ft.BatteryStateChangeEvent):

        print(f"State changed: {e.state}")

        await refresh_info()



    battery = ft.Battery(on_state_change=on_state_change)

    page.services.append(battery)  # need to keep a reference to the service



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    info := ft.Text(),

                    ft.Button("Refresh battery info", on_click=refresh_info),

                ],

            )

        )

    )

    await refresh_info()





if __name__ == "__main__":

    ft.run(main)

Events​
bolt
on_state_change
class-attribute
instance-attribute
​
Copy
on_state_change: (
    EventHandler[BatteryStateChangeEvent] | None
) = None

Called when battery state changes (charging, discharging, full, unknown).

Methods​
deployed_code
get_battery_level
async
​
Copy
get_battery_level() -> int | None

Gets the current battery level as a percentage, in the range 0 to 100.

Returns:

int | None - The battery level, or None when it is unavailable on the current
int | None - environment.
deployed_code
get_battery_state
async
​
Copy
get_battery_state() -> BatteryState

Returns current battery state.

deployed_code
is_in_battery_save_mode
async
​
Copy
is_in_battery_save_mode() -> bool

Returns True if the device is currently in battery save mode.

Edit this page