import { createElement } from "react";
import { getAppMeta, type AppId } from "../app-meta";
import { getAppComponent } from "../apps";
import { titleId } from "../open-app";
import { cascade } from "../store/wm-store";
import WindowTitleBar from "./WindowTitleBar";

// Server-rendered window for a route: real content for crawlers and no-JS visitors, placed
// where the live window will open, so hydration doesn't move anything. CSS caps the size
// the same way the store fits a window to a small desktop.
export default function StaticWindow({ id }: { id: AppId }) {
  const meta = getAppMeta(id);
  // about opens first, so any other route's window takes the second cascade slot
  const { x, y } = cascade(id === "about" ? 0 : 1);
  const style = {
    left: x,
    top: y,
    width: meta.w,
    height: meta.h,
    maxWidth: `max(300px, calc(100% - ${x + 12}px))`,
    maxHeight: `max(180px, calc(100% - ${y + 12}px))`,
    zIndex: 11,
  };
  return (
    <section className="win win-static" data-front="true" aria-labelledby={titleId(id)} style={style}>
      <WindowTitleBar meta={meta} titleId={titleId(id)} />
      <div className="win-body">{createElement(getAppComponent(id), { id })}</div>
    </section>
  );
}
