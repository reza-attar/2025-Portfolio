"use client";
import { createElement, memo, useRef, useState, type CSSProperties } from "react";
import { getAppMeta, type AppId } from "../app-meta";
import { getAppComponent } from "../apps";
import { useWindowDrag } from "../hooks/useWindowDrag";
import { closeApp, minimizeApp, titleId } from "../open-app";
import { frontId, useWM, type WinState } from "../store/wm-store";
import WindowTitleBar from "./WindowTitleBar";

// The app inside; memoised so focus changes don't re-render window contents
const WindowBody = memo(function WindowBody({ id }: { id: AppId }) {
  return createElement(getAppComponent(id), { id });
});

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Window({ win, simple }: { win: WinState; simple: boolean }) {
  const el = useRef<HTMLElement>(null);
  const [settling, setSettling] = useState(false);
  // Only windows opened after boot animate in (the first ones replace the static window)
  const [animate] = useState(() => !!document.documentElement.dataset.ready);
  const isFront = useWM((s) => frontId(s.wins) === win.id);
  const meta = getAppMeta(win.id);

  // Animate geometry for snap / maximize / restore (never during a drag)
  const settle = () => {
    setSettling(true);
    setTimeout(() => setSettling(false), 200);
  };
  const drag = useWindowDrag(win, !simple, settle);
  const toggleMax = () => {
    settle();
    useWM.getState().toggleMax(win.id);
  };
  // Play the close / minimize animation, then update the store
  const leave = (kind: "close" | "min", then: () => void) => {
    if (reducedMotion() || !el.current) return then();
    el.current.dataset.leaving = kind;
    setTimeout(then, kind === "close" ? 120 : 140);
  };

  const geometry: CSSProperties = simple
    ? {}
    : win.maximized
      ? { left: 0, top: 0, width: "100%", height: "100%", zIndex: win.z }
      : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <section
      ref={el}
      className="win"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId(win.id)}
      data-app={win.id}
      data-animate={animate}
      data-front={isFront}
      data-maximized={!simple && win.maximized}
      data-snapped={win.snapped ?? undefined}
      data-settling={settling}
      style={geometry}
      onPointerDown={() => useWM.getState().focus(win.id)}
    >
      <WindowTitleBar
        meta={meta}
        titleId={titleId(win.id)}
        maximized={win.maximized}
        handlers={{ ...drag.title, onDoubleClick: simple ? undefined : toggleMax }}
        onMinimize={() => leave("min", () => minimizeApp(win.id))}
        onMaximize={toggleMax}
        onClose={() => leave("close", () => closeApp(win.id))}
      />
      <div className="win-body">
        <WindowBody id={win.id} />
      </div>
      {!simple && !win.maximized && <div className="win-resize" aria-hidden="true" {...drag.resize} />}
    </section>
  );
}

export default memo(Window);
