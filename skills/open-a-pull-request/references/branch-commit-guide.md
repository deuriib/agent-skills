# Branch + Commit Guide

## Branch Naming

Pattern:

```text
^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$
```

Rules: all lowercase. Separators hyphen/dot/underscore only. Short and
descriptive — the issue number is for the body, not the branch name.

Good / bad:

```text
GOOD  feat/checkout-validation
GOOD  fix/unknown-sku-throws
GOOD  docs/pr-body-update
BAD   Fix/Checkout_Validation        ← capitals + underscores read fine but break the pattern
BAD   feat/checkout validation       ← spaces never work
BAD   johns-branch                   ← no type prefix, ungreppable
BAD   feat/a-very-long-branch-name-that-describes-the-whole-spec-in-detail  ← title, not a name
```

## Conventional Commits

Pattern:

```text
^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9._-]+\))?!?: .+
```

Format: `<type>(<optional-scope>)!: <description>`, imperative mood,
subject ≤ 72 chars, no trailing period.

```text
GOOD  feat(checkout): reject unknown SKU at lookup
GOOD  fix(review): correct the exception path on a CLOSED gate
GOOD  docs: update PR body template
BAD   update stuff                   ← no type, no scope, not imperative
BAD   feat(Auth): Added new things.  ← capitalized scope, past tense, period, vague
```

Breaking changes: append `!` (`feat(api)!: ...`) with a
`BREAKING CHANGE:` footer explaining migration.

Scope = deepest meaningful directory or package name
(`skills/git-commit/*` → `git-commit`). Omit scope only for truly
repo-wide changes. One scope per commit — two scopes is two commits.

## The rules that actually get PRs rejected

- Never add `Co-Authored-By` or AI-attribution trailers.
- Never force-push to `main`/`master`. Rewriting YOUR PR branch after
  review started → leave a comment saying so.
- Each commit must pass checks on its own — any prefix of the branch is
  a working tree.
