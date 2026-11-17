import RouteWindow from "@/features/os/components/RouteWindow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `stack.sh — ${site.name}`,
  description: "The tools I use, from the database to the interface.",
  path: "/stack",
});

export default function StackPage() {
  return <RouteWindow id="stack" />;
}
