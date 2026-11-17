---
type: Web Page
title: Home
description: The landing page, with a full-screen hero and numbered sections covering results, layers, the current product, work and experience.
resource: https://www.rezaattar.dev/
tags: [page, home]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/(Home)/page.tsx
    title: src/app/(Home)/page.tsx
  - id: sections
    resource: https://github.com/reza-attar/2025-Portfolio/tree/main/src/app/(Home)/sections
    title: src/app/(Home)/sections/
---

# Route

- File: `src/app/(Home)/page.tsx`. `(Home)` is a route group and does not
  appear in the URL.
- Title: `site.title` ("Reza Attar · Full-stack engineer, from schema to
  interface"), set by the root layout. The description is the default from
  [`pageMetadata`](/seo/metadata.md).
- JSON-LD: `WebSite` and `Person` ([structured data](/seo/structured-data.md)).

# Sections

Each section shows a kicker like `// 03 the stack, layer by layer`. The number
comes from the section's position in the `sections` array, starting at 02
because the hero is 01. Reordering the array renumbers the page.

| # | File | Kicker / heading | Reads |
|---|------|------------------|-------|
| 01 | `Hero.tsx` | "I build products from schema to interface." | `site`, `resume`; `HeroOrbs` and `SystemDiagram` |
| 02 | `Highlights.tsx` | highlights / "The short version" | [highlights](/content/highlights.md) |
| 03 | `StackLayers.tsx` | the stack, layer by layer | [layers](/content/layers.md) |
| 04 | `NowBuilding.tsx` | now building / "An AI layer that knows when not to answer" | `resume.product`; its own `pipeline` list |
| 05 | `SelectedWork.tsx` | selected work / "Shipped, end to end" | [projects](/content/projects.md) |
| - | `OpenSource.tsx` | open source / "Contributions so far" | [open source](/content/open-source.md); left out, and not numbered, while the list is empty |
| 06 | `Experience.tsx` | experience / "Where I've worked" | `resume.experience`; the first bullet shows, the rest fold away |
| 07 | `GetToKnowMe.tsx` | off the clock / "Get to know me" | Widgets: About me (`/about`) and Bookshelf (Goodreads) |
| - | `LetsWorkTogether` (`Widget.tsx`) | "Have a product that needs every layer?" | Links to `/contact`; its number is hard-coded (see [known issues](/architecture/known-issues.md)) |

# Hero

- Fills the first screen on large screens (`min-h-[calc(100svh-6rem)]`): name,
  role, the headline with "schema" and "interface" underlined in the Data and
  Interface layer colours, a short pitch linking the Ticket Yar case study, and
  the buttons "See the work" (`/works`) and "Read my resume" (`/resume`).
- On the right, the animated [system diagram](/design/motion-and-performance.md).
- A "highlights" link at the bottom scrolls to `#highlights`.
