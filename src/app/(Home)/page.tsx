import { LetsWorkTogether } from "@/components/ui/Widget";

import GetToKnowMe from "./sections/GetToKnowMe";
import Hero from "./sections/Hero";
import NowBuilding from "./sections/NowBuilding";
import SelectedWork from "./sections/SelectedWork";
import StackLayers from "./sections/StackLayers";

export default function Home() {
  return (
    <main className="w-full space-y-24 p-4 xl:space-y-32">
      <Hero />

      <StackLayers />

      <NowBuilding />

      <SelectedWork />

      <GetToKnowMe />

      <LetsWorkTogether />
    </main>
  );
}
