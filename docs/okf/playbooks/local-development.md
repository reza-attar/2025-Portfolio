---
type: Playbook
title: Local development
description: Install dependencies, run the dev server with live resume PDF rebuilds, build, and lint.
tags: [playbook, setup, development]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: package
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/package.json
    title: package.json
---

# Prerequisites

- Node.js 20 or newer (Next.js 16 needs 20.9+).
- Bun (the lockfile is `bun.lock`). npm or pnpm also work with the same scripts.
- Google Chrome or Chromium, only to rebuild the resume PDF. Set `CHROME_PATH`
  if it is not in a standard place.

# Steps

1. `bun install`
2. `bun run dev`. This checks the resume PDF, watches `content/resume.md`,
   and starts `next dev` on http://localhost:3000. Without Chrome you get a
   warning and the PDF is not rebuilt.
3. Build like production: `bun run build`, then `bun run start`.
4. Lint: `npx eslint .` (the `lint` script uses the removed `next lint`; see
   [known issues](/architecture/known-issues.md)).

# Environment variables

| Name | Needed for |
|------|------------|
| `CHROME_PATH` | Optional. Path to Chrome for the PDF build |
| `GOOGLE_SITE_VERIFICATION` | Optional. Search Console token, production only |

There is no `.env` file in the repository (`.env*` is git-ignored).
