---
type: Configuration
title: Site preferences (src/lib/site.ts)
description: Branding, URLs and wording that only the website uses, as opposed to career facts, which live in the resume.
tags: [content, configuration, branding]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: site
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/site.ts
    title: src/lib/site.ts
  - id: utils
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/utils.ts
    title: src/lib/utils.ts
---

# Fields

| Field | Value | Used by |
|-------|-------|---------|
| `name` | Reza Attar | Titles, Open Graph site name, JSON-LD, share image |
| `pronunciation` | Rezâ | About "Who I am" |
| `title` | Reza Attar · Full-stack engineer, from schema to interface | Home `<title>` |
| `url` | `https://www.rezaattar.dev` | `metadataBase`, canonical URLs, sitemap, robots, JSON-LD, llms.txt |
| `tagline` | I build products from schema to interface. | Default description, footer, share image, JSON-LD |
| `focus` | TypeScript, NestJS, applied LLMs | Default description, About "At a glance" |
| `relocation.short` | open to NL / DE | Hero, About "At a glance" |
| `relocation.sentence` | open to relocating to the Netherlands or Germany | About, footer, llms.txt |
| `languages` | English; German (B1); Persian | About "At a glance" (via `siteLanguages`) |
| `nav` | About, Works, Contact, Resume | Desktop header and footer |
| `products.myca` | Maica, `https://maica.ir` | Maica project card |

`siteLanguages` formats `languages` as "English, German (B1), Persian".

# Rule

Career facts (role, company, location, years, email, current product) do not
go here. They come from [`content/resume.md`](/content/resume-source.md),
read through `@/lib/resume`.

# Related helpers in `src/lib/utils.ts`

| Helper | Returns |
|--------|---------|
| `cn(...)` | Merged Tailwind classes (`clsx` + `tailwind-merge`) |
| `generateEmailLink({ to, subject?, body? })` | A `mailto:` URL with encoded subject and body |
| `getLinkedinLink()`, `getGithubLink()` | Profile URLs; keep in step with the resume front matter |
| `getYoutubeLink()`, `getGoodreadsLink()` | Profile URLs that exist only here |
| `slugify(text)` | `"Solution Apps DG GmbH"` → `"solution-apps-dg-gmbh"`, used for `/resume#<company>` |
