---
name: spec-sdd-verify
description: Independent quality gate with audit, diagnostics, healing, and insights. Owns FAIL to execute retry N=2 then escalate to delgado. Use when gating execute outputs before lessons.
---

# Spec-SDD Verify — Independent Quality Gate

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Verify is the only stage that can FAIL a unit. It audits, diagnoses, heals what
is safely auto-fixable, and either passes forward or fails back with citations.

---

## 1. Purpose

- Audit the trail of operations behind every execute output.
- Diagnose subsystem health (actions, leases, sentinels, sketches, and more).
- Auto-heal only safely fixable findings; never mask real failures.
- Surface synthesized insights, recurring patterns, and profile context.
- Export the audited evidence packet on PASS.
- Own the FAIL → execute retry loop (N=2), then escalate to delgado.

---

## 2. Chain Contract

- Previous: spec-sdd-execute
- Next: spec-sdd-lessons

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule (owned here): on FAIL, return control to
spec-sdd-execute for retry with N=2. Count every FAIL→execute round trip.
After 2 failed retries, escalate to spec-sdd-delgado with the failure dossier
(citations, attempted fixes, and recommended re-route). Never retry a third
time downstream and never escalate sideways.

Handoff contract:

1. Accept artifacts + provenance pointers from execute.
2. PASS → forward the audited packet to lessons.
3. FAIL → cite, return to execute (while retries remain), or escalate to delgado.

---

## 2b. Role Binding (Org)

- **Bound to:** the domain gate reviewers (`finance-reviewer`, `legal-reviewer`,
  `brand-reviewer`, `people-reviewer`, `security-reviewer`, `revenue-reviewer`,
  engineering `review-*` wave + `qa`) for content verdicts — coordinated by the
  owning C-level — while this stage's process audit (audit/diagnose/heal/export)
  runs alongside the domain verdict.
- **Binding rule:** PASS requires BOTH the domain gate APPROVE and this stage's
  audited PASS packet (gate policy, SDD Contract rule 4). FAIL → execute retry
  N=2 → escalate to montilla (delgado). Never sideways.

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_audit | View the audit trail of memory operations | Every gate decision starts here |
| memory_diagnose | Run health checks across subsystems | FAIL triage and pre-PASS sweep |
| memory_heal | Auto-fix fixable issues found by diagnostics | Dry-run first; heal only safe findings |
| memory_insight_list | List synthesized higher-order insights | Context for borderline PASS/FAIL calls |
| memory_patterns | Detect recurring patterns across sessions | Systemic failure vs. one-off distinction |
| memory_profile | Project profile with concepts and file patterns | Ground severity in project reality |
| memory_export | Export the scoped evidence packet as JSON (never a full dump) | PASS only: allowlisted fields for the gated unit, PII excluded |

---

## 4. Consulted (Non-Owned)

Verify READS but never WRITES these domains. Bare names only:

- Orchestration: `memory_next`, `memory_frontier`, `memory_signal_send`,
  `memory_signal_read`, `memory_routine_run`, `memory_sessions`, `memory_mesh_sync`.
- Spec: `memory_slot_create`, `memory_slot_get`, `memory_slot_list`,
  `memory_slot_replace`, `memory_slot_append`, `memory_slot_delete`, plus `memory_save`.
- Planning: `memory_sketch_create`, `memory_sketch_promote`, `memory_graph_query`,
  `memory_relations`, `memory_reflect`, `memory_recall`, `memory_smart_search`,
  `memory_file_history`.
- Task DAG: `memory_action_create`, `memory_action_update`, `memory_lease`,
  `memory_checkpoint`, `memory_sentinel_create`, `memory_sentinel_trigger`,
  `memory_facet_tag`.
- Evidence: `memory_facet_query`, `memory_compress_file`, `memory_vision_search`,
  `memory_timeline`, `memory_verify`, `memory_commits`, `memory_commit_lookup`.
- Learning: `memory_lesson_save`, `memory_lesson_recall`, `memory_lesson_delete`,
  `memory_team_share`, `memory_team_feed`, `memory_obsidian_export`.
- Crystallization: `memory_crystallize`, `memory_consolidate`,
  `memory_snapshot_create`, `memory_governance_delete`, `memory_claude_bridge_sync`.

---

## 5. Workflow

1. **Audit** — Pull the operation trail for the unit under gate.
2. **Diagnose** — Run health checks scoped to the affected subsystems.
3. **Pattern check** — Compare against recurring patterns, insights, and profile.
4. **Heal (safe only)** — Dry-run, then heal trivially safe findings; re-audit after.
5. **Verdict** —
   - PASS → build the scoped export packet (allowlist of audited fields for
     this unit only — audit pointers, diagnosis entries, healed findings,
     pattern/profile citations), exclude all PII, then forward to lessons.
   - FAIL → cite the exact failed criterion with audit pointers.
6. **Retry loop** — FAIL returns to spec-sdd-execute while attempts remain (N=2).
7. **Escalate** — After 2 failed retries, escalate to spec-sdd-delgado with the
   full dossier. Stop; do not retry downstream again.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Silent PASS** | Approving without an audit trail | Start every verdict from the audit view |
| **Heal-and-hide** | Auto-fixing a real failure into a PASS | Heal safe findings only; FAIL the rest with citations |
| **Third retry** | FAIL→execute more than N=2 times | Escalate to delgado after 2 |
| **Sideways escalation** | Sending exhaustion to specify/plan/tasks | Escalate only to spec-sdd-delgado |
| **Uncited FAIL** | Rejecting without pointers | Cite audit + diagnosis entries on every FAIL |
| **Export skip** | PASS with no evidence packet | Export before forwarding to lessons |
| **Full-dump export** | Exporting all memory data incl. PII on PASS | Scoped export only: allowlisted unit fields, PII excluded (Ley 172-13) |

---

## 7. Checklist

- [ ] 1. Audit trail pulled for the unit under gate?
- [ ] 2. Diagnostics run across affected subsystems?
- [ ] 3. Patterns, insights, and profile consulted for severity?
- [ ] 4. Safe findings healed via dry-run first (no failure masking)?
- [ ] 5. Verdict cited: PASS with scoped evidence packet (allowlist, PII excluded), or FAIL with pointers?
- [ ] 6. FAIL→spec-sdd-execute retries bounded at N=2?
- [ ] 7. Retry exhaustion escalated to spec-sdd-delgado with full dossier?
