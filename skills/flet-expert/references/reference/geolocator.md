# Geolocator
URL: https://flet.dev/docs/services/geolocator/

ReferenceServicesGeolocator
Geolocator

Access device location services in your Flet app using the flet-geolocator extension. The control wraps Flutter's geolocator package and exposes async helpers for permission checks and position streams.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

Add flet-geolocator to your project dependencies:

uv
pip
uv add flet-geolocator

Requirements​

The below sections show the required configurations for each platform.

Android​

Configuration to be made to access the device's location:

ACCESS_FINE_LOCATION: Allows access precise location. Will be preferred over ACCESS_COARSE_LOCATION, if both are set.
ACCESS_COARSE_LOCATION: Allows access approximate location.
ACCESS_BACKGROUND_LOCATION (optional): Allows access to location even when the app is in the background. Effective as from Android 10 (API level 29).
FOREGROUND_SERVICE_LOCATION (optional): Allows access to location even when the app is in the foreground. Effective as from Android 14 (API level 34).
NOTE
At least one of ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION permission is required to get location updates, with the former being preferred if both are set.
Specifying the ACCESS_COARSE_LOCATION permission results in location updates with accuracy approximately equivalent to a city block. It might take a long time (minutes) before you will get your first locations fix as ACCESS_COARSE_LOCATION will only use the network services to calculate the position of the device. More information here.
flet build
pyproject.toml
flet build apk \

  --android-permissions android.permission.ACCESS_FINE_LOCATION=true \

  --android-permissions android.permission.ACCESS_COARSE_LOCATION=true \

  --android-permissions android.permission.ACCESS_BACKGROUND_LOCATION=true \

  --android-permissions android.permission.FOREGROUND_SERVICE_LOCATION=true


See also:

setting Android permissions
iOS​

Configuration to be made to access the device's location:

flet build
pyproject.toml
flet build ipa \

  --info-plist NSLocationWhenInUseUsageDescription="Some message to describe why you need this permission..."


See also:

setting iOS Info.plist entries
macOS​

Configuration to be made to access the device's location:

flet build
pyproject.toml
flet build macos \

  --info-plist NSLocationUsageDescription="Some message to describe why you need this permission..." \

  --macos-entitlements com.apple.security.personal-information.location=true


See also:

macOS permissions
macOS entitlements
Cross-platform​

Additionally/alternatively, you can make use of our predefined cross-platform location permission bundle:

flet build
pyproject.toml
flet build <target_platform> --permissions location

Web: cached vs. fresh positions​

On the web, Geolocator.get_current_position accepts a position from the browser's cache up to 5 minutes old by default, otherwise it asks the browser for a fresh fix and times out after 30 seconds if none arrives. This default exists because desktop browsers' on-demand location pipeline is slow and frequently fails on stationary devices.

If you need stricter freshness (or a longer cache window), pass a GeolocatorWebConfiguration with an explicit maximum_age and/or time_limit:

geo = ftg.Geolocator(

    configuration=ftg.GeolocatorWebConfiguration(

        accuracy=ftg.GeolocatorPositionAccuracy.HIGH,

        maximum_age=ft.Duration(seconds=10),

        time_limit=ft.Duration(seconds=15),

    ),

)

Troubleshooting​
macOS: web browser returns POSITION_UNAVAILABLE or never resolves​

When running a Flet app in --web mode on macOS, the browser may fail to obtain a position even though Location Services is on and the browser is allowed in System Settings → Privacy & Security → Location Services. Symptoms include:

getCurrentPosition hanging or returning a Location request timed out. error.
The position stream emitting Failed to obtain position: Position update is unavailable (this is the W3C POSITION_UNAVAILABLE / error code 2 from the browser).

This is a known issue with macOS' locationd daemon getting into a stuck state where it reports the browser as authorized but never delivers a fix. Restart it:

sudo killall locationd


The daemon respawns automatically. You can verify the browser side independently by visiting browserleaks.com/geo — if that page also fails to obtain a position, the problem is with the OS, not your Flet app.

The native (non-web) macOS Flet app is unaffected because it uses CoreLocation directly through the platform plugin rather than going through the browser's Geolocation API.

Example​
from typing import Callable



import flet as ft

import flet_geolocator as ftg





