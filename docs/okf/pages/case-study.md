---
type: Web Page Template
title: Case study
description: The dynamic route that renders one page per entry in src/lib/case-studies.ts, with a meta row, typed sections and previous/next links.
resource: https://www.rezaattar.dev/works/ticket-yar
tags: [page, works, case-study, template]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/works/[slug]/page.tsx
    title: src/app/works/[slug]/page.tsx
---

# Route

- File: `src/app/works/[slug]/page.tsx`. URL: `/works/<slug>`, built with
  `caseStudyHref(slug)`.
- `generateStaticParams()` returns every slug in `caseStudies`.
  `dynamicParams = false`, so any other slug is a 404.
- Title: `<name> · Reza Attar`. Description: the study's `lede`.
- JSON-LD: `BreadcrumbList` Home › Works › name.

The live pages are listed in [case studies](/content/case-studies.md).

# Layout

1. "All work" back link to `/works`.
2. H1 with the name. If `nameFa` is set, the Persian name follows in smaller
   text, marked `lang="fa" dir="rtl"`.
3. The lede.
4. A meta row: **Role**, **Type**, **Period**, **Link**. Link is the `live` URL
   (labelled `liveLabel`), or `linkNote`, or "Not public".
5. `note` in italics, if set.
6. `hero` image, if set (loaded with priority).
7. One row per entry in `sections`: the label on the left, the content on the
   right.
8. Previous / Next cards.

# Section rendering

A section can have several fields. They render in this order, whatever order
they are written in:

`metrics` → `paras` → `tags` → `steps` (numbered) → `list` (bullets) → `flow`
(node → edge → node rows) → `after` → `table` → `footnote` → `images`

`paras`, `steps`, `list` and `after` support `**bold**` and `` `code` `` only
(the `Rich` component). No links, no other Markdown.

# Previous / next order

The pager follows the order of the cards on `/works`: `projects` first, then
`moreCaseStudies`, keeping only entries with a `caseHref`. It wraps around at
both ends.

A case study that no card links to is not in that list, so its page calls
`notFound()`, even though it is in `generateStaticParams()` and the sitemap.
