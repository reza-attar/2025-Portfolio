---
type: Playbook
title: Add a window
description: A new app with its own window, route, desktop icon and menu entry.
tags: [playbook, windows, routing]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: meta
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/os/app-meta.ts
    title: src/features/os/app-meta.ts
---

The spec keeps the app list short on purpose; add a window only for real content.

1. Create the body in `src/features/apps/<name>/<Name>App.tsx`. Use the
   primitives in `src/shared/components/ui`; one primary (orange) button per
   window at most.
2. Add the id to `BaseAppId` and an entry to `base` in
   `src/features/os/app-meta.ts` (file-like `title`, `href`, `dot`, `w`, `h`).
   Add a `DESKTOP_ICONS` entry if it should have an icon.
3. Map the id to the component in `src/features/os/apps.tsx` (use
   `next/dynamic` for heavy bodies).
4. Add `src/app/<route>/page.tsx` that exports `metadata` (via
   `pageMetadata`) and renders `<RouteWindow id="<name>" />`.
5. Add the route to `src/app/sitemap.ts` and `src/app/llms.txt/route.ts`.
6. Run `bun run test` and the e2e suite; "Open everything" now opens one more window.
