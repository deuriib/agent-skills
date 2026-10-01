# Root-Cause Tracing

Fix at the source, not at the symptom. The crash site is where the bad
value SURFACED — the bug lives where the value WENT WRONG.

## The backward walk

Start at the line that failed. Ask, frame by frame up the call stack:

1. Who called this, with what value?
2. Where did THAT value come from?
3. At which frame should the value have been different?

Stop at the first frame where the answer is "here it should have been
different." That frame owns the fix. Everything downstream of it is
symptom.

## Rules

- **One frame at a time.** Don't skip levels because the middle "looks fine" — verify each with the actual runtime value (log, debugger, print), not by reading.
- **Compare against a working path** when one exists: same function, good input vs bad input. List every difference in arguments, config, and state — the root cause hides in the diff.
- **No hypothesis during the walk.** Tracing is data collection. Theories come after the walk completes, one at a time.
- **Mask at every boundary.** Log entry/exit values with secrets and PII redacted (`<REDACTED>` placeholders). If you can't log it masked, describe its shape ("token present, 40 chars") instead.

## Worked shape

```text
CRASH:   checkout fails — `total` is NaN at render(cart.js:42)
FRAME+1: render called with cart { items: [...], total: NaN }  ← surfaced here
FRAME+2: cart built by summarize(items) → total NaN because one item.price is undefined
FRAME+3: item.price undefined because product lookup returned {} for SKU "X-404"
ORIGIN:  product catalog has no SKU "X-404" — lookup silently returns {} instead of throwing
FIX AT ORIGIN: lookup throws on unknown SKU (or caller validates). Not a NaN-guard in render.
```

## Anti-patterns

| Anti-pattern | Why it fails |
|---|---|
| Guard at crash site only (`total \|\| 0`) | Hides the missing-SKU bug; next consumer breaks silently |
| Fixing two frames "just in case" | Stacked fixes — you no longer know which one worked |
| "The types say this can't be undefined" | Types describe intent; runtime values describe reality. Check runtime |
