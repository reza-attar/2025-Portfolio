import "server-only";
import { createHash } from "node:crypto";
import { isMailerConfigured, notifyInbox } from "./contact.mailer";
import {
  isRateLimited,
  isStoreConfigured,
  markNotified,
  saveMessage,
} from "./contact.store";
import type { ContactMessage, ContactMeta, ContactResult } from "./types";

const UNAVAILABLE: ContactResult = {
  ok: false,
  reason: "unavailable",
  message: "Your message couldn't be delivered right now.",
};

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.CONTACT_IP_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

// Stores the message, then emails it to the inbox. Either one succeeding is enough
// for the visitor: a stored message can be read later, an emailed one already arrived.
export async function submitContactMessage(
  msg: ContactMessage,
  meta: ContactMeta,
): Promise<ContactResult> {
  const canStore = isStoreConfigured();
  const canMail = isMailerConfigured();

  if (!canStore && !canMail) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] Neither DATABASE_URL nor RESEND_API_KEY is set");
      return UNAVAILABLE;
    }
    console.info("[contact] dev mode, nothing configured. Message:", msg);
    return { ok: true };
  }

  if (await isRateLimited(meta.ipHash).catch(() => false)) {
    return {
      ok: false,
      reason: "rate_limited",
      message: "That's a lot of messages in a short time. Try again in an hour.",
    };
  }

  const id = canStore
    ? await saveMessage(msg, meta).catch((err) => {
        console.error("[contact] storing failed", err);
        return undefined;
      })
    : undefined;

  const mailed = canMail
    ? await notifyInbox(msg, id).then(
        () => true,
        (err) => (console.error("[contact] email failed", err), false),
      )
    : false;

  if (mailed && id) await markNotified(id).catch(() => {});
  return id || mailed ? { ok: true } : UNAVAILABLE;
}
