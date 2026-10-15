# SEO and Open Graph checklist

Live site: https://www.rezaattar.dev. Tick items as they're done; re-run the "After every deploy" checks when pages change.

## Crawling and indexing

- [x] `robots.txt` (`src/app/robots.ts`): everything allowed, AI crawlers included; points to the sitemap
- [x] `sitemap.xml` (`src/app/sitemap.ts`): 5 pages + every case study, `lastModified` = build date
- [x] Canonical URL on every page (`src/lib/metadata.ts`)
- [x] `rezaattar.dev` permanently redirects (308) to `https://www.rezaattar.dev`
- [x] 404 page is `noindex` and links back to the home page and the work
- [x] Leftover `/test` page removed
- [x] Google Search Console verified
- [x] Sitemap submitted in Search Console: `https://www.rezaattar.dev/sitemap.xml`
- [ ] Bing Webmaster Tools (import the site from Search Console)

## Content and metadata

- [x] Home title: "Reza Attar · Full-stack engineer, from schema to interface"
- [x] Own description on About, Works, Contact, Resume and each case study
- [x] One `<h1>` per page, `lang="en"`, alt text on images
- [x] Robots meta allows large image previews and full snippets
- [x] `theme-color` per light and dark theme

## Structured data (JSON-LD, `src/lib/structured-data.ts`)

- [x] Home: `WebSite` + `Person` (role, company, school, skills, profile links)
- [x] About: `ProfilePage`
- [x] Case studies: `BreadcrumbList` (Home › Works › name)
- [ ] Check each in Google's Rich Results Test after deploy

## AI agents

- [x] `/llms.txt`: summary, pages and case studies, built from `content/resume.md` and the case studies
- [x] `/resume.md`: the resume as Markdown

## Open Graph and social cards

- [x] `og:title`, `og:description`, `og:url`, `og:site_name`, `og:type`, `og:locale` on every page
- [x] Share image `/og`, 1200 × 630, with alt text
- [x] Twitter / X `summary_large_image` card
- [ ] Preview the home page and one case study in LinkedIn Post Inspector, Facebook Sharing Debugger and opengraph.xyz after deploy
- [ ] Own share image per case study (all pages use `/og` today)

## Icons and install

- [x] `favicon.ico`
- [ ] Apple touch icon, SVG favicon and manifest icons: brief handed to design ([Brief: Apple touch icon and web app manifest](https://claude.ai/code/artifact/e5e00750-d8bf-483f-a021-25fe68bcf3cd))
- [ ] `src/app/manifest.ts` once the icons arrive (values are in the brief)

## Off-site

- [ ] Link to the site from LinkedIn, GitHub and Stack Overflow profiles

## After every deploy

- [ ] PageSpeed Insights on the home page and `/works` (mobile): Core Web Vitals in the green
- [ ] `https://www.rezaattar.dev/robots.txt`, `/sitemap.xml` and `/llms.txt` load
- [ ] Search Console: no new coverage errors
