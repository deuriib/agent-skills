# htmx Events Reference

## Request Lifecycle Events

### htmx:configRequest
Triggered before the request, allows customization of parameters and headers.

```javascript
document.body.addEventListener('htmx:configRequest', function(evt) {
    // evt.detail.headers['X-Custom'] = 'value';
    // evt.detail.parameters.custom = 'value';
    // evt.detail.unfilteredParameters contains all parameters
});
```

**Event Detail:**
- `headers` — request headers object
- `parameters` — request parameters object
- `unfilteredParameters` — all parameters before filtering
- `target` — target element
- `triggeringEvent` — event that triggered request
- `verb` — HTTP verb

### htmx:beforeRequest
Triggered before AJAX request is made.

```javascript
document.body.addEventListener('htmx:beforeRequest', function(evt) {
    console.log('Request starting...');
});
```

### htmx:beforeSend
Triggered just before AJAX request is sent.

```javascript
document.body.addEventListener('htmx:beforeSend', function(evt) {
    // evt.detail.xhr — the XMLHttpRequest object
});
```

### htmx:afterOnLoad
Triggered after successful response processing.

```javascript
document.body.addEventListener('htmx:afterOnLoad', function(evt) {
    console.log('Response loaded successfully');
});
```

### htmx:afterRequest
Triggered after AJAX request completed (success or failure).

```javascript
document.body.addEventListener('htmx:afterRequest', function(evt) {
    // evt.detail.xhr — the XMLHttpRequest
    // evt.detail.requestConfig — request configuration
    // evt.detail.successful — boolean
});
```

### htmx:afterSettle
Triggered after DOM has settled.

```javascript
document.body.addEventListener('htmx:afterSettle', function(evt) {
    // DOM is now stable
});
```

### htmx:afterSwap
Triggered after new content has been swapped in.

```javascript
document.body.addEventListener('htmx:afterSwap', function(evt) {
    // New content is in the DOM
});
```

## Swap & Transform Events

### htmx:beforeSwap
Triggered before swap — allows swap configuration.

```javascript
document.body.addEventListener('htmx:beforeSwap', function(evt) {
    // evt.detail.shouldSwap — boolean
    // evt.detail.target — target element
    // evt.detailresp — response text
    // evt.detail.xhr — XMLHttpRequest
    
    // Example: Don't swap on 404
    if (evt.detail.xhr.status === 404) {
        evt.detail.shouldSwap = false;
    }
});
```

### htmx:beforeTransition
Triggered before View Transition swap.

```javascript
document.body.addEventListener('htmx:beforeTransition', function(evt) {
    // Can call preventDefault() to cancel transition
});
```

### htmx:oobBeforeSwap
Triggered before out-of-band element swap.

```javascript
document.body.addEventListener('htmx:oobBeforeSwap', function(evt) {
    // evt.detail.body — the OOB element
    // evt.detail.shouldSwap — boolean
    // evt.detail.target — target element
});
```

### htmx:oobAfterSwap
Triggered after out-of-band element has been swapped in.

```javascript
document.body.addEventListener('htmx:oobAfterSwap', function(evt) {
    // OOB swap complete
});
```

### htmx:oobErrorNoTarget
Triggered when OOB element has no matching ID in DOM.

```javascript
document.body.addEventListener('htmx:oobErrorNoTarget', function(evt) {
    console.warn('OOB target not found:', evt.detail.id);
});
```

## Error Events

### htmx:responseError
Triggered on HTTP response error (non-2xx/3xx).

```javascript
document.body.addEventListener('htmx:responseError', function(evt) {
    // evt.detail.xhr — XMLHttpRequest
    // evt.detail.requestConfig — request config
    console.error('HTTP Error:', evt.detail.xhr.status);
});
```

### htmx:sendError
Triggered when network error prevents request.

```javascript
document.body.addEventListener('htmx:sendError', function(evt) {
    console.error('Network error');
});
```

