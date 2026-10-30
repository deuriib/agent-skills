# Capability → Extension Point Mapping

Use this table during design. Fill in the harness column only after the
capability sentence is written without harness names.

| Capability | OpenCode V2 | Pi | Antigravity |
| --- | --- | --- | --- |
| Block a tool call | `ctx.tool.transform.before` → `{ cancel, reason }` | `pi.on("tool_call")` → `{ block, reason }` | `hooks.json` `PreToolUse` → `{ allow_tool: false, deny_reason }` |
| Observe streamed text | `ctx.event.subscribe("message.part.updated")` | `pi.on("message_update")` | not supported |
| Inject context before LLM | `ctx.session.hook("context")` | `before_agent_start` → `{ message, systemPrompt }` | `rules/` (static only) |
| Register a tool | `ctx.tool.transform` | `pi.registerTool` | `mcp_config.json` |
| Register a command | `ctx.command` domain | `pi.registerCommand` | not native — use a skill |
| Transform config | domain `.transform(...)` | `before_agent_start` systemPrompt | `plugin.json` metadata |
| Persist state | `ctx.storage` | `pi.appendEntry` | not supported in-process |
| Cleanup on unload | return function from `setup` | not documented | not applicable |

## Decision matrix

| Need | Plugin | Skill | Rule | MCP |
| --- | --- | --- | --- | --- |
| Runs inside the agent loop | ✅ | | | |
| Reusable procedure the model reads | | ✅ | | |
| Static constraint | | | ✅ | |
| External tool over a protocol | | | | ✅ |
| Conditional mid-stream logic | ✅ | | | |

## Gap policy

When a capability has no extension point in a harness, do not fake it. Write
the capability sentence, mark the cell "not supported", and document the
degradation in the plugin README. Users trust a plugin that admits its
boundaries more than one that silently no-ops.
