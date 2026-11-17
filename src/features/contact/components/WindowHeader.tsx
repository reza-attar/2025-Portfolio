"use client";

import Close from "@public/Contact Window/close.svg";
import Fullscreen from "@public/Contact Window/fullscreen.svg";
import Minimize from "@public/Contact Window/minimize.svg";
import { AnimatePresence, m } from "motion/react";
import { useWatch } from "react-hook-form";
import type { ContactFormInput } from "../schema";

// Like a mail app, the window title follows the subject as it's typed
export default function WindowHeader({ sent }: { sent: boolean }) {
  const subject = useWatch<ContactFormInput, "subject">({ name: "subject" });
  const trimmed = subject?.trim();
  const key = sent ? "sent" : trimmed ? "subject" : "new";
  const title = sent ? "Sent" : trimmed || "New message";

  return (
    <div className="relative border-b border-win-line py-4 text-center">
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-2 p-1"
      >
        <Close />
        <Minimize />
        <Fullscreen />
      </div>
      <h2 className="mx-auto max-w-[55%] truncate text-16 font-medium text-ink-strong xl:max-w-[70%]">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={key}
            className="inline-block"
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.18 }}
          >
            {title}
          </m.span>
        </AnimatePresence>
      </h2>
    </div>
  );
}
