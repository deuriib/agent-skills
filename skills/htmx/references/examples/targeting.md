# htmx Targeting & Swapping Examples

## Basic Targeting

### Target by ID
```html
<button hx-get="/data" hx-target="#results">
  Load Data
</button>
<div id="results"></div>
```

### Target Self
```html
<div hx-get="/update" hx-target="this" hx-swap="outerHTML">
  Click to update
</div>
```

### Target Parent
```html
<div id="container">
  <button hx-get="/data" hx-target="closest #container">
    Load into container
  </button>
</div>
```

### Target Next Sibling
```html
<button hx-get="/data" hx-target="next .content">
  Load
</button>
<div class="content"></div>
```

### Target Previous Sibling
```html
<div class="content"></div>
<button hx-get="/data" hx-target="previous .content">
  Load
</button>
```

### Target Child
```html
<div hx-get="/data" hx-target="find .result">
  <div class="result"></div>
</div>
```

## Swap Strategies

### innerHTML (Default)
```html
<button hx-get="/data" hx-swap="innerHTML">
  Replace content
</button>
```

### outerHTML
```html
<button hx-get="/data" hx-swap="outerHTML">
  Replace entire element
</button>
```

### beforebegin
```html
<div hx-get="/data" hx-swap="beforebegin">
  Insert before me
</div>
```

### afterbegin
```html
<div hx-get="/data" hx-swap="afterbegin">
  Insert at start
</div>
```

### beforeend
```html
<div hx-get="/data" hx-swap="beforeend">
  Insert at end
</div>
```

### afterend
```html
<div hx-get="/data" hx-swap="afterend">
  Insert after me
</div>
```

### delete
```html
<button hx-delete="/item" hx-swap="delete">
  Delete me
</button>
```

### none
```html
<button hx-post="/action" hx-swap="none">
  Action (no visual change)
</button>
```

## Swap Modifiers

### Transition (View Transitions API)
```html
<button hx-get="/data" hx-swap="innerHTML transition:true">
  Smooth transition
</button>
```

### Swap Delay
```html
<button hx-get="/data" hx-swap="innerHTML swap:100ms">
  Delayed swap
</button>
```

### Settle Delay
```html
<button hx-get="/data" hx-swap="innerHTML settle:100ms">
  Delayed settle
</button>
```

### Ignore Title
```html
<button hx-get="/data" hx-swap="innerHTML ignoreTitle:true">
  Don't update title
</button>
```

### Scroll to Top
```html
<div style="height:200px; overflow:scroll" 
     hx-get="/data" 
     hx-swap="beforeend scroll:top">
  Append and scroll to top
</div>
```

### Scroll to Bottom
```html
<div style="height:200px; overflow:scroll" 
     hx-get="/data" 
     hx-swap="beforeend scroll:bottom">
  Append and scroll to bottom
</div>
```

### Show in Viewport
```html
<button hx-get="/data" hx-swap="innerHTML show:top">
  Load and scroll to top
</button>
```

### Focus Scroll
```html
<input id="name" hx-get="/validate" 
       hx-swap="outerHTML focus-scroll:true">
```

## Out-of-Band (OOB) Swaps

### Basic OOB Swap
Server response:
```html
<div id="notification" hx-swap-oob="true">
  New message received!
</div>
<div id="main-content">
  Main content here
</div>
```

### OOB with Different Swap Strategy
Server response:
```html
<div id="sidebar" hx-swap-oob="beforeend">
  <div>New sidebar item</div>
</div>
<div id="main-content">
  Main content here
</div>
```

### Multiple OOB Swaps
Server response:
```html
<div id="header" hx-swap-oob="true">Updated header</div>
<div id="sidebar" hx-swap-oob="beforeend">New item</div>
<div id="footer" hx-swap-oob="true">Updated footer</div>
<div id="main-content">Main content</div>
```

### OOB with Templates (for Table Rows)
Server response:
```html
<template>
  <tr id="row-1" hx-swap-oob="true">
    <td>Updated data</td>
  </tr>
</template>
<div id="main-content">Main content</div>
```

## Select Content from Response

### Basic Select
```html
<button hx-get="/page" hx-select="#main-content">
  Load Content
</button>
```

### Select Multiple
```html
<button hx-get="/page" hx-select="#content, #sidebar">
  Load Multiple
</button>
```

### Select OOB
```html
<button hx-get="/page" hx-select-oob="#header, #footer">
  Update Header & Footer
</button>
```

## Preserve Content

### Preserve Element
```html
<div hx-preserve id="video-player">
  <video src="/video.mp4" controls></video>
</div>
```

### Preserve Multiple
```html
<div hx-preserve class="keep-me">
  <input type="text" value="preserve this">
</div>
```

## Extended CSS Selectors

### this
```html
<button hx-get="/update" hx-target="this" hx-swap="outerHTML">
  Update myself
</button>
```

### closest
```html
<button hx-get="/delete" hx-target="closest tr">
  Delete Row
</button>
```

### find
```html
<div hx-get="/data" hx-target="find .result">
  <div class="result"></div>
</div>
```

### next
```html
<button hx-get="/data" hx-target="next .content">
  Load
</button>
<div class="content"></div>
```

### previous
```html
<div class="content"></div>
<button hx-get="/data" hx-target="previous .content">
  Load
</button>
```

### Query Literal
```html
<button hx-get="/data" hx-target="< .parent />">
  Load into parent
</button>
```

## Advanced Patterns

### Click to Edit
```html
<div hx-target="this" hx-swap="outerHTML">
  <div>Name: Joe</div>
  <button hx-get="/contact/1/edit">Edit</button>
</div>
```

**Server Response:**
```html
<form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
  <input name="name" value="Joe">
  <button type="submit">Save</button>
  <button hx-get="/contact/1" hx-target="closest div">Cancel</button>
</form>
```

### Delete Row
```html
<table>
  <tbody hx-target="closest tr" hx-swap="outerHTML swap:1s">
    <tr>
      <td>Item 1</td>
      <td><button hx-delete="/item/1">Delete</button></td>
    </tr>
  </tbody>
</table>
```

### Update Multiple Elements
```html
<button hx-get="/update-all" 
        hx-target="#content" 
        hx-select-oob="#header, #sidebar">
  Update All
</button>
<div id="content"></div>
<div id="header"></div>
<div id="sidebar"></div>
```

### Morph Swap (with idiomorph)
```html
<button hx-get="/data" hx-swap="morph">
  Morph content
</button>
```

### View Transitions
```html
<button hx-get="/page" hx-swap="innerHTML transition:true">
  Page transition
</button>
```
