# Router
URL: https://flet.dev/docs/controls/router

ReferenceControlsRouter
Router

Top-level router component that matches the current page route against a tree of Route definitions and renders the matched component chain.

The Router subscribes to on_route_change and re-renders automatically when the route changes.

Navigation is done via push_route or navigate.

When manage_views is True, the Router returns a list of View objects (one per path level) instead of a single component tree. This enables swipe-back gestures, system back button, and AppBar implicit back button on mobile. Must be used with render_views.

Parameters:

routes (list[Route]) - List of top-level Route definitions.
not_found (Callable | None, default: None) - Optional component to render when no route matches (404).
manage_views (bool, default: False) - When True, produce a list of View objects (one per path level) instead of a single component tree. Route components should return View instances with route and appbar set. Use with render_views.
EXAMPLE
@ft.component

def App():

    return ft.Router(

        [

            ft.Route(index=True, component=Home),

            ft.Route(path="about", component=About),

            ft.Route(path="products/:pid", component=ProductDetails),

        ],

        manage_views=True,

    )


Router matches the current page route against a tree of Route definitions and renders the matched component chain with nested outlet contexts.

Navigation is done via page.navigate() or page.push_route().

Examples​
Basic​
"""Basic Router — simplest example with flat routes."""



import flet as ft





@ft.component

def Home():

    return ft.Text("Home page", size=24)





@ft.component

def About():

    return ft.Text("About page", size=24)





@ft.component

def App():

    return ft.SafeArea(

        content=ft.Column(

            [

                ft.Row(

                    [

                        ft.Button(

                            "Home",

                            on_click=lambda: ft.context.page.navigate("/"),

                        ),

                        ft.Button(

                            "About",

                            on_click=lambda: ft.context.page.navigate("/about"),

                        ),

                    ]

                ),

                ft.Router(

                    [

                        ft.Route(index=True, component=Home),

                        ft.Route(path="about", component=About),

                    ]

                ),

            ]

        )

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render(App))

Layout with outlet​
"""Layout routes with Outlet — shared layout wrapping child routes."""



import flet as ft





@ft.component

def Home():

    return ft.Text("Welcome home!", size=24)





@ft.component

def About():

    return ft.Text("About us", size=24)





@ft.component

def Contact():

    return ft.Text("Contact page", size=24)





@ft.component

def AppLayout():

    outlet = ft.use_route_outlet()

    return ft.Column(

        [

            ft.Container(

                content=ft.Row(

                    [

                        ft.Text("My App", size=20, weight=ft.FontWeight.BOLD),

                        ft.Button(

                            "Home",

                            on_click=lambda: ft.context.page.navigate("/"),

                        ),

                        ft.Button(

                            "About",

                            on_click=lambda: ft.context.page.navigate("/about"),

                        ),

                        ft.Button(

                            "Contact",

                            on_click=lambda: ft.context.page.navigate("/contact"),

                        ),

                    ]

                ),

                bgcolor=ft.Colors.SURFACE_BRIGHT,

                padding=10,

            ),

            ft.Container(content=outlet, padding=20),

            ft.Text("Footer - (c) 2026", text_align=ft.TextAlign.CENTER),

        ],

    )





@ft.component

def App():

    return ft.SafeArea(

        content=ft.Router(

            [

                ft.Route(

                    component=AppLayout,

                    children=[

                        ft.Route(index=True, component=Home),

                        ft.Route(path="about", component=About),

                        ft.Route(path="contact", component=Contact),

                    ],

                ),

            ]

        )

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render(App))

Dynamic segments​
"""Dynamic segments — :param paths with use_route_params()."""



import flet as ft





@ft.component

def UserProfile():

    params = ft.use_route_params()

    return ft.Column(

        [

            ft.Text(f"User: {params['userId']}", size=24),

            ft.Text(f"All params: {params}"),

            ft.Button(

                "View post #10",

                on_click=lambda: ft.context.page.navigate(

                    f"/users/{params['userId']}/posts/10"

                ),

            ),

            ft.Button(

                "Back to users",

                on_click=lambda: ft.context.page.navigate("/"),

            ),

        ]

    )





