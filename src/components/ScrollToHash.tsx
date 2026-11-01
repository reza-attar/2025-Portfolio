"use client";

import { useEffect } from "react";

// Next.js scrolls to a #fragment once, which on client navigations (e.g. home ->
// /resume#awards) can run before the target is on screen. Render this inside the page
// to scroll once the page's content has mounted.
export default function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return null;
}
