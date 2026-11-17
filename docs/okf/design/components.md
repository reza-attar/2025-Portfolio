---
type: Reference
title: Components
description: A catalogue of the components in src/components, what each one does and where it is used.
tags: [design, components, react]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: components
    resource: https://github.com/reza-attar/2025-Portfolio/tree/main/src/components
    title: src/components/
---

"Client" marks client components (`"use client"`). Everything else renders on
the server.

# Site frame

| Component | File | Notes |
|-----------|------|-------|
| `Header` | `components/Header.tsx` | Mobile: logo, current path, theme switch. Desktop (`xl`): `site.nav` links centred, "Get in touch" on the right. Hidden in print. |
| `HeaderShell` (client) | `components/HeaderShell.tsx` | Desktop behaviour: clear over the hero, solid after 8 px of scroll, hidden while scrolling down past 160 px, shown on scroll up or keyboard focus. Ignores moves under 6 px. |
| `HeaderNav` (client) | `components/HeaderNav.tsx` | Desktop links; `/works/<slug>` still marks Works as active. |
| `CurrentPath` (client) | `components/HeaderNav.tsx` | Shell-style path next to the logo (`~`, `~/works/ticket-yar`) with a blinking caret. Decorative, hidden from screen readers. |
| `Navbar` (client) | `components/ui/Navbar.tsx` | Mobile bottom bar below `xl`: Home, About, Works, Contact, Resume with filled/outline icons. Its own link list (see [data flow](/architecture/data-flow.md)). |
| `Footer` | `components/Footer.tsx` | Logo, tagline, location, email; "pages" from `site.nav`; "elsewhere" (LinkedIn, GitHub, YouTube, Stack Overflow); build date. |
| `Logo` | `components/Logo.tsx` | The `[ra]` mark in `currentColor`, linking home. Each instance gets its own clip-path id. |
| `ThemeSwitch` (client) | `components/ThemeSwitch.tsx` | Light/dark toggle. |
| `JsonLd` | `components/JsonLd.tsx` | Writes a `<script type="application/ld+json">`, escaping `<`. |
| `ScrollToHash` (client) | `components/ScrollToHash.tsx` | Scrolls to the URL fragment after the page mounts. Used on `/resume`. |

# Visuals

| Component | File | Notes |
|-----------|------|-------|
| `SystemDiagram` | `components/SystemDiagram.tsx` | Hero diagram: the four layers top to bottom, with a dot ("request") travelling down and each node pinging as it passes. |
| `HeroOrbs` | `components/HeroOrbs.tsx` | Soft circles in the layer colours, drifting, and two slow oval orbits behind the hero. |
| `Signature` | `components/about/Signature.tsx` | Handwritten signature on About; light and dark images. |

# UI pieces (`components/ui`)

| Component | Notes |
|-----------|-------|
| `Button`, `buttonVariants` | `cva` variants `primary` (dark gradient in light mode, near-white in dark), `secondary` (`control` tokens), `text`. Links use `buttonVariants()` for the same look. |
| `Card` | Project card: logo, title, meta, description, `LayerStrip`, "Read case study" and "Visit Site" (or `note`), then a screenshot or a `steps` path. See [projects](/content/projects.md). |
| `LayerStrip` | Four segments, data → interface, with the layers a project touched coloured in. |
| `SectionHeading` | `// 03 kicker`, an H2 title and an optional description. |
| `Tag` (default export `Label`) | A chip, used for stacks and skills. |
| `Widget`, `ProjectPlaceholder`, `LetsWorkTogether` | Image tiles on the home page, the "your project here" card on `/works`, and the closing call to action on the home page. |
| `Divider` | A horizontal rule. |
| `Link` (`CustomLink`) | A thin wrapper around `next/link`. |
