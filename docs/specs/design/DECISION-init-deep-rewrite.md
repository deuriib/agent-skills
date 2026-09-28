# DECISION-init-deep-rewrite: thin router + 4 refs (check-design verdict)

**Date:** 2026-09-28
**Deciders:** vasquez (Engineering Lead, design verdict owner)
**Status:** accepted (conditional)
**Spec:** docs/specs/backlog/SPEC-init-deep-rewrite.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007,REQ-008,REQ-009,REQ-010,REQ-011,REQ-012
**Proposal:** docs/specs/work/engineering/PROPOSAL.md (approved, commit 27dc486)
**Design:** docs/specs/design/DESIGN.md (v1, 2026-09-27)
**Pattern (read-only):** skills/animate-ui/SKILL.md (55 lines)
**Current source of truth:** skills/init-deep/SKILL.md (244 lines)
**4-line note:** SPEC:docs/specs/backlog/SPEC-init-deep-rewrite.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007,REQ-008,REQ-009,REQ-010,REQ-011,REQ-012 / HARD:helper agents+pwsh-compatible,project-scope-only,init-untouched,utf8-no-secrets,preserve-depth-flags-oMo / GATE:reviewing / DOMAINS:[engineering, automation/ops, people]
**Verdict:** PASS-with-conditions (CONDITIONAL — build gated, see Conditions)

## Context

`skills/init-deep/SKILL.md` is a single 244-line file (`name/description`-only frontmatter, no refs), violating the `AGENTS.md` mandatory-files rule. PROPOSAL rewrites it as a thin router (≤80 lines) plus exactly 4 local `references/` files, modeled read-only on `skills/animate-ui/SKILL.md`. Behavior (8-factor scoring, depth-cap-after-scoring, `--depth/--max-depth/--create-new` oMo semantics, TodoWrite checkpoints, Final Report) is claimed byte-identical. This note records the check-design gate: component split + cross-domain contract review. It is written to `docs/specs/design/DECISION-init-deep-rewrite.md` per montilla routing (retry 1 of 2); the canonical `docs/specs/decisions/` location is noted as a deviation below.

## Decision

APPROVE the router split as within-and-extending the DESIGN.md v1 contract, subject to the Conditions below. No invariant is broken without record — this note IS the record for the component addition (1 file → 1 router + 4 refs) and the cross-domain interface (engineering/automation-ops/people).

### 1. SKILL router contract change — PASS (conditional)

- Proposed `SKILL.md` (≤80 lines: frontmatter parity + Activation Contract + Hard Rules pointer + Decision Gates + Execution Steps delegating to refs + Output Contract + `## References` with 4 relative paths + IN/OUT/NEXT/STOP) complies with DESIGN INV-001 (≤80 lines, prose lives only in refs), INV-011 (singleton, never suffixed), and SPEC REQ-001/REQ-003/REQ-004/REQ-005.
- Frontmatter parity target (`name/description/license/metadata.author/metadata.version`, `description` starting `Trigger:`, SPDX license, quoted semver) matches `animate-ui/SKILL.md:1-8`; D-004 (animate-ui read-only) is upheld — PROPOSAL declares `skills/animate-ui/**` no-change.
- This ADDS 4 components under check-design §3 (new components → DECISION required); this file satisfies that requirement. No DESIGN.md amendment needed for the 4-base shape — DESIGN v1 §Overview already fixes the 4 names.
- Condition: build must prove T-001/T-002 (≤80 lines, no weight-table/template/`Get-ChildItem` prose in router), T-005 (frontmatter diff), T-006/T-007 (link-integrity 100%, zero absolute paths), T-008 (IN/OUT/NEXT/STOP + gate table + 4-line-note grammar).

### 2. Scoring-matrix verbatim move — PASS (conditional on falsifiable gate)

