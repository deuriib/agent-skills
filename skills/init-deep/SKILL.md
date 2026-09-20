---
name: init-deep
description: Deep project bootstrap — generates hierarchical AGENTS.md files (root + scored subdirectories). Use when a repo needs full agent context beyond what /init covers.
---

# /init-deep

Generate hierarchical `AGENTS.md` files. Root + complexity-scored subdirectories.
Does NOT replace or modify the built-in `/init` — additive only.

## Usage

```text
/init-deep                 # Update mode: modify existing + create new where warranted
/init-deep --depth=2       # Limit directory depth (default: 3)
/init-deep --max-depth=2   # Alias of --depth (oMo compat)
/init-deep --create-new    # Read existing first (preserve context), then delete all and regenerate
```

Arguments arrive in `$ARGUMENTS`:

```text
$ARGUMENTS
```

## Arguments

| Flag | Meaning | Default |
| ---- | ------- | ------- |
| `--depth=N` | Hard cap on directory depth for new `AGENTS.md` files | `3` |
| `--max-depth=N` | Alias of `--depth` (oMo compat) | `3` |
| `--create-new` | Read existing files first, then remove all and regenerate from scratch | off (update mode) |

Parse `$ARGUMENTS` first. When both `--depth` and `--max-depth` appear, last one wins.
Depth counts from the project root (`./` = depth 0). Never exceed the cap.

## Guardrails (non-negotiable)

- **Manual only.** Run ONLY on explicit `/init-deep` invocation. Never auto-run on session start.
- **Project scope only.** Write `AGENTS.md` files inside the current project workdir only.
  Never modify `~/.config/opencode/AGENTS.md`, `~/.config/opencode/command/`, or any global config.
- **`/init` untouched.** Do not alter, wrap, or shadow the built-in `/init` behavior.
- **pwsh-compatible.** This session may run pwsh non-interactive without profiles.
  Prefer native tools (`Glob`, `Grep`, `Read`) over shell. When shell is needed,
  use `Get-ChildItem -Recurse` / `Select-Object` — NOT `find` / `sed` / `awk`.
- **UTF-8, no secrets.** Never print or commit tokens, keys, or credentials found during analysis.
- **Edit vs Write.** If `AGENTS.md` already exists at the target path, update it with `Edit`.
  Only use `Write` for files that do not exist. Check existence first via `Read` or discovery.

## Workflow

Track ALL phases with `TodoWrite`. Mark `in_progress` → `completed` in real time:

```text
discovery — explore + structural map + read existing AGENTS.md
scoring   — score directories, apply --depth cap, decide locations
generate  — generate AGENTS.md files (root first, then subdirs)
review    — deduplicate, validate, trim
```

---

## Phase 1: Discovery + Analysis (concurrent)

Mark `discovery` as `in_progress`.

### 1a. Structural map (native tools first)

- `Glob` all source files (exclude `node_modules`, `.git`, `dist`, `build`, `venv`).
- Top directories by file count; code concentration by extension.
- Locate existing `AGENTS.md` / `CLAUDE.md` files (any depth).
- pwsh fallback only if native tools are insufficient:

```powershell
Get-ChildItem -Recurse -File -Force `
  | Where-Object { $_.FullName -notmatch 'node_modules|\.git|dist|build|venv' } `
  | Group-Object DirectoryName | Sort-Object Count -Descending | Select-Object -First 30
```

### 1b. Read existing AGENTS.md

For each existing file found: `Read` it, extract key insights, conventions,
anti-patterns into an `EXISTING_AGENTS` map. With `--create-new`, still read
everything first (preserve context) — delete only after reading.

### 1c. Code map (LSP when available)

- `lsp_symbols` scope=document on each entry point → file outline.
- `lsp_symbols` scope=workspace by kind (class/interface/function) → inventory.
- `lsp_find_references` on top exports → reference centrality.
- If LSP is unavailable, mark centrality unmeasured and rely on `Grep` + explore output.

