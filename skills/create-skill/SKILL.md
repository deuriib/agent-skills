---
name: create-skill
description: Use when creating a new repo skill, converting one to omniskill, updating schema/handler/docs, or reviewing skill compliance. Scaffolds SKILL.md + references/assets/scripts, handler.ts, omniskill.json with contract validation.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.2"
omniroute:
  handler: create-skill-handler
  mode: auto
  sourceProvider: local
  tags: [meta, scaffolding, omniroute, omniskill]
---

# Skill: create-skill

## Activation Contract

Use this skill when:
- Creating a brand-new skill in `skills/<name>/`.
- Converting an existing skill to an omniskill (OmniRoute-compatible).
- Updating a skill's schema, handler, or docs and needing the version bump + compat check.
- Reviewing someone else's skill for repo-convention + OmniRoute-contract compliance.

Do NOT use this skill when:
- The task is using a skill (committing, debugging, opening a PR) — invoke that skill instead.
- The change is content-only inside `references/` with no contract impact — edit + commit, no version bump needed.

## Hard Rules

- **Four files make an omniskill**: `SKILL.md` + `references/` + `handler.ts` + `omniskill.json`, all at the skill root. Missing one = not an omniskill. `assets/` and `scripts/` are optional siblings: static files go to `assets/`, runnable helpers go to `scripts/` — never at root, never inside `references/`.
- **Frontmatter carries the contract**: `name`, `description` (≤500 chars), `metadata.version`, plus the `omniroute:` block (`handler`, `mode`, `sourceProvider`, `tags`). No `omniroute:` block = docs-only skill.
- **Description is trigger, not summary**: start with "Use when…", third person, symptoms and contexts only. Never summarize the workflow — agents follow the description *instead of* reading the body. See `references/skill-craft.md` §1.
- **Handler signature is exact**: `(input, { apiKeyId, sessionId }) => Promise<output>` with `export default handler`. See `references/omniroute-contract.md`. No other signature registers.
- **`handlerCode` is a name lookup**: install payload's `handlerCode` must equal the registered handler name (`<name>-handler`). Never inline source.
- **Description parity**: frontmatter `description` == `omniskill.json` `description` == install payload `description`. Three copies, one string.
- **Versions move together**: `SKILL.md` `metadata.version: "1.x"` ↔ `omniskill.json` `"version": "1.x.0"`. Contract change = minor bump both files.
- **Self-contained**: skills must not depend on external URLs when a local `references/` file works.
- **Lean body, heavy references**: SKILL.md stays readable in one pass (gates + steps + one good example). Anything needing more than a paragraph → `references/`; runnable code → `scripts/`; static payloads → `assets/`.
- **Match the form to the failure**: rule-breaking under pressure → prohibition + rationalization table + red flags; wrong-shaped output → positive recipe; missing element → REQUIRED slot; conditional behavior → predicate-keyed conditional. No nuance clauses. See `references/skill-craft.md` §4.
- **No skill without its test**: every omniskill ships an L1 handler smoke; discipline skills (gates, must-do steps) also pay for L2 pressure scenarios. See `references/testing-skills.md`.

## Decision Gates

| Situation | Action |
|-----------|--------|
| New skill vs convert existing | New → scaffold all files. Convert → keep content, add the three OmniRoute artifacts |
| Unsure the skill should exist | Create only if non-obvious, reusable across projects, broadly applicable. One-offs / project conventions / automatable checks → don't create (`references/skill-craft.md` §7) |
| Unsure of skill type | Technique → steps + L1; Pattern → mental model + L0; Reference → lookup + L0 only; Discipline → prohibitions + L2, always (`references/skill-craft.md` §5) |
| Unsure of input/output schema | Derive from Execution Steps: each step's knobs become `schema.input` properties; each gate/checklist becomes `schema.output` |
| Description sketches the workflow | Rewrite trigger-only: symptoms, contexts, keywords. No process summary (`references/skill-craft.md` §1) |
| Guidance shape unclear | Classify the baseline failure first, then pick the matching form — never prohibition by default (`references/skill-craft.md` §4) |
| Handler does real side effects (`git`, `gh`, disk) | Default `dry_run: true` in schema; plan first, execute only on explicit `false` |
| Content-only edit (typo, example) | No bump, no handler change. Contract edit (schema/frontmatter/gates) → minor bump |
| Skill belongs to a pack | List under its group section in `README.md` + `AGENTS.md`, not the flat list |

