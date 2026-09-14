---
name: spec-sdd-lessons
description: Lesson capture and team diffusion for passed work. Owns lesson lifecycle, team sharing, and obsidian publishing. Use when turning verified outputs into reusable knowledge.
---

# Spec-SDD Lessons — Capture and Diffusion

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Lessons converts verified passes into durable, searchable, shared knowledge —
and prunes what no longer teaches.

---

## 1. Purpose

- Capture the lesson behind every verified pass (trigger, error, prevention rule).
- Make lessons searchable by future plan and verify runs.
- Share high-value items with the team feed; consume the feed before writing.
- Publish stable knowledge to Obsidian for long-lived reference.
- Delete only deprecated or invalid lessons, with reason.

---

## 2. Chain Contract

- Previous: spec-sdd-verify
- Next: spec-sdd-crystallize

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado. Lessons only receives PASS packets.

Handoff contract:

1. Accept the audited PASS packet from verify.
2. Capture and diffuse the lesson; publish when stable.
3. Forward the lesson references to crystallize for compaction.

---

## 2b. Role Binding (Org)

- **Bound to:** the owning C-level (or `espinoza`), executed on PASS only.
- **Binding rule:** replaces the legacy ad-hoc `memory_save` at gate cierre —
  capture one lesson per reusable signal, share high-value items, forward
  references to crystallize. Never captures from FAIL packets or non-verified
  work.

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_lesson_save | Save a lesson with trigger, error, prevention | Every PASS with reusable signal |
| memory_lesson_recall | Search lessons by query | Before writing: deduplicate and link |
| memory_lesson_delete | Soft-delete a lesson by id | Deprecated or invalid rules only |
| memory_team_share | Share a memory or observation with the team | High-value lessons worth broadcasting |
| memory_team_feed | Get recent shared items from the team | Consume before capture to avoid duplicates |
| memory_obsidian_export | Export lessons as Obsidian Markdown | Stable knowledge ready for the vault; types allowlist: memories, lessons, crystals, sessions |

---

## 4. Consulted (Non-Owned)

Lessons READS but never WRITES these domains. Bare names only:

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
- Crystallization: `memory_crystallize`, `memory_consolidate`,
  `memory_snapshot_create`, `memory_governance_delete`, `memory_claude_bridge_sync`.

---

## 5. Workflow

1. **Consume feed** — Read the team feed for overlapping lessons first.
2. **Deduplicate** — Search existing lessons; link or extend instead of duplicating.
3. **Capture** — Save one lesson per reusable signal: trigger, error, prevention,
   confidence, and tags.
4. **Share** — Broadcast high-value lessons to the team.
5. **Publish** — Export stable lessons to Obsidian with explicit types filter
   (allowlist: memories, lessons, crystals, sessions; scoped vault dir).
6. **Prune** — Soft-delete only deprecated or invalid lessons. Purga TTL-stale
   drafts under Ley 172-13; never capture PII — no PII in lessons, shares,
   feed reads, or vault exports.
7. **Hand off** — Forward lesson references to crystallize.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Lesson spam** | Saving every observation as a lesson | Save reusable signals only |
| **Duplicate lessons** | Same rule saved under new words | Search first; link or extend |
| **Silent capture** | Never sharing high-value lessons | Share what the team should reuse |
| **Vault dump** | Exporting unstable drafts to Obsidian | Publish stable knowledge only |
| **Hard prune** | Deleting lessons that still teach | Soft-delete deprecated/invalid only |
| **FAIL lessons** | Capturing from failed units | Lessons receives PASS packets only |
| **PII lessons** | Personal data saved, shared, or vaulted | Exclude PII pre-capture; TTL purga for stale drafts |

---

## 7. Checklist

- [ ] 1. Team feed consumed before capture?
- [ ] 2. Existing lessons searched (deduplicate or link)?
- [ ] 3. Lesson saved with trigger, error, and prevention rule?
- [ ] 4. High-value lessons shared with the team?
- [ ] 5. Stable knowledge exported to Obsidian (types allowlist, scoped vault)?
- [ ] 6. Deletions limited to deprecated/invalid with reason (TTL purga, no PII kept)?
- [ ] 7. Lesson references forwarded to spec-sdd-crystallize?
