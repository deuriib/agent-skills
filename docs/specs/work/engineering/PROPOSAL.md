# Proposed Changes: vasquez (Engineering Lead)

**Spec Reference:** docs/specs/backlog/SPEC-init-deep-rewrite.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007,REQ-008,REQ-009,REQ-010,REQ-011,REQ-012
**Agent:** vasquez (Engineering Lead)
**Date:** 2026-09-27
**Execution_Mode:** helper agents (inherited from spec, frozen at agree-the-goal; trivial <15 lines goes by CEO small-task shortcut checkpoint-only, outside methodology)
**Domains-Touched:** [engineering, automation/ops, people]
**4-line note:** SPEC:docs/specs/backlog/SPEC-init-deep-rewrite.md#REQ-001,REQ-002,REQ-003,REQ-004,REQ-005,REQ-006,REQ-007,REQ-008,REQ-009,REQ-010,REQ-011,REQ-012 / HARD:helper agents+pwsh-compatible,project-scope-only,init-untouched,utf8-no-secrets,preserve-depth-flags-oMo / GATE:reviewing / DOMAINS:[engineering, automation/ops, people]

## Summary

Rewrite `skills/init-deep/SKILL.md` (244 lines, single file, `name/description`-only frontmatter, no refs) into a thin router skill (≤80 lines: contract + router + References) plus exactly 4 local `references/` files, modeled read-only on `skills/animate-ui/SKILL.md` (55 lines). Scoring, depth-cap, flags/oMo alias, TodoWrite checkpoints, and Final Report text are preserved byte-identical; delegation changes from fixed-count explore agents to size-scaled helper agents (max 2 parallel) with a defined no-LSP fallback.

Repo files stay untouched during this step: only this `PROPOSAL.md` is produced and (by montilla) committed.

## Changes

| Target | Change Type | Description |
|--------|-------------|-------------|
| `skills/init-deep/SKILL.md` | file-modify | Rewrite to thin router ≤80 lines: frontmatter parity (REQ-003), Activation Contract, Hard Rules pointer, Decision Gates table, Execution Steps delegating to refs, Output Contract, `## References` with 4 relative paths, IN/OUT/NEXT/STOP block (REQ-001, REQ-005) |
| `skills/init-deep/references/workflow.md` | file-create | 4 phases + TodoWrite checkpoints + helper-agents scaling table + LSP→Grep fallback chain (REQ-005, REQ-006, REQ-012) |
| `skills/init-deep/references/scoring-matrix.md` | file-create | 8-factor weights/thresholds/sources + decision rules + cap-after-scoring + `AGENTS_LOCATIONS` schema, verbatim (REQ-008) |
| `skills/init-deep/references/templates-root-subdir.md` | file-create | Root (50–150) + subdir (30–80) templates + Final Report block verbatim + hierarchy/no-duplication rules (REQ-009, REQ-011) |
| `skills/init-deep/references/guardrails-pwsh-lsp.md` | file-create | 6 hard guardrails verbatim + pwsh-native-first table + Edit-vs-Write (REQ-010) |
| `skills/animate-ui/**` | no-change | Read-only pattern source; never modified (SPEC §5) |
| `AGENTS.md` / `README.md` | no-change | Untouched: no skill-interface change in this cycle (REQ-012); `skills.sh` badge preserved |
| `docs/specs/design/DESIGN.md` | no-change | Singleton already consolidated at v1; amended only if a 5th ref passes the gate below (default: rejected) |

Change types per `proposal-template.md`: engineering rows use `file-*`; people/automation-ops rows use evidence rows in the Test Plan.

## Rationale

Each change traces to its REQ: the router split (REQ-001/002) fixes the `AGENTS.md` mandatory-files violation while keeping one canonical entry point; frontmatter parity (REQ-003) and link-integrity (REQ-004) make the skill repo-compliant and verifiable; the contract block (REQ-005) makes the skill operable via frame-ship; the scaling table + fallback (REQ-006) removes the fixed-agent-count and LSP assumptions; verbatim moves of flags (REQ-007), scoring (REQ-008), Report (REQ-009), and guardrails (REQ-010) keep behavior byte-identical; hierarchy rules (REQ-011) and frozen execution mode (REQ-012) carry the people and process contracts.

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Single-file polish (GOAL framing 2: trim + frontmatter fix in place) | Still violates mandatory `references/` rule; kept only as fallback if the falsifiable bet fails (REQ-008 gate) |
| Full redesign with features (GOAL framing 3: dry-run, auto-depth ML, JSON) | Scope creep, breaks oMo compat, needs new threat model; deferred to a separate future proposal (SPEC §5 YAGNI) |
| 5-reference split (e.g. separate `flags-compat.md`) | No concrete pain point: flags fit in workflow gates, scoring fits in scoring-matrix; default rejected per D-002 |

