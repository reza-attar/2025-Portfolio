import RouteWindow from "@/features/os/components/RouteWindow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Contact — ${site.name}`,
  description: "Open to roles in the Netherlands and Germany, and EU remote. Email, GitHub, LinkedIn.",
  path: "/contact",
});

export default function ContactPage() {
  return <RouteWindow id="contact" />;
}
