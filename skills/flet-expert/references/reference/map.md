# Map
URL: https://flet.dev/docs/controls/map/

ReferenceControlsMap
Map

Display interactive maps in your Flet apps with markers, overlays, and rich attributions provided by the flet-map extension. The control is built on top of flutter_map and supports multiple tile providers and layers.

Platform Support​
Platform	Windows	macOS	Linux	iOS	Android	Web
Supported	✅	✅	✅	✅	✅	✅
Usage​

Add the flet-map package to your project dependencies:

uv
pip
uv add flet-map

IMPORTANT

Different tile providers have their own usage policies. Make sure you fully comply with their requirements (ex: attribution, rate limits) when using them in your app, to avoid being blocked or facing legal issues. More details here.

Examples​
Basic​
import flet as ft

import flet_map as ftm





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=ftm.Map(

                expand=True,

                layers=[

                    ftm.TileLayer(

                        url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                        user_agent_package_name="flet-map-examples/1.0",

                        on_image_error=lambda e: print(f"TileLayer Error: {e.data}"),

                    ),

                    ftm.SimpleAttribution(text="OpenStreetMap contributors"),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Attributions​
import flet as ft

import flet_map as ftm





def main(page: ft.Page):

    def launch_url(url: str):

        page.run_task(ft.UrlLauncher().launch_url, url)



    page.add(

        ft.SafeArea(

            expand=True,

            content=ftm.Map(

                expand=True,

                initial_zoom=11,

                initial_center=ftm.MapLatitudeLongitude(

                    latitude=40.7128, longitude=-74.0060

                ),

                layers=[

                    ftm.TileLayer(

                        url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                        user_agent_package_name="flet-map-examples/1.0",

                        on_image_error=lambda e: print(f"TileLayer Error: {e.data}"),

                    ),

                    ftm.SimpleAttribution(

                        text="OpenStreetMap contributors",

                        text_style=ft.TextStyle(

                            color=ft.Colors.WHITE, weight=ft.FontWeight.BOLD, size=15

                        ),

                        alignment=ft.Alignment.TOP_RIGHT,

                        bgcolor=ft.Colors.BLUE,

                        on_click=lambda: launch_url(

                            "https://www.openstreetmap.org/copyright"

                        ),

                    ),

                    ftm.RichAttribution(

                        alignment=ftm.AttributionAlignment.BOTTOM_RIGHT,

                        popup_bgcolor=ft.Colors.WHITE,

                        popup_border_radius=8,

                        popup_initial_display_duration=4000,

                        permanent_height=28,

                        attributions=[

                            ftm.ImageSourceAttribution(

                                image=ft.Image(

                                    src="iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAACXBIWXMAAAORAAADkQFnq8zdAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA6dJREFUSImllltoHFUYx3/fzOzm0lt23ZrQ1AQbtBehNpvQohgkBYVo410RwQctNE3Sh0IfiiBoIAjqi6TYrKnFy4O3oiiRavDJFi3mXomIBmOxNZe63ay52GR3Zj4f2sTEzmx3m//TYf7/c35zvgPnO6KqrESXqpq3muocAikv6m+/zytj3ejik1VN21G31YA9CgJ6xC+bMyQZPVCuarciPAMYC99V6Vw5pLbFSibHmlVoRVj9P3cmPBM8tSJI/M6mzabpfoAQ9fIF7WK4bd5vvuFnLGgy2vi0abg94A0AcJGvMq3hDxGRyar9r4F+iLAm0yIiRk8m37tctS1WsrIhhrI30+Srmg+J87OXUf3lWGS1q89dC6ltsSanxk4Aj2QBABii96300g87P/rtlrWr8l+vyDMfdlXSyyEikqxsiOUAQJCBhfHdXRfCq1LSsSlcWG+KBAGStvvrMkgiuv8lUc2mREukPwLUfHG+uTQv8Eown7VL3XlbBxYhf1c17hbVF3MDwA9bts280TnaU1YYqPby07aeFlUlHt27wSQ4CLo+F8AvoTCvHmyKF+ZbEb/M77P2LgvAwmrTHAHflN3KZxVbMC2jMFNOpgPnrMSOhvvFkMezXdwV4ePbtvHtxnJAMQ0j4JtVnO+eLb5oiSlt5HDbv7t1O90lpYCCCKbhfzW5kAIwUAazR0BlfII8Ow0I6uoVmI9MyAMwbMs8CExmDbk4zgu931MyO4OI4KrYflkRjOoTI+uM9d1vjotwKPu9QMk/sxzuO8POiVFcdZ1M2YBVsMEAKOqLvaPIe7mACuw0z/80SMH58SMplxlfiDhVi7dw2pltRhjKBQTQdrSja2KKTfE551NHuaZ0QVPvWYQUn31/Vm2nDvgjF4grVJx6suSvrvrSJ/6cSW2Oz9mf264uNrB806xZ1k/CZ49dUKgDEtlCROX2hfHpx8pGuuo3PpqYulw8fjndOp1yhgtNKRevJ1FyR2Ola+jXAjdnwTkZ6o896GdWdxDw7IxFg+0DpmXchTKSBWQnIuJn9u4j7dt+13UfHXEkXQOcuQ4kMhVtqsgUyPiQiPQfHw1NB2sRjmXKuTg1NwwBYLhtPtQX26eqTwGXPDOqvmcC4Hnwfrrad94GrVsOYTqUTkQY+iTlNe/6O1miSP/x0VB/+wMIDwHn/vtV1iQC4Xv95uUEWVCoL9Y5Z+gdovoyMHUFJHv88jmVy0vTuw7cZNv2YaA61Bfb7ZX5F8SaUv2xwZevAAAAAElFTkSuQmCC",  # noqa: E501

                                    width=74,

                                    height=28,

                                    fit=ft.BoxFit.CONTAIN,

                                ),

                                height=28,

                                tooltip="Flet Logo",

                                on_click=lambda: launch_url("https://flet.dev"),

                            ),

                            ftm.TextSourceAttribution(

                                text="OpenStreetMap contributors",

                                text_style=ft.TextStyle(size=12),

                                on_click=lambda: launch_url(

                                    "https://www.openstreetmap.org/copyright"

                                ),

                            ),

                            ftm.TextSourceAttribution(

                                text="flet-map",

                                text_style=ft.TextStyle(

                                    color=ft.Colors.RED,

                                    size=15,

                                    weight=ft.FontWeight.BOLD,

                                    decoration=ft.TextDecoration.UNDERLINE,

                                ),

                                prepend_copyright=False,

                                on_click=lambda: launch_url(

                                    "https://flet.dev/docs/controls/map/"

                                ),

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Camera Controls​
import flet as ft

import flet_map as ftm





def main(page: ft.Page):

    page.padding = 16



    async def update_camera_status(trigger: str):

        camera = await my_map.get_camera()

        camera_status.value = (

            f"Camera [{trigger}]: "

            f"center=({camera.center.latitude:.5f}, {camera.center.longitude:.5f}), "

            f"zoom={camera.zoom:.2f}, rotation={camera.rotation:.1f}"

        )

        page.update()



    async def zoom_in(e: ft.Event[ft.Button]):

        await my_map.zoom_in()

        await update_camera_status("zoom_in")



    async def zoom_out(e: ft.Event[ft.Button]):

        await my_map.zoom_out()

        await update_camera_status("zoom_out")



    async def rotate_plus_15(e: ft.Event[ft.Button]):

        await my_map.rotate_from(15)

        await update_camera_status("rotate_from(+15)")



    async def reset_rotation(e: ft.Event[ft.Button]):

        await my_map.reset_rotation()

        await update_camera_status("reset_rotation")



    async def center_berlin(e: ft.Event[ft.Button]):

        await my_map.center_on(point=ftm.MapLatitudeLongitude(52.52, 13.405), zoom=12)

        await update_camera_status("center_on(berlin)")



    async def move_tokyo(e: ft.Event[ft.Button]):

        await my_map.move_to(

            destination=ftm.MapLatitudeLongitude(35.6762, 139.6503), zoom=11

        )

        await update_camera_status("move_to(tokyo)")



    async def set_world_zoom(e: ft.Event[ft.Button]):

        await my_map.zoom_to(3)

        await update_camera_status("zoom_to(3)")



    page.appbar = ft.AppBar(title="Camera controls")

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                controls=[

                    ft.Text(

                        "Use buttons to control map camera programmatically.",

                        size=12,

                    ),

                    ft.Row(

                        wrap=True,

                        spacing=8,

                        run_spacing=8,

                        controls=[

                            ft.Button("Zoom in", on_click=zoom_in),

                            ft.Button("Zoom out", on_click=zoom_out),

                            ft.Button("Rotate +15°", on_click=rotate_plus_15),

                            ft.Button("Reset rotation", on_click=reset_rotation),

                            ft.Button("Center Berlin", on_click=center_berlin),

                            ft.Button("Move to Tokyo", on_click=move_tokyo),

                            ft.Button("World zoom (3)", on_click=set_world_zoom),

                        ],

                    ),

                    camera_status := ft.Text(selectable=True, font_family="monospace"),

                    my_map := ftm.Map(

                        expand=True,

                        initial_center=ftm.MapLatitudeLongitude(52.52, 13.405),

                        initial_zoom=5,

                        layers=[

                            ftm.TileLayer(

                                url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                                user_agent_package_name="flet-map-examples/1.0",

                            ),

                            ftm.SimpleAttribution(

                                text="OpenStreetMap contributors",

                                on_click=lambda e: e.page.launch_url(

                                    "https://www.openstreetmap.org/copyright"

                                ),

                            ),

                            ftm.MarkerLayer(

                                markers=[

                                    ftm.Marker(

                                        coordinates=ftm.MapLatitudeLongitude(

                                            52.52, 13.405

                                        ),

                                        content=ft.Icon(ft.Icons.LOCATION_ON),

                                    ),

                                    ftm.Marker(

                                        coordinates=ftm.MapLatitudeLongitude(

                                            35.6762, 139.6503

                                        ),

                                        content=ft.Icon(ft.Icons.LOCATION_ON),

                                    ),

                                ]

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Idle Camera​
import flet as ft

import flet_map as ftm



IDLE_EVENT_TYPES = {

    ftm.MapEventType.MOVE_END,

    ftm.MapEventType.FLING_ANIMATION_END,

    ftm.MapEventType.FLING_ANIMATION_NOT_STARTED,

    ftm.MapEventType.DOUBLE_TAP_ZOOM_END,

    ftm.MapEventType.ROTATE_END,

}





def main(page: ft.Page):

    page.padding = 16



    async def handle_map_event(e: ftm.MapEvent):

        last_event.value = (

            "Last event: "

            f"type={e.event_type}, source={e.source.value}, zoom={e.camera.zoom:.2f}"

        )



        if e.event_type in IDLE_EVENT_TYPES:  # here the camera is settled/idle

            camera = await e.control.get_camera()

            settled_camera.value = (

                "Settled camera: "

                f"center=({camera.center.latitude:.3f}, "

                f"{camera.center.longitude:.3f}), "

                f"zoom={camera.zoom:.2f}, rotation={camera.rotation:.1f}, "

                f"trigger={e.event_type}"

            )



        page.update()



    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                controls=[

                    ft.Text("Camera idle pattern", size=20, weight=ft.FontWeight.BOLD),

                    ft.Text(

                        (

                            "Drag, fling, rotate, zoom and watch "

                            "when the camera is settled."

                        ),

                        size=12,

                    ),

                    last_event := ft.Text(

                        "Last event: -", selectable=True, font_family="monospace"

                    ),

                    settled_camera := ft.Text(

                        "Settled camera: -", selectable=True, font_family="monospace"

                    ),

                    ftm.Map(

                        expand=True,

                        initial_center=ftm.MapLatitudeLongitude(

                            latitude=52.52, longitude=13.405

                        ),

                        initial_zoom=11,

                        on_event=handle_map_event,

                        interaction_configuration=ftm.InteractionConfiguration(

                            flags=ftm.InteractionFlag.ALL

                        ),

                        layers=[

                            ftm.TileLayer(

                                url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                                user_agent_package_name="flet-map-examples/1.0",

                            ),

                            ftm.SimpleAttribution(

                                text="OpenStreetMap contributors",

                                on_click=lambda e: e.page.launch_url(

                                    "https://www.openstreetmap.org/copyright"

                                ),

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Interaction Flags​
import flet as ft

import flet_map as ftm



FLAG_OPTIONS: list[tuple[str, ftm.InteractionFlag]] = [

    ("Drag", ftm.InteractionFlag.DRAG),

    ("Fling animation", ftm.InteractionFlag.FLING_ANIMATION),

    ("Pinch move", ftm.InteractionFlag.PINCH_MOVE),

    ("Pinch zoom", ftm.InteractionFlag.PINCH_ZOOM),

    ("Double tap zoom", ftm.InteractionFlag.DOUBLE_TAP_ZOOM),

    ("Double tap drag zoom", ftm.InteractionFlag.DOUBLE_TAP_DRAG_ZOOM),

    ("Scroll wheel zoom", ftm.InteractionFlag.SCROLL_WHEEL_ZOOM),

    ("Rotate", ftm.InteractionFlag.ROTATE),

]





def main(page: ft.Page):

    page.padding = 16



    def get_selected_flags() -> ftm.InteractionFlag:

        flags = ftm.InteractionFlag.NONE

        for checkbox in checkboxes:

            if checkbox.value:

                flags |= checkbox.data

        return flags



    def update_interaction_flags(e: ft.Event[ft.Checkbox] = None):

        flags = get_selected_flags()

        my_map.interaction_configuration = ftm.InteractionConfiguration(flags=flags)

        page.update()



    def handle_map_event(e: ftm.MapEvent):

        event_type = e.event_type.value if e.event_type else "-"

        last_event.value = (

            "Last event: "

            f"type={event_type}, source={e.source.value}, zoom={e.camera.zoom:.2f}"

        )

        page.update()



    checkboxes = [

        ft.Checkbox(

            label=label,

            value=True,

            data=flag,

            on_change=update_interaction_flags,

        )

        for label, flag in FLAG_OPTIONS

    ]



    my_map = ftm.Map(

        expand=True,

        initial_center=ftm.MapLatitudeLongitude(latitude=52.52, longitude=13.405),

        initial_zoom=11,

        on_event=handle_map_event,

        interaction_configuration=ftm.InteractionConfiguration(

            flags=ftm.InteractionFlag.ALL

        ),

        layers=[

            ftm.TileLayer(

                url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                user_agent_package_name="flet-map-examples/1.0",

                on_image_error=lambda e: print(f"TileLayer Error: {e.data}"),

            ),

            ftm.SimpleAttribution(

                text="OpenStreetMap contributors",

                on_click=lambda e: e.page.launch_url(

                    "https://www.openstreetmap.org/copyright"

                ),

            ),

        ],

    )



    page.appbar = ft.AppBar(title="Interaction flags")

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                controls=[

                    ft.Text(

                        (

                            "Toggle flags and try dragging, zooming, rotating, "

                            "and scrolling."

                        ),

                        size=12,

                    ),

                    ft.ResponsiveRow(

                        controls=[

                            ft.Container(col={"sm": 6, "md": 4}, content=c)

                            for c in checkboxes

                        ]

                    ),

                    last_event := ft.Text(

                        "Last event: -", selectable=True, font_family="monospace"

                    ),

                    ft.Container(expand=True, content=my_map),

                ],

            ),

        )

    )



    update_interaction_flags()





if __name__ == "__main__":

    ft.run(main)

Multiple Layers​
import random



import flet as ft

import flet_map as ftm





def main(page: ft.Page):

    def handle_tap(e: ftm.MapTapEvent):

        if e.name == "tap":

            marker_layer.markers.append(

                ftm.Marker(

                    content=ft.Icon(

                        ft.Icons.LOCATION_ON, color=ft.CupertinoColors.DESTRUCTIVE_RED

                    ),

                    coordinates=e.coordinates,

                )

            )

        elif e.name == "secondary_tap":

            circle_layer.circles.append(

                ftm.CircleMarker(

                    radius=random.randint(5, 10),

                    coordinates=e.coordinates,

                    color=ft.Colors.random(),

                    border_color=ft.Colors.random(),

                    border_stroke_width=4,

                )

            )

        page.update()



    page.appbar = ft.AppBar(title="Multiple Layers")

    page.add(

        ft.SafeArea(

            expand=True,

            content=ft.Column(

                expand=True,

                controls=[

                    ft.Text(

                        "Click anywhere to add a Marker, right-click to add a "

                        "CircleMarker."

                    ),

                    ftm.Map(

                        expand=True,

                        initial_center=ftm.MapLatitudeLongitude(15, 10),

                        initial_zoom=4.2,

                        interaction_configuration=ftm.InteractionConfiguration(

                            flags=ftm.InteractionFlag.ALL

                        ),

                        on_tap=handle_tap,

                        on_secondary_tap=handle_tap,

                        on_event=print,

                        layers=[

                            ftm.TileLayer(

                                url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                                user_agent_package_name="flet-map-examples/1.0",

                                on_image_error=lambda e: print("TileLayer Error"),

                            ),

                            ftm.SimpleAttribution(

                                text="OpenStreetMap contributors",

                                on_click=lambda e: e.page.launch_url(

                                    "https://www.openstreetmap.org/copyright"

                                ),

                            ),

                            marker_layer := ftm.MarkerLayer(

                                markers=[

                                    ftm.Marker(

                                        content=ft.Icon(ft.Icons.LOCATION_ON),

                                        coordinates=ftm.MapLatitudeLongitude(30, 15),

                                    ),

                                    ftm.Marker(

                                        content=ft.Icon(ft.Icons.LOCATION_ON),

                                        coordinates=ftm.MapLatitudeLongitude(10, 10),

                                    ),

                                    ftm.Marker(

                                        content=ft.Icon(ft.Icons.LOCATION_ON),

                                        coordinates=ftm.MapLatitudeLongitude(25, 45),

                                    ),

                                ],

                            ),

                            circle_layer := ftm.CircleLayer(

                                circles=[

                                    ftm.CircleMarker(

                                        radius=10,

                                        coordinates=ftm.MapLatitudeLongitude(16, 24),

                                        color=ft.Colors.RED,

                                        border_color=ft.Colors.BLUE,

                                        border_stroke_width=4,

                                    ),

                                ],

                            ),

                            ftm.PolygonLayer(

                                polygons=[

                                    ftm.PolygonMarker(

                                        label="Popular Touristic Area",

                                        label_text_style=ft.TextStyle(

                                            color=ft.Colors.BLACK,

                                            size=15,

                                            weight=ft.FontWeight.BOLD,

                                        ),

                                        color=ft.Colors.with_opacity(

                                            0.3, ft.Colors.BLUE

                                        ),

                                        coordinates=[

                                            ftm.MapLatitudeLongitude(10, 10),

                                            ftm.MapLatitudeLongitude(30, 15),

                                            ftm.MapLatitudeLongitude(25, 45),

                                        ],

                                    ),

                                ],

                            ),

                            ftm.PolylineLayer(

                                polylines=[

                                    ftm.PolylineMarker(

                                        border_stroke_width=3,

                                        border_color=ft.Colors.RED,

                                        gradient_colors=[

                                            ft.Colors.BLACK,

                                            ft.Colors.BLACK,

                                        ],

                                        color=ft.Colors.with_opacity(

                                            0.6, ft.Colors.GREEN

                                        ),

                                        coordinates=[

                                            ftm.MapLatitudeLongitude(10, 10),

                                            ftm.MapLatitudeLongitude(30, 15),

                                            ftm.MapLatitudeLongitude(25, 45),

                                        ],

                                    ),

                                ],

                            ),

                        ],

                    ),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Overlay Images​
import flet as ft

import flet_map as ftm



base64_image = "iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAYAAADnnNMGAAAACXBIWXMAAAORAAADkQFnq8zdAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA6dJREFUSImllltoHFUYx3/fzOzm0lt23ZrQ1AQbtBehNpvQohgkBYVo410RwQctNE3Sh0IfiiBoIAjqi6TYrKnFy4O3oiiRavDJFi3mXomIBmOxNZe63ay52GR3Zj4f2sTEzmx3m//TYf7/c35zvgPnO6KqrESXqpq3muocAikv6m+/zytj3ejik1VN21G31YA9CgJ6xC+bMyQZPVCuarciPAMYC99V6Vw5pLbFSibHmlVoRVj9P3cmPBM8tSJI/M6mzabpfoAQ9fIF7WK4bd5vvuFnLGgy2vi0abg94A0AcJGvMq3hDxGRyar9r4F+iLAm0yIiRk8m37tctS1WsrIhhrI30+Srmg+J87OXUf3lWGS1q89dC6ltsSanxk4Aj2QBABii96300g87P/rtlrWr8l+vyDMfdlXSyyEikqxsiOUAQJCBhfHdXRfCq1LSsSlcWG+KBAGStvvrMkgiuv8lUc2mREukPwLUfHG+uTQv8Eown7VL3XlbBxYhf1c17hbVF3MDwA9bts280TnaU1YYqPby07aeFlUlHt27wSQ4CLo+F8AvoTCvHmyKF+ZbEb/M77P2LgvAwmrTHAHflN3KZxVbMC2jMFNOpgPnrMSOhvvFkMezXdwV4ePbtvHtxnJAMQ0j4JtVnO+eLb5oiSlt5HDbv7t1O90lpYCCCKbhfzW5kAIwUAazR0BlfII8Ow0I6uoVmI9MyAMwbMs8CExmDbk4zgu931MyO4OI4KrYflkRjOoTI+uM9d1vjotwKPu9QMk/sxzuO8POiVFcdZ1M2YBVsMEAKOqLvaPIe7mACuw0z/80SMH58SMplxlfiDhVi7dw2pltRhjKBQTQdrSja2KKTfE551NHuaZ0QVPvWYQUn31/Vm2nDvgjF4grVJx6suSvrvrSJ/6cSW2Oz9mf264uNrB806xZ1k/CZ49dUKgDEtlCROX2hfHpx8pGuuo3PpqYulw8fjndOp1yhgtNKRevJ1FyR2Ola+jXAjdnwTkZ6o896GdWdxDw7IxFg+0DpmXchTKSBWQnIuJn9u4j7dt+13UfHXEkXQOcuQ4kMhVtqsgUyPiQiPQfHw1NB2sRjmXKuTg1NwwBYLhtPtQX26eqTwGXPDOqvmcC4Hnwfrrad94GrVsOYTqUTkQY+iTlNe/6O1miSP/x0VB/+wMIDwHn/vtV1iQC4Xv95uUEWVCoL9Y5Z+gdovoyMHUFJHv88jmVy0vTuw7cZNv2YaA61Bfb7ZX5F8SaUv2xwZevAAAAAElFTkSuQmCC"  # noqa: E501





def main(page: ft.Page):

    page.add(

        ft.SafeArea(

            expand=True,

            content=ftm.Map(

                expand=True,

                initial_center=ftm.MapLatitudeLongitude(51.5, -0.09),

                initial_zoom=6,

                layers=[

                    ftm.TileLayer(

                        url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                        user_agent_package_name="flet-map-examples/1.0",

                    ),

                    ftm.OverlayImageLayer(

                        overlay_images=[

                            ftm.OverlayImage(

                                src=base64_image,

                                bounds=ftm.MapLatitudeLongitudeBounds(

                                    corner_1=ftm.MapLatitudeLongitude(51.5, -0.09),

                                    corner_2=ftm.MapLatitudeLongitude(48.8566, 2.3522),

                                ),

                                opacity=0.8,

                            ),

                            ftm.RotatedOverlayImage(

                                src=base64_image,

                                top_left_corner=ftm.MapLatitudeLongitude(

                                    53.377, -2.999

                                ),

                                bottom_left_corner=ftm.MapLatitudeLongitude(

                                    52.503, -1.868

                                ),

                                bottom_right_corner=ftm.MapLatitudeLongitude(

                                    53.475, 0.275

                                ),

                                opacity=0.8,

                            ),

                        ]

                    ),

                    ftm.SimpleAttribution(text="OpenStreetMap contributors"),

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Reference​
Map
Layers: TileLayer, MarkerLayer, OverlayImageLayer, CircleLayer, PolygonLayer, PolylineLayer
Markers and overlays: Marker, CircleMarker, PolygonMarker, PolylineMarker, OverlayImage, RotatedOverlayImage
Attributions: SimpleAttribution, RichAttribution, SourceAttribution

See the types section for additional configuration helpers.

Edit this page