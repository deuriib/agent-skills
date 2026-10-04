---
name: init-deep
description: Use when a repository needs hierarchical AGENTS.md coverage — generating them, scoring which subdirectories need one, or refreshing stale files across engineering, security, testing, ops, and business domains.
metadata:
  author: deuriib
  version: "1.2"
---

# init-deep

Generate hierarchical `AGENTS.md` files: a root file plus complexity-scored subdirectory files. Every file declares which governance domains apply to it, backed by file or path evidence.

Additive only — this does not replace or modify the built-in `/init`.

## When to Use

- A repo has a root `AGENTS.md` but blind spots in high-risk subdirectories (`payments/`, `auth/`, `infra/`).
- A monorepo needs per-package context instead of one bloated root file.
- Existing `AGENTS.md` files have gone stale and need refreshing.

**Not for**: a brand-new empty repo — that is `project-bootstrap`.

## Guardrails (non-negotiable)

- **Evidence or nothing.** No evidence, no section. A domain without a cited path is a guess and must be dropped.
- **Never invent commands.** Copy only commands you found in CI config, `package.json` scripts, or Makefiles. A wrong command costs more than a missing one.
- **Additive only.** Never delete or rewrite an existing `AGENTS.md` the user wrote unless `--create-new` was passed, and even then read it first.
- **Root ≤ 150 lines, subdirectory ≤ 80.** Telegraphic style. If it needs more, it is reference material, not context.
- **No parent duplication.** A subdirectory file states only what differs from its parent.
- **Maximum 3 domain tags per subdirectory.** More means the split is wrong.

## Usage

```text
/init-deep                            # Update: modify existing, create where warranted
/init-deep --depth=2                  # Limit directory depth (default 3)
/init-deep --create-new               # Read all existing first, then regenerate
/init-deep --domains=Security,Legal   # Narrow to a subset of domains
/init-deep --dry-run                  # Report the plan without writing files
```

## Domain Taxonomy

Use these names verbatim — never invent new ones: Security & Privacy, Testing, Engineering, Operations & Automation, Legal & Regulatory, Brand & Marketing, Revenue & Commercial, Product, Financial, People & Conduct, Cross-Domain.

Definitions and the evidence map are in `references/domains.md`.

## Workflow

### Phase 1 — Discovery (run these concurrently)

1. **Structure**: glob source files excluding `node_modules`, `.git`, `dist`, `build`, `venv`. Rank top directories by file count.
2. **Existing files**: read every `AGENTS.md` / `CLAUDE.md` at any depth. With `--create-new`, still read everything before deleting anything.
3. **Code map**: use LSP symbols if available; otherwise mark centrality unmeasured and rely on grep.
4. **Parallel scouts**: dispatch background explorers for structure, entry points, conventions, anti-patterns, build/CI, and test patterns while the main session works. Scale agent count to project size.
5. **Domain signals**: grep the patterns in `references/domain-signals.md`. One hit gives `{ domain, evidence_path, confidence }`.

Confidence gates what you are allowed to claim: **high** = a regulated artifact or ≥3 hits; **med** = 1–2 hits with context; **low** = keyword match only, which becomes a `candidate` and produces no section.

Directories with zero signals inherit their parent's domains.

### Phase 2 — Scoring

Score each candidate directory, then apply the decision rules and depth cap.

**Score it**

| Factor | Points |
|---|---|
| File count | ≥100 → 2, 20–99 → 1, <20 → 0 |
| Distinct source dirs | ≥5 → 2, 2–4 → 1, 1 → 0 |
| Has tests | yes → 1 |
| Has CI config | yes → 2 |
| Own deploy/release config | yes → 1 |
| High-risk domain signals | any → 3 |
| Own `AGENTS.md` already | yes → 2 (update) |

**Place it**

| Score | Action |
|---|---|
| ≥5 | Create/update its own `AGENTS.md` |
| 3–4 | Create only if it owns a distinct domain or entry point |
| <3 | No file — inherit parent context |

Always generate the root file unless one already exists and is current. Cap total subdirectory files at 20; if more directories qualify, keep the highest-scoring ones and say which you skipped.

### Phase 3 — Generate

Use the skeletons in `references/templates.md`.

- **Root** (50–150 lines): overview, active domains with evidence, structure, where to look, boundaries, code map, conventions, project anti-patterns, commands, notes.
- **Subdirectory** (30–80 lines): a `DOMAINS: {max 3}` header, then overview, where to look, dir-specific guardrails, conventions (only if different from parent), anti-patterns.

### Phase 4 — Review

Strip generic advice that would be true in any repo. Drop duplicated parent content. Enforce the line limits. Verify every `active` domain cites a real path and every guardrail bullet is specific to that directory. Drop `low`-confidence domains.

## Final Report

```text
=== init-deep Complete ===

Mode: {update | create-new}
Max depth: {N}
Domains: {all | CSV filter}
Domains Active: {e.g. Engineering, Testing, Security & Privacy (3/11)}

Files:
  [OK] ./AGENTS.md (root, {N} lines)
  [OK] ./src/hooks/AGENTS.md ({N} lines, DOMAINS: Engineering, Testing)

Dirs Analyzed: {N}
AGENTS.md Created: {N}
AGENTS.md Updated: {N}
Dirs Skipped (score < 3): {N}
```

## Anti-Patterns

- Writing domain sections because they "sound relevant" instead of citing evidence.
- Copying a plausible `npm test` command that does not exist in the repo.
- Repeating the root's conventions verbatim in every subdirectory file.
- Letting the root file grow past 150 lines instead of splitting it.
- Running subdirectory discovery sequentially when scouts could run in parallel.

## References

- `references/domains.md` — full domain definitions and evidence map.
- `references/domain-signals.md` — grep patterns and globs per domain.
- `references/templates.md` — root and subdirectory `AGENTS.md` skeletons.
