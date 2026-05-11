# Navigation and Routing
URL: https://flet.dev/docs/cookbook/navigation-and-routing

CookbookNavigation and Routing
Navigation and Routing

Navigation and routing is the core of building multi-screen Flet apps. It lets you organize your UI into virtual pages (View objects), keep URL/history in sync, and support deep links to specific app states.

This page focuses on the current routing model and maintained examples.

Routing model in Flet​

A Page is a container of views (page.views), where each view represents one route-level screen.

page.route is the current route string (for example /, /store, /settings/mail).
page.views is the active navigation stack.
page.on_route_change rebuilds the stack when route changes.
page.on_view_pop handles Back navigation (system Back, AppBar Back, browser Back).

A reliable setup uses a single source of truth: derive page.views from page.route.

Route basics​

The default route is / when no route is provided.

import flet as ft





def main(page: ft.Page):

    page.add(ft.SafeArea(content=ft.Text(f"Initial route: {page.route}")))





if __name__ == "__main__":

    ft.run(main)


All routes should start with /, for example /store, /products/42, /settings/mail.

Handling route changes​

Whenever route changes (URL edit, browser Back/Forward, or app navigation), page.on_route_change event is triggered. Use this event as the place where you decide which views must exist for the current route.

import flet as ft





def main(page: ft.Page):

    route_log = ft.Column(controls=[ft.Text(f"Initial route: {page.route}")])

    page.add(ft.SafeArea(content=route_log))



    def route_change(e):

        route_log.controls.append(ft.Text(f"New route: {e.route}"))



    page.on_route_change = route_change

    page.update()





if __name__ == "__main__":

    ft.run(main)

Building views from route​

The pattern below is the baseline for most apps:

Clear page.views.
Add root view (/).
Add extra views conditionally based on page.route.
Handle Back in page.on_view_pop and navigate to the new top view.
WHY IS THIS PATTERN IMPORTANT?
Keeps URL, history stack, and visible UI synchronized.
Supports deep links and reloads naturally.
Makes navigation deterministic and easier to debug.
import flet as ft





