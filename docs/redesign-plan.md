# Redesign plan: "Schema to interface"

Source: `feedback.md`. The site is clean but reads like a 2020 template. Fix the
idea first, not the motion.

## Central concept

Reza builds products end to end. The site is organised as the system he builds:

| # | Layer     | Stands for                              | Proof (from `src/lib/resume.ts`)          |
|---|-----------|-----------------------------------------|-------------------------------------------|
| 01 | Data      | PostgreSQL, pgvector, Prisma            | Query time 1.15 s → 9 ms                  |
| 02 | Backend   | NestJS, Node, Jira sync, jobs           | Compile 2 m 25 s → 34 s (−77%)            |
| 03 | AI        | RAG, embeddings, local LLMs, MCP        | In-house RAG on pgvector, hackathon 3rd   |
| 04 | Interface | Next.js, React, design systems          | Lighthouse 58 → 98, 100+ component lib    |

Every layer gets one accent colour and a mono label (`01 / DATA`). That is the
visual language reused across the site.

## Changes (built in this order, one commit each)

1. **Design tokens**: layer colours (light + dark), a mono font, a shared
   `layers` data file (`src/lib/layers.ts`).
2. **Hero**: statement "I build products from schema to interface." beside a
   minimal system diagram (Postgres → NestJS → AI layer → Next.js UI) with one
   request "packet" travelling through it. Vertical on mobile, horizontal on
   desktop. CSS-only motion, off under `prefers-reduced-motion`. Portrait moves
   to a small avatar next to the name.
3. **"The stack, layer by layer"** section: one row per layer, what Reza does
   there, the stack, and one measured result.
4. **AI brought forward**: a "Now building" spotlight for Ticket Yar (the AI
   product), drawn as its own pipeline Jira → RAG → LLM → human approval.
5. **Project cards show the layers they touch**: layer chips on Selected Work,
   /works cards and "More case studies".
6. **Section kickers in the system language** (`// 02 selected work`) and a
   reworked closing CTA.
7. **Metadata + OG image** carry the new statement.
8. **Responsive pass**: 360 px → 1440 px, light + dark, reduced motion.

Out of scope: no 3D / Three.js yet (see open questions), no page-wide animation.

Unknowns go to `docs/REDESIGN_TODO.md` for Reza to fill.
