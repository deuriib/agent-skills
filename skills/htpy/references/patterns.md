# htpy Common Patterns Reference

## File/Module Structure

Keep HTML components separate from HTTP request handling:

```
myapp/
├── views.py          # HTTP handlers (no HTML)
├── components.py     # HTML components
└── components/       # Or a package for many components
    ├── __init__.py
    ├── layout.py
    └── ui.py
```

## Component Functions

Components are plain Python functions returning htpy elements:

```python
from htpy import Renderable, body, html, h1

def greeting_page(*, name: str) -> Renderable:
    return html[body[h1[f"hi {name}!"]]]
```

> **Keyword-only args:** Use `*` to force keyword arguments — improves readability.

## Base Layout Pattern

```python
import datetime
from htpy import Node, Renderable, body, div, h1, head, html, title

def base_layout(*,
    page_title: str | None = None,
    extra_head: Node = None,
    content: Node = None,
    body_class: str | None = None,
) -> Renderable:
    return html[
        head[title[page_title], extra_head],
        body(class_=body_class)[
            content,
            div("#footer")[f"Copyright {datetime.date.today().year}"],
        ],
    ]

# Usage
def index_page() -> Renderable:
    return base_layout(
        page_title="Welcome!",
        body_class="green",
        content=[
            h1["Welcome to my site!"],
            p["Hello and welcome!"],
        ],
    )
```

## UI Component Wrappers

Wrap complex UI patterns (e.g., Bootstrap Modal):

```python
from htpy import Node, Renderable, button, div, h5, span

def bootstrap_modal(*, title: str, body: Node = None, footer: Node = None) -> Renderable:
    return div(".modal", tabindex="-1", role="dialog")[
        div(".modal-dialog", role="document")[
            div(".modal-content")[
                div(".modal-header")[
                    div(".modal-title")[h5(title)],
                    button(".close", type="button", data_dismiss="modal")[
                        span(aria_hidden="true")["×"]
                    ],
                ],
                div(".modal-body")[body],
                footer and div(".modal-footer")[footer],
            ]
        ]
    ]

# Usage
bootstrap_modal(
    title="Confirm",
    body=p["Are you sure?"],
    footer=[
        button(".btn.btn-primary")["Yes"],
        button(".btn.btn-secondary")["No"],
    ],
)
```

## @with_children Decorator

Makes components accept children like HTML elements:

```python
from htpy import Node, Renderable, with_children

@with_children
def card(children: Node, *, title: str) -> Renderable:
    return div(".card")[
        div(".card-header")[h5(title)],
        div(".card-body")[children],
    ]

# Usage — children via [], attributes via ()
card(title="My Card")[
    p["Card content here"],
    button(".btn")["Action"],
]
```

## Combining @with_children + Context

```python
from typing import Literal
from htpy import Context, Node, Renderable, with_children

Theme = Literal["light", "dark"]
theme_context: Context[Theme] = Context("theme", default="light")

@with_children
@theme_context.consumer
def themed_card(theme: Theme, children: Node, *, title: str) -> Renderable:
    return div(f".card.theme-{theme}")[h5(title), children]

# Usage
theme_context.provider("dark", themed_card(title="Hello")["Content"])
```

## Immutability

All htpy elements are **immutable**. Once created, they cannot be modified. Create new elements instead:

```python
# WRONG
element = div["hello"]
element.children = ["world"]  # Error

# CORRECT
def my_component(*, text: str) -> Renderable:
    return div[text]
```
