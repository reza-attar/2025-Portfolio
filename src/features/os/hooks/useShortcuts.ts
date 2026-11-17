import { useEffect } from "react";
import { closeApp } from "../open-app";
import { usePrefs } from "../store/prefs-store";
import { frontId, useWM } from "../store/wm-store";

// Global keyboard shortcuts. Ignored while typing and when Ctrl/⌘/Alt is held.
export function useShortcuts() {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const wm = useWM.getState();
      const prefs = usePrefs.getState();
      const front = frontId(wm.wins);
      const desk = document.querySelector(".desktop")?.getBoundingClientRect();
      const key = e.key.toLowerCase();

      if (e.shiftKey && key === "w" && front) closeApp(front);
      else if (e.shiftKey && key === "x") wm.closeAll();
      else if (e.shiftKey && key === "arrowleft" && front && desk) wm.snap(front, "left", desk.width, desk.height);
      else if (e.shiftKey && key === "arrowright" && front && desk) wm.snap(front, "right", desk.width, desk.height);
      else if (e.shiftKey && (key === "arrowup" || key === "arrowdown") && front) {
        // ⇧↑ maximizes, ⇧↓ restores
        if (wm.wins[front].maximized === (key === "arrowdown")) wm.toggleMax(front);
      }
      else if (e.key === "|") prefs.nextWallpaper();
      else if (e.key === "\\") prefs.toggleTheme();
      else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
