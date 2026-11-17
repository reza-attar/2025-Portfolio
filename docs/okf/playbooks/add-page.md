---
type: Playbook
title: Add a page
description: Create a new route and register it in every list that names pages (navigation, sitemap and llms.txt).
tags: [playbook, routing, pages]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: site
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/site.ts
    title: src/lib/site.ts
  - id: navbar
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/components/ui/Navbar.tsx
    title: src/components/ui/Navbar.tsx
---

# Steps

1. Create `src/app/<route>/page.tsx` as a server component. Follow the shape
   of the existing pages:

   ```tsx
   import { pageMetadata } from "@/lib/metadata";
   import { site } from "@/lib/site";
   import type { Metadata } from "next";

   export const metadata: Metadata = pageMetadata({
     title: `Talks · ${site.name}`,
     description: "…one sentence for this page…",
     path: "/talks",
   });

   export default function TalksPage() {
     return (
       <main className="mt-20 flex w-full max-w-screen-lg flex-col gap-16 px-4">
         <h1 className="text-48 font-bold leading-[1.1] text-ink-strong xl:text-80">Talks</h1>
         …
       </main>
     );
   }
   ```

   One H1, design tokens from [tokens and theming](/design/tokens-and-theming.md),
   accessibility from [accessibility](/design/accessibility.md).
2. **Navigation** (if it should be in the menu):
   - `site.nav` in `src/lib/site.ts` (desktop header and footer);
   - `items` in `src/components/ui/Navbar.tsx` (mobile bottom bar), with a
     filled and an outline icon. The bar is 358 px wide, so check that it still
     fits.
3. **Sitemap**: add the path to `paths` in `src/app/sitemap.ts`.
4. **llms.txt**: add a line to the "Pages" list in `src/app/llms.txt/route.ts`.
5. **Structured data** (optional): add a builder to
   `src/lib/structured-data.ts` and render `<JsonLd data={…} />`.
6. **Print**: if the page should not print its chrome, the layout already
   hides header, footer and navbar.
7. Check the page in both themes, on a phone width (320 px, no horizontal
   scroll), and with the keyboard.
