---
name: project-bootstrap
description: Use when a repository is missing standard hygiene files, or when a new project needs its baseline scaffold — git config, ignore rules, license, README, changelog, hooks, toolchain pin.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.1"
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
- **All 13 files are planned every run.** Config first (`.gitattributes`, `.gitignore`, `.editorconfig`, `.npmrc`, `.pre-commit-config.yaml`), then toolchain (`mise.toml`), then versioning (`.bump-version.json`, `scripts/bump-version.mjs`), then docs (LICENSE, README, CHANGELOG, CODE_OF_CONDUCT, PRODUCT).
- **Placeholders render once.** `{{project}}`, `{{description}}`, `{{author}}`, `{{year}}`, etc. are substituted from input; leftover tokens are a bug.
- **Merge mode preserves history.** `.gitignore` and `CHANGELOG.md` get their missing section appended below existing content, never rewritten.
- **`project` is required.** Empty/missing `project` stops at the `need-project` gate.

## Decision Gates

| Situation                                      | Action                                                                            |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Target file doesn't exist                      | Create it from the bundled template (`status: created`)                           |
| Target file exists, no `force`                 | Skip it (`status: skipped`, note `exists`) — existing content wins                |
| Target file exists, `force: true`              | Overwrite from template (note `overwritten (force)`)                              |
| `.gitignore` / `CHANGELOG.md` lacks its anchor | Append rendered section below existing content (`status: merged`)                 |
| Caller passes `files: [...]`                   | Only those files are considered; the rest report `skipped` (note `not requested`) |
| Caller passes an unknown file name             | Stop at the `unknown-file` gate with the allowed list                             |
| `dry_run` not specified                        | Treat as `true` and only report what would happen                                 |

## Execution Steps

1. **Validate input**: `project` required (non-empty). Unknown entries in `files` stop at `unknown-file`.
2. **Build vars**: `project`, `description`, `author` (default `Your Name`), `year` (default current year), `license` (default `MIT`), `contact`, `status`, `install_cmd` / `usage_cmd` / `dev_cmd`, `date`, plus `node_version` (default `22`) and `python_version` (default `3.12`) for `mise.toml`.
3. **Plan**: run the ordered `PLAN_TABLE` (13 entries). Each entry resolves to `create` / `merge` / `conditional` handling under the current `dry_run` + `force` flags.
4. **Apply** (or simulate): write files only when `dry_run: false`. Dry run emits `would_create` / `would_skip`.
5. **Report**: return `summary`, the per-file `files` array (`path`, `status`, `note`), and `next_steps`.

## PLAN_TABLE

Run in this order — earlier entries are written before later ones so
`script/bump-version.mjs` lands after `.bump-version.json` exists.

| #   | Target                    | Mode        | Source                                     |
| --- | ------------------------- | ----------- | ------------------------------------------ |
| 1   | `.gitattributes`          | create      | `assets/templates/.gitattributes`          |
| 2   | `.gitignore`              | merge       | `assets/templates/.gitignore`              |
| 3   | `.editorconfig`           | create      | `assets/templates/.editorconfig`           |
| 4   | `.npmrc`                  | create      | `assets/templates/.npmrc`                  |
| 5   | `.pre-commit-config.yaml` | create      | `assets/templates/.pre-commit-config.yaml` |
| 6   | `mise.toml`               | create      | `assets/templates/mise.toml`               |
| 7   | `.bump-version.json`      | create      | `assets/templates/.bump-version.json`      |
| 8   | `script/bump-version.mjs` | create      | `assets/templates/script/bump-version.mjs` |
| 9   | `LICENSE`                 | create      | `assets/templates/LICENSE`                 |
| 10  | `README.md`               | create      | `assets/templates/README.md`               |
| 11  | `CHANGELOG.md`            | merge       | `assets/templates/CHANGELOG.md`            |
| 12  | `CODE_OF_CONDUCT.md`      | conditional | `assets/templates/CODE_OF_CONDUCT.md`      |
| 13  | `PRODUCT.md`              | conditional | `assets/templates/PRODUCT.md`              |

`merge` uses the anchors in `references/merging.md`. `conditional` files are
skipped unless listed in the caller's `files` array.

## Input / Output

Input:

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
  "node_version": "22",
  "python_version": "3.12",
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
- **`mise.toml`** — pins `node`/`python` versions and defines `mise run` tasks (`build`, `test`, `lint`, `typecheck`, `dev`, `check`). Replaces `.nvmrc` / `.tool-versions`; run `mise install` after.
- **`script/bump-version.mjs`** — bumps the version across listed files (`major|minor|patch`, `--dry-run`), prints the next Conventional Commit type. **Node ≥ 18.**
- **`LICENSE`** — MIT by default (`{{year}}` + `{{author}}` rendered).
- **`README.md`** — Status / Installation / Usage / Development / Contributing / License scaffold.
- **`CHANGELOG.md`** — Keep a Changelog format with an `[Unreleased]` section.
- **`CODE_OF_CONDUCT.md`** — Contributor Covenant-style community standards, `{{contact}}` for reports.
- **`PRODUCT.md`** — problem/target users/solution/goals/metrics/constraints/risks brief.

## References

- [assets/templates/](assets/templates/) — the 13 source templates. Copy from here, render `{{placeholder}}` values, and write to the repo root.
- [references/merging.md](references/merging.md) — merge vs. create vs. force decision table and how placeholders render.
