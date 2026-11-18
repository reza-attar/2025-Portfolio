---
type: Reference
title: Known issues
description: Small bugs, stale copy and documentation drift found while writing this bundle, each with the file to change.
tags: [architecture, issues, maintenance]
status: stable
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
stale_after: 2027-05-17T00:00:00Z
sources:
  - id: next16-eslint
    resource: https://nextjs.org/docs/app/api-reference/config/eslint
    title: Next.js ESLint docs (next lint removed in v16)
---

Updated for reza.os (the desktop-OS rewrite). Remove an entry when it is fixed and add a
line to [the log](/log.md).

# Bugs

None known. Fixed with reza.os: the `lint` script (now `eslint .`), and the
Tailwind class bugs on the old contact page and home page (those pages are gone).

# Documentation drift

| Issue | Where |
|-------|-------|
| `pdf.mjs` messages say `pnpm`; the project uses Bun | `scripts/resume/pdf.mjs` |

# Open items from the SEO checklist

- Own share image per case study (every page uses `/og`).
- Apple touch icon, SVG favicon and `src/app/manifest.ts`.
- Bing Webmaster Tools.

See `docs/seo-checklist.md` for the full list.

# Dead code

- `src/lib/layers.ts` keeps `summary`, `stack`, `metric` and `source`; only
  `/og` reads the layers now.
- `site.languages`, `site.products` and `site.pronunciation` in `src/lib/site.ts`
  are unused since the old About and home pages were removed.
- Images under `public/` that only the old pages used: `Widgets/`,
  `Hand Arrow/`, `Contact Window/`, `icons/`, `Signature/`, `Gradient.webp`.
  (`portrait.jpg` is still used by the JSON-LD.)

[^next16-eslint]: Next.js ESLint docs (next lint removed in v16)
