---
type: Reference
title: Tech stack
description: The site's dependencies, npm scripts and tooling, with what each one is for.
tags: [architecture, dependencies, tooling]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: package
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/package.json
    title: package.json
---

# Runtime dependencies

| Package | Version | Used for |
|---------|---------|----------|
| `next` | 16.1.6 | Framework: App Router, metadata API, `next/font`, `next/image`, `next/og` |
| `react`, `react-dom` | ^19.2.4 | UI |
| `next-themes` | ^0.4.4 | Light and dark theme ([theming](/design/tokens-and-theming.md)) |
| `@vercel/analytics` | ^2.0.1 | Cookieless page-view analytics (`<Analytics />` in the root layout) |
| `tailwind-merge`, `clsx` | ^3.0.1, ^2.1.1 | `cn()` class helper in `src/lib/utils.ts` |
| `class-variance-authority` | ^0.7.1 | Button variants (`buttonVariants`) |
| `tailwindcss-animate` | ^1.0.7 | Tailwind plugin for animations |
| `lucide-react` | ^0.475.0 | Most UI icons |
| `react-icons` | ^5.4.0 | Brand icons (GitHub, LinkedIn) and the mobile navbar icons |

# Development dependencies

| Package | Used for |
|---------|----------|
| `typescript` ^5, `@types/*` | Type checking (`strict`, `noUnusedLocals`) |
| `tailwindcss` ^3.4.1, `postcss` ^8 | Styling |
| `@svgr/webpack` ^8.1.0 | Imports `.svg` files as React components |
| `eslint` ^9, `eslint-config-next` 16.1.6, `@eslint/eslintrc` | Linting (`next/core-web-vitals`, `next/typescript`) |
| `prettier` ^3.4.2, `prettier-plugin-tailwindcss` | Formatting: 2 spaces, Tailwind classes sorted |

# Scripts

| Script | Runs | What it does |
|--------|------|--------------|
| `dev` | `node scripts/resume/pdf.mjs dev` | Checks the resume PDF, rebuilds it on each save of `content/resume.md`, and starts `next dev` |
| `build` | `node scripts/resume/pdf.mjs check && next build` | Fails if the resume PDF is out of date and Chrome is not available, then builds |
| `resume:pdf` | `node scripts/resume/pdf.mjs build` | Rebuilds `public/Reza_Attar_Resume.pdf` once |
| `start` | `next start` | Serves the production build |
| `lint` | `next lint` | Broken on Next.js 16 (see [known issues](/architecture/known-issues.md)) |

Details are in the [build pipeline](/architecture/build-pipeline.md).

# Other tooling

- **Package manager**: Bun (`bun.lock`; commit "added bun as main package manager").
  The README and script messages still mention `pnpm`. Both work, because the
  scripts are plain Node.
- **Agent skills**: `.claude/skills/` (`frontend-design`, `next-upgrade`) and
  `.cursor/skills/next-upgrade`, pinned in `skills-lock.json`.
- **shadcn/ui**: `components.json` configures the generator (aliases `@/components`,
  `@/lib/utils`, `@/components/ui`; icon library `lucide`).