## 4-vs-5 references decision (D-002, REQ-002)

4 base, as decided. A 5th file is admitted only with ALL of: name + concrete pain-point + written proof the 4 cannot hold it + DESIGN amendment + montilla approval. This proposal claims no 5th file and `build` may not create one without returning to `propose` + `check-design` first.

## Helper-agents scaling table (REQ-006, REQ-012)

To be encoded verbatim in `references/workflow.md`:

| Size signals | Helper-agent lanes | Max parallel |
|--------------|--------------------|--------------|
| Small (<50 files, 1 language, depth ≤2) | 1 lane (structure+conventions combined) | 1 |
| Medium (50–300 files, or 2–3 languages, or 1 monorepo package) | 2 lanes (structure/entry-points; conventions/anti-patterns+build-CI) | 2 |
| Large (>300 files, or >3 languages, or ≥2 monorepo packages, or depth >4) | 2 lanes, sequenced waves (wave 1: structure+entry-points; wave 2: conventions+test-patterns) | 2 (never 3+) |

Rules: count never fixed; lanes take at most 2 areas in parallel; handoffs by reference (paths only, never pastes); every lane result collected before scoring; TodoWrite `in_progress → completed` in real time (preserved verbatim). No-LSP fallback chain: `lsp_symbols`/`lsp_find_references` when available, else emit `centrality: unmeasured` and score Reference-centrality from `Grep` + explore output; Symbol-density falls back to `Grep` export counts.

## Falsifiable-bet gate (REQ-008)

Bet: the 8-factor matrix + rules + cap-after-scoring reproduce in `references/scoring-matrix.md` with zero output change (T-011). Fixture suite (≥5 dirs spanning `<8` / `8–15` / `>15` + one over-cap high-score dir) must produce identical `AGENTS_LOCATIONS` before vs after (diff empty), and the over-cap high-score dir must be dropped (order proof). If reproduction without output change proves impossible, framing 1 DIES: no `build`, fallback to framing 2 (single-file polish) via a new proposal + DECISION note in `docs/specs/design/` + montilla approval. `build` is blocked until T-011 passes.

## Test Plan

> Frozen at approval. `build` executes it (results in `docs/specs/work/engineering/TESTS.md`); it never re-authors it. No plan → no approval.

### REQ-ID to Test Mapping

