import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Keep LinkedIn/GitHub in sync with content/resume.md (not imported: client components use this file)
export const getLinkedinLink = () => "https://www.linkedin.com/in/rezaattarzadeh/";
export const getGithubLink = () => "https://github.com/reza-attar";
export const getYoutubeLink = () => "https://www.youtube.com/@RezaAttarCode";
export const getGoodreadsLink = () =>
  "https://www.goodreads.com/review/list/97249582-re9inee?utf8=✓&shelf=read&view=covers&title=re9inee&per_page=infinite";

// "Solution Apps DG GmbH" -> "solution-apps-dg-gmbh", for URL fragments like /resume#nuwa
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
