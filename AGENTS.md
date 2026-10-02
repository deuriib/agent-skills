# Agent Instructions: agent-skills

This repository is a collection of portable AI agent skills. Every subdirectory in `skills/` must follow the Skill Definition format.

## Repository Structure & Conventions

- **Skills Location**: All skills live in `skills/<skill-name>/`.
- **Mandatory Files**:
  - `SKILL.md`: The main entry point containing frontmatter (trigger, name, description) and instructions.
  - `references/`: Local documentation that the skill refers to.
- **Omniskill Files** (default for every skill — docs-only is the exception):
  - `handler.ts`: OmniRoute `SkillHandler` (`handler(input, { apiKeyId, sessionId })` + `export default handler`).
  - `omniskill.json`: Install manifest mirroring the `POST /api/skills/install` payload (`name`, semver `version`, `description`, `schema.input/output`, `handler`, `mode`, `sourceProvider`, `tags`).
  - `SKILL.md` carries the `omniroute:` frontmatter block + a `## OmniRoute Compatibility` section before `## References`.

## Available Skills

- **animate-ui**: [skills/animate-ui/SKILL.md](skills/animate-ui/SKILL.md)
- **azul-payment**: [skills/azul-payment/SKILL.md](skills/azul-payment/SKILL.md)
- **better-auth-plugin**: [skills/better-auth-plugin/SKILL.md](skills/better-auth-plugin/SKILL.md)
- **create-skill**: [skills/create-skill/SKILL.md](skills/create-skill/SKILL.md)
- **fix-a-bug**: [skills/fix-a-bug/SKILL.md](skills/fix-a-bug/SKILL.md)
- **github-issues**: [skills/github-issues/SKILL.md](skills/github-issues/SKILL.md)
- **git-commit**: [skills/git-commit/SKILL.md](skills/git-commit/SKILL.md)
- **htmx**: [skills/htmx/SKILL.md](skills/htmx/SKILL.md)
- **htpy**: [skills/htpy/SKILL.md](skills/htpy/SKILL.md)
- **init-deep**: [skills/init-deep/SKILL.md](skills/init-deep/SKILL.md)
- **lago**: [skills/lago/SKILL.md](skills/lago/SKILL.md)
- **lago-payment-integration**: [skills/lago-payment-integration/SKILL.md](skills/lago-payment-integration/SKILL.md)
- **mintoria-brand-guidelines**: [skills/mintoria-brand-guidelines/SKILL.md](skills/mintoria-brand-guidelines/SKILL.md)
- **open-a-pull-request**: [skills/open-a-pull-request/SKILL.md](skills/open-a-pull-request/SKILL.md)
- **pi-agent**: [skills/pi-agent/SKILL.md](skills/pi-agent/SKILL.md)
- **wifi-roam-fix**: [skills/wifi-roam-fix/SKILL.md](skills/wifi-roam-fix/SKILL.md)

## Developer Workflows

### Creating a New Skill

Use the [create-skill](skills/create-skill/SKILL.md) skill — it scaffolds and validates the full contract (`scaffold` → fill → `validate`). Manual path:

1. Scaffold `skills/<name>/` with all four files: `SKILL.md` + `references/` + `handler.ts` + `omniskill.json`.
2. Populate frontmatter (`name`, `description` ≤500 chars, `metadata.version` starting at `"1.0"`) plus the `omniroute:` block (`handler: <name>-handler`, `mode: auto`, `sourceProvider: local`, `tags`) — see `skills/git-commit/SKILL.md` for reference.
3. Write `handler.ts` with the exact signature `(input, { apiKeyId, sessionId }) => Promise<output>`; side-effecting skills (`git`, `gh`, disk) default `dry_run: true`.
4. Write `omniskill.json` with `description` identical to the frontmatter and semver `version` (`"1.x"` ↔ `"1.x.0"` move together).
5. Add a summary of the skill to `README.md` under "Available Skills" and to the list above.
6. If the skill is part of a pack (a set of skills that work together, e.g. `frame-intent` → `ship-release`), add it to its group section in both `README.md` and `AGENTS.md` instead of the flat list.

### Updating a Skill

- Content-only edit (typo, example, extra reference) → no version change.
- Contract change (schema, frontmatter, gates, handler behavior) → minor bump in **both** files (`metadata.version` `"1.x"` → `"1.x+1"`, manifest `"1.x.0"` → `"1.x+1.0"`).

### Verification

- **Link Integrity**: Verify that all paths in `SKILL.md` sections like `## References` point to existing files in the local `references/` directory.
- **Contract Checks** (or run `create-skill` with `{ action: "validate", name }`): `omniskill.json` parses as JSON with semver `version`; `handler.ts` exports `handler` + `default`; frontmatter `description` == manifest `description`; `handler` field == `<name>-handler`; versions in lockstep.

## Critical Constraints

- **Self-Contained**: Skills should not depend on external URLs if a local reference can be provided.
- **Badge Maintenance**: The `README.md` must preserve the `skills.sh` badge. If the repository name or owner changes, update the badge URL immediately.
