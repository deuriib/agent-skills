# Column
URL: https://flet.dev/docs/controls/column

ReferenceControlsColumn
Column

Arranges child controls vertically, optionally aligning and spacing them within the available space.

ft.Column(

    width=220,

    height=120,

    spacing=12,

    controls=[

        ft.Text("Daily planning", size=20, weight=ft.FontWeight.W_600),

        ft.Text("Review pull requests"),

        ft.Text("Ship release"),

    ],

)

Basic Column with Text controls

Inherits: LayoutControl, ScrollableControl, AdaptiveControl

Properties
alignment - How the child Controls should be placed vertically.
controls - A list of controls to display.
horizontal_alignment - Defines how the controls should be placed horizontally.
intrinsic_width - If True, the Column will be as wide as the widest child control.
run_alignment - How the runs should be placed in the cross-axis when wrap is True.
run_spacing - The spacing between runs when wrap is True.
spacing - Spacing between the controls.
tight - Determines how vertical space is allocated.
wrap - Whether the controls should wrap into additional columns (runs) when they don't fit in a single vertical column.
Examples​

Live example

Column spacing​
import flet as ft





def main(page: ft.Page):

    def generate_items(count: int):

        """Generates a list of custom Containers with length `count`."""

        return [

            ft.Container(

                content=ft.Text(value=str(i)),

                alignment=ft.Alignment.CENTER,

                width=50,

                height=50,

                bgcolor=ft.Colors.AMBER,

                border_radius=ft.BorderRadius.all(5),

            )

            for i in range(1, count + 1)

        ]



    def handle_slider_change(e: ft.Event[ft.Slider]):

        """Updates the spacing between items based on slider value."""

        column.spacing = int(e.control.value)

        column.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        controls=[

                            ft.Text("Spacing between items"),

                            ft.Slider(

                                min=0,

                                max=100,

                                divisions=10,

                                value=0,

                                label="{value}",

                                width=500,

                                on_change=handle_slider_change,

                            ),

                        ]

                    ),

                    column := ft.Column(spacing=0, controls=generate_items(5)),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Column wrapping​
import flet as ft



HEIGHT = 400





def main(page: ft.Page):

    def items(count: int):

        return [

            ft.Container(

                content=ft.Text(value=str(i)),

                alignment=ft.Alignment.CENTER,

                width=30,

                height=30,

                bgcolor=ft.Colors.AMBER,

                border_radius=ft.BorderRadius.all(5),

            )

            for i in range(1, count + 1)

        ]



    def handle_slider_change(e: ft.Event[ft.Slider]):

        col.height = float(e.control.value)

        col.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        controls=[

                            ft.Text(

                                "Change the column height to see how child items "

                                "wrap onto multiple columns:"

                            ),

                            ft.Slider(

                                min=0,

                                max=HEIGHT,

                                divisions=20,

                                value=HEIGHT,

                                label="{value}",

                                width=500,

                                on_change=handle_slider_change,

                            ),

                        ]

                    ),

                    ft.Container(

                        bgcolor=ft.Colors.TRANSPARENT,

                        content=(

                            col := ft.Column(

                                wrap=True,

                                spacing=10,

                                run_spacing=10,

                                controls=items(10),

                                height=HEIGHT,

                            )

                        ),

                    ),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Column vertical alignments​
import flet as ft





@ft.control

