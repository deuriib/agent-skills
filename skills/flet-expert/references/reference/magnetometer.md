# Magnetometer
URL: https://flet.dev/docs/services/magnetometer

ReferenceServicesMagnetometer
Magnetometer

Streams magnetometer MagnetometerReadingEvent reporting the ambient magnetic field (uT) per axis for compass-style use cases.

NOTE
Supported platforms: Android, iOS.
Magnetometer APIs are not available on web. or desktop, so always handle on_error to detect unsupported hardware.

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

    def handle_reading(e: ft.MagnetometerReadingEvent):

        reading.value = f"x={e.x:.2f} uT, y={e.y:.2f} uT, z={e.z:.2f} uT"



    def handle_error(e: ft.SensorErrorEvent):

        page.add(ft.Text(f"Magnetometer error: {e.message}"))



    page.services.append(

        ft.Magnetometer(

            on_reading=handle_reading,

            on_error=handle_error,

            interval=ft.Duration(milliseconds=200),

        )

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Monitor the ambient magnetic field (uT)."),

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
on_reading: (
    EventHandler[MagnetometerReadingEvent] | None
) = None

Fires when a new reading is available.

event contains x, y, z magnetic field strengths (uT) and timestamp (microseconds since epoch).

Edit this page