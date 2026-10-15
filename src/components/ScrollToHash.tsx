"use client";

import { useEffect } from "react";

// Next.js scrolls to a #fragment once, while the root loading.tsx is still on screen,
// so on client navigations (e.g. home -> /resume#awards) the target isn't there yet.
// Render this inside the page to scroll once the page's content has mounted.
export default function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return null;
}
