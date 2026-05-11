# Agent Instructions: agent-skills

This repository is a collection of portable AI agent skills. Every subdirectory in `skills/` must follow the Skill Definition format.

## Repository Structure & Conventions

- **Skills Location**: All skills live in `skills/<skill-name>/`.
- **Mandatory Files**:
  - `SKILL.md`: The main entry point containing frontmatter (trigger, name, description) and instructions.
  - `references/`: Local documentation that the skill refers to.
- **Deduplication**: If adding a new skill, check `.atl/skill-registry.md` to ensure no naming conflicts.

## Available Skills

- **bridge-xyz**: [skills/bridge-xyz/SKILL.md](skills/bridge-xyz/SKILL.md)
- **flet-expert**: [skills/flet-expert/SKILL.md](skills/flet-expert/SKILL.md)
- **mintoria-brand-guidelines**: [skills/mintoria-brand-guidelines/SKILL.md](skills/mintoria-brand-guidelines/SKILL.md)

## Developer Workflows

### Creating a New Skill
1. Create `skills/<name>/SKILL.md`.
2. Populate frontmatter (see `skills/flet-expert/SKILL.md` for reference).
3. Add a summary of the skill to `README.md` under "Available Skills".
4. **Update Registry**: Run the `skill-registry` skill (or `/sdd-init`) to regenerate `.atl/skill-registry.md`.

### Verification
- **Registry Check**: Ensure the new skill appears in `.atl/skill-registry.md` with the correct path and trigger.
- **Link Integrity**: Verify that all paths in `SKILL.md` sections like `## References` point to existing files in the local `references/` directory.

## Critical Constraints
- **Self-Contained**: Skills should not depend on external URLs if a local reference can be provided.
- **Badge Maintenance**: The `README.md` must preserve the `skills.sh` badge. If the repository name or owner changes, update the badge URL immediately.
