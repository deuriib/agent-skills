# CodeEditor
URL: https://flet.dev/docs/controls/codeeditor/

ReferenceControlsCodeEditor
CodeEditor

Edit and highlight source code.

Basic CodeEditor

Inherits: LayoutControl

Properties
autocomplete - Whether autocomplete is enabled.
autocomplete_words - Words offered by autocomplete.
autofocus - Whether this editor should focus itself if nothing else is focused.
code_theme - Syntax highlighting theme.
gutter_style - Gutter styling.
issues - List of code analysis issues to display in the editor gutter.
language - Syntax highlighting language.
padding - Padding around the editor.
read_only - Whether the editor is read-only.
selection - Represents the current text selection or caret position in the editor.
text_style - Text style for the editor content.
value - Full text including folded sections and service comments.
Events
on_blur - Called when the editor loses focus.
on_change - Called when the editor text changes.
on_focus - Called when the editor receives focus.
on_selection_change - Called when the text selection or caret position changes.
Methods
focus - Request focus for this editor.
fold_at - Fold the block starting at the given line number.
fold_comment_at_line_zero - Fold the comment block at line 0.
fold_imports - Fold import sections.
Usage​

Add flet-code-editor to your project dependencies:

uv
pip
uv add flet-code-editor

Examples​
Basic example​
import flet_code_editor as fce



import flet as ft



