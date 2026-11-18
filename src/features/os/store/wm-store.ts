// The window manager: one store holds every window, and each user action is one action
// here, so behaviour is testable without a browser (see wm-store.test.ts).
import { create } from "zustand";
import { getAppMeta, type AppId } from "../app-meta";

export type Zone = "left" | "right" | "top";
export type Rect = { x: number; y: number; w: number; h: number };

export interface WinState extends Rect {
  id: AppId;
  // Higher = in front
  z: number;
  // Open order: drives the tray and DOM order
  seq: number;
  minimized: boolean;
  maximized: boolean;
  snapped: Zone | null;
  // Geometry before a snap or maximize
  restore?: Rect;
}

export const MIN_W = 300;
export const MIN_H = 180;

interface WM {
  wins: Record<string, WinState>;
  z: number;
  seq: number;
  snapZone: Zone | null;
  // Last known desktop size; set by clampAll (the desktop's ResizeObserver)
  desk: { w: number; h: number } | null;
  // True once anything has opened, so the empty-desktop card never shows before boot
  booted: boolean;
  // For the polite live region; n changes so the same text is announced again
  announcement: { text: string; n: number };
  open(id: AppId): void;
  focus(id: AppId): void;
  close(id: AppId): void;
  closeAll(): void;
  minimize(id: AppId): void;
  toggleMax(id: AppId): void;
  move(id: AppId, x: number, y: number): void;
  resize(id: AppId, w: number, h: number): void;
  snap(id: AppId, zone: Zone, deskW: number, deskH: number): void;
  unsnap(id: AppId, x: number, y: number): void;
  trayClick(id: AppId): void;
  tidy(): void;
  setSnapZone(zone: Zone | null): void;
  clampAll(deskW: number, deskH: number): void;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));

// Cascade slot n (wraps after six)
export const cascade = (n: number) => ({ x: 150 + (n % 6) * 34, y: 24 + (n % 6) * 30 });

// Default size, shrunk to fit the desktop when it is known (never below the minimum)
function fit(id: AppId, x: number, y: number, desk: WM["desk"]) {
  const { w, h } = getAppMeta(id);
  if (!desk) return { w, h };
  return {
    w: clamp(w, MIN_W, Math.min(w, desk.w - x - 12)),
    h: clamp(h, MIN_H, Math.min(h, desk.h - y - 12)),
  };
}

export const frontId = (wins: WM["wins"]): AppId | null => {
  let best: WinState | null = null;
  for (const w of Object.values(wins)) if (!w.minimized && (!best || w.z > best.z)) best = w;
  return best?.id ?? null;
};

const say = (s: WM, text: string) => ({ announcement: { text, n: s.announcement.n + 1 } });
const title = (id: AppId) => getAppMeta(id).title;

export const useWM = create<WM>((set, get) => {
  // Replace one window, keeping the rest
  const patch = (id: AppId, p: Partial<WinState>) =>
    set((s) => (s.wins[id] ? { wins: { ...s.wins, [id]: { ...s.wins[id], ...p } } } : s));

  return {
    wins: {},
    z: 10,
    seq: 0,
    snapZone: null,
    desk: null,
    booted: false,
    announcement: { text: "", n: 0 },

    open(id) {
      if (get().wins[id]) return get().focus(id);
      set((s) => {
        const { x, y } = cascade(Object.keys(s.wins).length);
        const win: WinState = {
          id, x, y, ...fit(id, x, y, s.desk),
          z: s.z + 1, seq: s.seq + 1, minimized: false, maximized: false, snapped: null,
        };
        return { z: s.z + 1, seq: s.seq + 1, booted: true, wins: { ...s.wins, [id]: win }, ...say(s, `${title(id)} opened`) };
      });
    },

    focus(id) {
      const { wins } = get();
      const w = wins[id];
      // No-op when already in front: avoids re-renders while typing
      if (!w || (frontId(wins) === id && !w.minimized)) return;
      set((s) => ({
        z: s.z + 1,
        wins: { ...s.wins, [id]: { ...w, z: s.z + 1, minimized: false } },
        ...(w.minimized ? say(s, `${title(id)} restored`) : {}),
      }));
    },

    close(id) {
      if (!get().wins[id]) return;
      set((s) => {
        const wins = { ...s.wins };
        delete wins[id];
        return { wins, ...say(s, `${title(id)} closed`) };
      });
    },

    closeAll() {
      set((s) => ({ wins: {}, booted: true, ...say(s, "All windows closed") }));
    },

    minimize(id) {
      if (!get().wins[id]) return;
      patch(id, { minimized: true });
      set((s) => say(s, `${title(id)} minimized`));
    },

    toggleMax(id) {
      const w = get().wins[id];
      if (!w) return;
      set((s) => ({
        z: s.z + 1,
        wins: { ...s.wins, [id]: { ...w, maximized: !w.maximized, minimized: false, z: s.z + 1 } },
        ...say(s, `${title(id)} ${w.maximized ? "restored" : "maximized"}`),
      }));
    },

    move(id, x, y) {
      patch(id, { x, y });
    },

    resize(id, w, h) {
      patch(id, { w: Math.max(MIN_W, w), h: Math.max(MIN_H, h), snapped: null });
    },

    snap(id, zone, deskW, deskH) {
      const cur = get().wins[id];
      if (!cur) return;
      // Keep the geometry from before the first snap, so un-snapping goes back to it
      const restore = cur.snapped ? cur.restore : { x: cur.x, y: cur.y, w: cur.w, h: cur.h };
      if (zone === "top") {
        patch(id, { maximized: true, restore });
        set((s) => say(s, `${title(id)} maximized`));
        return;
      }
      const half = Math.round(deskW / 2);
      patch(id, {
        snapped: zone, maximized: false, restore,
        x: zone === "left" ? 0 : half, y: 0, w: half, h: Math.round(deskH),
      });
      set((s) => say(s, `${title(id)} snapped ${zone}`));
    },

    unsnap(id, x, y) {
      const cur = get().wins[id];
      if (!cur?.snapped || !cur.restore) return;
      patch(id, { x, y, w: cur.restore.w, h: cur.restore.h, snapped: null });
    },

    trayClick(id) {
      const { wins } = get();
      const w = wins[id];
      if (!w) return;
      if (w.minimized) get().focus(id);
      else if (frontId(wins) === id) get().minimize(id);
      else get().focus(id);
    },

    tidy() {
      const sorted = Object.values(get().wins).sort((a, b) => a.seq - b.seq);
      let z = get().z;
      const wins: WM["wins"] = {};
      sorted.forEach((w, i) => {
        const { x, y } = cascade(i);
        wins[w.id] = {
          ...w, x, y, ...fit(w.id, x, y, get().desk),
          z: ++z, minimized: false, maximized: false, snapped: null, restore: undefined,
        };
      });
      set((s) => ({ wins, z, ...say(s, "Windows tidied") }));
    },

    setSnapZone(snapZone) {
      if (get().snapZone !== snapZone) set({ snapZone });
    },

    clampAll(deskW, deskH) {
      set((s) => {
        const wins = { ...s.wins };
        const half = Math.round(deskW / 2);
        for (const w of Object.values(wins)) {
          if (w.snapped) {
            wins[w.id] = { ...w, x: w.snapped === "left" ? 0 : half, y: 0, w: half, h: Math.round(deskH) };
          } else {
            // The title bar always stays reachable
            wins[w.id] = { ...w, x: clamp(w.x, -240, deskW - 90), y: clamp(w.y, 0, deskH - 40) };
          }
        }
        return { wins, desk: { w: deskW, h: deskH } };
      });
    },
  };
});
