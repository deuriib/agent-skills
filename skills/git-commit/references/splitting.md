# Splitting & Linear History

## Work-unit definition

A work-unit = the smallest change with **one reason to revert**.
Revert test: if you'd ever want to revert half of it but keep the other
half, it's two units. Split until every unit passes that test.

## Split signals

- **Different types** (`feat` + `docs` + `chore` in one diff) → separate commits.
- **Unrelated paths** (skill code + unrelated README tweak) → separate commits.
- **Same feature, impl + tests** → ONE unit. Never split a feature from its tests.
- **Drive-by fix** found while building a feature → separate `fix(scope)` unit.

## Ordering (commit in this order)

1. `feat` / `fix` (behavior changes)
2. `refactor` / `perf`
3. `test`, `docs`, `chore` / `ci` / `build`

Each commit must pass checks on its own. Order so any prefix of the
sequence is a working tree.

## Commands

```bash
git status --short              # 1. map: what changed
git diff --stat                 # 1. map: how big
git diff --name-only            # 2. group paths into units
git add <unit-paths>            # 4. stage ONE unit only (or: git add -p for hunks)
git commit -m "type(scope): subject" -m "Body why."   # 4. commit the unit
git status --short              # 4. confirm only the next unit remains
git log --oneline -10           # 5. verify: reads as a logical story
```

## Linear history operations (pre-push only)

- **No merge commits** on feature work. `git pull --rebase`, `git rebase main`.
- **Reorder/squash/fixups**: `git rebase -i main` → `pick` in logical order,
  `squash`/`fixup` the wip commits into their unit.
- **Split the last commit**: `git reset HEAD~1` → re-`add` per unit → commit each.
- **Never rewrite** pushed/shared history. Local cleanup only.

## Pre-commit verification (per unit, ~2 min)

1. `git diff --cached --stat` shows ONLY this unit's paths.
2. Full `git diff --cached` read — nothing stray, no secrets, no debug code.
3. Subject passes: `type(scope): imperative ≤72, no period`.
4. Final `git log --oneline -5` — each line one unit, story reads top-to-bottom.
