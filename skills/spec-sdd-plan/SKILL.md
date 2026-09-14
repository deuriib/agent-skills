---
name: spec-sdd-plan
description: Exploratory planning with sketches, graph context, and recall. Owns sketch lifecycle and pre-task research. Use when turning a frozen spec into a promotable plan.
---

# Spec-SDD Plan — Sketches, Graph, and Recall

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Plan explores cheaply and promotes only what survives contact with history,
graph context, and file reality.

---

## 1. Purpose

- Explore candidate decompositions as ephemeral sketches.
- Ground options in graph relations, reflection clusters, and past recall.
- Check file history before proposing changes to critical paths.
- Promote exactly one sketch into the durable task graph.
- Leave no exploratory residue: sketches either promote or expire.

---

## 2. Chain Contract

- Previous: spec-sdd-specify
- Next: spec-sdd-tasks

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado.

Handoff contract:

1. Accept the slot label + version from specify.
2. Research and sketch; promote at most one sketch.
3. Forward the promoted plan reference to tasks.

---

## 2b. Role Binding (Org)

- **Bound to:** the owning C-level (or `espinoza` for automation units).
- **Binding rule:** the C-level sketches candidate decompositions and promotes
  exactly one; montilla never sketches and specialists never plan. Research
  (recall, graph, file history) runs before any sketch so the plan reflects
  reality, not guesses.

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_sketch_create | Create an ephemeral action graph | Each candidate decomposition |
| memory_sketch_promote | Promote sketch actions to permanent actions | The single winning sketch only |
| memory_graph_query | Query the knowledge graph | Entity/relationship grounding for options |
| memory_relations | Query the memory relationship graph | Hop-limited context around a key memory |
| memory_reflect | Cluster related memories by concept | Find the themes the plan must respect |
| memory_recall | Search past session observations | Exact-context lookup before deciding |
| memory_smart_search | Hybrid semantic + keyword search | Fuzzy lookup when exact recall misses |
| memory_file_history | Get past observations about files | Mandatory before touching critical files; empty result is the normal path |

Note on file history: an empty result is not an error — it means no prior
observations exist and the plan proceeds on spec + graph evidence alone.

---

## 4. Consulted (Non-Owned)

Plan READS but never WRITES these domains. Bare names only:

- Orchestration: `memory_next`, `memory_frontier`, `memory_signal_send`,
  `memory_signal_read`, `memory_routine_run`, `memory_sessions`, `memory_mesh_sync`.
- Spec: `memory_slot_create`, `memory_slot_get`, `memory_slot_list`,
  `memory_slot_replace`, `memory_slot_append`, `memory_slot_delete`, plus `memory_save`.
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

1. **Read spec** — Fetch the frozen slot by label; never re-author it here.
2. **Recall** — Search exact history, then hybrid search, then reflection clusters.
3. **Graph** — Query entities and hop-limited relations around the spec concepts.
4. **File check** — Pull file history for every critical path; treat empty as normal.
5. **Sketch** — Create one ephemeral sketch per candidate (small, expiring).
6. **Promote** — Promote the single winner; let the rest expire untouched.
7. **Hand off** — Forward the promoted reference to tasks with open questions listed.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Spec rewrite** | Editing frozen slots during planning | Read the slot; send corrections back via signal |
| **Sketch sprawl** | Promoting multiple sketches | Promote one; expire the rest |
| **Recall spam** | Context-free searching with zero relevance | Gate every search on spec concepts |
| **Blind planning** | Skipping file history on critical paths | Always check; empty is a valid answer |
| **Permanent sketch** | Treating ephemeral graphs as durable | Promote to graduate; never hand off a raw sketch |
| **Task creation here** | Building the durable DAG in plan | Forward to tasks for DAG construction |

---

## 7. Checklist

- [ ] 1. Frozen spec read by label (not rewritten)?
- [ ] 2. Exact recall + hybrid search + reflection run on spec concepts?
- [ ] 3. Graph and relations queried for grounding?
- [ ] 4. File history checked for critical paths (empty accepted as normal)?
- [ ] 5. Candidates explored as ephemeral sketches with expiry?
- [ ] 6. Exactly one sketch promoted to spec-sdd-tasks?
- [ ] 7. No non-owned tool written directly from this stage?
