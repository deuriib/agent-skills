# SearchBar
URL: https://flet.dev/docs/controls/searchbar

ReferenceControlsSearchBar
SearchBar

Manages a "search view" route that allows the user to select one of the suggested completions for a search query.

ft.SearchBar(bar_hint_text="Search...")

Basic search bar

Inherits: LayoutControl

Properties
autofocus - Whether the text field should focus itself if nothing else is already focused.
bar_bgcolor - Defines the background color of the search bar in all or specific ControlState states.
bar_border_side - The color and weight of the search bar's outline.
bar_elevation - The elevation of the search bar.
bar_hint_text - Defines the text to be shown in the search bar when it is empty and the search view is close.
bar_hint_text_style - The style to use for the SearchBar.bar_hint_text.
bar_leading - A control to display before the text input field when the search view is close.
bar_overlay_color - Defines the highlight color that's typically used to indicate that the search bar is in FOCUSED, HOVERED, or PRESSED states.
bar_padding - The padding between the search bar's boundary and its contents.
bar_scroll_padding - Configures the padding around a Scrollable when the text field scrolls into view.
bar_shadow_color - The shadow color of the search bar.
bar_shape - The shape of the search bar.
bar_size_constraints - Optional size constraints for the search bar.
bar_text_style - The style to use for the text being edited.
bar_trailing - A list of controls to display after the text input field when the search view is close.
capitalization - Enables automatic on-the-fly capitalization of entered text.
controls - The list of controls to be displayed below the search bar when in search view.
divider_color - The color of the divider when in search view.
full_screen - Defines whether the search view grows to fill the entire screen when the search bar is tapped.
keyboard_type - The type of action button to use for the keyboard.
shrink_wrap - Whether the search view should shrink-wrap its contents.
value - The text in the search bar.
view_bar_padding - The padding to use for the search view's search bar.
view_bgcolor - Defines the background color of the search view.
view_elevation - Defines the elevation of the search view.
view_header_height - The height of the search field on the search view.
view_header_text_style - Defines the text style of the text being edited on the search view.
view_hint_text - Defines the text to be displayed when the search bar's input field is empty.
view_hint_text_style - Defines the text style of view_hint_text.
view_leading - A Control to display before the text input field when the search view is open.
view_padding - The padding to use for the search view.
view_shape - Defines the shape of the search view.
view_side - Defines the color and weight of the search view's outline.
view_size_constraints - Optional size constraints for the search view.
view_trailing - A list of Controls to display after the text input field when the search view is open.
Events
on_blur - Fired when the search bar loses focus.
on_change - Called when the typed input in the search bar has changed.
on_focus - Fired when the search bar gains focus.
on_submit - Called when user presses ENTER while focus is on SearchBar.
on_tap - Called when the search bar is tapped.
on_tap_outside_bar - Fired when the user taps outside the search bar while the search view is open.
Methods
close_view - Closes an opened search view.
focus - Requests focus for this control.
open_view - Opens the search view.
Examples​

Live example

Basic Example​
import flet as ft



colors = [

    "Amber",

    "Blue Grey",

    "Brown",

    "Deep Orange",

    "Green",

    "Light Blue",

    "Orange",

    "Red",

]





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def build_tiles(items: list[str]) -> list[ft.Control]:

        return [

            ft.ListTile(

                title=ft.Text(item),

                data=item,

                on_click=handle_tile_click,

            )

            for item in items

        ]



    async def handle_tile_click(e: ft.Event[ft.ListTile]):

        await anchor.close_view()



    async def handle_change(e: ft.Event[ft.SearchBar]):

        query = e.control.value.strip().lower()

        matching = (

            [color for color in colors if query in color.lower()] if query else colors

        )

        anchor.controls = build_tiles(matching)



    def handle_submit(e: ft.Event[ft.SearchBar]):

        print(f"Submit: {e.data}")



    async def handle_tap(e: ft.Event[ft.SearchBar]):

        await anchor.open_view()



    anchor = ft.SearchBar(

        view_elevation=4,

        divider_color=ft.Colors.AMBER,

        bar_hint_text="Search colors...",

        view_hint_text="Choose a color from the suggestions...",

        on_change=handle_change,

        on_submit=handle_submit,

        on_tap=handle_tap,

        controls=build_tiles(colors),

    )



    page.add(ft.SafeArea(content=anchor))





