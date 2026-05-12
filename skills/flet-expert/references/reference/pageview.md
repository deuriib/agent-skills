# PageView
URL: https://flet.dev/docs/controls/pageview

ReferenceControlsPageView
PageView

Displays its child controls one page at a time and lets users swipe between them, similar to a carousel.

It is helpful for onboarding flows, photo carousels, or any scenario where content is divided into discrete full-width pages.

Inherits: LayoutControl

Properties
clip_behavior - Defines how pages are clipped if they overflow their bounds.
controls - A list of controls to display, one per page, in the order they should appear.
horizontal - Whether the pages should be arranged and scrolled horizontally.
implicit_scrolling - Whether to allow adjacent pages to render partially before the user scrolls to them, enabling smoother transitions and improved accessibility by allowing focus to move seamlessly between pages during navigation.
keep_page - Whether this page view should restore the most recently viewed page when rebuilt.
pad_ends - Whether to add padding to both ends of the list.
reverse - Whether to reverse the order in which pages are read and swiped.
selected_index - The zero-based index of the currently visible page.
snap - Whether the view should snap to exact page boundaries after a drag.
viewport_fraction - The fraction of the viewport that each page should occupy in the scrolling direction (see horizontal).
Events
on_change - Fired when the visible page changes.
Methods
go_to_page - Animates to the page at index.
jump_to - Immediately sets the scroll position to the given value, without animation and without validating whether the value is within bounds.
jump_to_page - Jumps immediately to the page at index without animation, moving the page position from its current value to the given value without animation nor range checking.
next_page - Animates to the next page.
previous_page - Animates to the previous page.
Examples​
Basic Example​
import flet as ft





