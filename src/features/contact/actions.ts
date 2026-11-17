"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { contactPayloadSchema } from "./schema";
import { hashIp, submitContactMessage } from "./contact.service";
import type { ContactResult } from "./types";

// Faster than this from opening the page to sending is a bot, not a person
const MIN_FILL_MS = 3000;

export async function sendContactMessage(input: unknown): Promise<ContactResult> {
  const parsed = contactPayloadSchema.safeParse(input);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      reason: "invalid",
      message: "Some fields need another look.",
      fieldErrors,
    };
  }

  const { website, startedAt, ...msg } = parsed.data;
  // Bots get a success response so they don't retry; nothing is stored or sent
  if (website || Date.now() - startedAt < MIN_FILL_MS) return { ok: true };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip");

  // Nothing on the site renders messages, so there is no path to revalidate
  return submitContactMessage(msg, {
    ipHash: hashIp(ip),
    userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
  });
}
