import type { ContactField } from "./schema";

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      reason: "invalid" | "rate_limited" | "unavailable";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string[]>>;
    };

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactMeta = {
  ipHash: string | null;
  userAgent: string | null;
};
