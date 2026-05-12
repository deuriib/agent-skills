# MatplotlibChart
URL: https://flet.dev/docs/controls/charts/matplotlibchart

ReferenceControlsChartsMatplotlibChart
MatplotlibChart

Displays a Matplotlib chart.

To display a Matplotlib figure with a built-in toolbar UI, use MatplotlibChartWithToolbar.

WARNING

This control requires the matplotlib Python package to be installed.

See this installation guide for more information.

Inherits: GestureDetector

Properties
figure - Matplotlib figure to draw - an instance of matplotlib.figure.Figure.
Events
on_message - The event is triggered on figure message update.
on_toolbar_buttons_update - Triggers when toolbar buttons status is updated.
Methods
back - Goes back to the previous view.
build
download - Downloads the current figure in the specified format.
forward - Goes forward to the next view.
home - Resets the view to the original state.
pan - Activates the pan tool.
send_binary - Sends a binary message to the front end.
send_json - Sends a JSON message to the front end.
send_message - Sends a message to the figure's canvas manager.
will_unmount - Called when the control is about to be removed from the page.
zoom - Activates the zoom tool.
Examples​
Bar chart​

Based on an official Matplotlib example.

import matplotlib.pyplot as plt



import flet as ft

import flet_charts as fch





def main(page: ft.Page):

    fig, ax = plt.subplots()



    fruits = ["apple", "blueberry", "cherry", "orange"]

    counts = [40, 100, 30, 55]

    bar_labels = ["red", "blue", "_red", "orange"]

    bar_colors = ["tab:red", "tab:blue", "tab:red", "tab:orange"]



    ax.bar(fruits, counts, label=bar_labels, color=bar_colors)



    ax.set_ylabel("fruit supply")

    ax.set_title("Fruit supply by kind and color")

    ax.legend(title="Fruit color")



    page.add(

        ft.SafeArea(

            expand=True,

            content=fch.MatplotlibChart(figure=fig, expand=True),

        )

    )





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

Matplotlib figure to draw - an instance of matplotlib.figure.Figure.

Events​
bolt
on_message
class-attribute
instance-attribute
​
Copy
on_message: (
    EventHandler[MatplotlibChartMessageEvent] | None
) = None

The event is triggered on figure message update.

bolt
on_toolbar_buttons_update
class-attribute
instance-attribute
​
Copy
on_toolbar_buttons_update: (
    EventHandler[
        MatplotlibChartToolbarButtonsUpdateEvent
    ]
    | None
) = None

Triggers when toolbar buttons status is updated.

Methods​
deployed_code
back
​
Copy
back()

Goes back to the previous view.

deployed_code
build
​
Copy
build()
deployed_code
download
​
Copy
download(format) -> bytes

Downloads the current figure in the specified format. Args: format (str): The format to download the figure in (e.g., 'png', 'jpg', 'svg', etc.). Returns: bytes: The figure image in the specified format as a byte array.

deployed_code
forward
​
Copy
forward()

Goes forward to the next view.

deployed_code
home
​
Copy
home()

Resets the view to the original state.

deployed_code
pan
​
Copy
pan()

Activates the pan tool.

deployed_code
send_binary
​
Copy
send_binary(blob)

Sends a binary message to the front end.

deployed_code
send_json
​
Copy
send_json(content)

Sends a JSON message to the front end.

deployed_code
send_message
​
Copy
send_message(message)

Sends a message to the figure's canvas manager.

deployed_code
will_unmount
​
Copy
will_unmount()

Called when the control is about to be removed from the page.

deployed_code
zoom
​
Copy
zoom()

Activates the zoom tool.

Edit this page