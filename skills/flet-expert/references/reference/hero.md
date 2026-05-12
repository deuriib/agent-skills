# Hero
URL: https://flet.dev/docs/controls/hero

ReferenceControlsHero
Hero

Marks the content as a shared element for route transitions.

Place a Hero with the same tag in both source and destination views to animate that control between routes.

Inherits: LayoutControl

Properties
content - The control to display and animate.
tag - A unique identifier used to match source and destination Hero controls.
transition_on_user_gestures - Whether to animate when the route is transitioned by a user gesture (for example, iOS back swipe).
Examples​
Basic Example​
import flet as ft





def main(page: ft.Page):

    hero_tag = "demo-hero-card"



    def build_card(size: int, label: str) -> ft.Container:

        icon_size = max(24, int(size * 0.28))

        return ft.Container(

            width=size,

            height=size,

            border_radius=ft.BorderRadius.all(20),

            gradient=ft.LinearGradient(

                begin=ft.Alignment.TOP_LEFT,

                end=ft.Alignment.BOTTOM_RIGHT,

                colors=[ft.Colors.BLUE_700, ft.Colors.CYAN_400],

            ),

            alignment=ft.Alignment.CENTER,

            content=ft.Stack(

                fit=ft.StackFit.EXPAND,

                controls=[

                    ft.Container(

                        alignment=ft.Alignment.CENTER,

                        content=ft.Icon(

                            ft.Icons.ROCKET_LAUNCH,

                            size=icon_size,

                            color=ft.Colors.WHITE,

                        ),

                    ),

                    ft.Container(

                        alignment=ft.Alignment.BOTTOM_CENTER,

                        padding=ft.Padding.only(left=8, right=8, bottom=10),

                        content=ft.Text(

                            label,

                            color=ft.Colors.WHITE,

                            weight=ft.FontWeight.BOLD,

                            size=12,

                            no_wrap=True,

                            max_lines=1,

                            overflow=ft.TextOverflow.ELLIPSIS,

                            text_align=ft.TextAlign.CENTER,

                        ),

                    ),

                ],

            ),

        )



    async def go_to_details(_):

        await page.push_route("/details")



    async def go_home(_):

        await page.push_route("/")



    def build_home_view() -> ft.View:

        return ft.View(

            route="/",

            appbar=ft.AppBar(title=ft.Text("Hero animation")),

            controls=[

                ft.SafeArea(

                    expand=True,

                    content=ft.Container(

                        expand=True,

                        alignment=ft.Alignment.CENTER,

                        content=ft.Column(

                            alignment=ft.MainAxisAlignment.CENTER,

                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                            spacing=20,

                            controls=[

                                ft.Text("Tap the card to navigate"),

                                ft.GestureDetector(

                                    mouse_cursor=ft.MouseCursor.CLICK,

                                    on_tap=go_to_details,

                                    content=ft.Hero(

                                        tag=hero_tag,

                                        content=build_card(130, "Open details"),

                                    ),

                                ),

                            ],

                        ),

                    ),

                )

            ],

        )



    def build_details_view() -> ft.View:

        return ft.View(

            route="/details",

            appbar=ft.AppBar(title=ft.Text("Details")),

            controls=[

                ft.SafeArea(

                    expand=True,

                    content=ft.Container(

                        expand=True,

                        alignment=ft.Alignment.CENTER,

                        content=ft.Column(

                            alignment=ft.MainAxisAlignment.CENTER,

                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                            spacing=20,

                            controls=[

                                ft.Hero(

                                    tag=hero_tag,

                                    transition_on_user_gestures=True,

                                    content=build_card(280, "Details"),

                                ),

                                ft.Button("Back", on_click=go_home),

                            ],

                        ),

                    ),

                )

            ],

        )



    def route_change(e: ft.RouteChangeEvent = None):

        page.views.clear()

        page.views.append(build_home_view())

        if page.route == "/details":

            page.views.append(build_details_view())

        page.update()



    async def view_pop(e: ft.ViewPopEvent):

        if e.view is not None:

            page.views.remove(e.view)

            await page.push_route(page.views[-1].route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop

    route_change()





if __name__ == "__main__":

    ft.run(main)

Gallery​
import flet as ft



PRODUCTS = [

    {

        "id": 1,

        "name": "Comet",

        "subtitle": "Fast launch profile",

        "description": "Balanced setup for quick iteration and lightweight payloads.",

        "icon": ft.Icons.ROCKET_LAUNCH,

        "start_color": ft.Colors.BLUE_700,

        "end_color": ft.Colors.CYAN_400,

    },

    {

        "id": 2,

        "name": "Nebula",

        "subtitle": "Visual pipeline",

        "description": "Optimized for rich UI transitions and animated data surfaces.",

        "icon": ft.Icons.AUTO_AWESOME,

        "start_color": ft.Colors.DEEP_PURPLE_700,

        "end_color": ft.Colors.PINK_400,

    },

    {

        "id": 3,

        "name": "Orbit",

        "subtitle": "Reliable baseline",

        "description": "Stable profile focused on consistency and performance.",

        "icon": ft.Icons.PUBLIC,

        "start_color": ft.Colors.GREEN_700,

        "end_color": ft.Colors.LIGHT_GREEN_400,

    },

    {

        "id": 4,

        "name": "Aurora",

        "subtitle": "Analytics focus",

        "description": "Configured for telemetry-heavy apps and live metrics.",

        "icon": ft.Icons.ANALYTICS,

        "start_color": ft.Colors.ORANGE_700,

        "end_color": ft.Colors.AMBER_400,

    },

    {

        "id": 5,

        "name": "Pulse",

        "subtitle": "Real-time profile",

        "description": "Tuned for frequent updates, messaging, and event streams.",

        "icon": ft.Icons.BOLT,

        "start_color": ft.Colors.RED_700,

        "end_color": ft.Colors.DEEP_ORANGE_400,

    },

]





def hero_tag(product_id: int) -> str:

    return f"product-hero-{product_id}"





def main(page: ft.Page):

    def product_by_id(product_id: int):

        for product in PRODUCTS:

            if product["id"] == product_id:

                return product

        return None



    def route_product_id(route: str):

        segments = [segment for segment in route.split("/") if segment]

        if len(segments) != 2 or segments[0] != "product":

            return None

        try:

            return int(segments[1])

        except ValueError:

            return None



    async def open_product(product_id: int):

        await page.push_route(f"/product/{product_id}")



    async def back_to_gallery(e: ft.Event[ft.Button]):

        await page.push_route("/")



    def build_hero_tile(product: dict, size: int) -> ft.Hero:

        icon_size = max(24, int(size * 0.4))

        return ft.Hero(

            tag=hero_tag(product["id"]),

            transition_on_user_gestures=True,

            content=ft.Container(

                width=size,

                height=size,

                border_radius=ft.BorderRadius.all(20),

                gradient=ft.LinearGradient(

                    begin=ft.Alignment.TOP_LEFT,

                    end=ft.Alignment.BOTTOM_RIGHT,

                    colors=[product["start_color"], product["end_color"]],

                ),

                alignment=ft.Alignment.CENTER,

                content=ft.Icon(product["icon"], color=ft.Colors.WHITE, size=icon_size),

            ),

        )



    def build_home_view() -> ft.View:

        rows: list[ft.Control] = []

        for product in PRODUCTS:

            rows.append(

                ft.GestureDetector(

                    mouse_cursor=ft.MouseCursor.CLICK,

                    on_tap=lambda _, pid=product["id"]: page.run_task(

                        open_product, pid

                    ),

                    content=ft.Card(

                        content=ft.Container(

                            padding=12,

                            content=ft.Row(

                                vertical_alignment=ft.CrossAxisAlignment.CENTER,

                                spacing=12,

                                controls=[

                                    build_hero_tile(product, 78),

                                    ft.Column(

                                        spacing=4,

                                        controls=[

                                            ft.Text(

                                                product["name"],

                                                size=18,

                                                weight=ft.FontWeight.W_600,

                                            ),

                                            ft.Text(

                                                product["subtitle"],

                                                color=ft.Colors.ON_SURFACE_VARIANT,

                                            ),

                                            ft.Text(

                                                "Tap to view details",

                                                size=12,

                                                color=ft.Colors.PRIMARY,

                                            ),

                                        ],

                                    ),

                                ],

                            ),

                        )

                    ),

                )

            )



        return ft.View(

            route="/",

            appbar=ft.AppBar(title=ft.Text("Hero gallery")),

            controls=[

                ft.SafeArea(

                    expand=True,

                    content=ft.Column(

                        expand=True,

                        spacing=10,

                        scroll=ft.ScrollMode.AUTO,

                        horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                        controls=[

                            ft.Text(

                                "Each card has a unique Hero tag. "

                                "Open any item to see a matched transition.",

                                color=ft.Colors.ON_SURFACE_VARIANT,

                            ),

                            *rows,

                        ],

                    ),

                )

            ],

        )



    def build_details_view(product: dict) -> ft.View:

        return ft.View(

            route=f"/product/{product['id']}",

            appbar=ft.AppBar(title=ft.Text(product["name"])),

            controls=[

                ft.SafeArea(

                    expand=True,

                    content=ft.Column(

                        expand=True,

                        horizontal_alignment=ft.CrossAxisAlignment.CENTER,

                        spacing=16,

                        scroll=ft.ScrollMode.AUTO,

                        controls=[

                            ft.Container(height=8),

                            build_hero_tile(product, 220),

                            ft.Text(

                                product["subtitle"],

                                size=20,

                                weight=ft.FontWeight.W_600,

                                text_align=ft.TextAlign.CENTER,

                            ),

                            ft.Container(

                                width=520,

                                content=ft.Text(

                                    product["description"],

                                    text_align=ft.TextAlign.CENTER,

                                    color=ft.Colors.ON_SURFACE_VARIANT,

                                ),

                            ),

                            ft.Button("Back to gallery", on_click=back_to_gallery),

                        ],

                    ),

                )

            ],

        )



    def route_change(e: ft.RouteChangeEvent = None):

        page.views.clear()

        page.views.append(build_home_view())



        pid = route_product_id(page.route)

        if pid is not None:

            product = product_by_id(pid)

            if product is not None:

                page.views.append(build_details_view(product))



        page.update()



    async def view_pop(e: ft.ViewPopEvent):

        if e.view is not None:

            page.views.remove(e.view)

            await page.push_route(page.views[-1].route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop

    route_change()





if __name__ == "__main__":

    ft.run(main)

Properties​
build
content
instance-attribute
​
Copy
content: Control

The control to display and animate.

Raises:

ValueError - If it is not visible.
build
tag
instance-attribute
​
Copy
tag: str

A unique identifier used to match source and destination Hero controls.

Raises:

ValueError - If it is not of type str.
build
transition_on_user_gestures
class-attribute
instance-attribute
​
Copy
transition_on_user_gestures: bool = False

Whether to animate when the route is transitioned by a user gesture (for example, iOS back swipe).

Edit this page