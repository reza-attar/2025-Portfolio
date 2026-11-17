---
type: Reference
title: Tokens and theming
description: The Tailwind colour and type tokens, the CSS variables behind them, light and dark themes, and print styles.
tags: [design, tailwind, theme, tokens]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: tailwind
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/tailwind.config.ts
    title: tailwind.config.ts
  - id: css
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/globals.css
    title: src/app/globals.css
---

# Important: the default palette and type scale are replaced

`tailwind.config.ts` sets `theme.colors` and `theme.fontSize` directly instead
of extending them. As a result:

- Tailwind's default colours (`bg-red-500`, `text-zinc-400`, …) **do not exist**.
  Use the tokens below.
- Text sizes are **pixel keys**: `text-10`, `11`, `12`, `13`, `14`, `15`, `16`,
  `18`, `20`, `24`, `32`, `40`, `48`, `60`, `80`. `text-sm`, `text-lg` and so on
  do not exist. Arbitrary values (`text-[28px]`) still work.
- A class with an unknown colour generates nothing, silently (see
  [known issues](/architecture/known-issues.md)).

# Semantic colour tokens

Defined as CSS variables on `:root` (light) and `.dark`, and mapped in
`theme.extend.colors`. Use these for new work.

| Token (Tailwind) | Purpose | Light | Dark |
|------------------|---------|-------|------|
| `ink` | Body text | `#181818` | `#ededed` |
| `ink-strong` | Headings, emphasis | `#181818` | `#fafafa` |
| `ink-muted` | Secondary text | `#5e5e5e` | `#a1a1a1` |
| `ink-faint` | Hints, kickers | `#6b6b6b` | `#8f8f8f` |
| `ink-label` | Small caps labels | `#181818` | `#a1a1a1` |
| `panel`, `panel-border` | Cards and boxes | `#f4f4f4` / `#e4e4e4` | `#151515` / `#262626` |
| `tag`, `tag-fg`, `tag-border` | Chips and inline code | white / `#3d3d3d` / `#e4e4e4` | `#1c1c1c` / `#d4d4d4` / `#2a2a2a` |
| `hdr`, `hdr-border` | Scrolled header bar | translucent | translucent |
| `divider`, `sep` | Rules and separators | black 8% / 12% | white 8% / 14% |
| `card-hover` | Card border on hover | `#cfcfcf` | `#3a3a3a` |
| `control`, `control-fg`, `control-border` | Secondary buttons | `#ededed` | `#1c1c1c` |
| `field`, `field-line` | Form fields | white / `#e0e0e0` | `#0d0d0d` / `#262626` |
| `nav-hover` | Icon-button hover | `#ededed` | `#1f1f1f` |
| `focus` | Focus ring | `#5b5bd6` | `#a5a3f7` |
| `layer-data`, `layer-backend`, `layer-ai`, `layer-interface` | [Layers](/content/layers.md) | see layers | see layers |

Also present: `background` (page background), `onyx`, `black`, `white`,
`gray.*`, `nav.*` and the shadcn/ui HSL tokens (`primary`, `muted`, `border`,
`ring`, `chart-1..5`, …). The `ink`/`panel` set is what the current pages use.

# Fonts

- `font-inter` (default body font): Inter, `--font-inter`.
- `font-mono`: JetBrains Mono, `--font-mono`. Used for kickers, the header path
  and diagram labels.

Both load through `next/font/google` as variable fonts without a `weight`
list: one file per subset with every weight.

# Themes

- `next-themes` with `attribute="class"`, `defaultTheme="system"`,
  `enableSystem`. Tailwind's `darkMode: ["class"]` pairs with it.
- `<html suppressHydrationWarning>` because the theme class is set before
  hydration.
- `ThemeSwitch` renders both icons and CSS shows the right one, so nothing
  flashes before hydration. `Signature` and `Logo` work the same way
  (`currentColor` or both images, chosen by CSS).
- Browser UI colour (`theme-color`): `#fafafa` light, `#0d0d0d` dark.

# Other utilities

- `bg-dot-grid`: a 16 px dot grid in `--grid-dot` (the Ticket Yar pipeline box).
- `animate-caret`: the blinking caret after the header path.
- `rounded-4xl` (32 px), `bg-dark-gradient` (primary button in light mode).

# Print

`@media print` (for `/resume`): A4, 14 mm × 16 mm margins, `zoom: 0.8`, light
colour scheme and dark text even in dark mode, muted text `#4a4a4a`, no link
underlines. Elements with `print:hidden` (header, footer, navbar, gradients)
are dropped.
