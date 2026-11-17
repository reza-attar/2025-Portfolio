"use client";
import { useEffect, type ReactNode } from "react";
import { getAppMeta } from "../app-meta";
import { useShortcuts } from "../hooks/useShortcuts";
import { NARROW_QUERY, useSimpleMode } from "../hooks/useSimpleMode";
import { focusWindowTitle } from "../open-app";
import { resolvedTheme, usePrefs } from "../store/prefs-store";
import { frontId, useWM } from "../store/wm-store";
import Desktop from "./Desktop";
import LiveRegion from "./LiveRegion";
import Taskbar from "./Taskbar";

// The OS: taskbar + desktop, mounted once in the root layout, so navigation never
// remounts it. Owns shortcuts, prefs on <html>, and URL sync.
export default function Shell({ children }: { children: ReactNode }) {
  const simple = useSimpleMode();
  const theme = usePrefs((s) => s.theme);
  const wallpaper = usePrefs((s) => s.wallpaper);
  useShortcuts();

  useEffect(() => {
    usePrefs.persist.rehydrate();
    // Windows animate in only after boot, so the hydrated windows don't fade in over the static ones
    const t = setTimeout(() => (document.documentElement.dataset.ready = "true"), 300);
    return () => clearTimeout(t);
  }, []);

  // Theme, wallpaper and mode live on <html> (the no-flash script set them before paint).
  // Read live values: this can run before the re-render that follows rehydration.
  useEffect(() => {
    if (!usePrefs.persist.hasHydrated()) return;
    const p = usePrefs.getState();
    const d = document.documentElement.dataset;
    d.theme = resolvedTheme(p.theme);
    d.wall = p.wallpaper;
    d.mode = window.matchMedia(NARROW_QUERY).matches || p.mode === "simple" ? "simple" : "os";
  }, [theme, wallpaper, simple]);

  // The front window owns the URL. Replace, not push: Back shouldn't walk through focus.
  useEffect(
    () =>
      useWM.subscribe((s, prev) => {
        const id = frontId(s.wins);
        if (!id || id === frontId(prev.wins)) return;
        const { href } = getAppMeta(id);
        if (window.location.pathname !== href) window.history.replaceState(window.history.state, "", href);
      }),
    [],
  );

  return (
    <div className="shell">
      <a
        href="#desktop"
        className="skip-link"
        onClick={(e) => {
          const id = frontId(useWM.getState().wins);
          if (!id) return;
          e.preventDefault();
          focusWindowTitle(id);
        }}
      >
        Skip to content
      </a>
      <Taskbar />
      <Desktop simple={simple}>{children}</Desktop>
      <LiveRegion />
    </div>
  );
}
