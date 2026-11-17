---
type: Playbook
title: Deploy
description: How the site deploys on Vercel, what can fail the build, and the checks to run after a deploy.
tags: [playbook, deploy, vercel]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: checklist
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/docs/seo-checklist.md
    title: docs/seo-checklist.md
---

# How it deploys

The site is hosted on Vercel. Work is merged to `main` through pull requests;
Vercel builds with the `build` script.

# What can fail the build

| Failure | Cause | Fix |
|---------|-------|-----|
| `resume: public/Reza_Attar_Resume.pdf is out of date …` | `content/resume.md`, `parse.cjs` or `pdf.mjs` changed without a rebuilt PDF | Run `bun run resume:pdf` locally and commit the PDF and `content/resume.pdf.sha256` |
| `content/resume.md:<line>: …` | Resume format error | Fix the line ([format](/content/resume-source.md)) |
| Type errors | `strict` and `noUnusedLocals` | Fix, or remove the unused code |

# Settings

- Domain: `www.rezaattar.dev` is primary; `rezaattar.dev` redirects with a 308.
- Environment: `GOOGLE_SITE_VERIFICATION` (Search Console token).
- Vercel Web Analytics is enabled in code (`<Analytics />`); it is cookieless.

# After a deploy

From `docs/seo-checklist.md`:

1. `https://www.rezaattar.dev/robots.txt`, `/sitemap.xml` and `/llms.txt` load.
2. PageSpeed Insights on `/` and `/works` (mobile): Core Web Vitals green.
3. Search Console: no new coverage errors.
4. When metadata or JSON-LD changed: Rich Results Test, and a share preview
   (LinkedIn Post Inspector, Facebook Sharing Debugger, opengraph.xyz).
