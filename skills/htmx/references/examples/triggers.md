# htmx Trigger Examples

## Basic Triggers

### Click (Default)
```html
<button hx-get="/clicked">Click Me</button>
```

### Change
```html
<input type="text" name="q" hx-get="/search" hx-trigger="change">
```

### Mouse Events
```html
<div hx-get="/hovered" hx-trigger="mouseenter">
  Hover over me
</div>

<div hx-get="/clicked" hx-trigger="mousedown">
  Hold me down
</div>
```

### Keyboard Events
```html
<input hx-get="/search" hx-trigger="keyup">
<input hx-get="/search" hx-trigger="keydown">
<input hx-get="/search" hx-trigger="keypress">
```

## Special Triggers

### Load
```html
<div hx-get="/data" hx-trigger="load">
  Loading...
</div>
```

### Revealed (Scroll into View)
```html
<tr hx-get="/next-page" hx-trigger="revealed">
  <td>Load more content when scrolled into view</td>
</tr>
```

### Polling
```html
<!-- Every 2 seconds -->
<div hx-get="/updates" hx-trigger="every 2s">
  Updates
</div>

<!-- Every 5 minutes -->
<div hx-get="/status" hx-trigger="every 5m">
  Status check
</div>
```

## Trigger Modifiers

### Once
```html
<button hx-get="/click" hx-trigger="click once">
  Click me once
</button>
```

### Changed
```html
<input type="text" name="q" 
       hx-get="/search" 
       hx-trigger="input changed">
```

### Delay
```html
<input type="text" name="q" 
       hx-get="/search" 
       hx-trigger="input changed delay:500ms">
```

### Throttle
```html
<input type="text" name="q" 
       hx-get="/search" 
       hx-trigger="input changed throttle:1s">
```

### From Different Element
```html
<div hx-get="/shortcut" hx-trigger="keydown from:body">
  Press any key
</div>

<input hx-get="/validate" hx-trigger="change from:closest form">
```

### Target Filter
```html
<div hx-get="/clicked" hx-trigger="click[target.matches('.special')]">
  Only clicks on .special elements
</div>
```

### Consume (Prevent Parent Triggers)
```html
<div hx-get="/parent">
  <button hx-get="/child" hx-trigger="click consume">
    Click me (won't trigger parent)
  </button>
</div>
```

### Queue Options
```html
<!-- Queue first event -->
<button hx-get="/api" hx-trigger="click queue:first">
  First only
</button>

<!-- Queue last event (default) -->
<button hx-get="/api" hx-trigger="click queue:last">
  Last only
</button>

<!-- Queue all events -->
<button hx-get="/api" hx-trigger="click queue:all">
  All events
</button>

<!-- No queuing -->
<button hx-get="/api" hx-trigger="click queue:none">
  No queue
</button>
```

## Multiple Triggers

```html
<!-- Load on page load, then on click with delay -->
<div hx-get="/data" hx-trigger="load, click delay:1s">
  Content
</div>

<!-- Input changes and Enter key -->
<input hx-get="/search" 
       hx-trigger="input changed delay:500ms, keyup[key=='Enter']">
```

## Advanced Trigger Patterns

### Active Search
```html
<input type="text" name="q"
       hx-get="/search"
       hx-trigger="input changed delay:500ms, keyup[key=='Enter'], load"
       hx-target="#results"
       placeholder="Search...">
<div id="results"></div>
```

### Live Validation
```html
<input type="email" name="email"
       hx-post="/validate-email"
       hx-trigger="input changed delay:300ms"
       hx-target="#email-error">
<div id="email-error"></div>
```

### Infinite Scroll
```html
<table>
  <tbody id="results">
    <tr><td>Item 1</td></tr>
    <tr><td>Item 2</td></tr>
    <!-- Last row triggers next page -->
    <tr hx-get="/items?page=2"
        hx-trigger="revealed"
        hx-swap="afterend">
      <td>Loading...</td>
    </tr>
  </tbody>
</table>
```

### Lazy Loading
```html
<img hx-get="/image/123" 
     hx-trigger="load"
     hx-swap="outerHTML"
     src="/placeholder.gif">
```

### Polling with Stop
```html
<div hx-get="/status" 
     hx-trigger="every 5s"
     hx-swap="outerHTML">
  Checking...
</div>

<!-- Server responds with status code 286 to stop polling -->
```

### Keyboard Shortcuts
```html
<div hx-get="/save" hx-trigger="keydown[key=='s'] from:body">
  Press Ctrl+S to save
</div>
```

### Form Validation on Blur
```html
<input name="email" type="email"
       hx-post="/validate-email"
       hx-trigger="change"
       hx-target="#email-error">
<div id="email-error"></div>
```

### Button with Loading State
```html
<button hx-get="/process"
        hx-trigger="click"
        hx-indicator="#spinner">
  Process
  <img id="spinner" src="/spinner.gif" class="htmx-indicator">
</button>
```

### Click Counter
```html
<button hx-get="/increment"
        hx-trigger="click"
        hx-target="#count"
        hx-swap="innerHTML">
  Clicks: <span id="count">0</span>
</button>
```

### Double Click
```html
<div hx-get="/dblclick" hx-trigger="dblclick">
  Double click me
</div>
```

### Right Click
```html
<div hx-get="/context" hx-trigger="contextmenu">
  Right click me
</div>
```

### Focus Events
```html
<input hx-get="/focus" hx-trigger="focus">
<input hx-get="/blur" hx-trigger="blur">
```

### Scroll Events
```html
<div hx-get="/scroll" hx-trigger="scroll">
  Scroll content
</div>
```

### Resize Events
```html
<div hx-get="/resize" hx-trigger="resize from:window">
  Window resized
</div>
```

### Custom Events
```html
<div hx-get="/custom" hx-trigger="my-custom-event">
  Waiting for custom event
</div>

<script>
document.body.dispatchEvent(new CustomEvent('my-custom-event'));
</script>
```

### Event from Header
```html
<div hx-get="/data" hx-trigger="my-event from:body">
  Triggered by HX-Trigger header
</div>
```

### Polling with Filter
```html
<div hx-get="/updates" 
     hx-trigger="every 5s [someCondition]">
  Updates
</div>
```

### Multiple Polling Intervals
```html
<div hx-get="/fast" hx-trigger="every 1s">Fast updates</div>
<div hx-get="/slow" hx-trigger="every 30s">Slow updates</div>
```
