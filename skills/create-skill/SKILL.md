---
name: create-skill
description: Create or update a repo skill with OmniRoute compatibility — scaffold SKILL.md + references/, handler.ts, omniskill.json, frontmatter omniroute block, and Compatibility section. Use when adding a new skill or converting an existing one to omniskill.
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
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

- **Four files make an omniskill**: `SKILL.md` + `references/` + `handler.ts` + `omniskill.json`. Missing one = not an omniskill.
- **Frontmatter carries the contract**: `name`, `description` (≤500 chars), `metadata.version`, plus the `omniroute:` block (`handler`, `mode`, `sourceProvider`, `tags`). No `omniroute:` block = docs-only skill.
- **Handler signature is exact**: `(input, { apiKeyId, sessionId }) => Promise<output>` with `export default handler`. See `references/omniroute-contract.md`. No other signature registers.
- **`handlerCode` is a name lookup**: install payload's `handlerCode` must equal the registered handler name (`<name>-handler`). Never inline source.
- **Description parity**: frontmatter `description` == `omniskill.json` `description` == install payload `description`. Three copies, one string.
- **Versions move together**: `SKILL.md` `metadata.version: "1.x"` ↔ `omniskill.json` `"version": "1.x.0"`. Contract change = minor bump both files.
- **Self-contained**: skills must not depend on external URLs when a local `references/` file works.

## Decision Gates

| Situation | Action |
|-----------|--------|
| New skill vs convert existing | New → scaffold all four files. Convert → keep content, add the three OmniRoute artifacts |
| Unsure of input/output schema | Derive from Execution Steps: each step's knobs become `schema.input` properties; each gate/checklist becomes `schema.output` |
| Handler does real side effects (`git`, `gh`, disk) | Default `dry_run: true` in schema; plan first, execute only on explicit `false` |
| Content-only edit (typo, example) | No bump, no handler change. Contract edit (schema/frontmatter/gates) → minor bump |
| Skill belongs to a pack | List under its group section in `README.md` + `AGENTS.md`, not the flat list |

## Execution Steps

1. **Name**: lowercase kebab-case verb phrase (`create-skill`, not `SkillForge`). Create `skills/<name>/`.
2. **Write SKILL.md**: frontmatter → Activation Contract → Hard Rules → Decision Gates → Execution Steps → OmniRoute Compatibility → References. Keep the Compatibility section wording parallel to existing omniskills.
3. **Write references/**: one file per Decision-Gate row or Execution step that needs more than a paragraph. Every `references/*.md` link in SKILL.md must exist on disk.
4. **Write handler.ts**: implement the gates as branches returning `{ success, skill, gate, ... }`. `dry_run: true` default for side-effecting skills. Pure-logic skills (validators, scorers) need no `dry_run`.
5. **Write omniskill.json**: `name`, `version`, `description` (parity), `schema.input/output` (JSON Schema), `handler: "<name>-handler"`, `mode: "auto"`, `sourceProvider: "local"`, `tags`.
6. **Wire frontmatter**: add the `omniroute:` block mirroring `omniskill.json` (`handler`, `mode`, `sourceProvider`, `tags`).
7. **Verify**: JSON parses, handler exports `handler` + `default`, descriptions match, every `references/` link resolves, versions in lockstep.
8. **Register docs**: add the one-line summary to `README.md` + `AGENTS.md` Available Skills (flat list or pack group).

## OmniRoute Compatibility

This skill is an omniskill: executable via OmniRoute Skills API + MCP, documentation via Agent Skills catalog.

- **Handler**: `handler.ts` exports `handler(input, { apiKeyId, sessionId })`. Register with `skillExecutor.registerHandler("create-skill-handler", handler)`.
- **Manifest**: `omniskill.json` mirrors the install payload (`name`, `version`, `description`, `schema.input/output`, `handler`, `mode`, `sourceProvider`, `tags`).
- **Install** (`POST /api/skills/install`, management auth): `handlerCode` = `create-skill-handler` (handler-name lookup, not eval'd code).
- **Execute via MCP**: `omniroute_skills_execute({ skillName: "create-skill", input: { action: "validate", name: "my-skill" } })`.
- **Actions**: `scaffold | validate | update-plan`. `scaffold` returns file templates; `validate` checks the four-file contract; `update-plan` diffs contract impact and states the bump.

## References

- `references/omniroute-contract.md` — Skill record, handler signature, install payload, modes (OmniRoute source of truth subset).
