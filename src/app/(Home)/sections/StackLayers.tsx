import SectionHeading from "@/components/ui/SectionHeading";
import { layerBg, layers } from "@/lib/layers";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StackLayers() {
  return (
    <section aria-labelledby="stack-layers-title">
      <SectionHeading
        index="02"
        kicker="the stack, layer by layer"
        title={
          <span id="stack-layers-title">
            One engineer, the whole request path
          </span>
        }
        description="Most products break at the joins: a schema the API fights, a model answer the UI can't trust. I work on every layer, so the joins are mine too."
      />

      <ol className="border-t border-divider">
        {layers.map((layer) => (
          <li
            key={layer.id}
            className="grid gap-4 border-b border-divider py-7 md:grid-cols-[150px_minmax(0,1fr)_200px] md:gap-8 xl:py-9"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:content-start">
              <span
                aria-hidden="true"
                className={cn("h-3 w-3 rounded-sm", layerBg[layer.id])}
              />
              <p className="font-mono text-12 text-ink-faint">{layer.index}</p>
              <h3 className="text-24 font-bold text-ink-strong md:basis-full">
                {layer.name}
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-pretty text-16 leading-[1.55] text-ink-muted xl:text-18">
                {layer.summary}
              </p>
              <ul
                aria-label={`${layer.name} stack`}
                className="flex flex-wrap gap-2"
              >
                {layer.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-tag-border bg-tag px-2 py-1 font-mono text-12 text-tag-fg"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-1 rounded-2xl border border-panel-border bg-panel p-4 md:border-0 md:bg-transparent md:p-0">
              <p className="text-24 font-extrabold tracking-[-0.01em] text-ink-strong">
                {layer.metric.value}
              </p>
              <p className="text-14 leading-snug text-ink-muted">
                {layer.metric.caption}
              </p>
              {layer.href && (
                <Link
                  href={layer.href}
                  className="mt-2 inline-flex w-fit items-center gap-1 rounded text-14 font-medium text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
                >
                  See it in a case study
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
