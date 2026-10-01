# Splitting an Oversized PR

Default: split. `size:exception` is the last resort, not the first
excuse. A 1200-line PR gets skimmed, not reviewed.

## Split strategies (first fit wins)

1. **By concern.** Two intents hiding in one diff → two PRs, each with
   its own `Closes #`. Most common case. Just do it.
2. **By stack.** B depends on A → PR A (base `main`), PR B (base A's
   branch). Land A first, retarget B to `main`. Use for "refactor then
   feature on top".
3. **By flag.** Can't split behaviorally (large rename, generated
   code)? Ship behind a flag / as pure-move commits + behavior commits
   separated, so each half reviews cleanly.
4. **Pure-move separation.** Renames and moves in commits of their own
   (`git mv` only, zero edits). Reviewer verifies "no changes" via
   `git diff -w --stat`, then reviews behavior commits for real.

## size:exception — when splitting truly can't work

Document IN the PR body:

```markdown
`size:exception:` [why this cannot split — 1–2 sentences]
Review order: [which files to read first, what to skim]
```

Valid: generated-code deluge, mechanical codemod, vendored update.
Invalid: "deadline", "it's all related", "reviewer knows the context".

## Commands

```bash
git diff --stat main...HEAD        # how big, per file — find the split lines
git log --oneline main..HEAD      # one intent per commit? if not, reshape with git-commit first
git checkout -b <part-two> <split-point>  # carve the second PR off cleanly
gh pr create --base <base> --title "..." --body-file <file>
```
