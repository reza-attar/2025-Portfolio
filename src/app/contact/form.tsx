"use client";

import { buttonVariants } from "@/components/ui/Button";
import { cn, generateEmailLink } from "@/lib/utils";
import { ClassValue } from "clsx";
import { SendHorizontal } from "lucide-react";
import {
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  useState,
} from "react";

export default function ContactForm() {
  const [from, setFrom] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");

  return (
    <>
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
        onChange={(e) => setBody(e.target.value)}
        className="border-field-border min-h-80 w-full resize-y rounded-xl border bg-field p-6 text-16 text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        placeholder="Write your message here"
      />

      <a
        href={generateEmailLink({
          subject,
          body: `This email is from ${name} ${from}, ${body}`,
        })}
        className={cn(
          "mb-6 text-18 xl:w-fit xl:self-end",
          buttonVariants({ variant: "primary" }),
        )}
      >
        <SendHorizontal aria-hidden="true" />
        Send
      </a>
    </>
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
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 rounded bg-transparent text-16 text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        placeholder={placeholder}
      />
    </div>
  );
}
