# CupertinoAlertDialog
URL: https://flet.dev/docs/controls/cupertinoalertdialog

ReferenceControlsCupertinoAlertDialog
CupertinoAlertDialog

An iOS-style alert dialog.

An alert dialog informs the user about situations that require acknowledgement. An alert dialog has an optional title and an optional list of actions. The title is displayed above the content and the actions are displayed below the content.

Inherits: DialogControl

Properties
actions - A set of actions that are displayed at the bottom of the dialog.
barrier_color - The color of the modal barrier below this dialog.
content - The content of this dialog, displayed in a light font at the center of this dialog.
inset_animation - The animation style to be used when the system keyboard intrudes into the space that the dialog is placed in.
modal - Whether this dialog cannot be dismissed by clicking the area outside of it.
title - The title of this dialog, displayed in a large font at the top of this dialog.
Examples​

Live example

File deletion confirmation​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    messages = ft.Column(tight=True)



    def handle_dialog_dismissal(_: ft.Event[ft.DialogControl]):

        messages.controls.append(ft.Text("Dialog dismissed"))



    def handle_action_click(e: ft.Event[ft.CupertinoDialogAction]):

        messages.controls.append(ft.Text(f"Action clicked: {e.control.content}"))

        page.pop_dialog()



    cupertino_alert_dialog = ft.CupertinoAlertDialog(

        title=ft.Text("Cupertino Alert Dialog"),

        content=ft.Text("Do you want to delete this file?"),

        on_dismiss=handle_dialog_dismissal,

        actions=[

            ft.CupertinoDialogAction(

                destructive=True,

                on_click=handle_action_click,

                content="Yes",

            ),

            ft.CupertinoDialogAction(

                default=True,

                on_click=handle_action_click,

                content="No",

            ),

        ],

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.CupertinoFilledButton(

                        on_click=lambda _: page.show_dialog(cupertino_alert_dialog),

                        content="Open CupertinoAlertDialog",

                    ),

                    messages,

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Cupertino, material and adaptive alert dialogs​
from typing import Union



import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.scroll = ft.ScrollMode.AUTO



    messages = ft.Column(tight=True)



    def handle_action_click(

        e: ft.Event[Union[ft.TextButton, ft.CupertinoDialogAction]],

    ):

        messages.controls.append(ft.Text(f"Action clicked: {e.control.content}"))

        page.pop_dialog()



    cupertino_actions = [

        ft.CupertinoDialogAction(

            destructive=True,

            on_click=handle_action_click,

            content="Yes",

        ),

        ft.CupertinoDialogAction(

            default=False,

            on_click=handle_action_click,

            content="No",

        ),

    ]



    material_actions = [

        ft.TextButton(on_click=handle_action_click, content="Yes"),

        ft.TextButton(on_click=handle_action_click, content="No"),

    ]



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.FilledButton(

                        on_click=lambda _: page.show_dialog(

                            ft.AlertDialog(

                                title=ft.Text("Material Alert Dialog"),

                                content=ft.Text("Do you want to delete this file?"),

                                actions=material_actions,

                            )

                        ),

                        content="Open Material Dialog",

                    ),

                    ft.CupertinoFilledButton(

                        on_click=lambda _: page.show_dialog(

                            ft.CupertinoAlertDialog(

                                title=ft.Text("Cupertino Alert Dialog"),

                                content=ft.Text("Do you want to delete this file?"),

                                actions=cupertino_actions,

                            )

                        ),

                        content="Open Cupertino Dialog",

                    ),

                    ft.FilledButton(

                        adaptive=True,

                        bgcolor=ft.Colors.BLUE_ACCENT,

                        on_click=lambda _: page.show_dialog(

                            ft.AlertDialog(

                                adaptive=True,

                                title=ft.Text("Adaptive Alert Dialog"),

                                content=ft.Text("Do you want to delete this file?"),

                                actions=(

                                    cupertino_actions

                                    if page.platform.is_apple()

                                    else material_actions

                                ),

                            )

                        ),

                        content="Open Adaptive Dialog",

                    ),

                    messages,

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
actions
class-attribute
instance-attribute
​
Copy
actions: list[Control] = field(default_factory=list)

A set of actions that are displayed at the bottom of the dialog.

Typically this is a list of CupertinoDialogAction controls.

build
barrier_color
class-attribute
instance-attribute
​
Copy
barrier_color: ColorValue | None = None

The color of the modal barrier below this dialog.

If None, then DialogTheme.barrier_color is used. If that is also None, the default is Colors.BLACK_54.

build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

The content of this dialog, displayed in a light font at the center of this dialog.

Typically a Column that contains the dialog's Text message.

build
inset_animation
class-attribute
instance-attribute
​
Copy
inset_animation: Animation = field(
    default_factory=lambda: Animation(
        curve=AnimationCurve.DECELERATE,
        duration=Duration(milliseconds=100),
    )
)

The animation style to be used when the system keyboard intrudes into the space that the dialog is placed in.

build
modal
class-attribute
instance-attribute
​
Copy
modal: bool = False

Whether this dialog cannot be dismissed by clicking the area outside of it.

build
title
class-attribute
instance-attribute
​
Copy
title: StrOrControl | None = None

The title of this dialog, displayed in a large font at the top of this dialog.

Typically a Text control.

Edit this page