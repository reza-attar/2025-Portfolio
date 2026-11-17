import RouteWindow from "@/features/os/components/RouteWindow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `~/projects — ${site.name}`,
  description: "Products I built end to end: an AI support platform, a finance PWA, a coaching API, and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <RouteWindow id="projects" />;
}
