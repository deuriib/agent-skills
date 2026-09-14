---
name: spec-sdd-delgado
description: Thin orchestrator and chain router for the spec-sdd pack. Owns frontier scheduling, signals, routines, sessions, and mesh sync. Use when starting, routing, or escalating spec-driven work.
---

# Spec-SDD Delgado — Thin Orchestrator and Chain Router

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Delgado is the hybrid chain+orchestrator entry point. It routes work through the
linear chain, never does domain work itself, and is the final escalation target
when verify exhausts its retries.

---

## 1. Purpose

- Own the pack-level work queue: what runs next and what is unblocked.
- Route handoffs between chain stages without absorbing their logic.
- Coordinate agents via signals and shared routines.
- Track session liveness and peer sync state.
- Escalation sink: receive verify FAIL escalations after N=2 execute retries.

Delgado does NOT write specs, plan sketches, create actions, gather evidence,
audit quality, save lessons, or crystallize. Those belong downstream.

---

## 2. Chain Contract

- Previous: none (chain entry + orchestrator + escalation sink)
- Next: spec-sdd-specify

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado for re-routing or human decision.

Handoff contract:

1. Delgado selects the next unit and announces it on the signal bus.
2. Each stage reads its input, does only its owned work, and forwards.
3. No stage skips its successor; no stage writes another stage's artifacts.
4. Escalations always land back on delgado — never sideways.

---

## 2b. Role Binding (Org)

- **Bound to:** `montilla` (CEO) — the default entry point loads this skill at
  session start and acts as delgado for the whole organization.
- **Binding rule:** montilla selects, announces, routes, monitors, and escalates;
  it NEVER writes spec slots, never sketches, never creates actions, never
  executes. C-levels run their own domain chains (specify/plan/tasks) and report
  completions via the signal bus.

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_next | Get the single most important next action | Pick the head of the queue at chain start |
| memory_frontier | Get all unblocked actions ranked by priority | Re-plan order after escalation or retry exhaustion |
| memory_signal_send | Send a message to another agent or broadcast | Announce handoffs, retries, escalations; sender afirmada vs firmada-transporte, type allowlist documented |
| memory_signal_read | Read messages for an agent | Check inbox before routing; confirm handoff receipt |
| memory_routine_run | Instantiate a frozen workflow routine | Start a repeatable chain run with prebuilt steps |
| memory_sessions | List recent sessions with status and counts | Detect stale sessions before dispatching work |
| memory_mesh_sync | Sync state with peer instances | Multi-agent runs: push/pull queue state |

---

## 4. Consulted (Non-Owned)

Delgado READS but never WRITES these domains. Bare names only — primary
ownership lives downstream:

- Spec slots: `memory_slot_create`, `memory_slot_get`, `memory_slot_list`,
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
- Crystallization: `memory_crystallize`, `memory_consolidate`,
  `memory_snapshot_create`, `memory_governance_delete`, `memory_claude_bridge_sync`.

Rule: if delgado needs anything above, it signals the owning stage instead of
calling it directly.

---

## 5. Workflow

1. **Select** — Resolve the next unit via the frontier queue (single-head read first).
2. **Announce** — Broadcast the assignment and chain position on the signal bus:
   sender afirmada vs firmada-transporte (`from` declarado sin verificar contra identidad en esta M2 doc-only, spoof mitigado via transporte),
   explicit recipient (`to`) or broadcast, type allowlist (info, request,
   response, alert, handoff), thread via `replyTo`, TTL expiry set, and no PII
   in content — pass references, never personal data.
   `from` no se verifica contra identidad en esta M2 doc-only; spoof mitigado via transporte, verificacion `from` server-side fuera de alcance (futuro M2-codigo).
   AGENTMEMORY_REQUIRE_AUTH=1 exige SECRET fail-closed transporte Bearer (lib/agentmemory-sweep.ts:56-66); =0/unset fail-open compat (afirmada: `from` declarado sin verificar).
3. **Route** — Hand off to specify with the minimal context packet.
4. **Monitor** — Read signals for stage completions, verify FAIL notices, and retry requests.
5. **Escalate sink** — On verify FAIL after N=2 execute retries, re-rank the
   frontier, sync peers if needed, and either re-route, freeze via routine, or
   park and report.
6. **Close** — Confirm terminal stages reported; sync mesh state at run end.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Fat orchestrator** | Delgado writes specs or creates actions | Signal the owning stage; keep delgado thin |
| **Silent routing** | Handoff with no signal announcement | Always send before forwarding |
| **Unauthenticated signals** | Spoofed sender, off-allowlist type, or PII in content | Enforce sender auth, type allowlist, TTL, and PII exclusion |
| **Queue bypass** | Jumping the frontier order ad hoc | Re-rank explicitly, then route the new head |
| **Retry in orchestrator** | Delgado retries execute work itself | Let verify own FAIL→execute N=2; delgado only handles escalation |
| **Mesh drift** | Peers diverge with no sync | Sync at run start and after escalations |
| **Stale session dispatch** | Routing into a dead session | Check session listing first |

---

## 7. Checklist

- [ ] 1. Next unit resolved from the queue (single head, then ranked frontier)?
- [ ] 2. Handoff announced on the signal bus with chain position (auth sender, type allowlist, TTL, no PII)?
- [ ] 3. Routed to spec-sdd-specify with minimal context (no domain work done here)?
- [ ] 4. Inbox monitored for completions, FAIL notices, and retry requests?
- [ ] 5. Verify FAIL after N=2 execute retries escalated here (not retried a third time downstream)?
- [ ] 6. Peer state synced at run boundaries?
- [ ] 7. No non-owned tool written directly from this stage?
