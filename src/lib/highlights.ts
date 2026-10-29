import { caseStudyHref } from "@/lib/case-studies";
import { slugify } from "@/lib/utils";

export type Highlight = {
  // The number that leads the card, e.g. "−77%"
  value: string;
  label: string;
  context: string;
  href: string;
};

// The home page's summary of the work, before the full job listing.
// Numbers come from content/resume.md; keep them in step when the resume changes.
export const highlights: Highlight[] = [
  {
    value: "−77%",
    label: "compile time",
    context: "Ticket Yar backend, moved to NestJS + SWC",
    href: caseStudyHref("ticket-yar"),
  },
  {
    value: "128×",
    label: "faster queries",
    context: "NUWA, hottest read paths from 1.15 s to 9 ms",
    href: `/resume#${slugify("NUWA")}`,
  },
  {
    value: "13 s → 3 s",
    label: "page load",
    context: "Mahaksoft, asset budgets and code splitting",
    href: `/resume#${slugify("Mahaksoft")}`,
  },
  {
    value: "3",
    label: "engineers led",
    context: "Remote React team for a German company",
    href: `/resume#${slugify("Solution Apps DG GmbH")}`,
  },
];
