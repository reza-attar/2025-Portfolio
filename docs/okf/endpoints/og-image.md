---
type: API Endpoint
title: /og share image
description: The 1200 × 630 Open Graph and Twitter card image, drawn with next/og and used by every page.
resource: https://www.rezaattar.dev/og
tags: [endpoint, open-graph, image]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: route
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/og/route.tsx
    title: src/app/og/route.tsx
---

| | |
|-|-|
| Method | `GET` |
| Output | PNG, 1200 × 630, from `ImageResponse` (`next/og`) |
| Rendering | `force-static` |
| Used by | `openGraph.images` and `twitter.images` in [`pageMetadata`](/seo/metadata.md), with alt text `site.name` |

# Design

A dark diagonal gradient with:

- `site.name` in grey, then `site.tagline` large and bold.
- The four [layers](/content/layers.md) as chips joined by arrows, each with a
  square in its colour.
- The domain (`site.url` without `https://www.`).

The layer colours are copied from the dark-theme `--layer-*` values in
`globals.css`, because the image renderer cannot read CSS variables. Change
both together.

A separate image per case study is an open item in the SEO checklist.
