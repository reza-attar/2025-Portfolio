-- Messages sent through the /contact form (see src/features/contact)
create table if not exists contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  subject     text        not null,
  message     text        not null,
  status      text        not null default 'new'
              check (status in ('new', 'read', 'replied', 'spam')),
  -- sha256 of the sender's IP, only used for rate limiting
  ip_hash     text,
  user_agent  text,
  -- set once the notification email to the inbox was accepted by Resend
  notified_at timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on contact_messages (created_at desc);

create index if not exists contact_messages_ip_hash_idx
  on contact_messages (ip_hash, created_at desc);
