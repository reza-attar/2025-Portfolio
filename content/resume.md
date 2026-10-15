---
name: Reza Attar
headline: Full-Stack Engineer · TypeScript · Next.js · NestJS · PostgreSQL · applied LLMs
role: Senior Engineer
company: Dotin
location: Iran
experience: 11 years
email: attarzadeh76@gmail.com
linkedin: https://www.linkedin.com/in/rezaattarzadeh/
github: https://github.com/reza-attar
stackoverflow: https://stackoverflow.com/users/9745726/re9inee
availability: Open to relocation to the Netherlands or Germany · Eligible for EU Blue Card · Open to EU-remote
product: Ticket Yar
product_role: Senior engineer
---

<!--
  Source of truth for the resume: the site and public/Reza_Attar_Resume.pdf are built from it.
  Format: see the error message if a line doesn't parse (scripts/resume/parse.cjs).
-->

# Reza Attar

## Summary

Full-stack engineer with 11 years of production JavaScript/TypeScript experience. The last five centred on React and Next.js, the most recent year on TypeScript backends and applied LLMs. I'm currently a senior engineer on Ticket Yar, an AI support platform at a banking-software company. I moved its backend to NestJS, built the Jira and RAG pipeline on PostgreSQL/pgvector, and cut compile time by 77%. I build the whole path from schema to interface. Previously I led a three-person frontend team for a German company, fully remote.

## Experience

### Dotin

Senior Engineer · Jun 2025 – Present · Iran

#### Ticket Yar (AI support platform) · Senior engineer

- Senior engineer on Ticket Yar, a multi-tenant B2B platform, used internally, that connects to Jira, Confluence and other ticketing and knowledge systems and drafts first-line replies to support tickets using retrieval-augmented generation over each business's own knowledge base. Wrote the product spec and introduced spec-driven development to the team.
- Designed and shipped an in-house RAG system on PostgreSQL and pgvector, serving semantic search over internal documents.
- Built the AI layer: ticket classification with schema-validated structured output (Vercel AI SDK, Zod), semantic knowledge search, and AI-scored knowledge validation.

#### Backend & platform

- Migrated the backend from Next.js to NestJS and built its core: JWT auth with API versioning, multi-tenant business module, caching, background ingestion jobs, embedding pipelines that re-index on document change, unified Winston logging, Swagger docs, and a Prisma soft-delete extension. Restored the unit-test suite.
- Built the Jira integration end to end (ticket, comment, and attachment sync, CSV import, SLA tracking), plus an approval workflow and knowledge-confidence limits so no AI reply reaches a customer unreviewed.
- Cut the NestJS backend's compile time from 2 m 25 s to 34 s (−77%) by migrating compilation to SWC.

#### Frontend

- Redesigned the client dashboard and built the product landing page, with server-side search, filtering, and pagination.

#### Recognition

- Promoted to Senior Engineer.

### NUWA

Full-Stack Developer · Jun 2023 – Jun 2025 · Remote, Estonia

- Cut database query response time from 1.15 s to 9 ms (≈128×) on the hottest read paths.
- Built the web platform for Mora (mora-ed.com), an AI-education product: website, MDX blog, and admin dashboard with a website builder on Next.js App Router, owning server components and the data layer behind them (Prisma, PostgreSQL, AWS S3, NextAuth).
- Shipped a 100+ component internal library on shadcn/ui and Tailwind that became the shared foundation for every new product surface.
- Set up end-to-end and component testing (Cypress, Jest) and tracked Lighthouse across separate dev and production environments on Vercel.

### Solution Apps DG GmbH

Front-End Developer & Team Lead · Oct 2021 – Sep 2023 · Remote, Germany

- Led a team of three React developers through delivery: task breakdown, code review, and a single agreed code structure across projects.
- Refactored a legacy marketplace front end down to half its previous size, removing dead dependencies and duplicated state logic.
- Raised the team's baseline with review checklists, a branching strategy, and CI on GitHub Actions, so releases stopped depending on one person.
- Contributed to the partner admin portal: React 18, TypeScript, Vite, Redux Toolkit, Ant Design, i18next with RTL, shipped via Docker, Nginx, and GitLab CI.

### Mahaksoft

Front-End Developer · Jun 2020 – Sep 2021 · Mashhad, Iran

