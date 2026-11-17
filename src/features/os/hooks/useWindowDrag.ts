import { useRef, type PointerEvent as RPointerEvent } from "react";
import { MIN_H, MIN_W, useWM, type WinState, type Zone } from "../store/wm-store";

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
// Movement before a press on the title bar counts as a drag (so a click never un-snaps)
const DRAG_THRESHOLD = 3;

// el: the window element, taken from the event (the handlers sit inside it)
type Op =
  | { kind: "drag"; el: HTMLElement; sx: number; sy: number; ox: number; oy: number; x: number; y: number; zone: Zone | null; moved: boolean }
  | { kind: "resize"; el: HTMLElement; sx: number; sy: number; ow: number; oh: number; w: number; h: number };

// Drag (title bar) and resize (corner handle). Positions are written to the element through
// the DOM while the pointer moves and committed to the store once, on pointerup.
export function useWindowDrag(win: WinState, enabled: boolean, onSettle: () => void) {
  const op = useRef<Op | null>(null);
  const winEl = (e: RPointerEvent<HTMLElement>) => e.currentTarget.closest<HTMLElement>(".win")!;
  const desk = (el: HTMLElement) => el.parentElement!.getBoundingClientRect();

  function end(el: HTMLElement) {
    document.body.style.cursor = "";
    el.removeAttribute("data-dragging");
  }

  const title = {
    onPointerDown(e: RPointerEvent<HTMLElement>) {
      if (!enabled || e.button !== 0 || win.maximized) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      op.current = { kind: "drag", el: winEl(e), sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y, x: win.x, y: win.y, zone: null, moved: false };
    },
    onPointerMove(e: RPointerEvent<HTMLElement>) {
      const o = op.current;
      if (!o || o.kind !== "drag") return;
      const d = desk(o.el);
      if (!o.moved) {
        if (Math.hypot(e.clientX - o.sx, e.clientY - o.sy) < DRAG_THRESHOLD) return;
        o.moved = true;
        o.el.dataset.dragging = "true";
        document.body.style.cursor = "grabbing";
        if (win.snapped && win.restore) {
          // Pull the window off the edge at its old size, keeping the grab point under the pointer
          const ratio = (o.sx - d.left - win.x) / win.w;
          o.ox = Math.round(o.sx - d.left - win.restore.w * ratio);
          o.oy = 0;
          useWM.getState().unsnap(win.id, o.ox, o.oy);
        }
      }
      o.x = clamp(o.ox + e.clientX - o.sx, -240, d.width - 90);
      o.y = clamp(o.oy + e.clientY - o.sy, 0, d.height - 40);
      // A transform, not state: no React render per frame
      o.el.style.transform = `translate3d(${o.x - o.ox}px, ${o.y - o.oy}px, 0)`;
      const px = e.clientX - d.left;
      const py = e.clientY - d.top;
      const zone: Zone | null = px < 16 ? "left" : px > d.width - 16 ? "right" : py < 8 ? "top" : null;
      if (zone !== o.zone) {
        o.zone = zone;
        useWM.getState().setSnapZone(zone);
      }
    },
    onPointerUp() {
      const o = op.current;
      if (!o || o.kind !== "drag") return;
      op.current = null;
      if (!o.moved) return;
      end(o.el);
      o.el.style.transform = "";
      const wm = useWM.getState();
      wm.setSnapZone(null);
      if (o.zone) {
        const d = desk(o.el);
        onSettle();
        wm.snap(win.id, o.zone, d.width, d.height);
      } else wm.move(win.id, Math.round(o.x), Math.round(o.y));
    },
  };

  const resize = {
    onPointerDown(e: RPointerEvent<HTMLElement>) {
      e.stopPropagation();
      if (!enabled || e.button !== 0) return;
      useWM.getState().focus(win.id);
      e.currentTarget.setPointerCapture(e.pointerId);
      const el = winEl(e);
      el.dataset.dragging = "true";
      document.body.style.cursor = "nwse-resize";
      op.current = { kind: "resize", el, sx: e.clientX, sy: e.clientY, ow: win.w, oh: win.h, w: win.w, h: win.h };
    },
    onPointerMove(e: RPointerEvent<HTMLElement>) {
      const o = op.current;
      if (!o || o.kind !== "resize") return;
      o.w = Math.max(MIN_W, o.ow + e.clientX - o.sx);
      o.h = Math.max(MIN_H, o.oh + e.clientY - o.sy);
      o.el.style.width = `${o.w}px`;
      o.el.style.height = `${o.h}px`;
    },
    onPointerUp() {
      const o = op.current;
      if (!o || o.kind !== "resize") return;
      op.current = null;
      end(o.el);
      useWM.getState().resize(win.id, Math.round(o.w), Math.round(o.h));
    },
  };

  return {
    title: { ...title, onPointerCancel: title.onPointerUp },
    resize: { ...resize, onPointerCancel: resize.onPointerUp },
  };
}
