---
name: htpy
description: >
  Generate HTML from pure Python without templates. Use when building server-rendered HTML
  with Django, FastAPI, Starlette, Flask, or any Python web framework. Covers element creation,
  attributes, components, streaming, async rendering, static typing, and the html2htpy converter.
  Triggers: htpy, html in python, python html generation, python components, server rendered html,
  django components, fastapi html, starlette html, htmx python, python templates.
metadata:
  author: deuriib
  version: "1.0"
---

# htpy — HTML in Pure Python

htpy is a library that makes writing HTML in plain Python fun and efficient, **without a template language**. It generates HTML elements and attributes with a few helpers — no special DSL, no custom syntax.

**Source:** [htpy.dev](https://htpy.dev) | **PyPI:** [pypi.org/project/htpy](https://pypi.org/project/htpy/) | **GitHub:** [github.com/pelme/htpy](https://github.com/pelme/htpy)

---

## Installation

```bash
pip install htpy
```

## Quick Start

```python
from htpy import html, head, body, h1, ul, li, title

menu = ["egg+bacon", "bacon+spam", "eggs+spam"]

print(
    html[
        head[title["Today's menu"]],
        body[
            h1["Menu"],
            ul(".menu")[(li[item] for item in menu)],
        ],
    ]
)
```

Output:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Today's menu</title>
  </head>
  <body>
    <h1>Menu</h1>
    <ul class="menu">
      <li>egg+bacon</li>
      <li>bacon+spam</li>
      <li>eggs+spam</li>
    </ul>
  </body>
</html>
```

---

## Core Syntax

### Elements — Import & Use

Elements are imported directly from the `htpy` module by name. They use Python's `__getitem__` for children and `__call__` for attributes.

```python
from htpy import div

# Attributes via call(), children via getitem[]
result = div(id="hi")["Hello!"]
# <div id="hi">Hello!</div>
```

### Children (`[]` / getitem)

Children can be strings, other elements, lists, tuples, or generators:

```python
from htpy import section, article, p

# Nested elements
print(section[article[p["Lorem ipsum"]]])
# <section><article><p>Lorem ipsum</p></article></section>
```

### Attributes (`()` / call)

Attributes are specified via keyword arguments:

```python
from htpy import img
print(img(src="picture.jpg"))
# <img src="picture.jpg">
```

### Reserved Python Keywords

- `class` → `class_`
- `for` → `for_`

```python
from htpy import label
print(label(for_="myfield"))
# <label for="myfield"></label>
```

### Attributes with Dashes (underscore → dash)

```python
from htpy import form
print(form(hx_post="/foo"))
# <form hx-post="/foo"></form>
```

### ID/Class Shorthand (CSS Selector Syntax)

```python
from htpy import div

print(div("#myid"))
# <div id="myid"></div>

print(div(".foo.bar"))
# <div class="foo bar"></div>

print(div("#myid.foo.bar"))
# <div id="myid" class="foo bar"></div>
```

### Attributes as Dict

Useful for reserved keywords, dash-containing attributes, or dynamic attributes:

```python
from htpy import button

# Alpine.js @-syntax
print(button({"@click.shift": "addToSelection()"}))
# <button @click.shift="addToSelection()"></button>

# Reserved keyword 'for'
from htpy import label
print(label({"for": "myfield"}))
# <label for="myfield"></label>

# Multiple dicts
print(button({"disabled": True}, {"hx-post": "/foo"}))
# <button disabled hx-post="/foo"></button>
```

### Boolean/Empty Attributes

```python
from htpy import button
print(button(disabled=True))
# <button disabled></button>

print(button(disabled=False))
# <button></button>
```

### Conditional CSS Classes

```python
from htpy import button
is_primary = True
print(button(class_=["btn", {"btn-primary": is_primary}]))
# <button class="btn btn-primary"></button>

is_primary = False
print(button(class_=["btn", {"btn-primary": is_primary}]))
# <button class="btn"></button>
```

### Combining Attribute Modes

```python
from htpy import label
print(label("#myid.foo.bar", {"for": "somefield"}, name="myname"))
# <label id="myid" class="foo bar" for="somefield" name="myname"></label>
```

---

## Elements in Detail

### Conditional Rendering

`True`, `False`, and `None` render nothing. Use `and`/`or` for short-circuit logic:

```python
from htpy import div, b

error = None
print(div[error and b[error]])
# <div></div>

error = "Enter a valid email."
print(div[error and b[error]])
# <div><b>Enter a valid email.</b></div>

# Inline if/else
print(div[b[error] if error else None])
```

### Fragments

Group nodes without a wrapping element:

```python
from htpy import p, i, fragment

content = fragment["Hello ", None, i["world!"]]
print(content)  # Hello <i>world!</i>
print(p[content])  # <p>Hello <i>world!</i></p>
```

### Loops / Iterating Over Children

```python
from htpy import ul, li

# Generator
print(ul[(li[letter] for letter in "abc")])
# <ul><li>a</li><li>b</li><li>c</li></ul>

# List (can be rendered multiple times)
my_images = [img(src="a.jpg"), img(src="b.jpg")]
print(div[my_images])
# <div><img src="a.jpg"><img src="b.jpg"></div>
```

> **Warning:** Generators are consumed once. Use `list` if you need to render the same element multiple times.

### Custom Elements / Web Components

Use `_` for `-` in element names:

```python
from htpy import my_custom_element
print(my_custom_element["hi!"])
# <my-custom-element>hi!</my-custom-element>
```

### Injecting Raw Markup

Use `markupsafe.Markup` to bypass escaping:

```python
from htpy import div
from markupsafe import Markup

print(div[Markup("<foo></foo>")])
# <div><foo></foo></div>
```

### HTML Doctype

Automatically prepended to `<html>`:

```python
from htpy import html
print(html)
# <!doctype html><html></html>
```

### HTML Comments

```python
from htpy import div, comment
print(div[comment("This is a comment!")])
# <div><!-- This is a comment! --></div>
```

---

## Streaming

htpy supports incremental rendering via generators and callables.

### iter_chunks()

```python
from htpy import ul, li

for chunk in ul[li["a"], li["b"]].iter_chunks():
    print(f"chunk: {chunk!r}")
# '<ul>' → '<li>' → 'a' → '</li>' → '<li>' → 'b' → '</li>' → '</ul>'
```

### Callables for Lazy Evaluation

```python
from htpy import div, h1

element = div[
    h1["Welcome"],
    "The number is ",
    lambda: str(calculate_expensive_value()),
]
```

### Django Streaming

```python
from django.http import StreamingHttpResponse
from htpy import ul, li
from myapp.models import Article

def article_list(request):
    return StreamingHttpResponse(ul[
        (li[article.title] for article in Article.objects.all())
    ])
```

---

## Context (Data Passing)

React-like context for passing data without prop drilling:

```python
from typing import Literal
from htpy import Context, Node, div, h1

Theme = Literal["light", "dark"]
theme_context: Context[Theme] = Context("theme", default="light")

def my_page() -> Node:
    return theme_context.provider(
        "dark",
        div[
            h1["Hello!"],
            sidebar("The Sidebar!"),
        ],
    )

@theme_context.consumer
def sidebar(theme: Theme, title: str) -> Node:
    return div(class_=f"theme-{theme}")[title]

print(my_page())
# <div><h1>Hello!</h1><div class="theme-dark">The Sidebar!</div></div>
```

---

## Async Rendering

Components can be `async def`. Use `aiter_chunks()` for async iteration:

```python
import asyncio
from htpy import p, ul, li, Renderable

async def get_text() -> str:
    return "hi!"

async def my_text() -> Renderable:
    results = await get_text()
    return p[results]

# Async rendering
async def main():
    async for chunk in div[my_component()].aiter_chunks():
        print(chunk)

asyncio.run(main())
```

### Async Iterators

```python
from htpy import ul, li

async def my_items():
    yield li["a"]
    yield li["b"]

def my_list() -> Renderable:
    return ul[my_items()]
```

---

## Static Typing

htpy is designed for static typing. Key types:

- **`Element`** — base class for HTML elements with children (div, span, etc.)
- **`VoidElement`** — HTML void elements (img, input, br)
- **`Renderable`** — protocol for anything that can be rendered as HTML
- **`Node`** — type alias for all valid child nodes (str, Element, None, iterables, etc.)

```python
from htpy import Element, Node, Renderable, span

def bootstrap_badge(text: str, style: str = "primary") -> Element:
    return span(f".badge.text-bg-{style}")[text]

def bootstrap_alert(contents: Node) -> Renderable:
    return div(".alert", role="alert")[contents]
```

---

## Integration Guides

### Django

```python
# views.py
from django.http import HttpResponse
from htpy import html, body, div

def my_view(request):
    return HttpResponse(html[body[div["Hi Django!"]]])
```

**HTMX + htpy:** htpy works great with htmx for server-rendered partials.

**Custom Template Backend:**
```python
# settings.py
TEMPLATES = [
    # ... regular config
    {"BACKEND": "htpy.django.HtpyTemplateBackend", "NAME": "htpy"}
]
```

### Starlette / FastAPI

```python
from starlette.applications import Starlette
from starlette.routing import Route
from htpy import h1
from htpy.starlette import HtpyResponse

async def index(request):
    return HtpyResponse(h1["Hi Starlette!"])

app = Starlette(routes=[Route("/", index)])
```

---

## Common Patterns

### Base Layout

```python
import datetime
from htpy import Node, Renderable, body, div, h1, head, html, title

def base_layout(*, page_title: str, content: Node = None) -> Renderable:
    return html[
        head[title[page_title]],
        body[
            content,
            div("#footer")[f"Copyright {datetime.date.today().year}"],
        ],
    ]
```

### Component Functions

```python
from htpy import Renderable, body, html, h1

def greeting_page(*, name: str) -> Renderable:
    return html[body[h1[f"hi {name}!"]]]
```

### @with_children Decorator

```python
from htpy import Node, Renderable, with_children

@with_children
def my_component(children: Node, *, title: str) -> Renderable:
    return div[h1[title], children]

# Usage
my_component(title="My title")[div["My content"]]
```

---

## html2htpy — Convert HTML to Python

The CLI tool `html2htpy` converts existing HTML to htpy code:

```bash
# File input
html2htpy index.html

# Clipboard (Windows)
powershell Get-Clipboard | html2htpy > output.py

# Options
html2htpy --imports=h example.html      # import htpy as h
html2htpy --no-shorthand example.html   # explicit id/class kwargs
html2htpy --format=ruff example.html    # format output
```

**VSCode Extension:** [html2htpy](https://marketplace.visualstudio.com/items?itemName=dunderrrrrr.html2htpy)

---

## FAQ Highlights

| Question | Answer |
|----------|--------|
| Performance vs Django/Jinja? | On par with Django templates. Jinja2 is faster. |
| XML/XHTML support? | No — htpy generates HTML only. Use `lxml.builder` for XML. |
| Mixing concerns? | Use component functions in separate files (see Common Patterns). |
| Why `[]` instead of `<tags>`? | Compatible with Python formatters, editors, and type checkers. |

---

## References

See the `references/` directory for detailed reference docs:

- [references/usage.md](references/usage.md) — Elements, attributes, fragments, loops
- [references/patterns.md](references/patterns.md) — Components, layouts, @with_children
- [references/integration.md](references/integration.md) — Django, Starlette/FastAPI, async
- [references/typing.md](references/typing.md) — Element, VoidElement, Renderable, Node types
- [references/html2htpy.md](references/html2htpy.md) — CLI tool reference

See `examples/` for ready-to-use code samples:

- [examples/basic.py](examples/basic.py) — Minimal htpy usage
- [examples/components.py](examples/components.py) — Reusable component patterns
- [examples/django_view.py](examples/django_view.py) — Django integration
- [examples/fastapi_app.py](examples/fastapi_app.py) — FastAPI/Starlette integration
- [examples/streaming.py](examples/streaming.py) — Streaming with generators
- [examples/async_render.py](examples/async_render.py) — Async rendering
