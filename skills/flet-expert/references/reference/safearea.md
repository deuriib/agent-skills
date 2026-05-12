# SafeArea
URL: https://flet.dev/docs/controls/safearea

ReferenceControlsSafeArea
SafeArea

A control that insets its content by sufficient padding to avoid intrusions by the operating system.

For example, this will indent the content by enough to avoid the status bar at the top of the screen.

It will also indent the content by the amount necessary to avoid the Notch on the iPhone X, or other similar creative physical features of the display.

When a minimum_padding is specified, the greater of the minimum padding or the safe area padding will be applied.

Inherits: LayoutControl, AdaptiveControl

Properties
avoid_intrusions_bottom - Whether to avoid system intrusions on the bottom side of the screen.
avoid_intrusions_left - Whether to avoid system intrusions on the left.
avoid_intrusions_right - Whether to avoid system intrusions on the right.
avoid_intrusions_top - Whether to avoid system intrusions at the top of the screen, typically the system status bar.
content - The control to display.
maintain_bottom_view_padding - Specifies whether the SafeArea should maintain the bottom MediaQueryData.viewPadding instead of the bottom MediaQueryData.padding.
minimum_padding - The minimum padding to apply.
Example​

Live example

Basic Example​
import flet as ft





class State:

    counter = 0





def main(page: ft.Page):

    state = State()

    message = ft.Text("0", size=50)



    def handle_button_click(e: ft.Event[ft.FloatingActionButton]):

        state.counter += 1

        message.value = str(state.counter)

        message.update()



    page.floating_action_button = ft.FloatingActionButton(

        icon=ft.Icons.ADD,

        on_click=handle_button_click,

    )



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Container(

                alignment=ft.Alignment.CENTER,

                content=message,

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
avoid_intrusions_bottom
class-attribute
instance-attribute
​
Copy
avoid_intrusions_bottom: bool = True

Whether to avoid system intrusions on the bottom side of the screen.

build
avoid_intrusions_left
class-attribute
instance-attribute
​
Copy
avoid_intrusions_left: bool = True

Whether to avoid system intrusions on the left.

build
avoid_intrusions_right
class-attribute
instance-attribute
​
Copy
avoid_intrusions_right: bool = True

Whether to avoid system intrusions on the right.

build
avoid_intrusions_top
class-attribute
instance-attribute
​
Copy
avoid_intrusions_top: bool = True

Whether to avoid system intrusions at the top of the screen, typically the system status bar.

build
content
instance-attribute
​
Copy
content: Control

The control to display.

Raises:

ValueError - If it is not visible.
build
maintain_bottom_view_padding
class-attribute
instance-attribute
​
Copy
maintain_bottom_view_padding: bool = False

Specifies whether the SafeArea should maintain the bottom MediaQueryData.viewPadding instead of the bottom MediaQueryData.padding.

This avoids layout shifts caused by keyboard overlays, useful when flexible controls are used.

build
minimum_padding
class-attribute
instance-attribute
​
Copy
minimum_padding: PaddingValue = 0

The minimum padding to apply.

The greater of the minimum insets and the media padding will be applied.

Edit this page