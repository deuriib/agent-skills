# BrowserContextMenu
URL: https://flet.dev/docs/services/browsercontextmenu

ReferenceServicesBrowserContextMenu
BrowserContextMenu

Controls the browser's context menu on the web platform.

The context menu is the menu that appears on right clicking or selecting text in the browser, for example.

On web, by default, the browser's context menu is enabled and Flet's context menus are hidden.

On all non-web platforms, this does nothing.

Inherits: Service

Properties
disabled - Whether browser context menu disabling is currently requested.
Methods
disable - Disable the browser's context menu.
enable - Enable the browser's context menu.
Examples​
#

# Run this example as a web app using the command:

#

#     flet run --web main.py

#





import flet as ft





async def main(page: ft.Page):

    bcm = ft.BrowserContextMenu()



    async def disable_context_menu():

        await bcm.disable()



    async def enable_context_menu():

        await bcm.enable()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Button(

                        "Disable browser context menu",

                        on_click=disable_context_menu,

                    ),

                    ft.Button(

                        "Enable browser context menu",

                        on_click=enable_context_menu,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
disabled
property
​

Whether browser context menu disabling is currently requested.

This flag is managed by this service instance:

initialized to False;
set to True after disable;
set to False after enable.
NOTE

On non-web platforms, browser context menu control is not applicable, but this property still reflects the last requested state.

Methods​
deployed_code
disable
async
​
Copy
disable()

Disable the browser's context menu.

By default, when the app starts, the browser's context menu is already enabled.

deployed_code
enable
async
​
Copy
enable()

Enable the browser's context menu.

By default, when the app starts, the browser's context menu is already enabled.

Edit this page