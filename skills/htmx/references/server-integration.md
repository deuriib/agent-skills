# htmx Server Integration Guide

## Overview

htmx works with any server-side language that can return HTML. The server returns HTML fragments, not JSON. This guide covers integration patterns for popular frameworks.

## Detecting htmx Requests

Check for `HX-Request` header to distinguish htmx vs standard requests.

### Node.js (Express)
```javascript
app.get('/data', (req, res) => {
    if (req.headers['hx-request']) {
        // htmx request - return partial HTML
        res.send('<div>Partial content</div>');
    } else {
        // Standard request - return full page
        res.render('full_page');
    }
});
```

### Python (Flask)
```python
from flask import request, render_template

@app.route('/data')
def data():
    if request.headers.get('HX-Request'):
        return '<div>Partial content</div>'
    return render_template('full_page.html')
```

### Python (Django)
```python
from django.http import HttpResponse

def data(request):
    if request.headers.get('HX-Request'):
        return HttpResponse('<div>Partial content</div>')
    return render(request, 'full_page.html')
```

### Ruby (Rails)
```ruby
def data
  if request.headers['HX-Request']
    render partial: 'partial', formats: [:html]
  else
    render 'full_page'
  end
end
```

### PHP
```php
<?php
if ($_SERVER['HTTP_HX_REQUEST'] ?? false) {
    echo '<div>Partial content</div>';
} else {
    include 'full_page.php';
}
?>
```

### Go
```go
func dataHandler(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("HX-Request") == "true" {
        fmt.Fprint(w, "<div>Partial content</div>")
    } else {
        tmpl.Execute(w, nil)
    }
}
```

### Java (Spring Boot)
```java
@GetMapping("/data")
public String data(HttpServletRequest request) {
    if ("true".equals(request.getHeader("HX-Request"))) {
        return "<div>Partial content</div>";
    }
    return "full_page";
}
```

## Response Headers

### HX-Trigger
Trigger client-side events from server response.

**Node.js:**
```javascript
app.post('/save', (req, res) => {
    res.set('HX-Trigger', 'saved');
    res.send('<div>Saved!</div>');
});
```

**Python (Flask):**
```python
@app.route('/save', methods=['POST'])
def save():
    return '<div>Saved!</div>', 200, {'HX-Trigger': 'saved'}
```

**PHP:**
```php
<?php
header('HX-Trigger: saved');
echo '<div>Saved!</div>';
?>
```

### HX-Push-Url
Push new URL into browser history.

**Node.js:**
```javascript
app.get('/page/:id', (req, res) => {
    res.set('HX-Push-Url', `/page/${req.params.id}`);
    res.send('<div>Page content</div>');
});
```

**Python (Flask):**
```python
@app.route('/page/<int:id>')
def page(id):
    return '<div>Page content</div>', 200, {'HX-Push-Url': f'/page/{id}'}
```

### HX-Redirect
Client-side redirect without full page reload.

**Node.js:**
```javascript
app.post('/login', (req, res) => {
    if (authenticated) {
        res.set('HX-Redirect', '/dashboard');
        res.send('');
    } else {
        res.send('<div>Invalid credentials</div>');
    }
});
```

**Python (Flask):**
```python
@app.route('/login', methods=['POST'])
def login():
    if authenticated:
        return '', 200, {'HX-Redirect': '/dashboard'}
    return '<div>Invalid credentials</div>'
```

### HX-Reswap
Override swap strategy from server.

**Node.js:**
```javascript
app.get('/update', (req, res) => {
    res.set('HX-Reswap', 'afterend');
    res.send('<div>New content</div>');
});
```

### HX-Retarget
Override target element from server.

**Node.js:**
```javascript
app.get('/update', (req, res) => {
    res.set('HX-Retarget', '#notifications');
    res.send('<div>Notification</div>');
});
```

### HX-Reselect
Override content selection from server.

**Node.js:**
```javascript
app.get('/page', (req, res) => {
    res.set('HX-Reselect', '#main-content');
    res.send('<div id="main-content">Content</div>');
});
```

## Form Handling

### Standard Form Submission
```html
<form hx-post="/submit" hx-target="#result">
  <input name="email" type="email" required>
  <button type="submit">Submit</button>
</form>
<div id="result"></div>
```

