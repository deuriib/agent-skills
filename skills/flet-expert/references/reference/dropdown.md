# Dropdown
URL: https://flet.dev/docs/controls/dropdown/

ReferenceControlsDropdown
Dropdown

A dropdown control that allows users to select a single option from a list of options.

Example:

ft.Dropdown(

    width=220,

    value="alice",

    options=[

        ft.DropdownOption(key="alice", text="Alice"),

        ft.DropdownOption(key="bob", text="Bob"),

    ],

)

Basic Dropdown

Inherits: LayoutControl

Properties
autofocus - Whether the control will be selected as the initial focus.
bgcolor - The background color of the dropdown menu in various ControlState states.
border - Border around input.
border_color - Border color.
border_radius - The border radius applied to the corners of the dropdown input field.
border_width - The width of the border in virtual pixels.
capitalization - Configures how the text input should be capitalized.
color - Text color.
content_padding - The padding for the input decoration's container.
dense - Whether the TextField is part of a dense form (i.e., uses less vertical space).
editable - Whether the dropdown allows editing of the text input field.
elevation - The dropdown's menu elevation in various ControlState states.
enable_filter - Determine if the menu list can be filtered by the text input.
enable_search - Determine if the first item that matches the text input can be highlighted.
error_style - The TextStyle to use for error_text.
error_text - Text that appears below the input border.
expanded_insets - The insets for the expanded dropdown menu.
fill_color - Background color of the dropdown input text field.
filled - Whether the decoration's container is filled with theme fill_color.
focused_border_color - Border color in focused state.
focused_border_width - Border width in focused state.
helper_style - The TextStyle to use for helper_text.
helper_text - Text that provides context about the input's value, such as how the value will be used.
hint_style - The TextStyle to use for hint_text.
hint_text - Text that suggests what sort of input the field accepts.
hover_color - The color of the dropdown input text field when hovered.
input_filter - A filter to apply to the text input field.
label - Optional text that describes the input field.
label_style - The label's text style.
leading_icon - An optional Icon at the front of the text input field inside the decoration box.
menu_height - The height of the dropdown menu.
menu_style - The menu style that defines the visual attributes of the menu.
menu_width - The width of the dropdown menu.
options - A list of options to display in the dropdown.
selected_suffix - A control to display after the selected item in the dropdown.
selected_trailing_icon - An optional icon at the end of the text field to indicate that the text field is pressed.
text - The text entered in the text field.
text_align - The text align for the TextField of the Dropdown.
text_size - Text size in virtual pixels.
text_style - The TextStyle to use for text in input text field.
trailing_icon - An icon to display at the end of the text field.
value - The key of the dropdown options corresponding to the selected option.
Events
on_blur - Called when the control has lost focus.
on_focus - Called when the control has received focus.
on_select - Called when the selected item of this dropdown has changed.
on_text_change - Called when the text input of this dropdown has changed.
Methods
focus - Requests focus for this control.
Examples​

Live example

Color selection with filtering​
import flet as ft





