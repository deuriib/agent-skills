---
name: htmx
description: Use when building or debugging an htmx interface — hx-* attributes, swap and out-of-band targeting, events, extensions, SSE or WebSocket triggers, or server-side integration.
license: MIT
metadata:
  author: deuriib
  version: "1.2"
---

# htmx

## Overview

htmx issues HTTP requests from HTML attributes and swaps **HTML fragments** back into the DOM. The server returns markup, never JSON — you stay inside hypermedia, not inside a SPA.

## When to Use

Reach for htmx when a page needs interactivity that would otherwise pull in a JS framework:

- A form submit, confirm, or delete that should swap a fragment instead of reloading.
- Search-as-you-type, infinite scroll, lazy loading.
- Live updates via SSE or WebSocket.
- A page is otherwise a static server-rendered template with one or two dynamic spots.

**Not for**: client-side state machines, offline-first apps, or anything where the bulk of the UI state lives in the browser.

## Hard Rules

- **Return HTML, never JSON.** If a handler builds a JSON envelope, the swap has nothing meaningful to insert.
- **Check `HX-Request`.** On the server, branch on it when the same URL serves both htmx and a full page load.
- **Use response headers, not client JS**, for redirects, swaps, and triggers — `HX-Redirect`, `HX-Trigger`, `HX-Reswap` keep behavior server-driven.
- **Escape anything user-supplied** before it reaches a fragment. htmx inserts HTML verbatim.
- **Progressive enhancement**: `hx-boost` keeps links and forms working with JS disabled.
- **Do not invent attribute names.** `hx-swap-oob`, not `hx-oob-swap`. Confirm against references before use.

## Decision Gates

| Situation | Do this |
|---|---|
| Endpoint returns JSON | Convert to an HTML fragment, or you are fighting the tool |
| Click does nothing | Check `hx-target` resolves, and the response is not empty |
| Swap lands in the wrong place | Check `hx-swap` value and whether `hx-select` is filtering everything out |
| Need a redirect after action | Return `HX-Redirect: /path` header — never `window.location` in a JS handler |
| Need to trigger another element | Return `HX-Trigger: {"showModal": null}` and listen for that event |
| Update several regions at once | `hx-swap-oob="beforeend:#id"` on the extra fragments in the same response |
| Infinite scroll | `hx-trigger="intersect once"` on a sentinel element |
| Live data | `hx-ext="sse"` with `hx-trigger="sse:eventName"` |
| UI feels slow | Check `hx-swap` timing modifiers and `hx-indicator` before touching JS |

## Quick Reference

The three attributes that solve most problems:

```html
<button hx-get="/items/1/edit"
        hx-target="#panel"
        hx-swap="innerHTML">Edit</button>
```

| Need | Attribute |
|---|---|
| Verb | `hx-get` `hx-post` `hx-put` `hx-patch` `hx-delete` |
| When to fire | `hx-trigger="click"`, `keyup changed delay:300ms`, `every 5s` |
| Where to put it | `hx-target="#id"`, `closest`, `find`, `next` |
| How to put it | `hx-swap="innerHTML outerHTML beforeend afterend delete none"` |
| Extra data | `hx-vals='{"q":"x"}'`, `hx-include="#form"`, `hx-confirm` |
| Out-of-band | `hx-swap-oob="true"` or `hx-swap-oob="beforeend:#log"` |
| Filter response | `hx-select="#main"` |
| Request isolation | `hx-sync="closest:replace"` |

## Implementation

Add htmx, then put behavior on elements:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2/dist/htmx.min.js"></script>
```

Server handler returns a fragment; the response headers do the rest:

```
HTTP/1.1 200 OK
HX-Trigger: {"refreshList": null}
HX-Reswap: innerHTML
```

**Test the flow in DevTools, not by guessing**: confirm the request fires, inspect the fragment, and only then reason about swap behavior.

## Common Mistakes

| Symptom | Cause | Fix |
|---|---|---|
| Nothing happens on click | Missing/typo'd `hx-*` attribute, or JS not loaded | Check console; verify attribute name in references |
| Content flashes then reverts | Two requests racing | `hx-sync="closest:replace"` |
| Response arrives, page unchanged | `hx-target` selector matches nothing | Verify selector, or use `hx-target="this"` |
| XSS after a partial render | Unescaped user input in fragment | Escape server-side |
| Works manually, breaks in Safari | Non-standard event or unsupported extension | Check browser support in extensions reference |

## References

Read the file that answers the question at hand — the SKILL.md above intentionally holds no attribute tables.

- `references/getting-started.md` — installation and first request.
- `references/attributes.md` — every `hx-*` attribute, trigger modifiers, special triggers.
- `references/events.md` — full event list and the JavaScript API.
- `references/extensions.md` — SSE, WebSocket, morph, and community extensions.
- `references/configuration.md` — every `htmx.config*` option and default.
- `references/server-integration.md` — framework handlers, headers, middleware.
- `references/examples/forms.md` — validation and file upload flows.
- `references/examples/triggers.md` — custom and combined trigger patterns.
- `references/examples/targeting.md` — target and swap strategies.
- `references/examples/ui-patterns.md` — click-to-edit, dialogs, infinite scroll.
- `references/examples/real-time.md` — SSE and WebSocket streams.
