// Source of truth for the /resume page.
// Content is a public-facing subset of Reza_Attarzadeh_Master_Resume.md.
// After editing this file, regenerate public/Reza_Attar_Resume.pdf (see README).

export const RESUME_PDF_PATH = "/Reza_Attar_Resume.pdf";

export type ResumeLink = { label: string; href: string };

export type ExperienceGroup = {
  heading?: string;
  bullets: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  groups: ExperienceGroup[];
};

export type Project = {
  name: string;
  link?: ResumeLink;
  description: string;
  stack?: string;
};

export type ProjectGroup = {
  heading: string;
  items: Project[];
};

export const resume = {
  name: "Reza Attar",
  title:
    "Full-Stack Engineer · TypeScript · Next.js · NestJS · PostgreSQL · applied LLMs",
  location: "Iran",
  availability:
    "Open to relocation to the Netherlands or Germany · Eligible for EU Blue Card · Open to EU-remote",
  email: "attarzadeh76@gmail.com",
  links: {
    github: "https://github.com/Re9iNee",
    stackOverflow: "https://stackoverflow.com/users/9745726/re9inee",
  },

  summary:
    "Full-stack engineer with 11 years of production JavaScript/TypeScript experience. The last five centred on React and Next.js, the most recent year on TypeScript backends and applied LLMs. I'm currently lead engineer on Ticket Yar, an AI support platform at a banking-software company, where I moved the backend to NestJS, built the Jira and RAG pipeline on PostgreSQL/pgvector, and cut compile time by 77%. I build the whole path from schema to interface. Previously I led a three-person frontend team for a German company, fully remote.",

  experience: [
    {
      company: "Dotin",
      role: "Senior Engineer",
      period: "Jun 2025 – Present",
      location: "Iran",
      groups: [
        {
          heading: "Ticket Yar (AI support platform) · Lead engineer",
          bullets: [
            "Lead engineer on Ticket Yar, a multi-tenant platform that connects to Jira and drafts first-line replies to support tickets using retrieval-augmented generation over each business's own knowledge base. Wrote the product spec and introduced spec-driven development to the team.",
            "Designed and shipped an in-house RAG system on PostgreSQL and pgvector, serving semantic search over internal documents.",
            "Ran evaluation and deployment of locally hosted LLMs, keeping sensitive banking data inside the company perimeter instead of sending it to a third-party API.",
            "Built the AI layer: ticket classification with schema-validated structured output (Vercel AI SDK, Zod), semantic knowledge search, AI-scored knowledge validation, and a knowledge collector that turns unstructured Persian support notes into a searchable knowledge base. Added DeepSeek API support.",
            "Integrated MCP servers so internal tools could call company data sources directly from assistant interfaces.",
          ],
        },
        {
          heading: "Backend & platform",
          bullets: [
            "Migrated the backend from Next.js to NestJS and built its core: JWT auth with API versioning, multi-tenant business module, caching, scheduled jobs that generate AI replies automatically, background ingestion jobs, embedding pipelines that re-index on document change, unified Winston logging, Swagger docs, and a Prisma soft-delete extension. Restored the unit-test suite.",
            "Built the Jira integration end to end (ticket, comment, and attachment sync, JQL validation, CSV import, SLA tracking), plus an approval workflow and knowledge-confidence limits so no AI reply reaches a customer unreviewed.",
            "Cut the NestJS backend's compile time from 2 m 25 s to 34 s (−77%) by migrating compilation to SWC.",
          ],
        },
        {
          heading: "Frontend",
          bullets: [
            "Redesigned the client dashboard and built the product landing page, with server-side search, filtering, and pagination.",
          ],
        },
        {
          heading: "Recognition",
          bullets: [
            "Promoted to Senior Engineer (internal Ladder 7), scoring 80% on the formal promotion exam.",
          ],
        },
      ],
    },
    {
      company: "NUWA",
      role: "Full-Stack Developer",
      period: "Jun 2023 – Jun 2025",
      location: "Remote, Estonia",
      groups: [
        {
          bullets: [
            "Cut database query response time from 1.15 s to 9 ms (≈128×) on the hottest read paths.",
            "Built the web platform for Mora (mora-ed.com), an AI-education product: website, MDX blog, and admin dashboard with a website builder on Next.js App Router, owning server components and the data layer behind them (Prisma, PostgreSQL, AWS S3, NextAuth).",
            "Shipped a 100+ component internal library on shadcn/ui and Tailwind that became the shared foundation for every new product surface.",
            "Set up end-to-end and component testing (Cypress, Jest) and tracked Lighthouse across separate dev and production environments on Vercel.",
          ],
        },
      ],
    },
    {
      company: "Solution Apps DG GmbH",
      role: "Front-End Developer & Team Lead",
      period: "Oct 2021 – Sep 2023",
      location: "Remote, Germany",
      groups: [
        {
          bullets: [
            "Led a team of three React developers through delivery: task breakdown, code review, and a single agreed code structure across projects.",
            "Refactored a legacy marketplace front end down to half its previous size, removing dead dependencies and duplicated state logic.",
            "Raised the team's baseline with review checklists, a branching strategy, and CI on GitHub Actions, so releases stopped depending on one person.",
            "Contributed to the partner admin portal: React 18, TypeScript, Vite, Redux Toolkit, Ant Design, i18next with RTL, shipped via Docker, Nginx, and GitLab CI.",
          ],
        },
      ],
    },
    {
      company: "Mahaksoft",
      role: "Front-End Developer",
      period: "Jun 2020 – Sep 2021",
      location: "Mashhad, Iran",
      groups: [
        {
          bullets: [
            "Took the main website's load time from 13 s to 3 s through asset budgeting, code splitting, and image strategy.",
            "Redesigned 60 pages and lifted the overall Lighthouse score by 25%, with accessibility and SEO gains carried into the template system.",
          ],
        },
      ],
    },
    {
      company: "Freelance",
      role: "Full-Stack Developer",
      period: "Jan 2017 – Present",
      location: "Remote",
      groups: [
        {
          bullets: [
            "Delivered client projects end to end (e-commerce, healthcare data, fitness, and corporate web) from scoping and estimation through build, migration, and maintenance: Next.js, WordPress/WooCommerce, PHP 8.2 upgrades, technical SEO.",
            "Shipped products across hardware firmware, browser extensions, and real-time web apps as a continuous side practice.",
          ],
        },
      ],
    },
  ] as Experience[],

  projects: [
    {
      heading: "Own products",
      items: [
        {
          name: "Maica",
          link: { label: "maica.ir", href: "https://maica.ir" },
          description:
            "Persian-language installable PWA for car maintenance. Users define their own recurring services and Maica computes what's due from live mileage updates. Built solo with phone-and-OTP auth, full RTL, and an animated marketing site.",
          stack: "Next.js 16, React 19, Prisma, PostgreSQL, GSAP, Lenis",
        },
        {
          name: "Cashio",
          link: { label: "cashio.ir", href: "https://cashio.ir" },
          description:
            "Farsi-first personal finance PWA: expenses, income and investments in one feed, with charts, recaps and CSV export. Custom JWT auth, offline-capable RTL app shell, Jalali calendar, web push. Self-hosted on Debian.",
          stack:
            "Next.js 15 Server Actions, React 19, Prisma, PostgreSQL, Apache, PM2",
        },
      ],
    },
    {
      heading: "Client work",
      items: [
        {
          name: "MyBodyApp",
          link: { label: "mybodyapp.ir", href: "https://mybodyapp.ir" },
          description:
            "Backend for a coaching and fitness platform, in active development: real-time messaging over WebSockets with cursor-based history, JWT auth, AWS S3 media storage, Swagger docs, Pino logging, Jest unit and e2e tests.",
          stack: "NestJS, Prisma, PostgreSQL, Socket.IO, Docker",
        },
        {
          name: "Persian Medicine Data Matching",
          description:
            "Matches messy free-text Persian drug descriptions against a 33,000-entry reference database using Persian text normalization, PostgreSQL trigram fuzzy search, and weighted confidence scoring. Low-confidence matches go to human review, and each correction is saved so the system improves over time.",
          stack: "Bun, React, PostgreSQL, Docker",
        },
      ],
    },
    {
      heading: "Side practice",
      items: [
        {
          name: "Wireless EMS hip trainer",
          description:
            "Wireless electrical muscle stimulation device for lower-back muscle spasm: firmware, control app, and pairing flow.",
        },
        {
          name: "Password manager Chrome extension",
          description:
            "Credential storage and autofill, including the encryption model and browser-storage sync path.",
        },
        {
          name: "Real-time multiplayer mini-games",
          description:
            "Browser games on Socket.IO handling room state, latency compensation, and reconnect behaviour.",
        },
        {
          name: "Persian RAG document pipeline",
          description:
            "Node.js ingestion (mammoth, pdf-parse, tesseract.js) with Persian text-quality heuristics. Evaluated BGE-M3 embeddings and mDeBERTa NLI cross-encoders for retrieval and knowledge-base conflict detection.",
        },
      ],
    },
  ] as ProjectGroup[],

  awards: [
    {
      title: "Third place · LLM Agents Hackathon",
      org: "Sharif University",
      date: "Jul 2025",
    },
    {
      title: "Winner · ICT 7 Coding Contest",
      org: "Sharif ICT",
      date: "Jul 2022",
      note: "First place in a 48-hour contest against teams from Sharif and other top Iranian programmes.",
    },
    {
      title: "First place · Sabkad 4 Coding Contest",
      org: "Polwinno & Bank Mellat",
      date: "2021",
    },
  ],

  education: [
    {
      degree: "BSc, Computer Science",
      school: "Imam Reza International University",
      period: "2015 – 2021",
      location: "Mashhad, Iran",
    },
  ],

  skills: [
    {
      label: "Languages",
      items: [
        "TypeScript",
        "JavaScript (ES2015+)",
        "SQL",
        "HTML",
        "CSS",
        "Python (data/ML tooling)",
      ],
    },
    {
      label: "Front-end",
      items: [
        "React",
        "Next.js (App Router, Server Actions)",
        "Redux Toolkit",
        "Zustand",
        "React Hook Form",
        "Tailwind CSS",
        "shadcn/ui",
        "PWAs",
        "RTL/i18n",
      ],
    },
    {
      label: "Back-end & data",
      items: [
        "NestJS",
        "Node.js",
        "Express",
        "Bun",
        "REST",
        "API versioning",
        "WebSockets (Socket.IO)",
        "Prisma",
        "PostgreSQL",
        "pgvector",
        "Caching",
        "Cron scheduling",
        "Winston",
        "Swagger",
      ],
    },
    {
      label: "AI engineering",
      items: [
        "RAG pipelines",
        "Embeddings",
        "Semantic search",
        "Local LLM hosting",
        "Prompt engineering",
        "Structured output (Vercel AI SDK, Zod)",
        "Tool calling",
        "MCP servers",
        "DeepSeek API",
        "Persian NLP",
        "Claude Code",
      ],
    },
    {
      label: "Infrastructure",
      items: [
        "Docker",
        "AWS (EC2, S3)",
        "Ubuntu/Debian",
        "Apache",
        "Nginx",
        "PM2",
        "GitHub Actions",
        "GitLab CI",
        "Git",
      ],
    },
    {
      label: "Testing & tooling",
      items: ["Jest", "Vitest", "Cypress", "SWC", "Husky"],
    },
  ],

  languages: [
    { name: "English", level: "Full professional" },
    { name: "German", level: "B1" },
    { name: "Persian", level: "Native" },
  ],
};
