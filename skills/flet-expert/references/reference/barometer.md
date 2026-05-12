# Barometer
URL: https://flet.dev/docs/services/barometer

ReferenceServicesBarometer
Barometer

Streams barometer BarometerReadingEvent samples (atmospheric pressure in hPa). Useful for altitude calculations and weather-related experiences.

NOTE
Supported platforms: Android, iOS.
Barometer APIs are not exposed on the web or desktop platforms.
iOS ignores custom sampling intervals.

On iOS you must also include a key called NSMotionUsageDescription in your app's Info.plist file. This key provides a message that tells the user why the app is requesting access to the device's motion data. Barometer service needs access to motion data to get barometer data.

For example, add the following to your pyproject.toml file:

[tool.flet.ios.info]

NSMotionUsageDescription = "This app requires access to the barometer to provide altitude information."


Adding NSMotionUsageDescription is a requirement and not doing so will crash your app when it attempts to access motion data.

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

    def handle_reading(e: ft.BarometerReadingEvent):

        reading.value = f"{e.pressure:.2f} hPa"



    def handle_error(e: ft.SensorErrorEvent):

        page.add(ft.Text(f"Barometer error: {e.message}"))



    page.services.append(

        ft.Barometer(

            on_reading=handle_reading,

            on_error=handle_error,

            interval=ft.Duration(milliseconds=500),

        )

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text("Atmospheric pressure (hPa)."),

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

Desired sampling interval provided as a Duration. Defaults to 200 ms, though some platforms (such as iOS) ignore custom sampling intervals.

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
on_reading: EventHandler[BarometerReadingEvent] | None = (
    None
)

Fires when a new reading is available.

event contains pressure (hPa) and timestamp (microseconds since epoch).

Edit this page