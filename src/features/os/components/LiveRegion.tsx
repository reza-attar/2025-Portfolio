"use client";
import { useWM } from "../store/wm-store";

// Announces window changes ("about.md opened", "~/projects minimized", "snapped left")
export default function LiveRegion() {
  const { text, n } = useWM((s) => s.announcement);
  // A trailing non-breaking space on every other message makes repeats announce again
  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {text}
      {n % 2 ? " " : ""}
    </div>
  );
}
