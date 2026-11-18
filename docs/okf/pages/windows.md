---
type: Web Page
title: Windows
description: The seven window routes, their titles, default sizes and what each one shows.
tags: [page, windows, os]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: meta
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/os/app-meta.ts
    title: src/features/os/app-meta.ts
  - id: apps
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/apps
    title: src/features/apps
---

| Title | Route | Size | Body | Primary action |
|-------|-------|------|------|----------------|
| `about.md` | `/` | 620 x 440 | `AboutApp`: status badges, headline, intro, recent work cards, career as a commit log, "Shameless CTA" | Open ~/projects |
| `~/projects` | `/projects` | 660 x 380 | `ProjectsApp`: file table of `src/lib/projects.ts` | A name opens its window |
| `<project name>` | `/projects/<slug>` | 520 x 420 | `ProjectApp`: the case study from `src/lib/case-studies.ts` | Live demo (when public) |
| `stack.sh` | `/stack` | 440 x 300 | `StackApp`: terminal listing the resume's skill groups | - |
| `resume.pdf` | `/resume` | 540 x 560 | `ResumeApp`: paper-style resume from `content/resume.md`, with `#experience`, `#<company>` anchors | Download PDF |
| `Contact` | `/contact` | 420 x 380 | `ContactApp`: availability, email, time zone | Email me |
| `Trash` | `/trash` | 400 x 220 | `TrashApp`: `old-portfolio-jquery/` and one dry line | - |

Each route exports metadata (title = window title + " — Reza Attar"; the home
page keeps the site title) and renders `<RouteWindow id>`, which puts the
window's full content in the server HTML. `/` adds WebSite and ProfilePage
JSON-LD; project pages add breadcrumbs.

Printing (`Ctrl/⌘+P`) prints only the front window's body, so printing
`/resume` gives the resume.
