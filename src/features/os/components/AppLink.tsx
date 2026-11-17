"use client";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { getAppMeta, type AppId } from "../app-meta";
import { openApp } from "../open-app";

// Click handler for a real link that opens a window instead of navigating.
// Modified clicks (new tab, middle click) keep the browser default.
export function appLinkClick(id: AppId) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    openApp(id, e);
  };
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { id: AppId };

// <a href> to the window's route (crawlable, shareable) that opens the window in place
export default function AppLink({ id, ...rest }: Props) {
  return <a href={getAppMeta(id).href} onClick={appLinkClick(id)} {...rest} />;
}
