import { z } from "zod";

// Shared by the form (client-side validation) and the server action (the real check)
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 5000 },
} as const;

const { name, subject, message } = CONTACT_LIMITS;

export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "I need an email to reply to")
    .max(254, "That email is too long")
    .pipe(z.email("That doesn't look like an email address")),
  name: z
    .string()
    .trim()
    .min(name.min, "Tell me what to call you")
    .max(name.max, `Keep it under ${name.max} characters`),
  subject: z
    .string()
    .trim()
    .min(subject.min, "Give it a short subject")
    .max(subject.max, `Keep it under ${subject.max} characters`),
  message: z
    .string()
    .trim()
    .min(message.min, `A little more detail, at least ${message.min} characters`)
    .max(message.max, `Keep it under ${message.max} characters`),
  // Honeypot: hidden from people, bots fill it. Checked on the server.
  website: z.string().optional(),
});

// What the server action receives: the fields plus when the form was opened
export const contactPayloadSchema = contactSchema.extend({
  startedAt: z.number().int().positive(),
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormValues = z.output<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactPayloadSchema>;
export type ContactField = Exclude<keyof ContactFormValues, "website">;
