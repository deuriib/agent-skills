---
name: git-worktrunk
description: Use when starting feature work that needs isolation from the current checkout, before executing an implementation plan, when asked for a worktree, a second checkout, or a branch that must not disturb the current one, or when the repo uses worktrunk (`wt`) and switching, merging, or removing worktrees is involved.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: git-worktrunk

## Overview

Ship feature work from an isolated worktrunk worktree. `wt` owns creation, paths, setup, merge, and cleanup; this file is the gate, `references/commands.md` the recipe — read it before the first `wt` command and again at finish.

## When to Use

- Starting feature work, or about to execute an implementation plan.
- Asked for a worktree, a second checkout, or a branch that must not disturb the current one.
- Asked to merge, remove, or clean up worktrees in a repo that uses `wt`.

"Stay here" or "don't set anything up" declines creation. Still detect, then work in place.

## Hard Rules

1. **`wt` installed means `wt` does it.** No hand-rolled `git worktree add`/`remove` or `git branch -d` for worktree lifecycle. Without `wt` on PATH, the `git-worktrees` skill is the procedure.
2. **Detect before creating or editing.** `wt list`: `^` primary, `@` current, `+` other. Already in a worktree: do not nest; continue at setup.
3. **No preference on record: ask, then wait.** Silence is not consent. "Just edit" declines creation only.
4. **Always name the branch.** `wt switch` with no argument opens a picker and fails without a TTY.
5. **Never hand-pick paths.** Read them from `wt switch --format=json` or `wt list --format=json`.
6. **Setup is the hooks' job.** `wt hook show` before running any installer by hand.
7. **Baseline before "already red".** Run the tests; record command, exit status, and failing test names.
8. **Ask before destruction.** `wt merge` squashes, rebases, then deletes worktree and branch. `-f` discards a dirty worktree, `-D` an unmerged branch.
9. **Do not push. Do not clean up at task end** unless asked.

## Steps

1. `wt list` — find the primary and current worktree.
2. Ask when no preference is on record; declined means work in place.
3. `wt switch -c <branch>` (`--base=@` for HEAD) or `wt switch <branch>`.
4. Read the path from JSON; hooks run setup.
5. Baseline, then implement.
6. Finish on request only: `wt merge` or `wt remove`.

## Common Mistakes

| Excuse | Reality |
| --- | --- |
| "`git worktree add` is faster" | It skips the path template, hooks, and cleanup. |
| "I'll add `.worktrees/` to `.gitignore`" | `wt` worktrees live outside the repo. Nothing to ignore. |
| "`--base` means HEAD" | It means the default branch. `--base=@` is HEAD. |
| "`wt remove` returned, so it's gone" | It runs in the background. Use `--foreground` or read `branch_outcome`. |
| "`wt merge` is `git merge`" | It squashes to one commit and deletes the worktree and branch. |
