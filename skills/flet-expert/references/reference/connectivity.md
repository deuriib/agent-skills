# Connectivity
URL: https://flet.dev/docs/services/connectivity

ReferenceServicesConnectivity
Connectivity

Provides device connectivity status and change notifications.

Inherits: Service

Events
on_change - Called when connectivity changes.
Methods
get_connectivity - Returns the current connectivity type(s).
Examples​
import flet as ft





async def main(page: ft.Page):

    connectivity = ft.Connectivity()



    status = ft.Text()

    changes = ft.Text()



    async def refresh(_=None):

        results = await connectivity.get_connectivity()

        status.value = "Current connectivity: " + ", ".join(r.value for r in results)



    async def on_change(e: ft.ConnectivityChangeEvent):

        changes.value = "Connectivity changed: " + ", ".join(

            r.value for r in e.connectivity

        )

        await refresh()



    connectivity.on_change = on_change



    await refresh()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        [

                            status,

                            ft.Button("Refresh connectivity", on_click=refresh),

                            changes,

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: EventHandler[ConnectivityChangeEvent] | None = (
    None
)

Called when connectivity changes.

Methods​
deployed_code
get_connectivity
async
​
Copy
get_connectivity() -> list[ConnectivityType]

Returns the current connectivity type(s).

Edit this page