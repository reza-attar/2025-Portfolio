import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import { ProjectPlaceholder } from "@/components/ui/Widget";
import { alsoBuilt, projects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus";

export default function WorksPage() {
  return (
    <main className="mt-20 w-full max-w-screen-lg space-y-16 [&>*]:px-4">
      <section className="max-w-[80%] space-y-2">
        <h1 className="text-balance text-48 font-bold leading-[1.1] text-ink-strong xl:text-80">
          Projects
        </h1>
        <p className="text-16 text-ink-faint xl:text-24">
          Projects and ideas I’ve worked on
        </p>
      </section>

      <Divider className="w-full" />

      <div className="space-y-4">
        {projects.map((project) => (
          <Card {...project} key={project.href} />
        ))}
        <ProjectPlaceholder />
      </div>

      <section aria-label="more projects" className="space-y-6">
        <h2 className="text-32 font-bold text-ink-strong">Also built</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-4">
          {alsoBuilt.map((project) => (
            <article
              key={project.name}
              className="flex flex-col gap-3 rounded-3xl border border-panel-border bg-panel p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="text-20 font-extrabold text-ink-strong">
                  {project.name}
                </h3>
                {project.link && project.href && (
                  <Link
                    href={project.href}
                    target="_blank"
                    aria-label={`${project.link} (opens in new tab)`}
                    className={cn(
                      "rounded-[3px] text-14 text-ink-strong underline underline-offset-4 hover:text-ink-strong",
                      focusRing,
                      "focus-visible:outline-offset-2",
                    )}
                  >
                    {project.link}
                  </Link>
                )}
              </div>
              <p className="text-14 font-semibold tracking-[.04em] text-ink-label">
                {project.meta}
              </p>
              <p className="text-pretty text-15 leading-[1.6] text-ink-muted">
                {project.description}
              </p>
              <p className="mt-auto pt-2 text-14 leading-normal text-ink-muted">
                <span className="font-medium text-ink-strong">Stack:</span>{" "}
                {project.stack}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
