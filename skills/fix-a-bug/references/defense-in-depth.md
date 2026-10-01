# Defense in Depth

Fixing the root cause repairs THIS bug. Layered guards stop the whole
CLASS of bug from silently recurring. Do the fix first, then add guards
— one fix plus guards, never guards instead of the fix.

## The three layers

| Layer | Guards against | Example |
|---|---|---|
| **Input boundary** | Bad data entering | Validate / reject unknown SKU at lookup; schema-check API payloads |
| **Service boundary** | Bad values crossing modules | Assert invariants where modules meet (`price` must be a finite number) |
| **Persistence / output** | Corrupt state surviving | DB constraint, non-null column, output schema check before render |

You rarely need all three. Pick the layers where THIS bug class would
next slip through silently, and guard those.

## Rules

- **One fix + layered guards, no bundled refactors.** Guards are small assertions/validations, not rewrites.
- **Each guard gets its own evidence**: a test or a log line proving it fires on bad input. A guard you can't demonstrate is decoration.
- **Fail loudly at guards.** Throw, reject, or alert — never silently coerce (`|| 0`, `try/except: pass`). Silent coercion converts a visible bug into hidden corruption.
- **Keep guards cheap.** A guard on a hot path must be O(1) and allocation-free-ish. Expensive validation belongs at the boundary, once.

## How much is enough

- Library / shared code → guard at all boundaries you own; callers are strangers.
- App code with one caller → guard at the input boundary; the rest is noise.
- Throwaway script → the regression test IS the guard. Skip the layers.
