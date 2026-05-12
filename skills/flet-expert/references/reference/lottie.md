# Lottie
URL: https://flet.dev/docs/controls/lottie/

ReferenceControlsLottie
Lottie

Render rich Lottie animations inside your Flet apps with a simple control.

It is backed by the lottie Flutter package.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

Add the flet-lottie package to your project dependencies:

uv
pip
uv add flet-lottie

Example​
import flet as ft

import flet_lottie as ftl





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ftl.Lottie(

                        src="https://raw.githubusercontent.com/xvrh/lottie-flutter/master/example/assets/Mobilo/A.json",

                        reverse=False,

                        animate=True,

                        error_content=ft.Placeholder(ft.Text("Error loading Lottie")),

                        on_error=lambda e: print(f"Error loading Lottie: {e.data}"),

                    ),

                    ftl.Lottie(

                        src="sample.json",

                        reverse=False,

                        animate=True,

                        enable_merge_paths=True,

                        enable_layers_opacity=True,

                        error_content=ft.Placeholder(ft.Text("Error loading Lottie")),

                        on_error=lambda e: print(f"Error loading Lottie: {e.data}"),

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Description​

Displays lottie animations.

NOTE
Layer effects are currently not supported. See airbnb/lottie-android#1964 and xvrh/lottie-flutter#189 for details.

Inherits: LayoutControl

Properties
animate - Whether the animation should be played automatically.
background_loading - Whether the animation should be loaded in the background.
enable_layers_opacity - Whether to enable layer-level opacity.
enable_merge_paths - Whether to enable merge path support.
error_content - A control to display when an error occurs while loading the Lottie animation.
filter_quality - The quality of the image layer.
fit - Defines how to inscribe the Lottie composition into the space allocated during layout.
headers - Headers for network requests.
repeat - Whether the animation should repeat in a loop.
reverse - Whether the animation should be played in reverse (from start to end and then continuously from end to start).
src - The lottie animation source.
Events
on_error - Fires when an error occurs while loading the Lottie animation.
Properties​
build
animate
class-attribute
instance-attribute
​
Copy
animate: bool = True

Whether the animation should be played automatically.

build
background_loading
class-attribute
instance-attribute
​
Copy
background_loading: bool | None = None

Whether the animation should be loaded in the background.

build
enable_layers_opacity
class-attribute
instance-attribute
​
Copy
enable_layers_opacity: bool = False

Whether to enable layer-level opacity.

build
enable_merge_paths
class-attribute
instance-attribute
​
Copy
enable_merge_paths: bool = False

Whether to enable merge path support.

build
error_content
class-attribute
instance-attribute
​
Copy
error_content: Control | None = None

A control to display when an error occurs while loading the Lottie animation.

For more information on the error, see on_error.

build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality = FilterQuality.LOW

The quality of the image layer.

build
fit
class-attribute
instance-attribute
​
Copy
fit: BoxFit | None = None

Defines how to inscribe the Lottie composition into the space allocated during layout.

build
headers
class-attribute
instance-attribute
​
Copy
headers: dict[str, str] | None = None

Headers for network requests.

build
repeat
class-attribute
instance-attribute
​
Copy
repeat: bool = True

Whether the animation should repeat in a loop.

NOTE

Has no effect if animate is False.

build
reverse
class-attribute
instance-attribute
​
Copy
reverse: bool = False

Whether the animation should be played in reverse (from start to end and then continuously from end to start).

NOTE

Has no effect if animate or repeat is False.

build
src
instance-attribute
​
Copy
src: str | bytes

The lottie animation source.

It can be one of the following:

A URL or local asset file path;
A base64 string;
Raw bytes.
Events​
bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ControlEventHandler[Lottie] | None = None

Fires when an error occurs while loading the Lottie animation.

The data property of the event handler argument contains information on the error.

Edit this page