def main(page: ft.Page):

    page.theme_mode = ft.ThemeMode.LIGHT



    def get_options() -> list[ft.DropdownOption]:

        colors = [

            ft.Colors.RED,

            ft.Colors.BLUE,

            ft.Colors.YELLOW,

            ft.Colors.PURPLE,

            ft.Colors.LIME,

        ]

        return [

            ft.DropdownOption(

                key=color.value,

                content=ft.Text(value=color.value, color=color),

            )

            for color in colors

        ]



    def handle_dropdown_select(e: ft.Event[ft.Dropdown]):

        e.control.color = e.control.value



    page.add(

        ft.SafeArea(

            content=ft.Dropdown(

                key="color_dropdown",

                editable=True,

                label="Color",

                options=get_options(),

                on_select=handle_dropdown_select,

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Icon selection​
import flet as ft





def main(page: ft.Page):

    def get_options() -> list[ft.DropdownOption]:

        icons = [

            {"name": "Smile", "icon": ft.Icons.SENTIMENT_SATISFIED_OUTLINED},

            {"name": "Cloud", "icon": ft.Icons.CLOUD_OUTLINED},

            {"name": "Brush", "icon": ft.Icons.BRUSH_OUTLINED},

            {"name": "Heart", "icon": ft.Icons.FAVORITE},

        ]

        return [

            ft.DropdownOption(key=icon["name"], leading_icon=icon["icon"])

            for icon in icons

        ]



    page.add(

        ft.SafeArea(

            content=ft.Dropdown(

                key="icon_dropdown",

                border=ft.InputBorder.UNDERLINE,

                enable_filter=True,

                editable=True,

                leading_icon=ft.Icons.SEARCH,

                label="Icon",

                options=get_options(),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Declarative dropdown​
from dataclasses import dataclass

from typing import cast



import flet as ft





@dataclass

@ft.observable

class Form:

    color: str = "red"



    def change_color(self, new_color: str):

        print("New color:", new_color)

        self.color = new_color





@ft.component

def App():

    form, _ = ft.use_state(lambda: Form())



    return ft.SafeArea(

        content=ft.Column(

            controls=cast(

                list[ft.Control],

                [

                    ft.Text(f"Selected color: {form.color}"),

                    ft.Column(

                        controls=[

                            ft.Dropdown(

                                key="declarative_dropdown",

                                editable=True,

                                label="Color",

                                value=form.color,

                                on_select=lambda e: form.change_color(

                                    cast(str, e.control.value)

                                ),

                                options=[

                                    ft.DropdownOption(key="red", text="Red"),

                                    ft.DropdownOption(key="green", text="Green"),

                                    ft.DropdownOption(key="blue", text="Blue"),

                                ],

                            ),

                        ],

                    ),

                ],

            ),

        ),

    )





def main(page: ft.Page):

    page.render(App)





if __name__ == "__main__":

    ft.run(main)

Select and change events​
import flet as ft





def main(page: ft.Page):

    colors = [

        ft.Colors.RED,

        ft.Colors.BLUE,

        ft.Colors.YELLOW,

        ft.Colors.PURPLE,

        ft.Colors.LIME,

    ]



    def get_options() -> list[ft.DropdownOption]:

        options: list[ft.DropdownOption] = []

        for color in colors:

            options.append(

                ft.DropdownOption(

                    key=color.value,

                    content=ft.Text(value=color.value, color=color),

                    leading_icon=ft.Icon(ft.Icons.PALETTE, color=color),

                )

            )

        return options



    display_value = ft.Text()

    display_text = ft.Text()



    def dropdown_select(e: ft.Event[ft.Dropdown]):

        e.control.color = e.control.value

        display_value.value = f"VALUE changed to {e.control.value}"



    def dropdown_text_change(e: ft.Event[ft.Dropdown]):

        display_text.value = f"TEXT changed to {e.control.text}"



    page.scroll = ft.ScrollMode.AUTO

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    display_value,

                    display_text,

                    ft.Dropdown(

                        key="select_change_dropdown",

                        editable=True,

                        label="Color",

                        width=float("inf"),

                        options=get_options(),

                        on_select=dropdown_select,

                        on_text_change=dropdown_text_change,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Styled dropdowns​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Dropdown(

                        key="styled_dropdown_1",

                        text_size=20,

                        content_padding=10,

                        color=ft.Colors.PURPLE_200,

                        bgcolor=ft.Colors.BLUE_200,

                        filled=True,

                        border_radius=30,

                        border_color=ft.Colors.GREEN_800,

                        focused_border_color=ft.Colors.GREEN_ACCENT_400,

                        focused_border_width=5,

                        options=[

                            ft.DropdownOption("a", "Style 1A"),

                            ft.DropdownOption("b", "Style 1B"),

                            ft.DropdownOption("c", "Style 1C"),

                        ],

                    ),

                    ft.Dropdown(

                        key="styled_dropdown_2",

                        border_radius=30,

                        filled=True,

                        fill_color=ft.Colors.RED_400,

                        border_color=ft.Colors.TRANSPARENT,

                        bgcolor=ft.Colors.RED_200,

                        color=ft.Colors.CYAN_400,

                        focused_border_color=ft.Colors.PINK_300,

                        focused_border_width=20,

                        options=[

                            ft.DropdownOption("a", "Style 2A"),

                            ft.DropdownOption("b", "Style 2B"),

                            ft.DropdownOption("c", "Style 2C"),

                        ],

                    ),

                    ft.Dropdown(

                        key="styled_dropdown_3",

                        border_color=ft.Colors.PINK_ACCENT,

                        focused_border_color=ft.Colors.GREEN_ACCENT_400,

                        focused_border_width=25,

                        border_radius=30,

                        width=150,

                        border_width=5,

                        options=[

                            ft.DropdownOption("a", "Style 3A"),

                            ft.DropdownOption("b", "Style 3B"),

                            ft.DropdownOption("c", "Style 3C"),

                        ],

                    ),

                    ft.Container(

                        padding=ft.Padding.only(bottom=20),

                        content=ft.Dropdown(

                            key="styled_dropdown_4",

                            text_size=30,

                            color=ft.Colors.ORANGE_ACCENT,

                            border_radius=20,

                            filled=True,

                            border_width=0,

                            autofocus=True,

                            focused_border_color=ft.Colors.GREEN_100,

                            focused_border_width=10,

                            width=200,

                            height=50,

                            options=[

                                ft.dropdown.Option("a", "Style 4A"),

                                ft.dropdown.Option("b", "Style 4B"),

                                ft.dropdown.Option("c", "Style 4C"),

                            ],

                        ),

                    ),

                    ft.Dropdown(

                        key="styled_dropdown_5",

                        text_size=30,

                        border_radius=20,

                        filled=True,

                        border_width=0,

                        focused_border_color=ft.Colors.GREEN_100,

                        focused_border_width=10,

                        content_padding=20,

                        width=200,

                        options=[

                            ft.DropdownOption(

                                key="a",

                                text="Style 5A",

                                style=ft.ButtonStyle(

                                    shape=ft.BeveledRectangleBorder(radius=15),

                                    color={

                                        ft.ControlState.HOVERED: ft.Colors.WHITE,

                                        ft.ControlState.FOCUSED: ft.Colors.BLUE,

                                        ft.ControlState.DEFAULT: ft.Colors.BLACK,

                                    },

                                ),

                            ),

                            ft.DropdownOption(

                                key="b",

                                text="Style 5B",

                                style=ft.ButtonStyle(

                                    shape=ft.BeveledRectangleBorder(radius=15),

                                    color={

                                        ft.ControlState.HOVERED: ft.Colors.WHITE,

                                        ft.ControlState.FOCUSED: ft.Colors.BLUE,

                                        ft.ControlState.DEFAULT: ft.Colors.BLACK,

                                    },

                                ),

                            ),

                            ft.DropdownOption(

                                key="c",

                                text="Style 5C",

                                style=ft.ButtonStyle(

                                    shape=ft.BeveledRectangleBorder(radius=15),

                                    color={

                                        ft.ControlState.HOVERED: ft.Colors.WHITE,

                                        ft.ControlState.FOCUSED: ft.Colors.BLUE,

                                        ft.ControlState.DEFAULT: ft.Colors.BLACK,

                                    },

                                ),

                            ),

                        ],

                    ),

                ],

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

Whether the control will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ControlStateValue[ColorValue] | None = None

The background color of the dropdown menu in various ControlState states.

build
border
class-attribute
instance-attribute
​
Copy
border: InputBorder | None = None

Border around input.

Defaults to InputBorder.OUTLINE.

build
border_color
class-attribute
instance-attribute
​
Copy
border_color: ColorValue | None = None

Border color.

TIP

Set to Colors.TRANSPARENT to hide the border.

build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue | None = None

The border radius applied to the corners of the dropdown input field. Accepts a value in virtual pixels or a BorderRadiusValue object. If set to None, the default border radius defined by the theme or system is used.

build
border_width
class-attribute
instance-attribute
​
Copy
border_width: Number = 1

The width of the border in virtual pixels.

TIP

Set to 0 to completely remove the border.

build
capitalization
class-attribute
instance-attribute
​
Copy
capitalization: TextCapitalization | None = None

Configures how the text input should be capitalized.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

Text color.

build
content_padding
class-attribute
instance-attribute
​
Copy
content_padding: PaddingValue | None = None

The padding for the input decoration's container.

build
dense
class-attribute
instance-attribute
​
Copy
dense: bool = False

Whether the TextField is part of a dense form (i.e., uses less vertical space).

build
editable
class-attribute
instance-attribute
​
Copy
editable: bool = False

Whether the dropdown allows editing of the text input field.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: ControlStateValue[Number | None] | None = 8

The dropdown's menu elevation in various ControlState states.

build
enable_filter
class-attribute
instance-attribute
​
Copy
enable_filter: bool = False

Determine if the menu list can be filtered by the text input. Defaults to false.

If set to true, dropdown menu will show a filtered list. The filtered list will contain items that match the text provided by the input field, with a case-insensitive comparison.

build
enable_search
class-attribute
instance-attribute
​
Copy
enable_search: bool = True

Determine if the first item that matches the text input can be highlighted.

build
error_style
class-attribute
instance-attribute
​
Copy
error_style: TextStyle | None = None

The TextStyle to use for error_text.

build
error_text
class-attribute
instance-attribute
​
Copy
error_text: str | None = None

Text that appears below the input border.

If non-null, the border's color animates to red and the helper_text is not shown.

build
expanded_insets
class-attribute
instance-attribute
​
Copy
expanded_insets: PaddingValue | None = None

The insets for the expanded dropdown menu.

build
fill_color
class-attribute
instance-attribute
​
Copy
fill_color: ColorValue | None = None

Background color of the dropdown input text field.

NOTE

Will not be visible if filled=False.

build
filled
class-attribute
instance-attribute
​
Copy
filled: bool = False

Whether the decoration's container is filled with theme fill_color.

build
focused_border_color
class-attribute
instance-attribute
​
Copy
focused_border_color: ColorValue | None = None

Border color in focused state.

build
focused_border_width
class-attribute
instance-attribute
​
Copy
focused_border_width: Number | None = None

Border width in focused state.

build
helper_style
class-attribute
instance-attribute
​
Copy
helper_style: TextStyle | None = None

The TextStyle to use for helper_text.

build
helper_text
class-attribute
instance-attribute
​
Copy
helper_text: str | None = None

Text that provides context about the input's value, such as how the value will be used.

If non-null, the text is displayed below the input decorator, in the same location as error_text. If a non-null error_text value is specified then the helper text is not shown.

build
hint_style
class-attribute
instance-attribute
​
Copy
hint_style: TextStyle | None = None

The TextStyle to use for hint_text.

build
hint_text
class-attribute
instance-attribute
​
Copy
hint_text: str | None = None

Text that suggests what sort of input the field accepts.

Displayed on top of the input when it's empty and either (a) label is null or (b) the input has the focus.

build
hover_color
class-attribute
instance-attribute
​
Copy
hover_color: ColorValue | None = None

The color of the dropdown input text field when hovered.

build
input_filter
class-attribute
instance-attribute
​
Copy
input_filter: InputFilter | None = None

A filter to apply to the text input field.

build
label
class-attribute
instance-attribute
​
Copy
label: StrOrControl | None = None

Optional text that describes the input field.

When the input field is empty and unfocused, the label is displayed on top of the input field (i.e., at the same location on the screen where text may be entered in the input field). When the input field receives focus (or if the field is non-empty) the label moves above, either vertically adjacent to, or to the center of the input field.

build
label_style
class-attribute
instance-attribute
​
Copy
label_style: TextStyle | None = None

The label's text style.

build
leading_icon
class-attribute
instance-attribute
​
Copy
leading_icon: IconDataOrControl | None = None

An optional Icon at the front of the text input field inside the decoration box.

If this is not null, the menu items will have extra paddings to be aligned with the text in the text field.

build
menu_height
class-attribute
instance-attribute
​
Copy
menu_height: Number | None = None

The height of the dropdown menu.

If this is None, the menu will display as many items as possible on the screen.

build
menu_style
class-attribute
instance-attribute
​
Copy
menu_style: MenuStyle | None = None

The menu style that defines the visual attributes of the menu.

The default width of the menu is set to the width of the text field.

build
menu_width
class-attribute
instance-attribute
​
Copy
menu_width: Number | None = None

The width of the dropdown menu.

If this is None, the menu width will be the same as input textfield width.

build
options
class-attribute
instance-attribute
​
Copy
options: list[DropdownOption] = field(default_factory=list)

A list of options to display in the dropdown.

build
selected_suffix
class-attribute
instance-attribute
​
Copy
selected_suffix: Control | None = None

A control to display after the selected item in the dropdown.

build
selected_trailing_icon
class-attribute
instance-attribute
​
Copy
selected_trailing_icon: IconDataOrControl | None = None

An optional icon at the end of the text field to indicate that the text field is pressed.

build
text
class-attribute
instance-attribute
​
Copy
text: str | None = None

The text entered in the text field.

build
text_align
class-attribute
instance-attribute
​
Copy
text_align: TextAlign = TextAlign.START

The text align for the TextField of the Dropdown.

build
text_size
class-attribute
instance-attribute
​
Copy
text_size: Number | None = None

Text size in virtual pixels.

build
text_style
class-attribute
instance-attribute
​
Copy
text_style: TextStyle | None = None

The TextStyle to use for text in input text field.

build
trailing_icon
class-attribute
instance-attribute
​
Copy
trailing_icon: IconDataOrControl | None = None

An icon to display at the end of the text field.

build
value
class-attribute
instance-attribute
​
Copy
value: str | None = None

The key of the dropdown options corresponding to the selected option.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[Dropdown] | None = None

Called when the control has lost focus.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[Dropdown] | None = None

Called when the control has received focus.

bolt
on_select
class-attribute
instance-attribute
​
Copy
on_select: ControlEventHandler[Dropdown] | None = None

Called when the selected item of this dropdown has changed.

bolt
on_text_change
class-attribute
instance-attribute
​
Copy
on_text_change: ControlEventHandler[Dropdown] | None = None

Called when the text input of this dropdown has changed.

Methods​
deployed_code
focus
async
​
Copy
focus()

Requests focus for this control.

Edit this page