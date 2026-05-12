# Accelerometer
URL: https://flet.dev/docs/services/accelerometer

ReferenceServicesAccelerometer
Accelerometer

Streams raw accelerometer AccelerometerReadingEvent, which describe the acceleration of the device, in m/s^2, including the effects of gravity.

Unlike UserAccelerometer, this service reports raw data from the accelerometer (physical sensor embedded in the mobile device) without any post-processing.

The accelerometer is unable to distinguish between the effect of an accelerated movement of the device and the effect of the surrounding gravitational field. This means that, at the surface of Earth, even if the device is completely still, the reading of Accelerometer is an acceleration of intensity 9.8 directed upwards (the opposite of the graviational acceleration). This can be used to infer information about the position of the device (horizontal/vertical/tilted). Accelerometer reports zero acceleration if the device is free falling.

NOTE
Supported platforms: Android, iOS and web.
Web ignores requested sampling intervals.

Inherits: Service

Properties
cancel_on_error - Whether the stream subscription should cancel on the first sensor error.
enabled - Whether the sensor should be sampled.
interval - Desired sampling interval provided as a Duration.
Events
on_error - Fired when the platform reports a sensor error (for example when the device does not expose the accelerometer).
on_reading - Fires when a new reading is available.
Examples​
import flet as ft





def main(page: ft.Page):

    def handle_reading(e: ft.AccelerometerReadingEvent):

        reading.value = f"x={e.x:.2f} m/s^2, y={e.y:.2f} m/s^2, z={e.z:.2f} m/s^2"



    def handle_error(e: ft.SensorErrorEvent):

        page.add(ft.Text(f"Accelerometer error: {e.message}"))



    page.services.append(

        ft.Accelerometer(

            on_reading=handle_reading,

            on_error=handle_error,

            interval=ft.Duration(milliseconds=100),

            cancel_on_error=False,

        )

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Move your device to see accelerometer readings."),

                    reading := ft.Text("Waiting for data..."),

                ]

            )

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

Note that mobile platforms treat this value as a suggestion and the actual rate can differ depending on hardware and OS limitations.

Events​
bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: EventHandler[SensorErrorEvent] | None = None

Fired when the platform reports a sensor error (for example when the device does not expose the accelerometer). event.message contains the error text.

bolt
on_reading
class-attribute
instance-attribute
​
Copy
on_reading: (
    EventHandler[AccelerometerReadingEvent] | None
) = None

Fires when a new reading is available.

event exposes x, y, z acceleration values and timestamp (microseconds since epoch).

Edit this page