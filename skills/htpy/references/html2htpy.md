# html2htpy CLI Reference

The `html2htpy` command converts HTML to htpy Python code.

## Installation

Included with htpy:
```bash
pip install htpy
```

## Usage

```bash
html2htpy [options] [input]
```

**Input:** HTML file or stdin if omitted.

## Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `-f, --format` | `auto`, `ruff`, `black`, `none` | `auto` | Format output code |
| `-i, --imports` | `yes`, `h`, `no` | `yes` | Import style |
| `--no-shorthand` | — | — | Use explicit `id`/`class_` instead of `#id.class` |

## Import Styles

### `--imports=yes` (default)
```python
from htpy import div, span

div(".foo")["Hello"]
```

### `--imports=h`
```python
import htpy as h

h.div(".foo")["Hello"]
```

### `--imports=no`
No imports added — you handle them.

## Shorthand vs Explicit

### Default (shorthand)
```bash
html2htpy example.html
```
```python
from htpy import section, p

section("#main.hero.is-link")[
    p(".subtitle.is-3")["Welcome"]
]
```

### `--no-shorthand`
```bash
html2htpy --no-shorthand example.html
```
```python
from htpy import section, p

section(id="main", class_="hero is-link")[
    p(class_="subtitle is-3")["Welcome"]
]
```

## Django/Jinja Variable Conversion

Template variables are converted to f-strings:

```html
<div>hi {{ name }}!</div>
```
```python
div[f"hi { name }!"]
```

> **Limitation:** Loops (`{% for %}`) and other template syntax must be manually converted.

## Clipboard Piping

### Linux
```bash
xclip -o -selection clipboard | html2htpy > output.py
```

### Mac
```bash
pbpaste | html2htpy > output.py
```

### Windows
```powershell
powershell Get-Clipboard | html2htpy > output.py
```

## VSCode Extension

Install [html2htpy](https://marketplace.visualstudio.com/items?itemName=dunderrrrrr.html2htpy) for one-click conversion.
