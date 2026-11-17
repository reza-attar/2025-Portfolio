import type { ReactNode } from "react";

// Pill with a status dot, e.g. "Senior Engineer @ Dotin"
export default function StatusBadge({ tone = "green", children }: { tone?: "green" | "yellow"; children: ReactNode }) {
  return (
    <span className={`status status-${tone}`}>
      <span className="status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
