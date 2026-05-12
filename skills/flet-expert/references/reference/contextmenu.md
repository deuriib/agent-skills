# ContextMenu
URL: https://flet.dev/docs/controls/contextmenu

ReferenceControlsContextMenu
ContextMenu

Wraps its content and displays contextual menus for specific mouse events.

TIP

On web, call disable method of Page.browser_context_menu to suppress the default browser context menu before relying on custom menus.

Basic ContextMenu

Inherits: LayoutControl

Properties
content - The child control that listens for mouse interaction.
items - A list of menu items to display in the context menu, when open is called.
primary_items - A list of menu items to display in the context menu, for primary (usually left) mouse button actions.
primary_trigger - Defines a trigger mode for the display of primary_items.
secondary_items - A list of menu items to display in the context menu for secondary (usually right) mouse button actions.
secondary_trigger - Defines a trigger mode for the display of secondary_items.
tertiary_items - A list of menu items to display in the context menu for tertiary (usually middle) mouse button actions.
tertiary_trigger - Defines a trigger mode for the display of tertiary_items.
Events
on_dismiss - Fires when the menu is dismissed without a selection, or when an attempt is made to open the menu but no items are available.
on_select - Fires when a context menu item is selected.
Methods
open - Opens the context menu programmatically, and displays items.
Examples​
Triggers​
import flet as ft





