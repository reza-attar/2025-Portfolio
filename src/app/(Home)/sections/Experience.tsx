import SectionHeading from "@/components/ui/SectionHeading";
import { resume } from "@/lib/resume";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// Every position, newest first: the lead bullet is visible, the rest fold away.
export default function Experience({ index }: { index: string }) {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <SectionHeading
        index={index}
        kicker="experience"
        title={<span id="experience-title">Where I&apos;ve worked</span>}
        description={`${resume.experienceYears} of production JavaScript and TypeScript, from front-end to backend and AI.`}
      />
      <ol className="flex flex-col border-t border-divider">
        {resume.experience.map((job) => {
          const [lead, ...rest] = job.groups.flatMap((g) => g.bullets);
          return (
            <li
              key={job.company}
              className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-divider py-6 sm:grid-cols-[minmax(140px,200px)_minmax(0,1fr)]"
            >
              <span className="text-14 text-ink-muted">{job.period}</span>
              <div className="space-y-2">
                <h3 className="text-18 font-bold text-ink-strong">
                  {job.company}{" "}
                  <span className="font-medium text-ink-muted">
                    · {job.role}
                  </span>
                </h3>
                <p className="font-mono text-12 text-ink-faint">
                  {job.location}
                </p>
                {lead && (
                  <p className="text-pretty text-15 leading-[1.6] text-ink-muted">
                    {lead}
                  </p>
                )}
                {rest.length > 0 && (
                  <details className="group">
                    <summary
                      className={`w-fit cursor-pointer list-none rounded text-14 font-medium text-ink-strong hover:underline hover:underline-offset-4 ${focusRing}`}
                    >
                      <span className="group-open:hidden">
                        {rest.length} more
                      </span>
                      <span className="hidden group-open:inline">Less</span>
                    </summary>
                    <ul className="mt-2 list-disc space-y-1.5 text-pretty pl-5 text-15 leading-[1.6] text-ink-muted">
                      {rest.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <Link
        href={"/resume#experience"}
        className={`mt-6 inline-flex items-center gap-1 rounded text-18 font-medium text-ink-strong hover:underline hover:underline-offset-4 ${focusRing}`}
      >
        Full resume
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Link>
    </section>
  );
}
