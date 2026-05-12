# ShakeDetector
URL: https://flet.dev/docs/services/shakedetector

ReferenceServicesShakeDetector
ShakeDetector

Detects phone shakes.

Inherits: Service

Properties
minimum_shake_count - Number of shakes required before shake is triggered.
shake_count_reset_time_ms - Time, in milliseconds, before shake count resets.
shake_slop_time_ms - Minimum time between shakes, in milliseconds.
shake_threshold_gravity - Shake detection threshold, in Gs.
Events
on_shake - Called when a shake is detected.
Examples​
Basic Example​
import flet as ft





def main(page: ft.Page):

    page.services.append(

        ft.ShakeDetector(

            minimum_shake_count=2,

            shake_slop_time_ms=300,

            shake_count_reset_time_ms=1000,

            on_shake=lambda _: page.add(ft.Text("Shake detected!")),

        )

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[ft.Text("Shake your device!")],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
minimum_shake_count
class-attribute
instance-attribute
​
Copy
minimum_shake_count: int = 1

Number of shakes required before shake is triggered.

build
shake_count_reset_time_ms
class-attribute
instance-attribute
​
Copy
shake_count_reset_time_ms: int = 3000

Time, in milliseconds, before shake count resets.

build
shake_slop_time_ms
class-attribute
instance-attribute
​
Copy
shake_slop_time_ms: int = 500

Minimum time between shakes, in milliseconds.

build
shake_threshold_gravity
class-attribute
instance-attribute
​
Copy
shake_threshold_gravity: Number = 2.7

Shake detection threshold, in Gs.

Events​
bolt
on_shake
class-attribute
instance-attribute
​
Copy
on_shake: ControlEventHandler[ShakeDetector] | None = None

Called when a shake is detected.

Edit this page