@ft.component

def UserPost():

    params = ft.use_route_params()

    return ft.Column(

        [

            ft.Text(f"User: {params['userId']}, Post: {params['postId']}", size=24),

            ft.Text(f"All params: {params}"),

            ft.Button(

                "Back to user",

                on_click=lambda: ft.context.page.navigate(f"/users/{params['userId']}"),

            ),

        ]

    )





@ft.component

def UserList():

    return ft.Column(

        [

            ft.Text("Users", size=24),

            ft.Button(

                "User alice",

                on_click=lambda: ft.context.page.navigate("/users/alice"),

            ),

            ft.Button(

                "User bob",

                on_click=lambda: ft.context.page.navigate("/users/bob"),

            ),

        ]

    )





@ft.component

def App():

    return ft.SafeArea(

        content=ft.Router(

            [

                ft.Route(index=True, component=UserList),

                ft.Route(

                    path="users/:userId",

                    children=[

                        ft.Route(index=True, component=UserProfile),

                        ft.Route(path="posts/:postId", component=UserPost),

                    ],

                ),

            ]

        )

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render(App))

Loaders​
"""Loaders — data loading with loader and use_route_loader_data()."""



import flet as ft





# Simulated data loaders

def home_loader(params):

    return {"title": "Home", "message": "Welcome to the app!"}





def products_loader(params):

    return {

        "products": [

            {"id": 1, "name": "Widget A", "price": 9.99},

            {"id": 2, "name": "Gadget B", "price": 24.99},

            {"id": 3, "name": "Doohickey C", "price": 4.99},

        ]

    }





def product_detail_loader(params):

    pid = params.get("pid", "?")

    # In a real app, you'd fetch from a database or API

    products = {

        "1": {"id": 1, "name": "Widget A", "price": 9.99, "stock": 42},

        "2": {"id": 2, "name": "Gadget B", "price": 24.99, "stock": 7},

        "3": {"id": 3, "name": "Doohickey C", "price": 4.99, "stock": 100},

    }

    return products.get(pid, {"id": pid, "name": "Unknown", "price": 0, "stock": 0})





@ft.component

def Home():

    data = ft.use_route_loader_data()

    return ft.Column(

        [

            ft.Text(data["title"], size=24),

            ft.Text(data["message"]),

        ]

    )





@ft.component

def ProductsList():

    data = ft.use_route_loader_data()

    return ft.Column(

        [

            ft.Text("Products", size=24),

            *[

                ft.ListTile(

                    title=ft.Text(p["name"]),

                    subtitle=ft.Text(f"${p['price']:.2f}"),

                    on_click=lambda _, pid=p["id"]: ft.context.page.navigate(

                        f"/products/{pid}"

                    ),

                )

                for p in data["products"]

            ],

        ]

    )





@ft.component

def ProductDetails():

    data = ft.use_route_loader_data()

    params = ft.use_route_params()

    return ft.Column(

        [

            ft.Text(data["name"], size=24),

            ft.Text(f"Price: ${data['price']:.2f}"),

            ft.Text(f"In stock: {data['stock']}"),

            ft.Text(f"Product ID (from params): {params['pid']}"),

            ft.Button(

                "Back to products",

                on_click=lambda: ft.context.page.navigate("/products"),

            ),

        ]

    )





@ft.component

def App():

    return ft.SafeArea(

        content=ft.Column(

            [

                ft.Row(

                    [

                        ft.Button(

                            "Home",

                            on_click=lambda: ft.context.page.navigate("/"),

                        ),

                        ft.Button(

                            "Products",

                            on_click=lambda: ft.context.page.navigate("/products"),

                        ),

                    ]

                ),

                ft.Divider(),

                ft.Router(

                    [

                        ft.Route(index=True, component=Home, loader=home_loader),

                        ft.Route(

                            path="products",

                            children=[

                                ft.Route(

                                    index=True,

                                    component=ProductsList,

                                    loader=products_loader,

                                ),

                                ft.Route(

                                    path=":pid",

                                    component=ProductDetails,

                                    loader=product_detail_loader,

                                ),

                            ],

                        ),

                    ]

                ),

            ]

        )

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render(App))

