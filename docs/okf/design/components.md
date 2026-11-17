---
type: Reference
title: Components
description: The OS shell parts and content primitives, what each does and where it lives.
tags: [design, components]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: os
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/features/os/components
    title: src/features/os/components
  - id: ui
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/shared/components/ui
    title: src/shared/components/ui
---

Every interactive component is a real `<button>` or `<a href>`.

# OS shell (`src/features/os/components`)

| Component | Does |
|-----------|------|
| `Shell` | Taskbar + desktop + live region; shortcuts, prefs on `<html>`, URL sync, skip link |
| `Taskbar` | Logo/system menu, apps menu (simple mode), nav links, tray, wallpaper and theme buttons, clock, "Hire me" |
| `SystemMenu` + `Menu` | Popover with `role="menu"`, arrow keys, Esc, outside click: About, Open everything, Close all, Tidy up, Simple mode |
| `WindowTray` | One button per open window, in open order; `aria-pressed` on the front one, 60 % opacity when minimized |
| `Desktop` / `DesktopIcon` | Wallpaper, icon column (a wrapping grid in simple mode), windows, snap preview, empty-desktop card |
| `Window` / `WindowTitleBar` | Frame, dot + mono title (`h2`, focusable), — □ ×, resize handle |
| `RouteWindow` / `StaticWindow` | Opens the route's window; server-renders it until hydration |
| `SnapPreview`, `EmptyDesktop`, `Clock`, `LiveRegion`, `AppLink` | As named; `AppLink`/`appLinkClick` make real links open windows in place |

# Content primitives (`src/shared/components/ui`)

| Component | Rules |
|-----------|-------|
| `Button` | `primary` (orange) / `secondary` / `dark`, `md` 40 px or `lg` 46 px, offset shadow that lifts on hover. `<a>` when `href` is set. One primary per window |
| `IconButton` | Icon-only; `label` is the accessible name. `danger` turns orange on hover |
| `Chip`, `StatusBadge`, `Tile` | Mono pill; pill with a status dot; pastel square holding a stroke icon |
| `ProjectCard` | Whole card is a link |
| `FileTable` | Mono uppercase headers, 1 px rules, yellow row hover |
| `Terminal` | Dark block, `$` prompt, coloured keys, blinking cursor |
| `Callout` | Pale-yellow panel with a mono label chip |
| `CommitLog` | History as `feat(scope): …` commits on a vertical rule |
| `Icon` | Inline stroke SVGs on a 24 px grid; no emoji, no icon font |
