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
| 02 | `backend` | Backend | NestJS · Node | jobs · embeddings | 2m 25s → 34s backend compile time after SWC | `/projects/ticket-yar` |
| 03 | `ai` | AI | RAG · LLMs | typed JSON | 3rd place, LLM Agents Hackathon, Sharif University, 2025 | `/resume#awards` |
| 04 | `interface` | Interface | Next.js · React | - | 58 → 98 Lighthouse performance on the Mora blog | `/projects/mora-blog` |


# Used by

Only the share image (`/og`) since reza.os: it draws the four layers with the
dark colours hard-coded in `src/app/og/route.tsx`. The `summary`, `stack` and
`metric` fields are kept for a future window.

The metrics repeat resume facts; keep them in step with
[the resume](/content/resume-source.md).
