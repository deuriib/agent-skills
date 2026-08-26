# htmx Real-Time Examples

## Server-Sent Events (SSE)

### Basic SSE Setup
```html
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

### SSE with Multiple Events
```html
<div hx-ext="sse" sse-connect="/events">
  <div sse-swap="user-joined" hx-swap="beforeend">
    <!-- User joined events -->
  </div>
  
  <div sse-swap="user-left" hx-swap="beforeend">
    <!-- User left events -->
  </div>
</div>
```

### SSE with htmx Triggers
```html
<div hx-ext="sse" sse-connect="/events">
  <div hx-trigger="sse:message" hx-get="/update">
    Waiting for updates...
  </div>
</div>
```

### SSE Chat Application
```html
<div id="chat" hx-ext="sse" sse-connect="/chat">
  <div sse-swap="message" hx-swap="beforeend" class="message">
    <!-- Messages appear here -->
  </div>
</div>

<form hx-post="/chat/send" hx-target="#chat" hx-swap="beforeend">
  <input name="message" type="text" placeholder="Type message...">
  <button type="submit">Send</button>
</form>
```

**Node.js SSE Server:**
```javascript
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const sendEvent = (event, data) => {
        res.write(`event: ${event}\ndata: ${data}\n\n`);
    };
    
    // Send initial connection
    sendEvent('message', '<div>Connected to chat</div>');
    
    // Send periodic updates
    const interval = setInterval(() => {
        sendEvent('message', '<div>Server time: ' + new Date().toISOString() + '</div>');
    }, 5000);
    
    req.on('close', () => {
        clearInterval(interval);
    });
});
```

## WebSocket

### Basic WebSocket Setup
```html
<div hx-ext="ws" ws-connect="/ws">
  <div ws-swap="innerHTML">
    Waiting for messages...
  </div>
</div>
```

### WebSocket with Send
```html
<div hx-ext="ws" ws-connect="/ws">
  <div ws-swap="innerHTML" id="messages">
    Waiting for messages...
  </div>
  
  <input id="msg" type="text" placeholder="Type message">
  <button ws-send="#msg">Send</button>
</div>
```

### WebSocket Chat Application
```html
<div hx-ext="ws" ws-connect="/chat">
  <div id="chat" ws-swap="innerHTML">
    <!-- Messages appear here -->
  </div>
  
  <form ws-send="#message">
    <input id="message" name="message" type="text" placeholder="Type message...">
    <button type="submit">Send</button>
  </form>
</div>
```

**Node.js WebSocket Server:**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('<div class="message">' + message + '</div>');
            }
        });
    });
    
    ws.send('<div>Welcome to chat!</div>');
});
```

### WebSocket with htmx Triggers
```html
<div hx-ext="ws" ws-connect="/ws">
  <div hx-trigger="ws:message" hx-get="/update">
    Waiting for updates...
  </div>
</div>
```

## Polling

### Basic Polling
```html
<div hx-get="/updates" hx-trigger="every 5s">
  Waiting for updates...
</div>
```

### Polling with Stop Condition
```html
<div hx-get="/status" hx-trigger="every 2s" hx-swap="outerHTML">
  Checking status...
</div>
```

**Server Response (to stop polling):**
```javascript
// Return status code 286 to stop polling
res.status(286).send('');
```

### Polling with Different Intervals
```html
<div hx-get="/fast-updates" hx-trigger="every 1s">
  Fast updates
</div>

<div hx-get="/slow-updates" hx-trigger="every 30s">
  Slow updates
</div>
```

## Real-Time Dashboard

```html
<div hx-ext="sse" sse-connect="/dashboard">
  <!-- Live metrics -->
  <div sse-swap="metrics" hx-swap="innerHTML" id="metrics">
    Loading metrics...
  </div>
  
  <!-- Recent activity -->
  <div sse-swap="activity" hx-swap="beforeend" id="activity">
    <!-- Activity items appear here -->
  </div>
  
  <!-- Notifications -->
  <div sse-swap="notification" hx-swap="beforeend" id="notifications">
    <!-- Notifications appear here -->
  </div>
</div>
```

**Server Response (SSE format):**
```
event: metrics
data: <div class="metric">Users: 1,234</div>

event: activity
data: <div class="activity">User John joined</div>

event: notification
data: <div class="notification">New order received</div>

```

## Live Notifications

```html
<div hx-ext="sse" sse-connect="/notifications">
  <div sse-swap="notification" hx-swap="beforeend" id="notifications">
    <!-- Notifications appear here -->
  </div>
</div>

<div id="notification-count">0</div>
```

**Server Response (SSE format):**
```
event: notification
data: <div class="alert">New message from John</div>

```

## Real-Time Form Validation

```html
<form>
  <input name="email" type="email"
         hx-post="/validate-email"
         hx-trigger="input changed delay:300ms"
         hx-target="#email-error">
  <div id="email-error"></div>
  
  <input name="username" type="text"
         hx-post="/validate-username"
         hx-trigger="input changed delay:300ms"
         hx-target="#username-error">
  <div id="username-error"></div>
</form>
```

## Live Search with SSE

```html
<div hx-ext="sse" sse-connect="/search-events">
  <input type="text" name="q" 
         hx-post="/search"
         hx-trigger="input changed delay:500ms"
         hx-target="#results">
  
  <div sse-swap="search-update" hx-swap="innerHTML" id="results">
    <!-- Search results appear here -->
  </div>
</div>
```

## Live Ticker (Stock Prices, etc.)

```html
<div hx-ext="sse" sse-connect="/ticker">
  <div sse-swap="price" hx-swap="innerHTML" id="price">
    Loading price...
  </div>
</div>
```

**Server Response (SSE format):**
```
event: price
data: <div class="price">$123.45</div>

```

## Real-Time Notifications with Sound

```html
<div hx-ext="sse" sse-connect="/notifications">
  <div sse-swap="notification" hx-swap="beforeend" id="notifications">
    <!-- Notifications appear here -->
  </div>
</div>

<audio id="notification-sound" src="/notification.mp3"></audio>

<script>
document.body.addEventListener('htmx:sseOpen', function(evt) {
    console.log('SSE connected');
});

document.body.addEventListener('htmx:oobAfterSwap', function(evt) {
    if (evt.detail.target.id === 'notifications') {
        document.getElementById('notification-sound').play();
    }
});
</script>
```

## Live Collaboration

```html
<div hx-ext="sse" sse-connect="/collaboration">
  <!-- Live cursor positions -->
  <div sse-swap="cursor" hx-swap="innerHTML" id="cursors">
    <!-- Other users' cursors appear here -->
  </div>
  
  <!-- Live edits -->
  <div sse-swap="edit" hx-swap="innerHTML" id="document">
    <!-- Document content with live edits -->
  </div>
</div>
```

## Real-Time Progress Updates

```html
<div hx-ext="sse" sse-connect="/job-progress">
  <div sse-swap="progress" hx-swap="innerHTML" id="progress">
    <div class="progress-bar" style="width: 0%"></div>
  </div>
</div>
```

**Server Response (SSE format):**
```
event: progress
data: <div class="progress-bar" style="width: 50%"></div>

```

## Live Notifications with Auto-Dismiss

```html
<div hx-ext="sse" sse-connect="/notifications">
  <div sse-swap="notification" hx-swap="beforeend" id="notifications">
    <!-- Notifications appear here -->
  </div>
</div>

<script>
document.body.addEventListener('htmx:oobAfterSwap', function(evt) {
    if (evt.detail.target.id === 'notifications') {
        setTimeout(function() {
            evt.detail.target.remove();
        }, 5000);
    }
});
</script>
```
