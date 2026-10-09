import { projects } from "@/lib/projects";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

function SelectedWork({ className }: { className?: ClassValue }) {
  return (
    <section aria-label="selected work" className={cn(className)}>
      <h2 className="mb-4 text-32 font-bold xl:mb-8 xl:text-48">
        Selected Work
      </h2>
      <div className="space-y-9">
        {projects.map((project) => (
          <Card {...project} key={String(project.title)} />
        ))}
      </div>
    </section>
  );
}

export default SelectedWork;