- Moving the 8-factor matrix + decision rules (`root ALWAYS / >15 / 8–15 distinct-domain / <8 skip`) + cap-after-scoring + `AGENTS_LOCATIONS` schema to `references/scoring-matrix.md` verbatim complies with INV-004 (behavior-preserving; any output delta fails), INV-005 (cap AFTER scoring, `./`=0), REQ-008.
- No contract change: weights, thresholds, sources, and order are preserved, not redesigned. YAGNI (INV-013) upheld — no new flags.
- Condition: T-011 MUST pass before build completes (see §5). Any paraphrase drift = build FAIL.

### 3. Shared AGENTS.md hierarchy rules — PASS (conditional on people sign-off)

- Hierarchy contract (root 50–150 lines, subdir 30–80, child never repeats parent, telegraphic, no generic advice) moves to `references/templates-root-subdir.md` verbatim + Report block verbatim, complying with INV-009, REQ-009/REQ-011.
- Shared cross-domain interface (every future bootstrap consumes it; people domain owns context quality): proposal correctly declares `AGENTS.md`/`README.md` NO-CHANGE this cycle (INV-014, `skills.sh` badge preserved) — no interface change to repo files, only skill-internal relocation.
- Condition: T-012 (Report diff empty), T-014 (fixture sizes + zero-duplicate-paragraphs + review checklist), and E-001 santana written PASS requested via montilla (never sideways). No santana PASS → no build completion.

### 4. 4-vs-5 refs gate (D-002, INV-002, REQ-002) — PASS (default reject upheld)

- 4 base files as decided; PROPOSAL §"4-vs-5" restates the gate verbatim: a 5th file admitted ONLY with name + concrete pain-point + proof the 4 cannot hold it + DESIGN amendment + montilla approval. Proposal claims no 5th file.
- T-003 (Glob exactly 4, 5th = FAIL) + T-004 (zero external URLs, INV-003) enforce it FAIL-closed.
- Condition: build may NOT create a 5th file without returning to `propose` + `check-design` first. Any 5th file on disk without a DESIGN amendment + montilla approval = gate FAIL.

### 5. Falsifiable-bet T-011 (INV-012, REQ-008) — PASS (bet is well-formed; build blocked until won)

- Bet: 8-factor matrix + rules + cap-after-scoring reproduce in refs with zero output change. Fixture suite (≥5 dirs spanning `<8` / `8–15` / `>15` + one over-cap high-score dir) must yield empty `AGENTS_LOCATIONS` diff before-vs-after, and the over-cap high-score dir must be dropped (cap-after-scoring order proof), logged to `docs/specs/work/engineering/evidence/T-011-scoring-diff.log`.
- Kill clause is explicit and correct: if reproduction without output change proves impossible, framing 1 DIES — no build; fallback to framing 2 (single-file polish) via new proposal + DECISION note in `docs/specs/design/` + montilla approval. Build is blocked until T-011 passes.
- This satisfies INV-012 falsifiability. No separate DPIA: no new PII collection (sole touchpoint is Ley 172-13 log hygiene, T-013).

## Consequences

### Positive

- Mandatory-files violation fixed with one canonical entry point; behavior contracts byte-identical and fixture-proven.
- Future skill rewrites inherit the link-integrity + compat + scoring-fixture runbook pattern (automation/ops precedent).
- Hierarchy quality protected team-wide via sizes + no-duplication + telegraphic gates + people sign-off.

### Negative / trade-offs

- Router indirection adds 4 files to audit; link rot risk contained only by T-006 FAIL-closed discipline.
- Helper-agent scaling (max 2 parallel, by-reference) replaces fixed-count explores — needs E-002 HANDOFF attestation to prevent over-parallelism/pasted-file drift (R-005).
- Canonical-path deviation: this note lives at `docs/specs/design/DECISION-init-deep-rewrite.md` per task routing, not `docs/specs/decisions/DECISION-<NNN>-<slug>.md` per check-design §3. `release` archival must handle it explicitly (see Assumptions).

