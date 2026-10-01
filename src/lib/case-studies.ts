import maicaAppScreens from "@public/case-studies/maica-app-screens.jpg";
import maicaLandingHero from "@public/case-studies/maica-landing-hero.jpg";
import moraAccelerateCache from "@public/case-studies/mora-accelerate-cache.jpg";
import moraPagespeedAfter from "@public/case-studies/mora-pagespeed-after.jpg";
import moraSkeletonLoading from "@public/case-studies/mora-skeleton-loading.jpg";
import moraBlog from "@public/Projects/mora-blog.png";
import { StaticImageData } from "next/image";

// Text fields marked "rich" accept **bold** and `code`.

export type CaseStudyImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export type CaseStudyMetric = { value: string; caption: string };

// A flow row alternates nodes and edges; an edge with an empty label is a bare arrow.
export type FlowItem = { node: string } | { edge: string };

export type CaseStudySection = {
  label: string;
  metrics?: CaseStudyMetric[];
  paras?: string[]; // rich
  tags?: string[];
  steps?: string[]; // rich
  list?: string[]; // rich
  flow?: FlowItem[][];
  after?: string[]; // rich, rendered after the lists
  table?: { head: [string, string, string]; rows: [string, string, string][] };
  footnote?: string;
  images?: CaseStudyImage[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  nameFa?: string;
  lede: string;
  type: string;
  period: string;
  role: string;
  live?: string;
  liveLabel?: string;
  note?: string;
  hero?: CaseStudyImage;
  sections: CaseStudySection[];
};

// Order here is the order of the previous / next navigation.
export const caseStudies: CaseStudy[] = [
  {
    slug: "ticket-yar",
    name: "Ticket Yar",
    nameFa: "تیکت‌یار",
    lede: "An internal tool that reads support tickets from Jira, finds relevant knowledge, and drafts a reply in Persian for a human agent to approve.",
    type: "Internal product (Dotin)",
    period: "2025 – present",
    role: "Technical lead",
    note: "No public link: this is an internal tool at Dotin, a banking software company. A short demo video is available on request.",
    sections: [
      {
        label: "The problem",
        paras: [
          "Support teams in banking get many tickets that repeat known issues, such as a failed service call, a known error code or an account-state question. Answers usually exist somewhere in team notes, but finding them for each ticket takes time.",
        ],
      },
      {
        label: "My role",
        paras: [
          "**Technical lead and developer.** I designed the prompt and RAG architecture, built most of the backend, and worked on the client dashboard.",
        ],
      },
      {
        label: "Stack",
        tags: [
          "TypeScript",
          "NestJS (migrated from Next.js)",
          "Prisma + PostgreSQL",
          "Semantic search over embeddings",
          "Vercel AI SDK generateObject + Zod",
          "DeepSeek API",
          "Jira REST / JQL",
          "Winston",
          "Cron schedulers",
          "Swagger",
          "Husky",
        ],
      },
      {
        label: "How it works",
        steps: [
          "A **Jira connector** pulls tickets into a queue for each business, using validated JQL filters.",
          "**Processing cycles** run on a schedule. Tickets are classified and matched against the knowledge base with semantic search.",
          "The model drafts a reply **inside a fixed schema**. If it cannot answer, it returns `INSUFFICIENT_KNOWLEDGE` (the gap is in the knowledge base) or `NEED_MORE_INFO` (the gap is in the ticket), rather than guessing.",
          "A support agent **approves, edits or rejects** the draft, and approved replies are posted back to Jira.",
          "A **knowledge collector** turns messy internal notes (Markdown) into clean knowledge entries.",
        ],
        after: [
          "Prompt design keeps the platform’s fixed rules in a system prompt. Instructions for each business sit in a clearly lower-priority section, so one business can’t override the safety rules.",
        ],
      },
      {
        label: "Result",
        metrics: [
          {
            value: "2m 25s → 34s",
            caption: "Build time after moving the backend to the SWC compiler",
          },
        ],
        list: [
          "Built to a working MVP, which was demoed internally in early 2026.",
        ],
      },
      {
        label: "What I learned",
        paras: [
          "Separating “missing knowledge” from “missing ticket info” makes a non-answer useful. It tells the team whether to add a knowledge base entry or to ask the customer for more details.",
          "Test data for the knowledge collector also had to be as messy as real support notes. Clean sample documents hid problems that real notes exposed.",
        ],
      },
    ],
  },
  {
    slug: "mora-blog",
    name: "Mora Blog",
    lede: "The production blog and content dashboard for Mora, an AI-education platform. My main focus here was performance.",
    type: "Team product (NUWA)",
    period: "Nov 2023 – Aug 2025",
    role: "Full-stack developer",
    live: "https://mora-ed.com",
    liveLabel: "mora-ed.com",
    hero: { src: moraBlog, alt: "Mora Blog homepage" },
    sections: [
      {
        label: "The problem",
        paras: [
          "The blog has image-heavy pages: hero illustrations, post covers and author images. An early Lighthouse run showed slow loading and visible layout shifts. As a content site, it also depends on good SEO and accessibility scores.",
        ],
      },
      {
        label: "My role",
        paras: [
          "**Full-stack developer at NUWA.** I built the blog and its content dashboard and did the performance work. The repository has about 460 commits from Nov 2023 to Aug 2025, all of them mine.",
          "I also built a separate internal “website builder” dashboard for Mora, using Next.js, Prisma and NextAuth with Jest and Cypress tests.",
        ],
      },
      {
        label: "Stack",
        tags: [
          "Next.js 14",
          "TypeScript",
          "Tailwind",
          "Prisma + PostgreSQL",
          "Prisma Accelerate",
          "AWS S3 + CloudFront",
          "MDX (next-mdx-remote)",
          "NextAuth",
          "plaiceholder + sharp",
          "Cypress",
          "Vercel",
        ],
      },
      {
        label: "What I did",
        list: [
          "**Image pipeline:** media moved to S3 behind CloudFront, correct `sizes` on cards, and blurred placeholders generated with `plaiceholder`/`sharp` so images don’t pop in.",
          "**Layout stability:** skeleton loaders for cards, slideshow and post pages; fixed footer and image-box shifts.",
          "**Less work on first load:** partial rendering with Suspense for trending categories, no prefetching for homepage links, and removal of an unneeded tag-manager script and spinner component.",
          "**Database caching** with Prisma Accelerate for published-post queries.",
          "**SEO and accessibility:** metadata and SEO headers, and fixes to the accessibility issues Lighthouse reported.",
          "**Cypress e2e tests** for login, post CRUD and image upload.",
        ],
      },
      {
        label: "Result",
        metrics: [
          { value: "58 → 98", caption: "Lighthouse performance (desktop)" },
          { value: "5.2s → 1.1s", caption: "Largest Contentful Paint" },
          {
            value: "~220ms → ~11ms",
            caption: "Published-post queries with Prisma Accelerate cache",
          },
        ],
        table: {
          head: [
            "Desktop Lighthouse",
            "Before (Apr 2024)*",
            "After (May 2024)",
          ],
          rows: [
            ["Performance", "58", "98"],
            ["Accessibility", "89", "100"],
            ["SEO", "80", "100"],
            ["Largest Contentful Paint", "5.2 s", "1.1 s"],
            ["Cumulative Layout Shift", "0.312", "~0.001"],
          ],
        },
        footnote:
          "*The “before” run was a local Lighthouse report, and the “after” run is from PageSpeed Insights on the Vercel deployment. The trend is clear, but the two numbers come from different environments.",
        images: [
          {
            src: moraPagespeedAfter,
            alt: "PageSpeed Insights desktop report after the optimisation work: 98 performance, 100 accessibility, 96 best practices, 100 SEO",
            caption: "PageSpeed Insights, desktop, May 2024.",
          },
        ],
      },
      {
        label: "Screenshots",
        images: [
          {
            src: moraAccelerateCache,
            alt: "Prisma Accelerate dashboard: cache vs origin latency",
            caption: "Prisma Accelerate: cache vs origin latency.",
          },
          {
            src: moraSkeletonLoading,
            alt: "Skeleton loading state on the blog",
            caption: "Skeleton loading state.",
          },
        ],
      },
      {
        label: "What I learned",
        paras: [
          "Most of the improvement came from basic work on images and layout, not from clever tricks.",
        ],
      },
    ],
  },
  {
    slug: "mybody",
    name: "MyBody",
    lede: "The API behind a platform where fitness coaches sell programmes and members follow workouts and nutrition plans.",
    type: "Client product",
    period: "Oct 2025 – present",
    role: "Backend developer",
    live: "https://mybodyapp.ir",
    liveLabel: "mybodyapp.ir",
    note: "In active development.",
    sections: [
      {
        label: "The problem",
        paras: [
          "The client is a fitness coach who wanted to run online coaching on his own platform. Workout plans, meal plans, progress check-ins and payments for many members are hard to manage across separate tools.",
          "The goal was one platform where members buy a plan, follow their weekly schedule, log what they did, and talk to their coach. Coaches need to manage clients and see their earnings.",
        ],
      },
      {
        label: "My role",
        paras: [
          "**Backend developer.** I designed and built the API on my own, from the first commit in October 2025 until now, about 255 commits.",
        ],
      },
      {
        label: "Stack",
        tags: [
          "NestJS 11",
          "TypeScript",
          "Prisma 7 (pg adapter)",
          "PostgreSQL",
          "Socket.IO",
          "S3-compatible storage",
          "Zarinpal",
          "JWT + SMS OTP",
          "Swagger / OpenAPI",
          "Pino",
          "Jest + Supertest",
          "Docker Compose",
          "Husky",
        ],
      },
      {
        label: "Architecture",
        flow: [
          [
            { node: "Member & coach apps" },
            { edge: "REST + JWT" },
            { node: "NestJS API" },
            { edge: "" },
            { node: "PostgreSQL / Prisma · S3 media · Zarinpal" },
          ],
          [
            { node: "Member & coach apps" },
            { edge: "Socket.IO" },
            { node: "Chat gateway" },
            { edge: "" },
            { node: "PostgreSQL / Prisma" },
          ],
        ],
      },
      {
        label: "What I built",
        list: [
          "**A domain model with 52 Prisma models** across more than 30 NestJS modules: members, coaches, plans and plan templates, workout sessions/sets/completions, week schedules, nutrition programmes, foods and meal logs, progress measurements, orders, wallets and bank accounts.",
          "**Payments and money flow:** checkout through Zarinpal, coach wallets with transactions, and a monthly income/withdrawal chart for coaches.",
          "**Promotion codes**, written spec-first: percentage or fixed discounts, expiry, usage caps, one use per member, and deletion only when a code is unused.",
          "**Real-time coach–member chat** over a Socket.IO namespace, with cursor-paginated history over REST.",
          "**Media uploads** to S3-compatible storage, Helmet, structured rolling logs, and Swagger docs for the frontend.",
          "**About 50 unit test files** and an e2e setup.",
        ],
      },
      {
        label: "Result",
        list: [
          "The API is under active development and is moving toward launch.",
          "I wrote payment-related features, such as promotion codes, as short specs before coding them. Each spec spells out edge cases, for example what happens when someone tries to delete a code that has already been used.",
        ],
      },
    ],
  },
  {
    slug: "maica",
    name: "Maica",
    nameFa: "مایکا",
    lede: "A Persian PWA that tells drivers when their car’s periodic services are due, based on mileage.",
    type: "Own product (co-founded)",
    period: "2025 – 2026",
    role: "Co-founder, full-stack",
    live: "https://maica.ir",
    liveLabel: "maica.ir",
    hero: {
      src: maicaAppScreens,
      alt: "Maica app screens: upcoming services, mileage update, service history",
    },
    sections: [
      {
        label: "The problem",
        paras: [
          "Most drivers track oil changes, tyres, insurance and inspections on paper, or not at all. Services are due by mileage, not by date, so calendar reminders don’t fit well.",
          "We wanted a small app where you enter your mileage now and then, and it tells you what is coming up.",
        ],
      },
      {
        label: "My role",
        paras: [
          "**Co-founder and full-stack developer** in a four-person team: a product designer co-founder, a UI/UX designer, another frontend developer and me.",
          "I built most of the backend: the data model, API routes and authentication. I shared the work on the in-app screens, and my teammate built most of the animated landing page. I wrote about 89 of the 143 commits in the repository.",
        ],
      },
      {
        label: "Stack",
        tags: [
          "Next.js 16 (App Router, Turbopack)",
          "React 19",
          "TypeScript",
          "Tailwind v4",
          "Radix / shadcn",
          "Zustand",
          "NextAuth (credentials + JWT)",
          "Prisma 7 + PostgreSQL",
          "SMS OTP",
          "Resend",
          "GSAP + Lenis",
          "Google Tag Manager",
        ],
      },
      {
        label: "What I built",
        list: [
          "**Mileage-driven reminders.** When a user updates the car’s mileage, recurring services are recalculated. A service shows up when it is overdue or within 5,000 km of being due, with a rough estimate in days based on the user’s average km/day.",
          "**Multiple cars** per user, custom services (recurring or one-off) and an editable service history. Marking a service “done” moves it to the next interval.",
          "**Phone + password sign-up with OTP verification**, a password-reset flow, and route protection in middleware.",
          "**REST route handlers** for auth, cars, mileage and services, plus an upcoming-count endpoint for badges.",
          "An **RTL, installable PWA** with an add-to-home-screen guide, and OpenGraph/Twitter metadata for sharing.",
        ],
      },
      {
        label: "Result",
        list: [
          "Live at maica.ir and installable as a PWA.",
          "Product notes and agent instructions are kept in `specs/`, which made it easier to hand work between teammates and AI coding tools.",
        ],
      },
      {
        label: "Screenshots",
        images: [
          {
            src: maicaLandingHero,
            alt: "Maica landing page hero",
            caption: "Landing page hero.",
          },
        ],
      },
      {
        label: "What I learned",
        paras: [
          "Turning “due by mileage” into a clear UI took more iterations than the backend did. Small things, such as hiding the “done” button until a service is actually due, made the app much less confusing.",
        ],
      },
    ],
  },
  {
    slug: "medicine-matching",
    name: "Medicine matching",
    lede: "A web tool that takes messy Persian drug names, matches them to the official drug registry, and sends uncertain matches to a person for review.",
    type: "Client prototype (freelance)",
    period: "Aug 2026",
    role: "Sole developer",
    note: "No public link: this is a client prototype. A demo is available on request.",
    sections: [
      {
        label: "The problem",
        paras: [
          "Pharmacy and distributor data often contains free-text drug names with mixed Persian/Arabic characters, Persian digits, dosage and form mixed into the name, and typos.",
          "The client needed to map those rows to a source-of-truth registry of about **33,800 drugs** (IRC code, brand, generic, manufacturer, prices), with a structured record for each and a way to trust or correct each match.",
        ],
      },
      {
        label: "My role",
        paras: [
          "**Sole developer**: spec, data model, matching pipeline, API and review UI.",
        ],
      },
      {
        label: "Stack",
        tags: [
          "Bun (Bun.serve, Bun.sql)",
          "TypeScript",
          "PostgreSQL + pg_trgm (GIN trigram)",
          "React + Tailwind",
          "Docker Compose",
        ],
      },
      {
        label: "How the matching works",
        steps: [
          "**Learned alias**: if a person has corrected this exact normalised string before, reuse that match (confidence 1.0).",
          "**IRC code**: if the row contains a registry code, match it directly.",
          "**Normalise**: unify ک/ك, ی/ي, ة/ه, convert Persian digits to ASCII, and collapse spaces.",
          "**Extract** the dosage form (tablet, capsule, ampoule, syrup…) and dosage (`mg`, `ml`, `%`…) with keyword lists and regex.",
          "**Fuzzy match** the rest against brand and generic names (Latin and Persian) with trigram similarity, combined into a weighted confidence score.",
          "High-confidence matches are **auto-approved**. The rest go to a **review queue** where a person approves, rejects or corrects them. Corrections are saved as aliases, so the system improves with use.",
        ],
      },
      {
        label: "Result",
        metrics: [
          { value: "33.8K", caption: "Drugs in the reference registry" },
        ],
        list: [
          "A working end-to-end prototype with batch CSV upload, single-string matching, a review queue and dashboard stats.",
          "Tested so far on a small sample of real dirty rows, not yet at production scale.",
        ],
      },
      {
        label: "What I’d do next",
        paras: [
          "Measure accuracy on a labelled sample before tuning the score weights. I’d also compare the rule-based pipeline with an LLM-assisted extraction step for the hardest rows.",
        ],
      },
    ],
  },
  {
    slug: "cashio",
    name: "Cashio",
    lede: "A Farsi-first personal finance PWA for tracking expenses, income, debts and investments.",
    type: "Own product",
    period: "2026",
    role: "Solo builder",
    live: "https://cashio.ir",
    liveLabel: "cashio.ir",
    sections: [
      {
        label: "The problem",
        paras: [
          "Most popular budgeting apps assume English, the Gregorian calendar and Western banking habits. For Iranian users, amounts are in toman, dates are in the Jalali calendar, and the layout must be right-to-left.",
          "Common situations such as paying off a debt in instalments were often not supported. Cashio is my attempt at a simple alternative built for Persian-speaking users.",
        ],
      },
      {
        label: "My role",
        paras: [
          "I worked on it alone, covering product, design decisions, frontend, backend, database and deployment. It is a side project and still small.",
        ],
      },
      {
        label: "Stack",
        tags: [
          "Next.js 15 (Server Actions)",
          "React 19",
          "TypeScript",
          "Tailwind v4",
          "shadcn/ui",
          "Prisma 7 (pg adapter)",
          "PostgreSQL",
          "Custom JWT auth (bcrypt)",
          "Web Push",
          "Recharts",
          "date-fns-jalali",
          "Debian · Apache · PM2 · Certbot",
        ],
      },
      {
        label: "What I built",
        list: [
          "**Seven core models** (users, categories, expenses, income, investments, debts, push subscriptions). Data access is server-only, through Server Actions and a small service layer.",
          "**Debts with instalments**, and reminders sent with Web Push notifications.",
          "**Jalali dates and an RTL layout** throughout, using the Vazirmatn font served locally rather than from a CDN.",
          "**Spending charts** and CSV export.",
          "**Onboarding before login, password reset**, and an installable PWA shell.",
        ],
        after: [
          "I made the first UI prototype quickly in Google AI Studio. I then rebuilt it as a real app with a proper Postgres schema, authentication and server-side data access. A React Native (Expo) client is at an early stage.",
        ],
      },
      {
        label: "Result",
        list: [
          "Live in production. It is an early-stage product, so I’m not reporting user numbers yet.",
          "It gave me hands-on practice with Next.js Server Actions, Prisma 7 driver adapters and Web Push on a self-managed server.",
        ],
      },
      {
        label: "What I’d do next",
        paras: [
          "Add proper usage analytics before adding more features, so I can see which screens people actually use.",
        ],
      },
    ],
  },
];

export const caseStudyHref = (slug: string) => `/works/${slug}`;
