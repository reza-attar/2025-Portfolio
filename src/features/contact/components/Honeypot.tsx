"use client";

import { useFormContext } from "react-hook-form";
import type { ContactFormInput } from "../schema";

// Invisible to people and screen readers; bots that fill every input fill this one too
export default function Honeypot() {
  const { register } = useFormContext<ContactFormInput>();
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
    </div>
  );
}
