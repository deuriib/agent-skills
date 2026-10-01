# Verify the Fix

"Works on my machine once" is not verified. A fix is done when the
regression test exists, the suite is green, and the edges are probed.

## Checklist (~5 min)

1. **Regression test fails without the fix.** Stash the fix (`git stash`), run the new test, watch it fail. Restore, watch it pass. If it passes without the fix, it tests nothing — rewrite it.
2. **Repro script passes consistently.** Run it 3×, or 10× for timing-dependent bugs. One green run proves nothing for flakes.
3. **Surrounding suite is green.** Run at minimum the package/module suite the fix touches. Prefer the full suite when it takes under ~5 min.
4. **Edge cases probed.** For the fixed function, try: empty input, null/undefined, boundary values (0, -1, max), and the exact reported input. One test per edge that matters — not exhaustive combinatorial coverage.
5. **No collateral damage.** `git diff --stat` shows ONLY the fix + test (+ guards). No stray files, no debug prints, no commented code.

## Commands (adapt to the repo)

```bash
git stash && <run-new-test> ; git stash pop   # 1. proves the test guards the fix
<run-new-test> && <run-new-test> && <run-new-test>  # 2. consistency
<repo-test-command>                           # 3. suite green (pytest / vitest / go test / npm run …)
git diff --stat                               # 5. scope check
```

## Done means

- New regression test committed ALONGSIDE the fix (same commit or stacked commit — never "test later").
- Suite green, edges covered, diff scoped.
- Repro script kept or deleted deliberately: keep it if CI doesn't cover the case, delete it if the regression test subsumes it.
