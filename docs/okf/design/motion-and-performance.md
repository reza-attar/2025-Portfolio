---
type: Reference
title: Motion and performance
description: Window animations, reduced motion, and the choices that keep the shell fast.
tags: [design, motion, performance]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: css
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/styles/window.css
    title: src/styles/window.css
---

# Motion

| Event | Animation |
|-------|-----------|
| Open | fade + scale .96 → 1 + 6 px rise, 140 ms. Only windows opened after boot animate, so the first windows replace the static ones without a flash |
| Close / minimize | reverse / shrink upward, 120 / 140 ms, then the store updates |
| Maximize, restore, snap | `left/top/width/height` transition, 160 ms, never during a drag |
| Buttons | lift 2 px on hover, sink 1 px on press, 80 ms |

`prefers-reduced-motion: reduce` turns every animation and transition off,
and close/minimize then happen at once.

# Performance

- Drag and resize write to the DOM and commit to the store once on `pointerup`.
- `Window` and its body are memoised; components subscribe with selectors.
- The project and résumé bodies load with `next/dynamic`; the case-study text
  is not in the first page load.
- Every route is static. The static window sits exactly where the live one
  opens, so hydration causes no layout shift (CLS measured at 0 on phones,
  0.0003 on desktop).
- No third-party scripts on the critical path; Vercel Analytics loads after.
