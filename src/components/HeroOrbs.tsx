import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { CSSProperties } from "react";

// Soft blurred circles in the four layer colours, drifting behind the hero, plus two thin
// oval orbits turning slowly. Pure CSS, decorative, and still for reduced motion.
const blobs = [
  {
    color: "var(--layer-data)",
    className: "left-[-10%] top-[5%] h-72 w-72",
    d: "18s",
  },
  {
    color: "var(--layer-ai)",
    className: "right-[-5%] top-[0%] h-80 w-[26rem]",
    d: "22s",
  },
  {
    color: "var(--layer-interface)",
    className: "bottom-[0%] right-[20%] h-64 w-64",
    d: "20s",
  },
  {
    color: "var(--layer-backend)",
    className: "bottom-[10%] left-[15%] h-56 w-72",
    d: "24s",
  },
];

export default function HeroOrbs({ className }: { className?: ClassValue }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 print:hidden",
        className,
      )}
    >
      {blobs.map((blob, i) => (
        <span
          key={i}
          className={cn(
            "absolute rounded-full opacity-25 blur-3xl motion-safe:animate-[orb-drift_var(--d)_ease-in-out_infinite_alternate] dark:opacity-20",
            blob.className,
          )}
          style={
            {
              background: blob.color,
              "--d": blob.d,
              animationDelay: `${-i * 4}s`,
            } as CSSProperties
          }
        />
      ))}

      <span className="absolute left-1/2 top-1/2 h-[min(70vw,560px)] w-[min(110vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-sep motion-safe:animate-[orbit-spin_60s_linear_infinite]" />
      <span className="absolute left-1/2 top-1/2 h-[min(90vw,720px)] w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-sep motion-safe:animate-[orbit-spin_90s_linear_infinite_reverse]" />
    </div>
  );
}
