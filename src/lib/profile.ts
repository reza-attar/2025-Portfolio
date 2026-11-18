// Who the site is about, as the windows show it. Career facts come from content/resume.md
// (via "./resume") so the status badge stays true when the resume changes.
import { RESUME_PDF_PATH, resume } from "./resume";
import { site } from "./site";

export const profile = {
  name: site.name,
  status: `${resume.role} @ ${resume.company}`,
  location: resume.location,
  timezone: "Asia/Tehran",
  availability: `Open to roles in the Netherlands & Germany · EU remote`,
  // Rendered with the middle part in the accent colour
  headline: ["I build the interface", "and", "the AI pipeline behind it."],
  intro: `Hi, I'm Reza Attar. ${resume.experienceYears} of production TypeScript and JavaScript: Next.js and React on the interface, NestJS, PostgreSQL and RAG behind it. Right now I'm a ${resume.product.role.toLowerCase()} on ${resume.product.name}, an AI support platform at ${resume.company}. I deploy what I build, too.`,
  links: {
    email: resume.email,
    github: resume.links.github,
    linkedin: resume.links.linkedin,
    resumePdf: RESUME_PDF_PATH,
    resumeMd: "/resume.md",
  },
};
