---
type: Reference
title: Project structure
description: What lives where in the repository, and the TypeScript import aliases.
tags: [architecture, folders]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: tsconfig
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/tsconfig.json
    title: tsconfig.json
---

# Layout

```
content/
  resume.md                 Source of truth for the resume (see content/resume-source)
  resume.pdf.sha256         Hash of the resume source the PDF was built from
  requested-claude-design/  Design handoff (app icon designs), not used by the build
docs/
  seo-checklist.md          SEO and Open Graph checklist
  okf/                      This knowledge bundle
public/                     Static files, served from the site root
  Reza_Attar_Resume.pdf     Generated from content/resume.md, committed
  portrait.jpg, Gradient.webp
  Projects/, case-studies/  Screenshots and logos for cards and case studies
  Logos/, Signature/, Widgets/, Contact Window/, Hand Arrow/, icons/
scripts/resume/
  parse.cjs                 resume.md parser and the Next.js loader
  pdf.mjs                   Builds and checks the resume PDF
src/
  app/                      App Router routes (see pages/ and endpoints/)
    (Home)/                 Route group for "/" (does not change the URL)
      page.tsx
      sections/             One file per home-page section
    about/, works/, works/[slug]/, contact/, resume/
    llms.txt/route.ts, resume.md/route.ts, og/route.tsx
    robots.ts, sitemap.ts, not-found.tsx
    layout.tsx, providers.tsx, globals.css, favicon.ico
  components/               Site-wide components (Header, Footer, diagrams, ...)
    ui/                     Small reusable pieces (Button, Card, Tag, Widget, ...)
    about/Signature.tsx
  lib/                      Data and helpers (see content/)
next.config.ts              SVG and Markdown loaders
tailwind.config.ts          Design tokens (see design/)
svgr.d.ts                   Types for *.svg and *.md imports
```

# Import aliases

Set in `tsconfig.json`:

| Alias | Points to | Example |
|-------|-----------|---------|
| `@/*` | `src/*` | `import { site } from "@/lib/site"` |
| `@public/*` | `public/*` | `import Portrait from "@public/portrait.jpg"` |
| `@icons/*` | `public/icons/*` | Defined, but nothing imports from it today |

An `.svg` import is a React component (SVGR). A `.md` import is the parsed
resume data. See the [build pipeline](/architecture/build-pipeline.md).

# Conventions

- Server components by default. Only components that need browser APIs are
  client components: `HeaderNav`, `HeaderShell`, `Navbar`, `ThemeSwitch`,
  `ScrollToHash`, the contact form and `providers.tsx`.
- Data that more than one page reads lives in `src/lib`, not in the page.
- Comments explain *why*: the source is commented where a choice is not obvious.
