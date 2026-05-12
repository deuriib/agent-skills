# Context
URL: https://flet.dev/docs/types/context

ReferenceTypesClassesContext
Context

Manages the context for Flet controls, including page reference and auto-update behavior.

Context instance is accessed via context.

Properties
page - Returns the current Page associated with the context.
Methods
auto_update_enabled - Returns whether auto-update is enabled in the current context.
disable_auto_update - Disables auto-update behavior for the current context.
disable_components_mode - Disables components mode in the current context.
enable_auto_update - Enables auto-update behavior for the current context.
enable_components_mode - Enables components mode in the current context.
is_components_mode - Returns whether the current context is in components mode.
mark_update_called - Marks that .update() was explicitly called during the current handler.
reset_auto_update - Copies the parent auto-update state into the current context.
reset_update_called - Resets the update-called flag for the current context.
was_update_called - Returns whether .update() was explicitly called during the current handler.
Properties​
build
page
property
​
Copy
page: Page

Returns the current Page associated with the context.

EXAMPLE
# take page width anywhere in the app

width = ft.context.page.width


Returns:

Page - The current page.

Raises:

RuntimeError - If the property is accessed outside a running Flet app.
Methods​
deployed_code
auto_update_enabled
​
Copy
auto_update_enabled() -> bool

Returns whether auto-update is enabled in the current context.

Returns:

bool - True if auto-update is enabled, False otherwise.
deployed_code
disable_auto_update
​
Copy
disable_auto_update()

Disables auto-update behavior for the current context.

EXAMPLE
import flet as ft





def main(page: ft.Page):

    def button_click():

        ft.context.disable_auto_update()

        b.content = "Button clicked!"

        # update just the button

        b.update()



        page.controls.append(ft.Text("This won't appear"))

        # no page.update() will be called here



    page.controls.append(b := ft.Button("Action!", on_click=button_click))

    # page.update() - auto-update is enabled by default





ft.run(main)



deployed_code
disable_components_mode
​
Copy
disable_components_mode()

Disables components mode in the current context.

deployed_code
enable_auto_update
​
Copy
enable_auto_update()

Enables auto-update behavior for the current context.

EXAMPLE
import flet as ft



# disable auto-update globally for the app

ft.context.disable_auto_update()





def main(page: ft.Page):

    # enable auto-update just inside main

    ft.context.enable_auto_update()



    page.controls.append(ft.Text("Hello, world!"))

    # page.update() - we don't need to call it explicitly





ft.run(main)

deployed_code
enable_components_mode
​
Copy
enable_components_mode()

Enables components mode in the current context.

deployed_code
is_components_mode
​
Copy
is_components_mode() -> bool

Returns whether the current context is in components mode.

Returns:

bool - True if in components mode, False otherwise.
deployed_code
mark_update_called
​
Copy
mark_update_called()

Marks that .update() was explicitly called during the current handler.

deployed_code
reset_auto_update
​
Copy
reset_auto_update()

Copies the parent auto-update state into the current context.

deployed_code
reset_update_called
​
Copy
reset_update_called()

Resets the update-called flag for the current context.

deployed_code
was_update_called
​
Copy
was_update_called() -> bool

Returns whether .update() was explicitly called during the current handler.

Returns:

bool - True if .update() was called, False otherwise.
Edit this page