## Conditions for build (all FAIL-closed)

1. T-011 passes (diff empty + over-cap drop proof) before build completes; FAIL kills framing 1 → framing 2 path only.
2. Exactly 4 refs; zero external URLs; link-integrity 100% (T-003/T-004/T-006/T-007).
3. Frontmatter parity + IN/OUT/NEXT/STOP + gates proven (T-001/T-002/T-005/T-008).
4. Flag-compat suite green incl. reverse-order last-wins (T-010); Report diff empty (T-012); guardrail + secret/PII scan 0 hits (T-013).
5. Hierarchy fixture + checklist green (T-014); E-001 santana PASS and E-002 execution-mode attestation collected via montilla, never sideways.
6. `skills/animate-ui/**`, `AGENTS.md`, `README.md` (badge) untouched; no-LSP fallback exercised with marker `centrality: unmeasured` (T-009).
7. Any 5th file, any scoring/flag/Report delta, or any secret/PII hit blocks build and returns to `propose` + `check-design`.

## Risks (from PROPOSAL, endorsed)

- R-001 scoring drift (Med/High) → contained by verbatim rule + T-011 block. Residual: fixture coverage may miss exotic monorepo shapes; state as known gap.
- R-006 secret/PII echo in fixture logs (Low/High) → contained by T-013 masking + allowlisted evidence. Residual: scanner patterns are allowlist-bound; new secret formats need pattern updates.
- Blast radius note: every future bootstrap consumes this skill — drift silently misplaces AGENTS.md files. Gates above are the containment.

## Assumptions

- PROPOSAL.md at commit 27dc486 is the approved singleton; no repo files were modified in `propose` (only PROPOSAL.md produced).
- DESIGN.md v1 is the canonical singleton; no amendment needed for the 4-base shape.
- `check-security: N/A`立场 accepted at design level (local reads/writes only, no auth/PII store/network/secrets) — sole control T-013; any later SPEC adding stores/exports/flows reopens security-owner review.
- Location deviation accepted for this retry: `docs/specs/design/DECISION-init-deep-rewrite.md` stands in for the canonical decisions path; montilla to confirm archival handling at `release`.
- Cross-domain needs (espinoza runbook/parallelism, santana hierarchy) are REQUESTS to montilla, never sideways handoffs.

## Proof (scoped, no code touched)

- Read: docs/specs/work/engineering/PROPOSAL.md (164 lines); docs/specs/design/DESIGN.md (85 lines, v1); docs/specs/backlog/SPEC-init-deep-rewrite.md (88 lines, REQ-001…012); skills/init-deep/SKILL.md (244 lines); skills/animate-ui/SKILL.md (55 lines, frontmatter 1–8).
- Compared router split vs DESIGN Components/Data Flow/Invariants INV-001…INV-015 and Decisions D-001…D-004; verified 5 gate items above.
- No code modified; no tests executed at this gate (test execution belongs to `build`/`run-the-tests`); evidence paths cited are build-time deliverables.

## Sign-off

- [x] vasquez (engineering/design verdict owner) — PASS-with-conditions as above; does NOT self-approve proposal authorship (final approval by montilla).

## NEXT

Back to montilla with 4-line note: SPEC:docs/specs/backlog/SPEC-init-deep-rewrite.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007,REQ-008,REQ-009,REQ-010,REQ-011,REQ-012 / HARD:helper agents+pwsh-compatible,project-scope-only,init-untouched,utf8-no-secrets,preserve-depth-flags-oMo / GATE:CONDITIONAL / DOMAINS:[engineering, automation/ops, people] — requests: route espinoza (runbook/parallelism) + santana (E-001) reviews; confirm decision-note location for `release` archival.

## Supersedes / Superseded By

- Supplements DESIGN.md D-002; superseded only by a future DECISION amending the 5th-file gate or the falsifiable-bet outcome.
