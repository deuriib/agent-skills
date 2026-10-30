# Pi Extension API — Essentials

## Entry point

```ts
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    // load state from ctx.cwd or session entries
  });
}
```

## ExtensionAPI surface

| Member | Purpose |
| --- | --- |
| `pi.on(event, handler)` | subscribe to lifecycle events |
| `pi.registerTool(tool)` | add a tool |
| `pi.registerCommand(name, opts)` | add a slash command |
| `pi.sendMessage` / `pi.sendUserMessage` | inject messages |
| `pi.appendEntry(customType, data)` | persist custom session state |
| `pi.setSessionName` / `pi.getSessionName` | session metadata |
| `pi.setModel` / `getThinkingLevel` / `setActiveTools` | runtime control |
| `pi.registerProvider` | add a provider |

## Lifecycle events

- `session_start`, `session_before_switch`, `session_switch`, `session_shutdown`
- `before_agent_start` — return `{ message, systemPrompt }` to inject context
- `agent_start`, `turn_start`, `turn_end`, `agent_end`
- `message_start`, `message_update`, `message_end`
- `tool_call` — return `{ block: true, reason }` to cancel
- `tool_result`

## Discovery

- `~/.pi/agent/extensions/*.ts` (global)
- `.pi/extensions/` (project)
- A package declaring `pi.extensions` in `package.json`

## Notes

Pi loads TypeScript directly (jiti), so no build step is required for the
extension entry. `message_update` observes tokens but does not document a
mid-stream abort; defer corrections to `turn_end`.
