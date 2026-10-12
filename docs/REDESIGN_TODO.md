# Redesign: things only Reza can answer

The redesign on `feat/systems-redesign` filled every gap with the best guess from
`src/lib/resume.ts`, `src/lib/site.ts` and the case studies. Each item below is a
guess or a missing asset. Edit the file named, then tick the box.

## Facts to confirm

- [ ] **Maica: solo or co-founded?** The resume says "Built solo". The /works card
      and case study say "Co-founded; I built most of the backend". Pick one.
      Files: `src/lib/resume.ts`, `src/lib/projects.ts`, `src/lib/case-studies.ts`.
- [ ] **Layers per project.** The strip on each card shows which layers you built
      yourself. These ones are guesses, so confirm them (`layers:` in `src/lib/projects.ts`):
  - [ ] Maica: Data, Backend, Interface
  - [ ] Mora Blog: Data, Backend, Interface (from the NUWA line "owning server components and the data layer")
  - [ ] Mora Dashboard: Data, Backend, Interface
  - [ ] Cleafin: Interface only
  - [ ] Medicine matching: Data, Backend, Interface (no AI, since it uses trigram matching, not a model)
  - [ ] Cashio: Data, Backend, Interface
- [ ] **One number per layer** (`metric` in `src/lib/layers.ts`). Swap any for a stronger one:
  - Data: 1.15 s → 9 ms (NUWA). No case study covers it yet, so it links to the resume.
  - Backend: 2m 25s → 34s (Ticket Yar, SWC)
  - AI: 3rd place, LLM Agents Hackathon. There's no measured AI result yet. A number
    from Ticket Yar (share of drafts approved without edits, time saved per ticket)
    would be much stronger.
  - Interface: Lighthouse 58 → 98 (Mora Blog)
- [ ] **Ticket Yar pipeline wording** (`src/app/(Home)/sections/NowBuilding.tsx`).
      The section says it uses pgvector (from the resume) and drafts in Persian.
      Check that nothing there is under NDA.
- [ ] **"A short demo is available on request"** also appears on the home page now.
      Make sure that's still true.

## Copy to approve

- [ ] Hero headline: "I build products from schema to interface." (also in
      `site.tagline`, used for page descriptions and the share card)
- [ ] Section titles: "One engineer, the whole request path", "An AI layer that
      knows when not to answer", "Shipped, end to end", "Have a product that needs
      every layer?"
- [ ] Hero buttons are now **See the work** and **Read my resume**. Contact
      moved to the closing section and the nav. Put "Get in touch" back in the hero
      if recruiters are the main audience.

## Assets that would make it better

- [ ] **A Ticket Yar visual.** Even a blurred dashboard screenshot or a 20-second
      clip. It's the strongest AI project and the only one without an image.
- [ ] **A data-layer case study** (the NUWA 1.15 s → 9 ms query work). The Data row
      has the best number and no story behind it.
- [ ] **Portrait.** The big round portrait in the hero is now a 44 px avatar,
      because the diagram took its place. The full portrait is still on /about.
      Say if you want it back on the home page.

## Ideas left out on purpose (from the feedback)

- [ ] **3D or Three.js diagram.** The feedback mentions it as an option. The diagram is
      plain HTML and CSS for now: no JS, readable on any phone, and it pauses for
      reduced motion. If you want a richer version, it can replace
      `src/components/SystemDiagram.tsx` without touching anything else.
- [ ] **Old "Tech Stack" / "Notebook" widgets** are still commented out in
      `GetToKnowMe.tsx`. The new layer section covers tech stack, so delete them?
- [ ] `src/app/test/page.tsx` (waits 10 s, then says "Test page") still ships
      and is public at `/test`. Delete it?
