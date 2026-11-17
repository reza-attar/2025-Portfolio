"use client";
import { useEffect, useRef } from "react";

export type MenuItem =
  | { kind: "item"; label: string; hint?: string; checked?: boolean; onSelect: () => void }
  | { kind: "sep" }
  | { kind: "note"; text: string };

type Props = { id: string; label: string; open: boolean; items: MenuItem[]; onClose: (refocus: boolean) => void };

// Popover menu: role="menu", arrow keys / Home / End, closes on Esc, outside click and select
export default function Menu({ id, label, open, items, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    ref.current?.querySelector<HTMLElement>('[role^="menuitem"]')?.focus();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!ref.current?.contains(t) && !document.querySelector(`[aria-controls="${id}"]`)?.contains(t)) onClose(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, id, onClose]);

  if (!open) return null;

  function onKeyDown(e: React.KeyboardEvent) {
    const els = [...ref.current!.querySelectorAll<HTMLElement>('[role^="menuitem"]')];
    const i = els.indexOf(document.activeElement as HTMLElement);
    const go = (n: number) => els[(n + els.length) % els.length]?.focus();
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(els.length - 1);
    else if (e.key === "Escape" || e.key === "Tab") return onClose(e.key === "Escape");
    else return;
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div ref={ref} id={id} role="menu" aria-label={label} className="menu" onKeyDown={onKeyDown}>
      {items.map((it, i) =>
        it.kind === "sep" ? (
          <div key={i} role="separator" className="menu-sep" />
        ) : it.kind === "note" ? (
          <p key={i} className="menu-note">{it.text}</p>
        ) : (
          <button
            key={it.label}
            type="button"
            role={it.checked === undefined ? "menuitem" : "menuitemcheckbox"}
            aria-checked={it.checked}
            tabIndex={-1}
            className="menu-item"
            onClick={() => {
              onClose(true);
              it.onSelect();
            }}
          >
            <span>{it.label}</span>
            {it.checked !== undefined && <span className="menu-check" aria-hidden="true">{it.checked ? "on" : "off"}</span>}
            {it.hint && <kbd>{it.hint}</kbd>}
          </button>
        ),
      )}
    </div>
  );
}