def main(page: ft.Page):

    page.padding = 0



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.PageView(

                expand=True,

                viewport_fraction=0.9,

                on_change=lambda e: print(f"Currently viewing page {int(e.data)}"),

                selected_index=1,

                horizontal=True,

                controls=[

                    ft.Container(

                        bgcolor=ft.Colors.INDIGO_400,

                        content=ft.Column(

                            alignment=ft.MainAxisAlignment.CENTER,

                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                            controls=[

                                ft.Text("Welcome", size=40, weight=ft.FontWeight.BOLD),

                                ft.Text("Swipe to see what PageView can do."),

                            ],

                        ),

                    ),

                    ft.Container(

                        bgcolor=ft.Colors.PINK_300,

                        content=ft.Column(

                            alignment=ft.MainAxisAlignment.CENTER,

                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                            controls=[

                                ft.Icon(ft.Icons.ANIMATION, size=72),

                                ft.Text(

                                    "Viewport fraction lets you peek at the next slide."

                                ),

                            ],

                        ),

                    ),

                    ft.Container(

                        bgcolor=ft.Colors.TEAL_300,

                        content=ft.Column(

                            alignment=ft.MainAxisAlignment.CENTER,

                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                            controls=[

                                ft.Icon(ft.Icons.TOUCH_APP, size=72),

                                ft.Text("Use on_change to respond to page swipes."),

                            ],

                        ),

                    ),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Programmatic Swipes​
import flet as ft





def main(page: ft.Page):

    page.padding = 0



    async def show_previous_page(e: ft.Event[ft.FloatingActionButton]):

        await view.previous_page(

            animation_curve=ft.AnimationCurve.BOUNCE_OUT,

            animation_duration=ft.Duration(seconds=1),

        )



    async def show_next_page(e: ft.Event[ft.FloatingActionButton]):

        await view.next_page(

            animation_curve=ft.AnimationCurve.BOUNCE_OUT,

            animation_duration=ft.Duration(seconds=1),

        )



    page.floating_action_button = ft.Row(

        alignment=ft.MainAxisAlignment.CENTER,

        wrap=True,

        controls=[

            ft.FloatingActionButton(

                icon=ft.Icons.SWIPE_LEFT,

                on_click=show_previous_page,

                tooltip="Previous Page",

            ),

            ft.FloatingActionButton(

                icon=ft.Icons.SWIPE_RIGHT,

                on_click=show_next_page,

                tooltip="Next Page",

            ),

        ],

    )



    page.add(

        ft.SafeArea(

            expand=True,

            content=(

                view := ft.PageView(

                    expand=True,

                    viewport_fraction=0.9,

                    selected_index=1,

                    horizontal=True,

                    controls=[

                        ft.Container(

                            bgcolor=bgcolor,

                            content=ft.Column(

                                alignment=ft.MainAxisAlignment.CENTER,

                                horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                                controls=[

                                    ft.Text(

                                        f"Page {idx}",

                                        size=55,

                                        weight=ft.FontWeight.BOLD,

                                    ),

                                ],

                            ),

                        )

                        for idx, bgcolor in enumerate(

                            [

                                ft.Colors.RED_800,

                                ft.Colors.BLUE_800,

                                ft.Colors.GREEN_800,

                                ft.Colors.ORANGE_800,

                                ft.Colors.PURPLE_800,

                                ft.Colors.PINK_800,

                            ]

                        )

                    ],

                )

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior = ClipBehavior.HARD_EDGE

Defines how pages are clipped if they overflow their bounds.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[Control] = field(default_factory=list)

A list of controls to display, one per page, in the order they should appear.

build
horizontal
class-attribute
instance-attribute
​
Copy
horizontal: bool = True

Whether the pages should be arranged and scrolled horizontally.

False implies vertical arrangement and scrolling.

build
implicit_scrolling
class-attribute
instance-attribute
​
Copy
implicit_scrolling: bool = False

Whether to allow adjacent pages to render partially before the user scrolls to them, enabling smoother transitions and improved accessibility by allowing focus to move seamlessly between pages during navigation.

With this flag set to False, when accessibility focus reaches the end of the current page and the user attempts to move it to the next element, the focus will traverse to the next widget outside of the page view.

With this flag set to True, when accessibility focus reaches the end of the current page and user attempts to move it to the next element, focus will traverse to the next page in the page view.

build
keep_page
class-attribute
instance-attribute
​
Copy
keep_page: bool = True

Whether this page view should restore the most recently viewed page when rebuilt.

build
pad_ends
class-attribute
instance-attribute
​
Copy
pad_ends: bool = True

Whether to add padding to both ends of the list.

If this is set to True and viewport_fraction < 1.0, padding will be added before the first page and after the last page so they snap to the center of the viewport when scrolled all the way to the start or end.

NOTE

If viewport_fraction >= 1.0, this property has no effect.

build
reverse
class-attribute
instance-attribute
​
Copy
reverse: bool = False

Whether to reverse the order in which pages are read and swiped.

For example, if the reading direction is left-to-right and horizontal is True, then this page view scrolls from left to right when reverse is False and from right to left when reverse is True.

Similarly, if horizontal is False, then this page view scrolls from top to bottom when reverse is False and from bottom to top when reverse is True.

build
selected_index
class-attribute
instance-attribute
​
Copy
selected_index: int = 0

The zero-based index of the currently visible page.

Changing it later on (followed by update) jumps to the specified page without animation.

Raises:

ValueError - If it is not greater than or equal to 0.
build
snap
class-attribute
instance-attribute
​
Copy
snap: bool = True

Whether the view should snap to exact page boundaries after a drag.

If the pad_ends is False and viewport_fraction < 1.0, the page will snap to the beginning of the viewport; otherwise, the page will snap to the center of the viewport.

build
viewport_fraction
class-attribute
instance-attribute
​
Copy
viewport_fraction: Number = 1.0

The fraction of the viewport that each page should occupy in the scrolling direction (see horizontal).

For example, 1.0 (default), means each page fills the viewport.

Raises:

ValueError - If it is not strictly greater than 0.
Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[PageView] | None = None

Fired when the visible page changes.

The data property of the event argument contains the index of the new page.

Methods​
deployed_code
go_to_page
async
​
Copy
go_to_page(
    index: int,
    animation_duration: DurationValue = DEFAULT_ANIMATION_DURATION,
    animation_curve: AnimationCurve = DEFAULT_ANIMATION_CURVE,
)

Animates to the page at index.

Parameters:

index (int) - The index of the page to show.
animation_duration (DurationValue, default: DEFAULT_ANIMATION_DURATION) - Length of the animation.
animation_curve (AnimationCurve, default: DEFAULT_ANIMATION_CURVE) - The easing curve of the animation.

Raises:

ValueError - If index is negative.
deployed_code
jump_to
async
​
Copy
jump_to(value: Number)

Immediately sets the scroll position to the given value, without animation and without validating whether the value is within bounds.

Any active scrolling or animation is canceled.

If the scroll position changes, a start/update/end sequence of scroll notifications is dispatched. This method does not generate overscroll notifications.

After the jump, a ballistic activity is initiated if the value is outside the valid scroll range.

Parameters:

value (Number) - The new scroll position.
deployed_code
jump_to_page
async
​
Copy
jump_to_page(index: int)

Jumps immediately to the page at index without animation, moving the page position from its current value to the given value without animation nor range checking.

Parameters:

index (int) - The index of the page to show.

Raises:

ValueError - If index is negative.
deployed_code
next_page
async
​
Copy
next_page(
    animation_duration: DurationValue = DEFAULT_ANIMATION_DURATION,
    animation_curve: AnimationCurve = DEFAULT_ANIMATION_CURVE,
)

Animates to the next page. Same as calling go_to_page with selected_index + 1.

Parameters:

animation_duration (DurationValue, default: DEFAULT_ANIMATION_DURATION) - Length of the animation.
animation_curve (AnimationCurve, default: DEFAULT_ANIMATION_CURVE) - The easing curve of the animation.
deployed_code
previous_page
async
​
Copy
previous_page(
    animation_duration: DurationValue = DEFAULT_ANIMATION_DURATION,
    animation_curve: AnimationCurve = DEFAULT_ANIMATION_CURVE,
)

Animates to the previous page. Same as calling go_to_page with selected_index - 1.

Parameters:

animation_duration (DurationValue, default: DEFAULT_ANIMATION_DURATION) - Length of the animation.
animation_curve (AnimationCurve, default: DEFAULT_ANIMATION_CURVE) - The easing curve of the animation.
Edit this page