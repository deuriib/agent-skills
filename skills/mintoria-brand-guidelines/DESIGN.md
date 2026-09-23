---
version: alpha
name: Mintoria
description: Premium FinTech visual identity — trust, innovation, and stability across a state-of-the-art digital asset ecosystem.
colors:
  primary: "#007bff"
  primary-strong: "#2196f3"
  primary-deep: "#0d47a1"
  primary-deeper: "#0a3a8f"
  primary-soft: "#e3f2fd"
  accent: "#ff6b35"
  accent-main: "#e87f3c"
  accent-deep: "#ea580c"
  success: "#5fb04c"
  dark: "#121212"
  light: "#ffffff"
  on-primary: "#ffffff"
  on-accent: "#121212"
  border: "#e6e8eb"
  surface-card: "#ffffff"
  surface: "#f7f8fa"
typography:
  display-hero:
    fontFamily: IBM Plex Sans
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-section:
    fontFamily: IBM Plex Sans
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
  label-ui:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.04em
  wordmark:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -0.03em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
  card-padding: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-lg}"
  button-primary-hover:
    backgroundColor: "{colors.primary-deeper}"
    textColor: "{colors.on-primary}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-lg}"
  button-accent-hover:
    backgroundColor: "{colors.accent-main}"
    textColor: "{colors.on-accent}"
  button-accent-active:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
  button-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-lg}"
  button-secondary:
    backgroundColor: "{colors.light}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.label-lg}"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.dark}"
    rounded: "{rounded.xl}"
    padding: 24px
  input:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.body-md}"
  nav-glass:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"
    height: 64px
  chip:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.full}"
    padding: 8px
  link:
    textColor: "{colors.primary-deep}"
    typography: "{typography.body-md}"
  link-hover:
    textColor: "{colors.primary-deeper}"
  banner:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.body-md}"
  banner-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.on-accent}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.dark}"
---

## Overview

Mintoria sits at the intersection of digital assets and traditional financial
stability. The brand personality is **premium FinTech**: confident, precise,
and quietly optimistic. The UI must evoke trust first, innovation second —
never the other way around.

The emotional target is a **high-end, state-of-the-art ecosystem**. Interfaces
should feel spacious and deliberate rather than dense or busy. When a specific
rule or token is not defined here, default to the most restrained option that
still feels alive: subtle depth over heavy decoration, one accent moment per
screen, motion that confirms rather than entertains.

The audience is modern digital-asset users who expect consumer-grade polish
with institutional-grade credibility. Anything that reads as generic, flat, or
template-driven breaks the brand.

## Colors

The palette is curated to avoid generic defaults. Blue carries trust and
FinTech stability, orange injects warmth and energy, and green signals growth
and safety. Neutrals stay cool and light so the vibrant hues remain the focal
point.

