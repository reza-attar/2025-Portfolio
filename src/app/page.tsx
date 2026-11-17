import JsonLd from "@/shared/components/JsonLd";
import RouteWindow from "@/features/os/components/RouteWindow";
import { websiteGraph, profilePage } from "@/lib/structured-data";

// about.md (metadata: the site title, from the root layout)
export default function Home() {
  return (
    <>
      <JsonLd data={websiteGraph()} />
      <JsonLd data={profilePage()} />
      <RouteWindow id="about" />
    </>
  );
}
