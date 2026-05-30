# Motion Patterns

Animate UI relies on **Framer Motion** for its animations. Below are the common patterns and settings used.

## Default Spring Settings

Most components use spring-based transitions for a natural feel.

### Standard Spring
```json
{ "type": "spring", "stiffness": 300, "damping": 17 }
```

### Soft Spring (e.g., Tooltips)
```json
{ "type": "spring", "stiffness": 300, "damping": 35 }
```

## Common Props

When customizing components, look for these motion-specific props:

- `layout`: Enables layout animations.
- `initial`: Starting state of the animation.
- `animate`: Target state.
- `exit`: State when the component is removed.
- `transition`: Defines the timing and easing.

## Hover & Tap Effects

Use standard Framer Motion gestures for consistency:

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  {children}
</motion.div>
```
