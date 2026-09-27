# Spec: init-deep rewrite — thin SKILL + references/

**ID:** SPEC-init-deep-rewrite (filename: `docs/specs/backlog/SPEC-init-deep-rewrite.md`)
**Owner:** vasquez (Engineering Lead)
**Domains-Touched:** [engineering, automation/ops, people]
**Brief Reference:** docs/goals/GOAL-init-deep-rewrite.md
**Status:** draft
**Priority:** P0
**Execution_Mode:** helper agents (inherited from brief, frozen at agree-the-goal; trivial <15 lines goes by CEO small-task shortcut checkpoint-only, outside methodology)
**4-line note:** SPEC:docs/goals/GOAL-init-deep-rewrite.md / HARD:helper agents+pwsh-compatible,project-scope-only,init-untouched,utf8-no-secrets,preserve-depth-flags-oMo / GATE:none-yet / DOMAINS:[engineering, automation/ops, people]

## 1. Context

`skills/init-deep/SKILL.md` is a single 244-line file with no `references/` folder, no IN/OUT/NEXT/STOP contract, and frontmatter (`name/description` only) below the repo standard set by `skills/animate-ui/SKILL.md:1-8` (`name/description/license/metadata` + trigger language in description). It violates `AGENTS.md` mandatory-files rule (`SKILL.md` + `references/`) and link-integrity verification. Workflow mixes discovery/scoring/generate/review in one file, hard-codes TodoWrite phases, assumes LSP/Glob without a graceful fallback contract, and has no helper-agents delegation rule. Every new repo bootstrap inherits this debt.

This spec rewrites `init-deep` as a thin router skill (`SKILL.md` ≤80 lines: contract + router + References) plus 4 local `references/` files, preserving scoring/depth/oMo behavior and Final Report text byte-identical (Q1 decided). A 5th reference is allowed only with written justification from vasquez in DESIGN (Q2 decided).

## 2. Requirements

- REQ-001: SKILL.md thin router ≤80 lines — contract + router only (engineering)
- REQ-002: 4 base references/ files, self-contained, no external URLs (engineering)
- REQ-003: Frontmatter parity with animate-ui — trigger + license + metadata (automation/ops)
- REQ-004: Link-integrity 100% — every path in `## References` exists (automation/ops)
- REQ-005: IN/OUT/NEXT/STOP contract + 4-line note + gates per phase (engineering)
- REQ-006: Helper-agents delegation scaled by size + no-LSP fallback + TodoWrite checkpoints (engineering + automation/ops)
- REQ-007: Flags `--depth/--max-depth/--create-new` + oMo alias last-wins preserved (engineering)
- REQ-008: Scoring matrix + decision rules + cap-after-scoring byte-identical behavior (engineering)
- REQ-009: Final Report text preserved exact; cosmetic trim only if compat tests pass (engineering)
- REQ-010: Hard guardrails preserved — manual-only, project-scope-only, init-untouched, pwsh-compatible, UTF-8 no-secrets, edit-vs-write (engineering)
- REQ-011: AGENTS.md hierarchy rules — no-duplication, telegraphic style, size limits (people)
- REQ-012: Execution mode frozen — helper agents; trivial <15 lines via CEO shortcut outside methodology (people + automation/ops)

Detail per requirement: `docs/specs/requirements/REQ-001.md` … `REQ-012.md`.

## 3. Acceptance Criteria

- [ ] AC-001: `SKILL.md` ≤80 lines, 4 refs on disk, frontmatter diff vs animate-ui shows no missing keys → `Read skills/init-deep/SKILL.md` + `Glob skills/init-deep/**/*` (REQ-001, REQ-002, REQ-003)
- [ ] AC-002: Link-integrity script passes 100%, zero external URLs in SKILL.md + refs → pwsh script output (REQ-004, REQ-002)
- [ ] AC-003: `Grep IN/OUT/NEXT/STOP skills/init-deep/SKILL.md` hits contract block; 4-line-note grammar valid per DESIGN → grep output (REQ-005)
- [ ] AC-004: Compat suite passes — `--depth/--max-depth` last-wins, depth-from-root cap, `--create-new` read-before-delete, scoring fixtures produce identical `AGENTS_LOCATIONS`, Final Report diff empty → test log (REQ-007, REQ-008, REQ-009)
- [ ] AC-005: Guardrail suite passes — no `find/sed/awk`, no `~/.config/opencode` writes, no `/init` shadow, no secrets in repo, Edit-vs-Write honored → grep + scan log (REQ-010)
- [ ] AC-006: Generated fixture AGENTS.md set meets hierarchy rules — root 50–150 lines, subdir 30–80, zero parent-duplicate paragraphs, telegraphic style → fixture diff + review PASS (REQ-011)
- [ ] AC-007: PROPOSAL.md + review PASS confirm helper-agents scaling table + no-LSP fallback path exercised with LSP disabled → proposal + HANDOFF (REQ-006, REQ-012)

