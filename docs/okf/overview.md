---
type: Website
title: rezaattar.dev
description: Portfolio and resume site of Reza Attar, a full-stack engineer, built as a small desktop OS (reza.os) with Next.js 16 and hosted on Vercel.
resource: https://www.rezaattar.dev
tags: [overview, portfolio, nextjs]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: package
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/package.json
    title: package.json
  - id: site
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/site.ts
    title: src/lib/site.ts
  - id: seo-checklist
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/docs/seo-checklist.md
    title: SEO and Open Graph checklist
---

# Purpose

The personal portfolio of Reza Attar, a full-stack engineer. It runs as a small
desktop operating system in the browser, **reza.os**: every page (about,
projects, a single project, résumé, contact) opens as a draggable window on a
desktop, with a taskbar along the top. It shows his work, case studies and
resume, and gives people a way to contact him.

It has three kinds of reader:

1. **People**: hiring managers, recruiters and clients reading the pages.
2. **Search engines**: canonical URLs, Open Graph cards, JSON-LD and a sitemap
   (see [SEO](/seo/index.md)).
3. **AI agents and crawlers**: every crawler is allowed, and `/llms.txt` and
   `/resume.md` are written for them (see [endpoints](/endpoints/index.md)).

# At a glance

| Item | Value |
|------|-------|
| Production URL | `https://www.rezaattar.dev` (the apex domain `rezaattar.dev` redirects there with a 308)[^seo-checklist] |
| Framework | Next.js 16.1.6 (App Router), React 19, TypeScript in strict mode[^package] |
| Shell | [reza.os window manager](/architecture/window-manager.md): Zustand store, one window per app, real URL per window |
| Styling | Plain CSS on custom properties ([tokens](/design/tokens-and-theming.md)); no CSS framework |
| Fonts | IBM Plex Sans and IBM Plex Mono through `next/font/google` |
| Theme | Light and dark (system by default), three wallpapers, saved in `localStorage['reza.os/prefs']` |
| Tests | Vitest (store) and Playwright (`e2e/`) |
| Hosting | Vercel, with Vercel Web Analytics (cookieless, so no consent banner) |
| Package manager | Bun (`bun.lock`) |
| Content | [`content/resume.md`](/content/resume-source.md) plus TypeScript data modules in `src/lib` |
| Repository | `github.com/reza-attar/2025-Portfolio` |

# Site map

| Path | Concept |
|------|---------|
| `/` | `about.md` [window](/pages/windows.md) |
| `/projects` | `~/projects` window |
| `/projects/<slug>` | A project window (six case studies) |
| `/stack` | `stack.sh` window |
| `/resume` | `resume.pdf` window |
| `/contact` | `Contact` window |
| `/trash` | `Trash` window (easter egg) |
| `/about`, `/works`, `/works/<slug>` | 308 redirects to `/`, `/projects`, `/projects/<slug>` |
| any unknown path | [Not found (404)](/pages/not-found.md) |
| `/llms.txt` | [llms.txt](/endpoints/llms-txt.md) |
| `/resume.md` | [Resume as Markdown](/endpoints/resume-md.md) |
| `/og` | [Share image](/endpoints/og-image.md) |
| `/robots.txt` | [robots.txt](/endpoints/robots-txt.md) |
| `/sitemap.xml` | [sitemap.xml](/endpoints/sitemap-xml.md) |
| `/Reza_Attar_Resume.pdf` | Static file built from the resume source ([build pipeline](/architecture/build-pipeline.md)) |

# Key ideas

- **One source of truth for career facts.** Role, company, location, email,
  experience and the current product all come from `content/resume.md`. Pages,
  the PDF, JSON-LD and `/llms.txt` read it. Branding and wording that only the
  site uses live in [site preferences](/content/site-preferences.md).
  The flow is described in [sources of truth](/architecture/data-flow.md).
- **Every window is a URL.** Each route renders its window's full content on
  the server (crawlable, works without JS); after hydration the window
  becomes draggable and the front window keeps the URL in sync.
- **Two modes.** Floating windows from 768 px up; on phones (or by choice) the
  same windows stack in one column.
- **Everything is static.** Every page and endpoint is prerendered at build
  time. Dates shown as "last updated" are build dates.
- **Built to be found.** All crawlers, including AI training crawlers, are
  allowed on purpose (see [robots.txt](/endpoints/robots-txt.md)).

[^package]: package.json
[^seo-checklist]: SEO and Open Graph checklist