### 1d. Parallel exploration

Fire background explore subagents immediately (structure, entry points,
conventions, anti-patterns, build/CI, test patterns) while the main session
runs 1a–1c. Scale agent count with project size (files, lines, depth,
monorepo packages, languages) — never a fixed count. Collect all results
before scoring. Mark `discovery` completed.

---

## Phase 2: Scoring & Location Decision

Mark `scoring` as `in_progress`.

### Scoring matrix

| Factor | Weight | High threshold | Source |
| ------ | ------ | -------------- | ------ |
| File count | 3x | >20 | structural map |
| Subdir count | 2x | >5 | structural map |
| Code ratio | 2x | >70% | structural map |
| Unique patterns | 1x | has own config | explore |
| Module boundary | 2x | has index/entry file | structural map |
| Symbol density | 2x | >30 symbols | LSP |
| Export count | 2x | >10 exports | LSP/Grep |
| Reference centrality | 3x | >20 refs | LSP |

### Decision rules

| Score | Action |
| ----- | ------ |
| Root (`.`) | ALWAYS create/update |
| >15 | Create `AGENTS.md` |
| 8–15 | Create only if distinct domain |
| <8 | Skip (parent covers) |

Apply the `--depth` / `--max-depth` cap AFTER scoring: drop every location
deeper than the cap, no exceptions. Emit the final list:

```text
AGENTS_LOCATIONS = [
  { path: ".", type: "root" },
  { path: "src/hooks", score: 18, reason: "high complexity" }
]
```

Mark `scoring` completed.

---

## Phase 3: Generate AGENTS.md

Mark `generate` as `in_progress`.

### Root AGENTS.md (full treatment, 50–150 lines)

```markdown
# PROJECT KNOWLEDGE BASE

**Generated:** {TIMESTAMP}
**Commit:** {SHORT_SHA}
**Branch:** {BRANCH}

## OVERVIEW
{1-2 sentences: what + core stack}

## STRUCTURE
{tree with non-obvious purposes only}

## WHERE TO LOOK
| Task | Location | Notes |

## CODE MAP
{from LSP/Grep — skip if project <10 files}

## CONVENTIONS
{ONLY deviations from standard}

## ANTI-PATTERNS (THIS PROJECT)
{explicitly forbidden here}

## COMMANDS
```bash
{dev/test/build}
```

## NOTES
{gotchas}
```

Quality gates: telegraphic style, no generic advice, no content obvious from the tree.

### Subdirectory files (30–80 lines each, parallel)

One task per location (except root): `OVERVIEW` (1 line), `STRUCTURE` (only if
>5 subdirs), `WHERE TO LOOK`, `CONVENTIONS` (only if different from parent),
`ANTI-PATTERNS`. NEVER repeat parent content. Wait for all. Mark `generate`
completed.

---

## Phase 4: Review & Deduplicate

Mark `review` as `in_progress`. For each generated file: remove generic advice,
remove parent duplicates, enforce size limits, verify telegraphic style.
Mark `review` completed.

---

## Final Report

```text
=== init-deep Complete ===

Mode: {update | create-new}
Max depth: {N}

Files:
  [OK] ./AGENTS.md (root, {N} lines)
  [OK] ./src/hooks/AGENTS.md ({N} lines)

Dirs Analyzed: {N}
AGENTS.md Created: {N}
AGENTS.md Updated: {N}

Hierarchy:
  ./AGENTS.md
  └── src/hooks/AGENTS.md
```

---

## Anti-Patterns

- Static explore-agent count regardless of project size.
- Sequential execution instead of parallel discovery.
- Ignoring existing files (always read first, even with `--create-new`).
- Documenting every directory — most dirs are covered by their parent.
- Child repeating parent content.
- Generic advice that applies to ALL projects.
- Verbose prose instead of telegraphic style.
- `find`/`sed`/`awk` shellisms that break on pwsh non-interactive.
