# Agent Instructions: agent-skills

This repository is a collection of portable AI agent skills. Every subdirectory in `skills/` must follow the Skill Definition format.

**The source of truth for how to write a skill is [writing-skills](skills/writing-skills/SKILL.md).** This file records the repo-specific contract. Where the two overlap, `writing-skills` wins.

## Repository Structure & Conventions

- **Skills Location**: All skills live in `skills/<skill-name>/`.
- **Canonical layout** — every skill follows this shape (omit a directory only when it would be empty):

  ```text
  skills/<skill-name>/
  ├── SKILL.md          # Entry point: frontmatter + instructions (required)
  ├── references/       # Prose docs the skill links to (required: at least one)
  ├── assets/           # Static files consumed as data: templates, images, fonts, token files (omit if none)
  └── scripts/          # Executable helpers: .sh/.mjs/.py run by the skill or its users (omit if none)
  ```

- **What goes where**:
  - `SKILL.md`: frontmatter (`name`, `description`, optional `license`, `metadata`) + instructions. Always required.
  - `references/`: prose docs the skill links to (guides, recipes, contracts, machine-readable specs like `DESIGN.md`). Link as `references/<file>.md` from `SKILL.md`.
  - `assets/`: static payloads consumed as data — templates (any extension, incl. `.md`/`.json`/dotfiles), images (`.webp/.png`), fonts, token files. No standalone `*.md` prose docs (those belong in `references/`).
  - `scripts/`: runnable helpers (`scripts/*.sh`, `scripts/*.mjs`, runnable `*.py` incl. grouped subdirs like `scripts/examples/`). Never templates or prose docs.
- **Keep inline in `SKILL.md`**: principles, concepts, and code patterns under 50 lines. Anything heavier gets its own reference file.

## Frontmatter Contract

- `name` — required. Lowercase letters, digits, hyphens only. No parentheses or special characters.
- `description` — required. **Triggering conditions only.** Third person, opens with `Use when…`, describes *symptoms and situations*, never the process.
  - **NEVER summarize the workflow.** An agent that reads a workflow summary will follow the description instead of loading the skill — this is the single highest-leverage bug in this repo.
  - Aim for **under 500 characters**; hard cap **1024 characters** for the whole frontmatter block.
- `license`, `metadata.version` — optional. Bump `metadata.version` on any contract change.

**Bad → good:**

```yaml
# ❌ Summarizes workflow — agent follows this and never opens the skill
description: Use when committing. Splits the worktree into atomic units and writes Conventional Commits.

# ❌ Too abstract, no triggering condition
description: Helps with git workflows.

# ✅ Triggering conditions only
description: Use when committing changes, splitting a dirty worktree into atomic units, or shaping history into a linear sequence before push or PR.
```

## Token Budgets

Context is a shared budget. Measure, do not guess.

| Tier | Target |
|------|--------|
| Getting-started / bootstrap workflows | < 150 words |
| Frequently-loaded skills | < 200 words |
| All other skills | < 500 words |

```bash
wc -w skills/<name>/SKILL.md   # verify before committing
```

When a skill exceeds its target, move the bulk into `references/` and leave a pointer plus the decision rule in `SKILL.md`. Reference-heavy skills may sit above target with a stated reason — record the reason in the skill.

## Writing Skills

1. Write the pressure scenarios first (see [writing-skills](skills/writing-skills/references/testing-skills-with-subagents.md)).
2. Watch RED: run a subagent **without** the skill, confirm it violates the rule.
3. Write the skill (GREEN). Keep it lean — `SKILL.md` is loaded into a live context window.
4. REFACTOR: re-run, find the loopholes the agent found, close each one explicitly.
5. Never ship an untested skill as "reference". Delete means delete.

## Available Skills

