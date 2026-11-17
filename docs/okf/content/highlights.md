---
type: Data Source
title: Highlights (src/lib/highlights.ts)
description: The four headline results shown near the top of the home page and in /llms.txt.
tags: [content, home, metrics]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/highlights.ts
    title: src/lib/highlights.ts
---

Each highlight is `{ value, label, context, href }`. The card links to where
the number is backed up.

| Value | Label | Context | Links to |
|-------|-------|---------|----------|
| −77% | compile time | Ticket Yar backend, moved to NestJS + SWC | `/projects/ticket-yar` |
| 128× | faster queries | NUWA, hottest read paths from 1.15 s to 9 ms | `/resume#nuwa` |
| 13 s → 3 s | page load | Mahaksoft, asset budgets and code splitting | `/resume#mahaksoft` |
| 3 | engineers led | Remote React team for a German company | `/resume#solution-apps-dg-gmbh` |

Resume anchors are built with `slugify(company)`, so they break if a company
heading in the resume is renamed.

The numbers are copied from [the resume](/content/resume-source.md). Change both
together. The grid fits four cards on wide screens (`lg:grid-cols-4`).