Active links​
"""Active links — nav highlighting with is_route_active()."""



import flet as ft





@ft.component

def Home():

    return ft.Text("Home page", size=24)





@ft.component

def Products():

    return ft.Text("Products page", size=24)





@ft.component

def Settings():

    return ft.Text("Settings page", size=24)





@ft.component

def NavLink(label, path):

    """A navigation link that highlights when its path is active."""

    active = ft.is_route_active(path)

    return ft.Container(

        content=ft.Text(

            label,

            weight=ft.FontWeight.BOLD if active else ft.FontWeight.NORMAL,

            color=ft.Colors.BLUE if active else ft.Colors.ON_SURFACE,

        ),

        bgcolor=ft.Colors.BLUE_50 if active else None,

        padding=ft.Padding.symmetric(horizontal=16, vertical=8),

        border_radius=8,

        on_click=lambda: ft.context.page.navigate(path),

    )





@ft.component

def AppLayout():

    """Layout route — NavLink must be inside Router to use is_route_active()."""

    outlet = ft.use_route_outlet()

    return ft.Column(

        [

            ft.Row(

                [

                    NavLink("Home", "/"),

                    NavLink("Products", "/products"),

                    NavLink("Settings", "/settings"),

                ]

            ),

            ft.Divider(),

            outlet,

        ]

    )





@ft.component

def App():

    return ft.SafeArea(

        content=ft.Router(

            [

                ft.Route(

                    component=AppLayout,

                    children=[

                        ft.Route(index=True, component=Home),

                        ft.Route(path="products", component=Products),

                        ft.Route(path="settings", component=Settings),

                    ],

                ),

            ]

        )

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render(App))

Featured​
"""Featured Router example — layout, nav, nested routes, params, loaders, auth."""



from dataclasses import dataclass



import flet as ft



# ---------------------------------------------------------------------------

# Auth context

# ---------------------------------------------------------------------------





@ft.observable

@dataclass

class AuthState:

    is_authenticated: bool = False

    username: str = ""

    is_admin: bool = False



    def login(self, username, admin=False):

        self.username = username

        self.is_authenticated = True

        self.is_admin = admin



    def logout(self):

        self.username = ""

        self.is_authenticated = False

        self.is_admin = False





AuthContext: ft.ContextProvider[AuthState | None] = ft.create_context(None)





# ---------------------------------------------------------------------------

# Data loaders

# ---------------------------------------------------------------------------





def home_loader(params):

    return {"greeting": "Welcome to the Router Demo!", "featured_count": 3}





def projects_loader(params):

    return [

        {"id": 1, "name": "Flet", "status": "Active"},

        {"id": 2, "name": "Flutter", "status": "Active"},

        {"id": 3, "name": "FastAPI", "status": "Maintenance"},

    ]





def project_detail_loader(params):

    projects = {

        "1": {"id": 1, "name": "Flet", "description": "Build apps in Python"},

        "2": {"id": 2, "name": "Flutter", "description": "UI toolkit by Google"},

        "3": {"id": 3, "name": "FastAPI", "description": "Modern Python web framework"},

    }

    return projects.get(params.get("projectId"), {"name": "Unknown", "description": ""})





def settings_loader(params):

    return {"sections": ["Profile", "Security", "Notifications"]}





# ---------------------------------------------------------------------------

# Auth components

# ---------------------------------------------------------------------------





@ft.component

def LoginPage():

    auth = ft.use_context(AuthContext)

    username_ref = ft.use_ref(None)



    def handle_login():

        auth.login(username_ref.current.value or "user")

        ft.context.page.navigate("/")



    def handle_admin_login():

        auth.login(username_ref.current.value or "admin", admin=True)

        ft.context.page.navigate("/")



    return ft.Column(

        [

            ft.Text("Sign In", size=28),

            ft.TextField(label="Username", value="admin", ref=username_ref),

            ft.Row(

                [

                    ft.Button("Login", on_click=handle_login),

                    ft.Button("Login as Admin", on_click=handle_admin_login),

                ]

            ),

        ],

        width=300,

    )





