---
type: Reference
title: Page metadata
description: How each page gets its title, description, canonical URL, Open Graph and Twitter tags through one helper, plus the site-wide robots and verification settings.
tags: [seo, metadata, open-graph]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: helper
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/metadata.ts
    title: src/lib/metadata.ts
  - id: layout
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/layout.tsx
    title: src/app/layout.tsx
---

# `pageMetadata({ title, description?, path })`

Every page exports `metadata = pageMetadata(...)` (case studies call it from
`generateMetadata`). It returns:

| Tag | Value |
|-----|-------|
| `title` | `title` |
| `description` | `description`, or by default `"<site.tagline> <resume.role> · <site.focus>"` |
| `alternates.canonical` | `path` (made absolute by `metadataBase`) |
| `openGraph` | title, description, `url: path`, `siteName`, `type: website`, `locale: en_US`, image `/og` 1200 × 630 with alt `site.name` |
| `twitter` | `summary_large_image`, title, description, image `/og` |

`path` is relative to `site.url`, e.g. `"/about"`.

# Site-wide settings (root layout)

- `metadataBase: new URL(site.url)`, so relative URLs become
  `https://www.rezaattar.dev/...`.
- `authors` and `creator`: `site.name`.
- `robots`: index and follow; for Googlebot also `max-image-preview: large`
  and `max-snippet: -1` (full snippets).
- `verification.google`: set from the `GOOGLE_SITE_VERIFICATION` environment
  variable when present (Search Console).
- `viewport.themeColor`: `#EEEFE9` light, `#22242C` dark (the taskbar colour).

# Titles and descriptions

| Page | Title | Description |
|------|-------|-------------|
| `/` | Reza Attar · Full-stack engineer, from schema to interface | Default |
| `/projects` | ~/projects — Reza Attar | Products built end to end |
| `/projects/<slug>` | `<name>` — Reza Attar | The case study's lede |
| `/stack` | stack.sh — Reza Attar | The tools, from the database to the interface |
| `/resume` | resume.pdf — Reza Attar | Experience, projects, skills, awards and education |
| `/contact` | Contact — Reza Attar | Availability and how to reach me |
| `/trash` | Trash — Reza Attar | A joke |
| 404 | 404.txt — Page not found | none; `noindex` |

Pattern for new windows: `` `${title} — ${site.name}` `` (the window title) with a page-specific
description. Old routes (`/about`, `/works`, `/works/<slug>`) redirect with a 308.
