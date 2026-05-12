# RadialGradient
URL: https://flet.dev/docs/types/radialgradient

ReferenceTypesClassesGradientRadialGradient
RadialGradient

Creates a radial gradient centered at center that ends at radius distance from the center.

More information here.

Inherits: Gradient

Properties
center - The center of the gradient, as an offset into the (-1.0, -1.0) x (1.0, 1.0) square describing the gradient which will be mapped onto the paint box.
focal - The focal point of the gradient.
focal_radius - The radius of the focal point of gradient, as a fraction of the shortest side of the paint box.
radius - The radius of the gradient, as a fraction of the shortest side of the paint box.
Properties​
build
center
class-attribute
instance-attribute
​
Copy
center: Alignment = field(
    default_factory=lambda: Alignment.CENTER
)

The center of the gradient, as an offset into the (-1.0, -1.0) x (1.0, 1.0) square describing the gradient which will be mapped onto the paint box. For example, an alignment of (0.0, 0.0) will place the radial gradient in the center of the box.

build
focal
class-attribute
instance-attribute
​
Copy
focal: Alignment | None = None

The focal point of the gradient. If specified, the gradient will appear to be focused along the vector from center to focal.

build
focal_radius
class-attribute
instance-attribute
​
Copy
focal_radius: Number = 0.0

The radius of the focal point of gradient, as a fraction of the shortest side of the paint box. For example, if a radial gradient is painted on a box that is 100.0 pixels wide and 200.0 pixels tall, then a radius of 1.0 will place the 1.0 stop at 100.0 pixels from the focal point.

build
radius
class-attribute
instance-attribute
​
Copy
radius: Number = 0.5

The radius of the gradient, as a fraction of the shortest side of the paint box. For example, if a radial gradient is painted on a box that is 100.0 pixels wide and 200.0 pixels tall, then a radius of 1.0 will place the 1.0 stop at 100.0 pixels from the center.

Examples​
Container with radial gradient​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Container(

                        alignment=ft.Alignment.CENTER,

                        width=150,

                        height=150,

                        border_radius=ft.BorderRadius.all(5),

                        gradient=ft.RadialGradient(

                            center=ft.Alignment(0.7, -0.6),

                            radius=0.2,

                            colors=["0xFFFFFF00", "0xFF0099FF"],

                            stops=[0.4, 1.0],

                        ),

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page