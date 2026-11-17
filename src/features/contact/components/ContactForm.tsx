"use client";

import { m, useReducedMotion } from "motion/react";
import { useAnimate } from "motion/react-mini";
import { useState } from "react";
import { useFormContext, type FieldErrors } from "react-hook-form";
import { sendContactMessage } from "../actions";
import type { ContactField, ContactFormInput, ContactFormValues } from "../schema";
import Field from "./Field";
import FormFooter from "./FormFooter";
import Honeypot from "./Honeypot";
import MessageField from "./MessageField";
import ServerError from "./ServerError";

type Props = { email: string; onSent: (senderEmail: string) => void };

export default function ContactForm({ email, onSent }: Props) {
  const [startedAt] = useState(Date.now);
  const [serverError, setServerError] = useState<string | null>(null);
  const [scope, animate] = useAnimate<HTMLFormElement>();
  const reduceMotion = useReducedMotion();
  const { handleSubmit, setError, reset } = useFormContext<
    ContactFormInput,
    unknown,
    ContactFormValues
  >();

  // A short "no" shake on every field that needs attention
  function shake(fields: string[]) {
    if (reduceMotion) return;
    for (const field of fields) {
      const el = scope.current?.querySelector(`[data-field="${field}"]`);
      if (el) animate(el, { x: [0, -8, 7, -5, 3, 0] }, { duration: 0.42 });
    }
  }

  async function onValid(values: ContactFormValues) {
    setServerError(null);
    const res = await sendContactMessage({ ...values, startedAt }).catch(
      () => null,
    );
    if (res?.ok) {
      reset();
      onSent(values.email);
      return;
    }
    const fieldErrors = res?.fieldErrors ?? {};
    for (const [field, messages] of Object.entries(fieldErrors)) {
      setError(field as ContactField, { message: messages?.[0] });
    }
    setServerError(res?.message ?? "Something went wrong on my side.");
    shake(Object.keys(fieldErrors));
  }

  const onInvalid = (errors: FieldErrors<ContactFormInput>) =>
    shake(Object.keys(errors));

  return (
    <m.form
      ref={scope}
      noValidate
      onSubmit={handleSubmit(onValid, onInvalid)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40, scale: 0.97, filter: "blur(6px)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="flex flex-col gap-4">
        <Field name="email" label="Email" type="email" autoComplete="email" placeholder="you@company.com" />
        <Field name="name" label="Name" type="text" autoComplete="name" placeholder="Enter your name" />
        <Field name="subject" label="Subject" type="text" autoComplete="off" placeholder="What's it about?" />
      </div>
      <Honeypot />
      <div className="mt-6">
        <MessageField />
      </div>
      <ServerError message={serverError} email={email} />
      <div className="mt-6">
        <FormFooter email={email} />
      </div>
    </m.form>
  );
}