**Server Response:**
```html
<!-- Success -->
<div class="success">Form submitted successfully!</div>

<!-- Error with validation -->
<div class="error">
  <div>Email is required</div>
</div>
```

### File Upload
```html
<form hx-encoding="multipart/form-data" hx-post="/upload">
  <input type="file" name="file">
  <button type="submit">Upload</button>
  <progress id="progress" value="0" max="100"></progress>
</form>

<script>
htmx.on('#form', 'htmx:xhr:progress', function(evt) {
    htmx.find('#progress').setAttribute('value', 
        evt.detail.loaded/evt.detail.total * 100);
});
</script>
```

**Node.js (Multer):**
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('<div>File uploaded: ' + req.file.originalname + '</div>');
});
```

### Form Validation
```html
<form hx-post="/validate" hx-trigger="submit">
  <input name="email" type="email" required
         hx-post="/validate-email"
         hx-trigger="change"
         hx-target="#email-error">
  <div id="email-error"></div>
  <button type="submit">Submit</button>
</form>
```

**Server Response (validation):**
```html
<!-- Invalid -->
<div class="error">Email already exists</div>

<!-- Valid (empty response removes error) -->
```

## Real-Time Updates

### Server-Sent Events (SSE)
```html
<div hx-ext="sse" sse-connect="/events">
  <div sse-swap="message" hx-swap="innerHTML">
    Waiting for events...
  </div>
</div>
```

**Node.js:**
```javascript
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const sendEvent = (event, data) => {
        res.write(`event: ${event}\ndata: ${data}\n\n`);
    };
    
    // Send events
    setInterval(() => {
        sendEvent('message', '<div>Update</div>');
    }, 5000);
    
    req.on('close', () => {
        // Cleanup
    });
});
```

### WebSocket
```html
<div hx-ext="ws" ws-connect="/ws">
  <div ws-swap="innerHTML">
    Waiting for messages...
  </div>
  <input id="msg" placeholder="Type message">
  <button ws-send="#msg">Send</button>
</div>
```

**Node.js (ws):**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('<div>' + message + '</div>');
            }
        });
    });
});
```

## Pagination

### Infinite Scroll
```html
<table>
  <tbody id="results">
    <tr>
      <td>Item 1</td>
    </tr>
    <!-- Last row triggers next page -->
    <tr hx-get="/items?page=2"
        hx-trigger="revealed"
        hx-swap="afterend">
      <td>Load more...</td>
    </tr>
  </tbody>
</table>
```

### Click to Load More
```html
<div id="results">
  <!-- Initial results -->
</div>
<button hx-get="/items?page=2"
        hx-target="#results"
        hx-swap="beforeend">
  Load More
</button>
```

## Error Handling

### Custom Error Pages
```javascript
// Node.js
app.use((err, req, res, next) => {
    if (req.headers['hx-request']) {
        res.status(500).send('<div class="error">Server error</div>');
    } else {
        res.status(500).render('error');
    }
});
```

### Validation Errors
```html
<form hx-post="/submit" hx-target="#form-container">
  <input name="email" required>
  <button type="submit">Submit</button>
</form>
<div id="form-container">
  <!-- Server returns form with errors -->
</div>
```

**Server Response (422):**
```html
<form hx-post="/submit" hx-target="#form-container">
  <input name="email" required class="error" value="invalid">
  <div class="error">Invalid email format</div>
  <button type="submit">Submit</button>
</form>
```

## CSRF Protection

### Node.js (Express)
```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.post('/submit', csrfProtection, (req, res) => {
    // req.csrfToken() available
    res.send('<div>Saved</div>');
});
```

### Python (Django)
```python
from django.middleware.csrf import get_token

def data(request):
    csrf_token = get_token(request)
    return HttpResponse(f'''
        <form hx-post="/submit">
            <input type="hidden" name="csrfmiddlewaretoken" value="{csrf_token}">
            <button type="submit">Submit</button>
        </form>
    ''')
```

## Performance Tips

1. **Return Only HTML**: Don't wrap in full HTML document unless necessary
2. **Use OOB Swaps**: Update multiple elements efficiently
3. **Minimize Response Size**: Return only what's needed
4. **Cache Appropriately**: Use proper cache headers
5. **Debounce Requests**: Use `delay:` and `throttle:` in triggers
