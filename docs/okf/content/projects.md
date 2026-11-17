---
type: Data Source
title: Projects (src/lib/projects.ts)
description: The project cards shown on /works and the home page, the smaller "More case studies" cards, and the order they set.
tags: [content, projects, works]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/projects.ts
    title: src/lib/projects.ts
  - id: card
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/components/ui/Card.tsx
    title: src/components/ui/Card.tsx
---

# `projects`: main cards

Rendered with `Card` on `/works` and in the home page's "Selected work", in
array order. Fields (`CardProps`):

| Field | Meaning |
|-------|---------|
| `title` | Card heading |
| `meta` | Role and kind, e.g. "Solo builder · Own product" |
| `description` | One or two sentences |
| `href` | Public URL. Leave it out when the product is not live; the "Visit Site" link is hidden |
| `note` | Shown where "Visit Site" would be when there is no public link |
| `caseHref` | `caseStudyHref(slug)`; adds a "Read case study" button |
| `image` | A screenshot (static import) |
| `steps` | Instead of a screenshot, a vertical path through the product: `{ label, text, layer?, edge? }`. Leave out `layer` for parts not built by Reza |
| `logo` | Path under `/Projects/` or a static import |
| `layers` | Layers the project touched, drawn as a [layer strip](/content/layers.md) |

Current order:

| # | Title | Case study | Visual | Layers |
|---|-------|------------|--------|--------|
| 1 | Ticket Yar (`resume.product.name`) | `ticket-yar` | steps | data, backend, ai, interface |
| 2 | Cashio | `cashio` | steps | data, backend, interface |
| 3 | MyBody | `mybody` | steps | data, backend |
| 4 | Maica (`site.products.myca`) | `maica` | screenshot | data, backend, interface |
| 5 | Mora Blog | `mora-blog` | screenshot | data, backend, interface |
| 6 | Mora Dashboard | none | screenshot | data, backend, interface |
| 7 | Cleafin Marketplace | none | screenshot | interface |

# `moreCaseStudies`: smaller cards

Rendered under "More case studies" on `/works` only. Fields: `name`, `meta`,
`description`, `stack`, `caseHref`, `layers`, and optional `link` + `href`
(both needed for the link to show). Current entry: Medicine matching.

# What the order controls

- The home page's "Selected work" shows every entry in `projects`, in order.
- The case-study pager and the "Case studies" list in `/llms.txt` follow
  `projects`, then `moreCaseStudies`.
- A case study must appear in one of the two lists, or its page returns 404.
