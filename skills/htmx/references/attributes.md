# htmx Attributes Reference

## Core HTTP Attributes

### hx-get
Issues a GET request to the specified URL.

```html
<button hx-get="/api/data">Load Data</button>
```

**Notes:**
- Not inherited
- By default does not include parameters (use `hx-params` to change)
- Empty `hx-get=""` makes GET to current URL

### hx-post
Issues a POST request to the specified URL.

```html
<button hx-post="/api/users" hx-target="#user-list">
  Create User
</button>
```

### hx-put
Issues a PUT request to the specified URL.

```html
<form hx-put="/api/users/1">
  <input name="name" value="John">
  <button type="submit">Update</button>
</form>
```

### hx-patch
Issues a PATCH request to the specified URL.

```html
<button hx-patch="/api/users/1" hx-vals='{"status": "active"}'>
  Activate
</button>
```

### hx-delete
Issues a DELETE request to the specified URL.

```html
<button hx-delete="/api/users/1" hx-confirm="Are you sure?">
  Delete
</button>
```

## Request Configuration Attributes

### hx-trigger
Specifies the event that triggers the request.

**Standard Events:**
```html
<div hx-get="/mouse_entered" hx-trigger="mouseenter">
  Hover over me
</div>

<input hx-get="/search" hx-trigger="keyup changed delay:500ms">
```

**Special Events:**
```html
<!-- Load on page load -->
<div hx-get="/data" hx-trigger="load">Loading...</div>

<!-- Load when scrolled into view -->
<tr hx-get="/next-page" hx-trigger="revealed">
  <td>Load more</td>
</tr>

<!-- Polling every 2 seconds -->
<div hx-get="/updates" hx-trigger="every 2s">Updates</div>
```

**Trigger Modifiers:**
- `once` — trigger only once
- `changed` — only if value changed
- `delay:<time>` — delay before trigger
- `throttle:<time>` — throttle trigger
- `from:<selector>` — listen on different element
- `consume` — prevent parent triggers
- `queue:<option>` — first, last, all, none

**Multiple Triggers:**
```html
<input hx-get="/search" 
       hx-trigger="input changed delay:500ms, keyup[key=='Enter']">
```

### hx-target
Specifies the target element to be swapped.

```html
<button hx-post="/api/data" hx-target="#results">
  Load
</button>
```

**Extended CSS Selectors:**
- `this` — the element itself
- `closest <selector>` — closest ancestor matching selector
- `find <selector>` — first child descendant matching selector
- `next` — next sibling element
- `next <selector>` — next sibling matching selector
- `previous` — previous sibling element
- `previous <selector>` — previous sibling matching selector

```html
<button hx-delete="/item" hx-target="closest tr">
  Delete Row
</button>

<input hx-get="/validate" hx-target="next .error-message">
```

### hx-swap
Controls how response content is swapped into the DOM.

**Swap Values:**
- `innerHTML` (default) — replace inner HTML
- `outerHTML` — replace entire element
- `beforebegin` — insert before target
- `afterbegin` — insert before first child
- `beforeend` — insert after last child
- `afterend` — insert after target
- `delete` — delete target element
- `none` — don't swap (OOB still processed)

```html
<div hx-get="/content" hx-swap="afterend">
  Append after me
</div>
```

**Swap Modifiers:**
- `transition:true` — use View Transitions API
- `swap:<time>` — delay before swap
- `settle:<time>` — delay before settle
- `ignoreTitle:true` — don't update page title
- `scroll:top|bottom` — scroll target
- `show:top|bottom` — scroll into view
- `focus-scroll:true` — scroll focused element

```html
<div hx-get="/data" hx-swap="innerHTML swap:100ms settle:50ms">
  Smooth transition
</div>

<div hx-get="/data" hx-swap="beforeend scroll:bottom">
  Append and scroll
</div>
```

### hx-select
Selects content to swap from response.

```html
<button hx-get="/page" hx-select="#main-content">
  Load Content
</button>
```

### hx-select-oob
Selects content for out-of-band swap.

```html
<button hx-get="/page" hx-select-oob="#sidebar,#nav">
  Update Multiple
</button>
```

### hx-swap-oob
Marks element to swap directly by ID (used in server response).

Server response:
```html
<div id="notification" hx-swap-oob="true">
  New message received!
</div>
<div id="main-content">
  Main page content
</div>
```

