# Issue Template

Every issue ships shaped. Apply before triage.

## Title convention

`<type>: <imperative scoped subject>` — ≤ 72 chars, lowercase type.

- `bug(auth): login rejects valid session after refresh`
- `feat(billing): add prorated credit on plan downgrade`
- `task(docs): document webhook retry policy`
- `rfc(api): paginate list endpoints with cursor`

Types: `bug` | `feat` | `task` | `rfc`. Scope = area from repo paths.

## Body template

```markdown
## Context

[Why this matters, 1–2 sentences. Who hits it, what breaks.]

## Repro / Proposal

Bug — exact steps, smallest input that still fails:
1. [step]
2. [step]
3. [observed vs expected]

Feature/Task — what changes, what stays the same:
- [change]
- [non-goal]

## Acceptance

- [ ] [checkable outcome 1]
- [ ] [checkable outcome 2]

## Environment (bugs only)

- version/commit:
- OS / runtime:
```

Fill EVERY section. Delete none. A half-filled template signals a half-thought issue.

## Create commands

```bash
# Auth first — default is gh, no API until CLI works
gh auth status

# Shaped create (template fields as flags)
gh issue create \
  --title "bug(auth): login rejects valid session after refresh" \
  --label "type:bug,needs-triage" \
  --body-file /tmp/issue-body.md

# From the current branch context (adds metadata automatically)
gh issue create --title "feat(billing): add prorated credit" --body-file /tmp/issue-body.md

# Verify it landed shaped
gh issue view <N> --comments
```

## Shaping checklist

- [ ] Title follows `<type>: <imperative subject>` ≤ 72 chars
- [ ] Context says who is affected and why now
- [ ] Bugs: repro steps re-runnable by a stranger; Features: non-goals stated
- [ ] Acceptance criteria are checkable (a reviewer can tick them without asking)
- [ ] Logs pasted with secrets scrubbed — tokens, sessions, PII become `<redacted>`
