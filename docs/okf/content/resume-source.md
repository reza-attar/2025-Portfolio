---
type: Data Source
title: Resume source (content/resume.md)
description: The Markdown file that is the source of truth for the resume, and the exact format the build-time parser accepts.
tags: [content, resume, format]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: resume
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/content/resume.md
    title: content/resume.md
  - id: parse
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/scripts/resume/parse.cjs
    title: scripts/resume/parse.cjs
  - id: types
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/lib/resume.ts
    title: src/lib/resume.ts (ResumeData type)
---

# Role

`content/resume.md` holds every career fact. It is read by:

- the site, through `import data from "content/resume.md"` in `src/lib/resume.ts`;
- the PDF build (`scripts/resume/pdf.mjs`);
- the [`/resume.md`](/endpoints/resume-md.md) endpoint, as raw text.

Edit this file, not `src/lib/resume.ts`. How to: [edit the resume](/playbooks/edit-resume.md).

# Front matter

`key: value` lines between two `---` lines. Values are plain text (no quotes
or YAML structures). All of these are **required**:

| Key | `resume.` field | Example / use |
|-----|-----------------|---------------|
| `name` | `name` | Reza Attar |
| `headline` | `title` | Shown under the name on /resume and the PDF |
| `role` | `role` | Senior Engineer |
| `company` | `company` | Dotin |
| `location` | `location` | Iran |
| `experience` | `experienceYears` | "11 years", used in the hero and About |
| `email` | `email` | Contact form recipient, footer, JSON-LD |
| `linkedin`, `github`, `stackoverflow` | `links.*` | Full URLs |
| `availability` | `availability` | Relocation and remote line |
| `product` | `product.name` | The current product (Ticket Yar) |
| `product_role` | `product.role` | Role on that product |

# Body

HTML comments (`<!-- … -->`) are ignored and are stripped from `/resume.md`.
Level-one headings (`# Name`) are ignored; they only help when reading the file. Everything else belongs to a
`## Section`. All seven sections are required. The heading text is shown as
the section title, and is matched case-insensitively:

| Section key (`/resume#key`) | Accepted headings | Line format |
|-----------------------------|-------------------|-------------|
| `summary` | Summary | Plain paragraphs separated by blank lines. No bullets or headings. |
| `experience` | Experience | See below |
| `projects` | Products & Projects, Projects | See below |
| `skills` | Technical Skills, Skills | `- **Label:** a, b, c (d, e)`. Commas inside parentheses do not split. |
| `awards` | Awards | `- **Title** — Organisation · Date`, optionally followed by indented lines, which become its note |
| `education` | Education | `### Degree`, then one `School · Period · Location` line |
| `languages` | Languages | `- Name: Level` |

**Experience:**

```markdown
### Company                      one per job, newest first
Role · Period · Location         required, exactly three parts joined by " · "
#### Group heading               optional
- Bullet                         bullets before any #### go in an unnamed group
  continued line                 indented 2+ spaces: joins the previous bullet
```

**Projects:**

```markdown
### Group                        e.g. Own products, Client work, Side practice
#### Name                        or: #### Name · [label](https://…)
Description, one or more lines   plain text, no bullets
Stack: a, b, c                   optional
```

# Errors

Anything the parser does not recognise throws `content/resume.md:<line>: <message>`,
which stops `next dev` and `next build`. Examples: a missing front-matter key,
an unknown `##` heading, a job without its `Role · Period · Location` line, a
bullet under Projects.

# Values copied elsewhere

Some resume facts are repeated by hand in code (highlight numbers, layer
metrics, social links, About prose). See [sources of truth](/architecture/data-flow.md).
