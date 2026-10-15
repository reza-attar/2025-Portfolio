import { layers, layerBg, layerVar } from "@/lib/layers";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { CSSProperties } from "react";

// Seconds for one request to travel from the first node to the last.
// Each node pings when the packet reaches it.
const STEP = 2;
const DURATION = STEP * (layers.length - 1);

export default function SystemDiagram({
  className,
}: {
  className?: ClassValue;
}) {
  return (
    <figure
      className={cn(
        "bg-dot-grid rounded-4xl border border-panel-border bg-panel p-5 sm:p-8",
        className,
      )}
    >
      <figcaption className="mb-6 flex items-center justify-between gap-4 font-mono text-12 text-ink-faint">
        <span>request path</span>
        <span aria-hidden="true">schema → interface</span>
      </figcaption>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-3 top-8 w-px -translate-x-1/2 bg-sep"
        >
          <span
            className="absolute left-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-strong shadow-[0_0_12px_2px_var(--ink-faint)] motion-safe:block motion-safe:animate-[packet_var(--d)_linear_infinite]"
            style={{ "--d": `${DURATION}s` } as CSSProperties}
          />
        </div>

        <ol aria-label="The layers I build, from database to interface">
          {layers.map((layer, i) => (
            <li key={layer.id}>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-panel-border bg-background motion-safe:animate-[node-ping_var(--d)_linear_infinite]"
                  style={
                    {
                      "--node": layerVar[layer.id],
                      "--d": `${DURATION}s`,
                      animationDelay: `${i * STEP - DURATION * 0.04}s`,
                    } as CSSProperties
                  }
                >
                  <span
                    className={cn("h-2.5 w-2.5 rounded-sm", layerBg[layer.id])}
                  />
                </span>
                <div className="flex h-16 min-w-0 flex-1 flex-col justify-center rounded-2xl border border-panel-border bg-background px-4">
                  <span className="font-mono text-12 uppercase text-ink-faint">
                    {layer.index} / {layer.name}
                  </span>
                  <span className="truncate text-15 font-semibold text-ink-strong sm:text-16">
                    {layer.tech}
                  </span>
                </div>
              </div>
              {layer.edge && (
                <p className="py-2 pl-10 font-mono text-12 text-ink-faint">
                  <span aria-hidden="true">↓ </span>
                  <span className="sr-only">connected through </span>
                  {layer.edge}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
