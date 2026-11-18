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

// Keep LinkedIn/GitHub in sync with content/resume.md (not imported: client components use this file)
export const getLinkedinLink = () => "https://www.linkedin.com/in/rezaattarzadeh/";
export const getGithubLink = () => "https://github.com/reza-attar";
export const getYoutubeLink = () => "https://www.youtube.com/@RezaAttarCode";

// "Solution Apps DG GmbH" -> "solution-apps-dg-gmbh", for URL fragments like /resume#nuwa
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