@ft.component

def ProtectedRoute():

    auth = ft.use_context(AuthContext)

    outlet = ft.use_route_outlet()



    if not auth.is_authenticated:

        ft.context.page.navigate("/login")

        return ft.ProgressRing()



    return outlet





# ---------------------------------------------------------------------------

# Navigation

# ---------------------------------------------------------------------------





@ft.component

def NavLink(label, path):

    active = ft.is_route_active(path)

    return ft.Container(

        content=ft.Text(

            label,

            weight=ft.FontWeight.BOLD if active else ft.FontWeight.NORMAL,

            color=ft.Colors.PRIMARY if active else ft.Colors.ON_SURFACE,

        ),

        bgcolor=ft.Colors.PRIMARY_CONTAINER if active else None,

        padding=ft.Padding.symmetric(horizontal=16, vertical=8),

        border_radius=8,

        on_click=lambda: ft.context.page.navigate(path),

    )





@ft.component

def AppLayout():

    auth = ft.use_context(AuthContext)

    outlet = ft.use_route_outlet()



    if auth is None:

        return ft.ProgressRing()



    return ft.Column(

        [

            # Header

            ft.Container(

                content=ft.Row(

                    [

                        ft.Text("Router Demo", size=20, weight=ft.FontWeight.BOLD),

                        NavLink("Home", "/"),

                        NavLink("Projects", "/projects"),

                        NavLink("Settings", "/settings"),

                        ft.Text(f"Hi, {auth.username}"),

                        ft.IconButton(

                            ft.Icons.LOGOUT,

                            on_click=lambda: (

                                auth.logout(),

                                ft.context.page.navigate("/login"),

                            ),

                        ),

                    ],

                ),

                padding=10,

                bgcolor=ft.Colors.SURFACE_BRIGHT,

            ),

            ft.Divider(height=1),

            # Content

            ft.Container(content=outlet, padding=20),

        ],

    )





# ---------------------------------------------------------------------------

# Page components

# ---------------------------------------------------------------------------





@ft.component

def Home():

    data = ft.use_route_loader_data()

    return ft.Column(

        [

            ft.Text(data["greeting"], size=24),

            ft.Text(f"{data['featured_count']} featured projects available"),

            ft.Button(

                "Browse projects",

                on_click=lambda: ft.context.page.navigate("/projects"),

            ),

        ]

    )





@ft.component

def ProjectsList():

    data = ft.use_route_loader_data()

    return ft.Column(

        [

            ft.Text("Projects", size=24),

            *[

                ft.ListTile(

                    title=ft.Text(p["name"]),

                    subtitle=ft.Text(p["status"]),

                    on_click=lambda _, pid=p["id"]: ft.context.page.navigate(

                        f"/projects/{pid}"

                    ),

                )

                for p in data

            ],

        ]

    )





@ft.component

def ProjectDetails():

    data = ft.use_route_loader_data()

    params = ft.use_route_params()

    location = ft.use_route_location()



    return ft.Column(

        [

            ft.Text(data["name"], size=24),

            ft.Text(data["description"]),

            ft.Text(f"Project ID: {params['projectId']}", italic=True),

            ft.Text(f"Location: {location}", italic=True, size=12),

            ft.Button(

                "Back to projects",

                on_click=lambda: ft.context.page.navigate("/projects"),

            ),

        ]

    )





@ft.component

def ProjectsLayout():

    outlet = ft.use_route_outlet()

    return ft.Column(

        [

            ft.Container(

                content=ft.Text(

                    "PROJECTS",

                    weight=ft.FontWeight.BOLD,

                    color=ft.Colors.ON_SECONDARY_CONTAINER,

                ),

                bgcolor=ft.Colors.SECONDARY_CONTAINER,

                padding=ft.Padding.symmetric(horizontal=12, vertical=4),

                border_radius=4,

            ),

            outlet,

        ]

    )





