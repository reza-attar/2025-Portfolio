import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

// Everything is public, including to AI crawlers: the point of the site is to be found.
// /llms.txt is the summary written for them.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
