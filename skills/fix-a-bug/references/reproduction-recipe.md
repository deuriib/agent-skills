# Reproduction Recipe

A bug that can't be reproduced on demand can't be fixed with confidence.
Write the repro FIRST, as a script, before any theory.

## Minimal-repro template

```text
SYMPTOM:   [one sentence — what happens]
EXPECTED:  [one sentence — what should happen]
TRIGGER:   [exact command / click-path / input that causes it]
ENV:       [OS, runtime version, branch/commit, relevant config]
FREQUENCY: [always | N of M runs | only under condition X]
```

## Script-it-first rule

If re-running the repro costs more than ~10 seconds of your time, automate it:

- Prefer a failing test in the repo's own framework (`pytest`, `vitest`, `go test`, whatever the repo uses).
- Otherwise a shell script (`repro.sh`) that exits nonzero on failure.
- The script must print: the bad value, where it surfaced, and the exit signal.

Re-run the script after EVERY hypothesis test. No "I think it works now" without a green run.

## What to record (and keep)

1. Full error text + stack trace, untrimmed, first occurrence.
2. Exact steps from a clean state (fresh checkout, clean env) to failure.
3. `git log --oneline -10` and `git status --short` at time of repro — proves what code actually ran.
4. Config presence, not config contents: "API key env var SET/UNSET", never the value.

## After 3 failed repro attempts — stop

Do not start fixing. Write down:

- The 3 approaches tried and what each produced.
- What differs between your env and the reporter's (version, OS, data, flags).
- The single missing detail you're asking for.

A precise "I need X to reproduce this" beats a blind fix every time.
