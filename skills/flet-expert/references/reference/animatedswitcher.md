# AnimatedSwitcher
URL: https://flet.dev/docs/controls/animatedswitcher

ReferenceControlsAnimatedSwitcher
AnimatedSwitcher

Used to switch between controls with an animation.

Inherits: LayoutControl

Properties
content - The content to display.
duration - The duration of the transition from the old content to the new one.
reverse_duration - The duration of the transition from the new content to the old one.
switch_in_curve - The animation curve to use when transitioning in a new content.
switch_out_curve - The animation curve to use when transitioning an old content out.
transition - An animation type to transition between new and old content.
Examples​

Live example

Animated switching between two containers with scale effect​
import flet as ft





def main(page: ft.Page):

    c1 = ft.Container(

        content=ft.Text("Hello!", theme_style=ft.TextThemeStyle.HEADLINE_MEDIUM),

        alignment=ft.Alignment.CENTER,

        width=200,

        height=200,

        bgcolor=ft.Colors.GREEN,

    )

    c2 = ft.Container(

        content=ft.Text("Bye!", size=50),

        alignment=ft.Alignment.CENTER,

        width=200,

        height=200,

        bgcolor=ft.Colors.YELLOW,

    )

    switcher = ft.AnimatedSwitcher(

        content=c1,

        transition=ft.AnimatedSwitcherTransition.SCALE,

        duration=500,

        reverse_duration=100,

        switch_in_curve=ft.AnimationCurve.BOUNCE_OUT,

        switch_out_curve=ft.AnimationCurve.BOUNCE_IN,

    )



    def scale(e):

        switcher.content = c2 if switcher.content == c1 else c1

        switcher.transition = ft.AnimatedSwitcherTransition.SCALE

        switcher.update()



    def fade(e):

        switcher.content = c2 if switcher.content == c1 else c1

        switcher.transition = ft.AnimatedSwitcherTransition.FADE

        switcher.update()



    def rotate(e):

        switcher.content = c2 if switcher.content == c1 else c1

        switcher.transition = ft.AnimatedSwitcherTransition.ROTATION

        switcher.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    switcher,

                    ft.Button("Scale", on_click=scale),

                    ft.Button("Fade", on_click=fade),

                    ft.Button("Rotate", on_click=rotate),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Animate Image switch​
import time



import flet as ft





def main(page: ft.Page):

    def animate(e: ft.Event[ft.Button]):

        switcher.content = ft.Image(

            src=f"https://picsum.photos/200/300?{time.time()}",

            width=200,

            height=300,

        )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    switcher := ft.AnimatedSwitcher(

                        content=ft.Image(

                            src="https://picsum.photos/200/300",

                            width=200,

                            height=300,

                        ),

                        transition=ft.AnimatedSwitcherTransition.SCALE,

                        duration=500,

                        reverse_duration=100,

                        switch_in_curve=ft.AnimationCurve.BOUNCE_OUT,

                        switch_out_curve=ft.AnimationCurve.BOUNCE_IN,

                    ),

                    ft.Button("Animate!", on_click=animate),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Animate Image switch buffered​
import base64

import time

from dataclasses import field



import httpx



import flet as ft





@ft.control

class BufferingSwitcher(ft.AnimatedSwitcher):

    content: ft.Image | None = None

    image_queue: list[str] = field(default_factory=list)



    def init(self):

        self.transition = ft.AnimatedSwitcherTransition.SCALE

        self.duration = 500

        self.reverse_duration = 100

        self.switch_in_curve = ft.AnimationCurve.EASE_IN

        self.switch_out_curve = ft.AnimationCurve.EASE_OUT

        if self.content and self.content.src:

            self.image_queue.append(self.content.src)



    def animate(self, e):

        self.content = ft.Image(

            src=self.image_queue.pop(),

            width=200,

            height=300,

            gapless_playback=True,

        )

        self.update()



    async def fill_queue(self):

        while len(self.image_queue) < 10:

            image_base64 = await self.image_to_base64(

                f"https://picsum.photos/200/300?{time.time()}"

            )

            if image_base64:

                self.image_queue.append(image_base64)



    async def image_to_base64(self, url):

        response = await httpx.AsyncClient(follow_redirects=True).get(url)

        if response.status_code == 200:

            base64_str = (

                base64.standard_b64encode(response.content).decode("utf-8").strip()

            )

            return base64_str

        else:

            print(f"Image request failed with {response.status_code}")

            return None



    def before_update(self):

        self.page.run_task(self.fill_queue)





def main(page: ft.Page):

    switcher = BufferingSwitcher(

        content=ft.Image(

            src=f"https://picsum.photos/200/300?{time.time()}",

            width=200,

            height=300,

        )

    )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    switcher,

                    ft.Button("Animate!", on_click=switcher.animate),

                ]

            )

        ),

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

The content to display.

When it changes, this switcher will animate the transition from the old/previous content to the new one.

Raises:

ValueError - If it is not visible.
build
duration
class-attribute
instance-attribute
​
Copy
duration: DurationValue = field(
    default_factory=lambda: Duration(seconds=1)
)

The duration of the transition from the old content to the new one.

build
reverse_duration
class-attribute
instance-attribute
​
Copy
reverse_duration: DurationValue = field(
    default_factory=lambda: Duration(seconds=1)
)

The duration of the transition from the new content to the old one.

build
switch_in_curve
class-attribute
instance-attribute
​
Copy
switch_in_curve: AnimationCurve = AnimationCurve.LINEAR

The animation curve to use when transitioning in a new content.

build
switch_out_curve
class-attribute
instance-attribute
​
Copy
switch_out_curve: AnimationCurve = AnimationCurve.LINEAR

The animation curve to use when transitioning an old content out.

build
transition
class-attribute
instance-attribute
​
Copy
transition: AnimatedSwitcherTransition = (
    AnimatedSwitcherTransition.FADE
)

An animation type to transition between new and old content.

Edit this page