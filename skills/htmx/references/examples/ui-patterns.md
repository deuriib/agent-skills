# htmx UI Patterns Examples

## Click to Edit

### Initial Display
```html
<div hx-target="this" hx-swap="outerHTML">
  <div><label>First Name</label>: Joe</div>
  <div><label>Last Name</label>: Blow</div>
  <div><label>Email</label>: joe@blow.com</div>
  <button hx-get="/contact/1/edit" class="btn primary">
    Click To Edit
  </button>
</div>
```

### Edit Form (Server Response)
```html
<form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
  <div>
    <label>First Name</label>
    <input type="text" name="firstName" value="Joe">
  </div>
  <div>
    <label>Last Name</label>
    <input type="text" name="lastName" value="Blow">
  </div>
  <div>
    <label>Email Address</label>
    <input type="email" name="email" value="joe@blow.com">
  </div>
  <button class="btn" type="submit">Submit</button>
  <button class="btn" hx-get="/contact/1">Cancel</button>
</form>
```

## Bulk Update

```html
<table>
  <thead>
    <tr>
      <th><input type="checkbox" id="select-all"></th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody id="contact-list">
    <tr>
      <td><input type="checkbox" name="ids" value="1"></td>
      <td>Joe</td>
      <td>joe@example.com</td>
    </tr>
  </tbody>
</table>

<button hx-post="/contacts/bulk-update"
        hx-include="closest table"
        hx-target="#contact-list">
  Update Selected
</button>
```

## Click to Load

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody id="contact-list">
    <tr>
      <td>Joe</td>
      <td>joe@example.com</td>
    </tr>
    <tr id="load-more-row">
      <td colspan="2">
        <button hx-get="/contacts?page=2"
                hx-target="#load-more-row"
                hx-swap="outerHTML">
          Load More...
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Delete Row

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th></th>
    </tr>
  </thead>
  <tbody hx-confirm="Are you sure?" hx-target="closest tr" hx-swap="outerHTML swap:1s">
    <tr>
      <td>Angie MacDowell</td>
      <td>angie@macdowell.org</td>
      <td>
        <button class="btn danger" hx-delete="/contact/1">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Edit Row

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th></th>
    </tr>
  </thead>
  <tbody id="contact-list">
    <tr>
      <td>Joe</td>
      <td>joe@example.com</td>
      <td>
        <button hx-get="/contact/1/edit" hx-target="closest tr" hx-swap="outerHTML">
          Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Lazy Loading

```html
<div hx-get="/content" hx-trigger="load" hx-swap="innerHTML">
  <img src="/spinner.gif" alt="Loading...">
</div>
```

## Inline Validation

```html
<form>
  <input name="email" type="email"
         hx-post="/validate-email"
         hx-trigger="change"
         hx-target="#email-error"
         hx-swap="outerHTML">
  <div id="email-error"></div>
  
  <input name="password" type="password"
         hx-post="/validate-password"
         hx-trigger="change"
         hx-target="#password-error"
         hx-swap="outerHTML">
  <div id="password-error"></div>
  
  <button type="submit">Register</button>
</form>
```

## Infinite Scroll

```html
<table>
  <tbody id="results">
    <tr><td>Item 1</td></tr>
    <tr><td>Item 2</td></tr>
    <tr><td>Item 3</td></tr>
    <!-- Last row triggers next page -->
    <tr hx-get="/items?page=2"
        hx-trigger="revealed"
        hx-swap="afterend">
      <td>Loading more...</td>
    </tr>
  </tbody>
</table>
```

## Active Search

```html
<h3>
  Search Contacts
  <span class="htmx-indicator">
    <img src="/img/bars.svg" alt=""> Searching...
  </span>
</h3>

<input class="form-control" type="search"
       name="search" placeholder="Begin Typing To Search Users..."
       hx-post="/search"
       hx-trigger="input changed delay:500ms, keyup[key=='Enter'], load"
       hx-target="#search-results"
       hx-indicator=".htmx-indicator">

<table class="table">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody id="search-results">
  </tbody>
</table>
```

## Progress Bar

### Initial State
```html
<div hx-target="this" hx-swap="outerHTML">
  <h3>Start Progress</h3>
  <button class="btn primary" hx-post="/start">
    Start Job
  </button>
</div>
```

### Progress State (Server Response)
```html
<div hx-trigger="done" hx-get="/job" hx-swap="outerHTML" hx-target="this">
  <h3 role="status" id="pblabel">Running</h3>
  
  <div hx-get="/job/progress"
       hx-trigger="every 600ms"
       hx-target="this"
       hx-swap="innerHTML">
    <div class="progress" role="progressbar">
      <div id="pb" class="progress-bar" style="width:0%"></div>
    </div>
  </div>
</div>
```

