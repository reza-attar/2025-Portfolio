import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { CSSProperties } from "react";

// Soft circles in the four layer colours, drifting behind the hero, plus two thin oval
// orbits turning slowly. Pure CSS, decorative, and still for reduced motion.
// The softness comes from a radial gradient, not a blur filter: a large animated blur is
// repainted every frame and kept phones' main thread busy (slow LCP and TBT in PageSpeed),
// while a gradient is painted once and the drift runs on the compositor. `scale` (separate
// from the animated `transform`) grows each circle to the size the blur used to spread to.
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
            "absolute opacity-25 will-change-transform [scale:1.7] motion-safe:animate-[orb-drift_var(--d)_ease-in-out_infinite_alternate] dark:opacity-20",
            blob.className,
          )}
          style={
            {
              background: `radial-gradient(closest-side, ${blob.color} 25%, transparent)`,
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
