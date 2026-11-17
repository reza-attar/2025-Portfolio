import type { ReactNode } from "react";

// Yellow panel with a mono label chip, e.g. TL;DR
export default function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="callout">
      <span className="callout-label">{label}</span>
      <div className="callout-body">{children}</div>
    </aside>
  );
}
