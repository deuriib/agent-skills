# ListTile
URL: https://flet.dev/docs/controls/listtile

ReferenceControlsListTile
ListTile

A single fixed-height row that typically contains some text as well as a leading or trailing icon.

Example:

ft.ListTile(

    width=400,

    leading=ft.Icon(ft.Icons.ACCOUNT_CIRCLE),

    title="Jane Doe",

    subtitle="Product Manager",

    trailing=ft.Icon(ft.Icons.CHEVRON_RIGHT),

    bgcolor=ft.Colors.SURFACE_CONTAINER_LOW,

)

Basic ListTile

Inherits: LayoutControl, AdaptiveControl

Properties
autofocus - True if the control will be selected as the initial focus.
bgcolor - The list tile's background color.
content_padding - The tile's internal padding.
dense - Whether this list tile is part of a vertically dense list.
enable_feedback - Whether detected gestures should provide acoustic and/or haptic feedback.
horizontal_spacing - The horizontal gap between the title and the leading and trailing controls.
hover_color - The tile's color when hovered.
icon_color - Defines the default color for the icons present in leading and trailing.
is_three_line - Whether this list tile is intended to display three lines of text.
leading - A control to display before the title.
leading_and_trailing_text_style - The TextStyle for the leading and trailing controls.
min_height - The minimum height allocated for this control.
min_leading_width - The minimum width allocated for the leading control.
min_vertical_padding - The minimum padding on the top and bottom of the title and subtitle controls.
mouse_cursor - The cursor to be displayed when a mouse pointer enters or is hovering over this control.
selected - If this tile is also enabled then icons and text are rendered with the same color.
selected_color - Defines the color used for icons and text when selected=True.
selected_tile_color - Defines the background color of ListTile when selected=True.
shape - The tile's shape.
splash_color - The list tile's splash color after the control has been tapped.
style - Defines the font used for the title.
subtitle - Additional content displayed below the title.
subtitle_text_style - The TextStyle for the subtitle control.
text_color - The color used for texts in title, subtitle, leading, and trailing.
title - A control to display as primary content of the list tile.
title_alignment - Defines how leading and trailing are vertically aligned relative to the titles (title and subtitle).
title_text_style - The TextStyle for the title control.
toggle_inputs - Whether clicking on a list tile should toggle the state of Radio, Checkbox or Switch inside this tile.
trailing - A control to display after the title.
url - The URL to open when this button is clicked.
visual_density - Defines how compact the control's layout will be.
Events
on_click - Called when a user clicks or taps the list tile.
on_long_press - Called when the user long-presses on this list tile.
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    page.title = "ListTile Example"



    page.add(

        ft.SafeArea(

            content=ft.Card(

                content=ft.Container(

                    width=500,

                    padding=ft.Padding.symmetric(vertical=10),

                    content=ft.Column(

                        spacing=0,

                        controls=[

                            ft.ListTile(title=ft.Text("One-line list tile")),

                            ft.ListTile(

                                title=ft.Text("One-line dense list tile"),

                                dense=True,

                            ),

                            ft.ListTile(

                                leading=ft.Icon(ft.Icons.SETTINGS),

                                title=ft.Text("One-line selected list tile"),

                                selected=True,

                            ),

                            ft.ListTile(

                                leading=ft.Image(

                                    src="assets/icon-192.png",

                                    fit=ft.BoxFit.CONTAIN,

                                ),

                                title=ft.Text("One-line with leading control"),

                            ),

                            ft.ListTile(

                                title=ft.Text("One-line with trailing control"),

                                trailing=ft.PopupMenuButton(

                                    icon=ft.Icons.MORE_VERT,

                                    items=[

                                        ft.PopupMenuItem(content="Item 1"),

                                        ft.PopupMenuItem(content="Item 2"),

                                    ],

                                ),

                            ),

                            ft.ListTile(

                                leading=ft.Icon(ft.Icons.ALBUM),

                                title=ft.Text(

                                    value=(

                                        "One-line with leading and trailing controls"

                                    )

                                ),

                                trailing=ft.PopupMenuButton(

                                    icon=ft.Icons.MORE_VERT,

                                    items=[

                                        ft.PopupMenuItem(content="Item 1"),

                                        ft.PopupMenuItem(content="Item 2"),

                                    ],

                                ),

                            ),

                            ft.ListTile(

                                leading=ft.Icon(ft.Icons.SNOOZE),

                                title=ft.Text(

                                    value=(

                                        "Two-line with leading and trailing controls"

                                    )

                                ),

                                subtitle=ft.Text("Here is a second title."),

                                trailing=ft.PopupMenuButton(

                                    icon=ft.Icons.MORE_VERT,

                                    items=[

                                        ft.PopupMenuItem(content="Item 1"),

                                        ft.PopupMenuItem(content="Item 2"),

                                    ],

                                ),

                            ),

                        ],

                    ),

                )

            ),

        )

    )





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

True if the control will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The list tile's background color.

build
content_padding
class-attribute
instance-attribute
​
Copy
content_padding: PaddingValue | None = None

The tile's internal padding. It insets the contents of this tile. : its leading, title, subtitle, and trailing controls.

build
dense
class-attribute
instance-attribute
​
Copy
dense: bool | None = None

