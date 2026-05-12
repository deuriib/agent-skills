# Card
URL: https://flet.dev/docs/controls/card

ReferenceControlsCard
Card

A material design card: a panel with slightly rounded corners and an elevation shadow.

ft.Card(

    shadow_color=ft.Colors.ON_SURFACE_VARIANT,

    content=ft.Container(

        width=400,

        padding=10,

        content=ft.ListTile(

            bgcolor=ft.Colors.GREY_400,

            leading=ft.Icon(ft.Icons.FOREST),

            title=ft.Text("Card Name"),

        ),

    ),

)

Basic card

Inherits: LayoutControl, AdaptiveControl

Properties
bgcolor - The card's background color.
clip_behavior - Defines how the content will be clipped.
content - The Control to display inside the card.
elevation - The z-coordinate at which to place this card.
semantic_container - Whether this card represents a single semantic container, or if it instead represents a collection of individual semantic nodes (different types of content).
shadow_color - The color to paint the shadow below this card.
shape - The shape of this card.
show_border_on_foreground - Whether the shape of the border should be painted in front of the content or behind.
variant - Defines the card variant to be used.
Examples​

Live example

import flet as ft





def main(page: ft.Page):

    page.title = "Card Example"

    page.theme_mode = ft.ThemeMode.LIGHT



    page.add(

        ft.SafeArea(

            content=ft.Card(

                shadow_color=ft.Colors.ON_SURFACE_VARIANT,

                content=ft.Container(

                    width=400,

                    padding=10,

                    content=ft.Column(

                        controls=[

                            ft.ListTile(

                                bgcolor=ft.Colors.GREY_400,

                                leading=ft.Icon(ft.Icons.ALBUM),

                                title=ft.Text("The Enchanted Nightingale"),

                                subtitle=ft.Text(

                                    "Music by Julie Gable. Lyrics by Sidney Stein."

                                ),

                            ),

                            ft.Row(

                                alignment=ft.MainAxisAlignment.END,

                                controls=[

                                    ft.TextButton("Buy tickets"),

                                    ft.TextButton("Listen"),

                                ],

                            ),

                        ]

                    ),

                ),

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The card's background color.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior | None = None

Defines how the content will be clipped.

Defaults to CardTheme.clip_behavior, or if that is None, falls back to ClipBehavior.NONE.

build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

The Control to display inside the card.

TIP

To display multiple children, wrap them in a control like Row, Column, or Stack, which accept a controls list.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: Number | None = None

The z-coordinate at which to place this card. Defines the size of the shadow below the card.

Defaults to CardTheme.elevation, or if that is None, falls back to 1.0.

build
semantic_container
class-attribute
instance-attribute
​
Copy
semantic_container: bool = True

Whether this card represents a single semantic container, or if it instead represents a collection of individual semantic nodes (different types of content).

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ColorValue | None = None

The color to paint the shadow below this card.

Defaults to CardTheme.shadow_color

build
shape
class-attribute
instance-attribute
​
Copy
shape: OutlinedBorder | None = None

The shape of this card.

Defaults to CardTheme.shape, or if that is None, falls back to RoundedRectangleBorder(radius=12.0).

build
show_border_on_foreground
class-attribute
instance-attribute
​
Copy
show_border_on_foreground: bool = True

Whether the shape of the border should be painted in front of the content or behind.

build
variant
class-attribute
instance-attribute
​
Copy
variant: CardVariant = CardVariant.ELEVATED

Defines the card variant to be used.

Edit this page