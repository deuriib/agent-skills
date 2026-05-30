# Components & Primitives Catalog

Animate UI is divided into several categories, each with a specific focus on animation and utility.

## Primitives

Primitives are the building blocks with animation baked in, often unstyled or minimally styled.

- **Texts**: `counting-number`, `gradient-text`, `morphing-text`, `rolling-text`, `sliding-number`, `typing-text`.
- **Effects**: `auto-height`, `blur`, `click`, `fade`, `magnetic`, `tilt`, `zoom`.
- **Buttons**: `flip`, `liquid`, `ripple`.

## Components

Styled UI components built on top of primitives or custom animated logic.

### Categories

- **Animate UI**: Custom components like `avatar-group`, `code-tabs`, `cursor`, `github-stars-wheel`.
- **Radix UI / Base UI / Headless UI**: Animated ports of popular primitive libraries.
- **Buttons**: `copy-button`, `theme-toggler-button`.
- **Backgrounds**: `bubble-background`, `fireworks-background`, `stars-background`.

## Naming Convention

When using `shadcn add`, the package name is constructed as follows:
- `@animate-ui/primitives-{category}-{name}`
- `@animate-ui/components-{category}-{name}`

## Common Import Patterns

Components are typically installed into:
`@/components/animate-ui/{category}/{sub-category}/{name}`

Example:
```tsx
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number';
```
