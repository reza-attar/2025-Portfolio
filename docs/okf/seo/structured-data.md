---
type: Reference
title: Structured data
description: The schema.org JSON-LD graphs on the home page, About page and case studies, and which facts feed them.
tags: [seo, json-ld, schema-org]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/structured-data.ts
    title: src/lib/structured-data.ts
---

Built in `src/lib/structured-data.ts` and written to the page with
[`<JsonLd data={…} />`](/design/components.md).

| Page | Function | Types |
|------|----------|-------|
| `/` | `websiteGraph()` | `WebSite` (`#website`, publisher → person) and `Person` |
| `/about` | `profilePage()` | `ProfilePage` with `mainEntity: Person` |
| `/works/<slug>` | `breadcrumbs([...])` | `BreadcrumbList`: Home › Works › name |

# Person

`@id` is `https://www.rezaattar.dev/#person`, so every graph refers to the same
person.

| Property | Source |
|----------|--------|
| `name`, `url`, `description` | `site.name`, `site.url`, `site.tagline` |
| `image` | `<site.url>/portrait.jpg` |
| `jobTitle`, `worksFor` | `resume.role`, `resume.company` |
| `address.addressCountry` | `resume.location` |
| `email` | `mailto:<resume.email>` |
| `alumniOf` | Each `resume.education[].school` |
| `knowsAbout` | Every item in every `resume.skills` group |
| `sameAs` | LinkedIn, GitHub, YouTube (`utils.ts`), Stack Overflow (resume) |

Check the output in Google's Rich Results Test after a deploy that changes it.
