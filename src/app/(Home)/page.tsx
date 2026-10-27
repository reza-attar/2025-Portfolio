import JsonLd from "@/components/JsonLd";
import { LetsWorkTogether } from "@/components/ui/Widget";
import { contributions } from "@/lib/open-source";
import { websiteGraph } from "@/lib/structured-data";

import Experience from "./sections/Experience";
import GetToKnowMe from "./sections/GetToKnowMe";
import Hero from "./sections/Hero";
import Highlights from "./sections/Highlights";
import NowBuilding from "./sections/NowBuilding";
import OpenSource from "./sections/OpenSource";
import SelectedWork from "./sections/SelectedWork";
import StackLayers from "./sections/StackLayers";

// Section numbers ("// 02 highlights") follow page order; the hero is 01.
// Open source is skipped, and not numbered, while it has no entries.
const sections = [
  Highlights,
  StackLayers,
  NowBuilding,
  SelectedWork,
  ...(contributions.length > 0 ? [OpenSource] : []),
  Experience,
  GetToKnowMe,
];

export default function Home() {
  return (
    <>
      <JsonLd data={websiteGraph()} />
      <main className="w-full space-y-24 p-4 xl:space-y-32">
        <Hero />

        {sections.map((Section, i) => (
          <Section key={i} index={String(i + 2).padStart(2, "0")} />
        ))}

        <LetsWorkTogether />
      </main>
    </>
  );
}
