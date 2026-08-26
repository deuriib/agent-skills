# htmx Form Examples

## Basic Form Submission

### Simple Form
```html
<form hx-post="/submit" hx-target="#result">
  <input name="name" type="text" placeholder="Name" required>
  <input name="email" type="email" placeholder="Email" required>
  <button type="submit">Submit</button>
</form>
<div id="result"></div>
```

**Server Response:**
```html
<div class="success">Form submitted successfully!</div>
```

### Form with Validation
```html
<form hx-post="/validate" hx-target="#errors">
  <input name="email" type="email" required
         hx-post="/validate-email"
         hx-trigger="change"
         hx-target="#email-error">
  <div id="email-error"></div>
  
  <input name="password" type="password" required minlength="8">
  
  <button type="submit">Submit</button>
</form>
<div id="errors"></div>
```

**Server Response (validation):**
```html
<!-- Invalid -->
<div class="error">Email already exists</div>

<!-- Valid (empty response removes error) -->
```

## Form with Loading State

```html
<form hx-post="/submit" hx-indicator="#spinner">
  <input name="data" type="text">
  <button type="submit">
    Submit
    <img id="spinner" src="/spinner.gif" class="htmx-indicator">
  </button>
</form>
```

## Form with Confirmation

```html
<form hx-post="/delete" hx-confirm="Are you sure you want to delete?">
  <input name="id" type="hidden" value="123">
  <button type="submit">Delete</button>
</form>
```

## Form with Custom Headers

```html
<form hx-post="/submit" hx-headers='{"X-CSRF-Token": "abc123"}'>
  <input name="data" type="text">
  <button type="submit">Submit</button>
</form>
```

## Form with Extra Values

```html
<form hx-post="/submit" hx-vals='{"userId": 123, "action": "create"}'>
  <input name="name" type="text">
  <button type="submit">Submit</button>
</form>
```

## Dynamic Form Values

```html
<form hx-post="/submit" hx-vars="timestamp: Date.now()">
  <input name="name" type="text">
  <button type="submit">Submit</button>
</form>
```

## Multi-Step Form

### Step 1
```html
<div id="step1">
  <form hx-post="/step2" hx-target="#step1" hx-swap="outerHTML">
    <input name="name" type="text" placeholder="Name" required>
    <button type="submit">Next</button>
  </form>
</div>
```

### Step 2 (Server Response)
```html
<div id="step2">
  <form hx-post="/submit" hx-target="#step2" hx-swap="outerHTML">
    <input name="email" type="email" placeholder="Email" required>
    <input name="name" type="hidden" value="John">
    <button type="submit">Submit</button>
  </form>
</div>
```

## Form with File Upload

```html
<form hx-encoding="multipart/form-data" hx-post="/upload" hx-target="#result">
  <input type="file" name="file">
  <button type="submit">Upload</button>
  <progress id="progress" value="0" max="100"></progress>
</form>
<div id="result"></div>

<script>
htmx.on('form', 'htmx:xhr:progress', function(evt) {
    document.getElementById('progress').setAttribute('value', 
        evt.detail.loaded/evt.detail.total * 100);
});
</script>
```

## Form with Disabled Button

```html
<form hx-post="/submit" hx-disabled-elt="submit-btn">
  <input name="data" type="text">
  <button id="submit-btn" type="submit">
    Submit (disabled during request)
  </button>
</form>
```

## Form with Synchronization

```html
<form hx-post="/save">
  <input name="title" type="text"
         hx-post="/validate-title"
         hx-trigger="change"
         hx-sync="closest form:abort">
  
  <input name="email" type="email"
         hx-post="/validate-email"
         hx-trigger="change"
         hx-sync="closest form:abort">
  
  <button type="submit">Save</button>
</form>
```

## Form with Custom Response Handling

```html
<form hx-post="/submit" hx-target="#result">
  <input name="data" type="text">
  <button type="submit">Submit</button>
</form>
<div id="result"></div>

<script>
document.body.addEventListener('htmx:beforeSwap', function(evt) {
    if (evt.detail.xhr.status === 422) {
        // Show validation errors
        evt.detail.shouldSwap = true;
    } else if (evt.detail.xhr.status !== 200) {
        // Don't swap on other errors
        evt.detail.shouldSwap = false;
    }
});
</script>
```

## Form with Redirect

```html
<form hx-post="/login" hx-target="#result">
  <input name="email" type="email" required>
  <input name="password" type="password" required>
  <button type="submit">Login</button>
</form>
<div id="result"></div>
```

**Server Response:**
```javascript
// Node.js
app.post('/login', (req, res) => {
    if (authenticated) {
        res.set('HX-Redirect', '/dashboard');
        res.send('');
    } else {
        res.send('<div class="error">Invalid credentials</div>');
    }
});
```

## Form with Push URL

```html
<form hx-post="/search" hx-push-url="true" hx-target="#results">
  <input name="q" type="search" placeholder="Search...">
  <button type="submit">Search</button>
</form>
<div id="results"></div>
```

## Form with Select Dependent on Another

```html
<select name="country" hx-get="/states" hx-target="#states" hx-trigger="change">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>

<select id="states" name="state">
  <option>Select country first</option>
</select>
```

**Server Response:**
```html
<option value="ca">California</option>
<option value="ny">New York</option>
<option value="tx">Texas</option>
```

## Form with Reset After Submit

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

## Form with Error Handling

```html
<form hx-post="/submit" hx-target="#result">
  <input name="data" type="text">
  <button type="submit">Submit</button>
</form>
<div id="result"></div>

<script>
document.body.addEventListener('htmx:responseError', function(evt) {
    document.getElementById('result').innerHTML = 
        '<div class="error">An error occurred. Please try again.</div>';
});

document.body.addEventListener('htmx:sendError', function(evt) {
    document.getElementById('result').innerHTML = 
        '<div class="error">Network error. Please check your connection.</div>';
});
</script>
```
