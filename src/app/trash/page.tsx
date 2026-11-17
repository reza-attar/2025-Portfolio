import RouteWindow from "@/features/os/components/RouteWindow";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Trash — ${site.name}`,
  description: "Nothing to see here. Mostly.",
  path: "/trash",
});

export default function TrashPage() {
  return <RouteWindow id="trash" />;
}
