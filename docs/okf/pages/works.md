---
type: Web Page
title: Works
description: Lists every project card in order, then the smaller "More case studies" cards.
resource: https://www.rezaattar.dev/works
tags: [page, works, projects]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/works/page.tsx
    title: src/app/works/page.tsx
---

# Route

- File: `src/app/works/page.tsx`.
- Title: "Works · Reza Attar".

# Content

1. H1 "Projects" and a subtitle.
2. **Featured projects**: one `Card` per entry in `projects`, in array order,
   then `ProjectPlaceholder` (an invitation to get in touch). The list has a
   visually hidden H2 so the cards' H3 titles keep the heading order.
3. **More case studies**: one smaller card per entry in `moreCaseStudies`,
   showing name, meta, description, a [layer strip](/content/layers.md),
   stack and a "Read case study" link.

The data and the order are documented in [projects](/content/projects.md).
The order here also sets the previous/next order on [case-study pages](/pages/case-study.md)
and the order in `/llms.txt`.
