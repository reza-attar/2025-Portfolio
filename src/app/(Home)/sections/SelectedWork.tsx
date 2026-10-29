import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function SelectedWork({
  index,
  className,
}: {
  index: string;
  className?: ClassValue;
}) {
  return (
    <section aria-labelledby="selected-work-title" className={cn(className)}>
      <SectionHeading
        index={index}
        kicker="selected work"
        title={<span id="selected-work-title">Shipped, end to end</span>}
        description="The strip under each project shows which layers I built myself."
      />
      <div className="space-y-6 xl:space-y-9">
        {projects.map((project) => (
          <Card {...project} key={String(project.title)} />
        ))}
      </div>
      <Link
        href="/works"
        className="mt-8 inline-flex items-center gap-1 rounded text-18 font-medium text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
      >
        All projects and case studies
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Link>
    </section>
  );
}

export default SelectedWork;
