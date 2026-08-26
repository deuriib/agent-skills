# htmx Getting Started Guide

## What is htmx?

htmx is a library that allows you to access modern browser features directly from HTML, rather than using JavaScript. It extends the core idea of HTML as a hypertext:

- Any element can issue an HTTP request (not just anchors and forms)
- Any event can trigger requests (not just clicks or form submissions)
- Any HTTP verb can be used (not just GET and POST)
- Any element can be the target for updates (not just the entire window)

**Core Philosophy**: Respond with *HTML*, not JSON. This keeps you within the original web programming model using HATEOAS.

## Installation

### Via CDN (Recommended for Quick Start)

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js" 
        integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V" 
        crossorigin="anonymous"></script>
```

### Via npm

```bash
npm install htmx.org@2.0.10
```

Then import in your JavaScript:

```js
import 'htmx.org';
```

For webpack, to expose `htmx` globally:

```js
window.htmx = require('htmx.org');
```

### Download

Download `htmx.min.js` from [jsDelivr](https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js) and include it:

```html
<script src="/path/to/htmx.min.js"></script>
```

## Quick Start Example

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js"></script>
</head>
<body>
    <button hx-get="/clicked" hx-target="#result" hx-swap="innerHTML">
        Click Me!
    </button>
    <div id="result"></div>
</body>
</html>
```

Server response (HTML, not JSON):
```html
<div>Button was clicked at: 2024-01-15 10:30:00</div>
```

## How It Works

1. User clicks button
2. htmx issues GET request to `/clicked`
3. Server responds with HTML fragment
4. htmx swaps response into `#result` div

## Progressive Enhancement

Use `hx-boost` for graceful degradation:

```html
<div hx-boost="true">
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
</div>
```

Without JavaScript: links work normally.
With JavaScript: AJAX requests replace body content.

## Common Patterns

### Active Search
```html
<input type="text" name="q"
    hx-get="/search"
    hx-trigger="keyup changed delay:500ms"
    hx-target="#results"
    placeholder="Search...">
<div id="results"></div>
```

### Click to Edit
```html
<div hx-target="this" hx-swap="outerHTML">
    <div>Name: Joe</div>
    <button hx-get="/contact/1/edit">Edit</button>
</div>
```

### Infinite Scroll
```html
<tr hx-get="/contacts?page=2"
    hx-trigger="revealed"
    hx-swap="afterend">
    <td>Last Item</td>
</tr>
```

## Server-Side Integration

htmx works with any server-side language. The server returns HTML fragments:

### Node.js (Express)
```js
app.get('/clicked', (req, res) => {
    res.send('<div>Button clicked!</div>');
});
```

### Python (Flask)
```python
@app.route('/clicked')
def clicked():
    return '<div>Button clicked!</div>'
```

### PHP
```php
<?php
if ($_SERVER['REQUEST_URI'] === '/clicked') {
    echo '<div>Button clicked!</div>';
}
?>
```

## Data Format

**htmx sends**: Standard HTTP requests with form data
**htmx expects**: HTML fragments (not JSON)

Check for htmx requests on server:
```python
# Python/Flask
if request.headers.get('HX-Request'):
    return '<div>Partial HTML</div>'
else:
    return render_template('full_page.html')
```

```javascript
// Node.js
if (req.headers['hx-request']) {
    res.send('<div>Partial HTML</div>');
} else {
    res.render('full_page');
}
```

## Next Steps

1. Read `references/attributes.md` for complete attribute reference
2. Read `references/events.md` for event handling
3. Read `references/examples/` for practical patterns
4. Check `references/extensions.md` for SSE, WebSocket, and more
