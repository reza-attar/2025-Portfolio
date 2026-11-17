---
type: Playbook
title: Add a project
description: Add a row to ~/projects with its own window and case study at /projects/<slug>.
tags: [playbook, projects]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: projects
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/projects.ts
    title: src/lib/projects.ts
  - id: studies
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/case-studies.ts
    title: src/lib/case-studies.ts
---

# Steps

1. Add the case study to `caseStudies` in `src/lib/case-studies.ts`
   (fields in [case studies](/content/case-studies.md)). Follow problem →
   what I built → result; no invented numbers. Images go in
   `public/case-studies/` and are imported statically.
2. Add an entry to `projects` in `src/lib/projects.ts` at the position it
   should appear: `slug` (same as the case study), `name` (same as the case
   study's name; a unit test checks), `oneLiner`, up to three `stack` items,
   and a `color` (`orange`, `yellow`, `blue`, `green`, `purple`).
3. Nothing else: the route, sitemap entry, `/llms.txt` line, window title and
   accent dot all come from those two entries.
4. `bun run test`, then `bun run build` and open `/projects/<slug>`.
