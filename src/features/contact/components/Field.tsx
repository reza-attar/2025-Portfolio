"use client";

import { cn } from "@/lib/utils";
import type { HTMLInputTypeAttribute } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import type { ContactField, ContactFormInput } from "../schema";
import { FieldError, StatusIcon } from "./FieldStatus";

type Props = {
  name: Exclude<ContactField, "message">;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: string;
};

// One "To:/Subject:"-style row: an underline grows in on focus, an icon says how it's going
export default function Field({ name, label, type, placeholder, autoComplete }: Props) {
  const { register, getFieldState } = useFormContext<ContactFormInput>();
  const { error, isDirty, isTouched } = getFieldState(name, useFormState({ name }));
  const status = error ? "error" : isDirty && isTouched ? "valid" : "idle";
  const errorId = `${name}-error`;

  return (
    <div data-field={name} className="group">
      <div className="relative flex items-center gap-2 border-b border-field-line pb-4">
        <label
          htmlFor={name}
          className={cn(
            "text-16 font-medium text-ink-strong transition-colors duration-200 group-focus-within:text-focus",
            error && "text-danger group-focus-within:text-danger",
          )}
        >
          {label}:
        </label>
        <input
          id={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...register(name)}
          className="min-w-0 flex-1 bg-transparent text-16 text-ink caret-focus outline-none placeholder:text-ink-faint placeholder:transition-opacity focus:placeholder:opacity-50"
        />
        <StatusIcon status={status} />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-focus transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100",
            error && "scale-x-100 bg-danger",
          )}
        />
      </div>
      <FieldError id={errorId} message={error?.message} />
    </div>
  );
}
