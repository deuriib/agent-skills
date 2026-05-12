# TextField
URL: https://flet.dev/docs/controls/textfield

ReferenceControlsTextField
TextField

A text field lets the user enter text, either with hardware keyboard or with an onscreen keyboard.

Example:

ft.TextField(label="Name", hint_text="Jane Doe")

Basic TextField

Inherits: FormFieldControl, AdaptiveControl

Properties
always_call_on_tap - TBD
animate_cursor_opacity - TBD
autocorrect - Whether to enable autocorrection.
autofill_hints - Helps the autofill service identify the type of this text input.
autofocus - True if the control will be selected as the initial focus.
can_request_focus - TBD
can_reveal_password - Displays a toggle icon button that allows revealing the entered password.
capitalization - Enables automatic on-the-fly capitalization of entered text.
clip_behavior - TBD
cursor_color - The color of TextField cursor.
cursor_error_color - TBD
cursor_height - Sets cursor height.
cursor_radius - Sets cursor radius.
cursor_width - Sets cursor width.
enable_ime_personalized_learning - TBD
enable_interactive_selection - TBD
enable_stylus_handwriting - TBD
enable_suggestions - Whether to show input suggestions as the user types.
ignore_pointers - TBD
ignore_up_down_keys - Whether to intercept Arrow-Up and Arrow-Down when this field has focus.
input_filter - Provides as-you-type filtering/validation.
keyboard_brightness - TBD
keyboard_type - The type of keyboard to use for editing the text.
max_length - Limits a maximum number of characters that can be entered into TextField.
max_lines - The maximum number of lines to show at one time, wrapping if necessary.
min_lines - The minimum number of lines to occupy when the content spans fewer lines.
mouse_cursor - TBD
multiline - Whether this field can contain multiple lines of text.
obscuring_character - TBD
password - Whether to hide the text being edited.
read_only - Whether the text can be changed.
scroll_padding - TBD
selection - Represents the current text selection or caret position in the field.
selection_color - The color of TextField selection.
shift_enter - Changes the behavior of Enter button in multiline textfield to be chat-like, i.e.
show_cursor - Whether the field's cursor is to be shown.
smart_dashes_type - Whether to allow the platform to automatically format dashes.
smart_quotes_type - Whether to allow the platform to automatically format quotes.
strut_style - TBD
text_align - How the text should be aligned horizontally.
value - Current value of this text field.
Events
on_blur - Called when the control has lost focus.
on_change - Called when the typed input for the TextField has changed.
on_click - TBD
on_focus - Called when the control has received focus.
on_selection_change - Called when the text selection or caret position changes.
on_submit - Called when user presses ENTER while focus is on TextField.
on_tap_outside - TBD
Examples​

Live example

Basic Example​
import flet as ft





