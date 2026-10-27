import SectionHeading from "@/components/ui/SectionHeading";
import { highlights } from "@/lib/highlights";
import Link from "next/link";

// A quick summary of the work before the details: the numbers first, the full job listing later.
export default function Highlights({ index }: { index: string }) {
  return (
    <section id="highlights" aria-labelledby="highlights-title">
      <SectionHeading
        index={index}
        kicker="highlights"
        title={<span id="highlights-title">The short version</span>}
        description="A few results I'm proud of. The full job listing is further down."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex h-full flex-col gap-1 rounded-2xl border border-panel-border bg-panel p-5 transition-colors hover:border-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <span className="text-32 font-extrabold leading-tight tracking-[-0.02em] text-ink-strong">
                {item.value}
              </span>
              <span className="text-15 font-semibold text-ink-strong">
                {item.label}
              </span>
              <span className="text-pretty text-14 leading-[1.5] text-ink-muted">
                {item.context}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
