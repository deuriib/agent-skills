# Worktree commands

Read this when executing `git-worktrees`: detection, directory choice, ignore, setup, or baseline. Do not invent a shorter check.

## Detect

Run each command on its own. Do not wrap them in `$(...)`, backticks, or `$VAR`. Substitution-hostile shells (including this harness on Windows) will not expand them.

```bash
git rev-parse --path-format=absolute --git-dir
git rev-parse --path-format=absolute --git-common-dir
git rev-parse --show-superproject-working-tree
git branch --show-current
git worktree list --porcelain
```

`--path-format=absolute` needs Git 2.31 or newer. On Windows, compare the two directories case-insensitively and treat `/` and `\` as the same character.

| Result | Meaning | Do |
|---|---|---|
| Superproject path is non-empty | Submodule, even if the two dirs differ | Treat as a normal checkout |
| Dirs differ, superproject empty | Already a linked worktree | Do not create another |
| Dirs match | Primary checkout | Continue to consent |

Report an existing worktree before any edit:

- On a branch: `Already in isolated workspace at <path> on branch <name>.`
- Detached HEAD: `Already in isolated workspace at <path> (detached HEAD, externally managed). Branch creation needed at finish time.`

## Consent

Ask only when no preference is already on record:

> Would you like me to set up an isolated worktree? It protects your current branch from unexpected changes.

"Don't ask", "just edit", and "don't set anything up" are a preference to work in place. Honor them after detection.

## Directory

Check in this order. Use the first one that is already ignored. The global path matches upstream superpowers so worktrees are not split across two conventions:

1. `.worktrees/`
2. `worktrees/`
3. `~/.config/superpowers/worktrees/<repo>/<branch>/`

If none is ignored, prefer `.worktrees/` and fix `.gitignore` before creating anything. If `.worktrees/` is tracked (someone already committed it), do not hide a tracked path: use the global directory, and ask first because it lives outside the project.

## Ignore, then create

```bash
git check-ignore -q .worktrees
git worktree list --porcelain
```

`check-ignore` must exit 0. If it does not, add one line to `.gitignore` (`/.worktrees/` or `/worktrees/`), then commit only that file:

```text
chore: ignore .worktrees directory
```

If the current branch cannot take that commit, stop and say so. Do not write `.git/info/exclude` and continue.

Then, from the current HEAD, with a branch name the user gave or `feat/<kebab-slug>`:

```bash
git worktree add .worktrees/<slug> -b feat/<slug>
```

Stop instead of forcing when the branch exists, the path exists, or `git worktree list` already owns that path. Do not remove either one.

## Setup

Run the project's documented setup only. If there is no manifest, skip this step. Do not install a toolchain "just in case".

| Manifest | Default |
|---|---|
| `package.json` | The lockfile's installer (`npm ci`, `pnpm i`, `yarn`, `bun`) |
| `Cargo.toml` | `cargo build` |
| `go.mod` | `go build ./...` |
| `pyproject.toml` or `requirements.txt` | The command the repo already documents |

If setup is slow, leave it running and keep going only for work that does not need those dependencies.

## Baseline

Run the project's test command in the worktree before editing. Record the command, the exit status, and the names of failing tests.

- Clean run: start implementing.
- Failures: show the names and ask whether to fix them first.
- No test command: say "No verificado — no test command found" and ask before editing.

Do not push from this skill. Do not remove the worktree when the task ends; the caller decides cleanup.