def main(page: ft.Page):

    def handle_button_click(e: ft.Event[ft.Button]):

        message.value = (

            f"Textboxes values are:  '{tb1.value}', '{tb2.value}', "

            f"'{tb3.value}', '{tb4.value}', '{tb5.value}'."

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    tb1 := ft.TextField(label="Standard"),

                    tb2 := ft.TextField(

                        label="Disabled",

                        disabled=True,

                        value="First name",

                    ),

                    tb3 := ft.TextField(

                        label="Read-only",

                        read_only=True,

                        value="Last name",

                    ),

                    tb4 := ft.TextField(

                        label="With placeholder",

                        hint_text="Please enter text here",

                    ),

                    tb5 := ft.TextField(

                        label="With an icon",

                        icon=ft.Icons.EMOJI_EMOTIONS,

                    ),

                    ft.Button(content="Submit", on_click=handle_button_click),

                    message := ft.Text(),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Handling change events​
import flet as ft





def main(page: ft.Page):

    def handle_field_change(e: ft.Event[ft.TextField]):

        message.value = e.control.value



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextField(

                        key="handling_change_textfield",

                        label="Textbox with 'change' event:",

                        on_change=handle_field_change,

                    ),

                    message := ft.Text(),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Handling selection changes​
import flet as ft





def main(page: ft.Page):

    page.title = "Text selection"



    def handle_selection_change(e: ft.TextSelectionChangeEvent[ft.TextField]):

        selection.value = (

            f"Selection: '{e.selected_text}'" if e.selected_text else "No selection."

        )

        selection_details.value = f"start={e.selection.start}, end={e.selection.end}"

        caret.value = f"Caret position: {e.selection.end}"



    async def select_characters(e: ft.Event[ft.Button]):

        await field.focus()

        field.selection = ft.TextSelection(

            base_offset=0, extent_offset=len(field.value)

        )



    async def move_caret(e: ft.Event[ft.Button]):

        await field.focus()

        field.selection = ft.TextSelection(base_offset=0, extent_offset=0)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                spacing=10,

                controls=[

                    field := ft.TextField(

                        value=(

                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

                        ),

                        multiline=True,

                        min_lines=3,

                        autofocus=True,

                        on_selection_change=handle_selection_change,

                    ),

                    selection := ft.Text("Select some text from the field."),

                    selection_details := ft.Text(),

                    caret := ft.Text("Caret position: -"),

                    ft.Button(

                        content="Select all text",

                        on_click=select_characters,

                    ),

                    ft.Button(

                        content="Move caret to start",

                        on_click=move_caret,

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Password with reveal button​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.TextField(

                key="password_textfield",

                label="Password with reveal button",

                password=True,

                can_reveal_password=True,

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Multiline fields​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextField(

                        key="multiline_standard",

                        label="Standard",

                        multiline=True,

                    ),

                    ft.TextField(

                        label="Disabled",

                        multiline=True,

                        disabled=True,

                        value="line1\nline2\nline3\nline4\nline5",

                    ),

                    ft.TextField(

                        key="multiline_auto_height",

                        label="Auto adjusted height with max lines",

                        multiline=True,

                        min_lines=1,

                        max_lines=3,

                    ),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Underlined and borderless TextFields​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextField(

                        key="underlined_field",

                        label="Underlined",

                        border=ft.InputBorder.UNDERLINE,

                        hint_text="Enter text here",

                    ),

                    ft.TextField(

                        key="underlined_filled_field",

                        label="Underlined filled",

                        border=ft.InputBorder.UNDERLINE,

                        filled=True,

                        hint_text="Enter text here",

                    ),

                    ft.TextField(

                        key="borderless_field",

                        label="Borderless",

                        border=ft.InputBorder.NONE,

                        hint_text="Enter text here",

                    ),

                    ft.TextField(

                        key="borderless_filled_field",

                        label="Borderless filled",

                        border=ft.InputBorder.NONE,

                        filled=True,

                        hint_text="Enter text here",

                    ),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Setting prefixes and suffixes​
import flet as ft





def main(page: ft.Page):

    def handle_button_click(e: ft.Event[ft.Button]):

        message.value = (

            "Textboxes values are: "

            f"'{prefix_field.value}', "

            f"'{suffix_field.value}', "

            f"'{prefix_suffix_field.value}', "

            f"'{color_field.value}'."

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    prefix_field := ft.TextField(

                        key="prefix_field",

                        label="With prefix",

                        prefix="https://",

                    ),

                    suffix_field := ft.TextField(

                        key="suffix_field",

                        label="With suffix",

                        suffix=".com",

                    ),

                    prefix_suffix_field := ft.TextField(

                        key="prefix_suffix_field",

                        label="With prefix and suffix",

                        prefix="https://",

                        suffix=".com",

                        enable_interactive_selection=True,

                    ),

                    color_field := ft.TextField(

                        key="color_field",

                        label="My favorite color",

                        icon=ft.Icons.FORMAT_SIZE,

                        hint_text="Type your favorite color",

                        helper="You can type only one color",

                        counter="{value_length}/{max_length} chars used",

                        prefix_icon=ft.Icons.COLOR_LENS,

                        suffix="...is your color",

                        max_length=20,

                    ),

                    ft.Button(

                        key="submit_button",

                        content="Submit",

                        on_click=handle_button_click,

                    ),

                    message := ft.Text(),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Styled TextField​
import flet as ft





async def main(page: ft.Page):

    page.padding = 50



    tf = ft.TextField(

        key="styled_textfield",

        text_size=30,

        cursor_color=ft.Colors.RED,

        selection_color=ft.Colors.YELLOW,

        color=ft.Colors.PINK,

        bgcolor=ft.Colors.BLACK_26,

        filled=True,

        focused_color=ft.Colors.GREEN,

        focused_bgcolor=ft.Colors.CYAN_200,

        border_radius=30,

        border_color=ft.Colors.GREEN_800,

        focused_border_color=ft.Colors.GREEN_ACCENT_400,

        max_length=20,

        capitalization=ft.TextCapitalization.CHARACTERS,

    )



    page.add(

        ft.SafeArea(

            content=tf,

        )

    )





if __name__ == "__main__":

    ft.run(main)

Custom label, hint, helper, and counter texts and styles​
import flet as ft





def main(page: ft.Page):

    page.theme_mode = ft.ThemeMode.LIGHT



    def handle_field_change(e: ft.Event[ft.TextField]):

        message.value = e.control.value



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.TextField(

                        key="label_hint_helper_counter_textfield",

                        on_change=handle_field_change,

                        text_style=ft.TextStyle(

                            size=15,

                            italic=True,

                            color=ft.Colors.DEEP_ORANGE_600,

                            bgcolor=ft.Colors.LIME_ACCENT_200,

                        ),

                        label="Label",

                        label_style=ft.TextStyle(

                            size=17,

                            weight=ft.FontWeight.BOLD,

                            italic=True,

                            color=ft.Colors.BLUE,

                            bgcolor=ft.Colors.RED_700,

                        ),

                        hint_text="Hint",

                        hint_style=ft.TextStyle(

                            size=15,

                            weight=ft.FontWeight.BOLD,

                            italic=True,

                            color=ft.Colors.PINK_ACCENT,

                            bgcolor=ft.Colors.BROWN_400,

                        ),

                        helper="Helper",

                        helper_style=ft.TextStyle(

                            size=14,

                            weight=ft.FontWeight.BOLD,

                            color=ft.Colors.DEEP_PURPLE,

                            bgcolor=ft.Colors.BLUE_50,

                        ),

                        counter="Counter",

                        counter_style=ft.TextStyle(

                            size=14,

                            italic=True,

                            color=ft.Colors.YELLOW,

                            bgcolor=ft.Colors.GREEN_500,

                        ),

                    ),

                    message := ft.Text(),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
always_call_on_tap
class-attribute
instance-attribute
​
Copy
always_call_on_tap: bool = False

TBD

build
animate_cursor_opacity
class-attribute
instance-attribute
​
Copy
animate_cursor_opacity: bool | None = None

TBD

build
autocorrect
class-attribute
instance-attribute
​
Copy
autocorrect: bool = True

Whether to enable autocorrection.

build
autofill_hints
class-attribute
instance-attribute
​
Copy
autofill_hints: AutofillHint | list[AutofillHint] | None = (
    None
)

Helps the autofill service identify the type of this text input.

More information here.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool = False

True if the control will be selected as the initial focus. If there is more than one control on a page with autofocus set, then the first one added to the page will get focus.

build
can_request_focus
class-attribute
instance-attribute
​
Copy
can_request_focus: bool = True

TBD

build
can_reveal_password
class-attribute
instance-attribute
​
Copy
can_reveal_password: bool = False

Displays a toggle icon button that allows revealing the entered password. Is shown if both password and can_reveal_password are True.

The icon is displayed in the same location as suffix and in case both can_reveal_password/password and suffix are provided, then the suffix won't be shown.

build
capitalization
class-attribute
instance-attribute
​
Copy
capitalization: TextCapitalization | None = None

Enables automatic on-the-fly capitalization of entered text.

Defaults to TextCapitalization.NONE.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.HARD_EDGE

TBD

build
cursor_color
class-attribute
instance-attribute
​
Copy
cursor_color: ColorValue | None = None

The color of TextField cursor.

build
cursor_error_color
class-attribute
instance-attribute
​
Copy
cursor_error_color: ColorValue | None = None

TBD

build
cursor_height
class-attribute
instance-attribute
​
Copy
cursor_height: Number | None = None

Sets cursor height.

build
cursor_radius
class-attribute
instance-attribute
​
Copy
cursor_radius: Number | None = None

Sets cursor radius.

build
cursor_width
class-attribute
instance-attribute
​
Copy
cursor_width: Number = 2.0

Sets cursor width.

build
enable_ime_personalized_learning
class-attribute
instance-attribute
​
Copy
enable_ime_personalized_learning: bool = True

TBD

build
enable_interactive_selection
class-attribute
instance-attribute
​
Copy
enable_interactive_selection: bool = True

TBD

build
enable_stylus_handwriting
class-attribute
instance-attribute
​
Copy
enable_stylus_handwriting: bool = True

TBD

build
enable_suggestions
class-attribute
instance-attribute
​
Copy
enable_suggestions: bool = True

Whether to show input suggestions as the user types.

This flag only affects Android. On iOS, suggestions are tied directly to autocorrect, so that suggestions are only shown when autocorrect is True. On Android autocorrection and suggestion are controlled separately.

build
ignore_pointers
class-attribute
instance-attribute
​
Copy
ignore_pointers: bool = False

TBD

build
ignore_up_down_keys
class-attribute
instance-attribute
​
Copy
ignore_up_down_keys: bool = False

Whether to intercept Arrow-Up and Arrow-Down when this field has focus.

When set to True, pressing those keys does not move the caret to the beginning or end of the text respectively.

build
input_filter
class-attribute
instance-attribute
​
Copy
input_filter: InputFilter | None = None

Provides as-you-type filtering/validation.

Similar to the on_change callback, the input filters are not applied when the content of the field is changed programmatically.

build
keyboard_brightness
class-attribute
instance-attribute
​
Copy
keyboard_brightness: Brightness | None = None

TBD

build
keyboard_type
class-attribute
instance-attribute
​
Copy
keyboard_type: KeyboardType = KeyboardType.TEXT

The type of keyboard to use for editing the text.

build
max_length
class-attribute
instance-attribute
​
Copy
max_length: int | None = None

Limits a maximum number of characters that can be entered into TextField.

Raises:

ValueError - If it is not strictly greater than 0 or equal to -1.
build
max_lines
class-attribute
instance-attribute
​
Copy
max_lines: int | None = None

The maximum number of lines to show at one time, wrapping if necessary.

This affects the height of the field itself and does not limit the number of lines that can be entered into the field.

If this is 1 (the default), the text will not wrap, but will scroll horizontally instead.

Raises:

ValueError - If it is not strictly greater than 0.
ValueError - If it is not greater than or equal to min_lines when both are set.
build
min_lines
class-attribute
instance-attribute
​
Copy
min_lines: int | None = None

The minimum number of lines to occupy when the content spans fewer lines.

This affects the height of the field itself and does not limit the number of lines that can be entered into the field.

Defaults to 1.

Raises:

ValueError - If it is not strictly greater than 0.
ValueError - If it is not less than or equal to max_lines when both are set.
build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: MouseCursor | None = None

TBD

build
multiline
class-attribute
instance-attribute
​
Copy
multiline: bool = False

Whether this field can contain multiple lines of text.

build
obscuring_character
class-attribute
instance-attribute
​
Copy
obscuring_character: str = '•'

TBD

build
password
class-attribute
instance-attribute
​
Copy
password: bool = False

Whether to hide the text being edited.

build
read_only
class-attribute
instance-attribute
​
Copy
read_only: bool = False

Whether the text can be changed.

When this is set to True, the text cannot be modified by any shortcut or keyboard operation. The text is still selectable.

build
scroll_padding
class-attribute
instance-attribute
​
Copy
scroll_padding: PaddingValue = 20

TBD

build
selection
class-attribute
instance-attribute
​
Copy
selection: TextSelection | None = None

Represents the current text selection or caret position in the field.

When the user selects text, this property is updated to reflect the selected range. If no text is selected, it contains an empty range indicating the caret position.

Setting this property visually updates the field's selection to match the given value, and hence leads to the on_selection_change event being triggered. To ensure the selection is visible and the event is fired, the text field must be focused. Call focus on the field before setting this property.

build
selection_color
class-attribute
instance-attribute
​
Copy
selection_color: ColorValue | None = None

The color of TextField selection.

build
shift_enter
class-attribute
instance-attribute
​
Copy
shift_enter: bool = False

Changes the behavior of Enter button in multiline textfield to be chat-like, i.e. new line can be added with Shift+Enter and pressing just Enter fires on_submit event.

build
show_cursor
class-attribute
instance-attribute
​
Copy
show_cursor: bool = True

Whether the field's cursor is to be shown.

build
smart_dashes_type
class-attribute
instance-attribute
​
Copy
smart_dashes_type: bool = True

Whether to allow the platform to automatically format dashes.

This flag only affects iOS versions 11 and above. As an example of what this does, two consecutive hyphen characters will be automatically replaced with one en dash, and three consecutive hyphens will become one em dash.

build
smart_quotes_type
class-attribute
instance-attribute
​
Copy
smart_quotes_type: bool = True

Whether to allow the platform to automatically format quotes.

This flag only affects iOS. As an example of what this does, a standard vertical double quote character will be automatically replaced by a left or right double quote depending on its position in a word.

build
strut_style
class-attribute
instance-attribute
​
Copy
strut_style: StrutStyle | None = None

TBD

build
text_align
class-attribute
instance-attribute
​
Copy
text_align: TextAlign | None = None

How the text should be aligned horizontally.

Defaults to TextAlign.LEFT.

build
value
class-attribute
instance-attribute
​
Copy
value: str = ''

Current value of this text field.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[TextField] | None = None

Called when the control has lost focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[TextField] | None = None

Called when the typed input for the TextField has changed.

bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[TextField] | None = None

TBD

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[TextField] | None = None

Called when the control has received focus.

bolt
on_selection_change
class-attribute
instance-attribute
​
Copy
on_selection_change: (
    EventHandler[TextSelectionChangeEvent[TextField]] | None
) = None

Called when the text selection or caret position changes.

This can be triggered either by user interaction (selecting text or moving the caret) or programmatically (through the selection property).

bolt
on_submit
class-attribute
instance-attribute
​
Copy
on_submit: ControlEventHandler[TextField] | None = None

Called when user presses ENTER while focus is on TextField.

bolt
on_tap_outside
class-attribute
instance-attribute
​
Copy
on_tap_outside: ControlEventHandler[TextField] | None = None

TBD

Edit this page