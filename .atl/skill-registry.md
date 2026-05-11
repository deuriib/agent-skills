# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Flet, building Python web/desktop/mobile apps, ft.Page, Flet controls | flet-expert | /home/deuri-vasquez/Projects/agent-skills/skills/flet-expert/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### flet-expert
- **Prefer Declarative UI**: Use `@ft.component`, `@ft.observable`, and `ft.use_state()`.
- **UI = f(state)**: Update state (observable fields or hooks), not controls directly.
- **No manual updates**: Avoid `page.update()` in declarative code; state changes trigger re-renders.
- **DO**: Use conditional rendering (`if/else`) instead of `visible` property toggles.
- **DON'T**: Use plain local variables for UI state; they reset on every render.
- Layout: `ft.Row` (horizontal), `ft.Column` (vertical).
- Standard entry point: `main(page: ft.Page)` with `import flet as ft`.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| README.md | /home/deuri-vasquez/Projects/agent-skills/README.md | Project overview and installation |
| AGENTS.md | /home/deuri-vasquez/Projects/agent-skills/AGENTS.md | Repository structure and developer workflows |
