import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "./site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GenerateEmailParams = {
  to: string;
  body: string;
  subject: string;
};

export function generateEmailLink({
  to = site.email,
  subject = "Let's work together on the new project",
  body = "I saw your website and want to start working together on a this new idea I have, the idea is about ...",
}: Partial<GenerateEmailParams>): string {
  return `mailto:${to}?subject=${subject} &body=${body}`;
}

export const getResumeFileLink = () => {
  if (!process.env.NEXT_PUBLIC_RESUME_FILE)
    throw new Error("Error: NEXT_PUBLIC_RESUME_FILE variable required");
  return process.env.NEXT_PUBLIC_RESUME_FILE;
};
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