if __name__ == "__main__":

    ft.run(main)

Properties​
build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

Whether the text field should focus itself if nothing else is already focused.

build
bar_bgcolor
class-attribute
instance-attribute
​
Copy
bar_bgcolor: ControlStateValue[ColorValue] | None = None

Defines the background color of the search bar in all or specific ControlState states.

build
bar_border_side
class-attribute
instance-attribute
​
Copy
bar_border_side: ControlStateValue[BorderSide] | None = None

The color and weight of the search bar's outline.

This value is combined with bar_shape to create a shape decorated with an outline.

build
bar_elevation
class-attribute
instance-attribute
​
Copy
bar_elevation: ControlStateValue[Number | None] | None = (
    None
)

The elevation of the search bar.

build
bar_hint_text
class-attribute
instance-attribute
​
Copy
bar_hint_text: str | None = None

Defines the text to be shown in the search bar when it is empty and the search view is close.

Usually some text that suggests what sort of input the field accepts.

build
bar_hint_text_style
class-attribute
instance-attribute
​
Copy
bar_hint_text_style: ControlStateValue[TextStyle] | None = (
    None
)

The style to use for the SearchBar.bar_hint_text.

build
bar_leading
class-attribute
instance-attribute
​
Copy
bar_leading: Control | None = None

A control to display before the text input field when the search view is close.

Typically an Icon or an IconButton.

build
bar_overlay_color
class-attribute
instance-attribute
​
Copy
bar_overlay_color: ControlStateValue[ColorValue] | None = (
    None
)

Defines the highlight color that's typically used to indicate that the search bar is in FOCUSED, HOVERED, or PRESSED states.

build
bar_padding
class-attribute
instance-attribute
​
Copy
bar_padding: ControlStateValue[PaddingValue] | None = None

The padding between the search bar's boundary and its contents.

build
bar_scroll_padding
class-attribute
instance-attribute
​
Copy
bar_scroll_padding: PaddingValue = 20

Configures the padding around a Scrollable when the text field scrolls into view.

If the bar's text field is partially off-screen or covered (e.g., by the keyboard), it scrolls into view, ensuring it is positioned at the specified distance from the Scrollable edges.

build
bar_shadow_color
class-attribute
instance-attribute
​
Copy
bar_shadow_color: ControlStateValue[ColorValue] | None = (
    None
)

The shadow color of the search bar.

build
bar_shape
class-attribute
instance-attribute
​
Copy
bar_shape: ControlStateValue[OutlinedBorder] | None = None

The shape of the search bar.

This shape is combined with bar_border_side to create a shape decorated with an outline.

build
bar_size_constraints
class-attribute
instance-attribute
​
Copy
bar_size_constraints: BoxConstraints | None = None

Optional size constraints for the search bar.

build
bar_text_style
class-attribute
instance-attribute
​
Copy
bar_text_style: ControlStateValue[TextStyle] | None = None

The style to use for the text being edited.

build
bar_trailing
class-attribute
instance-attribute
​
Copy
bar_trailing: list[Control] | None = None

A list of controls to display after the text input field when the search view is close.

These controls can represent additional modes of searching (e.g voice search), an avatar, or an overflow menu and are usually not more than two.

build
capitalization
class-attribute
instance-attribute
​
Copy
capitalization: TextCapitalization | None = None

Enables automatic on-the-fly capitalization of entered text.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[Control] = field(default_factory=list)

The list of controls to be displayed below the search bar when in search view.

Typically ListTiles and will be displayed in a ListView.

build
divider_color
class-attribute
instance-attribute
​
Copy
divider_color: ColorValue | None = None

The color of the divider when in search view.

build
full_screen
class-attribute
instance-attribute
​
Copy
full_screen: bool = False

