# GridView
URL: https://flet.dev/docs/controls/gridview

ReferenceControlsGridView
GridView

A scrollable, 2D array of controls.

It is very effective for large lists (thousands of items). Prefer it over wrapping Columns or Rows for smooth scrolling.

ft.GridView(

    width=180,

    runs_count=2,

    spacing=8,

    controls=[

        ft.Container(

            width=50, height=50, bgcolor=ft.Colors.PRIMARY, border_radius=8

        ),

        ft.Container(

            width=50, height=50, bgcolor=ft.Colors.SECONDARY, border_radius=8

        ),

        ft.Container(

            width=50, height=50, bgcolor=ft.Colors.TERTIARY, border_radius=8

        ),

        ft.Container(

            width=50, height=50, bgcolor=ft.Colors.ERROR, border_radius=8

        ),

    ],

)

Basic GridView

Inherits: LayoutControl, ScrollableControl, AdaptiveControl

Properties
build_controls_on_demand - TBD
cache_extent - Items that fall in the cache area (area before or after the visible area that are about to become visible when the user scrolls) are laid out even though they are not (yet) visible on screen.
child_aspect_ratio - The ratio of the cross-axis to the main-axis extent of each child.
clip_behavior - The content will be clipped (or not) according to this option.
controls - A list of controls to display inside grid.
horizontal - Whether to layout the grid items horizontally.
max_extent - The maximum width or height of the grid item.
padding - The amount of space by which to inset the children.
reverse - Whether the scroll view scrolls in the reading direction.
run_spacing - The number of logical pixels between each child along the cross axis.
runs_count - The number of children in the cross axis.
semantic_child_count - The number of children that will contribute semantic information.
spacing - The number of logical pixels between each child along the main axis.
Examples​

Live example

Photo gallery​
import flet as ft





def main(page: ft.Page):

    page.title = "GridView Example"

    page.theme_mode = ft.ThemeMode.DARK

    page.padding = 50



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.GridView(

                expand=True,

                runs_count=5,

                max_extent=150,

                child_aspect_ratio=1.0,

                spacing=5,

                run_spacing=5,

                controls=[

                    ft.Image(

                        src=f"https://picsum.photos/150/150?{i}",

                        fit=ft.BoxFit.NONE,

                        repeat=ft.ImageRepeat.NO_REPEAT,

                        border_radius=ft.BorderRadius.all(10),

                    )

                    for i in range(0, 60)

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
build_controls_on_demand
class-attribute
instance-attribute
​
Copy
build_controls_on_demand: bool = True

TBD

build
cache_extent
class-attribute
instance-attribute
​
Copy
cache_extent: Number | None = None

Items that fall in the cache area (area before or after the visible area that are about to become visible when the user scrolls) are laid out even though they are not (yet) visible on screen.

The cacheExtent describes how many pixels the cache area extends before the leading edge and after the trailing edge of the viewport.

The total extent, which the viewport will try to cover with controls, is cache_extent before the leading edge + extent of the main axis + cache_extent after the trailing edge.

build
child_aspect_ratio
class-attribute
instance-attribute
​
Copy
child_aspect_ratio: Number = 1.0

The ratio of the cross-axis to the main-axis extent of each child.

build
clip_behavior
class-attribute
instance-attribute
​
Copy
clip_behavior: ClipBehavior | None = None

The content will be clipped (or not) according to this option.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[Control] = field(default_factory=list)

A list of controls to display inside grid.

build
horizontal
class-attribute
instance-attribute
​
Copy
horizontal: bool = False

Whether to layout the grid items horizontally.

build
max_extent
class-attribute
instance-attribute
​
Copy
max_extent: int | None = None

The maximum width or height of the grid item.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

The amount of space by which to inset the children.

build
reverse
class-attribute
instance-attribute
​
Copy
reverse: bool = False

Whether the scroll view scrolls in the reading direction.

For example, if the reading direction is left-to-right and horizontal is True, then the scroll view scrolls from left to right when reverse is False and from right to left when reverse is True.

Similarly, if horizontal is False, then the scroll view scrolls from top to bottom when reverse is False and from bottom to top when reverse is True.

build
run_spacing
class-attribute
instance-attribute
​
Copy
run_spacing: Number = 10

The number of logical pixels between each child along the cross axis.

build
runs_count
class-attribute
instance-attribute
​
Copy
runs_count: int = 1

The number of children in the cross axis.

build
semantic_child_count
class-attribute
instance-attribute
​
Copy
semantic_child_count: int | None = None

The number of children that will contribute semantic information.

build
spacing
class-attribute
instance-attribute
​
Copy
spacing: Number = 10

The number of logical pixels between each child along the main axis.

Edit this page