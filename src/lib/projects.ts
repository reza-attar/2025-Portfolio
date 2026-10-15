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
    name: "Ticket Yar",
    meta: `${resume.product.role} · ${resume.company}`,
    description:
      "An internal tool that reads support tickets from Jira, finds relevant knowledge, and drafts a reply in Persian for a human agent to approve.",
    stack: "NestJS, Prisma + PostgreSQL, Vercel AI SDK + Zod, Jira",
    caseHref: caseStudyHref("ticket-yar"),
    layers: ["data", "backend", "ai", "interface"],
  },
  {
    name: "MyBody",
    meta: "Backend developer · Client product",
    description:
      "The API behind a platform where fitness coaches sell programmes and members follow workouts and nutrition plans.",
    stack: "NestJS 11, Prisma 7, PostgreSQL, Socket.IO, Zarinpal",
    link: "mybodyapp.ir",
    href: "https://mybodyapp.ir",
    caseHref: caseStudyHref("mybody"),
    layers: ["data", "backend"],
  },
  {
    name: "Medicine matching",
    meta: "Sole developer · Client prototype",
    description:
      "Matches messy Persian drug names to a 33.8K-drug registry and sends uncertain matches to a person for review.",
    stack: "Bun, PostgreSQL + pg_trgm, React, Docker",
    caseHref: caseStudyHref("medicine-matching"),
    layers: ["data", "backend", "interface"],
  },
  {
    name: "Cashio",
    meta: "Solo builder · Own product",
    description:
      "A Farsi-first personal finance PWA for tracking expenses, income, debts and investments.",
    stack: "Next.js 15, Prisma 7, PostgreSQL, Web Push",
    link: "mycashio.ir",
    href: "https://mycashio.ir",
    caseHref: caseStudyHref("cashio"),
    layers: ["data", "backend", "interface"],
  },
];

export const projects: CardProps[] = [
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
