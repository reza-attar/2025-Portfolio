import RouteWindow from "@/features/os/components/RouteWindow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `resume.pdf — ${site.name}`,
  description: "Experience, projects, skills, awards and education. Download the PDF.",
  path: "/resume",
});

export default function ResumePage() {
  return <RouteWindow id="resume" />;
}
