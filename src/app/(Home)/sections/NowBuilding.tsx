import { buttonVariants } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { caseStudyHref } from "@/lib/case-studies";
import { LayerId, layerBg, layerById } from "@/lib/layers";
import { productLaunch, resume } from "@/lib/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

// The Ticket Yar pipeline, one step per box. Details live in the case study (src/lib/case-studies.ts).
const pipeline: { layer: LayerId; title: string; detail: ReactNode }[] = [
  {
    layer: "backend",
    title: "Pull",
    detail:
      "Adapters queue tickets for each business from Jira, Confluence and other systems.",
  },
  {
    layer: "ai",
    title: "Classify",
    detail:
      "The model labels each ticket inside a Zod schema, so the output is typed, not free text.",
  },
  {
    layer: "data",
    title: "Retrieve",
    detail:
      "Semantic search over the team's own knowledge, embedded in PostgreSQL with pgvector.",
  },
  {
    layer: "ai",
    title: "Draft",
    detail: (
      <>
        A Persian reply, or an honest{" "}
        <code className="font-mono text-11 text-ink-strong [overflow-wrap:anywhere]">
          INSUFFICIENT_KNOWLEDGE
        </code>{" "}
        instead of a guess.
      </>
    ),
  },
  {
    layer: "interface",
    title: "Approve",
    detail:
      "A support agent approves, edits or rejects. Nothing reaches a customer unreviewed.",
  },
];

export default function NowBuilding() {
  const name = resume.product.name;

  return (
    <section aria-labelledby="now-building-title">
      <SectionHeading
        index="03"
        kicker="now building"
        title={
          <span id="now-building-title">
            An AI layer that knows when not to answer
          </span>
        }
        description={`${name} reads support tickets from Jira, Confluence and other systems, finds what the team already knows, and drafts a reply for a person to approve. It launched in ${productLaunch.month}. I work on it at ${resume.company}, a banking-software company, from the database up.`}
      />

      <div className="bg-dot-grid rounded-4xl border border-panel-border bg-panel p-4 sm:p-6 xl:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 font-mono text-12 text-ink-faint">
          <span>{name.toLowerCase().replace(" ", "-")} · pipeline</span>
          <span>
            {resume.product.role.toLowerCase()} · launched{" "}
            {productLaunch.month.toLowerCase()}
          </span>
        </div>

        <ol className="grid gap-3 lg:grid-cols-5">
          {pipeline.map((step, i) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-2 rounded-2xl border border-panel-border bg-background p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-12 text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-12 uppercase text-ink-faint">
                  <span
                    aria-hidden="true"
                    className={cn("h-2 w-2 rounded-sm", layerBg[step.layer])}
                  />
                  {layerById[step.layer].name}
                </span>
              </div>
              <h3 className="text-18 font-bold text-ink-strong">
                {step.title}
              </h3>
              <p className="text-pretty text-14 leading-[1.5] text-ink-muted">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 font-mono text-12 text-ink-faint">
          <span aria-hidden="true">↺ </span>approved replies go back to the
          ticketing system
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <Link
          href={caseStudyHref("ticket-yar")}
          className={cn(
            "text-18 sm:w-fit",
            buttonVariants({ variant: "primary" }),
          )}
        >
          Read the {name} case study
        </Link>
        <p className="text-14 text-ink-muted">
          Internal tool, so no public link. A short demo is available on
          request.
        </p>
      </div>
    </section>
  );
}
