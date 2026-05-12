# CupertinoListTile
URL: https://flet.dev/docs/controls/cupertinolisttile

ReferenceControlsCupertinoListTile
CupertinoListTile

An iOS-style list tile.

The CupertinoListTile is a Cupertino equivalent of the Material ListTile.

ft.CupertinoListTile(

    title="Notifications",

    subtitle="Enabled",

    width=400,

    leading=ft.Icon(ft.Icons.NOTIFICATIONS_OUTLINED),

    trailing=ft.Icon(ft.Icons.CHEVRON_RIGHT),

    bgcolor=ft.Colors.SURFACE_CONTAINER_LOW,

)

Basic CupertinoListTile

Inherits: LayoutControl

Properties
additional_info - A Control to display on the right of the list tile, before trailing.
bgcolor - The background color of this list tile.
bgcolor_activated - The background color of this list tile after it was tapped.
leading - A control to display before the title.
leading_size - Used to constrain the width and height of leading control.
leading_to_title - The horizontal space between leading and title.
notched - Whether this list tile should be created in an "Inset Grouped" form, known from either iOS Notes or Reminders app.
padding - The tile's internal padding.
subtitle - Additional content displayed below the title.
title - The primary content of this list tile.
toggle_inputs - Whether clicking on this tile should toggle the state of (visible) toggleable controls like Radio, Checkbox or Switch inside it.
trailing - A control to display after the title.
url - The URL to open when this button is clicked.
Events
on_click - Called when a user clicks/taps the list tile.
Examples​

Live example

Notched and non-notched list tiles​
import flet as ft





def main(page: ft.Page):

    def handle_tile_click(_: ft.Event[ft.CupertinoListTile]):

        print("Tile clicked")



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.CupertinoListTile(

                        additional_info=ft.Text("Wed Jan 24"),

                        bgcolor_activated=ft.Colors.AMBER_ACCENT,

                        leading=ft.Icon(ft.CupertinoIcons.GAME_CONTROLLER),

                        title=ft.Text("CupertinoListTile: notched = False"),

                        subtitle=ft.Text("Subtitle"),

                        trailing=ft.Icon(ft.CupertinoIcons.ALARM),

                        on_click=handle_tile_click,

                    ),

                    ft.CupertinoListTile(

                        notched=True,

                        additional_info=ft.Text("Thu Jan 25"),

                        leading=ft.Icon(ft.CupertinoIcons.GAME_CONTROLLER),

                        title=ft.Text("CupertinoListTile: notched = True"),

                        subtitle=ft.Text("Subtitle"),

                        trailing=ft.Icon(ft.CupertinoIcons.ALARM),

                        on_click=handle_tile_click,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
additional_info
class-attribute
instance-attribute
​
Copy
additional_info: StrOrControl | None = None

A Control to display on the right of the list tile, before trailing.

Similar to subtitle, an additional_info is used to display additional information.

Typically a Text control.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this list tile.

build
bgcolor_activated
class-attribute
instance-attribute
​
Copy
bgcolor_activated: ColorValue | None = None

The background color of this list tile after it was tapped.

build
leading
class-attribute
instance-attribute
​
Copy
leading: IconDataOrControl | None = None

A control to display before the title.

build
leading_size
class-attribute
instance-attribute
​
Copy
leading_size: Number | None = None

Used to constrain the width and height of leading control.

Defaults to 30.0, if notched is True, else 28.0.

build
leading_to_title
class-attribute
instance-attribute
​
Copy
leading_to_title: Number | None = None

The horizontal space between leading and title.

Defaults to 12.0, if notched is True, else 16.0.

build
notched
class-attribute
instance-attribute
​
Copy
notched: bool = False

Whether this list tile should be created in an "Inset Grouped" form, known from either iOS Notes or Reminders app.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The tile's internal padding. Insets a CupertinoListTile's contents: its leading, title, subtitle, additional_info and trailing controls.

build
subtitle
class-attribute
instance-attribute
​
Copy
subtitle: StrOrControl | None = None

Additional content displayed below the title.

Typically a Text control.

build
title
instance-attribute
​
Copy
title: StrOrControl

The primary content of this list tile.

Typically a Text control.

Raises:

ValueError - If it is neither a string nor a visible Control.
build
toggle_inputs
class-attribute
instance-attribute
​
Copy
toggle_inputs: bool = False

Whether clicking on this tile should toggle the state of (visible) toggleable controls like Radio, Checkbox or Switch inside it.

build
trailing
class-attribute
instance-attribute
​
Copy
trailing: IconDataOrControl | None = None

A control to display after the title.

Typically an Icon control.

build
url
class-attribute
instance-attribute
​
Copy
url: str | Url | None = None

The URL to open when this button is clicked.

Additionally, if on_click event callback is provided, it is fired after that.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[CupertinoListTile] | None = (
    None
)

Called when a user clicks/taps the list tile.

Edit this page