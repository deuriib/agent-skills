# AutofillGroup
URL: https://flet.dev/docs/controls/autofillgroup

ReferenceControlsAutofillGroup
AutofillGroup

Used to group autofill controls together.

Inherits: Control

Properties
content - The content of this group.
dispose_action - The action to be run when this group is the topmost and it's being disposed, in order to clean up the current autofill context.
Examples​

Live example

Basic example​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.AutofillGroup(

                content=ft.Column(

                    controls=[

                        ft.TextField(

                            label="Name",

                            autofill_hints=ft.AutofillHint.NAME,

                        ),

                        ft.TextField(

                            label="Email",

                            autofill_hints=[ft.AutofillHint.EMAIL],

                        ),

                        ft.TextField(

                            label="Phone Number",

                            autofill_hints=[ft.AutofillHint.TELEPHONE_NUMBER],

                        ),

                        ft.TextField(

                            label="Street Address",

                            autofill_hints=ft.AutofillHint.FULL_STREET_ADDRESS,

                        ),

                        ft.TextField(

                            label="Postal Code",

                            autofill_hints=ft.AutofillHint.POSTAL_CODE,

                        ),

                    ]

                )

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

The content of this group.

Raises:

ValueError - If it is not visible.
build
dispose_action
class-attribute
instance-attribute
​
Copy
dispose_action: AutofillGroupDisposeAction = (
    AutofillGroupDisposeAction.COMMIT
)

The action to be run when this group is the topmost and it's being disposed, in order to clean up the current autofill context.

Edit this page