### htmx:swapError
Triggered when error occurs during swap phase.

```javascript
document.body.addEventListener('htmx:swapError', function(evt) {
    console.error('Swap failed');
});
```

### htmx:timeout
Triggered when request timeout occurs.

```javascript
document.body.addEventListener('htmx:timeout', function(evt) {
    console.error('Request timed out');
});
```

### htmx:sendAbort
Triggered when request is aborted.

```javascript
document.body.addEventListener('htmx:sendAbort', function(evt) {
    console.log('Request aborted');
});
```

### htmx:abort
Send this event to an element to abort request.

```html
<button id="request-btn" hx-post="/api">Request</button>
<button onclick="htmx.trigger('#request-btn', 'htmx:abort')">
  Cancel
</button>
```

## Validation Events

### htmx:validation:validate
Called before element's checkValidity() is called.

```javascript
document.body.addEventListener('htmx:validation:validate', function(evt) {
    // Add custom validation
    var input = evt.detail;
    if (input.name === 'email' && !input.value.includes('@')) {
        input.setCustomValidity('Invalid email');
    }
});
```

### htmx:validation:failed
Triggered when checkValidity() returns false.

```javascript
document.body.addEventListener('htmx:validation:failed', function(evt) {
    console.log('Validation failed');
});
```

### htmx:validation:halted
Triggered when request halted due to validation.

```javascript
document.body.addEventListener('htmx:validation:halted', function(evt) {
    // evt.detail.errors — validation errors
    console.log('Request halted:', evt.detail.errors);
});
```

## History Events

### htmx:historyCacheHit
Triggered on cache hit in history.

```javascript
document.body.addEventListener('htmx:historyCacheHit', function(evt) {
    console.log('History cache hit');
});
```

### htmx:historyCacheMiss
Triggered on cache miss in history.

```javascript
document.body.addEventListener('htmx:historyCacheMiss', function(evt) {
    console.log('History cache miss');
});
```

### htmx:historyCacheMissLoad
Triggered on successful remote retrieval.

```javascript
document.body.addEventListener('htmx:historyCacheMissLoad', function(evt) {
    console.log('History content loaded from server');
});
```

### htmx:historyCacheMissLoadError
Triggered on unsuccessful remote retrieval.

```javascript
document.body.addEventListener('htmx:historyCacheMissLoadError', function(evt) {
    console.error('Failed to load history content');
});
```

### htmx:historyRestore
Triggered when htmx handles history restoration.

```javascript
document.body.addEventListener('htmx:historyRestore', function(evt) {
    console.log('History restored');
});
```

### htmx:beforeHistorySave
Triggered before content saved to history cache.

```javascript
document.body.addEventListener('htmx:beforeHistorySave', function(evt) {
    // Clean up DOM before snapshot
});
```

## Node Lifecycle Events

### htmx:beforeProcessNode
Triggered before htmx initializes a node.

```javascript
document.body.addEventListener('htmx:beforeProcessNode', function(evt) {
    // evt.detail.elt — element being initialized
});
```

### htmx:afterProcessNode
Triggered after htmx has initialized a node.

```javascript
document.body.addEventListener('htmx:afterProcessNode', function(evt) {
    // evt.detail.elt — initialized element
});
```

### htmx:beforeCleanupElement
Triggered before htmx disables or removes element.

```javascript
document.body.addEventListener('htmx:beforeCleanupElement', function(evt) {
    // evt.detail.elt — element being cleaned up
});
```

### htmx:load
Triggered when new content is added to the DOM.

```javascript
document.body.addEventListener('htmx:load', function(evt) {
    // evt.detail.elt — newly added element
    // Initialize third-party libraries here
});
```

## SSE & WebSocket Events

### htmx:noSSESourceError
Triggered when element refers to SSE event but no parent SSE source defined.

```javascript
document.body.addEventListener('htmx:noSSESourceError', function(evt) {
    console.error('No SSE source found');
});
```

