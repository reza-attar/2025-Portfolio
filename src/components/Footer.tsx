import { resume } from "@/lib/resume";
import { site } from "@/lib/site";
import { getGithubLink, getLinkedinLink, getYoutubeLink } from "@/lib/utils";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Logo from "./Logo";

const link =
  "rounded text-15 text-ink-muted transition-colors hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus";

// Rendered at build time, so this is when the site was last published
const built = new Date();

export default function Footer() {
  const elsewhere = [
    { label: "LinkedIn", href: getLinkedinLink() },
    { label: "GitHub", href: getGithubLink() },
    { label: "YouTube", href: getYoutubeLink() },
    { label: "Stack Overflow", href: resume.links.stackOverflow },
  ];

  return (
    <footer className="mt-32 w-full px-4 pb-28 xl:pb-12 print:hidden">
      <div className="grid grid-cols-2 gap-10 border-t border-divider pt-10 md:grid-cols-[1fr_auto_auto] md:gap-x-16 xl:gap-x-24">
        <div className="col-span-2 max-w-[38ch] space-y-4 md:col-span-1">
          <Logo size="small" />
          <p className="text-pretty text-15 leading-[1.6] text-ink-muted">
            {site.tagline} Based in {resume.location},{" "}
            {site.relocation.sentence}.
          </p>
          <a
            href={`mailto:${resume.email}`}
            className={`${link} block w-fit font-medium text-ink-strong underline underline-offset-4`}
          >
            {resume.email}
          </a>
        </div>

        <nav aria-labelledby="footer-pages">
          <FooterHeading id="footer-pages">pages</FooterHeading>
          <ul className="space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading id="footer-elsewhere">elsewhere</FooterHeading>
          <ul aria-labelledby="footer-elsewhere" className="space-y-2.5">
            {elsewhere.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target="_blank"
                  aria-label={`${item.label} (opens in new tab)`}
                  className={`${link} group inline-flex items-center gap-1`}
                >
                  {item.label}
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover:text-ink-strong"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 text-13 text-ink-faint sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          © {built.getFullYear()} {site.name}. Thanks for stopping by ッ
        </p>
        <p className="font-mono">
          updated{" "}
          {built
            .toLocaleDateString("en-GB", { month: "short", year: "numeric" })
            .toLowerCase()}
        </p>
      </div>
    </footer>
  );
}

function FooterHeading({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mb-4 font-mono text-13 text-ink-faint">
      <span aria-hidden="true">// </span>
      {children}
    </p>
  );
}