async def main(page: ft.Page):

    # on web, disable default browser context menu

    if page.web:

        await page.browser_context_menu.disable()



    def handle_item_click(e: ft.Event[ft.PopupMenuItem]):

        action = e.control.content

        page.show_dialog(ft.SnackBar(content=f"Item '{action}' selected."))



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.ContextMenu(

                primary_items=[

                    ft.PopupMenuItem(content="Primary 1", on_click=handle_item_click),

                    ft.PopupMenuItem(content="Primary 2", on_click=handle_item_click),

                ],

                primary_trigger=ft.ContextMenuTrigger.DOWN,

                secondary_items=[

                    ft.PopupMenuItem(content="Secondary 1", on_click=handle_item_click),

                    ft.PopupMenuItem(content="Secondary 2", on_click=handle_item_click),

                ],

                secondary_trigger=ft.ContextMenuTrigger.DOWN,

                tertiary_items=[

                    ft.PopupMenuItem(content="Tertiary 1", on_click=handle_item_click),

                    ft.PopupMenuItem(content="Tertiary 2", on_click=handle_item_click),

                ],

                tertiary_trigger=ft.ContextMenuTrigger.DOWN,

                on_select=lambda e: print(f"Selected item: {e.item.content}"),

                on_dismiss=lambda e: print("Menu dismissed"),

                expand=True,

                content=ft.Container(

                    key="context_menu_trigger_area",

                    expand=True,

                    bgcolor=ft.Colors.BLUE,

                    alignment=ft.Alignment.CENTER,

                    border_radius=ft.BorderRadius.all(12),

                    content=ft.Text("Left/middle/right click to open a context menu."),

                ),

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Programmatic open​
import flet as ft





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER



    def handle_select(e: ft.ContextMenuSelectEvent):

        action = e.item.content

        page.show_dialog(ft.SnackBar(f"Item '{action}' selected."))



    async def open_menu(e: ft.Event[ft.Button]):

        await menu.open()



    menu = ft.ContextMenu(

        on_select=handle_select,

        items=[

            ft.PopupMenuItem(

                content="Item 1",

                on_click=lambda e: print(f"{e.control.content}"),

            ),

            ft.PopupMenuItem(

                content="Item 2",

                on_click=lambda e: print(f"{e.control.content}"),

            ),

            ft.PopupMenuItem(

                content="Item 3",

                on_click=lambda e: print(f"{e.control.content}"),

            ),

        ],

        content=ft.Button("Click to open menu", on_click=open_menu),

    )



    page.add(

        ft.SafeArea(

            content=menu,

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Programmatic open with custom trigger​
import flet as ft





def main(page: ft.Page):

    async def open_menu(e: ft.TapEvent[ft.GestureDetector]):

        await menu.open(

            local_position=e.local_position,

            global_position=e.global_position,

        )



    menu = ft.ContextMenu(

        expand=True,

        items=[

            ft.PopupMenuItem(

                content="Cut",

                on_click=lambda e: print(f"{e.control.content}"),

            ),

            ft.PopupMenuItem(

                content="Copy",

                on_click=lambda e: print(f"{e.control.content}"),

            ),

            ft.PopupMenuItem(

                content="Paste",

                on_click=lambda e: print(f"{e.control.content}"),

            ),

        ],

        content=ft.GestureDetector(

            expand=True,

            on_double_tap_down=open_menu,

            content=ft.Container(

                key="context_menu_custom_trigger_area",

                bgcolor=ft.Colors.BLUE,

                alignment=ft.Alignment.CENTER,

                content=ft.Text("Double-click to open the context menu."),

            ),

        ),

    )



    page.add(

        ft.SafeArea(

            expand=True,

            content=menu,

        ),

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

The child control that listens for mouse interaction.

Raises:

ValueError - If not visible.
build
items
class-attribute
instance-attribute
​
Copy
items: list[PopupMenuItem] = field(default_factory=list)

A list of menu items to display in the context menu, when open is called.

build
primary_items
class-attribute
instance-attribute
​
Copy
primary_items: list[PopupMenuItem] = field(
    default_factory=list
)

A list of menu items to display in the context menu, for primary (usually left) mouse button actions.

These items are displayed when the corresponding primary_trigger is activated.

build
primary_trigger
class-attribute
instance-attribute
​
Copy
primary_trigger: ContextMenuTrigger | None = None

Defines a trigger mode for the display of primary_items.

If set to None, the trigger is disabled.

build
secondary_items
class-attribute
instance-attribute
​
Copy
secondary_items: list[PopupMenuItem] = field(
    default_factory=list
)

A list of menu items to display in the context menu for secondary (usually right) mouse button actions.

These items are displayed when the corresponding secondary_trigger is activated.

build
secondary_trigger
class-attribute
instance-attribute
​
Copy
secondary_trigger: ContextMenuTrigger | None = (
    ContextMenuTrigger.DOWN
)

Defines a trigger mode for the display of secondary_items.

If set to None, the trigger is disabled.

build
tertiary_items
class-attribute
instance-attribute
​
Copy
tertiary_items: list[PopupMenuItem] = field(
    default_factory=list
)

A list of menu items to display in the context menu for tertiary (usually middle) mouse button actions.

These items are displayed when the corresponding tertiary_trigger is activated.

build
tertiary_trigger
class-attribute
instance-attribute
​
Copy
tertiary_trigger: ContextMenuTrigger | None = (
    ContextMenuTrigger.DOWN
)

Defines a trigger mode for the display of tertiary_items.

If set to None, the trigger is disabled.

Events​
bolt
on_dismiss
class-attribute
instance-attribute
​
Copy
on_dismiss: EventHandler[ContextMenuDismissEvent] | None = (
    None
)

Fires when the menu is dismissed without a selection, or when an attempt is made to open the menu but no items are available.

bolt
on_select
class-attribute
instance-attribute
​
Copy
on_select: EventHandler[ContextMenuSelectEvent] | None = (
    None
)

Fires when a context menu item is selected.

Methods​
deployed_code
open
async
​
Copy
open(
    global_position: OffsetValue | None = None,
    local_position: OffsetValue | None = None,
) -> None

Opens the context menu programmatically, and displays items.

Parameters:

global_position (OffsetValue | None, default: None) - A global coordinate describing where the menu should appear. If omitted, local_position or the center of the content is used.
local_position (OffsetValue | None, default: None) - A local coordinate relative to the content. When provided without global_position, the coordinate is translated to global space automatically.
Edit this page