// Theme, wallpaper and mode, saved in localStorage['reza.os/prefs'].
// The no-flash script in app/layout.tsx reads the same key before paint and puts the values
// on <html> (data-theme, data-wall, data-mode); Shell keeps them in sync after that.
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PREFS_KEY = "reza.os/prefs";
export const WALLPAPERS = ["dots", "grid", "plain"] as const;
export type Wallpaper = (typeof WALLPAPERS)[number];
export type Theme = "light" | "dark";

type Prefs = {
  // null = follow the system setting
  theme: Theme | null;
  wallpaper: Wallpaper;
  mode: "auto" | "simple";
  toggleTheme(): void;
  nextWallpaper(): void;
  setMode(m: Prefs["mode"]): void;
};

const systemTheme = (): Theme =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const usePrefs = create<Prefs>()(
  persist(
    (set) => ({
      theme: null,
      wallpaper: "dots",
      mode: "auto",
      toggleTheme: () =>
        set((s) => ({ theme: (s.theme ?? systemTheme()) === "light" ? "dark" : "light" })),
      nextWallpaper: () =>
        set((s) => ({
          wallpaper: WALLPAPERS[(WALLPAPERS.indexOf(s.wallpaper) + 1) % WALLPAPERS.length],
        })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: PREFS_KEY,
      // Rehydrated by Shell after React hydration, so server and client markup match
      skipHydration: true,
      partialize: ({ theme, wallpaper, mode }) => ({ theme, wallpaper, mode }),
    },
  ),
);

export const resolvedTheme = (theme: Theme | null) => theme ?? systemTheme();

// True when windows render as stacked cards. Read from <html>, which the no-flash script
// and Shell keep current, so it works before the prefs store has rehydrated.
export const isSimpleMode = () =>
  typeof document !== "undefined" && document.documentElement.dataset.mode === "simple";
