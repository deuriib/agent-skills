---
name: github-issues
description: Use when creating, triaging, searching, taking, commenting on, or closing GitHub issues, or turning an issue into a branch and pull request.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: github-issues

## Activation Contract

Use this skill when:
- Creating a GitHub issue — bug report, feature request, task, or RFC.
- Triaging the backlog — labels, priority, duplicates, repro checks, stale cleanup.
- Taking an issue — assigning yourself, branching from it, turning it into work.
- Tracking or narrating work — commenting progress, asking for repro, linking PRs.
- Closing or reopening an issue — merge-linked close, manual verified close, invalid/wontfix.

Do NOT use this skill when:
- The branch is ready for review — that's `open-a-pull-request`.
- Commits need shaping — that's `git-commit`.
- Something is broken and needs diagnosis — that's `fix-a-bug`. This skill files and tracks the issue; `fix-a-bug` solves it.
- You just want repo history or PR status without touching an issue — use `gh` directly, no skill needed.

## Hard Rules

- **One issue = one intent**: one bug, one request, one reason to close. Two intents = two issues. Never bundle.
- **View before you mutate**: run `gh issue view <N>` (with comments) before edit, comment, assign, close, or reopen. No blind mutations.
- **Shaped before triaged**: every new issue gets the template (context, repro/proposal, acceptance) — see `references/issue-template.md`. Triage never starts on a blank body.
- **Pack link never breaks**: work starts from the issue (`gh issue develop`), the PR body carries `Closes #<N>`. No link, no work.
- **Take means own**: assigning = `gh issue edit --add-assignee` to yourself + branch created + status label moved. Claiming without branching is theater.
- **Close needs proof**: merged PR, verified outcome, or documented wontfix/duplicate reason posted as a comment. Silent closes are forbidden — see `references/close-reopen.md`.
- **No secrets in the open**: no tokens, credentials, sessions, or PII in titles, bodies, comments, or pasted logs.

## Decision Gates

| Situation | Action |
|-----------|--------|
| `gh` not authed (`gh auth status` fails) | Stop. Auth first. No API workarounds until CLI works — default is `gh`. |
| No template / vague report ("it broke", "add X") | Shape it first — see `references/issue-template.md`. Ask for the missing field once, specifically. |
| Untriage queue (`needs-triage` or unlabeled) | Triage oldest-first: deduplicate → repro-check → label → prioritize — see `references/triage-labels.md`. Default: triage before taking. |
| Duplicate found | Close as duplicate with `Duplicate of #<N>` comment. Keep discussion on the canonical issue. Never triage both. |
| Needs repro, none provided | Label `needs-repro`, ask for exact steps once. No implementation until repro lands. |
| Ready to implement | Take it: self-assign + `gh issue develop <N> --checkout` + hand to `fix-a-bug` / implementation. PR closes it via `open-a-pull-request`. |
| Finding issues (backlog grooming, dup check, "what's open?") | Search, don't scroll — see `references/search-recipes.md`. |
| Close requested, proof missing | Stop. Post what's missing as a comment. Close only with proof — see `references/close-reopen.md`. |
| Reopen requested | Reopen only with new evidence or a reverted fix. "Still broken" without evidence goes back to `needs-repro`. |

## Execution Steps

1. **Locate**: `gh issue view <N> --comments` for one issue, or search recipes for many — see `references/search-recipes.md`. Know state, labels, linked PRs before touching anything.
2. **Shape**: new or malformed issue → apply the template — see `references/issue-template.md`. Title is imperative + scoped; body has context, repro/proposal, acceptance criteria.
3. **Triage**: deduplicate, verify repro, apply `type:` / `priority:` / `status:` labels, set milestone if the repo uses them — see `references/triage-labels.md`. Remove `needs-triage` only when fully labeled.
4. **Take**: `gh issue edit <N> --add-assignee @me`, then `gh issue develop <N> --checkout` for the branch. The issue number decides the branch and the PR's `Closes #<N>`.
5. **Track**: narrate on the issue, not in chat — progress comments, blockers, linked PRs (`gh issue comment`). One status comment per meaningful state change, not per commit.
6. **Close**: merged PR auto-closes via `Closes #<N>`; manual close only with a proof comment — see `references/close-reopen.md`. Verify `gh issue view` shows the right state + reason after.

## Red Flags

- "Quick issue, skip the template" → STOP. Unshaped issues cost more in triage than the template costs now.
- Commenting "working on this" without assigning + branching → STOP. That's a claim with no ownership.
- Closing because "PR merged" when the PR didn't carry `Closes #N` → STOP. Link it or close manually with proof.
- Bulk-closing stale issues with no comment → STOP. Each close gets a reason; reopen path stays open.
- Pasting raw logs with tokens/sessions → STOP. Scrub first, placeholders only.

## References

- `references/issue-template.md` — Title convention, body template, `gh issue create` commands.
- `references/triage-labels.md` — Label taxonomy, triage flow, dup / needs-repro / stale / wontfix rules.
- `references/search-recipes.md` — `gh issue list` / search filters and JSON recipes for grooming and dup checks.
- `references/close-reopen.md` — Proof-required close, manual close comments, reopen rules, stale policy.