async def main(page: ft.Page):

    page.scroll = ft.ScrollMode.ADAPTIVE

    page.appbar = ft.AppBar(title=ft.Text("Geolocator Tests"))



    def handle_position_change(e: ftg.GeolocatorPositionChangeEvent):

        page.add(ft.Text(f"New position: {e.position.latitude} {e.position.longitude}"))



    def get_dialog(handler: Callable):

        return ft.AlertDialog(

            adaptive=True,

            title="Opening Location Settings...",

            content=ft.Text(

                "You are about to be redirected to the location/app settings. "

                "Please locate this app and grant it location permissions."

            ),

            actions=[ft.TextButton("Take me there", on_click=handler)],

            actions_alignment=ft.MainAxisAlignment.CENTER,

        )



    def show_snackbar(message):

        page.show_dialog(ft.SnackBar(ft.Text(message)))



    async def handle_permission_request(e: ft.Event[ft.OutlinedButton]):

        try:

            p = await geo.request_permission()

            page.add(ft.Text(f"request_permission: {p}"))

            show_snackbar(f"Permission request sent: {p}")

        except RuntimeError as ex:

            show_snackbar(f"Could not request permission: {ex}")



    async def handle_get_permission_status(e: ft.Event[ft.OutlinedButton]):

        try:

            p = await geo.get_permission_status()

            show_snackbar(f"Permission status: {p}")

        except RuntimeError as ex:

            show_snackbar(f"Could not read permission status: {ex}")



    async def handle_get_current_position(e: ft.Event[ft.OutlinedButton]):

        try:

            p = await geo.get_current_position()

            show_snackbar(f"Current position: ({p.latitude}, {p.longitude})")

            print(f"Current position: ({p.latitude}, {p.longitude})")

        except RuntimeError as ex:

            show_snackbar(f"Could not get current position: {ex}")

            print(f"Could not get current position: {ex}")



    async def handle_get_last_known_position(e):

        try:

            p = await geo.get_last_known_position()

            if p is None:

                show_snackbar("No last known position available.")

            else:

                show_snackbar(f"Last known position: ({p.latitude}, {p.longitude})")

                print(f"Last known position: ({p.latitude}, {p.longitude})")

        except RuntimeError as ex:

            show_snackbar(f"Could not get last known position: {ex}")



    async def handle_location_service_enabled(e):

        try:

            p = await geo.is_location_service_enabled()

            show_snackbar(f"Location service enabled: {p}")

        except RuntimeError as ex:

            show_snackbar(f"Could not check location service: {ex}")



    async def handle_open_location_settings(e: ft.Event[ft.OutlinedButton]):

        try:

            p = await geo.open_location_settings()

            page.pop_dialog()

            if p is True:

                show_snackbar("Location settings opened successfully.")

            else:

                show_snackbar("Location settings could not be opened.")

        except RuntimeError as ex:

            page.pop_dialog()

            show_snackbar(f"Could not open location settings: {ex}")



    async def handle_open_app_settings(e: ft.Event[ft.OutlinedButton]):

        try:

            p = await geo.open_app_settings()

            page.pop_dialog()

            if p:

                show_snackbar("App settings opened successfully.")

            else:

                show_snackbar("App settings could not be opened.")

        except RuntimeError as ex:

            page.pop_dialog()

            show_snackbar(f"Could not open app settings: {ex}")



    location_settings_dlg = get_dialog(handle_open_location_settings)

    app_settings_dlg = get_dialog(handle_open_app_settings)



    geo = ftg.Geolocator(

        configuration=ftg.GeolocatorConfiguration(

            accuracy=ftg.GeolocatorPositionAccuracy.LOW

        ),

        on_position_change=handle_position_change,

        on_error=lambda e: page.add(ft.Text(f"Error: {e.data}")),

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Row(

                        wrap=True,

                        controls=[

                            ft.OutlinedButton(

                                content="Request Permission",

                                on_click=handle_permission_request,

                            ),

                            ft.OutlinedButton(

                                content="Get Permission Status",

                                on_click=handle_get_permission_status,

                            ),

                            ft.OutlinedButton(

                                content="Get Current Position",

                                on_click=handle_get_current_position,

                            ),

                            ft.OutlinedButton(

                                content="Get Last Known Position",

                                visible=not page.web,

                                on_click=handle_get_last_known_position,

                            ),

                            ft.OutlinedButton(

                                content="Is Location Service Enabled",

                                on_click=handle_location_service_enabled,

                            ),

                            ft.OutlinedButton(

                                content="Open Location Settings",

                                visible=not page.web,  # (1)!

                                on_click=lambda e: page.show_dialog(

                                    location_settings_dlg

                                ),

                            ),

                            ft.OutlinedButton(

                                content="Open App Settings",

                                visible=not page.web,  # (1)!

                                on_click=lambda e: page.show_dialog(app_settings_dlg),

                            ),

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

A control that allows you to fetch GPS data from your device.

Inherits: Service

Properties
configuration - Some additional configuration.
position - The current position of the device.
Events
on_error - Fires when an error occurs.
on_position_change - Fires when the position of the device changes.
Methods
distance_between - Calculates the distance between the supplied coordinates in meters.
get_current_position - Gets the current position of the device with the desired accuracy and settings.
get_last_known_position - Gets the last known position stored on the user's device.
get_permission_status - Gets which permission the app has been granted to access the device's location.
is_location_service_enabled - Checks if location service is enabled.
open_app_settings - Attempts to open the app's settings.
open_location_settings - Attempts to open the device's location settings.
request_permission - Requests the device for access to the device's location.
Properties​
build
configuration
class-attribute
instance-attribute
​
Copy
configuration: GeolocatorConfiguration | None = None

Some additional configuration.

build
position
class-attribute
instance-attribute
​
Copy
position: GeolocatorPosition | None = field(
    default=None, init=False
)

The current position of the device. (read-only)

Starts as None and will be updated when the position changes.

Events​
bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ControlEventHandler[Geolocator] | None = None

Fires when an error occurs.

The data property of the event handler argument contains information on the error.

bolt
on_position_change
class-attribute
instance-attribute
​
Copy
on_position_change: (
    EventHandler[GeolocatorPositionChangeEvent] | None
) = None

Fires when the position of the device changes.

Methods​
deployed_code
distance_between
async
​
Copy
distance_between(
    start_latitude: Number,
    start_longitude: Number,
    end_latitude: Number,
    end_longitude: Number,
) -> Number

Calculates the distance between the supplied coordinates in meters.

The distance between the coordinates is calculated using the Haversine formula (see https://en.wikipedia.org/wiki/Haversine_formula).

Parameters:

start_latitude (Number) - The latitude of the starting point, in degrees.
start_longitude (Number) - The longitude of the starting point, in degrees.
end_latitude (Number) - The latitude of the ending point, in degrees.
end_longitude (Number) - The longitude of the ending point, in degrees.

Returns:

Number - The distance between the coordinates in meters.
deployed_code
get_current_position
async
​
Copy
get_current_position(
    configuration: GeolocatorConfiguration | None = None,
) -> GeolocatorPosition

Gets the current position of the device with the desired accuracy and settings.

NOTE

Depending on the availability of different location services, this can take several seconds. It is recommended to call the get_last_known_position method first to receive a known/cached position and update it with the result of the get_current_position method.

Parameters:

configuration (GeolocatorConfiguration | None, default: None) - Additional configuration for the location request. If not specified, then the Geolocator.configuration property is used.

Returns:

GeolocatorPosition - The current position of the device as a GeolocatorPosition.
deployed_code
get_last_known_position
async
​
Copy
get_last_known_position() -> GeolocatorPosition | None

Gets the last known position stored on the user's device. The accuracy can be defined using the configuration property.

Returns:

GeolocatorPosition | None - The last known position of the device as a GeolocatorPosition,
GeolocatorPosition | None - or None if no last known position is available.

Raises:

FletUnsupportedPlatformException - If invoked on a web platform.
deployed_code
get_permission_status
async
​
Copy
get_permission_status() -> GeolocatorPermissionStatus

Gets which permission the app has been granted to access the device's location.

Returns:

GeolocatorPermissionStatus - The status of the permission.
deployed_code
is_location_service_enabled
async
​
Copy
is_location_service_enabled() -> bool

Checks if location service is enabled.

Returns:

bool - True if location service is enabled, False otherwise.
deployed_code
open_app_settings
async
​
Copy
open_app_settings() -> bool

Attempts to open the app's settings.

Returns:

bool - True if the app's settings were opened successfully, False otherwise.

Raises:

FletUnsupportedPlatformException - If invoked on a web platform.
deployed_code
open_location_settings
async
​
Copy
open_location_settings() -> bool

Attempts to open the device's location settings.

Returns:

bool - True if the device's settings were opened successfully, False otherwise.

Raises:

FletUnsupportedPlatformException - If invoked on a web platform.
deployed_code
request_permission
async
​
Copy
request_permission() -> GeolocatorPermissionStatus

Requests the device for access to the device's location.

Returns:

GeolocatorPermissionStatus - The status of the permission request.
Edit this page