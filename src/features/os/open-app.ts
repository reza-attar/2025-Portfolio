// Opening and closing with focus management on top of the store:
// - opening from the keyboard (or in simple mode) moves focus to the window's title;
// - closing returns focus to the control that opened the window.
import { BASE_APPS, type AppId } from "./app-meta";
import { isSimpleMode } from "./store/prefs-store";
import { frontId, useWM } from "./store/wm-store";

const openers = new Map<AppId, HTMLElement>();

type Trigger = { currentTarget: EventTarget | null; detail: number } | null | undefined;

export const titleId = (id: AppId) => `win-title-${id.replace(":", "-")}`;

// Focus a window's title; in simple mode, scroll its card into view first
export function focusWindowTitle(id: AppId | null) {
  const title = id && document.getElementById(titleId(id));
  if (!title) return;
  if (isSimpleMode()) title.closest(".win")?.scrollIntoView({ block: "start" });
  title.focus({ preventScroll: true });
}

export function openApp(id: AppId, e?: Trigger) {
  // The opener gets focus back when this window closes
  if (e?.currentTarget instanceof HTMLElement) openers.set(id, e.currentTarget);
  useWM.getState().open(id);
  // detail is 0 for a click made with Enter/Space
  if (e && (e.detail === 0 || isSimpleMode())) requestAnimationFrame(() => focusWindowTitle(id));
}

export function closeApp(id: AppId) {
  const opener = openers.get(id);
  const el = document.getElementById(titleId(id))?.closest(".win");
  const hadFocus = !!el?.contains(document.activeElement);
  openers.delete(id);
  useWM.getState().close(id);
  if (!hadFocus) return;
  requestAnimationFrame(() => {
    if (opener?.isConnected) opener.focus();
    else focusWindowTitle(frontId(useWM.getState().wins));
  });
}

export function minimizeApp(id: AppId) {
  const el = document.getElementById(titleId(id))?.closest(".win");
  const hadFocus = !!el?.contains(document.activeElement);
  useWM.getState().minimize(id);
  if (hadFocus) requestAnimationFrame(() => focusWindowTitle(frontId(useWM.getState().wins)));
}

// System menu → Open everything: one window every 90 ms, for the pop-in cascade
export function openEverything() {
  BASE_APPS.forEach((id, i) => setTimeout(() => useWM.getState().open(id), i * 90));
}
