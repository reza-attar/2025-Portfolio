"use client";

import { buttonVariants } from "@/components/ui/Button";
import { cn, generateEmailLink } from "@/lib/utils";
import { ClassValue } from "clsx";
import { SendHorizontal } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  HTMLInputTypeAttribute,
  SetStateAction,
  useState,
} from "react";

// `email` comes from content/resume.md via the server page
export default function ContactForm({ email }: { email: string }) {
  const [from, setFrom] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // The Send button opens the visitor's mail client; the browser's built-in
  // validation (required, type="email") runs first.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = generateEmailLink({
      to: email,
      subject,
      body: `${body}\n\n${name} <${from}>`,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <InputContainer
          id="email"
          label="Email"
          inputType="email"
          onChange={setFrom}
          placeholder="Enter your email address"
        />
        <InputContainer
          id="name"
          label="Name"
          inputType="text"
          onChange={setName}
          placeholder="Enter your name"
        />
        <InputContainer
          id="subject"
          label="Subject"
          inputType="text"
          onChange={setSubject}
          placeholder="Enter subject"
        />
      </div>

      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        onChange={(e) => setBody(e.target.value)}
        className="border-field-border min-h-80 w-full resize-y rounded-xl border bg-field p-6 text-16 text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        placeholder="Write your message here"
      />

      <div className="mb-6 flex flex-col-reverse gap-4 xl:flex-row xl:items-center xl:justify-between">
        <p className="text-14 text-ink-muted">
          Send opens your email app. No mail app? Write to{" "}
          <a
            href={`mailto:${email}`}
            className="rounded-[3px] text-ink-strong underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {email}
          </a>
          .
        </p>
        <button
          type="submit"
          className={cn(
            "text-18 xl:w-fit",
            buttonVariants({ variant: "primary" }),
          )}
        >
          <SendHorizontal aria-hidden="true" />
          Send
        </button>
      </div>
    </form>
  );
}

type Props = {
  id: string;
  label: string;
  placeholder: string;
  className?: ClassValue;
  inputType: HTMLInputTypeAttribute;
  onChange: Dispatch<SetStateAction<string>>;
};
function InputContainer({
  id,
  label,
  onChange,
  inputType,
  placeholder,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-b border-field-line pb-4 last:border-b-0",
        className,
      )}
    >
      <label htmlFor={id} className="text-16 font-medium text-ink-strong">
        {label}:
      </label>
      <input
        id={id}
        name={id}
        type={inputType}
        required
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 rounded bg-transparent text-16 text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        placeholder={placeholder}
      />
    </div>
  );
}
