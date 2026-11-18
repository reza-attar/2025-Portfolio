---
type: Playbook
title: Add an open-source contribution
description: Record a merged contribution so /llms.txt lists it.
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

2. `/llms.txt` gains an "Open source" section. (No window shows contributions
   yet; reza.os has no open-source window.)

Only list merged work, linked to the PR, issue or commit itself.
