# OpenCode V2 Plugin API — Essentials

## Entry point

```ts
import { Plugin } from "@opencode/plugin";

export default Plugin.define({
  id: "my-plugin",              // stable; scopes storage and diagnostics
  async setup(ctx) {
    // register hooks, transforms, subscriptions
    return () => {};             // cleanup: timers, watchers, connections
  },
});
```

## Context domains

`ctx` is both an OpenCode client and the extension API. Common domains:

| Domain | Use |
| --- | --- |
| `ctx.location.directory` | project root for discovery |
| `ctx.options` | JSON config from `opencode.json` |
| `ctx.event.subscribe(name, cb)` | observe events |
| `ctx.tool.transform.before(cb)` | intercept tool execution |
| `ctx.session.hook("prompt" \| "context", cb)` | modify prompts/context |
| `ctx.provider.transform`, `ctx.model.transform` | provider/model config |
| `ctx.session`, `ctx.permission`, `ctx.agent` | client operations |

## Return shapes

- Transform hook: return a mutated event, or `{ cancel: true, reason }` to block.
- `setup` cleanup: return a sync or async function.

## Discovery

- `.opencode/plugins/*.ts|js` (project)
- `~/.config/opencode/plugins/` (global)
- Direct `.ts`/`.js` children load; an immediate child directory loads as a package if it has a resolvable entry.

## V1 → V2 migration

V1 returned one object of tools and hooks keyed by string. V2 exports
`Plugin.define` with `id` and `setup`, and registers each hook on the domain
that owns it. Do not mix shapes.
