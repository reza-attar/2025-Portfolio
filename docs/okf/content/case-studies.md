---
type: Data Source
title: Case studies (src/lib/case-studies.ts)
description: The data model behind each /works/<slug> page, the rich-text rule, and the six case studies on the site.
tags: [content, case-study, works]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/case-studies.ts
    title: src/lib/case-studies.ts
---

# Data model

```ts
type CaseStudy = {
  slug: string;          // URL: /works/<slug>
  name: string;
  nameFa?: string;       // Persian name, shown right-to-left after the title
  lede: string;          // Subtitle, meta description, llms.txt line
  type: string;          // "Own product", "Client product", ...
  period: string;
  role: string;
  live?: string;         // Public URL
  liveLabel?: string;    // Link text for `live`
  linkNote?: string;     // Shown when there is no `live` (default "Not public")
  note?: string;         // Italic note under the meta row
  hero?: CaseStudyImage; // { src: StaticImageData, alt, caption? }
  sections: CaseStudySection[];
};

type CaseStudySection = {
  label: string;                         // Left-hand heading
  metrics?: { value; caption }[];        // Big-number tiles
  paras?: string[];                      // rich
  tags?: string[];                       // Stack chips
  steps?: string[];                      // rich, numbered
  list?: string[];                       // rich, bullets
  flow?: ({ node } | { edge })[][];      // Rows alternating node, edge, node; "" edge = bare arrow
  after?: string[];                      // rich, after the lists
  table?: { head: [s, s, s]; rows: [s, s, s][] };  // Before / after table
  footnote?: string;
  images?: CaseStudyImage[];
};
```

**Rich text** (`paras`, `steps`, `list`, `after`) accepts `**bold**` and
`` `code` `` only. How each field renders is in [case-study page](/pages/case-study.md).

Images are imported from `@public/case-studies/` or `@public/Projects/` as
static imports, so Next.js knows their size and can generate blur
placeholders.

Common section labels: The problem, My role, Stack, How it works / What I
built / What I did, Architecture, Result, Screenshots, What I learned / What
I'd do next.

# The six studies

Listed in `/works` order, which also sets the previous/next order.

| Slug | Name | Type | Period | Role | Link |
|------|------|------|--------|------|------|
| `ticket-yar` | Ticket Yar (تیکت‌یار) | B2B product, used internally (Dotin) | 2025 – present | `resume.product.role` | Not public |
| `cashio` | Cashio | Own product | 2026 | Solo builder | mycashio.ir |
| `mybody` | MyBody | Client product | Oct 2025 – present | Backend developer | mybodyapp.ir |
| `maica` | Maica (مایکا) | Own product (co-founded) | 2025 – 2026 | Co-founder, full-stack | maica.ir |
| `mora-blog` | Mora Blog | Team product (NUWA) | Nov 2023 – Aug 2025 | Full-stack developer | No longer live |
| `medicine-matching` | Medicine matching | Client prototype (freelance) | Aug 2026 | Sole developer | Not public (demo on request) |

Order in the file differs from the order on the site. The site order comes
from [projects](/content/projects.md).

# Content rules seen in the existing studies

- Numbers carry their source or caveat (the Mora Blog table footnote explains
  that the before and after runs came from different tools).
- NDA-sensitive details are left out (commit "remove NDA-sensitive Ticket Yar
  details").
- Products without a public link say why in `note` or `linkNote`.

To add one, follow [add a case study](/playbooks/add-case-study.md).
