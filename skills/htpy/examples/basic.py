# Basic htpy Usage

Minimal examples of htpy HTML generation.

```python
from htpy import html, head, body, h1, p, div, ul, li, title

# Simple page
page = html[
    head[title["My Page"]],
    body[
        h1["Hello, World!"],
        p["Welcome to htpy."],
    ],
]

print(page)
```

```python
from htpy import div, span, a

# Navigation bar
nav = div(".navbar")[
    a(".nav-link", href="/")["Home"],
    a(".nav-link", href="/about")["About"],
    a(".nav-link", href="/contact")["Contact"],
]

print(nav)
```

```python
from htpy import ul, li

# Dynamic list
items = ["Python", "htpy", "Django"]
menu = ul[(li[item] for item in items)]

print(menu)
# <ul><li>Python</li><li>htpy</li><li>Django</li></ul>
```

```python
from htpy import div

# Conditional rendering
is_logged_in = True
user_div = div[
    is_logged_in and span("Welcome back!"),
    not is_logged_in and a(href="/login")["Log in"],
]

print(user_div)
```

```python
from htpy import div, comment

# Comments and raw markup
from markupsafe import Markup

content = div[
    comment("This is visible in the browser"),
    Markup("<custom-element>raw html</custom-element>"),
]

print(content)
```