Whether this list tile is part of a vertically dense list.

Dense list tiles default to a smaller height.

build
enable_feedback
class-attribute
instance-attribute
​
Copy
enable_feedback: bool | None = None

Whether detected gestures should provide acoustic and/or haptic feedback. On Android, for example, setting this to True produce a click sound and a long-press will produce a short vibration.

build
horizontal_spacing
class-attribute
instance-attribute
​
Copy
horizontal_spacing: Number | None = None

The horizontal gap between the title and the leading and trailing controls.

build
hover_color
class-attribute
instance-attribute
​
Copy
hover_color: ColorValue | None = None

The tile's color when hovered. Only takes effect if toggle_inputs is True or if on_click is provided.

build
icon_color
class-attribute
instance-attribute
​
Copy
icon_color: ColorValue | None = None

Defines the default color for the icons present in leading and trailing.

build
is_three_line
class-attribute
instance-attribute
​
Copy
is_three_line: bool | None = None

Whether this list tile is intended to display three lines of text.

If True, then subtitle must be non-null (since it is expected to give the second and third lines of text).

If False, the list tile is treated as having one line if the subtitle is null and treated as having two lines if the subtitle is non-null.

When using a Text control for title and subtitle, you can enforce line limits using Text.max_lines.

build
leading
class-attribute
instance-attribute
​
Copy
leading: IconDataOrControl | None = None

A control to display before the title.

build
leading_and_trailing_text_style
class-attribute
instance-attribute
​
Copy
leading_and_trailing_text_style: TextStyle | None = None

The TextStyle for the leading and trailing controls.

build
min_height
class-attribute
instance-attribute
​
Copy
min_height: Number | None = None

The minimum height allocated for this control.

If None or not set, default tile heights are 56.0, 72.0, and 88.0 for one, two, and three lines of text respectively. If dense is True, these defaults are changed to 48.0, 64.0, and 76.0.

Note that, a visual density value or a large title will also adjust the default tile heights.

build
min_leading_width
class-attribute
instance-attribute
​
Copy
min_leading_width: Number | None = None

The minimum width allocated for the leading control.

build
min_vertical_padding
class-attribute
instance-attribute
​
Copy
min_vertical_padding: Number | None = None

The minimum padding on the top and bottom of the title and subtitle controls.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

The cursor to be displayed when a mouse pointer enters or is hovering over this control. The value is MouseCursor enum.

build
selected
class-attribute
instance-attribute
​
Copy
selected: bool = False

If this tile is also enabled then icons and text are rendered with the same color. By default the selected color is the theme's primary color.

build
selected_color
class-attribute
instance-attribute
​
Copy
selected_color: ColorValue | None = None

Defines the color used for icons and text when selected=True.

build
selected_tile_color
class-attribute
instance-attribute
​
Copy
selected_tile_color: ColorValue | None = None

Defines the background color of ListTile when selected=True.

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The tile's shape.

build
splash_color
class-attribute
instance-attribute
​
Copy
splash_color: ColorValue | None = None

The list tile's splash color after the control has been tapped.

build
style
class-attribute
instance-attribute
​
Copy
style: ListTileStyle | None = None

Defines the font used for the title.

Defaults to ListTileStyle.LIST.

build
subtitle
class-attribute
instance-attribute
​
Copy
subtitle: StrOrControl | None = None

Additional content displayed below the title.

If is_three_line is False, this should not wrap. If is_three_line is True, this should be configured to take a maximum of two lines. For example, you can use Text.max_lines to enforce the number of lines.

Typically a Text control.

build
subtitle_text_style
class-attribute
instance-attribute
​
Copy
subtitle_text_style: TextStyle | None = None

The TextStyle for the subtitle control.

build
text_color
class-attribute
instance-attribute
​
Copy
text_color: ColorValue | None = None

The color used for texts in title, subtitle, leading, and trailing.

build
title
class-attribute
instance-attribute
​
Copy
title: StrOrControl | None = None

A control to display as primary content of the list tile.

Typically a Text control. This should not wrap. To enforce the single line limit, use Text.max_lines.

build
title_alignment
class-attribute
instance-attribute
​
Copy
title_alignment: ListTileTitleAlignment | None = None

Defines how leading and trailing are vertically aligned relative to the titles (title and subtitle).

Defaults to ListTileTitleAlignment.THREE_LINE in Material 3 or ListTileTitleAlignment.TITLE_HEIGHT in Material 2.

build
title_text_style
class-attribute
instance-attribute
​
Copy
title_text_style: TextStyle | None = None

The TextStyle for the title control.

build
toggle_inputs
class-attribute
instance-attribute
​
Copy
toggle_inputs: bool = False

Whether clicking on a list tile should toggle the state of Radio, Checkbox or Switch inside this tile.

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

build
visual_density
class-attribute
instance-attribute
​
Copy
visual_density: VisualDensity | None = None

Defines how compact the control's layout will be.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[ListTile] | None = None

Called when a user clicks or taps the list tile.

bolt
on_long_press
class-attribute
instance-attribute
​
Copy
on_long_press: ControlEventHandler[ListTile] | None = None

Called when the user long-presses on this list tile.

Edit this page