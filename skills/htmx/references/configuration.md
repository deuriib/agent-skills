# htmx Configuration Reference

## Configuration Options

### History Settings

| Option | Default | Description |
|--------|---------|-------------|
| `historyEnabled` | `true` | Enable history management (useful for testing) |
| `historyCacheSize` | `10` | Number of entries in history cache |
| `refreshOnHistoryMiss` | `false` | Full page refresh on history misses instead of AJAX |

### Swap Settings

| Option | Default | Description |
|--------|---------|-------------|
| `defaultSwapStyle` | `innerHTML` | Default swap mechanism |
| `defaultSwapDelay` | `0` | Default delay before swap (ms) |
| `defaultSettleDelay` | `20` | Default delay before settle (ms) |

### CSS Class Settings

| Option | Default | Description |
|--------|---------|-------------|
| `includeIndicatorStyles` | `true` | Load default indicator CSS |
| `indicatorClass` | `htmx-indicator` | Class for loading indicators |
| `requestClass` | `htmx-request` | Class applied during requests |
| `addedClass` | `htmx-added` | Class for new content before swap |
| `settlingClass` | `htmx-settling` | Class during settle phase |
| `swappingClass` | `htmx-swapping` | Class during swap phase |

### Behavior Settings

| Option | Default | Description |
|--------|---------|-------------|
| `allowEval` | `true` | Allow eval for trigger filters |
| `allowScriptTags` | `true` | Process script tags in new content |
| `disableSelector` | `[hx-disable]` | Disable htmx on matching elements |
| `disableInheritance` | `false` | Disable attribute inheritance |
| `selfRequestsOnly` | `true` | Only allow same-domain requests |

### Network Settings

| Option | Default | Description |
|--------|---------|-------------|
| `withCredentials` | `false` | Cross-site requests with credentials |
| `timeout` | `0` | Request timeout (ms), 0 = no timeout |

### Scroll Settings

| Option | Default | Description |
|--------|---------|-------------|
| `scrollBehavior` | `instant` | Scroll behavior (instant, smooth, auto) |
| `defaultFocusScroll` | `false` | Auto-scroll to focused elements |
| `scrollIntoViewOnBoost` | `true` | Scroll boosted targets into view |

### Cache Settings

| Option | Default | Description |
|--------|---------|-------------|
| `getCacheBusterParam` | `false` | Append cache buster to GET requests |

### View Transitions

| Option | Default | Description |
|--------|---------|-------------|
| `globalViewTransitions` | `false` | Use View Transitions API globally |

### URL Settings

| Option | Default | Description |
|--------|---------|-------------|
| `methodsThatUseUrlParams` | `["get","delete"]` | Methods encoding params in URL |
| `ignoreTitle` | `false` | Ignore title tags in response |

### Other Settings

| Option | Default | Description |
|--------|---------|-------------|
| `attributesToSettle` | `["class","style","width","height"]` | Attributes to settle |
| `wsReconnectDelay` | `full-jitter` | WebSocket reconnect delay |
| `wsBinaryType` | `blob` | WebSocket binary type |
| `inlineScriptNonce` | `''` | Nonce for inline scripts |
| `inlineStyleNonce` | `''` | Nonce for inline styles |
| `triggerSpecsCache` | `null` | Cache for trigger specifications |
| `reportValidityOfForms` | `false` | Report validation errors to user |
| `allowNestedOobSwaps` | `true` | Process nested OOB swaps |
| `historyRestoreAsHxRequest` | `true` | Treat history restore as HX-Request |

## Setting Configuration

### Via JavaScript
```javascript
htmx.config.defaultSwapStyle = 'outerHTML';
htmx.config.timeout = 5000;
htmx.config.scrollBehavior = 'smooth';
```

### Via Meta Tag
```html
<meta name="htmx-config" content='{
    "defaultSwapStyle": "outerHTML",
    "timeout": 5000,
    "scrollBehavior": "smooth"
}'>
```

## Response Handling Configuration

The `responseHandling` array controls how different HTTP status codes are processed.

### Default Configuration
```javascript
responseHandling: [
    {code:"204", swap: false},           // 204 No Content
    {code:"[23]..", swap: true},         // 2xx, 3xx success
    {code:"[45]..", swap: false, error:true}, // 4xx, 5xx errors
    {code:"...", swap: false}            // catch-all
]
```

### Custom Response Handling
```javascript
htmx.config.responseHandling = [
    {code:"204", swap: false},
    {code:"[23]..", swap: true},
    {code:"422", swap: true},            // Swap validation errors
    {code:"[45]..", swap: false, error:true},
    {code:"...", swap: false}
];
```

### Via Meta Tag
```html
<meta name="htmx-config" content='{
    "responseHandling": [
        {"code":"204", "swap": false},
        {"code":"[23]..", "swap": true},
        {"code":"422", "swap": true},
        {"code":"[45]..", "swap": false, "error":true},
        {"code":"...", "swap": false}
    ]
}'>
```

### Response Handling Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | String | Regex to match response code |
| `swap` | Boolean | Whether to swap response |
| `error` | Boolean | Whether to treat as error |
| `ignoreTitle` | Boolean | Ignore title tags |
| `select` | String | CSS selector for response content |
| `target` | String | Alternative target CSS selector |
| `swapOverride` | String | Alternative swap mechanism |

## Security Configuration

### Content Security Policy (CSP)

```html
<!-- Nonce for inline scripts -->
<meta name="htmx-config" content='{"inlineScriptNonce": "abc123"}'>

<!-- Nonce for inline styles -->
<meta name="htmx-config" content='{"inlineStyleNonce": "abc123"}'>
```

### Self-Requests Only
```javascript
// Only allow requests to same domain (default: true)
htmx.config.selfRequestsOnly = true;
```

### Disable Eval
```javascript
// Disable eval for trigger filters (more secure)
htmx.config.allowEval = false;
```

### Disable Script Tags
```javascript
// Don't process script tags in new content
htmx.config.allowScriptTags = false;
```

## WebSocket Configuration

```javascript
// Reconnect delay strategy
htmx.config.wsReconnectDelay = 'full-jitter';

// Binary type
htmx.config.wsBinaryType = 'blob';
```

## View Transitions API

```javascript
// Enable globally
htmx.config.globalViewTransitions = true;

// Or per-element
// hx-swap="innerHTML transition:true"
```

## Debugging Configuration

```javascript
// Log all events
htmx.logAll();

// Custom logger
htmx.logger = function(elt, event, data) {
    console.log(event, elt, data);
};
```

## Example Configurations

### Production Optimized
```javascript
htmx.config = {
    historyEnabled: true,
    historyCacheSize: 20,
    defaultSwapStyle: 'innerHTML',
    defaultSwapDelay: 0,
    defaultSettleDelay: 20,
    allowEval: false,           // Security
    allowScriptTags: false,     // Security
    selfRequestsOnly: true,     // Security
    timeout: 30000,             // 30 second timeout
    scrollBehavior: 'smooth',
    ignoreTitle: false
};
```

### Development Debug
```javascript
htmx.config = {
    historyEnabled: true,
    allowEval: true,
    allowScriptTags: true,
    reportValidityOfForms: true
};

htmx.logAll();
```

### Single Page App
```javascript
htmx.config = {
    historyEnabled: true,
    historyCacheSize: 50,
    defaultSwapStyle: 'innerHTML',
    globalViewTransitions: true,
    scrollBehavior: 'smooth',
    defaultFocusScroll: true
};
```
