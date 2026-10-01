# Conventional Types & Message Format

## Format

```text
type(scope): imperative subject ≤72 chars

Optional body: what changed and why (not how). Wrap at 72.

Optional footer: Refs: <issue/PR> / BREAKING CHANGE: <migration>
```

Rules: lowercase `type` and `scope`. No trailing period on subject.
Imperative mood: `add`, `fix`, `drop` — not `added`, `fixes`, `adds`.

## Types (default first match wins)

| Type | Use when |
|------|----------|
| `feat` | New user-visible capability or behavior |
| `fix` | Bug fix, no behavior addition |
| `refactor` | Code change, no feat, no fix |
| `perf` | Performance improvement only |
| `test` | Tests only, no production code |
| `docs` | Docs, comments, README, skill text |
| `style` | Formatting, lint, no logic change |
| `build` | Deps, bundling, packaging |
| `ci` | Pipelines, workflows, automation config |
| `chore` | Everything else that ships (tooling, cleanup) |
| `revert` | Full revert: `revert(scope): revert "<original subject>"` |

Default: uncertain between `refactor`/`chore` → `chore`. Never use `wip`, `update`, `misc`.

## Scope derivation

Scope = the module the change belongs to, kebab-case, derived from path:

1. Deepest meaningful directory: `skills/git-commit/references/foo.md` → `git-commit`.
2. Monorepo package name when it exists: `packages/auth/*` → `auth`.
3. Omit scope (bare `type:`) ONLY when the change is truly repo-wide (root config, bulk rename).

One scope per commit. Two scopes = two commits.

## Good vs bad

```text
GOOD  feat(git-commit): add work-unit splitting reference
GOOD  fix(auth): drop stale session on token refresh
GOOD  docs(readme): list git-commit skill
BAD   update stuff                        ← no type, no scope, not imperative
BAD   feat(Auth): Added new things.       ← capitalized scope, past tense, period, vague
BAD   fix(api,auth): patch login and billing ← two scopes, two units bundled
```
