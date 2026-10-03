# Skill Craft — discovery, shape, and bulletproofing

Distilled from superpowers `writing-skills` + Anthropic authoring guidance,
adapted to this repo's canonical layout (`SKILL.md` + `references/` + `assets/` +
`scripts/`, omniskill root files). Read this when drafting or hardening a skill.

## 1. Description is trigger, not summary (SDO)

The `description` is what agents scan to decide whether to load the skill.
It must answer **"should I read this right now?"** — nothing else.

- Start with **"Use when..."**, third person, symptoms and contexts only.
- **Never summarize the workflow.** Agents follow the description *instead of*
  reading the body — a description that sketches the process becomes a shortcut
  that bypasses your gates and flowcharts.
- Cover keywords an agent would grep for: error strings, symptoms
  ("flaky", "loop", "drift"), synonyms ("timeout/hang/freeze"), tool and file
  names. Repo tags (`omniroute.tags`) carry the rest.

```yaml
# BAD: workflow summary — agents skip the body and freestyle the steps
description: Bootstrap a project by scaffolding gitignore, npmrc, license and docs with dry-run first
# GOOD: trigger only
description: Use when a repo is missing standard hygiene files or a new project needs its baseline scaffold
```

## 2. Keep SKILL.md lean

SKILL.md loads on every match; every token competes with conversation context.
Target: readable in one pass (this repo's healthy skills sit well under
~600 words; check with `wc -w skills/<name>/SKILL.md`).

- Overview + gates + steps inline. Anything needing more than a paragraph of
  reference → `references/`. Runnable code → `scripts/`. Static payloads →
  `assets/`. One excellent inline example beats five mediocre ones.
- Don't repeat what's in a cross-referenced file. Don't restate the obvious.
- Name sections by what they *decide* (`## Decision Gates`), not filler.

## 3. Match the degree of freedom to the task

| Task shape | Guidance style |
|---|---|
| Fragile, exactness matters (commands, schemas, contracts) | Low freedom: exact steps, verbatim commands, schemas |
| Judgment-heavy, context-dependent (reviews, triage) | High freedom: heuristics, principles, red flags |
| Mixed | Medium: recipe with named decision points |

Over-specifying a judgment task breeds workarounds; under-specifying a fragile
task breeds drift. Pick per section, not per skill.

## 4. Match the form to the failure

Before writing guidance, classify how agents fail *without* the skill.
The wrong form measurably backfires:

| Baseline failure | Right form | Wrong form |
|---|---|---|
| Knows the rule, skips it under pressure | Prohibition + rationalization table + red flags (§6) | Soft guidance ("prefer…", "consider…") |
| Complies, but output has the wrong shape | Positive recipe: what the output IS, parts in order | Prohibition list ("don't restate…") |
| Omits a required element | Structural: REQUIRED field/slot in the template | Prose reminders near the template |
| Behavior should depend on a condition | Conditional on an observable predicate | Unconditional rule + exemption clauses |

Rules for whichever form you pick: **no nuance clauses** ("don't X unless it
matters" reopens negotiation — express a real exception as its own
conditional), and exemption clauses don't scope (restructure so the rule can't
reach the exempt part).

## 5. Skill types (determines testing + `dry_run`)

| Type | What it is | Test level (see `testing-skills.md`) |
|---|---|---|
| Technique | Concrete method with steps | L1 handler smoke, or L2 if it has compliance cost |
| Pattern | Way of thinking, mental model | L0 retrieval + application scenario |
| Reference | API docs, syntax, lookup tables | L0 retrieval check only |
| Discipline | Rules under pressure (TDD, gates, verify-first) | L2 pressure scenarios, always |

Side-effecting handlers (`git`, `gh`, disk writes) default `dry_run: true`
regardless of type. Pure-logic skills (validators, scorers) need no `dry_run`.

## 6. Bulletproofing kit (discipline skills only)

Use when agents know the rule and skip it anyway. Skip for reference skills —
prohibition-based bulletproofing backfires on shaping problems (§4).

- **Close loopholes explicitly.** `Write code before test? Delete it. Start
  over. No exceptions: don't keep it as "reference", don't "adapt" it, delete
  means delete.`
- **Foundational principle early:** violating the letter is violating the
  spirit. Cuts off the whole "spirit, not letter" rationalization class.
- **Rationalization table:** every excuse observed in testing gets a row
  (`| "Tests after achieve the same" | Tests-after asks "what does this do?", tests-first asks "what should this do?" |`).
- **Red-flags list:** self-check symptoms (`"I already manually tested it"`,
  `"this is different because…"` → stop, start over).
- **Violation symptoms in the description:** add the signs you're *about* to
  break the rule, so discovery fires before the violation.

## 7. Whether a skill should exist at all

Create when the technique wasn't intuitively obvious, you'd reference it across
projects, and it applies broadly. **Don't create** for one-offs, standard
practice documented elsewhere, project-specific conventions (those belong in
the instructions file), or mechanical constraints — if it's enforceable with a
check or regex, automate it and save prose for judgment calls.

## 8. File-organization mapping

| Superpowers shape | Repo canonical layout |
|---|---|
| Self-contained (everything inline) | `SKILL.md` only (+ omniskill roots) |
| Reusable tool / runnable helper | `scripts/` (grouped subdirs like `scripts/examples/` are fine) |
| Heavy reference (100+ lines) | `references/` (one file per gate/step) |
| Static payload consumed as data | `assets/` (templates any extension, images, fonts) |

Invoke bundled scripts through their interpreter (`bash scripts/tool.sh`),
never by bare path — some packagers strip executable bits.
