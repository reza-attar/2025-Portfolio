"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

// Desktop header behaviour, after anthropic.com: clear over the hero, a solid bar once the page
// scrolls, out of the way while reading down, back as soon as you scroll up.
export default function HeaderShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Small moves (trackpad jitter) don't toggle it; near the top it always shows
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      // Keyboard users tabbing into a hidden header get it back
      onFocus={() => setHidden(false)}
      className={cn(
        "transition-[transform,background-color,border-color] duration-300 motion-reduce:transition-none",
        hidden && "xl:-translate-y-[calc(100%+1rem)]",
        className,
      )}
    >
      {children}
    </header>
  );
}
