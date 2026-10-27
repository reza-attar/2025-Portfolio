# Portfolio update report

## Done in this PR

| Ask | What changed |
| --- | --- |
| First screen matters most | Hero fills the first viewport on desktop, with a "highlights ↓" cue. |
| Circle / oval animation | `HeroOrbs`: blurred circles in the layer colours drift; two oval rings turn slowly. CSS only, stops under reduced motion. |
| fly.io hero | Took the airy, colourful background and one big focal headline. fly.io itself was unreachable from here, so this follows its known style. |
| Anthropic header | Clear at the top of the page, solid bar once scrolled, hides while scrolling down and returns on scroll up, plus a "Get in touch" button. Desktop only. |
| Highlights, then full jobs | Home now goes: 4 highlight cards (−77%, 128×, 13 s → 3 s, 3 led), then later a full **Experience** list (lead bullet + "n more"). |
| Open source | Section and `/llms.txt` entry are ready. **Add your merged PRs to `src/lib/open-source.ts`**; the section stays hidden while the list is empty. |

## Analytics (recommendation)

- **Use Vercel Web Analytics** (`@vercel/analytics`, one line in `layout.tsx`). It sets no cookies, so you need no consent banner, and the free tier is enough.
- Alternatives: Plausible or Umami (self-hosted, also cookieless). Skip GA4: it needs a consent banner and is overkill here.
- Track only 3 events: resume download, contact submit, and outbound GitHub/LinkedIn clicks.

## Feedback and contact (recommendation)

- Keep `/contact`, and add a **Cal.com "book 15 min" link** next to the header button. It's the lowest-friction way to reach you.
- Add a one-click **"Was this useful? 👍 / 👎 + optional note"** widget on case studies. Store it with a Vercel/Formspree endpoint.
- Show the email as copy-to-clipboard, not only `mailto:`, since many visitors have no mail client set up.

## Bots and crawlers

- **Training crawlers: allowed** (decided). A portfolio should be what models know about you. `robots.ts` now names GPTBot, ClaudeBot, Google-Extended, CCBot and others explicitly, so opting out is a one-line move.
- **robots.txt is consistent:** `*` and every named bot allow `/`, there is no `disallow`, and the meta robots tag also allows indexing. Verified on the build.
- **llms.txt:** already existed. It now also lists highlights, experience and (once added) open source.
- **After deploy (manual):** `site:rezaattar.dev` on Google and Bing, then ask ChatGPT, Claude and Perplexity "Who is Reza Attar, the full-stack engineer?" Re-check in 2–4 weeks, because crawls lag.