### htmx:sseError
Triggered when error occurs with SSE source.

```javascript
document.body.addEventListener('htmx:sseError', function(evt) {
    console.error('SSE error');
});
```

### htmx:sseOpen
Triggered when SSE source is opened.

```javascript
document.body.addEventListener('htmx:sseOpen', function(evt) {
    console.log('SSE connection opened');
});
```

## XHR Progress Events

### htmx:xhr:loadstart
Triggered when AJAX request starts.

```javascript
document.body.addEventListener('htmx:xhr:loadstart', function(evt) {
    console.log('Request started');
});
```

### htmx:xhr:progress
Triggered periodically during request with progress events.

```javascript
document.body.addEventListener('htmx:xhr:progress', function(evt) {
    // evt.detail.loaded — bytes loaded
    // evt.detail.total — total bytes
    var percent = (evt.detail.loaded / evt.detail.total) * 100;
    console.log(`Upload progress: ${percent}%`);
});
```

### htmx:xhr:loadend
Triggered when AJAX request ends.

```javascript
document.body.addEventListener('htmx:xhr:loadend', function(evt) {
    console.log('Request ended');
});
```

### htmx:xhr:abort
Triggered when AJAX request aborts.

```javascript
document.body.addEventListener('htmx:xhr:abort', function(evt) {
    console.log('Request aborted');
});
```

## Confirmation Event

### htmx:confirm
Triggered after trigger occurs, allows canceling/delaying request.

```javascript
document.body.addEventListener('htmx:confirm', function(evt) {
    // evt.detail.issueRequest — function to issue request
    // evt.detail.triggeringEvent — original event
    
    // Example: Custom confirmation dialog
    if (evt.target.matches('[data-confirm]')) {
        evt.preventDefault();
        if (confirm('Are you sure?')) {
            evt.detail.issueRequest();
        }
    }
});
```

## Other Events

### htmx:pushedIntoHistory
Triggered after URL pushed into history.

```javascript
document.body.addEventListener('htmx:pushedIntoHistory', function(evt) {
    console.log('URL pushed:', evt.detail.path);
});
```

### htmx:replacedInHistory
Triggered after URL replaced in history.

```javascript
document.body.addEventListener('htmx:replacedInHistory', function(evt) {
    console.log('URL replaced:', evt.detail.path);
});
```

### htmx:targetError
Triggered when invalid target is specified.

```javascript
document.body.addEventListener('htmx:targetError', function(evt) {
    console.error('Invalid target:', evt.detail.target);
});
```

### htmx:onLoadError
Triggered when exception occurs during onLoad handling.

```javascript
document.body.addEventListener('htmx:onLoadError', function(evt) {
    console.error(' onLoad error:', evt.detail.error);
});
```

## JavaScript API

### Event Handling
```javascript
// Add event listener
var removeListener = htmx.on(element, 'click', function(evt) {
    console.log('Clicked');
});

// Remove event listener
removeListener();

// Trigger event
htmx.trigger(element, 'my-event', { detail: 'data' });
```

### DOM Manipulation
```javascript
// Find element
var el = htmx.find('#my-id');

// Find all elements
var els = htmx.findAll('.my-class');

// Find closest parent
var parent = htmx.closest(element, '.parent');

// Add class
htmx.addClass(element, 'active');

// Remove class
htmx.removeClass(element, 'active');

// Toggle class
htmx.toggleClass(element, 'active');

// Take class from others
htmx.takeClass(element, 'active');
```

### AJAX
```javascript
// Issue htmx-style AJAX request
htmx.ajax('GET', '/api/data', { target: '#results' });
```

### Configuration
```javascript
// Access config
console.log(htmx.config);

// Parse interval
var ms = htmx.parseInterval('1s');
```

### Processing
```javascript
// Process element for htmx
htmx.process(element);

// Swap content
htmx.swap(target, content, { swapStyle: 'innerHTML' });

// Get values
var values = htmx.values(element);
```
