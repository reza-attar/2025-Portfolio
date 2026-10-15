This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Resume (source of truth: `content/resume.md`)

Edit `content/resume.md` and nothing else. The format is described in a comment at the top of the file.

- **Website:** `/resume`, the About page, the home page and the Ticket Yar case study read it (through `src/lib/resume.ts`), so a save shows up on the next reload in `pnpm dev`. Every section can be linked to, e.g. `/resume#awards` or `/resume#nuwa`.
- **PDF:** `public/Reza_Attar_Resume.pdf` is generated from the same file with headless Chrome (`scripts/resume/pdf.mjs`):
  - `pnpm dev` rebuilds the PDF every time you save `resume.md`.
  - `pnpm resume:pdf` rebuilds it once.
  - `pnpm build` rebuilds it if `resume.md` changed, and fails if it changed on a machine without Chrome (for example a hosting build), so an out-of-date PDF can't ship. Commit the PDF and `content/resume.pdf.sha256` together with `resume.md`.

Chrome is found at its default install path; set `CHROME_PATH` to use another one.

Visitors can also use the browser's Print → Save as PDF on `/resume`; print styles hide the site chrome.
