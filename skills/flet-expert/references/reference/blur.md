# Blur
URL: https://flet.dev/docs/types/blur

ReferenceTypesClassesBlur
Blur

Gaussian blur configuration.

Properties
sigma_x - Horizontal Gaussian sigma.
sigma_y - Vertical Gaussian sigma.
tile_mode - How sampling outside source bounds is handled during blur.
Properties​
build
sigma_x
instance-attribute
​
Copy
sigma_x: Number

Horizontal Gaussian sigma.

Larger values produce stronger blur along the X axis.

build
sigma_y
instance-attribute
​
Copy
sigma_y: Number

Vertical Gaussian sigma.

Larger values produce stronger blur along the Y axis.

build
tile_mode
class-attribute
instance-attribute
​
Copy
tile_mode: BlurTileMode | None = None

How sampling outside source bounds is handled during blur.

Examples​
Example 1​
import flet as ft





def main(page: ft.Page):

    page.theme_mode = ft.ThemeMode.LIGHT

    i = 1



    img_container = ft.Container(

        image=ft.DecorationImage(src="https://picsum.photos/300/300"),

        width=300,

        height=300,

    )



    def handle_button_click(e: ft.Event[ft.Button]):

        nonlocal i

        img_container.image = ft.DecorationImage(

            src=f"https://picsum.photos/300/300?random={i}"

        )

        i += 1

        page.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Stack(

                        controls=[

                            img_container,

                            ft.Container(

                                width=100,

                                height=100,

                                blur=10,

                                bgcolor="#22CCCC00",

                            ),

                            ft.Container(

                                width=100,

                                height=100,

                                left=20,

                                top=120,

                                blur=(0, 10),

                            ),

                            ft.Container(

                                top=50,

                                right=10,

                                blur=ft.Blur(10, 0, ft.BlurTileMode.MIRROR),

                                width=100,

                                height=100,

                                bgcolor="#44CCCCCC",

                                border_radius=10,

                                border=ft.Border.all(2, ft.Colors.BLACK),

                            ),

                            ft.Button(

                                content="Change Background",

                                bottom=5,

                                right=5,

                                # style=ft.ButtonStyle(text_style=ft.TextStyle(size=8)),

                                on_click=handle_button_click,

                            ),

                        ]

                    )

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page