@ft.component

def SettingsHome():

    data = ft.use_route_loader_data()

    return ft.Column(

        [

            ft.Text("Settings", size=24),

            ft.Text("Available sections:"),

            *[

                ft.ListTile(

                    title=ft.Text(section),

                    on_click=lambda _, s=section: ft.context.page.navigate(

                        f"/settings/{s.lower()}"

                    ),

                )

                for section in data["sections"]

            ],

        ]

    )





@ft.component

def SettingsSection():

    params = ft.use_route_params()

    return ft.Column(

        [

            ft.Text(f"{params['section'].title()} Settings", size=24),

            ft.Text(f"Configure your {params['section']} preferences here."),

            ft.Button(

                "Back to settings",

                on_click=lambda: ft.context.page.navigate("/settings"),

            ),

        ]

    )





# ---------------------------------------------------------------------------

# App

# ---------------------------------------------------------------------------





@ft.component

def App():

    auth, _ = ft.use_state(AuthState)



    return ft.SafeArea(

        content=AuthContext(

            auth,

            lambda: ft.Router(

                [

                    ft.Route(path="login", component=LoginPage),

                    ft.Route(

                        component=ProtectedRoute,

                        children=[

                            ft.Route(

                                component=AppLayout,

                                children=[

                                    ft.Route(

                                        index=True,

                                        component=Home,

                                        loader=home_loader,

                                    ),

                                    ft.Route(

                                        path="projects",

                                        component=ProjectsLayout,

                                        children=[

                                            ft.Route(

                                                index=True,

                                                component=ProjectsList,

                                                loader=projects_loader,

                                            ),

                                            ft.Route(

                                                path=":projectId",

                                                component=ProjectDetails,

                                                loader=project_detail_loader,

                                            ),

                                        ],

                                    ),

                                    ft.Route(

                                        path="settings",

                                        children=[

                                            ft.Route(

                                                index=True,

                                                component=SettingsHome,

                                                loader=settings_loader,

                                            ),

                                            ft.Route(

                                                path=":section",

                                                component=SettingsSection,

                                            ),

                                        ],

                                    ),

                                ],

                            ),

                        ],

                    ),

                ]

            ),

        )

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render(App))

Managed views — nested routes​

Each route component returns a View with its own AppBar. Navigating deeper pushes views onto the stack; swipe-back and AppBar back button pop them.

import flet as ft





@ft.component

def Home():

    return ft.View(

        route="/",

        can_pop=False,

        appbar=ft.AppBar(title=ft.Text("Home")),

        controls=[

            ft.Text("Home", size=24),

            ft.Button(

                "Go to Products",

                on_click=lambda: ft.context.page.navigate("/products"),

            ),

        ],

    )





@ft.component

def ProductsList():

    return ft.View(

        route="/products",

        appbar=ft.AppBar(title=ft.Text("Products")),

        controls=[

            ft.Text("All Products", size=24),

            ft.Button(

                "View Product #1",

                on_click=lambda: ft.context.page.navigate("/products/1"),

            ),

            ft.Button(

                "View Product #2",

                on_click=lambda: ft.context.page.navigate("/products/2"),

            ),

        ],

    )





@ft.component

def ProductDetails():

    params = ft.use_route_params()

    return ft.View(

        route=f"/products/{params['pid']}",

        appbar=ft.AppBar(title=ft.Text(f"Product #{params['pid']}")),

        controls=[

            ft.Text(f"Details for product #{params['pid']}", size=24),

        ],

    )





@ft.component

def App():

    return ft.Router(

        [

            ft.Route(

                component=Home,

                children=[

                    ft.Route(

                        path="products",

                        component=ProductsList,

                        children=[

                            ft.Route(path=":pid", component=ProductDetails),

                        ],

                    ),

                ],

            ),

        ],

        manage_views=True,

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render_views(App))

