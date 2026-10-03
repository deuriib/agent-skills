---
name: project-bootstrap
description: Use when a repo is missing standard hygiene files or a new project needs its baseline scaffold. Creates .gitattributes, .gitignore, .npmrc, .editorconfig, pre-commit, bump-version, LICENSE, README, CHANGELOG, CODE_OF_CONDUCT, PRODUCT without clobbering.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
omniroute:
  handler: project-bootstrap-handler
  mode: auto
  sourceProvider: local
  tags: [bootstrap, scaffolding, repo-hygiene, versioning, onboarding]
---

# Skill: project-bootstrap

## Activation Contract

Use this skill when:
- Initializing a new repo or project directory that needs the standard hygiene files.
- Updating an existing project so the missing baseline files get added without touching what's already there.
- Someone asks for `.gitignore`, `.npmrc`, `.pre-commit-config`, version-bump tooling, LICENSE, README, CHANGELOG, CODE_OF_CONDUCT, or PRODUCT as a set.

Do NOT use this skill when:
- Only one file is needed and it's unrelated to this set (edit it directly).
- The task is writing a skill (use `create-skill`) or committing (use `git-commit`).

## Hard Rules

- **Missing file = write; existing file = keep.** Non-destructive by default. Existing content always wins unless `force: true` is passed explicitly.
- **Dry-run is the default.** `dry_run: true` unless the caller explicitly sets `false`. Nothing touches disk in a dry run.
- **All 12 files are planned every run.** Config first (`.gitattributes`, `.gitignore`, `.npmrc`, `.editorconfig`, `.pre-commit-config.yaml`), then versioning (`.bump-version.json`, `script/bump-version.mjs`), then docs (LICENSE, README, CHANGELOG, CODE_OF_CONDUCT, PRODUCT).
- **Placeholders render once.** `{{project}}`, `{{description}}`, `{{author}}`, `{{year}}`, etc. are substituted from input; leftover tokens are a bug.
- **Merge mode preserves history.** `.gitignore` and `CHANGELOG.md` get their missing section appended below existing content, never rewritten.
- **`project` is required.** Empty/missing `project` stops at the `need-project` gate.

## Decision Gates

| Situation | Action |
|-----------|--------|
| Target file doesn't exist | Create it from the bundled template (`status: created`) |
| Target file exists, no `force` | Skip it (`status: skipped`, note `exists`) — existing content wins |
| Target file exists, `force: true` | Overwrite from template (note `overwritten (force)`) |
| `.gitignore` / `CHANGELOG.md` lacks its anchor | Append rendered section below existing content (`status: merged`) |
| Caller passes `files: [...]` | Only those files are considered; the rest report `skipped` (note `not requested`) |
| Caller passes an unknown file name | Stop at the `unknown-file` gate with the allowed list |
| `dry_run` not specified | Treat as `true` and only report what would happen |

## Execution Steps

1. **Validate input**: `project` required (non-empty). Unknown entries in `files` stop at `unknown-file`.
2. **Build vars**: `project`, `description`, `author` (default `Your Name`), `year` (default current year), `license` (default `MIT`), `contact`, `status`, `install_cmd` / `usage_cmd` / `dev_cmd`, `date`.
3. **Plan**: run the ordered `PLAN_TABLE` (12 entries). Each entry resolves to `create` / `merge` / `conditional` handling under the current `dry_run` + `force` flags.
4. **Apply** (or simulate): write files only when `dry_run: false`. Dry run emits `would_create` / `would_skip`.
5. **Report**: return `summary`, the per-file `files` array (`path`, `status`, `note`), and `next_steps`.

## Input / Output

Input (`schema.input` in `omniskill.json`):

```json
{
  "project": "my-repo",
  "description": "What it does",
  "author": "Name",
  "year": 2026,
  "contact": "team@example.com",
  "license": "MIT",
  "status": "Experimental",
  "install_cmd": "npm i pkg",
  "usage_cmd": "npx pkg",
  "dev_cmd": "npm i && npm test",
  "files": [".gitignore", "LICENSE"],
  "force": false,
  "dry_run": true
}
```

Output (`schema.output`): `success`, `skill`, `gate` (`dry-run` | `applied` | `need-project` | `unknown-file`), `dry_run`, `project`, `summary`, `files[]`, `next_steps[]`.

Status vocabulary: `created`, `merged`, `skipped`, `would_create`, `would_skip`.

## Common Calls

```text
# Preview the full plan (safe, writes nothing)
{ project: "my-repo", description: "...", author: "Me" }

# Actually write everything
{ project: "my-repo", dry_run: false }

# Overwrite existing files too
{ project: "my-repo", dry_run: false, force: true }

# Only add the files I don't have
{ project: "my-repo", dry_run: false, files: [".gitattributes", "PRODUCT.md"] }
```

## What Each File Does

- **`.gitattributes`** — normalizes line endings (LF in repo, native on checkout), marks binary assets, forces CRLF for Windows scripts.
- **`.gitignore`** — dependencies, build output, coverage, logs, `.env` secrets, editors/OS cruft.
- **`.npmrc`** — `save-exact`, `engine-strict`, `fund=false`, `audit=false` for reproducible, quiet installs.
- **`.editorconfig`** — UTF-8 + LF, spaces/2 indent, `max_line_length = 80`; Markdown keeps its hard-break spaces, Windows scripts stay CRLF, Makefile keeps tabs.
- **`.pre-commit-config.yaml`** — pre-commit hooks (trailing whitespace, YAML/JSON/TOML checks, private-key detection, prettier). Run `pre-commit install` after.
- **`.bump-version.json`** — config consumed by `script/bump-version.mjs`.
- **`script/bump-version.mjs`** — bumps the version across listed files (`major|minor|patch`, `--dry-run`), prints the next Conventional Commit type. **Node ≥ 18.**
- **`LICENSE`** — MIT by default (`{{year}}` + `{{author}}` rendered).
- **`README.md`** — Status / Installation / Usage / Development / Contributing / License scaffold.
- **`CHANGELOG.md`** — Keep a Changelog format with an `[Unreleased]` section.
- **`CODE_OF_CONDUCT.md`** — Contributor Covenant-style community standards, `{{contact}}` for reports.
- **`PRODUCT.md`** — problem/target users/solution/goals/metrics/constraints/risks brief.

## OmniRoute Compatibility

This skill is an omniskill (not docs-only): `handler.ts` implements the `SkillHandler` signature, `omniskill.json` declares schema + handler name, and this file carries the `omniroute:` block. Register at boot via `skillExecutor.registerHandler("project-bootstrap-handler", handler)`; templates are inlined in `templates.ts` (generated) so no external file read is needed in the sandbox.

## References

- [assets/templates/](assets/templates/) — the 12 source templates that `templates.ts` is generated from. Edit these, then regenerate `templates.ts`.
- [references/merging.md](references/merging.md) — merge vs. create vs. force decision table and how placeholders render.
