---
type: Web Page
title: Contact
description: A form styled as a new-mail window that opens the visitor's email app; no message is sent through the site.
resource: https://www.rezaattar.dev/contact
tags: [page, contact, form]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: page
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/contact/page.tsx
    title: src/app/contact/page.tsx
  - id: form
    resource: https://github.com/reza-attar/2025-Portfolio/blob/main/src/app/contact/form.tsx
    title: src/app/contact/form.tsx
---

# Route

- Files: `src/app/contact/page.tsx` (server) and `form.tsx` (client).
- Title: "Contact · Reza Attar".

# Behaviour

There is **no backend**. The form builds a `mailto:` link and sends the
browser to it:

1. Fields: Email, Name, Subject, Message. All are `required`, and Email is
   `type="email"`, so the browser validates before submit.
2. On submit: `mailto:<resume.email>?subject=<subject>&body=<message>\n\n<name> <<email>>`,
   built by `generateEmailLink()` in `src/lib/utils.ts`.
3. A line under the form gives the address for visitors without a mail app.

The recipient is `resume.email`, passed from the server page as a prop.

# Other content

- A decorative window title bar (close, minimize, fullscreen SVGs from
  `public/Contact Window/`), hidden from screen readers.
- Icon links: Email (a `mailto:` with a default subject and body), LinkedIn
  and GitHub.
