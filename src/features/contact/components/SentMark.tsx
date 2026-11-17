"use client";

import { m } from "motion/react";

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration: 0.5, ease: "easeOut" }, opacity: { delay, duration: 0.01 } },
}) as const;

// A circle draws itself, the check follows, and a ring ripples out once
export default function SentMark() {
  return (
    <div aria-hidden="true" className="relative grid size-20 place-items-center text-success">
      <m.span
        className="absolute inset-0 rounded-full border-2 border-current"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.7], opacity: [0, 0.35, 0] }}
        transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
      />
      <m.svg
        viewBox="0 0 80 80"
        className="size-20"
        initial={{ scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <m.circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="3" {...draw(0.05)} />
        <m.path
          d="M25 41 l10 10 l20 -22"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw(0.4)}
        />
      </m.svg>
    </div>
  );
}
