// Site-wide preferences: branding, URLs and wording that only the website uses.
// Career facts (role, company, location, experience, email, the current product) live in
// content/resume.md, the source of truth for the resume; read them from "@/lib/resume".

export const site = {
  name: "Reza Attar",
  pronunciation: "Rezâ",
  // <title> / metadata title for the home page
  title: "Reza Attar Portfolio Website",
  // Production origin, used for canonical URLs, Open Graph and the sitemap
  url: "https://www.rezaattar.dev",
  // One-line positioning, used in page descriptions and the share card
  tagline: "I build products from schema to interface.",

  focus: "TypeScript, NestJS, applied LLMs",

  relocation: {
    // Short form for the "At a glance" row
    short: "open to NL / DE",
    // Appended to "Feel free to reach out … and I'm"
    sentence: "open to relocating to the Netherlands or Germany",
  },

  languages: [
    { name: "English" },
    { name: "German", level: "B1" },
    { name: "Persian" },
  ] as { name: string; level?: string }[],

  // Main pages, in the header and the footer
  nav: [
    { label: "About", href: "/about" },
    { label: "Works", href: "/works" },
    { label: "Contact", href: "/contact" },
    { label: "Resume", href: "/resume" },
  ],

  products: {
    myca: {
      name: "Maica",
      domain: "maica.ir",
      href: "https://maica.ir",
    },
  },
};

export const siteLanguages = site.languages
  .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
  .join(", ");
