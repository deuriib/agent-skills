# WindowDragArea
URL: https://flet.dev/docs/controls/windowdragarea

ReferenceControlsWindowDragArea
WindowDragArea

It mimics the behavior (drag, move, maximize, restore) of a native OS window title bar on the content control.

Simple Window Drag Area

Inherits: LayoutControl

Properties
content - The content of this drag area.
maximizable - Whether double-clicking on the WindowDragArea should maximize/maximize the app's window.
Events
on_double_tap - Called when the WindowDragArea is double-tapped and maximizable=True.
on_drag_end - Called when a pointer that was previously in contact with the screen and moving/dragging is no longer in contact with the screen.
on_drag_start - Called when a pointer has contacted the screen and has begun to move/drag.
Examples​
No frame window​
import flet as ft





def main(page: ft.Page):

    page.window.title_bar_hidden = True

    page.window.title_bar_buttons_hidden = True



    async def handle_window_close(e: ft.Event[ft.IconButton]):

        await page.window.close()



    page.add(

        ft.SafeArea(

            content=ft.Row(

                controls=[

                    ft.WindowDragArea(

                        expand=True,

                        content=ft.Container(

                            bgcolor=ft.Colors.AMBER_300,

                            padding=10,

                            content=ft.Text(

                                "Drag this area to move, maximize and "

                                "restore application window."

                            ),

                        ),

                    ),

                    ft.IconButton(ft.Icons.CLOSE, on_click=handle_window_close),

                ]

            ),

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

The content of this drag area.

Raises:

ValueError - If it is not visible.
build
maximizable
class-attribute
instance-attribute
​
Copy
maximizable: bool = True

Whether double-clicking on the WindowDragArea should maximize/maximize the app's window.

Events​
bolt
on_double_tap
class-attribute
instance-attribute
​
Copy
on_double_tap: (
    EventHandler[WindowEvent[WindowDragArea]] | None
) = None

Called when the WindowDragArea is double-tapped and maximizable=True.

INFO

When a double-tap event is fired, the type property of the event handler argument can only be one of the following: WindowEventType.MAXIMIZE, WindowEventType.UNMAXIMIZE.

bolt
on_drag_end
class-attribute
instance-attribute
​
Copy
on_drag_end: (
    EventHandler[DragEndEvent[WindowDragArea]] | None
) = None

Called when a pointer that was previously in contact with the screen and moving/dragging is no longer in contact with the screen.

bolt
on_drag_start
class-attribute
instance-attribute
​
Copy
on_drag_start: (
    EventHandler[DragStartEvent[WindowDragArea]] | None
) = None

Called when a pointer has contacted the screen and has begun to move/drag.

Edit this page