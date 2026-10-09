import type { Metadata } from "next";
import { site } from "./site";

// Per-page title, description, canonical URL and share-card tags.
// `path` is relative to site.url, e.g. "/about".
export function pageMetadata({
  title,
  description = `${site.role} · ${site.focus}`,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: "/og", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og"],
    },
  };
}
