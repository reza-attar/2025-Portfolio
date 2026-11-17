"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import type { KeyboardEvent } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { CONTACT_LIMITS, type ContactFormInput } from "../schema";
import { FieldError } from "./FieldStatus";

const { min, max } = CONTACT_LIMITS.message;

// ⌘/Ctrl + Enter sends from inside the message, like most mail apps
function sendOnModEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
  }
}

export default function MessageField() {
  const { register, getFieldState } = useFormContext<ContactFormInput>();
  const { error } = getFieldState("message", useFormState({ name: "message" }));
  const length = (useWatch<ContactFormInput, "message">({ name: "message" }) ?? "").trim().length;

  const ready = length >= min;
  const tone = length > max ? "danger" : length > max * 0.9 ? "warn" : ready ? "success" : "idle";
  const counter = ready || length === 0 ? `${length} / ${max}` : `${min - length} more to go`;

  return (
    <div data-field="message" className="flex flex-col">
      <label htmlFor="message" className="sr-only">Message</label>
      <textarea
        id="message"
        placeholder="Write your message here"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "message-error message-count" : "message-count"}
        onKeyDown={sendOnModEnter}
        {...register("message")}
        className={cn(
          "min-h-80 w-full resize-y rounded-xl border border-field-line bg-field p-6 text-16 text-ink caret-focus outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-faint",
          "focus:border-focus focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--focus-ring)_18%,transparent)]",
          error && "border-danger focus:border-danger focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--danger)_18%,transparent)]",
        )}
      />
      <div className="mt-2 flex items-center gap-3 px-1">
        <div aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-field-line">
          <m.div
            className={cn("h-full origin-left rounded-full transition-colors duration-300", {
              "bg-ink-faint": tone === "idle",
              "bg-success": tone === "success",
              "bg-warn": tone === "warn",
              "bg-danger": tone === "danger",
            })}
            initial={false}
            animate={{ scaleX: Math.min(length / min, 1) }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        </div>
        <span
          id="message-count"
          className={cn("text-12 tabular-nums transition-colors", {
            "text-ink-faint": tone === "idle" || tone === "success",
            "text-warn": tone === "warn",
            "text-danger": tone === "danger",
          })}
        >
          {counter}
        </span>
      </div>
      <FieldError id="message-error" message={error?.message} />
    </div>
  );
}