CODE = """import flet as ft



def main(page: ft.Page):

    counter = ft.Text("0", size=50, data=0)



    def btn_click(e):

        counter.data += 1

        counter.value = str(counter.data)

        counter.update()



    page.floating_action_button = ft.FloatingActionButton(

        icon=ft.Icons.ADD, on_click=btn_click

    )

    page.add(

        ft.SafeArea(

            ft.Container(

                counter,

                alignment=ft.Alignment.CENTER,

                expand=True,

            ),

            expand=True,

        ),

    )



ft.run(main)

"""





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=fce.CodeEditor(

                language=fce.CodeLanguage.PYTHON,

                code_theme=fce.CodeTheme.ATOM_ONE_LIGHT,

                value=CODE,

                expand=True,

                on_change=lambda e: print("Changed:", e.data),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Selection handling​
import flet_code_editor as fce



import flet as ft



CODE = """import flet as ft



def main(page: ft.Page):

    counter = ft.Text("0", size=50, data=0)



    def btn_click(e):

        counter.data += 1

        counter.value = str(counter.data)

        counter.update()



    page.floating_action_button = ft.FloatingActionButton(

        icon=ft.Icons.ADD, on_click=btn_click

    )

    page.add(

        ft.SafeArea(

            ft.Container(

                counter,

                alignment=ft.Alignment.CENTER,

                expand=True,

            ),

            expand=True,

        ),

    )



ft.run(main)

"""



font_families = [

    # Apple platforms

    "SF Mono",

    "Menlo",

    # Android

    "Roboto Mono",

    # Windows

    "Consolas",

    # Linux

    "Ubuntu Mono",

    # Universal fallbacks

    "Courier New",

]





def main(page: ft.Page):

    page.title = "CodeEditor selection"

    max_selection_preview = 80



    theme = fce.CustomCodeTheme(

        keyword=ft.TextStyle(color=ft.Colors.INDIGO_600, weight=ft.FontWeight.W_600),

        string=ft.TextStyle(color=ft.Colors.RED_700),

        comment=ft.TextStyle(color=ft.Colors.GREY_600, italic=True),

    )



    text_style = ft.TextStyle(

        font_family="monospace", font_family_fallback=font_families, size=12

    )



    gutter_style = fce.GutterStyle(

        text_style=ft.TextStyle(

            font_family="monospace", font_family_fallback=font_families, size=12

        ),

        show_line_numbers=True,

        show_folding_handles=True,

        width=60,

    )



    def handle_selection_change(e: ft.TextSelectionChangeEvent[fce.CodeEditor]):

        if e.selected_text:

            normalized = " ".join(e.selected_text.split())

            suffix = "..." if len(normalized) > max_selection_preview else ""

            preview = normalized[:max_selection_preview]

            selection.value = (

                f"Selection ({len(e.selected_text)} chars): '{preview}{suffix}'"

            )

        else:

            selection.value = "No selection."

        selection_details.value = f"start={e.selection.start}, end={e.selection.end}"

        caret.value = f"Caret position: {e.selection.end}"



    async def select_all(e: ft.Event[ft.Button]):

        await editor.focus()

        editor.selection = ft.TextSelection(

            base_offset=0,

            extent_offset=len(editor.value or ""),

        )



    async def move_caret_to_start(e: ft.Event[ft.Button]):

        await editor.focus()

        editor.selection = ft.TextSelection(base_offset=0, extent_offset=0)



    page.padding = 0

    page.spacing = 0

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                spacing=10,

                expand=True,

                controls=[

                    editor := fce.CodeEditor(

                        language=fce.CodeLanguage.PYTHON,

                        code_theme=theme,

                        autocomplete=True,

                        autocomplete_words=[

                            "Container",

                            "Button",

                            "Text",

                            "Row",

                            "Column",

                        ],

                        value=CODE,

                        text_style=text_style,

                        gutter_style=gutter_style,

                        padding=10,

                        on_selection_change=handle_selection_change,

                        expand=True,

                    ),

                    ft.Column(

                        margin=10,

                        controls=[

                            selection := ft.Text("Select some text from the editor."),

                            selection_details := ft.Text(),

                            caret := ft.Text("Caret position: -"),

                            ft.Row(

                                controls=[

                                    ft.Button("Select all text", on_click=select_all),

                                    ft.Button(

                                        "Move caret to start",

                                        on_click=move_caret_to_start,

                                    ),

                                ],

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Folding and initial selection​
import flet_code_editor as fce



import flet as ft



CODE = """# 1

# 2

# 3

import json

import textwrap



print("Folding demo")

"""





def main(page: ft.Page):

    editor = fce.CodeEditor(

        language=fce.CodeLanguage.PYTHON,

        value=CODE,

        selection=ft.TextSelection(base_offset=41, extent_offset=62),

        autofocus=True,

        expand=True,

        on_selection_change=lambda e: print("Selection:", e),

    )



    async def fold_imports():

        await editor.fold_imports()



    async def fold_comment():

        await editor.fold_comment_at_line_zero()



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                controls=[

                    ft.Row(

                        controls=[

                            ft.Button("Fold imports", on_click=fold_imports),

                            ft.Button("Fold comment", on_click=fold_comment),

                        ]

                    ),

                    editor,

                ]

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
autocomplete
class-attribute
instance-attribute
​
Copy
autocomplete: bool | None = False

Whether autocomplete is enabled.

build
autocomplete_words
class-attribute
instance-attribute
​
Copy
autocomplete_words: list[str] | None = None

Words offered by autocomplete.

build
autofocus
class-attribute
instance-attribute
​
Copy
autofocus: bool | None = False

Whether this editor should focus itself if nothing else is focused.

build
code_theme
class-attribute
instance-attribute
​
Copy
code_theme: CodeTheme | CustomCodeTheme | None = None

Syntax highlighting theme.

build
gutter_style
class-attribute
instance-attribute
​
Copy
gutter_style: GutterStyle | None = None

Gutter styling.

build
issues
class-attribute
instance-attribute
​
Copy
issues: list[Issue] = field(default_factory=list)

List of code analysis issues to display in the editor gutter.

build
language
class-attribute
instance-attribute
​
Copy
language: CodeLanguage | None = None

Syntax highlighting language.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

Padding around the editor.

build
read_only
class-attribute
instance-attribute
​
Copy
read_only: bool | None = False

Whether the editor is read-only.

build
selection
class-attribute
instance-attribute
​
Copy
selection: TextSelection | None = None

Represents the current text selection or caret position in the editor.

Setting this property updates the editor selection and may trigger on_selection_change when the editor is focused.

build
text_style
class-attribute
instance-attribute
​
Copy
text_style: TextStyle | None = None

Text style for the editor content.

build
value
class-attribute
instance-attribute
​
Copy
value: str | None = None

Full text including folded sections and service comments.

Events​
bolt
on_blur
class-attribute
instance-attribute
​
Copy
on_blur: ControlEventHandler[CodeEditor] | None = None

Called when the editor loses focus.

bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[CodeEditor] | None = None

Called when the editor text changes.

bolt
on_focus
class-attribute
instance-attribute
​
Copy
on_focus: ControlEventHandler[CodeEditor] | None = None

Called when the editor receives focus.

bolt
on_selection_change
class-attribute
instance-attribute
​
Copy
on_selection_change: (
    EventHandler[TextSelectionChangeEvent[CodeEditor]]
    | None
) = None

Called when the text selection or caret position changes.

Methods​
deployed_code
focus
async
​
Copy
focus()

Request focus for this editor.

deployed_code
fold_at
async
​
Copy
fold_at(line_number: int)

Fold the block starting at the given line number.

deployed_code
fold_comment_at_line_zero
async
​
Copy
fold_comment_at_line_zero()

Fold the comment block at line 0.

deployed_code
fold_imports
async
​
Copy
fold_imports()

Fold import sections.

Edit this page