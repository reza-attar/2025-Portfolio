"use client";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-1">
        {site.nav.map((item) => {
          // /works/ticket-yar still highlights Works
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-lg border px-3.5 text-14 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                  active
                    ? "border-panel-border bg-panel text-ink-strong"
                    : "border-transparent text-ink-muted hover:bg-nav-hover hover:text-ink-strong",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// The current page as a shell path next to the logo: "~", "~/works", "~/works/ticket-yar".
// Decorative (the active link already says where you are), so hidden from screen readers.
export function CurrentPath() {
  const pathname = usePathname();

  return (
    <span
      aria-hidden="true"
      className="flex min-w-0 items-center font-mono text-13 text-ink-faint"
    >
      <span className="truncate">
        {pathname === "/" ? "~" : `~${pathname}`}
      </span>
      <span className="ml-1 h-[1.1em] w-[2px] shrink-0 bg-ink-strong motion-safe:animate-caret" />
    </span>
  );
}
