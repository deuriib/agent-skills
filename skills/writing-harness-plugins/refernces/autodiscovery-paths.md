# Autodiscovery Paths

A plugin that lands in the wrong directory is invisible. Verify against this
table before declaring an adapter done.

| Harness | Project path | Global path | Entry detection |
| --- | --- | --- | --- |
| OpenCode V2 | `.opencode/plugins/` | `~/.config/opencode/plugins/` | default export with `id` + `setup` |
| Pi | `.pi/extensions/` | `~/.pi/agent/extensions/` | default-exported factory, or `pi.extensions` field |
| Antigravity | `.agents/plugins/<name>/` | `~/.gemini/config/plugins/<name>/` | `plugin.json` at root or `.antigravity-plugin/plugin.json` |

## Rules of thumb

- **OpenCode**: a `plugins/` directory beside a project-root `opencode.json` is
  not auto-discovered. Put it under `.opencode/`, or list the file explicitly.
- **Pi**: a package must declare `pi.extensions` pointing at the entry file;
  otherwise the compiled output is never loaded.
- **Antigravity**: the manifest is the marker. A directory without
  `plugin.json` (or `.antigravity-plugin/plugin.json`) is not a plugin.
