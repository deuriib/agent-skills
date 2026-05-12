# CupertinoFilledButton
URL: https://flet.dev/docs/controls/cupertinofilledbutton

ReferenceControlsCupertinoFilledButton
CupertinoFilledButton

An iOS-style button filled with default background color.

ft.CupertinoFilledButton("Tap me")

Basic CupertinoFilledButton

Inherits: CupertinoButton

Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.CupertinoFilledButton(

                opacity_on_click=0.3,

                on_click=lambda _: print("CupertinoFilledButton clicked!"),

                content=ft.Text("CupertinoFilledButton"),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page