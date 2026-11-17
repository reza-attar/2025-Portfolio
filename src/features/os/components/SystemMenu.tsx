"use client";
import { useCallback, useRef, useState } from "react";
import { BASE_APPS, getAppMeta } from "../app-meta";
import { openApp, openEverything } from "../open-app";
import { usePrefs } from "../store/prefs-store";
import { useWM } from "../store/wm-store";
import Menu, { type MenuItem } from "./Menu";

// The logo button and its menu. In simple mode a second "Menu" button lists the apps.
export default function SystemMenu({ variant }: { variant: "system" | "apps" }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const mode = usePrefs((s) => s.mode);
  const id = `${variant}-menu`;
  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) btn.current?.focus();
  }, []);

  const items: MenuItem[] =
    variant === "apps"
      ? BASE_APPS.map((a) => ({ kind: "item", label: getAppMeta(a).title, onSelect: () => openApp(a, { currentTarget: btn.current, detail: 0 }) }))
      : [
          { kind: "item", label: "About reza.os", onSelect: () => openApp("about", { currentTarget: btn.current, detail: 0 }) },
          { kind: "item", label: "Open every window (chaos)", onSelect: openEverything },
          { kind: "item", label: "Close all", hint: "⇧X", onSelect: () => useWM.getState().closeAll() },
          { kind: "item", label: "Tidy up", onSelect: () => useWM.getState().tidy() },
          { kind: "sep" },
          { kind: "item", label: "Simple mode", checked: mode === "simple", onSelect: () => usePrefs.getState().setMode(mode === "simple" ? "auto" : "simple") },
          { kind: "sep" },
          { kind: "note", text: "⇧W close · ⇧←/→ snap · ⇧↑/↓ max\n\\ theme · | wallpaper" },
        ];

  return (
    <div className={`menu-anchor menu-anchor-${variant}`}>
      <button
        ref={btn}
        type="button"
        className={variant === "system" ? "tb-logo" : "tb-menu"}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {variant === "system" ? (
          <>
            <span className="tb-logo-mark" aria-hidden="true">ra</span>
            <span className="tb-logo-text">reza.os</span>
          </>
        ) : (
          "Menu"
        )}
      </button>
      <Menu id={id} label={variant === "system" ? "System" : "Apps"} open={open} items={items} onClose={close} />
    </div>
  );
}
