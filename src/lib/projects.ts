// The projects in ~/projects, in this order. Each one opens its own window at
// /projects/<slug>; the long-form text lives in ./case-studies (only the project
// window imports it, so the case-study text stays out of the first page load).

export type ProjectColor = "orange" | "yellow" | "blue" | "green" | "purple";

export interface Project {
  slug: string;
  name: string;
  // One short line for the file table
  oneLiner: string;
  // Three items at most, for the table and the card
  stack: string[];
  color: ProjectColor;
}

// `name` matches the case study's name
export const projects: Project[] = [
  { slug: "ticket-yar", name: "Ticket Yar", oneLiner: "AI support platform: RAG drafts, a person approves", stack: ["NestJS", "pgvector", "AI SDK"], color: "blue" },
  { slug: "cashio", name: "Cashio", oneLiner: "Farsi-first personal finance PWA", stack: ["Next.js", "Prisma", "PostgreSQL"], color: "green" },
  { slug: "mybody", name: "MyBody", oneLiner: "API for an online fitness-coaching platform", stack: ["NestJS", "Prisma", "Socket.IO"], color: "orange" },
  { slug: "maica", name: "Maica", oneLiner: "Car-service reminders driven by mileage", stack: ["Next.js", "Prisma", "PWA"], color: "yellow" },
  { slug: "mora-blog", name: "Mora Blog", oneLiner: "AI-education blog, Lighthouse 58 → 98", stack: ["Next.js", "Prisma", "S3"], color: "purple" },
  { slug: "medicine-matching", name: "Medicine matching", oneLiner: "Matches messy Persian drug names to a registry", stack: ["Bun", "pg_trgm", "React"], color: "blue" },
];


export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
