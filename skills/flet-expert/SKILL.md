---
name: flet-expert
description: "Trigger: Flet, building Python web/desktop/mobile apps, ft.Page, Flet controls. Expert guidance for building applications with the Flet framework."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.1"
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
- **Prefer Declarative UI**: Use `@ft.component` and `@ft.observable` instead of manual control mutation.
- Avoid calling `page.update()` or `control.update()` manually when using the declarative approach; Flet handles re-rendering automatically for observables and hooks.
- Refer to the local documentation in `references/` for specific control properties and event handlers.

## DO's and DON'Ts

### DO
- **DO** use `@ft.observable` for your domain models and shared data.
- **DO** use `ft.use_state()` within components for local, transient UI state (e.g., `is_editing`).
- **DO** use conditional rendering (Python `if/else` inside components) instead of toggling the `visible` property of controls.
- **DO** use `Control Refs` (`ft.Ref`) only when you need direct access to an underlying control property that isn't mapped to state.
- **DO** organize your UI into small, reusable `@ft.component` functions.

### DON'T
- **DON'T** mutate control properties (like `control.value = "new"`) inside event handlers in declarative code; update the state instead.
- **DON'T** call `page.update()` inside an event handler if you modified an `@ft.observable` object or used a `set_state` hook.
- **DON'T** use plain local variables to track UI state inside a component; they will reset on every render. Use `ft.use_state()` instead.
- **DON'T** put business logic inside the component's render body; keep it in event handlers or model methods.

## Recommended Approaches

### Declarative vs. Imperative
**Mindset shift: UI = f(state)**. Instead of deciding "how" to change the screen, decide what the data looks like and let the component "describe" the UI for that data.

- **Imperative (Avoid for complex apps)**: `button.text = "Clicked!"; page.update();`
- **Declarative (Recommended)**:
  ```python
  @ft.component
  def MyComponent():
      clicked, set_clicked = ft.use_state(False)
      return ft.ElevatedButton(
          text="Clicked!" if clicked else "Click me",
          on_click=lambda _: set_clicked(True)
      )
  ```

### State Management
- Use **Hooks** (`ft.use_state`, `ft.use_effect`) for state that only matters to one component (e.g., "is this menu open?").
- Use **Observables** (`@ft.observable`) for data that lives across the app or represents your business model (e.g., "list of users").

## Decision Gates
| Feature | Approach |
|---------|----------|
| Layout | Use `ft.Row` for horizontal and `ft.Column` for vertical alignment. |
| Navigation | Use `page.on_route_change` and `ft.TemplateRoute` for multi-page apps. |
| State | Use `ft.use_state()` for local UI state or `@ft.observable` for domain data. |
| Platform | Use `ft.app(target=main)` for desktop/web and `flet build` for mobile. |

## Execution Steps
1. Identify the specific Flet component or pattern requested.
2. Search the local documentation in `references/` (e.g., `reference/controls.md` or `cookbook/`) for implementation details.
3. Provide a clean code snippet using `import flet as ft` and the **Declarative approach** by default.
4. Explain any non-obvious event handlers or layout constraints.

## Output Contract
- Correct Python code using Flet (declarative style preferred).
- References to specific local documentation files used.
- Clear explanation of the UI structure and behavior.

## References

### Getting Started
- `references/getting_started/introduction.md`: Fundamental concepts and framework architecture.
- `references/getting_started/installation.md`: Steps to set up the development environment.
- `references/getting_started/creating_a_new_flet_app.md`: Boilerplate for starting new projects.
- `references/getting_started/running_a_flet_app_(hot_reload).md`: Instructions for development workflow and hot reload.
- `references/getting_started/testing_on_mobile.md`: How to preview apps on mobile devices using Flet app.

### Cookbook (Patterns & Solutions)
- **`references/cookbook/declarative_vs_imperative_crud_app.md`**: CRITICAL. Explains the shift from manual mutations to state-driven UI.
- `references/cookbook/navigation_and_routing.md`: Implementing multi-page apps and URL handling.
- `references/cookbook/async_apps.md`: Managing concurrency and non-blocking UI updates.
- `references/cookbook/theming.md`: Customizing colors, fonts, and dark/light modes.
- `references/cookbook/client_storage.md` & `references/cookbook/session_storage.md`: Persisting user data locally or per session.
- `references/cookbook/animations.md`: Implementing implicit and explicit animations for controls.
- `references/cookbook/authentication.md`: Implementing OAuth and 3rd party login flows.
- `references/cookbook/drag_and_drop.md`: Handling drag and drop interactions between controls.
- `references/cookbook/read_and_write_files.md`: Using file pickers and local file system access.

### API Reference
- `references/reference/controls.md`: Comprehensive list of all available UI components.
- `references/reference/row.md` & `references/reference/column.md`: Detailed layout behavior and alignment properties.
- `references/reference/alertdialog.md`: Managing modal overlays and user confirmations.
- `references/reference/navigationbar.md`: Implementing bottom navigation patterns.
- `references/reference/cli.md`: Documentation for the `flet` command-line tool.
- `references/reference/environment_variables.md`: Configuration options for Flet apps.

### Tutorials
- `references/tutorials/calculator.md`: Example of a complete functional app with layout and logic.
- `references/tutorials/todo.md`: CRUD patterns and state management example.
- `references/tutorials/chat.md`: Real-time communication and complex list handling.
- `references/tutorials/solitaire.md`: Game logic and advanced drag-and-drop example.

### Publishing
- `references/publishing_flet_app/publishing_flet_app_(overview).md`: General guide for distribution.
- `references/publishing_flet_app/android.md`, `ios.md`, `web.md`, etc.: Platform-specific build instructions.
