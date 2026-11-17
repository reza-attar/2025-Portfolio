---
type: Playbook
title: Add an open-source contribution
description: Record a merged contribution so the home page and /llms.txt show the open-source section.
tags: [playbook, open-source]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/open-source.ts
    title: src/lib/open-source.ts
---

1. Add an entry at the **top** of `contributions` in `src/lib/open-source.ts`:

   ```ts
   {
     project: "vercel/next.js",
     href: "https://github.com/vercel/next.js/pull/12345",
     title: "Fix typo in App Router caching docs",
     kind: "docs",          // fix | feature | docs | tests | maintenance
     date: "2026-09",       // YYYY-MM
   },
   ```

2. Run the site. The home page now shows "Contributions so far" between
   "Selected work" and "Experience", and the later section numbers move up by
   one. Check that the hard-coded number on the closing "Let's work together"
   block still makes sense ([known issues](/architecture/known-issues.md)).
3. `/llms.txt` gains an "Open source" section.

Only list merged work, linked to the PR, issue or commit itself.