### hx-vals
Adds values to request (JSON format).

```html
<button hx-post="/api/data" hx-vals='{"userId": 123, "action": "activate"}'>
  Submit
</button>
```

### hx-params
Filters parameters submitted with request.

```html
<!-- Only include 'name' parameter -->
<input name="email" hx-post="/submit" hx-params="name">

<!-- Exclude 'email' parameter -->
<input name="name" hx-post="/submit" hx-params="not email">
```

### hx-include
Includes additional data in requests.

```html
<form hx-post="/submit">
  <input name="name">
  <div hx-include="#other-form">
    <input id="other-form" name="extra">
  </div>
  <button type="submit">Submit</button>
</form>
```

### hx-headers
Adds custom headers to request.

```html
<button hx-get="/api" hx-headers='{"X-Custom": "value"}'>
  Request
</button>
```

### hx-encoding
Changes request encoding type.

```html
<form hx-post="/upload" hx-encoding="multipart/form-data">
  <input type="file" name="file">
  <button type="submit">Upload</button>
</form>
```

### hx-confirm
Shows confirm dialog before request.

```html
<button hx-delete="/item" hx-confirm="Are you sure?">
  Delete
</button>
```

### hx-prompt
Shows prompt dialog before request.

```html
<button hx-post="/rename" hx-prompt="Enter new name:">
  Rename
</button>
```

### hx-indicator
Specifies element to show during request.

```html
<button hx-get="/data" hx-indicator="#spinner">
  Load
  <img id="spinner" src="/spinner.gif" class="htmx-indicator">
</button>
```

### hx-disabled-elt
Disables elements during request.

```html
<button hx-post="/submit" hx-disabled-elt="this">
  Submit (disabled during request)
</button>
```

### hx-sync
Synchronizes requests between elements.

```html
<form hx-post="/save">
  <input hx-post="/validate" hx-sync="closest form:abort">
  <button type="submit">Save</button>
</form>
```

**Sync Options:**
- `closest <selector>:abort` — abort if parent has request
- `closest <selector>:drop` — drop new request
- `closest <selector>:queue:first` — queue first
- `closest <selector>:queue:last` — queue last (default)
- `closest <selector>:queue:all` — queue all
- `closest <selector>:queue:none` — no queuing

## UI & History Attributes

### hx-boost
Adds progressive enhancement for links and forms.

```html
<div hx-boost="true">
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</div>
```

### hx-push-url
Pushes URL into browser history.

```html
<a hx-get="/page/2" hx-push-url="true">Page 2</a>
```

### hx-replace-url
Replaces current URL in location bar.

```html
<a hx-get="/filter" hx-replace-url="true">Filter</a>
```

### hx-history
Prevents data from being saved to history cache.

```html
<div hx-history="false">
  Sensitive content
</div>
```

### hx-history-elt
Specifies element to snapshot for history.

```html
<div hx-history-elt id="main-content">
  Content to snapshot
</div>
```

## Preservation & Inheritance Attributes

### hx-preserve
Keeps elements unchanged between requests.

```html
<div hx-preserve id="video-player">
  <video src="/video.mp4" controls></video>
</div>
```

### hx-inherit
Enables attribute inheritance for child nodes.

```html
<div hx-inherit="hx-target hx-swap">
  <button hx-get="/data">Inherits parent config</button>
</div>
```

### hx-disinherit
Disables attribute inheritance.

```html
<div hx-confirm="Are you sure?">
  <button hx-delete="/item">Delete (confirmed)</button>
  <button hx-confirm="unset" hx-get="/">Cancel (not confirmed)</button>
</div>
```

### hx-disable
Disables htmx processing.

```html
<div hx-disable>
  <button>This button is not processed by htmx</button>
</div>
```

## Extension & Validation Attributes

### hx-ext
Specifies extensions to use.

```html
<div hx-ext="sse" sse-connect="/events">
  <div hx-trigger="sse:message" hx-get="/update">
    Real-time content
  </div>
</div>
```

### hx-validate
Forces validation before request.

```html
<input type="email" name="email" hx-validate="true" hx-post="/validate">
```

### hx-request
Configures request aspects.

```html
<button hx-get="/api" hx-request='{"timeout": 5000}'>
  Request with timeout
</button>
```
