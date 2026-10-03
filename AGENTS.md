# Agent Instructions: agent-skills

This repository is a collection of portable AI agent skills. Every subdirectory in `skills/` must follow the Skill Definition format.

## Repository Structure & Conventions

- **Skills Location**: All skills live in `skills/<skill-name>/`.
- **Canonical layout** — every skill follows this shape (omit a directory only when it would be empty):

  ```text
  skills/<skill-name>/
  ├── SKILL.md          # Entry point: frontmatter + instructions (required)
  ├── references/       # Additional *.md docs the skill links to (required: at least the contract or topic docs)
  ├── assets/           # Static files the skill ships: templates, images, fonts, token files (omit if none)
  ├── scripts/          # Executable helpers: .sh/.mjs/.py run by the skill or its users (omit if none)
  ├── handler.ts        # OmniRoute SkillHandler — root level (omniskills; omit only for docs-only skills)
  └── omniskill.json    # Install manifest — root level (omniskills; omit only for docs-only skills)
  ```

- **What goes where**:
  - `SKILL.md`: frontmatter (`name`, `description`, `metadata.version`) + instructions. Always required.
  - `references/`: prose docs the skill links to (guides, recipes, contracts, machine-readable specs like `DESIGN.md`). Links as `references/<file>.md` from `SKILL.md`.
  - `assets/`: static payloads consumed as data — templates (any extension, incl. `.md`/`.json`/dotfiles), images (`.webp/.png`), fonts, token files. No standalone `*.md` prose docs (those belong in `references/`).
  - `scripts/`: runnable helpers (`scripts/*.sh`, `scripts/*.mjs`, runnable `*.py` incl. grouped subdirs like `scripts/examples/`). Never templates or prose docs.
  - `handler.ts` + `omniskill.json` stay at the **skill root** (default for every skill — docs-only is the exception). `handler.ts` implements the `SkillHandler` (`handler(input, { apiKeyId, sessionId })` + `export default handler`); `omniskill.json` mirrors the `POST /api/skills/install` payload (`name`, semver `version`, `description`, `schema.input/output`, `handler`, `mode`, `sourceProvider`, `tags`). `SKILL.md` carries the `omniroute:` frontmatter block + a `## OmniRoute Compatibility` section before `## References`.

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

1. Scaffold `skills/<name>/` with the canonical files: `SKILL.md` + `references/` + `handler.ts` + `omniskill.json`, adding `assets/` and/or `scripts/` only when the skill ships static files or runnable helpers.
2. Populate frontmatter (`name`, `description` ≤500 chars, `metadata.version` starting at `"1.0"`) plus the `omniroute:` block (`handler: <name>-handler`, `mode: auto`, `sourceProvider: local`, `tags`) — see `skills/git-commit/SKILL.md` for reference.
3. Write `handler.ts` with the exact signature `(input, { apiKeyId, sessionId }) => Promise<output>`; side-effecting skills (`git`, `gh`, disk) default `dry_run: true`.
4. Write `omniskill.json` with `description` identical to the frontmatter and semver `version` (`"1.x"` ↔ `"1.x.0"` move together).
5. Add a summary of the skill to `README.md` under "Available Skills" and to the list above.
6. If the skill is part of a pack (a set of skills that work together, e.g. `frame-intent` → `ship-release`), add it to its group section in both `README.md` and `AGENTS.md` instead of the flat list.

### Updating a Skill

- Content-only edit (typo, example, extra reference) → no version change.
- Contract change (schema, frontmatter, gates, handler behavior) → minor bump in **both** files (`metadata.version` `"1.x"` → `"1.x+1"`, manifest `"1.x.0"` → `"1.x+1.0"`).

### Verification

- **Link Integrity**: Verify that every local path in `SKILL.md` points to an existing file in the right directory — `references/` for prose docs, `assets/` for static files (templates of any kind, images, fonts), `scripts/` for executables. No standalone `*.md` prose docs in `assets/` or `scripts/`.
- **Contract Checks** (or run `create-skill` with `{ action: "validate", name }`): `omniskill.json` parses as JSON with semver `version`; `handler.ts` exports `handler` + `default`; frontmatter `description` == manifest `description`; `handler` field == `<name>-handler`; versions in lockstep. Treat returned `suggestions` (trigger-first wording, lean body) as craft advice, not blockers.
- **Test the skill itself**: every new/updated omniskill ships an L1 handler smoke (guards, happy path, idempotence); reference skills get an L0 retrieval check; discipline skills (gates, must-do steps) get L2 pressure scenarios — RED baseline without the skill, GREEN with it, REFACTOR loopholes. Details: `skills/create-skill/references/testing-skills.md`.

## Critical Constraints

- **Self-Contained**: Skills should not depend on external URLs if a local reference can be provided.
- **Badge Maintenance**: The `README.md` must preserve the `skills.sh` badge. If the repository name or owner changes, update the badge URL immediately.
