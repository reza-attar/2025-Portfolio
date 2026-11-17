import type { Commit } from "@/shared/components/ui/CommitLog";
import { resume } from "@/lib/resume";

// The career as a commit log, newest first, built from content/resume.md
export const careerLog: Commit[] = [
  ...resume.experience.map((job) => ({
    type: "feat" as const,
    scope: "career",
    text: `${job.role.toLowerCase()} @ ${job.company}`,
    dates: `${job.period} · ${job.location}`,
    detail: job.groups[0]?.bullets[0]?.replace(/\*\*/g, ""),
  })),
  ...resume.education.map((e) => ({
    type: "chore" as const,
    scope: "edu",
    text: `${e.degree}, ${e.school}`,
    dates: `${e.period} · ${e.location}`,
  })),
];