Managed views — shared layout with outlet​

A layout route with outlet=True wraps child routes in a shared View. Leaf components return regular controls; the layout provides the View.

import flet as ft





@ft.component

def Home():

    return ft.View(

        route="/",

        can_pop=False,

        appbar=ft.AppBar(title=ft.Text("Home")),

        controls=[

            ft.Text("Welcome!", size=24),

            ft.Button(

                "Browse Products",

                on_click=lambda: ft.context.page.navigate("/products"),

            ),

        ],

    )





@ft.component

def ProductsList():

    """Returns a regular control — the layout provides the View."""

    return ft.Column(

        [

            ft.Text("All Products", size=24),

            ft.Button(

                "View Product #1",

                on_click=lambda: ft.context.page.navigate("/products/1"),

            ),

            ft.Button(

                "View Product #2",

                on_click=lambda: ft.context.page.navigate("/products/2"),

            ),

        ]

    )





@ft.component

def ProductDetails():

    """Returns a regular control — the layout provides the View."""

    params = ft.use_route_params()

    return ft.Text(f"Product #{params['pid']}", size=24)





@ft.component

def ProductsLayout():

    """Shared layout — wraps each child route in a View with AppBar + footer."""

    outlet = ft.use_route_outlet()

    return ft.View(

        # use_view_path() returns the per-view resolved URL (unique per level)

        # — required for Flutter Navigator keying when the layout wraps

        # multiple child routes.

        route=ft.use_view_path(),

        appbar=ft.AppBar(

            title=ft.Text("Products"),

            bgcolor=ft.Colors.SURFACE_BRIGHT,

        ),

        controls=[

            ft.Container(content=outlet, padding=20, expand=True),

            ft.Divider(),

            ft.Text("Products Footer", text_align=ft.TextAlign.CENTER),

        ],

    )





@ft.component

def App():

    return ft.Router(

        [

            ft.Route(

                component=Home,

                children=[

                    ft.Route(

                        path="products",

                        component=ProductsLayout,

                        outlet=True,

                        children=[

                            ft.Route(

                                component=ProductsList,

                                children=[

                                    ft.Route(path=":pid", component=ProductDetails),

                                ],

                            ),

                        ],

                    ),

                ],

            ),

        ],

        manage_views=True,

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render_views(App))

Managed views — full app with NavigationRail​

Complete app with NavigationRail, stacked project views, and tabbed settings — all using manage_views=True.

import flet as ft



# ---------------------------------------------------------------------------

# Home

# ---------------------------------------------------------------------------





@ft.component

def HomeContent():

    return ft.Column(

        [

            ft.Text("Home", size=28, weight=ft.FontWeight.BOLD),

            ft.Text("Welcome to the app!", size=16),

        ]

    )





# ---------------------------------------------------------------------------

# Projects

# ---------------------------------------------------------------------------



PROJECTS = {

    "1": "Landing Page Redesign",

    "2": "Mobile App v2",

    "3": "API Migration",

}





@ft.component

def ProjectsList():

    return ft.Column(

        [

            ft.Text("All Projects", size=24),

            *[

                ft.Button(

                    name,

                    on_click=lambda _, pid=pid: ft.context.page.navigate(

                        f"/projects/{pid}"

                    ),

                )

                for pid, name in PROJECTS.items()

            ],

        ]

    )





@ft.component

def ProjectDetails():

    params = ft.use_route_params()

    pid = params.get("pid", "?")

    name = PROJECTS.get(pid, "Unknown")

    return ft.Column(

        [

            ft.Text(name, size=24, weight=ft.FontWeight.BOLD),

            ft.Text(f"Project ID: {pid}", size=16),

            ft.Text(

                "This is where project details, tasks, and team info would go.",

                size=14,

            ),

        ]

    )





# ---------------------------------------------------------------------------

# Settings

# ---------------------------------------------------------------------------





@ft.component

