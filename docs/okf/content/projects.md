---
type: Data Source
title: Projects (src/lib/projects.ts)
description: The rows in ~/projects, their order, colours and the window each one opens.
tags: [content, projects]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/projects.ts
    title: src/lib/projects.ts
---

`projects` lists the projects in the order `~/projects` shows them. Each one
has a window at `/projects/<slug>` that renders its
[case study](/content/case-studies.md).

| Field | Use |
|-------|-----|
| `slug` | Route and case-study key |
| `name` | Window title and table name; must equal the case study's `name` (unit-tested) |
| `oneLiner` | "What it is" column and card text |
| `stack` | Up to three items: table column and chips |
| `color` | `orange`, `yellow`, `blue`, `green` or `purple`: the window's accent dot and the pastel tile |

The list deliberately doesn't import the case studies, so their text stays out
of the first page load; `ProjectApp` looks the study up with `getCaseStudy`.
The first three projects also appear as cards in `about.md`.

How to add one: [add a project](/playbooks/add-project.md).
