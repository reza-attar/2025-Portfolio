"use client";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Send, SendHorizontal } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useFormState } from "react-hook-form";

const swap = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.18 },
} as const;

export default function SubmitButton() {
  const { isSubmitting } = useFormState();

  return (
    <m.button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group text-18 xl:w-[160px]",
        buttonVariants({ variant: "primary" }),
        "overflow-hidden transition-opacity disabled:cursor-wait",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitting ? (
          <m.span key="sending" {...swap} className="flex items-center gap-2">
            {/* The plane keeps taking off until the server answers */}
            <m.span
              aria-hidden="true"
              animate={{ x: [-10, 0, 16], y: [8, 0, -12], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Send className="size-5" />
            </m.span>
            Sending…
          </m.span>
        ) : (
          <m.span key="idle" {...swap} className="flex items-center gap-2">
            <SendHorizontal
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-12"
            />
            Send
          </m.span>
        )}
      </AnimatePresence>
    </m.button>
  );
}
