"use client";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import SentMark from "./SentMark";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
} as const;

type Props = { email: string; onReset: () => void };

export default function SentState({ email, onReset }: Props) {
  return (
    <m.div
      variants={list}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
      className="flex min-h-[460px] flex-col items-center justify-center gap-4 pb-16 pt-10 text-center"
    >
      <SentMark />
      <m.h3
        variants={item}
        tabIndex={-1}
        // Move focus here so keyboard and screen reader users hear the outcome
        ref={(el) => el?.focus({ preventScroll: true })}
        className="mt-2 text-24 font-bold text-ink-strong outline-none xl:text-32"
      >
        Message sent
      </m.h3>
      <m.p variants={item} className="max-w-sm text-16 text-ink-muted">
        Thanks for writing. It&apos;s in my inbox now, and I&apos;ll reply to{" "}
        <span className="font-medium text-ink-strong">{email}</span>, usually
        within two days.
      </m.p>
      <m.button
        variants={item}
        type="button"
        onClick={onReset}
        whileTap={{ scale: 0.96 }}
        className={cn(buttonVariants({ variant: "secondary" }), "mt-2 w-fit text-16 transition-opacity")}
      >
        Write another message
      </m.button>
    </m.div>
  );
}