def main(page: ft.Page):

    page.title = "Routes Example"



    print("Initial route:", page.route)



    async def open_mail_settings(e):

        await page.push_route("/settings/mail")



    async def open_settings(e):

        await page.push_route("/settings")



    def route_change():

        print("Route change:", page.route)

        page.views.clear()

        page.views.append(

            ft.View(

                route="/",

                controls=[

                    ft.SafeArea(

                        content=ft.Column(

                            controls=[

                                ft.AppBar(title=ft.Text("Flet app")),

                                ft.Button("Go to settings", on_click=open_settings),

                            ]

                        )

                    )

                ],

            )

        )

        if page.route == "/settings" or page.route == "/settings/mail":

            page.views.append(

                ft.View(

                    route="/settings",

                    controls=[

                        ft.SafeArea(

                            content=ft.Column(

                                controls=[

                                    ft.AppBar(

                                        title=ft.Text("Settings"),

                                        bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,

                                    ),

                                    ft.Text(

                                        "Settings!",

                                        theme_style=ft.TextThemeStyle.BODY_MEDIUM,

                                    ),

                                    ft.Button(

                                        content="Go to mail settings",

                                        on_click=open_mail_settings,

                                    ),

                                ]

                            )

                        )

                    ],

                )

            )

        if page.route == "/settings/mail":

            page.views.append(

                ft.View(

                    route="/settings/mail",

                    controls=[

                        ft.SafeArea(

                            content=ft.Column(

                                controls=[

                                    ft.AppBar(

                                        title=ft.Text("Mail Settings"),

                                        bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,

                                    ),

                                    ft.Text("Mail settings!"),

                                ]

                            )

                        )

                    ],

                )

            )

        page.update()



    async def view_pop(e):

        if e.view is not None:

            print("View pop:", e.view)

            page.views.remove(e.view)

            top_view = page.views[-1]

            await page.push_route(top_view.route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop



    route_change()





if __name__ == "__main__":

    ft.run(main)

Programmatic navigation​

Use page.navigate() to navigate from synchronous callbacks (e.g. on_click), or page.push_route() in async contexts:

# Sync (on_click, etc.)

page.navigate("/search", q="flet", page=2)



# Async

await page.push_route("/search", q="flet", page=2)

Back navigation and pop confirmation​

When users go back, Flet triggers page.on_view_pop. For flows requiring confirmation (for example, unsaved changes), disable automatic pop and confirm manually with View.can_pop + View.on_confirm_pop.

import flet as ft





def main(page: ft.Page):

    page.title = "Routes Example"



    def route_change():

        page.views.clear()

        page.views.append(MainView("/"))

        if page.route == "/store":

            page.views.append(PermissionView("/store"))

        page.update()



    async def view_pop(e: ft.ViewPopEvent):

        if e.view is not None:

            print("View pop:", e.view)

            page.views.remove(e.view)

            top_view = page.views[-1]

            await page.push_route(top_view.route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop



    route_change()





class MainView(ft.View):

    def __init__(self, path):

        super().__init__(

            route=path,

            controls=[

                ft.SafeArea(

                    content=ft.Column(

                        controls=[

                            ft.AppBar(title=ft.Text("Flet app")),

                            ft.Button("Go to store", on_click=self.open_store),

                        ]

                    )

                )

            ],

        )



    async def open_store(self, e):

        await self.page.push_route("/store")





class PermissionView(ft.View):

    def __init__(self, path):

        super().__init__(

            route=path,

            controls=[

                ft.SafeArea(

                    content=ft.Column(

                        controls=[ft.AppBar(title=ft.Text(f"{path} View"))]

                    )

                )

            ],

            can_pop=False,

            on_confirm_pop=self.ask_pop_permission,

        )



    async def ask_pop_permission(self, e):

        async def on_dlg_yes(e):

            self.page.pop_dialog()

            await self.confirm_pop(True)



        async def on_dlg_no(e):

            self.page.pop_dialog()

            await self.confirm_pop(False)



        dlg_modal = ft.AlertDialog(

            title=ft.Text("Please confirm"),

            content=ft.Text("Go home?"),

            actions=[

                ft.TextButton(

                    "Yes",

                    on_click=on_dlg_yes,

                ),

                ft.TextButton(

                    "No",

                    on_click=on_dlg_no,

                ),

            ],

            actions_alignment=ft.MainAxisAlignment.END,

            on_dismiss=lambda e: print("Modal dialog dismissed!"),

        )



        self.page.show_dialog(dlg_modal)





if __name__ == "__main__":

    ft.run(main)

Pop multiple views with a result​

When a multi-step flow finishes deep in the view stack, use page.pop_views_until() to jump back to a target route and deliver a result to the destination view via page.on_views_pop_until.

import asyncio



import flet as ft





def main(page: ft.Page):

    page.title = "Routes Example"



    result_text = ft.Text("No result yet", size=18)



    def route_change():

        page.views.clear()



        # Home View (/)

        page.views.append(

            ft.View(

                route="/",

                controls=[

                    ft.AppBar(title=ft.Text("Home"), bgcolor=ft.Colors.SURFACE_BRIGHT),

                    result_text,

                    ft.Button(

                        "Start flow",

                        on_click=lambda _: asyncio.create_task(

                            page.push_route("/step1")

                        ),

                    ),

                ],

            )

        )



        if page.route == "/step1" or page.route == "/step2" or page.route == "/step3":

            page.views.append(

                ft.View(

                    route="/step1",

                    controls=[

                        ft.AppBar(

                            title=ft.Text("Step 1"),

                            bgcolor=ft.Colors.SURFACE_BRIGHT,

                        ),

                        ft.Text("Step 1 of the flow"),

                        ft.Button(

                            "Go to Step 2",

                            on_click=lambda _: asyncio.create_task(

                                page.push_route("/step2")

                            ),

                        ),

                    ],

                )

            )



        if page.route == "/step2" or page.route == "/step3":

            page.views.append(

                ft.View(

                    route="/step2",

                    controls=[

                        ft.AppBar(

                            title=ft.Text("Step 2"),

                            bgcolor=ft.Colors.SURFACE_BRIGHT,

                        ),

                        ft.Text("Step 2 of the flow"),

                        ft.Button(

                            "Go to Step 3",

                            on_click=lambda _: asyncio.create_task(

                                page.push_route("/step3")

                            ),

                        ),

                    ],

                )

            )



        if page.route == "/step3":

            page.views.append(

                ft.View(

                    route="/step3",

                    controls=[

                        ft.AppBar(

                            title=ft.Text("Step 3 (Final)"),

                            bgcolor=ft.Colors.SURFACE_BRIGHT,

                        ),

                        ft.Text("Flow complete!"),

                        ft.Button(

                            "Finish and go Home",

                            on_click=lambda _: asyncio.create_task(

                                page.pop_views_until("/", result="Flow completed!")

                            ),

                        ),

                    ],

                )

            )



        page.update()



    def on_pop_result(e: ft.ViewsPopUntilEvent):

        result_text.value = f"Result: {e.result}"

        page.show_dialog(ft.SnackBar(ft.Text(f"Got result: {e.result}")))

        page.update()



    async def view_pop(e: ft.ViewPopEvent):

        if e.view is not None:

            page.views.remove(e.view)

            top_view = page.views[-1]

            await page.push_route(top_view.route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop

    page.on_views_pop_until = on_pop_result



    route_change()





if __name__ == "__main__":

    ft.run(main)

Navigation UI patterns​

Routing composes well with navigation controls such as drawer, rail, and tabs. This example shows route-driven drawer navigation with multiple top-level destinations:

import asyncio



import flet as ft





def main(page: ft.Page):

    page.title = "Drawer navigation"



    async def handle_change(e):

        if e.control.selected_index == 0:

            await page.push_route("/")

        elif e.control.selected_index == 1:

            await page.push_route("/store")

        elif e.control.selected_index == 2:

            await page.push_route("/about")



    def create_drawer(selected_index=0):

        return ft.NavigationDrawer(

            selected_index=selected_index,

            on_change=handle_change,

            controls=[

                ft.Container(height=12),

                ft.NavigationDrawerDestination(

                    label="Home",

                    icon=ft.Icons.HOME_OUTLINED,

                    selected_icon=ft.Icon(ft.Icons.HOME),

                ),

                ft.Divider(thickness=2),

                ft.NavigationDrawerDestination(

                    label="Store",

                    icon=ft.Icon(ft.Icons.STORE_OUTLINED),

                    selected_icon=ft.Icon(ft.Icons.STORE),

                ),

                ft.NavigationDrawerDestination(

                    label="About",

                    icon=ft.Icon(ft.Icons.PHONE_OUTLINED),

                    selected_icon=ft.Icons.PHONE,

                ),

            ],

        )



    async def show_drawer():

        await page.show_drawer()



    def route_change(route):

        page.views.clear()

        page.views.append(

            ft.View(

                route="/",

                controls=[

                    ft.SafeArea(

                        content=ft.Column(

                            controls=[

                                ft.AppBar(

                                    title=ft.Text("Home", expand=True),

                                    bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,

                                    leading=ft.IconButton(

                                        ft.Icons.MENU, on_click=show_drawer

                                    ),

                                ),

                                ft.Text("Welcome to Home Page"),

                            ]

                        )

                    )

                ],

                drawer=create_drawer(selected_index=0) if page.route == "/" else None,

            )

        )



        if page.route == "/store":

            page.views.append(

                ft.View(

                    route="/store",

                    controls=[

                        ft.SafeArea(

                            content=ft.Column(

                                controls=[

                                    ft.AppBar(

                                        title=ft.Text("Store", expand=True),

                                        bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,

                                        leading=ft.IconButton(

                                            ft.Icons.MENU, on_click=show_drawer

                                        ),

                                        automatically_imply_leading=False,

                                    ),

                                    ft.Text("Welcome to Store Page"),

                                    ft.Button(

                                        "Go About",

                                        on_click=lambda _: asyncio.create_task(

                                            page.push_route("/about")

                                        ),

                                    ),

                                ]

                            )

                        )

                    ],

                    drawer=create_drawer(selected_index=1),

                )

            )



        if page.route == "/about":

            page.views.append(

                ft.View(

                    route="/about",

                    controls=[

                        ft.SafeArea(

                            content=ft.Column(

                                controls=[

                                    ft.AppBar(

                                        title=ft.Text("About", expand=True),

                                        bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,

                                        leading=ft.IconButton(

                                            ft.Icons.MENU, on_click=show_drawer

                                        ),

                                        automatically_imply_leading=False,

                                    ),

                                    ft.Text("Welcome to About Page"),

                                    ft.Button(

                                        "Go Store",

                                        on_click=lambda _: asyncio.create_task(

                                            page.push_route("/store")

                                        ),

                                    ),

                                ]

                            )

                        )

                    ],

                    drawer=create_drawer(selected_index=2),

                )

            )



    async def view_pop(view):

        page.views.pop()

        top_view = page.views[-1]

        await page.push_route(top_view.route)



    page.on_route_change = route_change

    page.on_view_pop = view_pop

    route_change(page.route)





if __name__ == "__main__":

    ft.run(main)

Route templates (parameterized routes)​

Use TemplateRoute to match and parse route parameters, for example /books/:id. Template syntax is provided by repath.

import flet as ft



troute = ft.TemplateRoute(page.route)



if troute.match("/books/:id"):

    print("Book ID:", troute.id)

elif troute.match("/account/:account_id/orders/:order_id"):

    print("Account:", troute.account_id, "Order:", troute.order_id)

else:

    print("Unknown route")

Web URL strategy​

Flet web apps support two URL strategies :

"path" (default): in the form https://myapp.dev/store
"hash": https://myapp.dev/#/store

It can be set via route_url_strategy in ft.run()

import flet as ft

ft.run(main, route_url_strategy="hash")


For Flet server deployments, you can also set the FLET_ROUTE_URL_STRATEGY environment variable.

Declarative Router​

For declarative apps using @component, Flet provides a Router system inspired by React Router. It handles nested routes, layout routes with outlets, dynamic segments, data loaders, and active link detection — all without manual route matching.

With manage_views=True, Router can also manage the view stack directly, enabling swipe-back gestures and AppBar back buttons on mobile. Route components return View objects with their own AppBar, and navigating deeper pushes views onto the stack.

See the Router cookbook for a complete guide.

Practical recommendations​
Always keep a root / view in page.views.
Keep route handling centralized in page.on_route_change; avoid mutating page.views from many places.
When adding new routes, test these cases: direct deep link, browser Back/Forward, app Back button, and reload.
Use route templates for dynamic segments instead of manual string splitting.
Edit this page