- **Primary (#007bff):** The core brand blue. Owns brand identity, banners,
  focus, and brand-level emphasis. Note: at 3.98:1 on white it does **not**
  pass AA as body text — pair it as a background with dark text, or use
  `primary-deep` for blue text.
- **Primary Strong (#2196f3):** Brighter blue for gradients, hover states, and
  large tinted surfaces where #007bff would feel too heavy.
- **Primary Deep (#0d47a1):** The accessible workhorse for primary buttons and
  any blue surface carrying white text. This is where contrast AA is earned.
- **Primary Deeper (#0a3a8f):** One step deeper still, used exclusively for the
  primary button's hover state so white text stays well above AA.
- **Primary Soft (#e3f2fd):** Tinted background for chips, info callouts, and
  selected states.
- **Accent (#ff6b35):** The single driver of attention. Reserved exclusively
  for the most important call to action on a screen. Warmth and energy live
  here — never spend it on decoration.
- **Accent Main (#e87f3c) / Accent Deep (#ea580c):** The deeper orange ramp
  for hover and pressed states — both keep dark text and pass contrast AA.
- **Success (#5fb04c):** Completed transactions, stablecoin safety, optimistic
  states.
- **Dark (#121212):** Headings and text; dark-mode backgrounds.
- **Light (#ffffff):** Primary backgrounds and card surfaces.
- **Surface (#f7f8fa):** Page foundation — a cool off-white that keeps cards
  reading as distinct layers.
- **Border (#e6e8eb):** The 1px hairline that defines the Bento grid.

**Gradients** (spec has no gradient token type — use these literal values):

- Primary: `linear-gradient(135deg, #2196f3 0%, #1976d2 100%)`
- Accent: `linear-gradient(135deg, #ff6b35 0%, #e65100 100%)`
- Glow: `linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(33, 150, 243, 0.15) 100%)`

**Contrast contract:** white text is permitted on `primary-deep`, `primary`,
and `dark` — all pass WCAG AA. White on the bright `accent` does **not** pass,
so accent surfaces use `on-accent` (#121212) text. Never place `on-primary`
white text on `accent`.

## Typography

Two families, clear division of labor. **IBM Plex Sans** carries the brand
voice in headings and the wordmark; **Inter** handles body copy and every UI
control where legibility at small sizes matters. The stack falls back to
`system-ui, sans-serif`.

- **Display & Headlines:** IBM Plex Sans Bold (700), tight tracking. Hero
  titles run to 72px on desktop (`text-5xl md:text-7xl font-bold
  tracking-tight`), section headings 30–40px.
- **Body:** Inter Regular (400) at 16–18px with generous 1.6 line height for
  long-form readability.
- **Labels & UI:** Inter Medium (500) at 14–16px. Buttons, chips, and
  navigation all speak in this voice.
- **Captions & Metadata:** Inter Medium at 12px with slight positive tracking.
- **Wordmark:** IBM Plex Sans Black (900), tight tracking — used only for
  "Mintoria" set beside the icon mark.

Weight budget: **no more than two weights on a single screen.** The logo's 900
is exclusive to the wordmark and never appears in running text.

## Layout

A **Bento Box** grid is the signature layout for feature sections and content
grids: varied tile sizes sharing a common radius, hairline border, and surface
color, with generous internal padding.

- **Spacing scale:** 4 / 8 / 16 / 32 / 64px, with a 24px gutter between
  related tiles and 24px padding inside cards. Use the 4px half-step for
  micro-adjustments only.
- **Grid:** fluid on mobile, constrained max-width on desktop. Related items
  are grouped into a single card rather than floated apart — containment makes
  the brand feel approachable.
- **Rhythm:** one primary action per screen, one accent moment per viewport.
  Breathing room is a brand attribute; do not fill empty space.

## Elevation & Depth

Depth comes from **tonal layers and translucency**, not heavy shadows.

- **Glassmorphism** for headers, sticky navbars, and overlays: `backdrop-blur`
  with a translucent `surface` background and a 1px `border` hairline. This is
  the brand's default elevation treatment.
- **Gradients** create subtle depth on hero sections and tinted panels —
  always light, never overwhelming.
- **Hover lift:** interactive cards use `.hover-lift` — a shadow enhancement
  plus a slight upward Y translation. State change, not spectacle.
- Shadows stay soft and low-opacity. If a shadow is strong enough to notice
  on its own, it is too strong.

## Shapes

Generous, soft radii define the shape language. The brand is approachable
precision, not sharp-edged brutalism.

- **Cards, tiles, panels:** `xl` — 24px (the Bento signature).
- **Buttons, inputs, chips:** `md` — 12px; chips and pills use `full`.
- **Small elements (badges, tags):** `sm` — 8px.

Never mix sharp corners and rounded corners in the same view. Radii stay
consistent within a component family.

## Components

Component tokens define exact values; the prose defines behavior.

- **Primary button (`button-primary`):** `primary-deep` background with white
  text so it passes contrast AA (8.63:1). Hover deepens to `primary-deeper`
  rather than lightening — brightening `primary-strong` would drop white text
  to 3.12:1 and fail. This is the default action button.
- **Accent button (`button-accent`):** `accent` background with **dark**
  (#121212) text — this pairing is deliberate for accessibility (6.61:1). Use
  only for the most important CTA per screen. Hover moves to `accent-main`,
  pressed to `accent-deep` (`button-accent-active`), both keeping dark text.
- **Success button (`button-success`):** `success` green with dark text
  (6.96:1) — for confirmations and completed-transaction actions only.
- **Secondary button (`button-secondary`):** white surface, `primary-deep`
  label. For supporting actions that must not compete with the accent.
- **Card (`card`):** white surface, 24px radius, 24px padding, 1px border,
  optional `.hover-lift`.
- **Input (`input`):** white background, 12px radius, Inter 16px to avoid
  mobile zoom. Focus ring uses `primary`.
- **Nav (`nav-glass`):** glassmorphic, 64px tall, translucent surface with
  backdrop blur.
- **Chip (`chip`):** `primary-soft` background, `primary-deep` text, full
  radius — for filters, tags, and selected states.
- **Link (`link`):** `primary-deep` blue text (8.63:1 on white), deepening on
  hover. The core `primary` blue fails AA as text, so links borrow the deep
  ramp instead.
- **Banner (`banner`):** `primary` blue background with dark text (4.71:1) —
  the home of the core brand blue, for info and highlight panels. Hover shifts
  to `primary-strong`.
- **Divider (`divider`):** 1px `border` hairline between content blocks.
- **Page (`page`):** `surface` foundation with `dark` text.
- **Logo:** `assets/mintoria-logo.webp` with the wordmark at weight 900.
  Icon 40–48px in the nav; rotates ~12° on hover (`group-hover:rotate-12`).
  Works on both surface and dark backgrounds — use `on-primary` white text on
  dark.

**Motion:** transitions run 0.2–0.3s with
`cubic-bezier(0.4, 0, 0.2, 1)`. Page transitions use `swup` with a consistent
fade-in plus slight upward slide. The interface should feel alive and
responsive — never sluggish, never frantic.

## Do's and Don'ts

- Do keep **blue as primary** and reserve **orange for the single most
  important action per screen**.
- Don't lighten the primary button on hover — brighten-to-`primary-strong`
  drops white text below AA; hover deepens instead.
- Don't use white text on the bright accent orange — use dark #121212 text, or
  reach for `primary-deep` when white text is required.
- Don't reach for generic colors — every value comes from this palette.
- Do use gradients, glassmorphism, and hover-lift for premium depth.
- Don't add heavy drop shadows; depth stays soft and tonal.
- Do use the Bento grid for feature sections with 24px radii and 1px borders.
- Don't mix sharp and rounded corners in the same view.
- Do keep typography to two families and two weights per screen.
- Don't set body copy below 16px or run headings without tight tracking.
- Do maintain WCAG AA contrast (4.5:1 for normal text) on every text/background
  pair.
- Do keep transitions at 0.2–0.3s with the brand easing curve.
- Don't animate without purpose — motion confirms interaction, it does not
  decorate.
