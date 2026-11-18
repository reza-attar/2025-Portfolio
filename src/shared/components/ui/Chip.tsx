import type { ReactNode } from "react";

// Mono pill for stack items, tags and small labels
export default function Chip({ children, tone }: { children: ReactNode; tone?: string }) {
  return (
    <span className="chip" style={tone ? { background: tone } : undefined}>
      {children}
    </span>
  );
}
