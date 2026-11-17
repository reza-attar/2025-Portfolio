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

- Paths: `/`, `/about`, `/works`, `/resume`, `/contact`, then
  `/works/<slug>` for every entry in `caseStudies`.
- URLs are absolute on `site.url`; the home page is the bare origin.
- `lastModified` is the build time for every URL.
- Submitted in Google Search Console.

When adding a page, add its path here ([add a page](/playbooks/add-page.md)).
The case-study list comes from `caseStudies`, not from the `/works` order, so a
study with no card is listed but returns 404 (see [case study](/pages/case-study.md)).
