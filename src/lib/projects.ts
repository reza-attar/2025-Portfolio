import cleafin from "@public/Projects/cleafin.png";
import moraBlog from "@public/Projects/mora-blog.png";
import moraDash from "@public/Projects/mora-dash.png";
import myca from "@public/Projects/myca.png";
import aria from "@public/Projects/aria-electric.png";
import { CardProps } from "@/components/ui/Card";
import { site } from "./site";

export type AlsoBuilt = {
  name: string;
  meta: string;
  description: string;
  stack: string;
  link?: string;
  href?: string;
};

// Smaller builds listed under "Also built" on /works
export const alsoBuilt: AlsoBuilt[] = [
  {
    name: "Ticket Yar",
    meta: "Lead engineer · Dotin",
    description:
      "Multi-tenant AI support platform that connects to Jira and drafts first-line replies to support tickets using retrieval-augmented generation over each business’s own knowledge base.",
    stack: "NestJS, PostgreSQL, pgvector, Vercel AI SDK, locally hosted LLMs",
  },
  {
    name: "Cashio",
    meta: "Own product",
    description:
      "Farsi-first personal finance PWA: expenses, income and investments in one feed, with charts, recaps and CSV export. Custom JWT auth, offline-capable RTL app shell, Jalali calendar, web push. Self-hosted on Debian.",
    stack: "Next.js 15 Server Actions, React 19, Prisma, PostgreSQL, Apache, PM2",
    link: "cashio.ir",
    href: "https://cashio.ir",
  },
  {
    name: "MyBodyApp",
    meta: "Client work",
    description:
      "Backend for a coaching and fitness platform, in active development: real-time messaging over WebSockets with cursor-based history, JWT auth, AWS S3 media storage, Swagger docs, Pino logging, Jest unit and e2e tests.",
    stack: "NestJS, Prisma, PostgreSQL, Socket.IO, Docker",
    link: "mybodyapp.ir",
    href: "https://mybodyapp.ir",
  },
  {
    name: "Persian Medicine Data Matching",
    meta: "Client work",
    description:
      "Matches messy free-text Persian drug descriptions against a 33,000-entry reference database using Persian text normalization, PostgreSQL trigram fuzzy search, and weighted confidence scoring. Low-confidence matches go to human review, and each correction is saved so the system improves over time.",
    stack: "Bun, React, PostgreSQL, Docker",
  },
];

export const projects: CardProps[] = [
  {
    image: myca,
    title: site.products.myca.name,
    logo: "/Projects/myca-icon.svg",
    href: site.products.myca.href,
    description:
      "Myca is an online service to manage and log your car services, get notified when it's due, and more",
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
    image: moraBlog,
    title: "Mora Blog",
    description:
      "Mora Blog designed to teach people about AI, It's content is based on topics and trends of Artificial Intelligence and how people can adapt and write prompts",
    logo: "/Projects/mora-logo.ico",
    href: "https://mora-ed.com",
  },
  {
    image: cleafin,
    title: "Cleafin Marketplace",
    description:
      "MLM Marketplace to manage every aspect of selling online stuff, including digital content or real life products. It has unique features to manage stock, users and ... which supports Multi language websites with different currencies.",
    logo: "/Projects/cleafin-logo.webp",
    href: "https://cleafin.shop",
  },
  {
    image: aria,
    title: "Wordpress Website",
    description:
      "Worked on so many Wordpress projects. this is the most recent one. This website is designed to showcase electric products on their website.",
    logo: "/Projects/wordpress-logo.png",
    href: "https://aria-electric.com",
  },
];
