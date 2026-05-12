# SelectionArea
URL: https://flet.dev/docs/controls/selectionarea

ReferenceControlsSelectionArea
SelectionArea

Flet controls are not selectable by default. SelectionArea is used to enable selection for its child control.

Selectable and unselectable text

Inherits: Control

Properties
content - The child control this selection area applies to.
Events
on_change - Called when the selected content changes.
Examples​
Basic Example​
import flet as ft



TEXT_STYLE = ft.TextStyle(

    size=22,

    weight=ft.FontWeight.W_600,

    decoration=ft.TextDecoration(

        ft.TextDecoration.UNDERLINE | ft.TextDecoration.OVERLINE

    ),

    decoration_style=ft.TextDecorationStyle.WAVY,

)





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.SelectionArea(

                        content=ft.Column(

                            controls=[

                                ft.Text(

                                    "Selectable text",

                                    color=ft.Colors.GREEN,

                                    style=TEXT_STYLE,

                                    key="selectable",

                                ),

                                ft.Text(

                                    "Also selectable",

                                    color=ft.Colors.GREEN,

                                    style=TEXT_STYLE,

                                ),

                            ]

                        )

                    ),

                    ft.Text(

                        "Not selectable",

                        color=ft.Colors.RED,

                        style=TEXT_STYLE,

                        key="non-selectable",

                    ),

                ]

            )

        )

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

The child control this selection area applies to.

If you need to have multiple selectable controls, use container-like controls like Row or Column, which have a controls property for this purpose.

Raises:

ValueError - If content is not visible.
Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[SelectionArea] | None = None

Called when the selected content changes.

Edit this page