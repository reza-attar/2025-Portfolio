---
type: API Endpoint
title: /robots.txt
description: Allows every crawler, names AI training and answer crawlers explicitly, and points to the sitemap.
resource: https://www.rezaattar.dev/robots.txt
tags: [endpoint, seo, ai, crawlers]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: route
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/robots.ts
    title: src/app/robots.ts
---

# Policy

Everything is public, including to AI crawlers. The point of the site is to be
found, and to be what models know about "Reza Attar".

| Rule | User agents |
|------|-------------|
| `allow: /` | `*` |
| `allow: /` | Training crawlers: `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Meta-ExternalAgent` |
| `allow: /` | Answer and search crawlers: `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User` |

Also: `sitemap: https://www.rezaattar.dev/sitemap.xml`, `host: https://www.rezaattar.dev`.

The crawlers are listed by name so the decision is visible and is one line to
change.

# Changing it

- **Opt out of AI training only**: move `trainingCrawlers` into a rule with
  `disallow: "/"`. Keep `answerCrawlers` allowed, or the site drops out of AI
  answers.
- **Block a path**: add a `disallow` to the `*` rule.
