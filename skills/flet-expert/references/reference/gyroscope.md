# Gyroscope
URL: https://flet.dev/docs/services/gyroscope

ReferenceServicesGyroscope
Gyroscope

Streams gyroscope GyroscopeReadingEvent, reporting device rotation rate around each axis in rad/s.

NOTE
Supported platforms: Android, iOS and web.
Web ignores requested sampling intervals.

Inherits: Service

Properties
cancel_on_error - Whether the stream subscription should cancel on the first sensor error.
enabled - Whether the sensor should be sampled.
interval - Desired sampling interval provided as a Duration.
Events
on_error - Fired when the platform reports a sensor error.
on_reading - Fires when a new reading is available.
Examples​
import flet as ft





def main(page: ft.Page):

    def handle_reading(e: ft.GyroscopeReadingEvent):

        reading.value = f"x={e.x:.2f} rad/s, y={e.y:.2f} rad/s, z={e.z:.2f} rad/s"



    def handle_error(e: ft.SensorErrorEvent):

        page.add(ft.Text(f"Gyroscope error: {e.message}"))



    page.services.append(

        ft.Gyroscope(

            on_reading=handle_reading,

            on_error=handle_error,

            interval=ft.Duration(milliseconds=100),

        )

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Rotate your device to see gyroscope readings."),

                    reading := ft.Text("Waiting for data..."),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
cancel_on_error
class-attribute
instance-attribute
​
Copy
cancel_on_error: bool = True

Whether the stream subscription should cancel on the first sensor error.

build
enabled
class-attribute
instance-attribute
​
Copy
enabled: bool = True

Whether the sensor should be sampled. Disable to stop streaming.

build
interval
class-attribute
instance-attribute
​
Copy
interval: Duration | None = None

Desired sampling interval provided as a Duration. Defaults to 200 ms.

Events​
bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: EventHandler[SensorErrorEvent] | None = None

Fired when the platform reports a sensor error. event.message is the error description.

bolt
on_reading
class-attribute
instance-attribute
​
Copy
on_reading: EventHandler[GyroscopeReadingEvent] | None = (
    None
)

Fires when a new reading is available.

event contains x, y, z rotation rates and timestamp (microseconds since epoch).

Edit this page