"use client";
import { getAppMeta } from "../app-meta";
import { frontId, useWM } from "../store/wm-store";

// Every open window, in open order, including minimized ones
export default function WindowTray() {
  const wins = useWM((s) => s.wins);
  const front = frontId(wins);
  const items = Object.values(wins).sort((a, b) => a.seq - b.seq);
  return (
    <div role="toolbar" aria-label="Open windows" className="tray">
      {items.map((w) => {
        const meta = getAppMeta(w.id);
        const active = w.id === front;
        const verb = w.minimized ? "Restore" : active ? "Minimize" : "Show";
        return (
          <button
            key={w.id}
            type="button"
            className="tray-btn"
            data-active={active}
            data-min={w.minimized}
            aria-pressed={active}
            title={`${verb} ${meta.title}`}
            onClick={() => useWM.getState().trayClick(w.id)}
          >
            <span className="win-dot" style={{ background: meta.dot }} aria-hidden="true" />
            <span className="tray-label">{meta.title}</span>
          </button>
        );
      })}
    </div>
  );
}
