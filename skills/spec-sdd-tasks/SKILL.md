---
name: spec-sdd-tasks
description: Durable task DAG with leases, checkpoints, sentinels, and facet tags. Use when decomposing a promoted plan into executable, guarded work units.
---

# Spec-SDD Tasks — Action DAG with Guards

> **"Small disciplines, big craftsmanship."**
> *"Haces las cosas como para Dios, por eso trabajas con excelencia y dedicación."*

Tasks turns the promoted plan into a guarded, taggable DAG that execute can
claim safely and verify can audit later.

---

## 1. Purpose

- Decompose the promoted plan into small, single-owner actions with dependencies.
- Guard concurrency with exclusive leases per action.
- Gate progress on external checkpoints (CI, approvals, deploys).
- Arm event-driven sentinels for timers, webhooks, and condition watches.
- Tag actions with structured facets for downstream evidence queries.

---

## 2. Chain Contract

- Previous: spec-sdd-plan
- Next: spec-sdd-execute

Full chain (§3.2):

```text
spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks
  → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize
```

Retry/escalation rule: when spec-sdd-verify reports FAIL, control returns to
spec-sdd-execute for retry with N=2. After 2 failed retries, spec-sdd-verify
escalates to spec-sdd-delgado.

Handoff contract:

1. Accept the promoted plan reference from plan.
2. Build the DAG with guards and facet tags; claim nothing here.
3. Forward the DAG head + checkpoint map to execute.

---

## 2b. Role Binding (Org)

- **Bound to:** the owning C-level (or `espinoza` for automation units).
- **Binding rule:** the C-level decomposes the promoted plan into the action
  DAG, attaches facet tags (`domain`, `risk`, `artifact`) at creation, declares
  leases/checkpoints, then hands the DAG head + references to the executing
  specialist via Task. No dispatch without an action node (rule 1 of the SDD
  Contract).

---

## 3. Primary-Owned Tools

Single primary owner. No other skill may call these as primary.

| Tool | Purpose | When to use |
| :--- | :--- | :--- |
| memory_action_create | Create an actionable work item with dependencies | Every DAG node, one behavior per node |
| memory_action_update | Update status, priority, or details | Transitions: ready → claimed → done/blocked |
| memory_lease | Acquire, release, or renew an exclusive lease | Before any executor starts a node |
| memory_checkpoint | Create or resolve an external checkpoint | CI results, approvals, deploy gates; SoD via lease agentId, TTL via linked sentinel, resolve by lease owner, no PII |
| memory_sentinel_create | Create an event-driven sentinel | Timers, webhooks, condition watches per node; type allowlist + expiresInMs + auth required |
| memory_sentinel_trigger | Externally fire a sentinel | Tests and integrations simulating the event; authorized callers only |
| memory_facet_tag | Attach a structured dimension:value tag | Label nodes for downstream facet queries |

---

## 4. Consulted (Non-Owned)

Tasks READS but never WRITES these domains. Bare names only:

- Orchestration: `memory_next`, `memory_frontier`, `memory_signal_send`,
  `memory_signal_read`, `memory_routine_run`, `memory_sessions`, `memory_mesh_sync`.
- Spec: `memory_slot_create`, `memory_slot_get`, `memory_slot_list`,
  `memory_slot_replace`, `memory_slot_append`, `memory_slot_delete`, plus `memory_save`.
- Planning: `memory_sketch_create`, `memory_sketch_promote`, `memory_graph_query`,
  `memory_relations`, `memory_reflect`, `memory_recall`, `memory_smart_search`,
  `memory_file_history`.
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

1. **Decompose** — Create one action per behavior with typed dependencies.
2. **Tag** — Attach facet dimensions (area, risk, artifact) at creation time.
3. **Lease design** — Declare which nodes need exclusive leases and their TTLs.
4. **Checkpoints** — Create external gates for CI, approval, and deploy boundaries.
   Every checkpoint sets `linkedActionIds` + a linked sentinel TTL via
   `memory_sentinel_create expiresInMs`; resolver lease agentId differs from
   creator lease agentId (SoD), resolve by lease owner only, no PII per Ley 172-13 (process rule).
5. **Sentinels** — Arm watchers for timeouts and async conditions; pre-register triggers.
   Type allowlist: webhook, timer, threshold, pattern, approval, custom.
   Every sentinel sets `expiresInMs` (TTL) + linked actions; webhook/approval
   sentinels require caller auth on trigger and carry no PII in config or
   result payloads.
6. **Order** — Set priorities so the frontier yields the right head first.
7. **Hand off** — Forward DAG head + checkpoint map to execute; update statuses only on signal.

---

## 6. Anti-Patterns

| Anti-Pattern | What's Wrong | How to Fix |
| :--- | :--- | :--- |
| **Mega-action** | One node covering spec + plan + code | Split to one behavior per action |
| **Leaseless claim** | Executors racing on the same node | Require lease acquire before start |
| **Checkpoint skip** | Merging past a red gate | Block the DAG on unresolved checkpoints |
| **Sentinel sprawl** | Watchers with no expiry or owner | Set expiry + linked actions at creation |
| **Open sentinel trigger** | Unauthenticated webhook/approval firing, PII in payload | Require auth on trigger; allowlisted types, expiresInMs, no PII |
| **Untagged nodes** | No facets for evidence queries | Tag at creation; backfill is debt |
| **Executing here** | Doing the work instead of decomposing | Build the DAG; let execute claim it |

---

## 7. Checklist

- [ ] 1. One behavior per action with explicit dependencies?
- [ ] 2. Facet tags attached at creation time?
- [ ] 3. Leases declared with TTLs for contended nodes?
- [ ] 4. External checkpoints created for CI/approval/deploy gates?
- [ ] 5. Sentinels armed with expiry + linked actions (type allowlist, expiresInMs TTL, trigger auth, no PII)?
- [ ] 6. DAG head + checkpoint map forwarded to spec-sdd-execute?
- [ ] 7. No non-owned tool written directly from this stage?
