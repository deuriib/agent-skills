# SemanticsService
URL: https://flet.dev/docs/services/semanticsservice

ReferenceServicesSemanticsService
SemanticsService

Allows access to the platform's accessibility services.

Inherits: Service

Methods
announce_message - Sends a semantic announcement with the given message.
announce_tooltip - Sends a semantic announcement of a tooltip.
get_accessibility_features - Returns the current platform accessibility feature flags.
Examples​
Retrieve accessibility features​
import flet as ft





async def main(page: ft.Page):

    page.title = "SemanticsService - Accessibility features"

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER



    async def get_features() -> str:

        features = await ft.SemanticsService().get_accessibility_features()

        return "\n".join(

            [

                f"Accessible navigation: {features.accessible_navigation}",

                f"Bold text: {features.bold_text}",

                f"Disable animations: {features.disable_animations}",

                f"High contrast: {features.high_contrast}",

                f"Invert colors: {features.invert_colors}",

                f"Reduce motion: {features.reduce_motion}",

                f"On/off switch labels: {features.on_off_switch_labels}",

                f"Supports announcements: {features.supports_announcements}",

            ]

        )



    async def refresh_features(e: ft.Event[ft.Button]):

        info.value = await get_features()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    info := ft.Text(await get_features()),

                    ft.Button("Refresh features", on_click=refresh_features),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
announce_message
async
​
Copy
announce_message(
    message: str,
    rtl: bool = False,
    assertiveness: Assertiveness = Assertiveness.POLITE,
)

Sends a semantic announcement with the given message.

Parameters:

message (str) - The message to be announced.
rtl (bool, default: False) - Indicates if the message text direction is right-to-left.
assertiveness (Assertiveness, default: Assertiveness.POLITE) - The assertiveness level of the announcement. Only supported on web.
NOTES

This method should be used for announcements that are not automatically handled by the system as a result of a UI state change.

deployed_code
announce_tooltip
async
​
Copy
announce_tooltip(message: str)

Sends a semantic announcement of a tooltip.

NOTE

Only supported on Android.

deployed_code
get_accessibility_features
async
​
Copy
get_accessibility_features() -> AccessibilityFeatures

Returns the current platform accessibility feature flags.

Returns:

AccessibilityFeatures - A snapshot of the platform's accessibility preferences at the time of invocation.
Edit this page