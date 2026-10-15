import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GenerateEmailParams = {
  to: string;
  body: string;
  subject: string;
};

// `to` is the resume email (resume.email); client components get it as a prop
export function generateEmailLink({
  to,
  subject = "Let's work together on the new project",
  body = "I saw your website and want to start working together on a this new idea I have, the idea is about ...",
}: Pick<GenerateEmailParams, "to"> & Partial<GenerateEmailParams>): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const getLinkedinLink = () => {
  if (!process.env.LINKEDIN)
    throw new Error("Error: Linkedin variable required");
  return process.env.LINKEDIN;
};
export const getGithubLink = () => {
  if (!process.env.GITHUB) throw new Error("Error: Github variable required");
  return process.env.GITHUB;
};
export const getYoutubeLink = () => {
  if (!process.env.YOUTUBE) throw new Error("Error: Youtube variable required");
  return process.env.YOUTUBE;
};
export const getGoodreadsLink = () => {
  if (!process.env.GOODREADS)
    throw new Error("Error: Goodreads variable required");
  return process.env.GOODREADS;
};

// "Solution Apps DG GmbH" -> "solution-apps-dg-gmbh", for URL fragments like /resume#nuwa
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
