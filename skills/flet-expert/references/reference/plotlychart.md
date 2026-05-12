# PlotlyChart
URL: https://flet.dev/docs/controls/charts/plotlychart

ReferenceControlsChartsPlotlyChart
PlotlyChart

Displays a Plotly chart.

WARNING

This control requires the plotly and kaleido Python packages to be installed.

See this installation guide for more information.

import plotly.express as px



data_canada = px.data.gapminder().query("country == 'Canada'")

fig = px.bar(data_canada, x="year", y="pop")

fch.PlotlyChart(figure=fig, expand=True)

Bar chart based on official [Plotly example](https://plotly.com/python/bar-charts)

Inherits: Container

Properties
figure - Plotly figure to draw.
original_size - Whether to display this chart in original size.
Examples​
Example 1​

Based on an official Plotly example.

import plotly.express as px



import flet as ft

import flet_charts as fch





def main(page: ft.Page):

    df = px.data.gapminder().query("continent=='Oceania'")

    fig = px.line(df, x="year", y="lifeExp", color="country")



    page.add(ft.SafeArea(content=fch.PlotlyChart(figure=fig, expand=True)))





if __name__ == "__main__":

    ft.run(main)

Example 2​

Based on an official Plotly example.

import plotly.express as px



import flet as ft

import flet_charts as fch





def main(page: ft.Page):

    df = px.data.gapminder().query("continent == 'Oceania'")

    fig = px.bar(

        df,

        x="year",

        y="pop",

        hover_data=["lifeExp", "gdpPercap"],

        color="country",

        labels={"pop": "population of Canada"},

        height=400,

    )



    page.add(ft.SafeArea(content=fch.PlotlyChart(figure=fig, expand=True)))





if __name__ == "__main__":

    ft.run(main)

Example 3​

Based on an official Plotly example.

import plotly.graph_objects as go



import flet as ft

import flet_charts as fch





def main(page: ft.Page):

    labels = ["Oxygen", "Hydrogen", "Carbon_Dioxide", "Nitrogen"]

    values = [4500, 2500, 1053, 500]



    fig = go.Figure(data=[go.Pie(labels=labels, values=values)])



    page.add(ft.SafeArea(content=fch.PlotlyChart(figure=fig, expand=True)))





if __name__ == "__main__":

    ft.run(main)

Example 4​

Based on an official Plotly example.

import plotly.graph_objects as go



import flet as ft

import flet_charts as fch





def main(page: ft.Page):

    x = [

        "day 1",

        "day 1",

        "day 1",

        "day 1",

        "day 1",

        "day 1",

        "day 2",

        "day 2",

        "day 2",

        "day 2",

        "day 2",

        "day 2",

    ]



    fig = go.Figure()



    fig.add_trace(

        go.Box(

            y=[0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],

            x=x,

            name="kale",

            marker_color="#3D9970",

        )

    )

    fig.add_trace(

        go.Box(

            y=[0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],

            x=x,

            name="radishes",

            marker_color="#FF4136",

        )

    )

    fig.add_trace(

        go.Box(

            y=[0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],

            x=x,

            name="carrots",

            marker_color="#FF851B",

        )

    )



    fig.update_layout(

        yaxis_title="normalized moisture",

        boxmode="group",  # group together boxes of the different traces

    )



    page.add(ft.SafeArea(content=fch.PlotlyChart(figure=fig, expand=True)))





if __name__ == "__main__":

    ft.run(main)

Properties​
build
figure
class-attribute
instance-attribute
​
Copy
figure: Figure = field(metadata={'skip': True})

Plotly figure to draw.

The value is an instance of plotly.graph_objects.Figure.

build
original_size
class-attribute
instance-attribute
​
Copy
original_size: bool = False

Whether to display this chart in original size.

Set to False for it to fit it's configured bounds.

Edit this page