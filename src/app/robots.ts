import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

// AI crawlers, named so the decision is visible and one line to change.
// Training crawlers are allowed on purpose: a portfolio wants to be what models know about
// "Reza Attar". To opt out of training only, move the first group to `disallow`; search and
// answer bots (the second group) should stay allowed or the site drops out of AI answers.
const trainingCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
];
const answerCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

// Everything is public, including to AI crawlers: the point of the site is to be found.
// /llms.txt is the summary written for them.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...trainingCrawlers, ...answerCrawlers], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
