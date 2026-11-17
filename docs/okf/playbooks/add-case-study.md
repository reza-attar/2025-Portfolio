---
type: Playbook
title: Add a case study
description: Create a new /works/<slug> page and the card that links to it, so it is reachable, ordered and listed for crawlers.
tags: [playbook, case-study, works]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/case-studies.ts
    title: src/lib/case-studies.ts
  - id: projects
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/projects.ts
    title: src/lib/projects.ts
---

# Steps

1. **Images (optional).** Put screenshots in `public/case-studies/` (JPEG,
   a sensible width) and import them at the top of `src/lib/case-studies.ts`:
   `import fooHero from "@public/case-studies/foo-hero.jpg";`
2. **Data.** Add an object to `caseStudies`, following the
   [data model](/content/case-studies.md):
   - `slug`: lowercase, hyphenated, unique. It becomes the URL.
   - `lede`: one sentence. It is also the meta description and the
     `/llms.txt` line.
   - `type`, `period`, `role`, then `live` + `liveLabel`, or `linkNote` /
     `note` explaining why there is no link.
   - `sections`: usually The problem, My role, Stack (`tags`), How it works /
     What I built, Result (`metrics`), What I learned.
   - Only `**bold**` and `` `code` `` in rich text.
3. **Card (required).** Link it from `src/lib/projects.ts` with
   `caseHref: caseStudyHref("<slug>")`, either in `projects` (a full card,
   see [add a project card](/playbooks/add-project-card.md)) or in
   `moreCaseStudies` (a smaller card). **Without a card the page returns 404.**
   The card's position sets the previous/next order.
4. **Check** with `bun run dev`:
   - `/works/<slug>` renders, and Previous/Next go to the expected neighbours.
   - The card appears on `/works` (and on the home page if in `projects`).
   - `/sitemap.xml` and `/llms.txt` list it.
5. If the case study is about the current product or changes a headline
   number, update [highlights](/content/highlights.md) or
   [layers](/content/layers.md) to match.

Nothing else needs registering: static params, sitemap, breadcrumbs and
metadata all read `caseStudies`.
