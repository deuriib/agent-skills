---
name: flet-expert
description: "Trigger: Flet, building Python web/desktop/mobile apps, ft.Page, Flet controls. Expert guidance for building applications with the Flet framework."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: flet-expert

## Activation Contract
Use this skill when:
- The user or agent needs to build, debug, or architect applications using the Flet framework (Python).
- Questions arise about Flet controls, layout (Row/Column), navigation, or state management.
- Implementation of tutorials (Calculator, ToDo, Chat) or cookbook patterns is required.

## Hard Rules
- Always use the `ft` alias for the `flet` module: `import flet as ft`.
- Follow the standard `main(page: ft.Page)` entry point structure.
- Prefer declarative UI definitions but use `page.update()` or `control.update()` when state changes.
- Refer to the local documentation in `references/` for specific control properties and event handlers.

## Decision Gates
| Feature | Approach |
|---------|----------|
| Layout | Use `ft.Row` for horizontal and `ft.Column` for vertical alignment. |
| Navigation | Use `page.on_route_change` and `ft.TemplateRoute` for multi-page apps. |
| State | Use `control.data` for simple state or `Control Refs` for complex DOM access. |
| Platform | Use `ft.app(target=main)` for desktop/web and `flet build` for mobile. |

## Execution Steps
1. Identify the specific Flet component or pattern requested.
2. Search the local documentation in `references/` (e.g., `reference/controls.md` or `cookbook/`) for implementation details.
3. Provide a clean code snippet using `import flet as ft`.
4. Explain any non-obvious event handlers or layout constraints.

## Output Contract
- Correct Python code using Flet.
- References to specific local documentation files used.
- Clear explanation of the UI structure and behavior.

## References
- `references/getting_started/introduction.md` - Framework overview.
- `references/reference/controls.md` - Core UI components.
- `references/cookbook/navigation-and-routing.md` - Routing patterns.
- `references/cookbook/async-apps.md` - Handling concurrency.
