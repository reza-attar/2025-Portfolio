---
type: Web Page
title: Not found
description: The 404 page, a static 404.txt window, excluded from search.
tags: [page, error]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/not-found.tsx
    title: src/app/not-found.tsx
---

- File: `src/app/not-found.tsx`. Shown for any unknown path and for
  `notFound()` calls (for example an unknown project slug).
- Metadata: title "404.txt — Page not found", `robots: { index: false }`.
- Content: a static `404.txt` window (not managed by the window store) with
  "File not found." and links to `/projects` and `/`. The taskbar and the
  desktop icons still work around it.
