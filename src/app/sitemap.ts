import { caseStudies, caseStudyHref } from "@/lib/case-studies";
import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/works",
    "/contact",
    "/resume",
    ...caseStudies.map((s) => caseStudyHref(s.slug)),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
  }));
}
