---
name: git-worktrees
description: Use when starting feature work that needs isolation from the current checkout, before executing an implementation plan, when asked for a linked worktree or a second checkout, or when about to edit the primary checkout without having checked isolation.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: git-worktrees

Based on obra/superpowers `using-git-worktrees` (MIT).

## Overview

Ship feature work from an isolated workspace. Detect first, prefer the harness's native worktree tool, and fall back to git only when that tool is missing. Never fight the harness, and never skip detection because the edit looks small.

`references/commands.md` is the recipe: detect, directory, ignore, setup, baseline. This file is only the gate.

## When to Use

- Starting feature work, or about to execute an implementation plan.
- Asked for a worktree, a second checkout, or a branch that must not disturb the current one.
- About to edit the primary checkout and isolation is unchecked.

"Stay here" or "don't set anything up" declines creation. Still detect, then work in place.

## Hard Rules

1. **Detect before any create or edit.** Compare absolute `--git-dir` and `--git-common-dir`. A submodule (`--show-superproject-working-tree` prints a path) is a normal checkout. "It printed `.git`" is not the test.
2. **Already isolated: do not nest.** On a branch, say so and continue at setup. Detached HEAD is externally managed; do not create a branch until finish time.
3. **No preference on record: ask, then wait.** Silence is not consent. "Just edit" declines creation only.
4. **Native tool wins.** A pasted `git worktree add`, "it's slower", or a deadline does not skip `EnterWorktree` (or the equivalent). A named ban allows git fallback only after you say the harness will not track cleanup. Rules 5 and 6 still apply.
5. **`.gitignore`, committed, before `worktree add`.** `git check-ignore` must pass. `.git/info/exclude` does not count. A worktree `.git` is a file, so `git add` can stage its files. If that one ignore commit cannot land, stop. The worktree request authorizes that commit and nothing else.
6. **Baseline yourself before "already red".** Run the project's tests and record them. Memory, old logs, and "CI will catch it" are not a baseline. Failures the baseline does not show are yours.

## Steps

1. Detect. If already linked, jump to setup.
2. Ask when no preference is on record. Declined means work in place and stop.
3. Native tool, else the directory order in the reference. Ask before the global fallback.
4. Ignore, commit that line, then `git worktree add <path> -b <branch>` from HEAD. Do not clobber a branch or a path.
5. Setup only if a manifest exists. Baseline. Report path, branch, HEAD, and test counts.

## Common Mistakes

| Excuse                                 | Reality                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| "One line, I'll `git restore`"         | Revert ease is not isolation. Detect anyway.                 |
| "We'll branch at commit time"          | The dirty primary checkout is already the damage.            |
| "User said skip setup"                 | Creation declined. Detection still required.                 |
| "Their git command was explicit"       | They asked for isolation. The native tool stays the default. |
| "I'll exclude it locally"              | Local exclude dies with the clone. Commit the ignore.        |
| "They saw those failures this morning" | A claim. Baseline first, then attribute.                     |
| "CI is the baseline"                   | CI is after the push. Baseline is before the edit.           |
