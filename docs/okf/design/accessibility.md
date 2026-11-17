---
type: Reference
title: Accessibility
description: Keyboard, focus, screen reader and contrast patterns in reza.os.
tags: [design, accessibility, a11y]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: focus
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/os/open-app.ts
    title: src/features/os/open-app.ts
---

- Each window is `role="dialog"` `aria-modal="false"`, labelled by its title
  `h2`. DOM order is open order, so Tab order is stable.
- Opening a window from the keyboard (or in simple mode) moves focus to its
  title; closing returns focus to the control that opened it.
- A polite live region announces "about.md opened", "~/projects minimized",
  "snapped left" and so on.
- Nothing needs dragging: snap and maximize have shortcuts, every control is a
  labelled button.
- Tray buttons expose `aria-pressed`; the system menu is `role="menu"` with
  arrow keys, Home/End and Esc.
- "Skip to content" focuses the front window.
- Focus ring: 2 px `--blue`, offset 2 px, never removed.
- Contrast: text pairs pass 4.5:1 (hence ink text on orange buttons and
  `--link` in dark mode).
- Simple mode touch targets are at least 44 x 44 px.
- Reduced motion disables all animation.
