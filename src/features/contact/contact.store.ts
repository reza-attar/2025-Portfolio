import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { ContactMessage, ContactMeta } from "./types";

// Postgres (Neon) storage for contact messages. Table: db/migrations/001_contact_messages.sql

const RATE_LIMIT = { max: 5, windowMinutes: 60 };

let client: NeonQueryFunction<false, false> | null = null;
function db() {
  if (!process.env.DATABASE_URL) return null;
  client ??= neon(process.env.DATABASE_URL);
  return client;
}

export const isStoreConfigured = () => Boolean(process.env.DATABASE_URL);

export async function isRateLimited(ipHash: string | null): Promise<boolean> {
  const sql = db();
  if (!sql || !ipHash) return false;
  const rows = await sql`
    select count(*)::int as count from contact_messages
    where ip_hash = ${ipHash}
      and created_at > now() - make_interval(mins => ${RATE_LIMIT.windowMinutes}::int)`;
  return (rows[0]?.count ?? 0) >= RATE_LIMIT.max;
}

export async function saveMessage(
  msg: ContactMessage,
  meta: ContactMeta,
): Promise<string> {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL is not set");
  const rows = await sql`
    insert into contact_messages (name, email, subject, message, ip_hash, user_agent)
    values (${msg.name}, ${msg.email}, ${msg.subject}, ${msg.message}, ${meta.ipHash}, ${meta.userAgent})
    returning id`;
  return rows[0].id as string;
}

export async function markNotified(id: string): Promise<void> {
  const sql = db();
  if (!sql) return;
  await sql`update contact_messages set notified_at = now() where id = ${id}`;
}
