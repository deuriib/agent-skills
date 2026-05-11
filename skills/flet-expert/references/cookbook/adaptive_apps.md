# Adaptive apps
URL: https://flet.dev/docs/cookbook/adaptive-apps

CookbookAdaptive apps
Adaptive apps

Flet framework allows you to develop adaptive apps, which means having a single codebase that will deliver a different look depending on the device's platform.

Below is an example of a very simple app that has a different look on iOS and Android platforms:

import flet as ft



def main(page):



    page.adaptive = True



    page.appbar = ft.AppBar(

        leading=ft.TextButton("New", style=ft.ButtonStyle(padding=0)),

        title=ft.Text("Adaptive AppBar"),

        actions=[

            ft.IconButton(ft.cupertino_icons.ADD, style=ft.ButtonStyle(padding=0))

        ],

        bgcolor=ft.Colors.with_opacity(0.04, ft.CupertinoColors.SYSTEM_BACKGROUND),

    )



    page.navigation_bar = ft.NavigationBar(

        destinations=[

            ft.NavigationBarDestination(icon=ft.Icons.EXPLORE, label="Explore"),

            ft.NavigationBarDestination(icon=ft.Icons.COMMUTE, label="Commute"),

            ft.NavigationBarDestination(

                icon=ft.Icons.BOOKMARK_BORDER,

                selected_icon=ft.Icons.BOOKMARK,

                label="Bookmark",

            ),

        ],

        border=ft.Border(

            top=ft.BorderSide(color=ft.CupertinoColors.SYSTEM_GREY2, width=0)

        ),

    )



    page.add(

        ft.SafeArea(

            ft.Column(

                [

                    ft.Checkbox(value=False, label="Dark Mode"),

                    ft.Text("First field:"),

                    ft.TextField(keyboard_type=ft.KeyboardType.TEXT),

                    ft.Text("Second field:"),

                    ft.TextField(keyboard_type=ft.KeyboardType.TEXT),

                    ft.Switch(label="A switch"),

                    ft.FilledButton(content=ft.Text("Adaptive button")),

                    ft.Text("Text line 1"),

                    ft.Text("Text line 2"),

                    ft.Text("Text line 3"),

                ]

            )

        )

    )



ft.run(main)


By setting just page.adaptive = True you can make your app look awesome on both iOS and Android devices:

iPhone	Android

	
Material and Cupertino controls​

Most of Flet controls are based on Material design.

There is also a number of iOS-style controls in Flet that are called Cupertino controls.

Cupertino controls usually have a matching Material control that has adaptive property which defaults toFalse. When using a Material control with adaptive property set to True, a different control will be created depending on the platform, for example:

ft.Checkbox(adaptive=True, value=True, label="Adaptive Checkbox")


Flet checks the value of Page.platform property and if it is PagePlatform.IOS or ft.PagePlatform.MACOS, Cupertino control will be created; in all other cases Material control will be created.

NOTE

adaptive property can be set for an individual control or a container-controls (ex: Row, Column) that has children controls. If a container-control is made adaptive, all its children will be adaptive too, unless adaptive property is explicitly set to False for a child control.

Material vs Cupertino
Custom adaptive controls​

While Flet offers a number of controls that will be adapted to a platform

automatically using their adaptive property, there will be cases when you need more specific adaptive UI presentation, for example, using different icon, background color, padding, etc., depending on the platform.

With Flet, you can create your own reusable custom controls in Python that will inherit from a Flet control and implement specific properties you need.

In the example below, we are creating a new AdaptiveNavigationBarDestination custom control that will be displaying different icon on iOS and Android, and use it as destination for the NavigationBar:

import flet as ft



class AdaptiveNavigationBarDestination(ft.NavigationBarDestination):

    def __init__(self, ios_icon, android_icon, label):

        super().__init__()

        self._ios_icon = ios_icon

        self._android_icon = android_icon

        self.label = label



    def build(self):

        # we can check for platform in build method because self.page is known

        self.icon = (

            self._ios_icon

            if self.page.platform == ft.PagePlatform.IOS

            or self.page.platform == ft.PagePlatform.MACOS

            else self._android_icon

        )



def main(page: ft.Page):

    page.adaptive = True



    page.navigation_bar = ft.NavigationBar(

        selected_index=2,

        destinations=[

            AdaptiveNavigationBarDestination(

                ios_icon=ft.cupertino_icons.PERSON_3_FILL,

                android_icon=ft.Icons.PERSON,

                label="Contacts",

            ),

            AdaptiveNavigationBarDestination(

                ios_icon=ft.cupertino_icons.CHAT_BUBBLE_2,

                android_icon=ft.Icons.CHAT,

                label="Chats",

            ),

            AdaptiveNavigationBarDestination(

                ios_icon=ft.cupertino_icons.SETTINGS,

                android_icon=ft.Icons.SETTINGS,

                label="Settings",

            ),

        ],

    )



    page.update()



ft.run(main)


Now the NavigationBar and icons within it will look like different on Android and iOS:

iOS	Android

	
NOTE

You may utilise reusable controls approach to adapt your app not only depending on the Page.platform, but also use Page.web property to have different UI depending on whether the app is running in a browser or not, or even combine the usage of both properties to have specific UI for your apps.

Edit this page