# Harness Extension Matrix

## OpenCode V2

- **Shape**: imperative in-process TypeScript API.
- **Entry**: `export default Plugin.define({ id, async setup(ctx) { … } })`.
- **Discovery**: `.opencode/plugins/` (project), `~/.config/opencode/plugins/` (global).
- **Hooks**: registered on the domain that owns the operation — `ctx.event.subscribe`, `ctx.tool.transform.before`, `ctx.session.hook`, `ctx.integration.transform`, `ctx.provider.transform`, `ctx.model.transform`.
- **Cleanup**: `setup` returns a function; called on disable, reload, or shutdown.
- **Config**: `opencode.json(c)` → `plugins: [...]`; disable by exported `id` with `-id`.

## Pi

- **Shape**: factory function receiving `ExtensionAPI`.
- **Entry**: `export default function (pi: ExtensionAPI) { … }`.
- **Discovery**: `~/.pi/agent/extensions/*.ts`, `.pi/extensions/`, or a package declaring `pi.extensions`.
- **Hooks**: `pi.on("session_start" | "before_agent_start" | "turn_start" | "turn_end" | "message_update" | "tool_call" | …)`.
- **Tools/commands**: `pi.registerTool`, `pi.registerCommand`.
- **State**: `pi.appendEntry`, `pi.setSessionName`, `pi.setLabel`.

## Antigravity 2.0

- **Shape**: declarative bundle directory.
- **Manifest**: `plugin.json` at the plugin root (required); `.antigravity-plugin/plugin.json` is also recognised.
- **Components**: optional `hooks.json`, `skills/`, `agents/`, `rules/`, `mcp_config.json`.
- **Discovery**: workspace `.agents/plugins/<name>/`, global `~/.gemini/config/plugins/<name>/`.
- **Hooks**: `hooks.json` runs shell commands before/after tool calls (`PreToolUse` / `PostToolUse`).
- **CLI**: `agy plugin install`, `agy plugin list`, `agy plugin validate --strict`.

## Decision shortcut

| If the capability is… | Then the harness family is… | Build… |
| --- | --- | --- |
| streaming observation | imperative (OpenCode, Pi) | in-process module |
| tool-call blocking | both families | core + transform/hook + shell hook |
| static constraint | declarative | `rules/` file |
| external service | protocol | MCP server |
| reusable procedure | none | `SKILL.md` |
