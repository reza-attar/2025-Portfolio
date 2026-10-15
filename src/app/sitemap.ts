import { caseStudies, caseStudyHref } from "@/lib/case-studies";
import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

// Built with the site, so lastModified is the last deploy
const built = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/works",
    "/resume",
    "/contact",
    ...caseStudies.map((s) => caseStudyHref(s.slug)),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: built,
  }));
}
