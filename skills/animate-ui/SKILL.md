---
name: animate-ui
description: "Trigger: animate-ui, motion components, animated shadcn. Implement and customize Motion-powered components from Animate UI."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: animate-ui

## Activation Contract

Use this skill when:
- Adding or customizing animated UI components using the Animate UI distribution.
- Implementing Motion-powered (Framer Motion) patterns in a shadcn/ui project.
- Setting up the Animate UI registry or adding specific primitives/components.

## Hard Rules

- **Copy-First Approach**: Always treat components as "open code" to be copied and modified, not as fixed library imports.
- **Dependency Check**: Ensure `motion`, `tailwind-merge`, `clsx`, and `lucide-react` are installed before adding components.
- **Naming Convention**: Follow the `@animate-ui/{category}-{sub-category}-{name}` pattern for shadcn CLI commands.
- **Import Paths**: Default to `@/components/animate-ui/` for all added components and primitives.
- **Standard Stack**: Use React, Tailwind CSS, and Framer Motion (Motion).

## Decision Gates

| Task | Action |
|------|--------|
| New Project | Run `npx shadcn@latest init` then configure Tailwind/Motion. |
| Add Primitive | Use `npx shadcn@latest add @animate-ui/primitives-{category}-{name}`. |
| Add Component | Use `npx shadcn@latest add @animate-ui/components-{category}-{name}`. |
| Custom Motion | Extend existing components using `motion` props (e.g., `whileHover`, `transition`). |

## Execution Steps

1. **Verify Prerequisites**: Check if `framer-motion` (or `motion`) and `tailwind-merge` are in `package.json`.
2. **Initial Setup**: If not already done, follow the `shadcn/ui` initialization process.
3. **Component Selection**: Identify whether you need a Primitive (logic + baseline motion) or a Component (styled UI piece).
4. **Installation**: Use the shadcn CLI with the `@animate-ui` scoped package names.
5. **Integration**: Import from `@/components/animate-ui/...` and pass necessary props.
6. **Polishing**: Adjust spring transitions (stiffness, damping) to match the project's feel.

## Output Contract

- List of components added via shadcn CLI.
- Verified import paths in the implementation.
- Explanation of custom motion adjustments if any.

## References

- `references/getting-started.md` — Installation and setup guide.
- `references/components.md` — Categories and naming conventions.
- `references/motion-patterns.md` — Common spring and transition settings.
