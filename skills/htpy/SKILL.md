---
name: htpy
description: Use when generating HTML from Python without a templating language — htpy elements, attributes, components, fragments, streaming, or async rendering.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.2"
---

# htpy

## Overview

htpy builds HTML from Python function calls. `div` is a function, `div[...]` is its children, `div(...)` is its attributes — and the result is an object you can nest, stream, and type-check.

## When to Use

- A Python service returns HTML and templates feel like ceremony.
- You want type-checked component functions instead of string concatenation.
- You need streaming or async rendering from Python.

**Not for**: XML/XHTML output, or projects already deep into a template engine with no reason to move.

## Hard Rules

- **`[]` for children, `()` for attributes.** Never the reverse.
- **Trailing underscores are stripped**: `del_` → `<del>`, `data_dismiss` → `data-dismiss`. A literal underscore is not expressible this way — use the dict form.
- **Elements are immutable.** Mutating `.children` raises — build a new element instead.
- **Reserved keywords need the dict form**: `label({"for": "myfield"})`, never `label(for_=...)`.
- **Generators need parentheses**: `ul[(li[x] for x in items)]`. A bare `ul[li[x] for x in items]` is a Python syntax error. Generators are consumed once — pass a list if the element renders more than once.
- **Strings are escaped by default.** `div[Markup(...)]` (markupsafe) is the only way to inject trusted raw markup.
- **Return `Node` / `Renderable`, not `Element`**, from component functions that may return `None`.

## Quick Reference

```python
from htpy import div, h1, a, fragment

page = div[
    h1["Title"],
    a("https://example.com", class_="link")["Click"],
    fragment[condition and div["Only when true"]],
]
```

| Need | Syntax |
|---|---|
| Text child | `div["hello"]` |
| Element child | `div[div["nested"]]` |
| Loop (list, reusable) | `ul[[li[item] for item in items]]` |
| Loop (generator, one-shot) | `ul[(li[item] for item in items)]` |
| CSS class shorthand | `div(".card")`, `div("#main.card")` |
| Dict attributes (reserved words, `@click`, dashes) | `button({"hx-post": "/save"})` |
| Boolean attribute | `button(disabled=True)` |
| Conditional class | `button(class_=["btn", {"btn-active": is_active}])` |
| No wrapper element | `fragment[...]` (import `fragment`, not `Fragment`) |
| Raw markup | `div[Markup(trusted_html)]` from markupsafe |

## Decision Gates

| Situation | Do this |
|---|---|
| Need a component with props | Function taking keyword-only args, returning `Node` |
| Many children passed through | `@with_children` decorator |
| Same data needed deep in the tree | `Context[T]` + `@consumer` — do not prop-drill |
| Streaming a slow response | `element.iter_chunks()` or pass a `lambda` child |
| Async data in a component | Make the function `async`, return `Node`; see integration reference |
| Django view | Return `HttpResponse(str(element))` |
| FastAPI/Starlette route | Return `HtpyResponse(element)` |
| Writing `.children` | Not possible — elements are immutable |
## Implementation

`from htpy import ...` gives you every HTML tag as a callable, plus `Fragment`, `Context`, `with_children`.

Type-check components with `Element`, `VoidElement`, `Renderable`, and `Node`:

```python
from htpy import Element, Node, Renderable, div, span

def badge(text: str, style: str = "primary") -> Element:
    return span(f".badge.bg-{style}")[text]

def alert(contents: Node) -> Renderable:
    return div(".alert", role="alert")[contents]
```

Static typing is a first-class feature — annotate component returns so the checker catches a `div` where a string was promised.

## Common Mistakes

| Symptom | Cause | Fix |
|---|---|---|
| `TypeError` on attribute | Used `[]` for an attribute, or `()` for children | Swap the brackets |
| `SyntaxError` on a loop | Generator not parenthesized | `ul[(li[x] for x in items)]` |
| `NameError` on a bare attribute | Passed `disabled` instead of `disabled=True` | Use `=True` / `=False` |
| `ValueError` on multiple positional selectors | Only one shorthand string is accepted | Combine into one: `div("#id.a.b")` |
| `Fragment` not subscriptable | Imported the type, not the factory | `from htpy import fragment` |
| `for` is a syntax error | Python keyword | `label({"for": "f"})` |
| Output escaped twice | Passed a pre-built string through `Markup` | Let htpy escape by default |

## References

- `references/usage.md` — elements, attributes, fragments, conditional rendering, escaping.
- `references/patterns.md` — component functions, layouts, `@with_children`, `Context`, immutability.
- `references/integration.md` — Django, Starlette/FastAPI, async rendering, streaming.
- `references/typing.md` — `Element`, `VoidElement`, `Renderable`, `Node`, checker compatibility.
- `references/html2htpy.md` — converting existing HTML to htpy.
- `scripts/examples/` — runnable samples: `basic.py`, `components.py`, `django_view.py`, `fastapi_app.py`, `streaming.py`, `async_render.py`.
