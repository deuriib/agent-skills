# ScatterChart
URL: https://flet.dev/docs/controls/charts/scatterchart

ReferenceControlsChartsScatterChart
ScatterChart

A scatter chart control.

ScatterChart draws some points in a square space, points are defined by ScatterChartSpots.

fch.ScatterChart(

    aspect_ratio=1.0,

    spots=[

        fch.ScatterChartSpot(

            x=random.uniform(4, 50),

            y=random.uniform(4, 50),

        )

        for _ in range(30)

    ],

)

Basic scatter chart

Inherits: LayoutControl

Properties
animation - Controls chart implicit animation.
baseline_x - The baseline value for X axis.
baseline_y - Baseline value for Y axis.
bgcolor - The chart's background color.
border - The border around the chart.
bottom_axis - Configures the appearance of the bottom axis, its title and labels.
horizontal_grid_lines - Controls drawing of chart's horizontal lines.
interactive - Enables automatic tooltips when hovering chart bars.
left_axis - Configures the appearance of the left axis, its title and labels.
long_press_duration - The duration of a long press on the chart.
max_x - The maximum displayed value for X axis.
max_y - The maximum displayed value for Y axis.
min_x - The minimum displayed value for X axis.
min_y - The minimum displayed value for Y axis.
right_axis - Configures the appearance of the right axis, its title and labels.
rotation_quarter_turns - Number of quarter turns (90-degree increments) to rotate the chart.
show_tooltips_for_selected_spots_only - Whether to permanently and only show the tooltips of spots with their selected property set to True.
spots - List of ScatterChartSpots to show on the chart.
tooltip - The tooltip configuration for the chart.
top_axis - Configures the appearance of the top axis, its title and labels.
vertical_grid_lines - Controls drawing of chart's vertical lines.
Events
on_event - Called when an event occurs on this chart.
Examples​
Basic Scatter Chart​
import random



import flet as ft

import flet_charts as fch





class MySpot(fch.ScatterChartSpot):

    def __init__(

        self,

        x: float,

        y: float,

        radius: float = 8.0,

        color: ft.Colors = None,

        show_tooltip: bool = False,

    ):

        super().__init__(

            x=x,

            y=y,

            radius=radius,

            color=color,

            show_tooltip=show_tooltip,

            selected=y == 43,

        )





flutter_logo_spots = [

    MySpot(20, 14.5),

    MySpot(20, 14.5),

    MySpot(22, 16.5),

    MySpot(24, 18.5),

    MySpot(22, 12.5),

    MySpot(24, 14.5),

    MySpot(26, 16.5),

    MySpot(24, 10.5),

    MySpot(26, 12.5),

    MySpot(28, 14.5),

    MySpot(26, 8.5),

    MySpot(28, 10.5),

    MySpot(30, 12.5),

    MySpot(28, 6.5),

    MySpot(30, 8.5),

    MySpot(32, 10.5),

    MySpot(30, 4.5),

    MySpot(32, 6.5),

    MySpot(34, 8.5),

    MySpot(34, 4.5),

    MySpot(36, 6.5),

    MySpot(38, 4.5),

    #  section 2

    MySpot(20, 14.5),

    MySpot(22, 12.5),

    MySpot(24, 10.5),

    MySpot(22, 16.5),

    MySpot(24, 14.5),

    MySpot(26, 12.5),

    MySpot(24, 18.5),

    MySpot(26, 16.5),

    MySpot(28, 14.5),

    MySpot(26, 20.5),

    MySpot(28, 18.5),

    MySpot(30, 16.5),

    MySpot(28, 22.5),

    MySpot(30, 20.5),

    MySpot(32, 18.5),

    MySpot(30, 24.5),

    MySpot(32, 22.5),

    MySpot(34, 20.5),

    MySpot(34, 24.5),

    MySpot(36, 22.5),

    MySpot(38, 24.5),

    # section 3

    MySpot(10, 25),

    MySpot(12, 23),

    MySpot(14, 21),

    MySpot(12, 27),

    MySpot(14, 25),

    MySpot(16, 23),

    MySpot(14, 29),

    MySpot(16, 27),

    MySpot(18, 25),

    MySpot(16, 31),

    MySpot(18, 29),

    MySpot(20, 27),

    MySpot(18, 33),

    MySpot(20, 31),

    MySpot(22, 29),

    MySpot(20, 35),

    MySpot(22, 33),

    MySpot(24, 31),

    MySpot(22, 37),

    MySpot(24, 35),

    MySpot(26, 33),

    MySpot(24, 39),

    MySpot(26, 37),

    MySpot(28, 35),

    MySpot(26, 41),

    MySpot(28, 39),

    MySpot(30, 37),

    MySpot(28, 43),

    MySpot(30, 41),

    MySpot(32, 39),

    MySpot(30, 45),

    MySpot(32, 43),

    MySpot(34, 41),

    MySpot(34, 45),

    MySpot(36, 43),

    MySpot(38, 45),

]





