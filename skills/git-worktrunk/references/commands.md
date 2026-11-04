# Worktrunk commands

Read this when executing `git-worktrunk`: detecting the environment, creating or switching a worktree, finding its path, letting hooks run setup, taking a baseline, finishing, or troubleshooting. Every command and flag below was checked against `wt v0.81.0` (`wt <command> --help`). Do not invent flags.

## Detect

```bash
wt --version
wt config show
wt list
wt list --format=json
```

`wt config show` prints a `SHELL INTEGRATION` section. Without it, `wt` cannot change the calling shell's directory; read paths from JSON instead of assuming a `cd` happened.

`wt list` gutter, leftmost column:

| Symbol | Meaning |
| --- | --- |
| `@` | Current worktree |
| `^` | Primary worktree (the repo's home checkout) |
| `+` | Other worktree |
| `/` | Local branch without a worktree (`--branches`) |
| `|` | Remote branch, not present locally (`--remotes`) |

Rows dimmed with state `_` (empty) or `⊂` (integrated) are safe to delete.

Report an existing workspace before editing:

- Primary checkout, on a branch: `Already in the primary checkout at <path> on branch <name>.` Continue to consent.
- A `+` row (or `worktree.main: false` in JSON): `Already in isolated workspace at <path> on branch <name>.` Do not create another.
- `worktree.detached: true`: externally managed. Do not create a branch until finish time.

Current path, machine-readable:

```bash
wt list --format=json | jq -r '.items[] | select(.worktree.current) | .worktree.path'
```

Run commands one per call. Do not wrap them in `$(...)`, backticks, or `$VAR` — substitution-hostile shells will not expand them.

## Consent

Ask only when no preference is already on record:

> Would you like me to set up an isolated worktree? It protects your current branch from unexpected changes.

"Don't ask", "just edit", and "don't set anything up" are a preference to work in place. Honor them after detection.

## Create or switch

```bash
wt switch -c feat/<slug>            # new branch, based on the default branch
wt switch -c feat/<slug> --base=@   # new branch from HEAD
wt switch <branch>                  # existing branch; creates its worktree if missing
wt switch -c feat/<slug> --format=json
```

`--base` defaults to the **default branch, not HEAD**. Shortcuts work on the branch argument and on `--base`: `^` default branch, `@` current, `-` previous, `pr:{N}`, `mr:{N}`.

Without `-c` the branch must already exist. Without a branch argument the interactive picker opens and needs a TTY.

`--format=json` result:

```json
{"action":"created","branch":"feat/x","path":"/abs/path/repo.feat-x","created_branch":true,"base_branch":"main"}
```

Useful flags:

| Flag | Effect |
| --- | --- |
| `-x, --execute <prog> [-- args]` | Run one program after switching, starting in the worktree. `wt switch -c feat -x claude -- 'prompt'` |
| `--no-cd` | Shell stays put; hooks still run and `-x` still starts in the worktree |
| `--clobber` | Remove a stale non-worktree directory at the target path |
| `--no-hooks` | Skip hooks for this switch |
| `-y, --yes` | Skip approval prompts |

## Path

Never invent a path. Default worktrees are siblings of the primary checkout (`/…/repo` → `/…/repo.<branch>`), computed from a configurable template — read the real one from `wt switch --format=json` or `wt list --format=json`.

`wt list`'s `Path` column is relative to the current directory (`.` for the current worktree), so do not parse it.

`--path <PATH>` is experimental: it places one worktree off-template, and `wt list` marks it with `⚐` (`worktree.branch_mismatch`).

To change which branch a worktree is on, run `git switch` inside it.

## Setup via hooks

```bash
wt hook show
wt hook show post-start --expanded
wt hook post-start --dry-run
wt hook post-start --foreground
```

`pre-*` hooks block and abort the operation on failure; `post-*` hooks run in the background and log. Types: `switch`, `create` (`pre-start`/`post-start`), `commit`, `merge`, `remove`. User hooks live in `~/.config/worktrunk/config.toml`, project hooks in `.config/wt.toml`.

Project commands need approval on first run; declining skips every project command for that operation. `-y` skips the prompt.

Run an installer by hand only when `wt hook show` is empty and no manifest-driven setup ran. Never duplicate a hook that already exists.

## Baseline

Run the project's test command inside the worktree before editing. Record the command, the exit status, and the names of failing tests.

- Clean run: start implementing.
- Failures: show the names and ask whether to fix them first.
- No test command: say "No verificado — no test command found" and ask before editing.

## Finish

```bash
wt merge                      # squash → rebase → fast-forward → remove worktree and branch
wt merge --no-squash          # keep individual commits
wt merge --no-remove          # keep the worktree after merging
wt remove --foreground        # wait instead of returning immediately
wt remove --no-delete-branch  # keep the branch
```

Ask before `wt merge`. It squashes every commit since the target into one by default, then deletes the worktree and branch. It merges the source into the *target* (like GitHub's "Merge pull request"), unlike `git merge`. It never fetches. Working-tree changes swept into the squash are backed up to `refs/wt-backup/<branch>`. A rebase conflict stops the merge with the rebase left open in the source worktree.

`wt remove` flags mean different things:

| Flag | Scope | When |
| --- | --- | --- |
| `-f, --force` | Worktree | It has staged, modified, or untracked files |
| `-D, --force-delete` | Branch | The branch has unmerged commits |
| `--no-delete-branch` | Branch | Keep it regardless of merge status |
| `--reap` | Processes | Experimental, Unix only: kill processes whose cwd is under the worktree, sparing anything with a controlling terminal |

Removal runs in the background by default and returns immediately; output goes to `.git/wt/logs/{branch}/internal/remove.log`. `--foreground` waits.

`wt remove --format=json` reports `branch_outcome`: `deleted`, `deferred`, `not_attempted`, `retained_unmerged`, `retained_checked_out`, `retained_raced`, `retained_failed`.

`wt step prune` removes worktrees and branches merged into the default branch; add `--dry-run` first.

Do not push from this skill. Do not remove the worktree when the task ends; the caller decides cleanup.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Branch does not exist | Add `-c`, or look for it with `wt list --branches` |
| Path occupied | Another worktree is at the target path; `wt switch <that branch>`, or remove it |
| Stale directory at the path | Not a registered worktree; re-run with `--clobber` |
| `Cannot change directory — shell integration not installed` | Run `wt config shell install`, then read the path from `--format=json`; the switch itself succeeded |
| `Interactive picker requires an interactive terminal` | Pass an explicit branch argument |
| Rebase conflict during `wt merge` | Left open in the source worktree; resolve it there, or abort the rebase there |
| Dirty worktree blocks removal | `-f` discards staged, modified, and untracked files; confirm with the caller first |
| Unmerged branch blocks removal | `-D` deletes it; confirm with the caller first |
