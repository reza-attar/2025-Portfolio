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
- `viewport.themeColor`: `#fafafa` light, `#0d0d0d` dark.

# Titles and descriptions

| Page | Title | Description |
|------|-------|-------------|
| `/` | Reza Attar · Full-stack engineer, from schema to interface | Default |
| `/about` | About · Reza Attar | Role, company, stack and relocation |
| `/works` | Works · Reza Attar | Products built end to end, naming Ticket Yar, Cashio and MyBody |
| `/works/<slug>` | `<name>` · Reza Attar | The case study's lede |
| `/contact` | Contact · Reza Attar | Writing about a product that needs every layer built together |
| `/resume` | Resume · Reza Attar | Resume of `<name>`, `<role>` |
| 404 | Page not found | none; `noindex` |

Pattern for new pages: `"<Page> · ${site.name}"` with a page-specific
description.
