import { LayerId, layerBg, layers } from "@/lib/layers";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

// Four segments, data → interface. The layers a project touched are coloured in.
export default function LayerStrip({
  active,
  className,
}: {
  active: LayerId[];
  className?: ClassValue;
}) {
  const names = layers.filter((l) => active.includes(l.id)).map((l) => l.name);

  return (
    <div className={cn("w-full max-w-[360px]", className)}>
      <p className="sr-only">Layers I worked on: {names.join(", ")}</p>
      <div aria-hidden="true" className="grid grid-cols-4 gap-1">
        {layers.map((layer) => {
          const on = active.includes(layer.id);
          return (
            <div key={layer.id} className="space-y-1.5">
              <div
                className={cn(
                  "h-1.5 rounded-full",
                  on ? layerBg[layer.id] : "bg-divider",
                )}
              />
              <p
                className={cn(
                  "truncate font-mono text-[10px] uppercase tracking-[-0.02em] sm:text-[11px] sm:tracking-normal",
                  on ? "text-ink-muted" : "text-ink-faint opacity-50",
                )}
              >
                {layer.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
