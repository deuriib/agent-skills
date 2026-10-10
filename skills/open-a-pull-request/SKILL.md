---
name: open-a-pull-request
description: Use when a branch is finished and needs review, or when a pull request must be created, scoped, titled, described, linked to an issue, or made ready for review.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.1"
---

# Skill: open-a-pull-request

## Activation Contract

Use this skill when:

- A branch is ready for review — "open a PR", "ready for review", "push this up".
- You need the branch-naming or PR-body convention for this repo.
- CI is red on an open PR and you need the fix-forward path.

Do NOT use this skill when:

- Commits aren't shaped yet — split and message them first with `git-commit`.
- There is no approved unit of work (no issue, no spec, no agreed task) — get that first. A PR with no linked unit gets closed, not reviewed.
- You just want to save work in progress — push the branch, don't open a PR. Draft PRs are for "review my approach early", not backups.

## Hard Rules

- **One intent per PR**: one issue closed, one spec unit delivered. Two intents = two PRs. Stacked PRs (base = other PR's branch) when the second depends on the first.
- **Linked or closed**: every PR body carries `Closes #<N>` or the spec path + requirement IDs. No link, no review.
- **Small enough to actually read**: additions + deletions ≤ 400 lines. Bigger needs a `size:exception` rationale in the body (why it can't split + what to review first).
- **Green before review**: local checks pass, then push, then request review. Never open a PR on red to "see what CI says".
- **Conventional Commits always**: branch name and every commit follow the pattern — see `references/branch-commit-guide.md`.
- **Never force-push shared history**: `main`/`master` is sacred. Rewriting a PR branch after review started needs a heads-up comment, not silence.
- **No secrets in the open**: no tokens, credentials, sessions, or PII in branches, commits, bodies, or logs.

## Decision Gates

| Situation                                               | Action                                                                                                                            |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| No issue / spec / agreed task                           | Stop. Get the unit first — a PR without one gets closed.                                                                          |
| Diff > 400 lines                                        | Split (see `references/splitting-a-pr.md`), stack, or document `size:exception`. Default: split.                                  |
| Baseline is red (`git status` dirty in unexpected ways) | Clean it: stash, separate commit, or record the override. Don't smuggle stray files into the PR.                                  |
| Local checks fail                                       | Fix forward on the branch. Never push red hoping CI disagrees.                                                                    |
| CI fails AFTER opening                                  | Fix on the same branch, push, re-verify — see `references/ci-red.md`. Don't open PR #2 for the fix.                               |
| Reviewer asks for changes                               | Address each thread (change or reply with reason), push, re-request — see `references/addressing-review.md`.                      |
| Repo has its own template / checks                      | Repo wins. Fill ITS template fully; run ITS checks. This skill's template is the fallback — see `references/pr-body-template.md`. |

## Execution Steps

1. **Link**: write the `Closes #<N>` or spec reference FIRST. It decides the branch name, the scope, and what "done" means.
2. **Branch**: from current `main`, create `type/short-hyphen-name` — see `references/branch-commit-guide.md`. All lowercase, short, hyphen-separated.
3. **Scope**: implement strictly within the linked unit. Anything extra (drive-by fix, "while I'm here") becomes its own branch/PR or goes back in the backlog.
4. **Shape**: split commits into work-units with `git-commit` (one reason-to-revert each), ordered so any prefix is a working tree.
5. **Check**: run the repo's checks locally (typecheck/lint at minimum; full suite when fast). Fix failures on the branch.
6. **Open**: push (`-u origin <branch>`), open the PR with the body template fully filled — see `references/pr-body-template.md`. State the single intent in the title.
7. **Follow through**: watch CI, fix red on the branch, answer every review thread, keep the diff small as it evolves — see `references/ci-red.md` and `references/addressing-review.md`.

## Red Flags

- "No linked issue but it's small" → STOP. Small unlinked PRs become unreviewable history. Link it.
- "Just this once over 400 lines" without rationale → STOP. Split or justify in the body.
- Pushing red "to see CI" → STOP. Local green first.
- Force-push to silence review comments → STOP. History of the conversation matters.

## References

- `references/branch-commit-guide.md` — Branch naming + Conventional Commits pattern.
- `references/pr-body-template.md` — PR body template (linked unit, summary, changes, test plan).
- `references/splitting-a-pr.md` — How to split an oversized PR (by concern, by stack, by flag).
- `references/ci-red.md` — Fix-forward path when CI fails after opening.
- `references/addressing-review.md` — Reply-or-change loop for review threads.
