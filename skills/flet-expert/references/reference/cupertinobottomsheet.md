# CupertinoBottomSheet
URL: https://flet.dev/docs/controls/cupertinobottomsheet

ReferenceControlsCupertinoBottomSheet
CupertinoBottomSheet

A Cupertino bottom sheet.

Inherits: DialogControl

Properties
bgcolor - The background color of this bottom sheet.
content - The control to be displayed in this bottom sheet.
height - The height of this bottom sheet.
modal - Whether this bottom sheet can be dismissed/closed by clicking the area outside of it.
padding - The sheet's padding.
Examples​

Live example

Displaying a CupertinoActionSheet​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    messages = ft.Column(tight=True)



    def handle_click(e: ft.Event[ft.CupertinoActionSheetAction]):

        messages.controls.append(ft.Text(f"Action clicked: {e.control.content.value}"))

        page.pop_dialog()



    action_sheet = ft.CupertinoActionSheet(

        title=ft.Row(

            alignment=ft.MainAxisAlignment.CENTER,

            controls=[ft.Text("Title"), ft.Icon(ft.Icons.BEDTIME)],

        ),

        message=ft.Row(

            alignment=ft.MainAxisAlignment.CENTER,

            controls=[ft.Text("Description"), ft.Icon(ft.Icons.AUTO_AWESOME)],

        ),

        cancel=ft.CupertinoActionSheetAction(

            on_click=handle_click,

            content=ft.Text("Cancel"),

        ),

        actions=[

            ft.CupertinoActionSheetAction(

                default=True,

                on_click=handle_click,

                content=ft.Text("Default Action"),

            ),

            ft.CupertinoActionSheetAction(

                on_click=handle_click,

                content=ft.Text("Normal Action"),

            ),

            ft.CupertinoActionSheetAction(

                destructive=True,

                on_click=handle_click,

                content=ft.Text("Destructive Action"),

            ),

        ],

    )



    bottom_sheet = ft.CupertinoBottomSheet(action_sheet)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                controls=[

                    ft.CupertinoFilledButton(

                        on_click=lambda _: page.show_dialog(bottom_sheet),

                        content="Open CupertinoBottomSheet",

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
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this bottom sheet.

build
content
instance-attribute
​
Copy
content: Control

The control to be displayed in this bottom sheet.

build
height
class-attribute
instance-attribute
​
Copy
height: Number | None = None

The height of this bottom sheet.

build
modal
class-attribute
instance-attribute
​
Copy
modal: bool = False

Whether this bottom sheet can be dismissed/closed by clicking the area outside of it.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The sheet's padding.

Edit this page