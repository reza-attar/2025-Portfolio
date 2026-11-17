---
type: Reference
title: Sources of truth and data flow
description: Which file owns each fact on the site, what reads it, and the values that are copied by hand and must be kept in step.
tags: [architecture, content, data-flow]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: resume-ts
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/resume.ts
    title: src/lib/resume.ts
  - id: site
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/site.ts
    title: src/lib/site.ts
  - id: utils
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/utils.ts
    title: src/lib/utils.ts
---

# Owners

| Fact | Owner | Concept |
|------|-------|---------|
| Name, headline, role, company, location, years of experience, email, profile links, availability, current product, summary, jobs, projects, skills, awards, education, languages | `content/resume.md` | [Resume source](/content/resume-source.md) |
| Site name, title, URL, tagline, focus, relocation wording, languages shown on About, nav, Maica product link | `src/lib/site.ts` | [Site preferences](/content/site-preferences.md) |
| Case study pages | `src/lib/case-studies.ts` | [Case studies](/content/case-studies.md) |
| Project cards and their order | `src/lib/projects.ts` | [Projects](/content/projects.md) |
| The four layers, their colours and metrics | `src/lib/layers.ts`, `globals.css` | [Layers](/content/layers.md) |
| Home-page highlight numbers | `src/lib/highlights.ts` | [Highlights](/content/highlights.md) |
| Open-source contributions | `src/lib/open-source.ts` | [Open source](/content/open-source.md) |
| LinkedIn, GitHub, YouTube, Goodreads URLs for client code | `src/lib/utils.ts` | below |

# Flow

```
content/resume.md
  ├─ scripts/resume/parse.cjs (build-time loader) ─► src/lib/resume.ts `resume`
  │     ├─► /, /about, /resume, /contact, Footer
  │     ├─► page descriptions (src/lib/metadata.ts)
  │     ├─► Person JSON-LD (src/lib/structured-data.ts)
  │     └─► /llms.txt
  ├─ /resume.md route (raw file, HTML comments removed)
  └─ scripts/resume/pdf.mjs ─► public/Reza_Attar_Resume.pdf (+ content/resume.pdf.sha256)

src/lib/case-studies.ts ─► project windows (/projects/[slug]), metadata, /llms.txt
src/lib/projects.ts     ─► ~/projects, about.md cards, routes, sitemap.xml, /llms.txt
src/lib/profile.ts      ─► about.md, Contact (built from the resume + site)
src/lib/layers.ts       ─► /og
src/lib/highlights.ts   ─► /llms.txt
src/lib/open-source.ts  ─► /llms.txt
```

`src/lib/resume.ts` imports `content/resume.md` directly. The custom loader
turns the file into JSON at build time, so the data is typed (`ResumeData`)
and a format error fails the build with a line number.

# Values copied by hand

These are written in two places. Change both together.

| Value | Copy 1 | Copy 2 |
|-------|--------|--------|
| LinkedIn and GitHub URLs | `content/resume.md` front matter | `getLinkedinLink()`, `getGithubLink()` in `src/lib/utils.ts` (client components import `utils.ts`, so it cannot import the resume loader) |
| Highlight numbers (−77%, 128×, 13 s → 3 s, 3 engineers) | resume bullets | `src/lib/highlights.ts` |
| Layer metrics | resume and case studies | `src/lib/layers.ts` |
| Page list in `/llms.txt` | the routes | the hard-coded "Pages" list in `src/app/llms.txt/route.ts` |
| Project names | `name` in `src/lib/case-studies.ts` | `name` in `src/lib/projects.ts` (a unit test checks they match) |
| Window routes | `src/app/*/page.tsx` | `href` in `src/features/os/app-meta.ts` |
