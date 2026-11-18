---
type: Reference
title: Project structure
description: What lives where in the repository, and the TypeScript import aliases.
tags: [architecture, folders]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: tsconfig
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/tsconfig.json
    title: tsconfig.json
---

| Path | Contents |
|------|----------|
| `src/app/` | Routing only: `layout.tsx`, one `page.tsx` per window route (each renders `<RouteWindow>`), `not-found.tsx`, and the endpoints (`og`, `llms.txt`, `resume.md`, `robots.ts`, `sitemap.ts`) |
| `src/features/os/` | The desktop shell: stores, app registry, shell components, hooks ([window manager](/architecture/window-manager.md)) |
| `src/features/apps/<app>/` | One folder per window body: `about`, `projects`, `project`, `stack`, `resume`, `contact`, `trash` |
| `src/shared/components/` | Content primitives (`ui/`: Button, IconButton, Chip, StatusBadge, Tile, ProjectCard, FileTable, Terminal, Callout, CommitLog, Icon) and `JsonLd` |
| `src/lib/` | Content and site data: `resume.ts` (from `content/resume.md`), `profile.ts`, `projects.ts`, `case-studies.ts`, `site.ts`, `metadata.ts`, `structured-data.ts`, and data used by the endpoints |
| `src/styles/` | Plain CSS: `tokens.css` (all colours), `base.css`, `os.css`, `window.css`, `ui.css`, `apps.css`, `simple.css` |
| `content/resume.md` | The resume, source of truth for career facts |
| `e2e/` | Playwright tests |
| `scripts/resume/` | The resume parser (a webpack/Turbopack loader) and the PDF builder |
| `public/` | Static files, including `Reza_Attar_Resume.pdf` and case-study images |

# Aliases

| Alias | Points to |
|-------|-----------|
| `@/*` | `src/*` |
| `@public/*` | `public/*` (static image imports) |
