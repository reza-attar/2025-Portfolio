// Open-source contributions shown on the home page (and in /llms.txt).
// The section is hidden while this list is empty. Newest first, e.g.:
// {
//   project: "vercel/next.js",
//   href: "https://github.com/vercel/next.js/pull/12345",
//   title: "Fix typo in App Router caching docs",
//   kind: "docs",
//   date: "2026-09",
// },
export type Contribution = {
  // owner/repo
  project: string;
  // The merged PR, issue or commit
  href: string;
  title: string;
  kind: "fix" | "feature" | "docs" | "tests" | "maintenance";
  // YYYY-MM
  date: string;
};

export const contributions: Contribution[] = [];
