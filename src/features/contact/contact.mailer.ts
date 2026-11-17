import "server-only";
import { Resend } from "resend";
import type { ContactMessage } from "./types";

// Sends each contact message to the inbox. Reply-To is the visitor, so replying
// from the inbox goes straight to them.

const to = () => process.env.CONTACT_TO_EMAIL || "contact@rezaattar.dev";
const from = () =>
  process.env.CONTACT_FROM_EMAIL || "Portfolio contact <noreply@rezaattar.dev>";

export const isMailerConfigured = () => Boolean(process.env.RESEND_API_KEY);

export async function notifyInbox(msg: ContactMessage, id?: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: from(),
    to: to(),
    replyTo: `${msg.name.replace(/[<>"]/g, "")} <${msg.email}>`,
    subject: `${msg.subject} · from ${msg.name}`,
    text: renderText(msg, id),
    html: renderHtml(msg, id),
    headers: id ? { "X-Entity-Ref-ID": id } : undefined,
  });
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
}

function renderText(msg: ContactMessage, id?: string) {
  return [
    `New message from the contact form on rezaattar.dev`,
    ``,
    `From:    ${msg.name} <${msg.email}>`,
    `Subject: ${msg.subject}`,
    ``,
    msg.message,
    ``,
    `—`,
    `Reply to this email to answer ${msg.name} directly.`,
    id ? `Stored as ${id}` : `Not stored (database unavailable)`,
  ].join("\n");
}

function renderHtml(msg: ContactMessage, id?: string) {
  const e = escapeHtml;
  return `<!doctype html><html><body style="margin:0;background:#f4f4f4;font-family:-apple-system,Segoe UI,Inter,sans-serif;color:#181818">
<div style="max-width:560px;margin:24px auto;background:#fff;border:1px solid #e4e4e4;border-radius:12px;overflow:hidden">
  <div style="padding:16px 24px;border-bottom:1px solid #eee;font-size:13px;color:#6b6b6b">New message · rezaattar.dev/contact</div>
  <div style="padding:24px">
    <h1 style="margin:0 0 4px;font-size:20px">${e(msg.subject)}</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#5e5e5e">${e(msg.name)} &lt;<a href="mailto:${e(msg.email)}" style="color:#5b5bd6">${e(msg.email)}</a>&gt;</p>
    <div style="white-space:pre-wrap;font-size:15px;line-height:1.6">${e(msg.message)}</div>
  </div>
  <div style="padding:14px 24px;background:#fafafa;border-top:1px solid #eee;font-size:12px;color:#8f8f8f">
    Reply to this email to answer ${e(msg.name)} directly.${id ? ` · ID ${e(id)}` : ""}
  </div>
</div></body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
