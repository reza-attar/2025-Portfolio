---
type: Reference
title: reza.os window manager
description: How the desktop-OS shell works - the store, windows, routing, simple mode, focus management and tests.
tags: [architecture, os, windows, zustand]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: store
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/os/store/wm-store.ts
    title: src/features/os/store/wm-store.ts
  - id: shell
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/os/components/Shell.tsx
    title: src/features/os/components/Shell.tsx
---

The site runs as a small desktop OS. Every page opens as a draggable window on a
desktop, with a taskbar on top. The shell is a client component tree mounted
once in `src/app/layout.tsx`, so navigation never remounts it.

# Pieces

| Piece | File | Job |
|-------|------|-----|
| App registry (metadata) | `src/features/os/app-meta.ts` | Title, route, accent dot and default size per window; desktop icons |
| App registry (components) | `src/features/os/apps.tsx` | The component each window renders. Only `Window` and `StaticWindow` import it |
| Window store | `src/features/os/store/wm-store.ts` | Every window's geometry, z-order, open order, minimized/maximized/snapped state. One action per user action[^store] |
| Prefs store | `src/features/os/store/prefs-store.ts` | Theme, wallpaper and mode in `localStorage['reza.os/prefs']` |
| Focus helpers | `src/features/os/open-app.ts` | `openApp`/`closeApp`: focus the title on keyboard open, return focus to the opener on close |
| Shell | `src/features/os/components/Shell.tsx` | Taskbar + desktop + live region; shortcuts; prefs on `<html>`; URL sync[^shell] |
| Window | `src/features/os/components/Window.tsx` + `hooks/useWindowDrag.ts` | Frame, controls, drag/resize/snap |

# Behaviour

- **Open**: `open(id)` focuses an existing window (restoring it if minimized)
  or creates it at the app's default size, cascaded from (150, 24) in 34/30 px
  steps, wrapping after six. When the desktop size is known the size shrinks
  to fit (never below 300 x 180).
- **Drag**: the title bar, with pointer capture. Positions are written as a
  `transform` while the pointer moves and committed once on `pointerup`.
  A press only counts as a drag after 3 px, so clicking a snapped window's
  title never un-snaps it. Clamped so the title bar stays reachable.
- **Snap**: within 16 px of the left/right edge (half the desktop) or 8 px of
  the top (maximize), with a dashed preview. Dragging a snapped window away
  restores its old size under the pointer.
- **Resize** from the bottom-right handle, minimum 300 x 180.
- **Tray**: one button per open window. Front window → minimize, minimized →
  restore, back window → focus.
- **Shortcuts**: ⇧W close, ⇧X close all, ⇧←/→ snap, ⇧↑/↓ maximize/restore,
  `\` theme, `|` wallpaper. Ignored while typing.

# Routing

Each window has a real, statically generated route. The page renders
`<RouteWindow id>`:

1. On the server (and before hydration) it renders `StaticWindow`: the app's
   real content in a window frame at the spot the live window will open, so
   crawlers and no-JS visitors get the content and hydration moves nothing.
2. After hydration it opens the window (plus `about.md` behind it on a first
   visit, except in simple mode) and renders nothing.

The front window owns the URL: `Shell` calls `history.replaceState` when the
front window changes (replace, so Back doesn't walk through focus). Links
inside windows are real `<a href>`s that open the window in place; taskbar
links are `next/link`s that also open the window on click.

Old routes redirect permanently (`next.config.ts`): `/about` → `/`,
`/works` → `/projects`, `/works/<slug>` → `/projects/<slug>`.

# Modes

| Mode | When | What renders |
|------|------|--------------|
| `os` | Viewport ≥ 768 px and the visitor has not opted out | Floating windows |
| `simple` | Viewport < 768 px, or System menu → Simple mode | The same windows stacked in one column; only the close button; 44 px targets |

The no-flash script in `layout.tsx` sets `data-theme`, `data-wall` and
`data-mode` on `<html>` before paint; CSS keys off those attributes, so the
server HTML is laid out correctly on phones and in dark mode.

# Tests

- `bun run test`: Vitest unit tests for the store (`wm-store.test.ts`).
- `bun run build && bun run test:e2e`: Playwright tests against the
  production build (`e2e/`): drag, snap, resize, maximize, tray, shortcuts,
  routing, URL sync, persistence, keyboard focus, live region, reduced motion
  and the phone layout.

[^store]: src/features/os/store/wm-store.ts
[^shell]: src/features/os/components/Shell.tsx
