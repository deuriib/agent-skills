# htpy Usage Reference

Complete reference for htpy elements, attributes, and rendering.

## Elements

Elements are imported from `htpy` and used with `[]` for children:

```python
from htpy import div, h1, p

# String children
h1["Hello!"]  # <h1>Hello!</h1>

# Nested elements
div[h1["Title"], p["Content"]]
# <div><h1>Title</h1><p>Content</p></div>
```

## Attributes

### Keyword Arguments

```python
from htpy import img
img(src="pic.jpg")           # <img src="pic.jpg">
img(src="pic.jpg", alt="Photo")  # <img src="pic.jpg" alt="Photo">
```

### Reserved Python Keywords

- `class` → `class_`
- `for` → `for_`

```python
from htpy import label, form
label(for_="name")           # <label for="name"></label>
```

### Dashes via Underscores

```python
from htpy import div
div(hx_get="/data")          # <div hx-get="/data"></div>
```

### ID/Class Shorthand

```python
from htpy import div

div("#myid")                 # <div id="myid"></div>
div(".foo.bar")              # <div class="foo bar"></div>
div("#myid.foo.bar")         # <div id="myid" class="foo bar"></div>
```

### Attributes as Dict

```python
from htpy import button
button({"hx-post": "/foo"})  # <button hx-post="/foo"></button>
button({"for": "name"})      # reserved keyword via dict
```

### Boolean Attributes

```python
from htpy import button
button(disabled=True)        # <button disabled></button>
button(disabled=False)       # <button></button>
```

### Conditional CSS Classes

```python
from htpy import button
is_active = True
button(class_=["btn", {"btn-active": is_active}])
# <button class="btn btn-active"></button>
```

### Combining Modes

```python
from htpy import label
label("#id.cls", {"for": "f"}, name="n")
# <label id="id" class="cls" for="f" name="n"></label>
```

## Children Types

### Strings
```python
h1["Hello"]  # <h1>Hello</h1>
```

### Elements
```python
div[span["text"]]  # <div><span>text</span></div>
```

### Generators
```python
ul[(li[x] for x in items)]  # <ul><li>...</li></ul>
```
> Generators are consumed once. Use `list` for multi-render.

### Lists
```python
div[[span["a"], span["b"]]]  # <div><span>a</span><span>b</span></div>
```

## Conditional Rendering

```python
from htpy import div, b
error = "Invalid"

# and/or short-circuit
div[error and b[error]]      # <div><b>Invalid</b></div>

# Inline if/else
div[b[error] if error else None]
```

## Fragments

```python
from htpy import fragment, p, i
content = fragment["Hello ", i["world!"]]
print(content)  # Hello <i>world!</i>
```

## Custom Elements (Web Components)

```python
from htpy import my_element
my_element["content"]  # <my-element>content</my-element>
```

## Raw Markup

```python
from htpy import div
from markupsafe import Markup
div[Markup("<foo></foo>")]  # <div><foo></foo></div>
```

## HTML Doctype

```python
from htpy import html
print(html)  # <!doctype html><html></html>
```

## HTML Comments

```python
from htpy import div, comment
div[comment("visible comment")]  # <div><!-- visible comment --></div>
```

## Attribute Escaping

Attributes are always escaped (safe from XSS):

```python
from htpy import button
button(onclick="alert('hi')")["Click"]
# <button onclick="alert(&#39;hi&#39;)">Click</button>
# Browser parses correctly via getAttribute()
```
