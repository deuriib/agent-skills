# Django Integration Example

```python
# views.py
from django.http import HttpRequest, HttpResponse
from htpy import html, body, div, h1

def my_view(request: HttpRequest) -> HttpResponse:
    return HttpResponse(html[body[div["Hi Django!"]]])
```

```python
# views.py — with template injection
from django.shortcuts import render
from htpy import h1, p

def index(request):
    return render(request, "base.html", {
        "content": [
            h1["Welcome to my site!"],
            p["Hello and welcome!"],
        ],
    })
```

```python
# components.py — form page
from django.http import HttpRequest
from django.template.backends.utils import csrf_input
from htpy import Node, Renderable, body, button, form, h1, head, html, title

def base_page(page_title: str, content: Node) -> Renderable:
    return html[
        head[title[page_title]],
        body[content],
    ]

def form_page(request: HttpRequest, *, my_form) -> Renderable:
    return base_page(
        "Contact Form",
        form(method="post")[
            csrf_input(request),
            my_form.errors,
            my_form["name"],
            my_form["email"],
            button["Submit"],
        ],
    )

def success_page() -> Renderable:
    return base_page(
        "Success!",
        h1["Thank you for your submission!"],
    )
```

```python
# settings.py — custom template backend
TEMPLATES = [
    # ... existing config
    {"BACKEND": "htpy.django.HtpyTemplateBackend", "NAME": "htpy"},
]
```

```python
# pizza/views.py — generic view with htpy
from django.views.generic import ListView
from pizza.models import Pizza

class PizzaListView(ListView):
    model = Pizza
    template_name = "pizza.components.pizza_list"
```

```python
# pizza/components.py
from htpy import li, ul, Renderable

def pizza_list(context, request) -> Renderable:
    return ul[(li[p.name] for p in context["object_list"])]
```

```python
# widgets.py — custom form widget
from django.forms import widgets
from htpy import input

class DateInput(widgets.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        return str(input(type="date", name=name, value=value, **(attrs or {})))
```
