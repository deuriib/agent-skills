---
name: fix-a-bug
description: Use when something is broken, a test fails, or behavior is not what was expected. Reproduce first, trace to root cause with one hypothesis at a time, then fix small with a regression test.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.1"
---

# Skill: fix-a-bug

## Activation Contract

Use this skill when:
- Something is broken: error, crash, wrong output, failing test.
- Behavior changed after a recent edit, upgrade, or deploy.
- A flaky test or intermittent failure needs a real cause, not a retry.

Do NOT use this skill when:
- The request is a new feature or behavior change — that's design work, not a bug.
- The "bug" has no observable symptom yet ("might break someday") — write the test first, then decide.
- You already know the one-line fix and it is trivially safe (typo, wrong string) — fix it, run the tests, move on.

## Hard Rules

- **Reproduce before you theorize**: no hypothesis, no fix talk, until the failure is observable on demand with exact steps. Guesses before reproduction are banned.
- **One hypothesis at a time**: state one theory ("X is root cause because Y"), test it with the smallest single-variable change. Never stack fixes.
- **Fix at source, not at symptom**: trace the bad value backward to where it should have been different. Patching downstream call sites is forbidden.
- **Smallest fix that kills the root cause**: one cause, one fix. No bundled refactors, no drive-by cleanups — those are separate commits.
- **Every fix ships with a regression test**: the reproduction becomes a failing-first test, committed alongside the fix. A fix without a test is not done.
- **Never log secrets or PII**: mask tokens, credentials, sessions, and personal data in repros, logs, and pasted evidence. Placeholders only.

## Decision Gates

| Situation | Action |
|-----------|--------|
| Can't reproduce after 3 serious attempts | Stop fixing. Write down exact steps tried, environment, and what differs from the report — see `references/reproduction-recipe.md`. Ask for the missing detail. |
| No working example exists in the codebase | Skip pattern-matching; go straight to backward tracing — see `references/root-cause-tracing.md`. |
| Two hypotheses failed in a row | Stop and widen: re-read the full error, check assumptions (wrong file? stale cache? wrong env?). Say "I don't understand X yet" and research before fix #3. |
| Fix #3 also fails | Escalate to a human with evidence so far. No fix #4 alone. |
| Failure is timing-dependent / flaky | Poll on an explicit condition with a deadline, never `sleep N` and pray — see `references/condition-based-waiting.md`. |
| Same class of bug could recur elsewhere | Add layered guards after the root-cause fix — see `references/defense-in-depth.md`. |
| Fix works, suite passes | Lock it in with the regression test and edge cases — see `references/verify-fix.md`. |

## Execution Steps

1. **Capture**: read the FULL error — message, stack trace, exit code, logs around it. Note what was expected vs what happened, in one sentence each.
2. **Reproduce**: build the minimal reproduction — fewest steps, smallest input that still fails. Script it so re-running costs seconds — see `references/reproduction-recipe.md`.
3. **Scope**: check recent diffs (`git log --oneline -10`, `git blame` on the failing lines). Was this ever working? What changed since?
4. **Trace**: walk the bad value backward frame by frame to its origin — see `references/root-cause-tracing.md`. If a working example exists nearby, diff against it field by field.
5. **Hypothesize**: write one sentence — "X is root cause because Y". Test with the smallest single-variable change. Confirmed or rejected, never both; on reject, form a NEW hypothesis.
6. **Fix**: apply the smallest change at the source. Then turn the repro into a regression test (fails without the fix, passes with it).
7. **Verify**: run the regression test, the surrounding suite, and edge cases — see `references/verify-fix.md`. Then harden with layered guards if the bug class can recur.

## Red Flags

- "Quick fix now, test later" → STOP. Repro first.
- "Try X and see" without a stated hypothesis → STOP. One theory, then test.
- Each attempt surfaces symptoms in a new area → STOP. You're patching symptoms; return to step 4.
- "Probably X" → STOP. "Probably" is not evidence; go back to step 2.

## References

- `references/reproduction-recipe.md` — Minimal-repro template, script-it-first rule, what to record.
- `references/root-cause-tracing.md` — Backward-trace technique frame by frame.
- `references/condition-based-waiting.md` — Polling on conditions instead of arbitrary sleeps.
- `references/defense-in-depth.md` — Layered guards so the bug class can't silently recur.
- `references/verify-fix.md` — Regression test + edge cases + suite-green checklist.
