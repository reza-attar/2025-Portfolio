---
type: Data Source
title: Open source (src/lib/open-source.ts)
description: Contributions to other people's projects, shown on the home page and in /llms.txt; the list is empty today, so the section is hidden.
tags: [content, open-source, home]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: data
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/open-source.ts
    title: src/lib/open-source.ts
---

```ts
type Contribution = {
  project: string;   // owner/repo, e.g. "vercel/next.js"
  href: string;      // the merged PR, issue or commit
  title: string;
  kind: "fix" | "feature" | "docs" | "tests" | "maintenance";
  date: string;      // YYYY-MM
};
```

Newest first. While `contributions` is empty:

- the home page leaves out the "Contributions so far" section and does not
  give it a number;
- `/llms.txt` leaves out its "Open source" section.

Adding the first entry shows both and renumbers the later home sections.
How to: [add an open-source contribution](/playbooks/add-open-source-contribution.md).
