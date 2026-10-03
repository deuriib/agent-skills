# Merging & Rendering — project-bootstrap

How the handler decides between create / merge / force, and how placeholders
render. Companion to the `PLAN_TABLE` in `handler.ts`.

## Decision table

| Target state | mode | `force` | Result | `status` |
|--------------|------|---------|--------|----------|
| missing | `create` | any | write rendered template | `created` (dry: `would_create`) |
| exists | `create` | `false` | leave untouched | `skipped` (note `exists`) |
| exists | `create` | `true` | overwrite from template | `created` (note `overwritten (force)`) |
| exists, **anchor absent** | `merge` | any | append rendered section below existing content | `merged` |
| exists, **anchor present** | `merge` | any | leave untouched | `skipped` (note `already present`) |
| missing | `merge` | any | write rendered template | `created` |
| any | `conditional` | — | skipped unless listed in `files` | `skipped` (note `not requested`) |

`force` only affects `create`-mode files. `merge` mode is inherently additive and
never rewrites existing lines.

## Merge anchors

| File | Anchor (when present → skip) |
|------|------------------------------|
| `.gitignore` | `# ---- Dependencies ----` |
| `CHANGELOG.md` | `# Changelog` |

An appended block preserves the original content **verbatim above** the new
section; one blank line (or two if the original lacked a trailing newline)
separates them.

## Placeholder rendering

Templates ship with `{{token}}` placeholders. `renderTemplate()` substitutes
them from input vars using a single pass:

| Token | Source | Default |
|-------|--------|---------|
| `{{project}}` | `project` | — (required) |
| `{{description}}` | `description` | one-line description prompt |
| `{{author}}` | `author` | `Your Name` |
| `{{year}}` | `year` | current year |
| `{{contact}}` | `contact` | falls back to `author`, then `maintainers@example.com` |
| `{{license}}` | `license` | `MIT` |
| `{{status}}` | `status` | "Experimental — breaking changes may occur." |
| `{{install_cmd}}` | `install_cmd` | `npm install <project>` |
| `{{usage_cmd}}` | `usage_cmd` | `npx <project>` |
| `{{dev_cmd}}` | `dev_cmd` | `npm install && npm test` |
| `{{date}}` | derived | today, `YYYY-MM-DD` |
| `{{goal_1}}`, `{{goal_2}}`, `{{nongoal_1}}` | derived | prompts for PRODUCT.md |

Unknown `{{...}}` tokens are left in place (they never silently vanish) — a
leftover token in a written file is a bug, assert against it.

## `files` filter

When `files: [...]` is provided, only those paths run through the table; every
other managed file reports `skipped` with note `not requested`. Entries must be
one of the 12 known paths — anything else stops at the `unknown-file` gate with
the allowed list.

## Ordering

Config → versioning → docs. Config files land first so a subsequent `git add`
picks up ignore/attributes rules before content files; versioning follows; docs
close the run.