def GeneralSettings():

    return ft.Column(

        [

            ft.Text("General Settings", size=24),

            ft.Switch(label="Dark mode"),

            ft.Switch(label="Notifications"),

            ft.Switch(label="Auto-save"),

        ]

    )





@ft.component

def AccountSettings():

    return ft.Column(

        [

            ft.Text("Account Settings", size=24),

            ft.TextField(label="Display name", value="Feodor"),

            ft.TextField(label="Email", value="feodor@example.com"),

            ft.Button("Save changes"),

        ]

    )





@ft.component

def SettingsLayout():

    """Tab navigation for settings — returns controls, not a View."""

    outlet = ft.use_route_outlet()

    return ft.Column(

        [

            ft.Text("Settings", size=28, weight=ft.FontWeight.BOLD),

            ft.Row(

                [

                    ft.Button(

                        "General",

                        style=ft.ButtonStyle(

                            bgcolor=ft.Colors.PRIMARY_CONTAINER

                            if ft.is_route_active("/settings/general", exact=True)

                            else None,

                        ),

                        on_click=lambda: ft.context.page.navigate("/settings/general"),

                    ),

                    ft.Button(

                        "Account",

                        style=ft.ButtonStyle(

                            bgcolor=ft.Colors.PRIMARY_CONTAINER

                            if ft.is_route_active("/settings/account", exact=True)

                            else None,

                        ),

                        on_click=lambda: ft.context.page.navigate("/settings/account"),

                    ),

                ],

            ),

            ft.Divider(),

            ft.Container(content=outlet, expand=True),

        ],

        expand=True,

    )





# ---------------------------------------------------------------------------

# Root layout with NavigationRail

# ---------------------------------------------------------------------------



NAV_ROUTES = ["/", "/projects", "/settings/general"]





@ft.component

def RootLayout():

    """Root layout — returns a View with NavigationRail + outlet."""

    outlet = ft.use_route_outlet()



    selected = 0

    if ft.is_route_active("/projects"):

        selected = 1

    elif ft.is_route_active("/settings"):

        selected = 2



    def on_nav_change(e):

        ft.context.page.navigate(NAV_ROUTES[e.control.selected_index])



    return ft.View(

        route="/",  # fixed key — no transition animation between top-level pages

        can_pop=False,

        controls=[

            ft.Row(

                [

                    ft.NavigationRail(

                        selected_index=selected,

                        label_type=ft.NavigationRailLabelType.ALL,

                        destinations=[

                            ft.NavigationRailDestination(

                                icon=ft.Icons.HOME_OUTLINED,

                                selected_icon=ft.Icons.HOME,

                                label="Home",

                            ),

                            ft.NavigationRailDestination(

                                icon=ft.Icons.FOLDER_OUTLINED,

                                selected_icon=ft.Icons.FOLDER,

                                label="Projects",

                            ),

                            ft.NavigationRailDestination(

                                icon=ft.Icons.SETTINGS_OUTLINED,

                                selected_icon=ft.Icons.SETTINGS,

                                label="Settings",

                            ),

                        ],

                        on_change=on_nav_change,

                    ),

                    ft.VerticalDivider(width=1),

                    ft.Container(content=outlet, expand=True, padding=20),

                ],

                expand=True,

            ),

        ],

    )





# ---------------------------------------------------------------------------

# App

# ---------------------------------------------------------------------------





@ft.component

def App():

    return ft.Router(

        [

            ft.Route(

                component=RootLayout,

                outlet=True,

                children=[

                    ft.Route(index=True, component=HomeContent),

                    ft.Route(

                        path="projects",

                        component=ProjectsList,

                        children=[

                            ft.Route(path=":pid", component=ProjectDetails),

                        ],

                    ),

                    ft.Route(

                        path="settings",

                        component=SettingsLayout,

                        outlet=True,

                        children=[

                            ft.Route(path="general", component=GeneralSettings),

                            ft.Route(path="account", component=AccountSettings),

                        ],

                    ),

                ],

            ),

        ],

        manage_views=True,

    )





if __name__ == "__main__":

    ft.run(lambda page: page.render_views(App))

Edit this page