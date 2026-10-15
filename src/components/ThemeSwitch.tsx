"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

// Both icons are rendered and CSS shows the right one, so nothing flashes before hydration
export default function ThemeSwitch({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={className}
    >
      <FiMoon aria-hidden="true" className="h-[18px] w-[18px] dark:hidden" />
      <FiSun
        aria-hidden="true"
        className="hidden h-[18px] w-[18px] dark:block"
      />
    </button>
  );
}