def get_random_spots():

    """Generates random spots for the scatter chart."""

    return [

        MySpot(

            x=random.uniform(4, 50),

            y=random.uniform(4, 50),

            radius=random.uniform(4, 20),

        )

        for _ in range(len(flutter_logo_spots))

    ]





def main(page: ft.Page):

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def handle_event(e: fch.ScatterChartEvent):

        if e.type == fch.ChartEventType.TAP_DOWN:

            e.control.spots = (

                flutter_logo_spots

                if (e.control.spots != flutter_logo_spots)

                else get_random_spots()

            )



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        "Tap on the chart to toggle between random spots and Flutter "

                        "logo spots."

                    ),

                    fch.ScatterChart(

                        expand=True,

                        aspect_ratio=1.0,

                        min_x=0.0,

                        max_x=50.0,

                        min_y=0.0,

                        max_y=50.0,

                        left_axis=fch.ChartAxis(show_labels=False),

                        right_axis=fch.ChartAxis(show_labels=False),

                        top_axis=fch.ChartAxis(show_labels=False),

                        bottom_axis=fch.ChartAxis(show_labels=False),

                        show_tooltips_for_selected_spots_only=False,

                        on_event=handle_event,

                        animation=ft.Animation(

                            duration=ft.Duration(milliseconds=600),

                            curve=ft.AnimationCurve.FAST_OUT_SLOWIN,

                        ),

                        spots=flutter_logo_spots,

                    ),

                ],

            ),

        ),

    )





if __name__ == "__main__":

    ft.run(main)

Properties​
build
animation
class-attribute
instance-attribute
​
Copy
animation: AnimationValue = field(
    default_factory=lambda: Animation(
        duration=Duration(milliseconds=150),
        curve=AnimationCurve.LINEAR,
    )
)

Controls chart implicit animation.

build
baseline_x
class-attribute
instance-attribute
​
Copy
baseline_x: Number | None = None

The baseline value for X axis.

build
baseline_y
class-attribute
instance-attribute
​
Copy
baseline_y: Number | None = None

Baseline value for Y axis.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The chart's background color.

build
border
class-attribute
instance-attribute
​
Copy
border: Border | None = None

The border around the chart.

build
bottom_axis
class-attribute
instance-attribute
​
Copy
bottom_axis: ChartAxis | None = None

Configures the appearance of the bottom axis, its title and labels.

build
horizontal_grid_lines
class-attribute
instance-attribute
​
Copy
horizontal_grid_lines: ChartGridLines | None = None

Controls drawing of chart's horizontal lines.

build
interactive
class-attribute
instance-attribute
​
Copy
interactive: bool = True

Enables automatic tooltips when hovering chart bars.

build
left_axis
class-attribute
instance-attribute
​
Copy
left_axis: ChartAxis | None = None

Configures the appearance of the left axis, its title and labels.

build
long_press_duration
class-attribute
instance-attribute
​
Copy
long_press_duration: DurationValue | None = None

The duration of a long press on the chart.

build
max_x
class-attribute
instance-attribute
​
Copy
max_x: Number | None = None

The maximum displayed value for X axis.

build
max_y
class-attribute
instance-attribute
​
Copy
max_y: Number | None = None

The maximum displayed value for Y axis.

build
min_x
class-attribute
instance-attribute
​
Copy
min_x: Number | None = None

The minimum displayed value for X axis.

build
min_y
class-attribute
instance-attribute
​
Copy
min_y: Number | None = None

The minimum displayed value for Y axis.

build
right_axis
class-attribute
instance-attribute
​
Copy
right_axis: ChartAxis | None = None

Configures the appearance of the right axis, its title and labels.

build
rotation_quarter_turns
class-attribute
instance-attribute
​
Copy
rotation_quarter_turns: Number = 0

Number of quarter turns (90-degree increments) to rotate the chart. Ex: 1 rotates the chart 90 degrees clockwise, 2 rotates 180 degrees and 0 for no rotation.

build
show_tooltips_for_selected_spots_only
class-attribute
instance-attribute
​
Copy
show_tooltips_for_selected_spots_only: bool = False

Whether to permanently and only show the tooltips of spots with their selected property set to True.

build
spots
class-attribute
instance-attribute
​
Copy
spots: list[ScatterChartSpot] = field(default_factory=list)

List of ScatterChartSpots to show on the chart.

build
tooltip
class-attribute
instance-attribute
​
Copy
tooltip: ScatterChartTooltip = field(
    default_factory=lambda: ScatterChartTooltip()
)

The tooltip configuration for the chart.

build
top_axis
class-attribute
instance-attribute
​
Copy
top_axis: ChartAxis | None = None

Configures the appearance of the top axis, its title and labels.

build
vertical_grid_lines
class-attribute
instance-attribute
​
Copy
vertical_grid_lines: ChartGridLines | None = None

Controls drawing of chart's vertical lines.

Events​
bolt
on_event
class-attribute
instance-attribute
​
Copy
on_event: EventHandler[ScatterChartEvent] | None = None

Called when an event occurs on this chart.

Edit this page