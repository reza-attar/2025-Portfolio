---
type: Web Page
title: Resume
description: The full resume rendered from content/resume.md, with a PDF download, linkable sections and print styles.
resource: https://www.rezaattar.dev/resume
tags: [page, resume, print]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/resume/page.tsx
    title: src/app/resume/page.tsx
  - id: css
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/globals.css
    title: src/app/globals.css
---

# Route

- File: `src/app/resume/page.tsx`.
- Title: "Resume · Reza Attar". Description: "Resume of <name>, <role>".
- Data: everything from `resume` ([resume source](/content/resume-source.md)).

# Content

1. H1 "Resume", "Download PDF" (`/Reza_Attar_Resume.pdf`) and "Get in touch".
2. Name, headline, location, email, LinkedIn, GitHub, Stack Overflow,
   availability.
3. Sections, each titled with its `## Heading` from the resume file:
   Summary, Experience, Projects, Skills, then Awards beside Education and
   Languages.

# Anchors

Links can point at any section or job:

| Fragment | Target |
|----------|--------|
| `#summary`, `#experience`, `#projects`, `#skills`, `#awards`, `#education`, `#languages` | A section (the `ResumeSection` keys) |
| `#<slugify(company)>`, e.g. `#dotin`, `#nuwa`, `#solution-apps-dg-gmbh`, `#mahaksoft` | One job |

The targeted heading turns to strong ink (`group-target`). `ScrollToHash`
scrolls again after mount, because on client navigation Next.js can scroll
before the content is on screen. `scroll-padding-top` keeps the target below
the sticky desktop header.

# Print

Visitors can use the browser's Print → Save as PDF. `@media print` rules:
A4 with 14 mm × 16 mm margins, `zoom: 0.8`, light colours even in dark mode,
no link underlines. Header, footer, navbar, gradients and the page intro are
hidden. Skills print as comma-separated lines instead of tags.

The committed PDF is generated separately ([build pipeline](/architecture/build-pipeline.md)).
