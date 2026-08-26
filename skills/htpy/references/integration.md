# htpy Integration Reference

## Django

### HttpResponse

```python
from django.http import HttpResponse
from htpy import html, body, div

def my_view(request):
    return HttpResponse(html[body[div["Hi Django!"]]])
```

### Injecting into Django Templates

htpy elements are marked safe — pass directly to templates:

```python
from django.shortcuts import render
from htpy import h1

def index(request):
    return render(request, "base.html", {
        "content": h1["Welcome!"],
    })
```

### Django Forms with htpy

```python
from django.http import HttpRequest, HttpResponse
from django.template.backends.utils import csrf_input
from htpy import Node, Renderable, body, button, form, h1, head, html, title

def base_page(page_title: str, content: Node) -> Renderable:
    return html[
        head[title[page_title]],
        body[content],
    ]

def form_page(request: HttpRequest, *, my_form) -> Renderable:
    return base_page(
        "My form",
        form(method="post")[
            csrf_input(request),
            my_form.errors,
            my_form["name"],
            button["Submit!"],
        ],
    )
```

### Django Form Widgets

```python
from django.forms import widgets
from htpy import sl_input

class ShoelaceInput(widgets.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        return str(sl_input(attrs, name=name, value=value))
```

### Custom Template Backend

Use htpy components where Django expects template names (generic views, etc.):

```python
# settings.py
TEMPLATES = [
    # ... regular config
    {"BACKEND": "htpy.django.HtpyTemplateBackend", "NAME": "htpy"}
]
```

```python
# views.py
from django.views.generic import ListView
from pizza.models import Pizza

class PizzaListView(ListView):
    model = Pizza
    template_name = "pizza.components.pizza_list"
```

```python
# pizza/components.py
from htpy import li, ul

def pizza_list(context, request):
    return ul[(li[pizza.name] for pizza in context["object_list"])]
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

## Starlette / FastAPI

### HtpyResponse

```python
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.routing import Route
from htpy import Element, h1
from htpy.starlette import HtpyResponse

async def index(request: Request) -> HtpyResponse:
    return HtpyResponse(h1["Hi Starlette!"])

app = Starlette(routes=[Route("/", index)])
```

### Async Components

```python
from htpy import p, Renderable

async def get_data() -> str:
    return "from DB"

async def my_page() -> Renderable:
    data = await get_data()
    return p[data]
```

### Streaming with Starlette

```python
from starlette.responses import StreamingResponse
from htpy import div, h1

async def stream_page(request):
    async def generate():
        async for chunk in div[h1["Hello"]].aiter_chunks():
            yield chunk
    return StreamingResponse(generate(), media_type="text/html")
```

## Async Rendering

### Async Components

```python
from htpy import p, Renderable

async def fetch_content() -> str:
    return "async content"

async def my_component() -> Renderable:
    result = await fetch_content()
    return p[result]
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

### aiter_chunks()

```python
import asyncio
from htpy import div

async def main():
    async for chunk in div[my_component()].aiter_chunks():
        print(chunk)

asyncio.run(main())
```

> **Warning:** `str(async_component)` raises TypeError. Always use `aiter_chunks()`.
