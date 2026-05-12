# AutoComplete
URL: https://flet.dev/docs/controls/autocomplete

ReferenceControlsAutoComplete
AutoComplete

Helps the user make a selection by entering some text and choosing from among a list of displayed options.

Inherits: LayoutControl

Properties
selected_index - The index of the (last) selected suggestion.
suggestions - A list of AutoCompleteSuggestion controls representing the suggestions to be displayed.
suggestions_max_height - The maximum - visual - height of the suggestions list.
value - Current text displayed in the input field.
Events
on_change - Called when the input text changes.
on_select - Called when a suggestion is selected.
Examples​

Live example

Basic example​
import flet as ft



numbers = [

    ("one 1", "One"),

    ("two 2", "Two"),

    ("three 3", "Three"),

    ("four 4", "Four"),

    ("five 5", "Five"),

    ("six 6", "Six"),

    ("seven 7", "Seven"),

    ("eight 8", "Eight"),

    ("nine 9", "Nine"),

    ("ten 10", "Ten"),

]





def main(page: ft.Page):

    page.theme_mode = ft.ThemeMode.LIGHT

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    page.vertical_alignment = ft.MainAxisAlignment.CENTER



    def handle_change(e: ft.Event[ft.AutoComplete]):

        info.value = f"Current input 👀: {e.data!r} \n"



    def handle_select(e: ft.AutoCompleteSelectEvent):

        info.value = (

            f"Current input 👀: {e.control.value!r} \n"

            f"Your selection: {e.selection.value}"

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.AutoComplete(

                        value="One",

                        width=200,

                        on_change=handle_change,

                        on_select=handle_select,

                        suggestions=[

                            ft.AutoCompleteSuggestion(key=key, value=value)

                            for key, value in numbers

                        ],

                    ),

                    info := ft.Text(

                        "Enter a number (in words or digits) to get suggestions."

                    ),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
selected_index
property
​
Copy
selected_index: int | None

The index of the (last) selected suggestion.

It is None until a suggestion has been selected from the UI.

NOTE

This property is read-only.

build
suggestions
class-attribute
instance-attribute
​
Copy
suggestions: list[AutoCompleteSuggestion] = field(
    default_factory=list
)

A list of AutoCompleteSuggestion controls representing the suggestions to be displayed.

NOTE
A valid AutoCompleteSuggestion must have at least a key or value specified, else it will be ignored. If only key is provided, value will be set to key as fallback and vice versa.
The internal filtration process of the suggestions (based on their keys) with respect to the user's input is case-insensitive because the comparison is done in lowercase.
build
suggestions_max_height
class-attribute
instance-attribute
​
Copy
suggestions_max_height: Number = 200

The maximum - visual - height of the suggestions list.

build
value
class-attribute
instance-attribute
​
Copy
value: str = ''

Current text displayed in the input field.

This value reflects user input even if it does not match any provided suggestion.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[AutoComplete] | None = None

Called when the input text changes.

bolt
on_select
class-attribute
instance-attribute
​
Copy
on_select: EventHandler[AutoCompleteSelectEvent] | None = (
    None
)

Called when a suggestion is selected.

Edit this page