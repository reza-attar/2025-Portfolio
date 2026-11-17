---
type: Playbook
title: Add a project card
description: Add a card to /works and the home page's "Selected work", with a screenshot or a steps diagram, and optionally a case study.
tags: [playbook, projects, works]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: projects
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/projects.ts
    title: src/lib/projects.ts
---

# Steps

1. Choose the visual:
   - **Screenshot**: add the image to `public/Projects/` and import it
     (`import foo from "@public/Projects/foo.png";`). Large PNGs are fine;
     the card requests at most 560 px.
   - **Steps**: a list of `{ label, text, layer?, edge? }` describing how the
     product works. Set `layer` only on parts Reza built.
2. Add a logo to `public/Projects/` (optional) and reference it as
   `"/Projects/foo-icon.png"`.
3. Insert the entry in `projects` at the position it should appear. Fields are
   in [projects](/content/projects.md). Set `layers` to the layers worked on.
4. Live site: set `href`. No public link: leave out `href` and set `note`.
5. With a case study: set `caseHref` and follow
   [add a case study](/playbooks/add-case-study.md).
6. Check `/works`, the home page, and Previous/Next on the neighbouring case
   studies (the order changed).

For a smaller card with a case study, add to `moreCaseStudies` instead:
`name`, `meta`, `description`, `stack`, `caseHref`, `layers`.
