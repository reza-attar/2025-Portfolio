"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { DESKTOP_ICONS } from "../app-meta";
import { openApp } from "../open-app";
import { useWM } from "../store/wm-store";
import DesktopIcon from "./DesktopIcon";
import EmptyDesktop from "./EmptyDesktop";
import SnapPreview from "./SnapPreview";
import Window from "./Window";

// Wallpaper, icons and windows. `children` is the route's page: its static window,
// which stands in for the live one until hydration.
export default function Desktop({ simple, children }: { simple: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const wins = useWM((s) => s.wins);
  const snapZone = useWM((s) => s.snapZone);
  const booted = useWM((s) => s.booted);

  // Keep windows reachable when the browser is resized
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => useWM.getState().clampAll(e.contentRect.width, e.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // DOM order = open order (stable Tab order); stacking comes from z-index only
  const visible = Object.values(wins)
    .filter((w) => !w.minimized)
    .sort((a, b) => a.seq - b.seq);

  return (
    <main ref={ref} id="desktop" className="desktop" aria-label="Desktop">
      <nav className="desktop-icons" aria-label="Desktop shortcuts">
        {DESKTOP_ICONS.map((i) => (
          <DesktopIcon key={i.id} label={i.label} tile={i.tile} icon={i.icon} onOpen={(e) => openApp(i.id, e)} />
        ))}
      </nav>
      {!simple && snapZone && <SnapPreview zone={snapZone} />}
      {visible.map((w) => (
        <Window key={w.id} win={w} simple={simple} />
      ))}
      {children}
      {booted && Object.keys(wins).length === 0 && <EmptyDesktop />}
    </main>
  );
}
