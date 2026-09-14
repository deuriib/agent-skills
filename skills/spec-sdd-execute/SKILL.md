---
name: spec-sdd-execute
description: Evidence-backed execution with facet queries, provenance, and commit linkage. Use when claiming leased actions and producing verifiable outputs.
---

# Spec-SDD Execute — Evidence-Backed Execution

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Execute claims leased work and leaves a provenance trail verify can audit:
faceted evidence, compressed context, timelines, verification chains, and commit links.

---

## 1. Purpose

- Claim leased DAG nodes and produce the smallest green implementation.
- Query faceted evidence to scope each unit precisely.
- Compress large context files without losing headings and links.
- Reconstruct timelines and verify citation chains for every claim.
- Link outputs to commits and visual evidence where applicable.
- Absorb verify FAIL retries (N=2) before escalation to delgado.

---

## 2. Chain Contract

- Previous: spec-sdd-tasks
- Next: spec-sdd-verify

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado. Execute must keep retries idempotent and bounded.

Handoff contract:

1. Accept the DAG head + checkpoint map from tasks.
2. Produce evidence-linked outputs per claimed node.
3. Forward artifacts + provenance pointers to verify. Never self-approve.

---

## 2b. Role Binding (Org)

- **Bound to:** the leaf specialist executing the unit (e.g. `backend`,
  `tax-specialist`, `copywriter`, `security`), plus `espinoza` (leaf automation
  owner) and `general` (admin fast-path and non-domain units).
- **Binding rule:** the specialist claims the leased action, scopes via facets,
  produces evidence-linked output, and hands artifacts + provenance pointers to
  verify. Never self-approves; never carries context in its responses —
  references only (actionId + spec label), the state lives in

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_facet_query | Query targets by facet tags (AND/OR) | Scope each unit to its tagged nodes |
| memory_compress_file | Compress a markdown file preserving headings and links | Large context that must fit the window |
| memory_vision_search | Cross-modal image search via embeddings | Visual evidence and UI states |
| memory_timeline | Chronological observations around an anchor | Reconstruct what happened before/after a point |
| memory_verify | Trace a citation chain to its source | Prove every claim before handing to verify |
| memory_commits | List commits linked to agent sessions | Find candidate outputs for a branch or repo |
| memory_commit_lookup | Look up sessions that produced a commit SHA | Tie a SHA back to its authoring session |

---

## 4. Consulted (Non-Owned)

Execute READS but never WRITES these domains. Bare names only:

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
- Audit: `memory_audit`, `memory_diagnose`, `memory_heal`, `memory_insight_list`,
  `memory_patterns`, `memory_profile`, `memory_export`.
- Learning: `memory_lesson_save`, `memory_lesson_recall`, `memory_lesson_delete`,
  `memory_team_share`, `memory_team_feed`, `memory_obsidian_export`.
- Crystallization: `memory_crystallize`, `memory_consolidate`,
  `memory_snapshot_create`, `memory_governance_delete`, `memory_claude_bridge_sync`.

Rule: status moves and lease operations on the DAG belong to tasks; execute
requests them via signal instead of writing them directly.

---

## 5. Workflow

1. **Scope** — Query facets for the claimed node; compress oversized context first
   (preserve headings and links). Never paste PII into code, evidence, or provenance.
2. **Claim** — Work only under an explicit lease context provided by tasks.
3. **Implement minimal** — Smallest green step per node; no speculative scope.
4. **Provenance** — Build the timeline, trace citation chains, and link commits.
5. **Visual check** — Search visual evidence when the output has a visible surface.
6. **Hand off** — Forward artifacts + provenance pointers to verify.
7. **Retry** — On verify FAIL, apply the cited fix and re-submit; hard stop at N=2,
   then let verify escalate to delgado.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Unscoped work** | Implementing without facet scoping | Query facets first, then code |
| **Unproven claims** | Outputs with no citation chain | Trace every claim to its source |
| **Context bloat** | Pasting whole files into the window | Compress first, preserve headings/links |
| **Self-approval** | Skipping verify after implementation | Always forward to verify |
| **Infinite retry** | Retrying past N=2 | Stop at 2; let verify escalate to delgado |
| **Orphan commits** | SHAs with no session linkage | Look up and record the link for every SHA |

---

## 7. Checklist

- [ ] 1. Unit scoped via facet query (AND/OR as needed)?
- [ ] 2. Oversized context compressed with structure preserved?
- [ ] 3. Minimal green implementation (no speculative scope)?
- [ ] 4. Timeline reconstructed around the change anchor?
- [ ] 5. Citation chains traced for every claim?
- [ ] 6. Commits linked (list + SHA lookup) and artifacts forwarded to spec-sdd-verify?
- [ ] 7. Retries bounded at N=2 with escalation to spec-sdd-delgado via verify?
