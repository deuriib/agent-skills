---
name: spec-sdd-crystallize
description: Terminal compaction with crystals, consolidation, snapshots, governance deletes, and bridge sync. Use when sealing verified lessons into long-term memory.
---

# Spec-SDD Crystallize — Terminal Compaction

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Crystallize is the terminal stage. It compacts completed work into crystals,
consolidates tiers, snapshots state, governs deletions, and bridges outward.

---

## 1. Purpose

- Compress completed action chains into compact crystal digests.
- Run tiered consolidation (working → episodic → semantic → procedural) without data loss.
- Snapshot memory state under version control before destructive steps.
- Execute governed deletions with audit reasons.
- Bridge synced state outward to the companion native memory file.

---

## 2. Chain Contract

- Previous: spec-sdd-lessons
- Next: none (terminal stage)

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado. Crystallize only seals PASS-derived lessons.

Handoff contract:

1. Accept lesson references from lessons.
2. Snapshot before any destructive operation.
3. Report the sealed digest; no forwarding (terminal).

---

## 2b. Role Binding (Org)

- **Bound to:** maintenance (the agentmemory plugin's session-end consolidation)
  plus explicit manual seals from the owning C-level or montilla on epic close.
- **Binding rule:** snapshot before any destructive step; terminal stage —
  report the sealed digest and stop. Never forward; never seal FAIL-derived
  state.

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_crystallize | Compress completed action chains into digests | Seal each completed chain |
| memory_consolidate | Run the 4-tier consolidation pipeline (working → episodic → semantic → procedural) | Periodic compaction after crystallization, one tier at a time |
| memory_snapshot_create | Create a git-versioned snapshot | Before deletes, consolidations, and run close |
| memory_governance_delete | Delete memories with audit trail | Governed removals with explicit reason |
| memory_claude_bridge_sync | Sync state to/from the native memory file | Terminal outward bridge per direction flag |

---

## 4. Consulted (Non-Owned)

Crystallize READS but never WRITES these domains. Bare names only:

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
- Audit: `memory_audit`, `memory_diagnose`, `memory_heal`, `memory_insight_list`,
  `memory_patterns`, `memory_profile`, `memory_export`.
- Learning: `memory_lesson_save`, `memory_lesson_recall`, `memory_lesson_delete`,
  `memory_team_share`, `memory_team_feed`, `memory_obsidian_export`.

---

## 5. Workflow

1. **Collect** — Gather lesson references and completed action ids from lessons.
2. **Snapshot** — Create a versioned snapshot before any compaction or delete.
3. **Crystallize** — Compress each completed chain into a digest.
4. **Consolidate** — Run the tiered pipeline to merge working → episodic → semantic → procedural.
5. **Govern** — Execute governed deletes only with explicit reasons, post-snapshot.
   Purga expired/TTL-elapsed memories and crystals; never persist PII — no PII
   in crystals, consolidations, snapshots, or bridge payloads.
6. **Bridge** — Sync outward per direction flag as the final step.
7. **Report** — Emit the sealed digest (crystals + snapshot id + bridge result).

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Delete before snapshot** | Irreversible loss with no restore point | Snapshot first, always |
| **Premature crystallization** | Sealing incomplete or failed chains | Crystallize PASS-derived completions only |
| **Consolidate without crystals** | Merging raw noise into semantic tier | Crystallize first, then consolidate |
| **PII in crystals** | Personal data sealed into long-term digests | Exclude PII pre-crystallization; purga TTL-expired state under Ley 172-13 |
| **Reasonless deletes** | Governance trail with no reason | Require a reason on every governed delete |
| **Bridge drift** | Native file and memory diverging | Bridge as the terminal step, verify direction |
| **Non-terminal forwarding** | Treating crystallize as a mid-chain stage | Report and stop; there is no Next |

---

## 7. Checklist

- [ ] 1. Lesson references + completed action ids collected?
- [ ] 2. Versioned snapshot created before compaction/deletes?
- [ ] 3. Chains compressed into crystal digests?
- [ ] 4. Tiered consolidation run after crystallization (working → episodic → semantic → procedural)?
- [ ] 5. Governed deletes reasoned and post-snapshot only (TTL purga applied, no PII retained)?
- [ ] 6. Bridge sync completed with direction verified?
- [ ] 7. Sealed digest reported (terminal — no forwarding)?
