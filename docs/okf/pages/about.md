---
type: Web Page
title: About
description: Portrait, an "At a glance" summary, a short personal story and the list of past jobs.
resource: https://www.rezaattar.dev/about
tags: [page, about]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/about/page.tsx
    title: src/app/about/page.tsx
---

# Route

- File: `src/app/about/page.tsx`.
- Title: "About · Reza Attar". The description is built from `resume.role`,
  `resume.company` and `site.relocation.sentence`.
- JSON-LD: `ProfilePage` with the `Person` as main entity.

# Content

| Block | Source |
|-------|--------|
| H1 "A little bit about me" | Hard-coded |
| Portrait (`public/portrait.jpg`) | Preloaded with high fetch priority: it is the page's largest paint |
| Buttons "Get in touch" (`/contact`) and "Download resume" (the PDF) | `RESUME_PDF_PATH` |
| "At a glance": Role, Based in, Languages, Focus | `resume.role`, `resume.company`, `resume.location`, `site.relocation.short`, `site.languages`, `site.focus` |
| "Who I am", "What I do", "What I did" | Prose in the page, with some values from `resume` and `site`; the numbers in it are copied from the resume (see [data flow](/architecture/data-flow.md)) |
| Contact sentence: email, resume, LinkedIn | `resume.email`, `getLinkedinLink()` |
| Signature | `components/about/Signature.tsx`; light and dark images, CSS shows one |
| Experience list, with a "Full resume" link | `resume.experience` (period, company, role, location) |
