---
type: Playbook
title: Edit the resume
description: Change career facts in content/resume.md, regenerate the PDF, and update the values copied elsewhere.
tags: [playbook, resume, content]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: readme
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/README.md
    title: README.md (Resume section)
---

# Steps

1. Edit `content/resume.md`, following [its format](/content/resume-source.md).
   With `bun run dev` running, the page reloads and the PDF rebuilds on save.
   A format error shows the line number.
2. Without the dev server, run `bun run resume:pdf`.
3. Check `/resume`, `/about` and the home page.
4. If you changed a number or a link that is also written in code, update the
   copy (full list in [sources of truth](/architecture/data-flow.md)):
   - highlight numbers → `src/lib/highlights.ts`
   - layer metrics → `src/lib/layers.ts`
   - LinkedIn or GitHub URL → `src/lib/utils.ts`
   - languages → `site.languages` in `src/lib/site.ts`
   - facts in the About story → `src/app/about/page.tsx`
   - a renamed company → any `/resume#<slug>` link (highlights, layers)
5. Commit `content/resume.md`, `public/Reza_Attar_Resume.pdf` and
   `content/resume.pdf.sha256` together.

# Why step 5 matters

The production build runs `pdf.mjs check`. If the hash does not match and the
build machine has no Chrome (Vercel does not), the build fails. See
[build pipeline](/architecture/build-pipeline.md).

# Changing the parser or PDF layout

Editing `scripts/resume/parse.cjs` or `pdf.mjs` also changes the hash: rebuild
and commit the PDF. Adding a resume section means updating `SECTIONS` in the
parser, the `ResumeSection` and `ResumeData` types, the `/resume` page and the
PDF template.