| REQ-ID | Test ID | Scope / Path | Test Type | Expected Behavior / Boundary Checked |
|---|---|---|---|---|
| REQ-001 | T-001 | `skills/init-deep/SKILL.md` (Read line count + Glob) | Architecture (fitness) | Total ≤80 lines incl. blanks; Glob shows SKILL.md + 4 refs; negative: scoring-weight table absent |
| REQ-001 | T-002 | `skills/init-deep/SKILL.md` (Grep) | Architecture (fitness) | Zero hits for weight table (`3x`), root/subdir template body (`## OVERVIEW`), `Get-ChildItem` block |
| REQ-002 | T-003 | `skills/init-deep/references/` (Glob) | Architecture (fitness) | Exactly the 4 paths, no more, no fewer; edge: 5th file = FAIL |
| REQ-002 | T-004 | SKILL.md + 4 refs (Grep `https?://`) | Architecture (fitness) | Zero external URLs; local paths only |
| REQ-003 | T-005 | SKILL.md frontmatter vs `skills/animate-ui/SKILL.md:1-8` (diff) | Contract | Same keys (`name/description/license/metadata.author/metadata.version`); `description` starts `Trigger:`; `license` valid SPDX; `version` quoted semver; negative: `name/description`-only = FAIL |
| REQ-004 | T-006 | pwsh link-integrity script → `docs/specs/work/engineering/evidence/T-006-link-integrity.log` | Integration | Parse `## References` backticked `references/*.md` paths + `Test-Path` each; `N/N exist`, exit 0 |
| REQ-004 | T-007 | SKILL.md + refs (Grep absolute paths) | Architecture (fitness) | Zero hits for `D:\` / `D:/`; negative: one absolute path = FAIL |
| REQ-005 | T-008 | `skills/init-deep/SKILL.md` (Grep + review) | Contract | All four `IN/OUT/NEXT/STOP` headings hit; gate table has entry/exit per phase; scoring gate requires `AGENTS_LOCATIONS` before generate; 4-line-note example validates against DESIGN grammar |
| REQ-006 | T-009 | No-LSP dry run → `docs/specs/work/engineering/evidence/T-009-no-lsp-run.log` | Resilience | Discovery completes with LSP disabled; `centrality: unmeasured` marker present; TodoWrite checkpoint rule verbatim (diff vs current SKILL.md:93-99) |
| REQ-007 | T-010 | Flag-compat suite on 4-deep fixture → `docs/specs/work/engineering/evidence/T-010-flag-compat.log` | Regression | Default cap 3; `--depth=2` caps at 2; `--max-depth=2` identical; `--depth=5 --max-depth=2` → 2 and reverse → 5 (last wins); `--create-new` log shows read-before-delete; `./`=0 never exceeded |
| REQ-008 | T-011 | Scoring fixture suite (≥5 dirs + over-cap) → `docs/specs/work/engineering/evidence/T-011-scoring-diff.log` | Regression (falsifiable gate) | `AGENTS_LOCATIONS` diff before/after empty; over-cap high-score dir dropped (cap-after-scoring order); FAIL kills framing 1 → framing 2 + DECISION note |
| REQ-009 | T-012 | Report block diff + HANDOFF | Regression | `diff` old-vs-new Report block empty (or trim-only diff + green T-010/T-011 recorded here); same-fixture Report identical pre/post |
| REQ-010 | T-013 | Guardrail suite → `docs/specs/work/engineering/evidence/T-013-guardrails.log` | Security | `find/sed/awk` hits only in FORBIDDEN-listing; `~/.config/opencode` only in never-modify rule; secret scan (`sk-\|ghp_\|AKIA\|token\s*=`) zero hits; fixture run honors Edit-vs-Write; no PII/secrets in logs (Ley 172-13) |
| REQ-011 | T-014 | Fixture generation (root + 2 subdirs) → `docs/specs/work/engineering/evidence/T-014-hierarchy.log` | Contract | Root 50–150, subdirs 30–80 lines; parent-vs-child diff zero duplicated paragraphs; review checklist (generic-advice/parent-dupes/sizes/telegraphic) signed |
| REQ-011 | E-001 | `docs/specs/work/engineering/evidence/E-001-santana-signoff.md` | Attestation | santana (people) written PASS on hierarchy rules; requested via montilla, never sideways |
| REQ-012 | E-002 | `docs/specs/work/engineering/evidence/E-002-execution-mode.md` | Attestation | HANDOFF attests `helper agents` + max-2-parallel + by-reference; no step bypasses agents; `AGENTS.md`/`README.md` untouched with badge intact |

### Declared Coverage Floors

| Metric | Floor Declared | Scope / Justification |
|---|---|---|
| Line | N/A with justification | Non-code skill docs (Markdown); no executable statements to cover |
| Branch | N/A with justification | Same as above; decision logic verified by fixture diffs, not branches |
| Function | N/A with justification | Same as above |
| REQ→Test trace | 100% (12/12 REQs, 14 tests + 2 attestations) | P0 acceptance per SPEC §3 AC-001…AC-007 |
| Link-integrity | 100% (N/N refs resolve) | REQ-004 FAIL-closed |
| Secret/PII scan | 0 hits | REQ-010 + Ley 172-13 FAIL-closed |
| Unit suite runtime | N/A (pwsh verification scripts run non-interactive, no profile; each check <30s) | Skill repo has no `tests/` harness; logs are the evidence |

### Test Environment & Setup

- **Prerequisites:** Windows pwsh 7+ non-interactive (`-NoProfile`), repo workdir `D:\2-Areas\GitHub\agent-skills`; native `Glob/Grep/Read` preferred, pwsh fallback only.
- **Environment Variables:** none required; never real credentials or PII in fixtures, logs, or commits.
- **Cleanup & Isolation:** fixtures under `C:\Users\deuri\AppData\Local\Temp\opencode\init-deep-compat\` (pre-approved temp); `Remove-Item -Recurse` after each suite; UTF-8 throughout; no `sleep()` — condition-based waits only; LSP-disabled run via unavailable-symbols path (no config mutation).

## Risk Assessment

### Risk Matrix

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-001 | Scoring drift during move (weights/thresholds paraphrased, outputs change) | Med | High | Verbatim-move rule + T-011 falsifiable gate blocks `build`; fallback framing 2 + DECISION note |
| R-002 | Flag-semantics drift (`--depth`/`--max-depth` last-wins, `./`=0, read-before-delete) | Low | High | T-010 compat suite on 4-deep fixture incl. reverse-order case |
| R-003 | Dangling `## References` link after split | Med | Med | T-006/T-007 FAIL-closed; `build` records log in evidence/ |
| R-004 | 5th-file scope creep during `build` | Med | Low | D-002 gate: any 5th file returns to `propose` + `check-design` + montilla approval |
| R-005 | Helper-agent over-parallelism (>2 lanes, pasted files) | Low | Med | Scaling table + by-reference rule in workflow.md; E-002 HANDOFF attestation |
| R-006 | Secret/PII leak via fixture logs (scanned repo content echoed) | Low | High | T-013 scan + masking rule; allowlisted evidence only; Ley 172-13 72h breach clause acknowledged |
| R-007 | `AGENTS.md`/`README.md` touched unnecessarily (badge lost, churn) | Low | Med | No-change rows above; E-002 verifies badge + untouched state |

