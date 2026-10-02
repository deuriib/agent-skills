---
name: git-commit
description: Use when committing changes, splitting a dirty worktree into atomic units, writing Conventional Commits messages, or shaping history into a linear logical sequence before push or PR.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.1"
omniroute:
  handler: git-commit-handler
  mode: auto
  sourceProvider: local
  tags: [git, conventional-commits, workflow, commit]
---

# Skill: git-commit

## Activation Contract

Use this skill when:
- User asks to commit, save, checkpoint, or push work.
- Worktree has mixed changes that must ship as separate logical units.
- History needs cleanup into a linear sequence (no merge noise, no "wip" commits).

## Hard Rules

- **One work-unit per commit**: one type + one scope + one reason to revert. Mixed concerns get split, never bundled.
- **Conventional format always**: `type(scope): subject` + optional body + footer. No bare messages, no past-tense novels.
- **Linear logical history**: rebase order, no merge commits, each commit builds on the previous one.
- **Verify before each commit**: `git status --short` + `git diff --stat` scoped to that unit only.
- **Never commit what you didn't review**: read the full diff of the unit you stage. No `git add -A` blind commits.

## Decision Gates

| Situation | Action |
|-----------|--------|
| Mixed files / concerns in worktree | Split into units first — see `references/splitting.md` |
| Unsure of type or scope | Look up `references/conventional-types.md`, derive scope from path |
| History has fixups / wip / merges | Reorder + squash via `rebase -i` before push |
| Tests / hooks fail on a unit | Fix forward in that unit, never commit broken to "fix later" |

## Execution Steps

1. **Map**: run `git status --short` and `git diff --stat`; list changed paths.
2. **Split**: group paths into work-units (one reason-to-revert each). Order: `feat`/`fix` first, then `refactor`, then `docs`/`chore`/`test`.
3. **Message**: for each unit write `type(scope): imperative subject ≤72 chars` + body explaining why + footer (`Refs:`, `BREAKING CHANGE:` if needed).
4. **Commit in order**: `git add <unit-paths>` then `git commit -m ...` one unit at a time. Re-check `status` between units.
5. **Verify linearity**: `git log --oneline -10` must read as a logical story; each commit passes checks independently.

## OmniRoute Compatibility

This skill is an omniskill: executable via OmniRoute Skills API + MCP, documentation via Agent Skills catalog.

- **Handler**: `handler.ts` exports `handler(input, { apiKeyId, sessionId })`. Register with `skillExecutor.registerHandler("git-commit-handler", handler)`.
- **Manifest**: `omniskill.json` mirrors the install payload (`name`, `version`, `description`, `schema.input/output`, `handler`, `mode`, `sourceProvider`, `tags`).
- **Install** (`POST /api/skills/install`, management auth):

```json
{
  "name": "git-commit", "version": "1.0.0",
  "description": "<same as frontmatter>",
  "schema": { "input": { "<from omniskill.json>" }, "output": { "<from omniskill.json>" } },
  "handlerCode": "git-commit-handler"
}
```

- **Execute via MCP**: `omniroute_skills_execute({ skillName: "git-commit", input: { subject: "feat(api): add retry", dry_run: true } })`.
- **Input**: `type | scope | subject (required) | body | paths[] | dry_run=true`. **Output**: `success, valid, proposed_message, worktree_status, diff_stat` (or `error`).
- Default `dry_run: true` = validate + propose only; `false` runs `git add <paths>` + `git commit`. Never `git add -A`.

## References

- `references/conventional-types.md` — Types, scope derivation, format spec, good/bad messages.
- `references/splitting.md` — Work-unit splitting rules, ordering, linear-history operations.
