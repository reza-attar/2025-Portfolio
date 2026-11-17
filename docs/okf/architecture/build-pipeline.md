---
type: Reference
title: Build pipeline
description: The custom SVG and Markdown loaders, the resume PDF build and staleness check, static generation, and linting.
tags: [architecture, build, resume, pdf]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: next-config
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/next.config.ts
    title: next.config.ts
  - id: pdf
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/scripts/resume/pdf.mjs
    title: scripts/resume/pdf.mjs
  - id: parse
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/scripts/resume/parse.cjs
    title: scripts/resume/parse.cjs
---

# Custom loaders

`next.config.ts` registers two loaders, once for Turbopack (the default for
`next dev` and `next build` in Next.js 16) and once for webpack (used only with
`next build --webpack`):

| Files | Loader | Result of `import x from "file"` |
|-------|--------|-----------------------------------|
| `*.svg` | `@svgr/webpack` | A React component (`FC<SVGProps<SVGElement>>`) |
| `*.md` | `scripts/resume/parse.cjs` | The parsed resume data (`ResumeData`) |

`svgr.d.ts` declares the types for both. The Markdown loader is meant only for
`content/resume.md`: any `.md` import goes through the resume parser.

# Resume PDF

`public/Reza_Attar_Resume.pdf` is generated from `content/resume.md` and
committed with `content/resume.pdf.sha256`.

**How it is built** (`scripts/resume/pdf.mjs`):

1. Parse `content/resume.md` with the same parser the site uses.
2. Render a self-contained A4 HTML page (Inter from Google Fonts, 13 mm × 15 mm
   margins), in the same order as the `/resume` page.
3. Print it with headless Chrome (`--print-to-pdf`, 10-second virtual time
   budget so the web font loads).
4. Copy the PDF to `public/` and write the hash.

**The hash** is SHA-256 over `content/resume.md`, `parse.cjs` and `pdf.mjs`.
A change to any of them makes the PDF out of date, even on a machine without
Chrome, such as the Vercel build.

**Commands:**

| Command | Behaviour |
|---------|-----------|
| `pdf.mjs build` (`resume:pdf`) | Builds now. Exits 1 if Chrome is not found. |
| `pdf.mjs check` (part of `build`) | Up to date: does nothing. Out of date and Chrome found: rebuilds. Out of date and no Chrome: exits 1 with instructions. |
| `pdf.mjs dev [args]` (`dev`) | Runs `check` (a warning only), watches the `content/` folder and rebuilds 300 ms after each save of `resume.md`, then runs `next dev [args]`. |

**Finding Chrome:** `CHROME_PATH`, then the usual macOS and Windows install
paths, then `google-chrome`, `google-chrome-stable`, `chromium` or
`chromium-browser` on `PATH`.

Visitors can also print `/resume` from the browser. Print styles in
`globals.css` hide the site chrome (see [Resume page](/pages/resume.md)).

# Parser errors

The parser rejects anything it does not recognise, with the file and line:

```
content/resume.md:54: "NUWA" needs a "Role · Period · Location" line under its heading
```

A typo stops `next dev` and `next build` instead of silently dropping content.
The format is in [Resume source](/content/resume-source.md).

# Static generation

- Every page is a server component with no request-time data, so all pages are
  prerendered.
- Case-study pages use `generateStaticParams()` with `dynamicParams = false`.
  An unknown slug is a 404.
- `/llms.txt`, `/resume.md` and `/og` set `dynamic = "force-static"`.
- The footer's "last updated" date and the sitemap's `lastModified` are the
  build time (`new Date()` at module level).

# Linting and formatting

- ESLint flat config (`eslint.config.mjs`) extends `next/core-web-vitals` and
  `next/typescript` through `FlatCompat`.
- The `lint` script calls `next lint`, which Next.js 16 removed. Run
  `npx eslint .` until the script is updated (see [known issues](/architecture/known-issues.md)).
- Prettier: 2-space indent, `prettier-plugin-tailwindcss` sorts class names.
- TypeScript: `strict`, `noUnusedLocals`, `moduleResolution: bundler`.
