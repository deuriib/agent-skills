# htpy Static Typing Reference

htpy is designed for static type checking with mypy or pyright.

## Key Types

### `Element`

Base class for HTML elements that can have children (div, span, p, etc.):

```python
from htpy import Element, span

def badge(text: str, style: str = "primary") -> Element:
    return span(f".badge.text-bg-{style}")[text]
```

### `VoidElement`

HTML void elements that cannot have children (img, input, br, hr):

```python
from htpy import VoidElement, img

def avatar(src: str, alt: str) -> VoidElement:
    return img(src=src, alt=alt, class_="avatar")
```

### `Renderable`

Protocol for anything renderable as HTML. Defines:
- `__str__()` — render as HTML string
- `__html__()` — render as safe markup (for Django/Jinja templates)
- `iter_chunks()` — stream as chunks

```python
from htpy import Renderable, div

def my_component(name: str) -> Renderable:
    return div[h1[f"Hello {name}!"]]

# Can be used as child
div[my_component("Dave")]

# Or rendered standalone
print(my_component("Dave"))
```

### `Node`

Type alias for all valid child nodes: `str | Element | VoidElement | Renderable | None | Iterable[Node] | Markup | Callable`.

Use `Node` when accepting flexible children:

```python
from htpy import Node, Renderable, div

def alert(contents: Node) -> Renderable:
    return div(".alert", role="alert")[contents]
```

### `Context[T]`

Generic typed context for data passing:

```python
from typing import Literal
from htpy import Context

Theme = Literal["light", "dark"]
theme_context: Context[Theme] = Context("theme", default="light")
```

## Type Inference

htpy elements have full type annotations. Editors provide autocompletion:

```python
from htpy import div
div(  # ← shows all valid attributes: class_, id, hx_get, etc.
```

## mypy / pyright Compatibility

```python
class User:
    def __init__(self, name: str):
        self.name = name

def greeting(user: User) -> Renderable:
    return h1[f"Hi {user.name}!"]
    # mypy catches: "User" has no attribute "first_name" (if mistyped)
```
