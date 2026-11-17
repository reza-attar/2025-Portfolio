"use client";

import { AlertTriangle } from "lucide-react";
import { AnimatePresence, m } from "motion/react";

// Shown when the server couldn't take the message; the mail link always works
export default function ServerError({ message, email }: { message: string | null; email: string }) {
  return (
    <div aria-live="assertive">
      <AnimatePresence initial={false}>
        {message && (
          <m.div
            key="server-error"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--danger)_7%,transparent)] p-4 text-14 text-ink">
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
              <p>
                {message} Your text is still here, so try again, or write to{" "}
                <a href={`mailto:${email}`} className="font-medium text-ink-strong underline underline-offset-[3px]">
                  {email}
                </a>
                .
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
