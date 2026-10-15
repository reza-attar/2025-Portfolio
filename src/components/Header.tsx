import { getGithubLink, getLinkedinLink, getYoutubeLink } from "@/lib/utils";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";
import HeaderNav, { CurrentPath } from "./HeaderNav";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

const iconButton =
  "grid h-9 w-9 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-nav-hover hover:text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// Mobile: logo, path and theme toggle (the bottom Navbar has the links).
// Desktop: a floating bar that stays at the top, links centred between the two ends.
export default function Header() {
  const social = [
    { label: "YouTube", href: getYoutubeLink(), Icon: FiYoutube },
    { label: "LinkedIn", href: getLinkedinLink(), Icon: FiLinkedin },
    { label: "GitHub", href: getGithubLink(), Icon: FiGithub },
  ];

  return (
    <header className="z-40 mt-6 flex h-14 w-full items-center justify-between gap-4 px-4 xl:sticky xl:top-4 xl:mt-8 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:rounded-2xl xl:border xl:border-hdr-border xl:bg-hdr xl:pl-5 xl:pr-2 xl:backdrop-blur-xl print:hidden">
      <div className="flex min-w-0 items-center gap-3">
        <Logo size="small" />
        <CurrentPath />
      </div>

      <HeaderNav className="hidden xl:block" />

      <div className="flex items-center justify-end gap-1">
        <div className="hidden items-center gap-1 xl:flex">
          {social.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              aria-label={`${label} (opens in new tab)`}
              className={iconButton}
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
            </Link>
          ))}
          <span aria-hidden="true" className="mx-2 h-5 w-px bg-sep" />
        </div>
        <ThemeSwitch className={iconButton} />
      </div>
    </header>
  );
}
