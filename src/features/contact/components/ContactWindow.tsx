"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  contactSchema,
  type ContactFormInput,
  type ContactFormValues,
} from "../schema";
import ContactForm from "./ContactForm";
import SentState from "./SentState";
import WindowHeader from "./WindowHeader";

const EMPTY: ContactFormInput = {
  email: "",
  name: "",
  subject: "",
  message: "",
  website: "",
};

// The mail-app window: one form state shared by the live title, the fields and the button
export default function ContactWindow({ email }: { email: string }) {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const form = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: EMPTY,
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <FormProvider {...form}>
          <section
            aria-label="contact window"
            className="bg-win flex flex-col gap-6 overflow-hidden rounded-xl border border-panel-border px-4"
          >
            <WindowHeader sent={sentTo !== null} />
            <AnimatePresence mode="wait" initial={false}>
              {sentTo ? (
                <SentState
                  key="sent"
                  email={sentTo}
                  onReset={() => setSentTo(null)}
                />
              ) : (
                <ContactForm key="form" email={email} onSent={setSentTo} />
              )}
            </AnimatePresence>
          </section>
        </FormProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
