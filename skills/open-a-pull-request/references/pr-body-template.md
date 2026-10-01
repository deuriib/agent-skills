# PR Body Template

Fill EVERY section. Delete none. A half-filled template signals a
half-thought PR.

```markdown
## Linked Unit

Closes #<N> — or — SPEC:`<spec-path>`

## Summary

[What this PR does and why, 2–3 sentences. Reviewer reads ONLY this
before deciding how deep to go.]

## Changes

| File / Area    | What Changed      |
| -------------- | ----------------- |
| `path/to/file` | Brief description |

## Test Plan

[Commands YOU ran + what you checked by hand. Paste real output,
not "should pass".]

- [ ] `<check command, e.g. npm run typecheck>` passes locally
- [ ] Related suite green (`<command>`)
- [ ] Manually tested: <what you clicked/ran, what you saw>

## Checklist

- [ ] One intent — nothing extra smuggled in
- [ ] Additions + deletions ≤ 400 lines, or `size:exception:` rationale below
- [ ] Commits follow Conventional Commits, no `Co-Authored-By` trailers
- [ ] No secrets/PII in diff, body, or logs
- [ ] No force-push to `main`/`master`
```

## Title convention

`<type>(<scope>): <imperative subject>` — same as the lead commit.
The title is what lands in `main`'s history after squash, so write it
like history, not like chat (`fix(auth): …`, not `quick fix for login`).
