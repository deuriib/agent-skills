# htmx Extensions Reference

## Core Extensions

### head-support
Provides support for merging head tag information (styles, etc.) in htmx requests.

**Use Case:** When you need to dynamically load CSS/JS with htmx responses.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/head-support.js"></script>
<div hx-ext="head-support">
  <!-- htmx will merge head tags from responses -->
</div>
```

### htmx-1-compat
Rolls back most behavioral changes of htmx 2 to htmx 1 defaults.

**Use Case:** Migration from htmx 1.x to 2.x.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/htmx-1-compat.js"></script>
```

### idiomorph
Provides a `morph` swap strategy based on the idiomorph morphing library.

**Use Case:** Preserve focus, video state, and other DOM state during swaps.

```html
<script src="https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js"></script>
<button hx-post="/update" hx-swap="morph">
  Update (morph)
</button>
```

### preload
Loads HTML fragments into browser cache before user requests.

**Use Case:** Preload pages for instant navigation.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/preload.js"></script>
<a href="/page" hx-ext="preload" preload="mouseover">Hover to preload</a>
```

### response-targets
Specifies different target elements based on HTTP response codes.

**Use Case:** Show errors in specific elements based on status codes.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/response-targets.js"></script>
<form hx-post="/submit" hx-ext="response-targets"
      hx-target-error="422:#errors">
  <!-- 422 responses swap into #errors -->
</form>
```

### sse
Provides Server-Sent Events support directly from HTML.

**Use Case:** Real-time updates from server.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/sse.js"></script>
<div hx-ext="sse" sse-connect="/events">
  <div sse-swap="message" hx-swap="innerHTML">
    Waiting for events...
  </div>
</div>
```

**Server Response (SSE format):**
```
event: message
data: <div>New content</div>

```

### ws
Provides WebSocket support directly from HTML.

**Use Case:** Bidirectional real-time communication.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/ws.js"></script>
<div hx-ext="ws" ws-connect="/ws">
  <div ws-swap="innerHTML">
    Waiting for messages...
  </div>
  <input id="msg" placeholder="Type message">
  <button ws-send="#msg">Send</button>
</div>
```

## Community Extensions

### ajax-header
Adds `X-Requested-With` header to all htmx requests.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/ajax-header.js"></script>
<div hx-ext="ajax-header" hx-get="/api">
  <!-- Request includes X-Requested-With header -->
</div>
```

### alpine-morph
Alpine.js morph plugin integration for htmx swaps.

**Use Case:** Retain Alpine.js state when htmx swaps components.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/alpine-morph.js"></script>
<div hx-ext="alpine-morph" hx-swap="morph">
  <!-- Alpine state preserved -->
</div>
```

### attribute-tools
Specify attributes to swap onto/off elements.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/attribute-tools.js"></script>
<div hx-ext="attribute-tools" 
     data-attributes="disabled=true">
  Content with disabled attribute
</div>
```

### class-tools
Specify CSS classes to swap onto/off elements.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/class-tools.js"></script>
<button hx-ext="class-tools" 
        classes="add loading:0.5s remove loading:2s">
  Click me
</button>
```

### debug
Logs all htmx events for element via console.debug.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/debug.js"></script>
<div hx-ext="debug" hx-get="/api">
  <!-- All events logged to console -->
</div>
```

### event-header
Adds `Triggering-Event` header with JSON-serialized triggering event.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/event-header.js"></script>
<button hx-ext="event-header" hx-post="/api">
  <!-- Header includes triggering event details -->
</button>
```

### loading-states
Manage loading states while request is in flight.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/loading-states.js"></script>
<button hx-ext="loading-states" hx-post="/api"
        data-loading-classes="is-loading">
  Submit
  <span data-loading> Loading...</span>
</button>
```

### morphdom-swap
Morph swap strategy based on morphdom library.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/morphdom-swap.js"></script>
<div hx-ext="morphdom-swap" hx-swap="morph">
  <!-- Morph using morphdom -->
</div>
```

### multi-swap
Swap multiple elements marked from HTML response.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/multi-swap.js"></script>
<button hx-ext="multi-swap" hx-post="/api"
        hx-multi-swap="#sidebar,#content">
  Update Multiple
</button>
```

**Server Response:**
```html
<div id="sidebar" hx-swap-oob="innerHTML">Sidebar content</div>
<div id="content" hx-swap-oob="innerHTML">Main content</div>
```

### no-cache
Forces htmx to bypass client caches.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/no-cache.js"></script>
<div hx-ext="no-cache" hx-get="/api">
  <!-- Request bypasses cache -->
</div>
```

### path-deps
Express inter-element dependencies based on paths.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/path-deps.js"></script>
<div hx-ext="path-deps" hx-get="/api/data">
  <input name="id" hx-path-deps="/api/user/{value}">
</div>
```

### path-params
Uses request parameters to populate path variables.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/path-params.js"></script>
<button hx-ext="path-params" hx-get="/api/{id}"
        hx-vals='{"id": 123}'>
  Load
</button>
```

### remove-me
Removes element after specified interval.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/remove-me.js"></script>
<div hx-ext="remove-me" remove-me="5s">
  This disappears after 5 seconds
</div>
```

### replaced
Triggers event on back button with hx-boost.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/restored.js"></script>
<div hx-ext="restored" hx-get="/api/data"
     hx-trigger="restored">
  <!-- Reloads on back button -->
</div>
```

### client-side-templates
Transforms JSON/XML response via client-side template.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/client-side-templates.js"></script>
<div hx-ext="client-side-templates" 
     hx-get="/api/data"
     hx-template="#mustache-template">
  <!-- Response transformed via template -->
</div>
```

### json-enc
Encodes parameters in JSON format instead of URL format.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/json-enc.js"></script>
<form hx-ext="json-enc" hx-post="/api">
  <input name="name" value="John">
  <button type="submit">Submit (JSON)</button>
</form>
```

### client-side-templates
Transforms JSON/XML via client-side template.

```html
<script src="https://unpkg.com/htmx.org/dist/extensions/client-side-templates.js"></script>
<div hx-ext="client-side-templates"
     hx-get="/api"
     hx-template="#my-template">
  <!-- Template renders response -->
</div>
```

## Loading Extensions

### Via CDN
```html
<script src="https://unpkg.com/htmx.org/dist/extensions/EXTENSION_NAME.js"></script>
```

### Via npm
```bash
npm install htmx.org
```
Then import:
```js
import 'htmx.org/dist/extensions/EXTENSION_NAME';
```

### Defining Custom Extensions
```javascript
htmx.defineExtension('my-extension', {
    onEvent: function(name, evt) {
        console.log('Event:', name);
    },
    transformResponse: function(text, xhr, elt) {
        return text;
    },
    isInlineExtension: function() {
        return false;
    }
});
```
