"use client";
import { profile } from "@/lib/profile";
import Button from "@/shared/components/ui/Button";
import IconButton from "@/shared/components/ui/IconButton";
import Link from "next/link";
import type { AppId } from "../app-meta";
import { openApp } from "../open-app";
import { usePrefs } from "../store/prefs-store";
import { appLinkClick } from "./AppLink";
import Clock from "./Clock";
import SystemMenu from "./SystemMenu";
import WindowTray from "./WindowTray";

const nav: { label: string; href: string; id: AppId }[] = [
  { label: "Work", href: "/projects", id: "projects" },
  { label: "About", href: "/", id: "about" },
  { label: "Stack", href: "/stack", id: "stack" },
  { label: "Résumé", href: "/resume", id: "resume" },
];

export default function Taskbar() {
  return (
    <header className="taskbar">
      <SystemMenu variant="system" />
      <SystemMenu variant="apps" />
      <nav aria-label="Main" className="tb-nav">
        {/* Real links (crawlable, middle-click works). The click also opens the window,
            so it reopens even when the URL already matches. */}
        {nav.map((n) => (
          <Link key={n.href} href={n.href} onClick={(e) => openApp(n.id, e)}>
            {n.label}
          </Link>
        ))}
      </nav>
      <WindowTray />
      <span className="tb-tools">
        <IconButton className="tb-wall" label="Next wallpaper" icon="image" onClick={() => usePrefs.getState().nextWallpaper()} />
        {/* Both icons render; CSS shows the one for the current theme (no hydration mismatch) */}
        <button type="button" className="icon-btn icon-btn-md icon-btn-plain tb-theme" aria-label="Toggle dark mode" title="Toggle dark mode" onClick={() => usePrefs.getState().toggleTheme()}>
          <ThemeIcons />
        </button>
        <Clock timeZone={profile.timezone} label="Tehran" />
      </span>
      <Button variant="primary" className="tb-cta" href="/contact" onClick={appLinkClick("contact")}>
        Hire me
      </Button>
    </header>
  );
}

function ThemeIcons() {
  return (
    <>
      <svg className="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z" />
      </svg>
      <svg className="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </>
  );
}
