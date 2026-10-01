# Close & Reopen

Every close carries proof. Every reopen carries new evidence.

## Take (before close exists)

```bash
gh issue edit <N> --add-assignee @me
gh issue develop <N> --checkout
gh issue edit <N> --remove-label "status:ready" --add-label "status:in-progress"
```

Branch from the issue so the PR links back automatically.

## Close paths

| Path | Command | Proof required |
|------|---------|----------------|
| PR merged with `Closes #<N>` | Automatic — verify after | `gh issue view <N>` shows closed + linked PR |
| Manual, work done, no PR link | Comment then close | Proof comment (what shipped, where verified) |
| Duplicate | Pointer comment then close | `Duplicate of #<M>` |
| wontfix / invalid | Reason comment then close | Why: scope, constraint, or evidence |

```bash
# Manual close — proof comment FIRST, close second
gh issue comment <N> --body "Verified on main (abc1234): login survives refresh, acceptance criteria ticked."
gh issue close <N> --reason completed

# Duplicate
gh issue comment <N> --body "Duplicate of #<M> — continuing discussion there."
gh issue close <N> --reason "not planned"

# wontfix — reason is mandatory
gh issue comment <N> --body "Closing as wontfix: out of scope for v2 (reason). Reopen if <condition changes>."
gh issue close <N> --reason "not planned"
```

`--reason` is `completed` or `"not planned"` only. The comment carries the real story.

## Reopen rules

- Reopen needs **new evidence**: a fresh repro, a reverted fix, a changed constraint. Quote it in the reopen comment.
- `"still broken"` without evidence → back to `status:needs-repro`, not `ready`.
- After reopen: re-triage labels (`status:ready` + correct `priority:`), never assume the old ones still hold.

```bash
gh issue reopen <N> --comment "Reopening: repro on main (def5678) — steps: 1… 2… 3… observed X, expected Y."
gh issue edit <N> --add-label "status:ready,priority:p1"
```

## Stale policy

1. 30 days no activity → `status:stale` + ping: "Still relevant? Reply within 14 days or this closes."
2. 14 days more silence → close with invitation: "Closing as stale — reply and it reopens."
3. Any reply resets to triage. Never bulk-close; each issue gets its own comment.
