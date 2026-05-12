# Screenshot
URL: https://flet.dev/docs/controls/screenshot

ReferenceControlsScreenshot
Screenshot

Takes a screenshot of containing control.

Inherits: Control

Properties
content - The control to be captured.
Methods
capture - Captures a screenshot of the enclosed content control.
Examples​
Taking control screenshot​
from pathlib import Path



import flet as ft

from flet.utils.files import get_current_script_dir





def main(page: ft.Page):

    async def take_screenshot(e: ft.Event[ft.Button]):

        image = await scr.capture()

        with open(Path(get_current_script_dir(), "screenshot.png"), "wb") as f:

            f.write(image)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    scr := ft.Screenshot(

                        content=ft.Container(

                            padding=10,

                            content=ft.Button(

                                "Hello, world!",

                                bgcolor=ft.Colors.BLUE,

                                elevation=10,

                            ),

                        )

                    ),

                    ft.Button("Take screenshot", on_click=take_screenshot),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
content
instance-attribute
​
Copy
content: Control

The control to be captured.

Methods​
deployed_code
capture
async
​
Copy
capture(
    pixel_ratio: Number | None = None,
    delay: DurationValue | None = None,
) -> bytes

Captures a screenshot of the enclosed content control.

Parameters:

pixel_ratio (Number | None, default: None) - A pixel ratio of the captured screenshot. If None, device-specific pixel ratio will be used.
delay (DurationValue | None, default: None) - A delay before taking a screenshot. The delay will be 20 milliseconds if not specified.

Returns:

bytes - Screenshot in PNG format.
Edit this page