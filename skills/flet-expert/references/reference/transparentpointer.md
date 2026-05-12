# TransparentPointer
URL: https://flet.dev/docs/controls/transparentpointer

ReferenceControlsTransparentPointer
TransparentPointer

TransparentPointer is the solution to "How to pass through all gestures between two widgets in Stack" problem.

For example, if there is an Button inside Container with GestureDetector then tapping on a button won't be "visible" to a gesture detector behind it. With TransparentPointer a tapping event doesn't stop on a button, but goes up to the parent, similar to event bubbling in HTML/JS.

Inherits: LayoutControl

Properties
content - The Control that should be displayed.
Example​
Basic Example​
import flet as ft





def main(page: ft.Page):

    def button_clicked(e):

        print("transparent pointer button clicked")



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Stack(

                expand=True,

                controls=[

                    ft.GestureDetector(

                        on_tap=lambda _: print("TAP!"),

                        multi_tap_touches=3,

                        on_multi_tap=lambda e: print("MULTI TAP:", e.global_position),

                        on_multi_long_press=lambda _: print("Multi tap long press"),

                    ),

                    ft.TransparentPointer(

                        content=ft.Container(

                            padding=50,

                            content=ft.Button(

                                "Test button",

                                on_click=button_clicked,

                            ),

                        )

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

The Control that should be displayed.

Edit this page