### Completion State
```html
<div hx-trigger="done" hx-get="/job" hx-swap="outerHTML" hx-target="this">
  <h3 role="status">Complete</h3>
  
  <div hx-get="/job/progress"
       hx-trigger="none"
       hx-target="this"
       hx-swap="innerHTML">
    <div class="progress" role="progressbar">
      <div id="pb" class="progress-bar" style="width:100%"></div>
    </div>
  </div>
  
  <button class="btn primary" hx-post="/start">Restart Job</button>
</div>
```

## Value Select (Dependent Dropdowns)

```html
<select name="country" 
        hx-get="/states" 
        hx-target="#states" 
        hx-trigger="change">
  <option value="">Select Country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>

<select id="states" name="state">
  <option value="">Select State/Province</option>
</select>
```

## File Upload with Progress

```html
<form id="upload-form" 
      hx-encoding="multipart/form-data" 
      hx-post="/upload">
  <input type="file" name="file">
  <button type="submit">Upload</button>
  <progress id="progress" value="0" max="100"></progress>
</form>

<script>
htmx.on('#upload-form', 'htmx:xhr:progress', function(evt) {
    document.getElementById('progress').setAttribute('value', 
        evt.detail.loaded/evt.detail.total * 100);
});
</script>
```

## Modal Dialog

### Trigger
```html
<button hx-get="/modal/content" hx-target="#modal" hx-swap="innerHTML">
  Open Modal
</button>

<div id="modal" class="modal" style="display:none">
  <!-- Modal content loaded here -->
</div>
```

### Modal Content (Server Response)
```html
<div class="modal-content">
  <h2>Modal Title</h2>
  <p>Modal content here</p>
  <button hx-get="/modal/close" hx-target="#modal" hx-swap="innerHTML">
    Close
  </button>
</div>
```

## Tabs (HATEOAS)

```html
<div class="tabs">
  <button hx-get="/tab/1" hx-target="#tab-content" 
          hx-trigger="click" class="active">Tab 1</button>
  <button hx-get="/tab/2" hx-target="#tab-content" 
          hx-trigger="click">Tab 2</button>
  <button hx-get="/tab/3" hx-target="#tab-content" 
          hx-trigger="click">Tab 3</button>
</div>

<div id="tab-content">
  <!-- Tab content loaded here -->
</div>
```

## Keyboard Shortcuts

```html
<div hx-get="/save" 
     hx-trigger="keydown[key=='s'&&ctrlKey] from:window"
     hx-swap="none">
  Press Ctrl+S to save
</div>

<div hx-get="/undo" 
     hx-trigger="keydown[key=='z'&&ctrlKey] from:window"
     hx-swap="none">
  Press Ctrl+Z to undo
</div>
```

## Drag and Drop

```html
<div hx-ext="class-tools">
  <div draggable="true" 
       hx-get="/drag/start" 
       hx-trigger="dragstart"
       classes="add dragging:0s">
    Drag me
  </div>
  
  <div hx-get="/drop" 
       hx-trigger="drop"
       hx-swap="innerHTML"
       classes="add drop-target:0s">
    Drop here
  </div>
</div>
```

## Confirm Dialog

### Basic Confirm
```html
<button hx-delete="/item" hx-confirm="Are you sure?">
  Delete
</button>
```

### Custom Confirm (with SweetAlert)
```html
<button hx-delete="/item" class="confirm-with-sweet-alert">
  Delete
</button>

<script>
document.body.addEventListener('htmx:confirm', function(evt) {
    if (evt.target.matches('.confirm-with-sweet-alert')) {
        evt.preventDefault();
        swal({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmed) => {
            if (confirmed) {
                evt.detail.issueRequest();
            }
        });
    }
});
</script>
```

## Reset User Input

```html
<form hx-post="/submit" hx-target="#result" hx-swap="innerHTML">
  <input name="name" type="text" id="name-input">
  <button type="submit">Submit</button>
</form>
<div id="result"></div>

<script>
document.body.addEventListener('htmx:afterOnLoad', function(evt) {
    if (evt.detail.pathInfo.requestPath === '/submit') {
        document.getElementById('name-input').value = '';
    }
});
</script>
```

## Updating Other Content

```html
<button hx-post="/action" 
        hx-target="#result"
        hx-select-oob="#counter, #last-updated">
  Action
</button>

<div id="result"></div>
<div id="counter">Count: 0</div>
<div id="last-updated">Last updated: Never</div>
```

**Server Response:**
```html
<div id="result">Action completed</div>
<div id="counter">Count: 1</div>
<div id="last-updated">Last updated: Just now</div>
```
