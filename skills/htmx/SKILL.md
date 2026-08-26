---
name: htmx
description: "Trigger: htmx, HTMX, hypermedia, hx-get, hx-post, hx-trigger, hx-target, hx-swap, AJAX, HTML-over-the-wire. Build modern web interfaces using HTML attributes instead of JavaScript frameworks. Covers htmx attributes, events, extensions, server-side integration patterns, and UI examples."
license: MIT
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: htmx

## Activation Contract

Use this skill when:
- Building dynamic web interfaces using htmx's HTML-first approach
- Implementing AJAX requests, form submissions, or real-time updates without writing JavaScript
- Integrating htmx with server-side frameworks (Node.js, Python, Java, Go, Ruby, PHP, Elixir, Rust, etc.)
- Creating UI patterns like click-to-edit, infinite scroll, live search, progress bars, or drag-and-drop
- Configuring htmx attributes, events, extensions, or server-side response headers
- Debugging htmx behavior, validating request/response flows, or optimizing swap strategies

## Overview

htmx is a library that allows you to access modern browser features directly from HTML, without using JavaScript. It extends the core idea of HTML as a hypertext — now any element can issue an HTTP request, any event can trigger requests, any HTTP verb can be used, and any element can be the target for updates.

**Core Philosophy**: Respond with *HTML*, not JSON. This keeps you within the original web programming model using [Hypertext As The Engine Of Application State](https://en.wikipedia.org/wiki/HATEOAS).

## Hard Rules

- **HTML Responses**: Server-side should return HTML fragments, not JSON. htmx swaps HTML directly into the DOM.
- **Progressive Enhancement**: Use `hx-boost` for graceful degradation when JavaScript is disabled.
- **No Framework Lock-in**: htmx works with any server-side language — no backend coupling required.
- **Declarative Configuration**: All behavior is defined via HTML attributes — avoid inline JavaScript unless absolutely necessary.
- **Request Headers**: Check for `HX-Request` header to distinguish htmx vs standard requests on the server.

## Decision Gates

| Task | Action |
|------|--------|
| New Project | Add htmx via CDN, npm, or download. No build system required. |
| AJAX Request | Use `hx-get`, `hx-post`, `hx-put`, `hx-patch`, or `hx-delete`. |
| Trigger Event | Configure `hx-trigger` (click, change, load, revealed, every Ns). |
| Target Element | Set `hx-target` to specify where response swaps in. |
| Swap Strategy | Configure `hx-swap` (innerHTML, outerHTML, beforeend, afterend, delete, none). |
| Form Handling | Use `hx-post`/`hx-put` with `hx-encoding="multipart/form-data"` for file uploads. |
| Real-time | Use SSE or WebSocket extensions (`hx-ext="sse"` or `hx-ext="ws"`). |
| History | Use `hx-push-url="true"` for browser history integration. |

## Core Attributes Reference

### HTTP Methods
| Attribute | Description |
|-----------|-------------|
| `hx-get` | Issues a GET request to the specified URL |
| `hx-post` | Issues a POST request to the specified URL |
| `hx-put` | Issues a PUT request to the specified URL |
| `hx-patch` | Issues a PATCH request to the specified URL |
| `hx-delete` | Issues a DELETE request to the specified URL |

### Request Configuration
| Attribute | Description |
|-----------|-------------|
| `hx-trigger` | Specifies the event that triggers the request |
| `hx-target` | Specifies the target element to be swapped |
| `hx-swap` | Controls how content will swap in (innerHTML, outerHTML, etc.) |
| `hx-swap-oob` | Marks element to swap in from a response (out of band) |
| `hx-select` | Selects content to swap in from a response |
| `hx-select-oob` | Selects content for out-of-band swap |
| `hx-vals` | Adds values to submit with the request (JSON format) |
| `hx-params` | Filters parameters submitted with a request |
| `hx-include` | Includes additional data in requests |
| `hx-headers` | Adds custom headers to the request |
| `hx-encoding` | Changes the request encoding type |
| `hx-confirm` | Shows a confirm() dialog before issuing a request |
| `hx-prompt` | Shows a prompt() before submitting a request |
| `hx-indicator` | Specifies the element to put htmx-request class on |
| `hx-disabled-elt` | Adds disabled attribute to specified elements during request |
| `hx-sync` | Controls how requests by different elements are synchronized |

### UI & History
| Attribute | Description |
|-----------|-------------|
| `hx-boost` | Adds progressive enhancement for links and forms |
| `hx-push-url` | Pushes URL into browser location bar to create history |
| `hx-replace-url` | Replaces URL in the browser location bar |
| `hx-history` | Prevents sensitive data from being saved to history cache |
| `hx-history-elt` | Specifies element to snapshot/restore during history navigation |

### Preservation & Inheritance
| Attribute | Description |
|-----------|-------------|
| `hx-preserve` | Specifies elements to keep unchanged between requests |
| `hx-inherit` | Controls automatic attribute inheritance for child nodes |
| `hx-disinherit` | Disables automatic attribute inheritance for child nodes |
| `hx-disable` | Disables htmx processing for the node and children |

### Extensions & Validation
| Attribute | Description |
|-----------|-------------|
| `hx-ext` | Specifies extensions to use for this element |
| `hx-validate` | Forces elements to validate themselves before a request |
| `hx-request` | Configures various aspects of the request |

## Trigger Events

### Standard Events
- `click` (default for most elements)
- `change` (default for input, textarea, select)
- `submit` (default for form)
- `keyup`, `keydown`, `mousedown`, `mouseenter`, etc.

### Special Events
- `load` — fires once when element is first loaded
- `revealed` — fires once when element first scrolls into viewport
- `intersect` — fires when element intersects viewport (supports `root:` and `threshold:` options)
- `every <N>s` — polling syntax

### Trigger Modifiers
- `once` — only trigger once
- `changed` — only if value has changed
- `delay:<time>` — delay before triggering (resets on new event)
- `throttle:<time>` — throttle triggering
- `from:<selector>` — listen for event on different element
- `target:<selector>` — filter via CSS selector on event target
- `consume` — prevent event from triggering other htmx requests
- `queue:<option>` — first, last (default), all, none

## Swap Strategies

| Value | Description |
|-------|-------------|
| `innerHTML` | Default — puts content inside target element |
| `outerHTML` | Replaces entire target element with response |
| `beforebegin` | Inserts response before target element |
| `afterbegin` | Inserts response before first child of target |
| `beforeend` | Inserts response after last child of target |
| `afterend` | Inserts response after target element |
| `delete` | Deletes the target element regardless of response |
| `none` | Does not append content (OOB still processed) |

### Swap Modifiers
- `transition:true` — use View Transitions API
- `swap:<time>` — delay before swap (e.g., `100ms`)
- `settle:<time>` — delay before settle (e.g., `100ms`)
- `ignoreTitle:true` — don't update document title
- `scroll:top|bottom` — scroll target to top/bottom
- `show:top|bottom` — scroll target into view
- `focus-scroll:true` — scroll focused element into view

## CSS Classes

| Class | Description |
|-------|-------------|
| `htmx-added` | Applied to new content before swap, removed after settle |
| `htmx-indicator` | Toggles visible (opacity:1) when htmx-request present |
| `htmx-request` | Applied during ongoing request |
| `htmx-settling` | Applied after swap, removed after settle |
| `htmx-swapping` | Applied before swap, removed after swap |

## Request Headers

| Header | Description |
|--------|-------------|
| `HX-Boosted` | Request is via hx-boost |
| `HX-Current-URL` | Current browser URL |
| `HX-History-Restore-Request` | "true" if history restoration |
| `HX-Prompt` | User response to hx-prompt |
| `HX-Request` | Always "true" |
| `HX-Target` | ID of target element |
| `HX-Trigger-Name` | Name of triggered element |
| `HX-Trigger` | ID of triggered element |

## Response Headers

| Header | Description |
|--------|-------------|
| `HX-Location` | Client-side redirect without full page reload |
| `HX-Push-Url` | Pushes new URL into history stack |
| `HX-Redirect` | Client-side redirect to new location |
| `HX-Refresh` | "true" for full page refresh |
| `HX-Replace-Url` | Replaces current URL in location bar |
| `HX-Reswap` | Specifies how response will be swapped |
| `HX-Retarget` | CSS selector for alternative target |
| `HX-Reselect` | CSS selector to choose response content |
| `HX-Trigger` | Triggers client-side events |
| `HX-Trigger-After-Settle` | Triggers events after settle step |
| `HX-Trigger-After-Swap` | Triggers events after swap step |

## Events Reference

### Request Lifecycle
| Event | Description |
|-------|-------------|
| `htmx:configRequest` | Before request — customize parameters, headers |
| `htmx:beforeRequest` | Before AJAX request is made |
| `htmx:beforeSend` | Just before AJAX request is sent |
| `htmx:afterOnLoad` | After successful response processing |
| `htmx:afterRequest` | After AJAX request completed |
| `htmx:afterSettle` | After DOM has settled |
| `htmx:afterSwap` | After new content swapped in |

### Swap & Transform
| Event | Description |
|-------|-------------|
| `htmx:beforeSwap` | Before swap — allows swap configuration |
| `htmx:beforeTransition` | Before View Transition swap |
| `htmx:oobBeforeSwap` | Before out-of-band swap |
| `htmx:oobAfterSwap` | After out-of-band swap |

### Errors & Abort
| Event | Description |
|-------|-------------|
| `htmx:responseError` | HTTP response error (non-2xx/3xx) |
| `htmx:sendError` | Network error prevents request |
| `htmx:swapError` | Error during swap phase |
| `htmx:timeout` | Request timeout |
| `htmx:sendAbort` | Request aborted |
| `htmx:abort` | Send to element to abort request |

### Validation
| Event | Description |
|-------|-------------|
| `htmx:validation:validate` | Before validation check |
| `htmx:validation:failed` | When validation fails |
| `htmx:validation:halted` | Request halted due to validation |

### History
| Event | Description |
|-------|-------------|
| `htmx:historyCacheHit` | Cache hit in history |
| `htmx:historyCacheMiss` | Cache miss in history |
| `htmx:historyRestore` | History restoration handled |
| `htmx:beforeHistorySave` | Before content saved to cache |

## JavaScript API

| Method | Description |
|--------|-------------|
| `htmx.ajax()` | Issues htmx-style AJAX request |
| `htmx.trigger()` | Triggers event on element |
| `htmx.find()` | Finds single element matching selector |
| `htmx.findAll()` | Finds all elements matching selector |
| `htmx.closest()` | Finds closest parent matching selector |
| `htmx.addClass()` | Adds class to element |
| `htmx.removeClass()` | Removes class from element |
| `htmx.toggleClass()` | Toggles class on element |
| `htmx.takeClass()` | Takes class from other elements |
| `htmx.process()` | Processes element for htmx behavior |
| `htmx.swap()` | Performs HTML content swap |
| `htmx.remove()` | Removes element from DOM |
| `htmx.on()` | Creates event listener |
| `htmx.off()` | Removes event listener |
| `htmx.values()` | Returns input values for element |
| `htmx.parseInterval()` | Parses interval to milliseconds |
| `htmx.logAll()` | Installs logger for all htmx events |

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `historyEnabled` | `true` | Enable history management |
| `historyCacheSize` | `10` | History cache size |
| `refreshOnHistoryMiss` | `false` | Full page refresh on history miss |
| `defaultSwapStyle` | `innerHTML` | Default swap mechanism |
| `defaultSwapDelay` | `0` | Default swap delay (ms) |
| `defaultSettleDelay` | `20` | Default settle delay (ms) |
| `includeIndicatorStyles` | `true` | Load indicator CSS |
| `indicatorClass` | `htmx-indicator` | Indicator CSS class |
| `requestClass` | `htmx-request` | Request CSS class |
| `addedClass` | `htmx-added` | Added content CSS class |
| `settlingClass` | `htmx-settling` | Settling CSS class |
| `swappingClass` | `htmx-swapping` | Swapping CSS class |
| `allowEval` | `true` | Allow eval for trigger filters |
| `allowScriptTags` | `true` | Process script tags in new content |
| `disableSelector` | `[hx-disable]` | Disable htmx on elements |
| `disableInheritance` | `false` | Disable attribute inheritance |
| `withCredentials` | `false` | Cross-site requests with credentials |
| `timeout` | `0` | Request timeout (ms) |
| `scrollBehavior` | `instant` | Scroll behavior (instant, smooth, auto) |
| `defaultFocusScroll` | `false` | Auto-scroll to focused elements |
| `getCacheBusterParam` | `false` | Append cache buster to GET requests |
| `globalViewTransitions` | `false` | Use View Transitions API |
| `methodsThatUseUrlParams` | `["get","delete"]` | Methods encoding params in URL |
| `selfRequestsOnly` | `true` | Only allow same-domain requests |
| `ignoreTitle` | `false` | Ignore title tags in response |
| `reportValidityOfForms` | `false` | Report validation errors to user |

## Installation

### Via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js"></script>
```

### Via npm
```bash
npm install htmx.org@2.0.10
```

### Download
Download `htmx.min.js` from jsDelivr and include via script tag.

## Execution Steps

1. **Verify Prerequisites**: htmx is dependency-free — just add the script tag or npm package.
2. **Initial Setup**: Include htmx in HTML head. No build system required.
3. **Add Attributes**: Use `hx-get`, `hx-post`, etc. on HTML elements.
4. **Configure Triggers**: Set `hx-trigger` for custom event handling.
5. **Configure Targets**: Set `hx-target` to specify where responses swap in.
6. **Configure Swap**: Set `hx-swap` for custom swap behavior.
7. **Server Integration**: Return HTML fragments from server endpoints.
8. **Test & Debug**: Use browser DevTools to inspect requests/responses.

## Output Contract

- htmx-enabled HTML with proper attributes
- Server-side endpoints returning HTML fragments
- Proper request/response headers
- Event handlers for custom behavior
- Extension integration (SSE, WebSocket, etc.)

## References

- `references/getting-started.md` — Installation, setup, and quick start guide
- `references/attributes.md` — Complete attributes reference
- `references/events.md` — Events and JavaScript API
- `references/extensions.md` — Core and community extensions
- `references/configuration.md` — Configuration options
- `references/server-integration.md` — Backend integration patterns
- `references/examples/forms.md` — Form handling examples
- `references/examples/triggers.md` — Trigger and event examples
- `references/examples/targeting.md` — Target and swap examples
- `references/examples/ui-patterns.md` — Common UI patterns
- `references/examples/real-time.md` — SSE and WebSocket examples
