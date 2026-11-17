import JsonLd from "@/shared/components/JsonLd";
import RouteWindow from "@/features/os/components/RouteWindow";
import { getCaseStudy } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { breadcrumbs } from "@/lib/structured-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — ${site.name}`, description: getCaseStudy(p.slug)?.lede, path: `/projects/${p.slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />
      <RouteWindow id={`project:${p.slug}`} />
    </>
  );
}
