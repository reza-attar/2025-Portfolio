---
type: Reference
title: Motion and performance
description: How the animations are built to stay on the compositor, what reduced motion turns off, and the loading choices behind the PageSpeed scores.
tags: [design, performance, animation, core-web-vitals]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: orbs
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/components/HeroOrbs.tsx
    title: src/components/HeroOrbs.tsx
  - id: diagram
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/components/SystemDiagram.tsx
    title: src/components/SystemDiagram.tsx
  - id: layout
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/layout.tsx
    title: src/app/layout.tsx
---

# Animations

| Animation | Keyframes | How |
|-----------|-----------|-----|
| Packet travelling down the system diagram | `packet` | Moves a track with `transform` and fades with `opacity` only: no layout or paint per frame |
| Node ping | `node-ping` | An `opacity`-only ring around each node, timed to the packet |
| Hero orbs drifting | `orb-drift` | Soft circles made with a **radial gradient, not a blur filter**, moved with `transform` |
| Oval orbits | `orbit-spin` | `rotate` on two bordered ovals, 60 s and 90 s |
| Header caret | `caret` | Blinks with `step-end` |
| Header hide/show | transition | `transform` only |

An animated blur filter was repainted every frame and kept phones' main thread
busy (slow LCP and TBT in PageSpeed). The gradient is painted once and the
movement runs on the compositor. A separate `scale` makes each circle as large
as the blur used to spread.

# Reduced motion

Every looping animation uses `motion-safe:`, so with "reduce motion" switched
on the orbs and orbits stay still, the packet and pings are not shown, the
caret does not blink and the scroll hint does not bounce. The header
transition uses `motion-reduce:transition-none`.

# Loading

- **Gradients**: `public/Gradient.webp` is a 320 px image scaled up behind a
  blur. It is served `unoptimized` (no image-optimizer round trip), and the
  top one is preloaded with high fetch priority, since it is often the largest
  paint on the first screen.
- **Portrait on About**: preloaded with `fetchPriority="high"` and a blur
  placeholder.
- **Card screenshots**: `sizes` caps them at 560 px, so phones do not fetch
  the 2–4K originals.
- **Case-study images**: `sizes` set for the 992 px hero and 760 px figures;
  the hero has `priority`.
- **Fonts**: variable fonts without a `weight` list, so there is one
  `@font-face` per subset in the render-blocking CSS.
- **Signature**: both theme images load lazily; the hidden one
  (`display: none`) is never downloaded.
- **Static output**: no request-time rendering; see [build pipeline](/architecture/build-pipeline.md).

The commit "perf: fix low PageSpeed scores (LCP, TBT, CLS, accessibility)"
introduced most of these. Re-check PageSpeed Insights on `/` and `/works`
(mobile) after changes to the hero or images.
