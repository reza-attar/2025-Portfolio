// Personal and site-wide preferences.
// Edit here: the pages, the resume data, page metadata and the footer read from this file.
// After changing anything that appears on /resume, regenerate public/Reza_Attar_Resume.pdf (see README).

export const site = {
  name: "Reza Attar",
  pronunciation: "Rezâ",
  // <title> / metadata title for the home page
  title: "Reza Attar Portfolio Website",

  role: "Senior Engineer",
  company: "Dotin",
  country: "Iran",
  experience: "11 years",
  focus: "TypeScript, NestJS, applied LLMs",
  email: "attarzadeh76@gmail.com",

  relocation: {
    // Short form for the "At a glance" row
    short: "open to NL / DE",
    // Appended to "Feel free to reach out … and I'm"
    sentence: "open to relocating to the Netherlands or Germany",
    // Resume header line
    availability: "Open to relocation to the Netherlands or Germany",
  },
  workAuthorization: "Eligible for EU Blue Card · Open to EU-remote",

  languages: [
    { name: "English" },
    { name: "German", level: "B1" },
    { name: "Persian" },
  ] as { name: string; level?: string }[],

  products: {
    myca: {
      name: "Myca",
      domain: "myca.mora-ed.com",
      href: "https://myca.mora-ed.com",
    },
  },
};

export const siteLanguages = site.languages
  .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
  .join(", ");
