---
type: Reference
title: Tech stack
description: Dependencies, scripts and tooling, with what each one is for.
tags: [architecture, dependencies, tooling]
generated: { by: claude-code, at: 2026-11-17T12:00:00Z }
sources:
  - id: package
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/package.json
    title: package.json
---

# Runtime

| Package | Used for |
|---------|----------|
| `next` 16, `react` / `react-dom` 19 | App Router, static generation, `next/font`, `next/image`, `next/og` |
| `zustand` | The window store and the persisted prefs store |
| `@vercel/analytics` | Cookieless page views (loads after the page; 404s locally, which is expected) |

No CSS framework: styles are plain CSS reading the tokens in `src/styles/tokens.css`.
Fonts are IBM Plex Sans and IBM Plex Mono through `next/font/google`.

# Tooling

| Package | Used for |
|---------|----------|
| `typescript` (strict) | Types |
| `eslint` + `eslint-config-next` (flat config) | Lint, including the React Compiler rules |
| `vitest` | Store unit tests (`vitest.config.mts` runs the resume parser and stubs images) |
| `@playwright/test` | End-to-end tests in `e2e/` |
| `prettier` | Formatting |

# Scripts

| Script | Does |
|--------|------|
| `dev` | Check/rebuild the resume PDF, watch `content/resume.md`, run `next dev` |
| `build` | Fail if the resume PDF is stale (and Chrome is missing), then `next build` |
| `start` | `next start` |
| `lint` | `eslint .` |
| `test` | `vitest run` |
| `test:e2e` | `playwright test` (needs a production build) |
| `resume:pdf` | Rebuild `public/Reza_Attar_Resume.pdf` |
