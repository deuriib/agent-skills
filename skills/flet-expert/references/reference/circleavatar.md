# CircleAvatar
URL: https://flet.dev/docs/controls/circleavatar

ReferenceControlsCircleAvatar
CircleAvatar

A circle that represents a user.

If foreground_image_src fails then background_image_src is used, and if this also fails, then bgcolor is used.

Example:

ft.CircleAvatar(

    content=ft.Text("AB"),

    bgcolor=ft.Colors.PRIMARY,

    color=ft.Colors.ON_PRIMARY,

)

Basic CircleAvatar

Inherits: LayoutControl

Properties
background_image_src - The source (local asset file or URL) of the background image in the circle.
bgcolor - The color with which to fill the circle.
color - The default color for text in this avatar.
content - The content of this avatar.
foreground_image_src - The source (local asset file or URL) of the foreground image in the circle.
max_radius - The maximum size of the avatar, expressed as the radius (half the diameter).
min_radius - The minimum size of the avatar, expressed as the radius (half the diameter).
radius - The size of the avatar, expressed as the radius (half the diameter).
Events
on_image_error - Called when an error occurs while loading the background_image_src or foreground_image_src.
Examples​

Live example

User avatars​
import flet as ft





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    # a "normal" avatar with background image

                    ft.CircleAvatar(

                        foreground_image_src="https://avatars.githubusercontent.com/u/5041459?s=88&v=4",

                        content=ft.Text("FF"),

                    ),

                    # avatar with failing foreground image and fallback text

                    ft.CircleAvatar(

                        foreground_image_src="https://avatars.githubusercontent.com/u/_5041459?s=88&v=4",

                        content=ft.Text("FF"),

                    ),

                    # avatar with icon, aka icon with inverse background

                    ft.CircleAvatar(content=ft.Icon(ft.Icons.ABC)),

                    # avatar with icon and custom colors

                    ft.CircleAvatar(

                        content=ft.Icon(ft.Icons.WARNING_ROUNDED),

                        color=ft.Colors.YELLOW_200,

                        bgcolor=ft.Colors.AMBER_700,

                    ),

                    # avatar with online status

                    ft.Stack(

                        width=40,

                        height=40,

                        controls=[

                            ft.CircleAvatar(

                                foreground_image_src="https://avatars.githubusercontent.com/u/5041459?s=88&v=4"

                            ),

                            ft.Container(

                                alignment=ft.Alignment.BOTTOM_LEFT,

                                content=ft.CircleAvatar(

                                    bgcolor=ft.Colors.GREEN, radius=5

                                ),

                            ),

                        ],

                    ),

                ]

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
background_image_src
class-attribute
instance-attribute
​
Copy
background_image_src: str | bytes | None = None

The source (local asset file or URL) of the background image in the circle. Changing the background image will cause the avatar to animate to the new image.

If this avatar is to have the user's initials, use content instead.

Typically used as a fallback image for foreground_image_src.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The color with which to fill the circle.

Changing the background color will cause this avatar to animate to the new color.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The default color for text in this avatar.

Defaults to the primary text theme color if no bgcolor is specified.

build
content
class-attribute
instance-attribute
​
Copy
content: StrOrControl | None = None

The content of this avatar.

Typically a Text control.

TIP

If this avatar is to have an image, use background_image_src instead.

build
foreground_image_src
class-attribute
instance-attribute
​
Copy
foreground_image_src: str | bytes | None = None

The source (local asset file or URL) of the foreground image in the circle.

Fallbacks to background_image_src.

Typically used as profile image.

build
max_radius
class-attribute
instance-attribute
​
Copy
max_radius: Number | None = None

The maximum size of the avatar, expressed as the radius (half the diameter). If set to a non None value, then radius must be None (default).

Defaults to float('inf') i.e. infinity.

Raises:

ValueError - If it is not greater than or equal to 0.0.
ValueError - If it is set while radius is set.
build
min_radius
class-attribute
instance-attribute
​
Copy
min_radius: Number | None = None

The minimum size of the avatar, expressed as the radius (half the diameter). If set to a non None value, then radius must be None (default).

Defaults to 0.0.

Raises:

ValueError - If it is not greater than or equal to 0.0.
ValueError - If it is set while radius is set.
build
radius
class-attribute
instance-attribute
​
Copy
radius: Number | None = None

The size of the avatar, expressed as the radius (half the diameter).

If set to a non None value, then neither min_radius nor max_radius may be specified.

Raises:

ValueError - If it is not greater than or equal to 0.
ValueError - If it is set while min_radius or max_radius is set.
Events​
bolt
on_image_error
class-attribute
instance-attribute
​
Copy
on_image_error: ControlEventHandler[CircleAvatar] | None = (
    None
)

Called when an error occurs while loading the background_image_src or foreground_image_src.

The data property of the event handler argument is a string whose value is either "background" or "foreground" indicating the error's origin.

Edit this page