## 4. Contracts & Interfaces

Engineering contract: `docs/specs/design/DESIGN.md` (singleton, consolidated by vasquez per `check-design/references/architecture-template.md`).

- `SKILL.md` exports: Activation Contract (when `/init-deep` fires), Hard Rules (HARD verbatim), Decision Gates (update vs create-new vs depth-cap), Execution Steps (router → 4 refs), Output Contract (Final Report verbatim), `## References` (4 relative paths).
- `references/workflow.md` owns: 4 phases (discovery/scoring/generate/review), TodoWrite checkpoints, helper-agents scaling table, LSP→Grep fallback chain.
- `references/scoring-matrix.md` owns: 8-factor weights/thresholds/sources, decision rules (`root ALWAYS / >15 / 8–15 distinct-domain / <8 skip`), cap-after-scoring, `AGENTS_LOCATIONS` schema.
- `references/templates-root-subdir.md` owns: root template (50–150 lines, 9 sections) + subdir template (30–80 lines, 5 sections) + Final Report verbatim block.
- `references/guardrails-pwsh-lsp.md` owns: manual-only, project-scope-only, init-untouched, pwsh-native-first table (`Glob/Grep/Read` vs `Get-ChildItem -Recurse` fallback), UTF-8 no-secrets, Edit-vs-Write.
- 5th reference (if proposed): name + pain-point + why existing 4 cannot hold it; requires DESIGN amendment + montilla approval. Default: rejected.
- Non-engineering contracts: automation/ops (link-integrity script + compat suite in runbook), people (AGENTS.md hierarchy rules §REQ-011). No separate `API_CONTRACTS.md`.

## 5. Out of Scope

- New flags (`dry-run`, auto-depth ML, output JSON) — YAGNI cut, future proposal only.
- Changing `/init` built-in or `~/.config/opencode/` global config.
- Rewriting other skills (`animate-ui` is reference only, read-only).
- `skills.sh` publication or external versioning.
- `AGENTS.md`/`README.md` edits unless the skill interface changes (then separate work unit + commit).

## 6. Dependencies

- Upstream: `docs/goals/GOAL-init-deep-rewrite.md` (approved 2026-09-27, commit 72fb6f4).
- Reference read-only: `skills/animate-ui/SKILL.md` + `skills/animate-ui/references/*` (pattern source, never modified).
- Downstream: `PROPOSAL.md` (next step `frame-ship:propose`), then `check-design` decision note if contract changes, `build`, `review` (6 reviewers + skeptic + run-the-tests), `verify` HANDOFF, `release`.
- Domain reviews: espinoza (automation/ops runbook + parallelism) + santana (people agent-governance) at PROPOSAL/review time, via montilla routing — never sideways.
- Falsifiable bet: if scoring is not reproducible in refs without changing outputs, framing 1 dies → fallback framing 2 (single-file polish) + DECISION note.

## 7. Traceability

| Requirement | Acceptance Criterion | Proposed Change | Evidence |
|-------------|---------------------|-----------------|----------|
| REQ-001 | AC-001 | PROPOSAL.md | `Read` line count ≤80 |
| REQ-002 | AC-001 | PROPOSAL.md | `Glob` 4 refs on disk |
| REQ-003 | AC-001 | PROPOSAL.md | frontmatter diff vs animate-ui |
| REQ-004 | AC-002 | PROPOSAL.md | link-integrity script PASS |
| REQ-005 | AC-003 | PROPOSAL.md | `Grep` contract + 4-line-note valid |
| REQ-006 | AC-007 | PROPOSAL.md | proposal scaling table + no-LSP run |
| REQ-007 | AC-004 | PROPOSAL.md | compat test log |
| REQ-008 | AC-004 | PROPOSAL.md | scoring fixture diff empty |
| REQ-009 | AC-004 | PROPOSAL.md | Final Report diff empty |
| REQ-010 | AC-005 | PROPOSAL.md | grep + secret scan log |
| REQ-011 | AC-006 | PROPOSAL.md | fixture hierarchy review PASS |
| REQ-012 | AC-007 | PROPOSAL.md | HANDOFF execution_mode attestation |