class ColumnFromVerticalAlignment(ft.Column):

    alignment: ft.MainAxisAlignment = ft.MainAxisAlignment.START



    def init(self):

        self.controls = [

            ft.Text(str(self.alignment), size=10),

            ft.Container(

                content=ft.Column(self.generate_items(3), alignment=self.alignment),

                bgcolor=ft.Colors.AMBER_100,

                height=400,

            ),

        ]



    @staticmethod

    def generate_items(count: int):

        """Generates a list of custom Containers with length `count`."""

        return [

            ft.Container(

                content=ft.Text(value=str(i)),

                alignment=ft.Alignment.CENTER,

                width=50,

                height=50,

                bgcolor=ft.Colors.AMBER_500,

            )

            for i in range(1, count + 1)

        ]





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Row(

                spacing=30,

                alignment=ft.MainAxisAlignment.START,

                scroll=ft.ScrollMode.AUTO,

                controls=[

                    ColumnFromVerticalAlignment(alignment=ft.MainAxisAlignment.START),

                    ColumnFromVerticalAlignment(alignment=ft.MainAxisAlignment.CENTER),

                    ColumnFromVerticalAlignment(alignment=ft.MainAxisAlignment.END),

                    ColumnFromVerticalAlignment(

                        alignment=ft.MainAxisAlignment.SPACE_BETWEEN

                    ),

                    ColumnFromVerticalAlignment(

                        alignment=ft.MainAxisAlignment.SPACE_AROUND

                    ),

                    ColumnFromVerticalAlignment(

                        alignment=ft.MainAxisAlignment.SPACE_EVENLY

                    ),

                ],

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Column horizontal alignments​
import flet as ft





@ft.control

class ColumnFromHorizontalAlignment(ft.Column):

    alignment: ft.CrossAxisAlignment = ft.CrossAxisAlignment.START



    def init(self):

        self.controls = [

            ft.Text(str(self.alignment), size=16),

            ft.Container(

                bgcolor=ft.Colors.AMBER_100,

                width=100,

                content=ft.Column(

                    controls=self.generate_items(3),

                    alignment=ft.MainAxisAlignment.START,

                    horizontal_alignment=self.alignment,

                ),

            ),

        ]



    @staticmethod

    def generate_items(count: int):

        """Generates a list of custom Containers with length `count`."""

        return [

            ft.Container(

                content=ft.Text(value=str(i)),

                alignment=ft.Alignment.CENTER,

                width=50,

                height=50,

                bgcolor=ft.Colors.AMBER_500,

            )

            for i in range(1, count + 1)

        ]





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            content=ft.Row(

                spacing=30,

                alignment=ft.MainAxisAlignment.START,

                controls=[

                    ColumnFromHorizontalAlignment(

                        alignment=ft.CrossAxisAlignment.START

                    ),

                    ColumnFromHorizontalAlignment(

                        alignment=ft.CrossAxisAlignment.CENTER

                    ),

                    ColumnFromHorizontalAlignment(alignment=ft.CrossAxisAlignment.END),

                ],

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Infinite scrolling​

This example demonstrates adding of list items on-the-fly, as user scroll to the bottom, creating the illusion of infinite list:

import threading



import flet as ft





class State:

    i = 0





s = State()

sem = threading.Semaphore()





def main(page: ft.Page):

    def on_scroll(e: ft.OnScrollEvent):

        if e.pixels >= e.max_scroll_extent - 100 and sem.acquire(blocking=False):

            try:

                for _i in range(0, 10):

                    cl.controls.append(ft.Text(f"Text line {s.i}", key=str(s.i)))

                    s.i += 1

                cl.update()

            finally:

                sem.release()



    cl = ft.Column(

        spacing=10,

        height=200,

        width=200,

        scroll=ft.ScrollMode.ALWAYS,

        scroll_interval=0,

        on_scroll=on_scroll,

    )

    for _i in range(0, 50):

        cl.controls.append(ft.Text(f"Text line {s.i}", key=str(s.i)))

        s.i += 1



    page.add(ft.SafeArea(content=ft.Container(cl, border=ft.Border.all(1))))





if __name__ == "__main__":

    ft.run(main)

Scrolling programmatically​

This example shows how to use scroll_to() to programmatically scroll a column:

import flet as ft





def main(page: ft.Page):

    column = ft.Column(

        spacing=10,

        height=200,

        width=float("inf"),

        scroll=ft.ScrollMode.ALWAYS,

        controls=[

            ft.Text(f"Text line {i}", key=ft.ScrollKey(i)) for i in range(0, 100)

        ],

    )



    async def scroll_to_offset(e):

        await column.scroll_to(offset=500, duration=1000)



    async def scroll_to_start(e):

        await column.scroll_to(offset=0, duration=1000)



    async def scroll_to_end(e):

        await column.scroll_to(

            offset=-1, duration=2000, curve=ft.AnimationCurve.EASE_IN_OUT

        )



    async def scroll_to_key(e):

        await column.scroll_to(scroll_key="20", duration=1000)



    async def scroll_to_delta(e):

        await column.scroll_to(delta=100, duration=200)



    async def scroll_to_minus_delta(e):

        await column.scroll_to(delta=-100, duration=200)



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Container(content=column, border=ft.Border.all(1)),

                    ft.Button("Scroll to offset 500", on_click=scroll_to_offset),

                    ft.Row(

                        controls=[

                            ft.Button("Scroll -100", on_click=scroll_to_minus_delta),

                            ft.Button("Scroll +100", on_click=scroll_to_delta),

                        ]

                    ),

                    ft.Button("Scroll to key '20'", on_click=scroll_to_key),

                    ft.Row(

                        controls=[

                            ft.Button("Scroll to start", on_click=scroll_to_start),

                            ft.Button("Scroll to end", on_click=scroll_to_end),

                        ]

                    ),

                ]

            )

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: MainAxisAlignment = MainAxisAlignment.START

How the child Controls should be placed vertically.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[Control] = field(default_factory=list)

A list of controls to display.

build
horizontal_alignment
class-attribute
instance-attribute
​
Copy
horizontal_alignment: CrossAxisAlignment = (
    CrossAxisAlignment.START
)

Defines how the controls should be placed horizontally.

build
intrinsic_width
class-attribute
instance-attribute
​
Copy
intrinsic_width: bool = False

If True, the Column will be as wide as the widest child control.

build
run_alignment
class-attribute
instance-attribute
​
Copy
run_alignment: MainAxisAlignment = MainAxisAlignment.START

How the runs should be placed in the cross-axis when wrap is True.

build
run_spacing
class-attribute
instance-attribute
​
Copy
run_spacing: Number = 10

The spacing between runs when wrap is True.

build
spacing
class-attribute
instance-attribute
​
Copy
spacing: Number = 10

Spacing between the controls.

It is applied only when alignment is MainAxisAlignment.START, MainAxisAlignment.END or MainAxisAlignment.CENTER.

build
tight
class-attribute
instance-attribute
​
Copy
tight: bool = False

Determines how vertical space is allocated.

If False (default), children expand to fill the available vertical space. If True, only the minimum vertical space required by the children is used.

build
wrap
class-attribute
instance-attribute
​
Copy
wrap: bool = False

Whether the controls should wrap into additional columns (runs) when they don't fit in a single vertical column.

Edit this page