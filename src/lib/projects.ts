import cleafin from "@public/Projects/cleafin.png";
import moraBlog from "@public/Projects/mora-blog.png";
import moraDash from "@public/Projects/mora-dash.png";
import myca from "@public/Projects/myca.png";
import { CardProps } from "@/components/ui/Card";
import { caseStudyHref } from "./case-studies";
import { site } from "./site";

export type MoreCaseStudy = {
  name: string;
  meta: string;
  description: string;
  stack: string;
  caseHref: string;
  link?: string;
  href?: string;
};

// Listed under "More case studies" on /works
export const moreCaseStudies: MoreCaseStudy[] = [
  {
    name: "Ticket Yar",
    meta: "Technical lead · Dotin",
    description:
      "An internal tool that reads support tickets from Jira, finds relevant knowledge, and drafts a reply in Persian for a human agent to approve.",
    stack: "NestJS, Prisma + PostgreSQL, Vercel AI SDK + Zod, Jira",
    caseHref: caseStudyHref("ticket-yar"),
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
  },
  {
    name: "Medicine matching",
    meta: "Sole developer · Client prototype",
    description:
      "Matches messy Persian drug names to a 33.8K-drug registry and sends uncertain matches to a person for review.",
    stack: "Bun, PostgreSQL + pg_trgm, React, Docker",
    caseHref: caseStudyHref("medicine-matching"),
  },
  {
    name: "Cashio",
    meta: "Solo builder · Own product",
    description:
      "A Farsi-first personal finance PWA for tracking expenses, income, debts and investments.",
    stack: "Next.js 15, Prisma 7, PostgreSQL, Web Push",
    link: "cashio.ir",
    href: "https://cashio.ir",
    caseHref: caseStudyHref("cashio"),
  },
];

export const projects: CardProps[] = [
  {
    image: myca,
    title: site.products.myca.name,
    logo: "/Projects/myca-icon.svg",
    href: site.products.myca.href,
    caseHref: caseStudyHref("maica"),
    description:
      "A Persian PWA that tells drivers when their car's periodic services are due, based on mileage. Co-founded; I built most of the backend.",
  },
  {
    image: moraBlog,
    title: "Mora Blog",
    description:
      "The production blog for Mora, an AI-education platform. Performance work took desktop Lighthouse from 58 to 98.",
    logo: "/Projects/mora-logo.ico",
    href: "https://mora-ed.com",
    caseHref: caseStudyHref("mora-blog"),
  },
  {
    image: moraDash,
    title: "Mora Dashboard",
    logo: "/Projects/mora-logo.ico",
    href: "https://demo.mora-ed.com",
    description:
      "Mora is an online school platform developed to manage students teachers and every aspect of school management",
  },
  {
    image: cleafin,
    title: "Cleafin Marketplace",
    description:
      "MLM Marketplace to manage every aspect of selling online stuff, including digital content or real life products. It has unique features to manage stock, users and ... which supports Multi language websites with different currencies.",
    logo: "/Projects/cleafin-logo.webp",
    href: "https://cleafin.shop",
  },
];
