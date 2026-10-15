import cleafin from "@public/Projects/cleafin.png";
import moraBlog from "@public/Projects/mora-blog.png";
import moraDash from "@public/Projects/mora-dash.png";
import myca from "@public/Projects/myca.png";
import { CardProps } from "@/components/ui/Card";
import { caseStudyHref } from "./case-studies";
import { LayerId } from "./layers";
import { resume } from "./resume";
import { site } from "./site";

export type MoreCaseStudy = {
  name: string;
  meta: string;
  description: string;
  stack: string;
  caseHref: string;
  layers: LayerId[];
  link?: string;
  href?: string;
};

// Listed under "More case studies" on /works
export const moreCaseStudies: MoreCaseStudy[] = [
  {
    name: "Medicine matching",
    meta: "Sole developer · Client prototype",
    description:
      "Matches messy Persian drug names to a 33.8K-drug registry and sends uncertain matches to a person for review.",
    stack: "Bun, PostgreSQL + pg_trgm, React, Docker",
    caseHref: caseStudyHref("medicine-matching"),
    layers: ["data", "backend", "interface"],
  },
];

// The main list on /works and the home page, in this order
export const projects: CardProps[] = [
  {
    title: resume.product.name,
    meta: `${resume.product.role} · ${resume.company}`,
    description: `A B2B support platform, used internally at ${resume.company}. It pulls tickets from Jira, Confluence and other systems, finds what the team already knows, and drafts a reply for a person to approve.`,
    note: "B2B product used internally, so there's no public link.",
    caseHref: caseStudyHref("ticket-yar"),
    layers: ["data", "backend", "ai", "interface"],
    steps: [
      {
        label: "sources",
        text: "Jira · Confluence · more",
        edge: "tickets",
      },
      {
        label: "retrieve",
        text: "Semantic search · pgvector",
        layer: "data",
        edge: "context",
      },
      {
        label: "draft",
        text: "LLM reply, schema-checked",
        layer: "ai",
        edge: "typed JSON",
      },
      {
        label: "approve",
        text: "An agent approves or edits",
        layer: "interface",
      },
    ],
  },
  {
    title: "Cashio",
    meta: "Solo builder · Own product",
    logo: "/Projects/cashio-icon.png",
    description:
      "A Farsi-first personal finance PWA for tracking expenses, income, debts and investments, with Jalali dates and instalment reminders.",
    href: "https://mycashio.ir",
    caseHref: caseStudyHref("cashio"),
    layers: ["data", "backend", "interface"],
    steps: [
      {
        label: "app",
        text: "Installable RTL PWA",
        layer: "interface",
        edge: "Server Actions",
      },
      {
        label: "server",
        text: "Next.js 15 · JWT auth · Web Push",
        layer: "backend",
        edge: "Prisma 7",
      },
      { label: "data", text: "PostgreSQL · 7 models", layer: "data" },
    ],
  },
  {
    title: "MyBody",
    meta: "Backend developer · Client product",
    description:
      "The API behind a platform where fitness coaches sell programmes and members follow workouts and nutrition plans.",
    href: "https://mybodyapp.ir",
    caseHref: caseStudyHref("mybody"),
    layers: ["data", "backend"],
    steps: [
      {
        label: "clients",
        text: "Member and coach apps",
        edge: "REST + JWT · Socket.IO",
      },
      {
        label: "api",
        text: "NestJS 11 · 30+ modules",
        layer: "backend",
        edge: "Prisma 7",
      },
      {
        label: "data",
        text: "PostgreSQL · 52 models · S3 media",
        layer: "data",
      },
    ],
  },
  {
    image: myca,
    title: site.products.myca.name,
    logo: "/Projects/myca-icon.svg",
    href: site.products.myca.href,
    caseHref: caseStudyHref("maica"),
    layers: ["data", "backend", "interface"],
    description:
      "A Persian PWA that tells drivers when their car's periodic services are due, based on mileage. Co-founded; I built most of the backend.",
  },
  {
    image: moraBlog,
    title: "Mora Blog",
    description:
      "The production blog for Mora, an AI-education platform. Performance work took desktop Lighthouse from 58 to 98.",
    logo: "/Projects/mora-logo.ico",
    caseHref: caseStudyHref("mora-blog"),
    layers: ["data", "backend", "interface"],
  },
  {
    image: moraDash,
    title: "Mora Dashboard",
    logo: "/Projects/mora-logo.ico",
    description:
      "The school-management dashboard behind Mora, an online school: one place to manage students, teachers, classes and the rest of day-to-day administration.",
    layers: ["data", "backend", "interface"],
  },
  {
    image: cleafin,
    title: "Cleafin Marketplace",
    description:
      "An MLM marketplace for selling both digital content and physical products, with stock and user management and multi-language, multi-currency storefronts. The live shop is in German.",
    logo: "/Projects/cleafin-logo.webp",
    href: "https://cleafin.shop",
    layers: ["interface"],
  },
];