Defines whether the search view grows to fill the entire screen when the search bar is tapped.

build
keyboard_type
class-attribute
instance-attribute
​
Copy
keyboard_type: KeyboardType = KeyboardType.TEXT

The type of action button to use for the keyboard.

build
shrink_wrap
class-attribute
instance-attribute
​
Copy
shrink_wrap: bool | None = None

Whether the search view should shrink-wrap its contents.

build
value
class-attribute
instance-attribute
​
Copy
value: str = ''

The text in the search bar.

build
view_bar_padding
class-attribute
instance-attribute
​
Copy
view_bar_padding: PaddingValue | None = None

The padding to use for the search view's search bar.

If null, then the default value is 8.0 horizontally.

build
view_bgcolor
class-attribute
instance-attribute
​
Copy
view_bgcolor: ColorValue | None = None

Defines the background color of the search view.

build
view_elevation
class-attribute
instance-attribute
​
Copy
view_elevation: Number | None = None

Defines the elevation of the search view.

build
view_header_height
class-attribute
instance-attribute
​
Copy
view_header_height: Number | None = None

The height of the search field on the search view.

build
view_header_text_style
class-attribute
instance-attribute
​
Copy
view_header_text_style: TextStyle | None = None

Defines the text style of the text being edited on the search view.

build
view_hint_text
class-attribute
instance-attribute
​
Copy
view_hint_text: str | None = None

Defines the text to be displayed when the search bar's input field is empty.

build
view_hint_text_style
class-attribute
instance-attribute
​
Copy
view_hint_text_style: TextStyle | None = None

Defines the text style of view_hint_text.

build
view_leading
class-attribute
instance-attribute
​
Copy
view_leading: Control | None = None

A Control to display before the text input field when the search view is open.

Typically an Icon or an IconButton.

Defaults to a back button which closes/pops the search view.

build
view_padding
class-attribute
instance-attribute
​
Copy
view_padding: PaddingValue | None = None

The padding to use for the search view.

Has no effect if the search view is full-screen.

build
view_shape
class-attribute
instance-attribute
​
Copy
view_shape: OutlinedBorder | None = None

Defines the shape of the search view.

build
view_side
class-attribute
instance-attribute
​
Copy
view_side: BorderSide | None = None

Defines the color and weight of the search view's outline.

build
view_size_constraints
class-attribute
instance-attribute
​
Copy
view_size_constraints: BoxConstraints | None = None

Optional size constraints for the search view.

By default, the search view has the same width as the search bar and is 2/3 the height of the screen. If the width and height of the view are within the view_size_constraints, the view will show its default size. Otherwise, the size of the view will be constrained by this property.

build
view_trailing
class-attribute
instance-attribute
​
Copy
view_trailing: list[Control] | None = None

A list of Controls to display after the text input field when the search view is open.

Defaults to a close button which closes/pops the search view.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[SearchBar] | None = None

Fired when the search bar loses focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[SearchBar] | None = None

Called when the typed input in the search bar has changed.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[SearchBar] | None = None

Fired when the search bar gains focus.

bolt
on_submit
class-attribute
instance-attribute
​
Copy
on_submit: ControlEventHandler[SearchBar] | None = None

Called when user presses ENTER while focus is on SearchBar.

bolt
on_tap
class-attribute
instance-attribute
​
Copy
on_tap: ControlEventHandler[SearchBar] | None = None

Called when the search bar is tapped.

bolt
on_tap_outside_bar
class-attribute
instance-attribute
​
Copy
on_tap_outside_bar: (
    ControlEventHandler[SearchBar] | None
) = None

Fired when the user taps outside the search bar while the search view is open.

Methods​
deployed_code
close_view
async
​
Copy
close_view(text: str | None=None)

Closes an opened search view.

Parameters:

text (str | None, default: None) - The text to set in the search bar when closing the view. If not provided, the current value of the search bar will be used.
deployed_code
focus
async
​
Copy
focus()

Requests focus for this control.

deployed_code
open_view
async
​
Copy
open_view()

Opens the search view.

Edit this page