- Took the main website's load time from 13 s to 3 s through asset budgeting, code splitting, and image strategy.
- Redesigned 60 pages and lifted the overall Lighthouse score by 25%, with accessibility and SEO gains carried into the template system.

### Freelance

Full-Stack Developer · Jan 2017 – Present · Remote

- Delivered client projects end to end (e-commerce, healthcare data, fitness, and corporate web) from scoping and estimation through build, migration, and maintenance: Next.js, WordPress/WooCommerce, PHP 8.2 upgrades, technical SEO.
- Shipped products across hardware firmware, browser extensions, and real-time web apps as a continuous side practice.

## Products & Projects

### Own products

#### Maica · [maica.ir](https://maica.ir)

Persian-language installable PWA for car maintenance. Users define their own recurring services and Maica computes what's due from live mileage updates. Built solo with phone-and-OTP auth, full RTL, and an animated marketing site.

Stack: Next.js 16, React 19, Prisma, PostgreSQL, GSAP, Lenis

#### Cashio · [mycashio.ir](https://mycashio.ir)

Farsi-first personal finance PWA: expenses, income and investments in one feed, with charts, recaps and CSV export. Custom JWT auth, offline-capable RTL app shell, Jalali calendar, web push. Self-hosted on Debian.

Stack: Next.js 15 Server Actions, React 19, Prisma, PostgreSQL, Apache, PM2

### Client work

#### MyBodyApp · [mybodyapp.ir](https://mybodyapp.ir)

Backend for a coaching and fitness platform, in active development: real-time messaging over WebSockets with cursor-based history, JWT auth, AWS S3 media storage, Swagger docs, Pino logging, Jest unit and e2e tests.

Stack: NestJS, Prisma, PostgreSQL, Socket.IO, Docker

#### Persian Medicine Data Matching

Matches messy free-text Persian drug descriptions against a 33,000-entry reference database using Persian text normalization, PostgreSQL trigram fuzzy search, and weighted confidence scoring. Low-confidence matches go to human review, and each correction is saved so the system improves over time.

Stack: Bun, React, PostgreSQL, Docker

### Side practice

#### Wireless EMS hip trainer

Wireless electrical muscle stimulation device for lower-back muscle spasm: firmware, control app, and pairing flow.

#### Password manager Chrome extension

Credential storage and autofill, including the encryption model and browser-storage sync path.

#### Real-time multiplayer mini-games

Browser games on Socket.IO handling room state, latency compensation, and reconnect behaviour.

#### Persian RAG document pipeline

Node.js ingestion (mammoth, pdf-parse, tesseract.js) with Persian text-quality heuristics. Evaluated BGE-M3 embeddings and mDeBERTa NLI cross-encoders for retrieval and knowledge-base conflict detection.

## Technical Skills

- **Languages:** TypeScript, JavaScript (ES2015+), SQL, HTML, CSS, Python (data/ML tooling)
- **Front-end:** React, Next.js (App Router, Server Actions), Redux Toolkit, Zustand, React Hook Form, Tailwind CSS, shadcn/ui, PWAs, RTL/i18n
- **Back-end & data:** NestJS, Node.js, Express, Bun, REST, API versioning, WebSockets (Socket.IO), Prisma, PostgreSQL, pgvector, Caching, Cron scheduling, Winston, Swagger
- **AI engineering:** RAG pipelines, Embeddings, Semantic search, Local LLM hosting, Prompt engineering, Structured output (Vercel AI SDK, Zod), Tool calling, MCP servers, Persian NLP, Claude Code
- **Infrastructure:** Docker, AWS (EC2, S3), Ubuntu/Debian, Apache, Nginx, PM2, GitHub Actions, GitLab CI, Git
- **Testing & tooling:** Jest, Vitest, Cypress, SWC, Husky

## Awards

- **Third place · LLM Agents Hackathon** — Sharif University · Jul 2025
- **Winner · ICT 7 Coding Contest** — Sharif ICT · Jul 2022
  First place in a 48-hour contest against teams from Sharif and other top Iranian programmes.
- **First place · Sabkad 4 Coding Contest** — Polwinno & Bank Mellat · 2021

## Education

### BSc, Computer Science

Imam Reza International University · 2015 – 2021 · Mashhad, Iran

## Languages

- English: Full professional
- German: B1
- Persian: Native
