# RadarChart
URL: https://flet.dev/docs/controls/charts/radarchart

ReferenceControlsChartsRadarChart
RadarChart

A radar chart made of multiple datasets.

fch.RadarChart(

    titles=[fch.RadarChartTitle(text="winter"), ...],

    radar_shape=fch.RadarShape.CIRCLE,

    data_sets=[

        fch.RadarDataSet(

            fill_color=ft.Colors.with_opacity(0.2, ft.Colors.BLUE_GREY_700),

            entries=[fch.RadarDataSetEntry(130), ...],

        ),

        ...,

    ],

)

Basic radar chart

Inherits: LayoutControl

Properties
animation - Controls the implicit animation applied when updating this chart.
border - The border drawn around this chart.
center_min_value - Whether minimum entry values should be positioned at the center of this chart.
data_sets - A list of RadarDataSet controls rendered on the chart.
grid_border_side - The style of the radar grid lines.
interactive - Enables touch interactions and event notifications.
long_press_duration - The duration before a long-press event fires.
radar_bgcolor - The background color of the radar area.
radar_border_side - The outline drawn around the radar area.
radar_shape - The shape of the radar area.
tick_border_side - The style of the tick rings.
tick_count - Number of tick rings drawn from the centre to the edge.
ticks_text_style - The text style used to draw tick labels.
title_position_percentage_offset - Defines the relative distance of titles from the chart center.
title_text_style - The text style applied to titles around this chart.
titles - The titles shown around this chart, matching the number of entries per set.
touch_spot_threshold - The radius (in logical pixels) used to detect nearby entries for touches.
Events
on_event - Called when the chart is interacted with.
Examples​
Example 1​
import flet as ft

import flet_charts as fch





def main(page: ft.Page):

    page.title = "Radar chart"

    page.padding = 20

    # page.vertical_alignment = page.horizontal_alignment = "center"

    page.theme_mode = ft.ThemeMode.LIGHT



    categories = ["macOS", "Linux", "Windows"]



    page.add(

        ft.SafeArea(

            content=fch.RadarChart(

                expand=True,

                titles=[fch.RadarChartTitle(text=label) for label in categories],

                center_min_value=True,

                tick_count=4,

                ticks_text_style=ft.TextStyle(size=20, color=ft.Colors.ON_SURFACE),

                title_text_style=ft.TextStyle(

                    size=24, weight=ft.FontWeight.BOLD, color=ft.Colors.ON_SURFACE

                ),

                on_event=lambda e: print(e.type),

                data_sets=[

                    fch.RadarDataSet(

                        fill_color=ft.Colors.with_opacity(0.2, ft.Colors.DEEP_PURPLE),

                        border_color=ft.Colors.DEEP_PURPLE,

                        entry_radius=4,

                        entries=[

                            fch.RadarDataSetEntry(300),

                            fch.RadarDataSetEntry(50),

                            fch.RadarDataSetEntry(250),

                        ],

                    ),

                    fch.RadarDataSet(

                        fill_color=ft.Colors.with_opacity(0.15, ft.Colors.PINK),

                        border_color=ft.Colors.PINK,

                        entry_radius=4,

                        entries=[

                            fch.RadarDataSetEntry(250),

                            fch.RadarDataSetEntry(100),

                            fch.RadarDataSetEntry(200),

                        ],

                    ),

                    fch.RadarDataSet(

                        fill_color=ft.Colors.with_opacity(0.12, ft.Colors.CYAN),

                        border_color=ft.Colors.CYAN,

                        entry_radius=4,

                        entries=[

                            fch.RadarDataSetEntry(200),

                            fch.RadarDataSetEntry(150),

                            fch.RadarDataSetEntry(50),

                        ],

                    ),

                ],

            ),

        )

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

Controls the implicit animation applied when updating this chart.

build
border
class-attribute
instance-attribute
​
Copy
border: Border | None = None

The border drawn around this chart.

build
center_min_value
class-attribute
instance-attribute
​
Copy
center_min_value: bool = False

Whether minimum entry values should be positioned at the center of this chart.

build
data_sets
class-attribute
instance-attribute
​
Copy
data_sets: list[RadarDataSet] = field(default_factory=list)

A list of RadarDataSet controls rendered on the chart.

build
grid_border_side
class-attribute
instance-attribute
​
Copy
grid_border_side: BorderSide = field(
    default_factory=lambda: BorderSide(width=2.0)
)

The style of the radar grid lines.

build
interactive
class-attribute
instance-attribute
​
Copy
interactive: bool = True

Enables touch interactions and event notifications.

build
long_press_duration
class-attribute
instance-attribute
​
Copy
long_press_duration: DurationValue | None = None

The duration before a long-press event fires.

build
radar_bgcolor
class-attribute
instance-attribute
​
Copy
radar_bgcolor: ColorValue = Colors.TRANSPARENT

The background color of the radar area.

build
radar_border_side
class-attribute
instance-attribute
​
Copy
radar_border_side: BorderSide = field(
    default_factory=lambda: BorderSide(width=2.0)
)

The outline drawn around the radar area.

build
radar_shape
class-attribute
instance-attribute
​
Copy
radar_shape: RadarShape = RadarShape.POLYGON

The shape of the radar area.

build
tick_border_side
class-attribute
instance-attribute
​
Copy
tick_border_side: BorderSide = field(
    default_factory=lambda: BorderSide(width=2.0)
)

The style of the tick rings.

build
tick_count
class-attribute
instance-attribute
​
Copy
tick_count: Number = 1

Number of tick rings drawn from the centre to the edge.

Must be greater than or equal to 1.

Raises:

ValueError - If set to a value less than 1.
build
ticks_text_style
class-attribute
instance-attribute
​
Copy
ticks_text_style: TextStyle | None = None

The text style used to draw tick labels.

build
title_position_percentage_offset
class-attribute
instance-attribute
​
Copy
title_position_percentage_offset: Number = 0.2

Defines the relative distance of titles from the chart center.

0 draws titles near the inside edge of each section.
1 draws titles near the outside edge of each section.

Must be between 0 and 1 (inclusive).

Raises:

ValueError - If set to a value less than 0 or greater than 1.
build
title_text_style
class-attribute
instance-attribute
​
Copy
title_text_style: TextStyle | None = None

The text style applied to titles around this chart.

build
titles
class-attribute
instance-attribute
​
Copy
titles: list[RadarChartTitle] = field(default_factory=list)

The titles shown around this chart, matching the number of entries per set.

build
touch_spot_threshold
class-attribute
instance-attribute
​
Copy
touch_spot_threshold: Number = 10

The radius (in logical pixels) used to detect nearby entries for touches.

Events​
bolt
on_event
class-attribute
instance-attribute
​
Copy
on_event: EventHandler[RadarChartEvent] | None = None

Called when the chart is interacted with.

Edit this page