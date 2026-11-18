# reza.os

The portfolio of Reza Attar, running as a small desktop OS in the browser. Every page
(about, projects, a project, résumé, contact) opens as a draggable window on a desktop,
and every window is also a real, statically rendered URL.

Next.js 16 (App Router), React 19, TypeScript, Zustand, plain CSS. Hosted on Vercel.

## Develop

```bash
bun install
bun run dev        # http://localhost:3000 (also rebuilds the resume PDF on save)
bun run lint
bun run test       # store unit tests (Vitest)
bun run build
bun run test:e2e   # Playwright against the production build (port 3100)
```

## Where things live

- `src/app/` - routes only; each page renders `<RouteWindow id="…" />`
- `src/features/os/` - the window manager: store, shell, taskbar, windows
- `src/features/apps/` - what each window shows
- `src/shared/components/ui/` - buttons, chips, tiles, terminal, tables
- `src/lib/` - content: resume, projects, case studies, site data
- `src/styles/` - design tokens and CSS

## Resume

Edit `content/resume.md`. The site reads it; `bun run dev` rebuilds `public/Reza_Attar_Resume.pdf`
on save, `bun run resume:pdf` rebuilds it once, and `bun run build` fails if the PDF is stale and
Chrome isn't available. Commit the PDF and `content/resume.pdf.sha256` with it.

## Documentation

Project documentation lives in [`docs/okf/`](docs/okf/index.md), an
[Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
(OKF v0.2) bundle. Start at [`docs/okf/overview.md`](docs/okf/overview.md); the shell is described
in [`docs/okf/architecture/window-manager.md`](docs/okf/architecture/window-manager.md).
