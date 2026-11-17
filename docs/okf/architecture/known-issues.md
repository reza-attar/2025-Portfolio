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

Found on `main` at commit `cb3cb56`. Remove an entry when it is fixed and add a
line to [the log](/log.md).

# Bugs

| Issue | Where | Fix |
|-------|-------|-----|
| `npm run lint` fails: Next.js 16 removed `next lint`.[^next16-eslint] | `package.json` | Change the script to `eslint .` |
| `bg-win` is not a defined colour, so the contact window has no background class | `src/app/contact/page.tsx` | Use a defined token (e.g. `bg-panel`) or add `win` to `tailwind.config.ts` |
| `border-field-border` is not a defined colour; the textarea border falls back to the default border colour | `src/app/contact/form.tsx` | Use `border-field-line` |
| The "Let's work together" block hard-codes `// 06 next request`, but the home sections it follows are numbered up to 07 (08 when Open source is shown) | `LetsWorkTogether` in `src/components/ui/Widget.tsx` | Pass the index from `src/app/(Home)/page.tsx` like the other sections |
| A case study that is not listed in `projects` or `moreCaseStudies` still gets a static path and a sitemap entry, but its page calls `notFound()` | `src/app/works/[slug]/page.tsx` | Always add a card when adding a case study ([playbook](/playbooks/add-case-study.md)) |

# Documentation drift

| Issue | Where |
|-------|-------|
| The README is mostly the `create-next-app` template. It says to edit `app/page.tsx` and mentions Geist, which the site does not use | `README.md` |
| The README and `pdf.mjs` messages say `pnpm`; the project uses Bun | `README.md`, `scripts/resume/pdf.mjs` |

# Open items from the SEO checklist

- Own share image per case study (every page uses `/og`).
- Apple touch icon, SVG favicon and `src/app/manifest.ts`.
- Bing Webmaster Tools.

See `docs/seo-checklist.md` for the full list.

# Dead code

- `AudioBook` export in `src/components/ui/Tag.tsx`, and the commented-out
  "Tech Stack" and "Notebook" widgets in `GetToKnowMe.tsx`.
- The `link` field on `MoreCaseStudy` (`src/lib/projects.ts`) is rendered only
  when `href` is also set; no entry sets either.
- The `@icons/*` alias is defined but unused.

[^next16-eslint]: Next.js ESLint docs (next lint removed in v16)
