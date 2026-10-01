import { getGithubLink, getLinkedinLink, getYoutubeLink } from "@/lib/utils";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import DynamicLogo from "./Logo";
import HeaderNav from "./HeaderNav";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="mt-8 flex w-full items-center justify-center xl:justify-between xl:rounded-xl xl:border xl:border-hdr-border xl:bg-hdr xl:backdrop-blur print:hidden">
      <DynamicLogo size="small" className="xl:hidden" />
      <div className="hidden gap-10 p-4 text-16 xl:flex">
        <DynamicLogo size="small" />

        <HeaderNav />
      </div>

      <div className="hidden items-center gap-6 p-4 text-24 text-ink-strong xl:flex">
        <Link
          href={getYoutubeLink()}
          target="_blank"
          aria-label="YouTube"
          className="flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <FaYoutube aria-hidden="true" />
        </Link>
        <Link
          href={getLinkedinLink()}
          target="_blank"
          aria-label="LinkedIn"
          className="flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <FaLinkedin aria-hidden="true" />
        </Link>
        <Link
          href={getGithubLink()}
          target="_blank"
          aria-label="GitHub"
          className="flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <FaGithub aria-hidden="true" />
        </Link>

        {/* TODO: animate */}
        <div className="h-6 border-r border-sep"></div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
