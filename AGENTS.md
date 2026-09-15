# Agent Instructions: agent-skills

This repository is a collection of portable AI agent skills. Every subdirectory in `skills/` must follow the Skill Definition format.

## Repository Structure & Conventions

- **Skills Location**: All skills live in `skills/<skill-name>/`.
- **Mandatory Files**:
  - `SKILL.md`: The main entry point containing frontmatter (trigger, name, description) and instructions.
  - `references/`: Local documentation that the skill refers to.

## Available Skills

- **animate-ui**: [skills/animate-ui/SKILL.md](skills/animate-ui/SKILL.md)
- **azul-payment**: [skills/azul-payment/SKILL.md](skills/azul-payment/SKILL.md)
- **better-auth-plugin**: [skills/better-auth-plugin/SKILL.md](skills/better-auth-plugin/SKILL.md)
- **bridge-xyz**: [skills/bridge-xyz/SKILL.md](skills/bridge-xyz/SKILL.md)
- **ecf-dgii-ssd**: [skills/ecf-dgii-ssd/SKILL.md](skills/ecf-dgii-ssd/SKILL.md)
- **ef2-api**: [skills/ef2-api/SKILL.md](skills/ef2-api/SKILL.md)
- **htmx**: [skills/htmx/SKILL.md](skills/htmx/SKILL.md)
- **htpy**: [skills/htpy/SKILL.md](skills/htpy/SKILL.md)
- **lago**: [skills/lago/SKILL.md](skills/lago/SKILL.md)
- **lago-payment-integration**: [skills/lago-payment-integration/SKILL.md](skills/lago-payment-integration/SKILL.md)
- **mcp-gway**: [skills/mcp-gway/SKILL.md](skills/mcp-gway/SKILL.md)
- **mintoria-brand-guidelines**: [skills/mintoria-brand-guidelines/SKILL.md](skills/mintoria-brand-guidelines/SKILL.md)

### Dispatch & Workflow — frame→ship Pack

- **frame-intent**: [skills/frame-intent/SKILL.md](skills/frame-intent/SKILL.md)
- **translate-to-spec**: [skills/translate-to-spec/SKILL.md](skills/translate-to-spec/SKILL.md)
- **propose-changes**: [skills/propose-changes/SKILL.md](skills/propose-changes/SKILL.md)
- **review-security**: [skills/review-security/SKILL.md](skills/review-security/SKILL.md)
- **review-architecture**: [skills/review-architecture/SKILL.md](skills/review-architecture/SKILL.md)
- **execute-spec**: [skills/execute-spec/SKILL.md](skills/execute-spec/SKILL.md)
- **quality-gate**: [skills/quality-gate/SKILL.md](skills/quality-gate/SKILL.md)
- **verify-handoff**: [skills/verify-handoff/SKILL.md](skills/verify-handoff/SKILL.md)
- **ship-release**: [skills/ship-release/SKILL.md](skills/ship-release/SKILL.md)

## Developer Workflows

### Creating a New Skill

1. Create `skills/<name>/SKILL.md`.
2. Populate frontmatter (see `skills/animate-ui/SKILL.md` for reference).
3. Add a summary of the skill to `README.md` under "Available Skills".
4. If the skill is part of a pack (a set of skills that work together, e.g. `frame-intent` → `ship-release`), add it to its group section in both `README.md` and `AGENTS.md` instead of the flat list.

### Verification

- **Link Integrity**: Verify that all paths in `SKILL.md` sections like `## References` point to existing files in the local `references/` directory.

## Critical Constraints

- **Self-Contained**: Skills should not depend on external URLs if a local reference can be provided.
- **Badge Maintenance**: The `README.md` must preserve the `skills.sh` badge. If the repository name or owner changes, update the badge URL immediately.
