# ProgressBar
URL: https://flet.dev/docs/controls/progressbar

ReferenceControlsProgressBar
ProgressBar

A material design linear progress indicator, also known as a progress bar.

A control that shows progress along a line.

Example:

ft.ProgressBar(width=400, value=0.8)

Fixed progress bar

Inherits: LayoutControl

Properties
bar_height - The minimum height of the line used to draw the linear indicator.
bgcolor - Color of the track being filled by the linear indicator.
border_radius - The border radius of both the indicator and the track.
color - The progress indicator's color.
semantics_label - The semantics label for this progress indicator.
semantics_value - The semantics label for this progress indicator.
stop_indicator_color - The color of the stop indicator.
stop_indicator_radius - The radius of the stop indicator.
track_gap - The gap between the indicator and the track.
value - The value of this progress indicator.
year_2023 - If this is set to False, the ProgressBar will use the latest Material Design 3 appearance, which was introduced in December 2023.
Examples​

Live example

Determinate and indeterminate progress bars​
import asyncio



import flet as ft





async def main(page: ft.Page):

    determinate_bar = ft.ProgressBar(width=400)

    determinate_message = ft.Text("Doing something...")



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Text(

                        value="Linear progress indicator",

                        theme_style=ft.TextThemeStyle.HEADLINE_SMALL,

                    ),

                    ft.Column(controls=[determinate_message, determinate_bar]),

                    ft.Text(

                        value="Indeterminate progress bar",

                        theme_style=ft.TextThemeStyle.HEADLINE_SMALL,

                    ),

                    ft.ProgressBar(width=400, color=ft.Colors.AMBER),

                ]

            )

        )

    )



    for i in range(0, 101):

        determinate_bar.value = i * 0.01

        await asyncio.sleep(0.1)

        if i == 100:

            determinate_message.value = "Finished!"

        page.update()





if __name__ == "__main__":

    ft.run(main)

Properties​
build
bar_height
class-attribute
instance-attribute
​
Copy
bar_height: Number | None = None

The minimum height of the line used to draw the linear indicator.

Raises:

ValueError - If it is not greater than or equal to 0.
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Color of the track being filled by the linear indicator.

build
border_radius
class-attribute
instance-attribute
​
Copy
border_radius: BorderRadiusValue | None = None

The border radius of both the indicator and the track.

Defaults to BorderRadius.all(0) - rectangular shape.

build
color
class-attribute
instance-attribute
​
Copy
color: ColorValue | None = None

The progress indicator's color.

build
semantics_label
class-attribute
instance-attribute
​
Copy
semantics_label: str | None = None

The semantics label for this progress indicator.

build
semantics_value
class-attribute
instance-attribute
​
Copy
semantics_value: Number | None = None

The semantics label for this progress indicator.

Raises:

ValueError - If it is not greater than or equal to 0.
build
stop_indicator_color
class-attribute
instance-attribute
​
Copy
stop_indicator_color: ColorValue | None = None

The color of the stop indicator.

If ProgressBar.year_2023 is True or Theme.use_material3 is False, then no stop indicator will be drawn.

If not set, then the ProgressIndicatorTheme.stop_indicator_color will be used. If that is not set, then the ColorScheme.primary will be used.

build
stop_indicator_radius
class-attribute
instance-attribute
​
Copy
stop_indicator_radius: Number | None = None

The radius of the stop indicator.

If ProgressBar.year_2023 is True or Theme.use_material3 is False, then no stop indicator will be drawn.

Set stop_indicator_radius to 0 to hide the stop indicator.

If not set, then the ProgressIndicatorTheme.stop_indicator_radius will be used. If that is not set, then defaults to 2.

build
track_gap
class-attribute
instance-attribute
​
Copy
track_gap: Number | None = None

The gap between the indicator and the track.

If ProgressBar.year_2023 is True or Theme.use_material3 is False, then no track gap will be drawn.

If not set, then the ProgressIndicatorTheme.track_gap will be used. If that is not set, then defaults to 4.

TIP

Set track_gap to 0 to hide the track gap.

build
value
class-attribute
instance-attribute
​
Copy
value: Number | None = None

The value of this progress indicator.

A value of 0.0 means no progress and 1.0 means that progress is complete. The value will be clamped to be in the range 0.0 - 1.0.

Defaults to None, meaning that this progress indicator is indeterminate - displays a predetermined animation that does not indicate how much actual progress is being made.

Raises:

ValueError - If it is not greater than or equal to 0.
build
year_2023
class-attribute
instance-attribute
​
Copy
year_2023: bool | None = None

If this is set to False, the ProgressBar will use the latest Material Design 3 appearance, which was introduced in December 2023.

When True, the ProgressBar will use the 2023 Material Design 3 appearance.

If not set, then the ProgressIndicatorTheme.year_2023 will be used, which is False by default.

If Theme.use_material3 is False, then this property is ignored.

Edit this page