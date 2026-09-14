---
name: spec-sdd-specify
description: Durable spec authoring via memory slots. Owns slot lifecycle and explicit saves. Use when creating, reading, or evolving the frozen spec all downstream stages consume.
---

# Spec-SDD Specify — Durable Spec Slots

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Specify freezes intent into durable slots. Every downstream stage reads the spec;
only specify writes it.

---

## 1. Purpose

- Create the canonical spec slot for a work item (labels, pinned scope, size limits).
- Evolve spec content through explicit replace/append — never silent mutation.
- Expose slot reads and listings for plan, tasks, and execute.
- Persist cross-cutting decisions as explicit long-term saves.
- Delete only truly obsolete spec slots, with audit intent.
- Validate every slot write and keep PII out of durable state (Ley 172-13).

---

## 2. Chain Contract

- Previous: spec-sdd-delgado
- Next: spec-sdd-plan

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado (not to specify directly).

Handoff contract:

1. Accept the routing packet from delgado.
2. Freeze or update the spec slot; never start sketching or tasking here.
3. Forward the slot label + version to plan.

---

## 2b. Role Binding (Org)

- **Bound to:** the owning C-level of the domain unit (`vasquez`, `dauhajre`,
  `subero`, `vera`, `santana`, `barrera`, `montero`), or `espinoza` for
  automation units (self-specifies).
- **Binding rule:** the C-level freezes intent received from montilla's routing
  packet into slot `spec_<topic>` and reads the slot before every downstream
  handoff. It OWNS this stage — never dispatches it. Minimizing prompts means
  the slot holds the context; the C-level only passes label + version.

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_slot_create | Create a new slot | New spec, label, pinned scope, size limit |
| memory_slot_get | Read a single slot by label | Downstream reads; pre-edit verification |
| memory_slot_list | List all slots (pinned + project + global) | Discover existing specs before creating |
| memory_slot_replace | Replace slot content in place | Frozen revision bump, full rewrite |
| memory_slot_append | Append text to an existing slot | Additive constraint or acceptance criterion |
| memory_slot_delete | Delete a slot | Obsolete spec only, after downstream confirms |
| memory_save | Explicitly save an insight or decision | Cross-cutting rationale the slot body should not hold; type allowlist: pattern, preference, architecture, bug, workflow, fact |

## 3b. Slot Validation and Privacy (Ley 172-13)

Single owner means single gate: every slot write is validated here.

- Label format: lowercase, starts with a letter, charset `[a-z0-9_]`; reject
  anything else before calling the create tool.
- Caps: `sizeLimit` default 2000 chars, hard cap 20000 — replace fails past
  the cap, so keep specs small and split by label instead of stuffing.
- Scope values: `project` (default) or `global`; `pinned` defaults to true
  (`false` excludes the slot from context injection).
- TTL and purga: slots carry an expiry intent (TTL). Re-list periodically;
  purga obsolete slots via the owned delete tool and signal crystallize for
  governed purges (`memory_governance_delete`) — snapshot first, reason always.
- PII exclusion: never store PII in slots, saves, or logs — no cédula,
  passport, phone, email body, health, or biometric data. If PII arrives in
  the routing packet, strip it and keep only the label + version reference.
  No PII is persisted here, ever.

---

## 4. Consulted (Non-Owned)

Specify READS but never WRITES these domains. Bare names only:

- Orchestration: `memory_next`, `memory_frontier`, `memory_signal_send`,
  `memory_signal_read`, `memory_routine_run`, `memory_sessions`, `memory_mesh_sync`.
- Planning: `memory_sketch_create`, `memory_sketch_promote`, `memory_graph_query`,
  `memory_relations`, `memory_reflect`, `memory_recall`, `memory_smart_search`,
  `memory_file_history`.
- Task DAG: `memory_action_create`, `memory_action_update`, `memory_lease`,
  `memory_checkpoint`, `memory_sentinel_create`, `memory_sentinel_trigger`,
  `memory_facet_tag`.
- Evidence: `memory_facet_query`, `memory_compress_file`, `memory_vision_search`,
  `memory_timeline`, `memory_verify`, `memory_commits`, `memory_commit_lookup`.
- Audit: `memory_audit`, `memory_diagnose`, `memory_heal`, `memory_insight_list`,
  `memory_patterns`, `memory_profile`, `memory_export`.
- Learning: `memory_lesson_save`, `memory_lesson_recall`, `memory_lesson_delete`,
  `memory_team_share`, `memory_team_feed`, `memory_obsidian_export`.
- Crystallization: `memory_crystallize`, `memory_consolidate`,
  `memory_snapshot_create`, `memory_governance_delete`, `memory_claude_bridge_sync`.

---

## 5. Workflow

1. **Discover** — List slots; reuse the canonical label when one exists.
2. **Create** — Create the slot with a stable label, description, pinned scope,
   and size limit. Validate label charset, scope, and sizeLimit caps first;
   strip PII before writing. Never use a nonexistent save-style API.
3. **Draft** — Write the smallest frozen spec: goal, non-goals, acceptance criteria.
4. **Evolve** — Replace for revisions, append for additive constraints. Read back
   after every write.
5. **Save rationale** — Persist the why behind frozen choices as an explicit save.
6. **Hand off** — Forward label + version to plan. Delete nothing unless obsolete.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Phantom save API** | Referencing a slot save tool that does not exist | Always create via the slot create tool |
| **Silent mutation** | Editing spec meaning without replace/append trace | Replace for rewrites, append for additions |
| **Slot sprawl** | New label per tweak | Reuse the canonical label; version inside |
| **Spec in signals** | Stuffing full spec into handoff messages | Pass label + version; readers fetch the slot |
| **Premature deletion** | Deleting a slot downstream still reads | Delete only after explicit downstream confirmation |
| **Sketching here** | Exploratory graphs inside specify | Forward to plan for sketch work |
| **PII in slots** | Personal data frozen into durable slots/saves | Strip PII pre-write; slots hold intent, never identities |

---

## 7. Checklist

- [ ] 1. Slot label reused when one already exists (discovery first)?
- [ ] 2. Slot created via the create tool (no phantom save API referenced)?
- [ ] 3. Spec frozen with goal, non-goals, and acceptance criteria?
- [ ] 4. Revisions applied via replace/append with read-back verification?
- [ ] 5. Cross-cutting rationale persisted as an explicit save?
- [ ] 6. Label + version forwarded to spec-sdd-plan?
- [ ] 7. No non-owned tool written directly from this stage?
- [ ] 8. Slot label/scope/sizeLimit validated, TTL/purga intent set, no PII persisted?
