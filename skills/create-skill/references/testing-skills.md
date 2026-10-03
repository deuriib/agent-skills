# Testing Skills — RED-GREEN for documentation

Distilled from superpowers `testing-skills-with-subagents`, adapted to this
repo: `handler.ts` gives us cheap L1 verification; pressure scenarios (L2)
are reserved for skills with compliance cost.

**Core principle:** if you didn't watch an agent fail without the skill, you
don't know if the skill teaches the right thing.

## Test levels — match effort to skill type

| Level | What | When | How |
|---|---|---|---|
| L0 — Retrieval | Can an agent find and apply the doc? | Reference / pattern skills | Ask a realistic question; check it finds the right section and applies it |
| L1 — Handler smoke | Does the contract hold? | Every omniskill, always | Tmpdir run: guards fire, happy path writes, re-run is non-destructive, JSON parses |
| L2 — Pressure scenarios | Does the rule hold under pressure? | Discipline skills (gates, must-do steps) | RED baseline without skill → GREEN with skill → REFACTOR loopholes |

Reference skills stop at L0. Omniskills always get L1. Only discipline skills
pay for L2 — that's the expensive one, and the one that prevents real damage.

## L1: handler smoke (template)

Every omniskill ships with a runnable smoke. Adapt per skill:

1. **Guards fire** — missing/unknown input returns the gate, writes nothing.
2. **Happy path** — dry run plans, real run writes, placeholders render, no
   leftover `{{tokens}}`.
3. **Idempotent** — re-run without `force` is non-destructive.
4. **Contract** — `omniskill.json` parses, semver valid, handler name matches,
   versions in lockstep (see `create-skill` validate).

## L2: pressure scenarios (discipline skills only)

### RED — baseline without the skill

Write 3+ scenarios combining pressures (time + sunk cost + authority +
exhaustion + social). Force an explicit choice — concrete A/B/C options, real
paths, real stakes, no easy "ask the user" out. Run **without** the skill and
document failures **verbatim**: exact choices, exact rationalizations, which
pressures triggered them. Now you know what the skill must prevent.

**Bad:** "You need to implement a feature. What does the skill say?"
(academic — agents just recite.) **Good:** sunk cost + deadline + authority in
one scenario that makes the agent *want* to violate.

### GREEN — minimal skill, verify compliance

Write the smallest skill addressing the observed failures — not hypothetical
ones. Re-run the same scenarios **with** the skill. The agent should comply and
cite the new sections. If it still fails, the skill is unclear, not the agent.

### REFACTOR — close loopholes, re-verify

Each new rationalization gets: an explicit negation in the rules, a row in the
rationalization table, a red-flag entry, and (if it changes discovery) a
description update. Then re-test. Stop when the agent complies under maximum
pressure and meta-testing ("how could the skill have made this clearer?")
returns "it was clear, I should have followed it".

### Micro-test wording before full scenarios

Full pressure runs are slow. Verify wording first: one fresh-context sample
per variant, always with a **no-guidance control** (if the control doesn't
fail, there's nothing to fix), 5+ reps, read every flagged match manually —
template echoes masquerade as hits. Variance across reps means the wording
isn't binding: tighten the form before adding words.

## Anti-patterns

- **Skipping RED** ("the skill is obviously clear") — clear to you ≠ clear to
  other agents. Baseline first, always.
- **Single-pressure tests** — agents resist one pressure, break under three.
- **Vague fixes** ("don't cheat") — add explicit negations per rationalization.
- **Stopping after first green** — one pass ≠ bulletproof. Keep the REFACTOR
  loop until no new rationalizations appear.
- **Batching untested skills** — deploy one skill at a time, each verified.
  Untested changes aren't "reference", they're debt.