### What else could break

- **Engineering:** every future repo bootstrap consumes this skill; a scoring/flag drift silently misplaces `AGENTS.md` files across projects. Blast radius is all downstream repos, not just this one — contained by T-010/T-011/T-012 gates before `build` completes.
- **Automation/ops:** link-integrity script and compat suite become the runbook pattern for future skill rewrites; a weak harness here weakens that precedent. Espinoza review requested via montilla.
- **People:** hierarchy-rule drift (parent duplication, size-band breach) degrades agent context quality team-wide. Santana review requested via montilla (E-001).
- **Customers/regulators/revenue:** no customer-facing surface, no new data store/export/cross-border flow, no pricing or pipeline change. Sole regulatory touchpoint is Ley 172-13 hygiene in logs (R-006, T-013). No DPIA triggered: no new PII collection.
- **Brand/GTM:** none (internal skill, no publication; `skills.sh` out of scope).

### Rollback Plan

Code: `git revert` the `build` commit(s) restoring single-file `SKILL.md` (244-line source of truth at commit `72fb6f4` lineage); delete `references/` if created; re-run T-006 + T-011 to confirm restored state. Owner: vasquez. ETA: <1h. Non-code: void E-001/E-002 attestations in HANDOFF; notify montilla same session. No external undo needed (no sends/filings/launches).

### Security Considerations

Posture unchanged (local reads/writes, no auth, no network, no secrets). `check-security`: **N/A** — no login, no PII store, no external API, no cross-border flow added; sole control is the no-secrets scan (T-013, 0-hits floor). If a later SPEC adds stores/exports/flows, security-owner review becomes mandatory.

### Domain Considerations

- **Automation/ops (espinoza):** link-integrity script + compat/fixture harness runnable pwsh non-interactive; parallelism capped at 2. Review requested via montilla.
- **People (santana):** hierarchy contract (sizes, no-duplication, telegraphic) + helper-agents governance. E-001 sign-off requested via montilla.
- **Finance / Legal / Marketing / Revenue:** untouched — no budget, vendor, filing, claim, or pricing change. No reviews required; no separate contracts.

## Reviews

- `check-design`: **REQUIRED** — skill contract/component split + shared cross-domain interface (engineering/automation-ops/people) + DESIGN D-002 gate. Routed via montilla after proposal approval.
- `check-security`: **N/A** — justification above (no auth/data/API/PII surface change). Recorded as decision, not skip.
- Domain reviews via montilla (never sideways): espinoza (runbook/parallelism), santana (E-001 hierarchy).

## Approval Required From

- [ ] montilla (coordinator/CEO) — decision authority + routes espinoza/santana reviews + commits proposal
- [ ] espinoza (automation/ops) — runbook + scaling/fallback review
- [ ] santana (people) — hierarchy rules review (E-001)
- [ ] vasquez (engineering/owning lead) — proposal author; does NOT self-approve (approval recorded by montilla)
- [ ] Test Plan present and covering every REQ-ID (12/12: T-001…T-014 + E-001/E-002 per table above)

> **Rule:** No repository file modifications during proposal phase. Only this `PROPOSAL.md` is produced; `skills/*`, `AGENTS.md`, `README.md` stay intact (verified: `skills/init-deep/` still holds only `SKILL.md`, 244 lines).

## C2 challenge hook

- Trigger checklist — fires on ANY: auth/data/API/PII surface (none, T-013 only); **multi-domain scope (FIRES: engineering + automation/ops + people)**; what-else-could-break mentioning customers/regulators/revenue — synonym scan FIRES on the Ley 172-13 regulatory line above even though the change is internal-only; approver request.
- One-pass budget: exactly one budgeted round per trigger (pass = ≤3 questions; question 4/N+1 = FAIL, blocked), then terminal approve/reject; approver-requested re-grill ≤1 extra pass (total ≤2), then Retry N=2 → escalate montilla; pause/exit offered after the round. Exit before decision = pause + recorded `grill: exited` + escalate, proposal stays unapproved (no silent promote).
- Masking reminder: grill prompt + every export carry the masking clause ("Por tu privacidad: no compartas PII/secretos/tokens en esta ronda; enmascaramos todo export (Ley 172-13)."); allowlisted evidence only.
- Single source: glossary in `agree-the-goal` C1; canonical grill wording in people SPEC §4 inserts — this hook points there, never redefines.
- Untouched rule: repo files AND external sends/filings/launches stay untouched during the round.
