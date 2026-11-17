---
type: API Endpoint
title: /sitemap.xml
description: Lists the five main pages and every case study, with the build time as lastModified.
resource: https://www.rezaattar.dev/sitemap.xml
tags: [endpoint, seo]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: route
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/sitemap.ts
    title: src/app/sitemap.ts
---

- Paths: `/`, `/projects`, `/stack`, `/resume`, `/contact`, then
  `/projects/<slug>` for every entry in `projects` (`/trash` is left out).
- URLs are absolute on `site.url`; the home page is the bare origin.
- `lastModified` is the build time for every URL.
- Submitted in Google Search Console.

When adding a window, add its path here ([add a window](/playbooks/add-window.md)).
