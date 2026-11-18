import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

// Built with the site, so lastModified is the last deploy
const built = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/projects", "/stack", "/resume", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: built,
  }));
}
