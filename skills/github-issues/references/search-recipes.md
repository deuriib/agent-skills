# Search Recipes

Search, don't scroll. `gh issue list --search` takes GitHub search syntax.

## Everyday recipes

```bash
# My queue — assigned to me, open, oldest first
gh issue list --assignee @me --state open --search "sort:created-asc"

# Untriaged backlog
gh issue list --label needs-triage --search "sort:created-asc" --limit 30

# Ready to take, highest priority first
gh issue list --label "status:ready" --search "sort:created-asc" --limit 20

# Dup check before filing — title keywords
gh issue list --search "login session in:title" --state all --limit 10

# Blocked, needs unblocking
gh issue list --label "status:blocked" --state open

# Stale candidates — no activity, open, oldest touched first
gh issue list --state open --search "sort:updated-asc" --limit 20

# What closed this week (proof audit)
gh issue list --state closed --search "closed:>=2026-09-24" --limit 20
```

## Full-context view

```bash
# One issue, everything: body + full comment thread
gh issue view <N> --comments

# Machine-readable — for grooming scripts, bulk label checks
gh issue list --label needs-triage --json number,title,labels,createdAt --limit 50

# Single issue as JSON — labels, assignees, linked state
gh issue view <N> --json number,title,labels,assignees,state,comments
```

## Filter cheat sheet

| Need | Filter |
|------|--------|
| Author | `--author <user>` |
| Mention | `--mention <user>` |
| Milestone | `--milestone <name>` |
| All states | `--state all` |
| Text + qualifiers | `--search "word label:\"type:bug\" sort:updated-desc"` |
| Date ranges | `created:>=2026-09-01`, `closed:>=2026-09-24`, `updated:<2026-08-01` |

Combine flags: `--label` narrows server-side, `--search` adds qualifiers and sort. Prefer explicit `sort:` — default order hides old issues.
