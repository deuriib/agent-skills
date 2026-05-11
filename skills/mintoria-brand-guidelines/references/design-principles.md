# Mintoria Design Principles

To maintain a premium, state-of-the-art aesthetic, all UI components should follow these principles.

## 1. Visual Excellence

- Avoid generic colors. Use the curated HSL-tailored palette in `brand-colors.md`.
- Use **Gradients** to add depth (e.g., `gradient-primary`).
- Implement **Glassmorphism** for headers and overlays using `backdrop-blur` and translucent backgrounds.

## 2. Micro-Animations

The interface should feel "alive" and responsive.

- **Hover Transitions**: Smooth transitions (at least `0.2s` or `0.3s`) for all interactive elements.
- **Interactive State**: Prefer `cubic-bezier(0.4, 0, 0.2, 1)` for transitions.
- **Hover Lift**: Use `.hover-lift` (shadow enhancement + slight Y-axis translation) for cards.

## 3. Bento Layout

Prefer a "Bento Box" layout for feature sections and grids.

- Large border-radii (`var(--radius-xl)` or `24px`).
- Subtle borders (`1px solid var(--color-border)`).
- Distinct card surfaces (`var(--color-surface-card)`).

## 4. Modern Transitions

- Use `swup` for smooth page transitions.
- Animations should be consistent across the platform (fade-in + slight upward slide).
