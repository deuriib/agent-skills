# Triage Labels

Triage = deduplicate → repro-check → label → prioritize. Oldest-first.

## Label taxonomy

| Prefix | Values | Meaning |
|--------|--------|---------|
| `type:` | `bug`, `feature`, `task`, `rfc` | What kind of work |
| `priority:` | `p0`, `p1`, `p2`, `p3` | p0 = broken now, p1 = next, p2 = queued, p3 = someday |
| `status:` | `needs-triage`, `needs-repro`, `ready`, `in-progress`, `blocked`, `stale` | Where it sits |
| `reason:` | `duplicate`, `wontfix`, `invalid`, `good-first-issue` | Why it closed or who can take it |

Keep labels small: one `type:`, one `priority:`, one `status:` per issue. Remove `needs-triage` only when all three are set.

## Triage flow

```bash
# 1. Pull the untriaged queue, oldest first
gh issue list --label needs-triage --search "sort:created-asc" --limit 30

# 2. Open each one with full context
gh issue view <N> --comments

# 3a. Duplicate? Close with pointer, stop triaging the dup
gh issue comment <N> --body "Duplicate of #<M> — continuing discussion there."
gh issue close <N> --reason "not planned"

# 3b. Bug with no repro? Park it, ask once
gh issue edit <N> --remove-label "needs-triage" --add-label "status:needs-repro"
gh issue comment <N> --body "Needs exact repro steps (see issue template). What did you run, what did you see, what did you expect?"

# 3c. Shaped + valid? Label fully and mark ready
gh issue edit <N> --add-label "type:bug,priority:p1,status:ready" --remove-label "needs-triage"
```

## Rules

- **Duplicates**: search before labeling — `gh issue list --search "<keywords> in:title"`. Canonical issue keeps the discussion; dups get one pointer comment then close.
- **needs-repro**: one specific ask, not "more info pls". Name the exact missing field. No implementation work starts here.
- **good-first-issue**: only on `ready` + small + self-contained issues. Must have acceptance criteria filled.
- **wontfix / invalid**: requires a reason comment (scope, constraint, or evidence). "No" without a reason reopens itself.
- **Stale**: 30 days no activity → `status:stale` + ping comment. 14 more days silent → close with a reopen invitation. Never bulk-close without per-issue comments.
- **Priority default**: when unsure between two, take the lower. p0 needs "broken in prod now" evidence, not urgency prose.
