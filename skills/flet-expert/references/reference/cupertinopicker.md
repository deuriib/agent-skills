# CupertinoPicker
URL: https://flet.dev/docs/controls/cupertinopicker

ReferenceControlsCupertinoPicker
CupertinoPicker

An iOS-styled picker.

Inherits: LayoutControl

Properties
bgcolor - The background color of this timer picker.
controls - A list of controls representing items in this picker.
default_selection_overlay_bgcolor - The default background color of the selection_overlay.
diameter_ratio - Relative ratio between this picker's height and the simulated cylinder's diameter.
item_extent - The uniform height of all controls.
looping - If True, children on a wheel can be scrolled in a loop.
magnification - The zoomed-in or magnification rate of the magnifier.
off_axis_fraction - How much the wheel is horizontally off-center, as a fraction of its width.
selected_index - The index (starting from 0) of the selected item in the controls list.
selection_overlay - A control overlaid on the picker to highlight the selected entry, centered and matching the height of the center row.
squeeze - The angular compactness of the children on the wheel.
use_magnifier - Whether to use the magnifier for the center item of this picker's wheel.
Events
on_change - Called when the selection changes.
Examples​

Live example

Fruit selection​
import flet as ft



FRUITS = [

    "Apple",

    "Mango",

    "Banana",

    "Orange",

    "Pineapple",

    "Strawberry",

]





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    selected_fruit_text = ft.Text(value=FRUITS[3], size=23)



    def handle_selection_change(e: ft.Event[ft.CupertinoPicker]):

        selected_fruit_text.value = FRUITS[int(e.data)]



    cupertino_picker = ft.CupertinoPicker(

        selected_index=3,

        magnification=1.22,

        squeeze=1.2,

        use_magnifier=True,

        on_change=handle_selection_change,

        controls=[ft.Text(value=f) for f in FRUITS],

    )



    page.add(

        ft.SafeArea(

            content=ft.Row(

                tight=True,

                controls=[

                    ft.Text("Selected Fruit:", size=23),

                    ft.TextButton(

                        style=ft.ButtonStyle(color=ft.Colors.BLUE),

                        on_click=lambda _: page.show_dialog(

                            ft.CupertinoBottomSheet(

                                height=216,

                                padding=ft.Padding.only(top=6),

                                content=cupertino_picker,

                            )

                        ),

                        content=selected_fruit_text,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this timer picker.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[Control] = field(default_factory=list)

A list of controls representing items in this picker.

build
default_selection_overlay_bgcolor
class-attribute
instance-attribute
​
Copy
default_selection_overlay_bgcolor: ColorValue = (
    CupertinoColors.TERTIARY_SYSTEM_FILL
)

The default background color of the selection_overlay.

build
diameter_ratio
class-attribute
instance-attribute
​
Copy
diameter_ratio: Number = 1.07

Relative ratio between this picker's height and the simulated cylinder's diameter.

Smaller values create more pronounced curvatures in the scrollable wheel.

build
item_extent
class-attribute
instance-attribute
​
Copy
item_extent: Number = 32.0

The uniform height of all controls.

Raises:

ValueError - If it is not strictly greater than 0.0.
build
looping
class-attribute
instance-attribute
​
Copy
looping: bool = False

If True, children on a wheel can be scrolled in a loop.

build
magnification
class-attribute
instance-attribute
​
Copy
magnification: Number = 1.0

The zoomed-in or magnification rate of the magnifier.

If the value is greater than 1.0, the item in the center will be zoomed in by that rate, and it will also be rendered as flat, not cylindrical like the rest of the list. The item will be zoomed-out if magnification is less than 1.0.

NOTE

Has effect only if use_magnifier is True.

Raises:

ValueError - If it is not strictly greater than 0.0.
build
off_axis_fraction
class-attribute
instance-attribute
​
Copy
off_axis_fraction: Number = 0.0

How much the wheel is horizontally off-center, as a fraction of its width.

build
selected_index
class-attribute
instance-attribute
​
Copy
selected_index: int = 0

The index (starting from 0) of the selected item in the controls list.

build
selection_overlay
class-attribute
instance-attribute
​
Copy
selection_overlay: Control | None = None

A control overlaid on the picker to highlight the selected entry, centered and matching the height of the center row.

Defaults to a rounded rectangle in iOS 14 style with default_selection_overlay_bgcolor as background color.

build
squeeze
class-attribute
instance-attribute
​
Copy
squeeze: Number = 1.45

The angular compactness of the children on the wheel.

Raises:

ValueError - If it is not strictly greater than 0.0.
build
use_magnifier
class-attribute
instance-attribute
​
Copy
use_magnifier: bool = False

Whether to use the magnifier for the center item of this picker's wheel.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[CupertinoPicker] | None = (
    None
)

Called when the selection changes.

Edit this page