"use client";
import { useLayoutEffect } from "react";
import type { AppId } from "../app-meta";
import { useHydrated } from "../hooks/useMediaQuery";
import { isSimpleMode } from "../store/prefs-store";
import { useWM } from "../store/wm-store";
import StaticWindow from "./StaticWindow";

// What each route page renders: opens (or focuses) the route's window. Before hydration it
// renders the window statically, so the server HTML has the content (SEO, no-JS).
export default function RouteWindow({ id }: { id: AppId }) {
  const hydrated = useHydrated();

  useLayoutEffect(() => {
    const wm = useWM.getState();
    // On a first visit, about.md opens behind the route's window. Phones get the route's
    // card alone, so a shared link isn't pushed below the fold.
    if (id !== "about" && !wm.booted && !isSimpleMode()) wm.open("about");
    wm.open(id);
  }, [id]);

  return hydrated ? null : <StaticWindow id={id} />;
}
