---
type: Data Source
title: Layers (src/lib/layers.ts)
description: The four product layers (Data, Backend, AI, Interface) that give the site its "schema to interface" visual language, with colours and headline metrics.
tags: [content, layers, design]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/layers.ts
    title: src/lib/layers.ts
  - id: css
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/globals.css
    title: src/app/globals.css
---

# The layers

| # | id | Name | Hero node | Edge to next | Metric | Metric source |
|---|----|------|-----------|--------------|--------|---------------|
| 01 | `data` | Data | PostgreSQL · pgvector | Prisma | 1.15 s → 9 ms query time on the hottest read paths | `/resume#nuwa` |
| 02 | `backend` | Backend | NestJS · Node | jobs · embeddings | 2m 25s → 34s backend compile time after SWC | `/works/ticket-yar` |
| 03 | `ai` | AI | RAG · LLMs | typed JSON | 3rd place, LLM Agents Hackathon, Sharif University, 2025 | `/resume#awards` |
| 04 | `interface` | Interface | Next.js · React | - | 58 → 98 Lighthouse performance on the Mora blog | `/works/mora-blog` |

Each layer also has a `summary` and a `stack` list, shown in the home page's
"the stack, layer by layer" section.

# Colours

Defined as CSS variables in `globals.css` and exposed to Tailwind as
`layer-data`, `layer-backend`, `layer-ai`, `layer-interface`.

| Layer | Light | Dark |
|-------|-------|------|
| Data | `#3f64ea` | `#7b93ff` |
| Backend | `#e5484d` | `#ff6b70` |
| AI | `#8e4ec6` | `#c08cf0` |
| Interface | `#d18a00` | `#ffc53d` |

The dark values are copied into the [share image](/endpoints/og-image.md).

# Helpers

Tailwind only generates classes it finds written out in the source, so the
class names are spelled out in maps:

- `layerBg[id]` → `bg-layer-<id>`
- `layerText[id]` → `text-layer-<id>`
- `layerVar[id]` → `var(--layer-<id>)`
- `layerById[id]` → the `Layer` object

Do not build these class names with string templates.

# Used by

Hero `SystemDiagram`, `StackLayers`, `NowBuilding` (step badges), `Card`
(step markers and strip), `LayerStrip`, `/works` "More case studies", `/og`.

The metrics repeat resume facts; keep them in step with
[the resume](/content/resume-source.md).
