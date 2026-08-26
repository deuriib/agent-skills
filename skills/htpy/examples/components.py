# Reusable Component Patterns

```python
# --- Base Layout ---
from htpy import Node, Renderable, html, head, body, title, div, h1

def base_layout(*, page_title: str, content: Node = None) -> Renderable:
    return html[
        head[title[page_title]],
        body[content],
    ]

# Usage
page = base_layout(
    page_title="Home",
    content=h1["Welcome!"],
)
```

```python
# --- @with_children Component ---
from htpy import Node, Renderable, with_children, div, h3

@with_children
def card(children: Node, *, title: str) -> Renderable:
    return div(".card")[
        div(".card-header")[h3(title)],
        div(".card-body")[children],
    ]

# Usage
my_card = card(title="Info")[
    p["This is the card content."],
    button(".btn")["Action"],
]
```

```python
# --- Bootstrap Alert ---
from htpy import Node, Renderable, div

def alert(contents: Node, *, variant: str = "info") -> Renderable:
    return div(f".alert.alert-{variant}", role="alert")[contents]

# Usage
error_alert = alert("Something went wrong!", variant="danger")
success_alert = alert("Saved successfully!", variant="success")
```

```python
# --- Data Table ---
from htpy import Renderable, table, thead, tbody, tr, th, td

def data_table(*, headers: list[str], rows: list[list[str]]) -> Renderable:
    return table(".table")[
        thead[
            tr[(th[h] for h in headers)]
        ],
        tbody[
            (tr[(td[cell] for cell in row)] for row in rows)
        ],
    ]

# Usage
tbl = data_table(
    headers=["Name", "Email"],
    rows=[
        ["Alice", "alice@example.com"],
        ["Bob", "bob@example.com"],
    ],
)
```

```python
# --- Modal ---
from htpy import Node, Renderable, button, div, h5, span
from markupsafe import Markup

def modal(*, title: str, body: Node = None, footer: Node = None) -> Renderable:
    return div(".modal", tabindex="-1")[
        div(".modal-dialog")[
            div(".modal-content")[
                div(".modal-header")[
                    h5(".modal-title")[title],
                    button(".close", type="button", aria_label="Close")[
                        span(aria_hidden="true")[Markup("&times;")]
                    ],
                ],
                div(".modal-body")[body],
                footer and div(".modal-footer")[footer],
            ]
        ]
    ]
```