## Execution Steps

1. **Name**: lowercase kebab-case verb phrase (`create-skill`, not `SkillForge`). Create `skills/<name>/`.
2. **Write SKILL.md**: frontmatter → Activation Contract → Hard Rules → Decision Gates → Execution Steps → OmniRoute Compatibility → References. Keep the Compatibility section wording parallel to existing omniskills.
3. **Write references/**: one file per Decision-Gate row or Execution step that needs more than a paragraph. Every local link in SKILL.md must exist on disk. Prose docs live here — including machine-readable specs (e.g. token files in `DESIGN.md` format). Templates, images, fonts go to `assets/`; runnable `.sh/.mjs/.py` go to `scripts/`.
4. **Write handler.ts**: implement the gates as branches returning `{ success, skill, gate, ... }`. `dry_run: true` default for side-effecting skills. Pure-logic skills (validators, scorers) need no `dry_run`.
5. **Write omniskill.json**: `name`, `version`, `description` (parity), `schema.input/output` (JSON Schema), `handler: "<name>-handler"`, `mode: "auto"`, `sourceProvider: "local"`, `tags`.
6. **Wire frontmatter**: add the `omniroute:` block mirroring `omniskill.json` (`handler`, `mode`, `sourceProvider`, `tags`).
7. **Craft check**: description trigger-only? Form matches failure type? SKILL.md lean (`wc -w`)? Keywords an agent would grep for present? See `references/skill-craft.md`.
8. **Test**: L1 handler smoke always (guards fire, happy path, idempotence); L0 retrieval for reference skills; L2 pressure scenarios (RED baseline → GREEN → REFACTOR) for discipline skills. See `references/testing-skills.md`.
9. **Verify**: JSON parses, handler exports `handler` + `default`, descriptions match, every link resolves, versions in lockstep.
10. **Register docs**: add the one-line summary to `README.md` + `AGENTS.md` Available Skills (flat list or pack group).

## OmniRoute Compatibility

This skill is an omniskill: executable via OmniRoute Skills API + MCP, documentation via Agent Skills catalog.

- **Handler**: `handler.ts` exports `handler(input, { apiKeyId, sessionId })`. Register with `skillExecutor.registerHandler("create-skill-handler", handler)`.
- **Manifest**: `omniskill.json` mirrors the install payload (`name`, `version`, `description`, `schema.input/output`, `handler`, `mode`, `sourceProvider`, `tags`).
- **Install** (`POST /api/skills/install`, management auth): `handlerCode` = `create-skill-handler` (handler-name lookup, not eval'd code).
- **Execute via MCP**: `omniroute_skills_execute({ skillName: "create-skill", input: { action: "validate", name: "my-skill" } })`.
- **Actions**: `scaffold | validate | update-plan`. `scaffold` returns file templates; `validate` checks the four-file contract; `update-plan` diffs contract impact and states the bump.

## References

- [references/omniroute-contract.md](references/omniroute-contract.md) — Skill record, handler signature, install payload, modes (OmniRoute source of truth subset).
- [references/skill-craft.md](references/skill-craft.md) — Discovery (SDO), leanness, freedom/form matching, bulletproofing kit, whether to create.
- [references/testing-skills.md](references/testing-skills.md) — L0/L1/L2 test levels, RED-GREEN-REFACTOR for docs, pressure scenarios, anti-patterns.

## Canonical Layout (repo format — mirrors AGENTS.md)

```text
skills/<name>/
├── SKILL.md          # Entry point: frontmatter + instructions (required)
├── references/       # Additional docs (required)
├── assets/           # Templates, images, fonts, token files (omit if none)
├── scripts/          # Executable .sh/.mjs/.py helpers (omit if none)
├── handler.ts        # Root level (omniskills; omit only for docs-only skills)
└── omniskill.json    # Root level (omniskills; omit only for docs-only skills)
```

- `references/` = prose docs (guides, specs, contracts) — see [references/omniroute-contract.md](references/omniroute-contract.md) for the OmniRoute subset. Templates → `assets/`, executables → `scripts/` — never in `references/`.
- `assets/` = static payloads consumed as data (template files of any kind, images, fonts — e.g. [project-bootstrap's templates](../project-bootstrap/assets/templates/)). `scripts/` = runnable helpers (grouped subdirs are fine — e.g. htpy's scripts/examples/). Neither holds standalone `*.md` prose docs.
