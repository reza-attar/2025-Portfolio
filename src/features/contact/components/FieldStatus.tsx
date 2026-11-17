"use client";

import { AlertCircle, Check } from "lucide-react";
import { AnimatePresence, m } from "motion/react";

const pop = {
  initial: { scale: 0.3, opacity: 0, rotate: -30 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 0.3, opacity: 0 },
  transition: { type: "spring", stiffness: 520, damping: 24 },
} as const;

export function StatusIcon({ status }: { status: "idle" | "valid" | "error" }) {
  return (
    <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {status === "valid" && (
          <m.span key="valid" {...pop} className="text-success">
            <Check className="size-[18px]" strokeWidth={2.5} />
          </m.span>
        )}
        {status === "error" && (
          <m.span key="error" {...pop} className="text-danger">
            <AlertCircle className="size-[18px]" />
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// Slides open under the field; the live region reads the message out once
export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div aria-live="polite">
      <AnimatePresence initial={false}>
        {message && (
          <m.p
            key="error"
            id={id}
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden text-14 text-danger"
          >
            <span className="block pt-2">{message}</span>
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
