# Antigravity 2.0 Plugin — Essentials

## Bundle layout

```
plugins/<plugin-name>/
├── plugin.json          # required manifest
├── mcp_config.json      # optional
├── hooks.json           # optional
├── skills/<name>/SKILL.md
├── agents/<name>.md
└── rules/<name>.md
```

## Manifest

```json
{
  "$schema": "https://antigravity.google/schemas/v1/plugin.json",
  "name": "my-plugin",
  "description": "What it does"
}
```

`name` must match `^[a-zA-Z0-9-_]+$`; it is required by the CLI and optional in
the app/IDE (defaults to the folder name).

## Hooks

`hooks.json` at the plugin root runs shell commands before or after tool calls.
A `PreToolUse` handler that prints `{ "allow_tool": false, "deny_reason": "…" }`
blocks the call.

## Discovery

- Workspace: `.agents/plugins/<name>/`
- Global: `~/.gemini/config/plugins/<name>/`

## CLI

```bash
agy plugin install ./my-plugin
agy plugin list
agy plugin validate --strict ./my-plugin
```

## Capability gaps

No documented streaming hook. Prose interruption and token-level observation
are not available; scope those capabilities to the imperative harnesses.
`rules/` files are always-on, not conditional.
