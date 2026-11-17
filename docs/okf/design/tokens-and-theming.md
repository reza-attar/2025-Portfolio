---
type: Reference
title: Tokens and theming
description: The CSS custom properties behind every colour, the type scale, light and dark themes, wallpapers and print.
tags: [design, tokens, theme, css]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: tokens
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/styles/tokens.css
    title: src/styles/tokens.css
---

The look is "retro OS, drawn with a marker": flat surfaces, 1.5 px outlines,
offset shadows with no blur, and colour used as labels.

# Colours

All colours are CSS custom properties in `src/styles/tokens.css`, on `:root`
(light) and `[data-theme="dark"]`. Components use the variables, never raw hex,
except the surfaces that are light in both themes (pastel tiles, the
terminal, the résumé paper, the callout).

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--bg` | `#E5E7E0` | `#1B1D24` | Desktop |
| `--panel` | `#EEEFE9` | `#22242C` | Taskbar, menus |
| `--win` | `#FFFFFF` | `#2A2D36` | Window body |
| `--chrome` / `--chrome-idle` | `#EEEFE9` / `#F7F7F4` | `#353844` / `#2A2D36` | Front / back title bars |
| `--ink` / `--muted` | `#151515` / `#4D4F46` | `#EEEFE9` / `#B3B5AC` | Text |
| `--border` / `--line` | `#151515` / `#D0D1C9` | `#0B0C0F` / `#41444F` | Outlines / rules |
| `--link` | `#1D4AFF` | `#8FA2FF` | Links (`--blue` fails contrast on dark windows) |
| `--accent` | `#F54E00` | same | Primary button, active marker, close hover |
| `--yellow` `--blue` `--green` `--purple` | `#F7A501` `#1D4AFF` `#2F9E44` `#B62AD9` | same | Accent dots, menu hover, focus ring, status |
| `--tile-*` | pastels | same | Tiles; text on them is always `#151515` |

Primary buttons use ink text on orange: white on `#F54E00` is 3.5:1, under
the 4.5:1 rule.

# Type

IBM Plex Sans for prose, IBM Plex Mono for the machine (file names, paths,
stacks, shortcuts, dates), both through `next/font/google` as `--font-sans`
and `--font-mono`. Display headings are 32-46 px / 1.04, bold, -0.02em.

# Theme, wallpaper, mode

`<html>` carries `data-theme` (`light`/`dark`), `data-wall` (`dots`,
`grid`, `plain`) and `data-mode` (`os`/`simple`). The inline script in
`layout.tsx` sets them before paint from `localStorage['reza.os/prefs']`
(theme falls back to the system setting), so there is no flash; `Shell` keeps
them in sync afterwards.

# Print

`@media print` in `base.css` hides the taskbar, icons and back windows, and
prints the front window's body flat.
