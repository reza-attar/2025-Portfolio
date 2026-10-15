// The resume data, read from content/resume.md (the source of truth: edit that file, not this one).
// /resume, the About page and the home page read from here; public/Reza_Attar_Resume.pdf is
// generated from the same file (see README).
import data from "../../content/resume.md";

export const RESUME_PDF_PATH = "/Reza_Attar_Resume.pdf";

export type ResumeLink = { label: string; href: string };

export type ExperienceGroup = {
  heading?: string;
  bullets: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  groups: ExperienceGroup[];
};

export type Project = {
  name: string;
  link?: ResumeLink;
  description: string;
  stack?: string;
};

export type ProjectGroup = {
  heading: string;
  items: Project[];
};

// Section keys double as the /resume#anchor for each section
export type ResumeSection =
  | "summary"
  | "experience"
  | "projects"
  | "skills"
  | "awards"
  | "education"
  | "languages";

export type ResumeData = {
  name: string;
  title: string;
  role: string;
  company: string;
  location: string;
  // e.g. "11 years"
  experienceYears: string;
  email: string;
  availability: string;
  links: { linkedin: string; github: string; stackOverflow: string };
  // The product I'm working on now (home page, About page, Ticket Yar case study)
  product: { name: string; role: string };
  sectionTitles: Record<ResumeSection, string>;
  summary: string[];
  experience: Experience[];
  projects: ProjectGroup[];
  skills: { label: string; items: string[] }[];
  awards: { title: string; org: string; date: string; note?: string }[];
  education: {
    degree: string;
    school: string;
    period: string;
    location: string;
  }[];
  languages: { name: string; level: string }[];
};

export const resume: ResumeData = data;

