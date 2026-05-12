# Rive
URL: https://flet.dev/docs/controls/rive/

ReferenceControlsRive
Rive

Render Rive animations in your Flet app with the flet-rive extension.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅ (x64 only)	✅	✅	✅
Usage​

Add flet-rive to your project dependencies:

uv
pip
uv add flet-rive

HOSTING RIVE FILES

Host .riv files locally or load them from a CDN. Use placeholder to keep layouts responsive while animations load.

Example​
import flet as ft

import flet_rive as ftr





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ftr.Rive(

                        src="https://cdn.rive.app/animations/vehicles.riv",

                        placeholder=ft.ProgressBar(),

                        width=300,

                        height=200,

                    ),

                    ftr.Rive(

                        src="vehicles.riv",

                        placeholder=ft.ProgressBar(),

                        width=300,

                        height=200,

                    ),

                ],

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

Displays rive animations.

Inherits: LayoutControl

Properties
alignment - Alignment for the animation in the Rive control.
animations - List of animations to play; default animation is played if empty.
artboard - The name of the artboard to use.
clip_rect - Clip the artboard to this rect.
enable_antialiasing - Whether to enable anti-aliasing when rendering.
fit - The animation's fit.
headers - Headers for network requests.
placeholder - Control displayed while the Rive is loading.
speed_multiplier - A multiplier for controlling the speed of the Rive animation playback.
src - The source of your rive animation.
state_machines - List of state machines to play; none will play if empty.
use_artboard_size - Determines whether to use the inherent size of the artboard, i.e.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = None

Alignment for the animation in the Rive control.

build
animations
class-attribute
instance-attribute
​
Copy
animations: list[str] = field(default_factory=list)

List of animations to play; default animation is played if empty.

build
artboard
class-attribute
instance-attribute
​
Copy
artboard: str | None = None

The name of the artboard to use. If not specified, the default artboard of the provided src is used.

build
clip_rect
class-attribute
instance-attribute
​
Copy
clip_rect: Rect | None = None

Clip the artboard to this rect.

If not supplied it'll default to the constraint size provided by the parent control. Unless the Artboard has clipping disabled, then no clip will be applied.

build
enable_antialiasing
class-attribute
instance-attribute
​
Copy
enable_antialiasing: bool = True

Whether to enable anti-aliasing when rendering.

build
fit
class-attribute
instance-attribute
​
Copy
fit: BoxFit | None = None

The animation's fit.

build
headers
class-attribute
instance-attribute
​
Copy
headers: dict[str, str] | None = None

Headers for network requests.

build
placeholder
class-attribute
instance-attribute
​
Copy
placeholder: Control | None = None

Control displayed while the Rive is loading.

build
speed_multiplier
class-attribute
instance-attribute
​
Copy
speed_multiplier: Number = 1.0

A multiplier for controlling the speed of the Rive animation playback.

build
src
instance-attribute
​
Copy
src: str

The source of your rive animation.

Can either be a URL or a path to a local asset file.

build
state_machines
class-attribute
instance-attribute
​
Copy
state_machines: list[str] = field(default_factory=list)

List of state machines to play; none will play if empty.

build
use_artboard_size
class-attribute
instance-attribute
​
Copy
use_artboard_size: bool = False

Determines whether to use the inherent size of the artboard, i.e. the absolute size defined by the artboard, or size the control based on the available constraints only (sized by parent).

Edit this page