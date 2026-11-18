---
type: API Endpoint
title: /llms.txt
description: A plain-text Markdown summary of the person, the work and the pages for AI agents, built from the same data as the pages.
resource: https://www.rezaattar.dev/llms.txt
tags: [endpoint, ai, llms-txt]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: route
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/llms.txt/route.ts
    title: src/app/llms.txt/route.ts
  - id: llmstxt
    resource: https://llmstxt.org
    title: The /llms.txt proposal
---

# Contract

| | |
|-|-|
| Method | `GET` |
| Content-Type | `text/plain; charset=utf-8` |
| Rendering | `force-static` (built once per deploy) |
| Format | [llmstxt.org](https://llmstxt.org): an H1, a blockquote summary, then H2 sections of links |

# Structure

```
# <site.name>
> <resume.title>. <site.tagline> <role> at <company>, based in <location>, <relocation sentence>.
<resume.summary paragraphs>
Currently: <product role> on <product name>.
## Highlights        from src/lib/highlights.ts
## Experience        one line per job from the resume
## Open source       only when src/lib/open-source.ts has entries
## Pages             About, Works, Resume, Contact (hard-coded list)
## Case studies      in ~/projects order, with each lede
## Resume files      /resume.md and the PDF
## Contact           email, LinkedIn, GitHub
```

# Maintenance

Everything except the "Pages" list comes from data, so it stays in step with
the pages. When adding a page, add it to that list in the route file
([add a window](/playbooks/add-window.md)).
