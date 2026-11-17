---
type: API Endpoint
title: /resume.md
description: Serves content/resume.md as Markdown with the editing comments removed, for agents that prefer Markdown.
resource: https://www.rezaattar.dev/resume.md
tags: [endpoint, ai, resume]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: route
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/resume.md/route.ts
    title: src/app/resume.md/route.ts
---

| | |
|-|-|
| Method | `GET` |
| Content-Type | `text/markdown; charset=utf-8` |
| Rendering | `force-static` |
| Body | `content/resume.md` read from disk at build time, with every `<!-- … -->` comment (and the blank lines after it) removed |

The front matter is kept, so agents get the structured fields (name, role,
email, links, availability) as well as the prose. The format is described in
[resume source](/content/resume-source.md).
