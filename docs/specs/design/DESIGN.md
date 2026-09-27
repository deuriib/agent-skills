# Architecture Contract: init-deep rewrite

**Owner:** vasquez (Engineering Lead; consolidates engineering contracts, links domain contracts)
**Version:** v1
**Last Updated:** 2026-09-27
**Domains-Touched:** [engineering, automation/ops, people]
**Spec:** docs/specs/backlog/SPEC-init-deep-rewrite.md (REQ-001 … REQ-012)
**Brief:** docs/goals/GOAL-init-deep-rewrite.md (approved 2026-09-27, commit 72fb6f4)

## Overview

Rewrite `skills/init-deep/SKILL.md` (244 lines, single-file, `name/description` frontmatter, no refs) into a thin router skill (≤80 lines) plus 4 local `references/` files, modeled on `skills/animate-ui/SKILL.md` (55 lines, `name/description/license/metadata` + 3 local refs). Behavior is preserved byte-identical: 8-factor scoring, depth-cap-after-scoring, `--depth/--max-depth/--create-new` oMo semantics, TodoWrite checkpoints, Final Report verbatim (Q1). Delegation changes from fixed-count explore agents to size-scaled helper agents (max 2 parallel) with a defined no-LSP fallback. No new flags, no `/init` change, no global-config touch, no external URLs.

Reference files (Q2 decided — 4 base):

- `references/workflow.md` — phases + checkpoints + scaling + fallback (REQ-005, REQ-006, REQ-012)
- `references/scoring-matrix.md` — matrix + rules + cap + schema (REQ-008)
- `references/templates-root-subdir.md` — root/subdir templates + Report verbatim (REQ-009, REQ-011)
- `references/guardrails-pwsh-lsp.md` — 6 hard guardrails + pwsh table (REQ-010)

## Components

| Component | Responsibility | Interface |
|-----------|---------------|-----------|
| `SKILL.md` (router) | Activation Contract, Hard Rules pointer, Decision Gates, Execution Steps (delegate), Output Contract, `## References` | Frontmatter keys `name/description/license/metadata`; `Grep IN/OUT/NEXT/STOP` hits; ≤80 lines |
| `references/workflow.md` | 4 phases (discovery/scoring/generate/review), TodoWrite `in_progress→completed`, helper-agents scaling table, LSP→Grep fallback | Emits `AGENTS_LOCATIONS`; fallback marker `centrality: unmeasured` |
| `references/scoring-matrix.md` | 8 factors + weights/thresholds/sources, decision rules, cap-after-scoring | Schema `AGENTS_LOCATIONS = [{path, type\|score, reason}]`; fixture diff empty |
| `references/templates-root-subdir.md` | Root 50–150 / subdir 30–80 templates, no-duplication rule, telegraphic style, Report verbatim | Template sections; `diff` Report empty |
| `references/guardrails-pwsh-lsp.md` | Manual-only, project-scope-only, init-untouched, pwsh-native-first, UTF-8 no-secrets, Edit-vs-Write | `Grep` suites; secret scan 0 hits |
| Compat + integrity harness (automation/ops) | Link-integrity script, flag-compat suite, scoring fixtures, guardrail scans | pwsh logs attached to PROPOSAL/HANDOFF |
| Hierarchy contract (people) | Root-vs-subdir placement, no-duplication, size enforcement | Fixture review + santana verdict |

## Data Flow

1. `/init-deep [$ARGUMENTS]` → parse flags first (`--depth/--max-depth` last-wins, default 3; `--create-new` arms read-before-delete).
2. Discovery (native `Glob/Grep/Read` → optional pwsh `Get-ChildItem -Recurse` → LSP symbols/refs or `unmeasured` fallback) + parallel helper agents (size-scaled, ≤2 areas) → `EXISTING_AGENTS` map.
3. Scoring (8 factors → score per dir → rules → cap-after-scoring) → `AGENTS_LOCATIONS`.
4. Generate (root first, then subdirs, one task per location) → draft files.
5. Review (dedupe, trim, size/style gates) → final files.
6. Final Report (verbatim) → HANDOFF.