- **animate-ui**: [skills/animate-ui/SKILL.md](skills/animate-ui/SKILL.md)
- **azul-payment**: [skills/azul-payment/SKILL.md](skills/azul-payment/SKILL.md)
- **better-auth-plugin**: [skills/better-auth-plugin/SKILL.md](skills/better-auth-plugin/SKILL.md)
- **fix-a-bug**: [skills/fix-a-bug/SKILL.md](skills/fix-a-bug/SKILL.md)
- **git-commit**: [skills/git-commit/SKILL.md](skills/git-commit/SKILL.md)
- **github-issues**: [skills/github-issues/SKILL.md](skills/github-issues/SKILL.md)
- **htmx**: [skills/htmx/SKILL.md](skills/htmx/SKILL.md)
- **htpy**: [skills/htpy/SKILL.md](skills/htpy/SKILL.md)
- **init-deep**: [skills/init-deep/SKILL.md](skills/init-deep/SKILL.md)
- **lago**: [skills/lago/SKILL.md](skills/lago/SKILL.md)
- **lago-payment-integration**: [skills/lago-payment-integration/SKILL.md](skills/lago-payment-integration/SKILL.md)
- **mintoria-brand-guidelines**: [skills/mintoria-brand-guidelines/SKILL.md](skills/mintoria-brand-guidelines/SKILL.md)
- **open-a-pull-request**: [skills/open-a-pull-request/SKILL.md](skills/open-a-pull-request/SKILL.md)
- **pi-agent**: [skills/pi-agent/SKILL.md](skills/pi-agent/SKILL.md)
- **project-bootstrap**: [skills/project-bootstrap/SKILL.md](skills/project-bootstrap/SKILL.md)
- **wifi-roam-fix**: [skills/wifi-roam-fix/SKILL.md](skills/wifi-roam-fix/SKILL.md)
- **writing-skills**: [skills/writing-skills/SKILL.md](skills/writing-skills/SKILL.md)

## Developer Workflows

### Creating a New Skill

1. Scaffold `skills/<name>/` with `SKILL.md` + `references/`, adding `assets/` and/or `scripts/` only when the skill ships static files or runnable helpers.
2. Write frontmatter per the Frontmatter Contract above. Test the description against a realistic user request: would it fire when it should, and stay quiet when it should not?
3. Write `SKILL.md` following the shape in [writing-skills](skills/writing-skills/SKILL.md): `## Overview`, `## When to Use`, then the sections the skill type warrants (`## Quick Reference`, `## Implementation`, `## Common Mistakes`, `## Real-World Impact`).
4. Move every block over 100 lines into `references/` and link it with an explicit sentence stating *when to read it* — not just its name.
5. Run the test tier that matches the skill type:
   - **discipline** (gates, must-do steps) → pressure scenarios. RED baseline without the skill, GREEN with it, REFACTOR loopholes.
   - **technique** (how-to) → application scenarios plus variation and missing-information tests.
   - **pattern** (mental model) → recognition, application, and counter-example tests.
   - **reference** (docs/APIs) → retrieval, application, and gap tests.
6. Add the skill to `README.md` under "Available Skills" and to the list above.
7. If the skill is part of a pack (a set of skills that work together), add it to its group section in both `README.md` and `AGENTS.md` instead of the flat list.

### Updating a Skill

- Content-only edit (typo, extra reference) → no version change.
- Contract change (frontmatter, gates, required steps) → minor bump of `metadata.version`.

## Verification

Run before opening a PR. All of it is cheap.

- **Frontmatter**: parses as YAML; `name` is kebab-case; frontmatter ≤ 1024 chars; `description` opens with `Use when`, states no workflow, ≤ 500 chars.
- **Link integrity**: every local path in `SKILL.md` resolves, and points at the right kind of file — `references/` for prose, `assets/` for static payloads, `scripts/` for executables. No standalone `*.md` prose in `assets/` or `scripts/`.
- **Budget**: `wc -w` is at or under the tier target, or the skill documents why it is not.
- **Skill tested**: the tier-appropriate check from `writing-skills` was actually run and passed. A skill that has never been observed failing has never been verified.

## Critical Constraints

- **Self-Contained**: Skills should not depend on external URLs if a local reference can be provided. Broken cross-repo links are a defect.
- **No force-loads**: never use `@skills/…` or `@references/…` syntax. It burns context on every run. Use plain markdown links.
- **No OmniRoute compatibility**: `handler.ts`, `omniskill.json`, the `omniroute:` frontmatter block, and the `## OmniRoute Compatibility` section are all removed from this repo. Do not reintroduce them.
- **Badge Maintenance**: The `README.md` must preserve the `skills.sh` badge. If the repository name or owner changes, update the badge URL immediately.
