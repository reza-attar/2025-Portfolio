import { useSyncExternalStore } from "react";

// false on the server and during hydration, then the live value
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noop = () => () => {};

// false on the server and during hydration, true after
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