## Invariants

- INV-001: SKILL.md stays ≤80 lines; phase/scoring/template prose lives only in refs (REQ-001).
- INV-002: Exactly 4 refs unless a 5th passes the DESIGN gate below (REQ-002; Q2).
- INV-003: No external URLs in SKILL.md or refs; all `## References` paths resolve (REQ-002, REQ-004).
- INV-004: Scoring + flags + Report are behavior-preserving; any output delta fails the gate (REQ-007, REQ-008, REQ-009).
- INV-005: Cap applies AFTER scoring with no exceptions; depth counts from `./`=0 (REQ-007, REQ-008).
- INV-006: Writes stay inside project workdir; `~/.config/opencode` and `/init` are never touched (REQ-010).
- INV-007: Shell fallback is pwsh-only (`Get-ChildItem/Select-Object`); `find/sed/awk` never execute (REQ-010).
- INV-008: No secrets/PII in code, logs, commits, or prompts (Ley 172-13) (REQ-010).
- INV-009: Child never repeats parent; root 50–150 / subdir 30–80; telegraphic only (REQ-011).
- INV-010: Execution stays `helper agents` (≤2 parallel, by reference); <15-line shortcut stays outside methodology (REQ-012).
- INV-011: One UPPER_SNAKE canonical per lane (`DESIGN.md`, `PROPOSAL.md` — never suffixed).
- INV-012: Falsifiable bet — if scoring cannot move to refs unchanged, framing 1 dies → framing 2 + DECISION note.
- INV-013: YAGNI — no `dry-run`/ML/`JSON` flags in this cycle (SPEC §5).
- INV-014: `AGENTS.md`/`README.md` change only on interface change; `skills.sh` badge preserved.
- INV-015: GOAL record frozen by CHANGELOG is exempt from the `## Objectives` clause alone (frame-ship record rule; not invoked here — Objectives present).

## Non-Functional Requirements

- Performance: bootstrap overhead dominated by discovery I/O; helper-agents bounded (≤2 parallel); no unbounded queues.
- Availability: skill is local-file only; no service dependency; no SPOF introduced.
- Security: posture unchanged (local reads/writes, no auth, no network); secret scan 0 hits; security-owner review required only if a later SPEC adds stores/exports/flows (none here).
- Operability: link-integrity + compat + scoring fixtures runnable via pwsh non-interactive, no profile.
- Accessibility/i18n: n/a (agent skill, no UI). Docs in repo language mix (EN specs, ES handoffs allowed).

## Decisions

- **D-001 Final Report (Q1):** byte-identical; cosmetic trim only with green suite + recorded diff. Status: decided (montilla 2026-09-27).
- **D-002 Reference count (Q2):** 4 base. A 5th requires: name + concrete pain-point + why the 4 cannot hold it + DESIGN amendment + montilla approval. Default: reject. Status: decided.
- **D-003 Framing:** modular rewrite wins; single-file polish is fallback only; full-redesign-with-features is a separate future proposal. Status: decided in GOAL, confirmed here.
- **D-004 `animate-ui` is read-only reference:** pattern source for frontmatter + References; never modified in this cycle.

## The 4-line-note

Grammar (canonical; cited by SPEC and SKILL.md):

```text
SPEC:<spec-path>#<REQ-IDs> / HARD:<rules> / GATE:<verdict> / DOMAINS:[<list>]
```

- At `write-the-requirements` stage the note is anchorless (`SPEC:docs/goals/GOAL-<slug>.md`, no `#`) because REQ-IDs do not exist until this stage mints them.
- Handoff from this stage: `SPEC:docs/specs/backlog/SPEC-init-deep-rewrite.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007,REQ-008,REQ-009,REQ-010,REQ-011,REQ-012 / HARD:helper agents+pwsh-compatible,project-scope-only,init-untouched,utf8-no-secrets,preserve-depth-flags-oMo / GATE:none-yet / DOMAINS:[engineering, automation/ops, people]`.
- `HARD` is frozen from the brief; any change needs a CEO documented exception. `GATE` carries reviewer verdicts from `propose` onward.
