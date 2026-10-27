import SectionHeading from "@/components/ui/SectionHeading";
import { contributions } from "@/lib/open-source";
import { getGithubLink } from "@/lib/utils";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// Contributions to other people's projects (src/lib/open-source.ts). Hidden while the list is empty.
export default function OpenSource({ index }: { index: string }) {
  if (contributions.length === 0) return null;

  const projects = new Set(contributions.map((c) => c.project)).size;

  return (
    <section aria-labelledby="open-source-title">
      <SectionHeading
        index={index}
        kicker="open source"
        title={<span id="open-source-title">Contributions so far</span>}
        description={`${contributions.length} merged contribution${contributions.length === 1 ? "" : "s"} across ${projects} project${projects === 1 ? "" : "s"}.`}
      />
      <ol className="flex flex-col border-t border-divider">
        {contributions.map((c) => (
          <li key={c.href} className="border-b border-divider">
            <Link
              href={c.href}
              target="_blank"
              className={`group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(160px,220px)_minmax(0,1fr)_auto] ${focusRing}`}
            >
              <span className="font-mono text-13 text-ink-faint">
                {c.project}
              </span>
              <span className="text-16 font-semibold text-ink-strong group-hover:underline group-hover:underline-offset-4">
                {c.title}
                <span className="sr-only"> (opens in new tab)</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-1 inline h-4 w-4 text-ink-faint"
                />
              </span>
              <span className="font-mono text-12 text-ink-faint">
                {c.kind} · {c.date}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href={getGithubLink()}
        target="_blank"
        className={`mt-6 inline-flex items-center gap-1 rounded text-18 font-medium text-ink-strong hover:underline hover:underline-offset-4 ${focusRing}`}
      >
        More on GitHub
        <span className="sr-only"> (opens in new tab)</span>
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Link>
    </section>
  );
}
