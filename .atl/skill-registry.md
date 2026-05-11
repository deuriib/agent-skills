# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Flet, building Python web/desktop/mobile apps, ft.Page, Flet controls | flet-expert | skills/flet-expert/SKILL.md |
| designing or implementing new UI components, pages, or brand assets for Mintoria | mintoria-brand-guidelines | skills/mintoria-brand-guidelines/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### flet-expert
- Always use `import flet as ft`.
- Prefer Declarative UI: Use `@ft.component`, `@ft.observable`, `ft.use_state()`, `ft.use_effect()`.
- Mindset: UI = f(state). Update state, not control properties.
- Avoid manual `page.update()` or `control.update()` in declarative code.
- Use `Control Refs` (`ft.Ref`) only for direct property access not mapped to state.

### mintoria-brand-guidelines
- Consistency: Use CSS variables from `src/styles/colors.css`.
- Aesthetic: Premium FinTech ecosystem, glassmorphism, smooth transitions.
- Assets: Use official logos from `assets/` (`mintoria-logo.webp`, `mintoria-icon.webp`).
- Accessibility: Ensure contrast while maintaining vibrant look.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | AGENTS.md | Index — references skills above |
| README.md | README.md | Project documentation |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
