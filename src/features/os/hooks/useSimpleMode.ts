import { usePrefs } from "../store/prefs-store";
import { useMediaQuery } from "./useMediaQuery";

export const NARROW_QUERY = "(max-width: 767px)";

// Stacked cards instead of floating windows: on narrow screens, or when the visitor opts in
export function useSimpleMode() {
  const narrow = useMediaQuery(NARROW_QUERY);
  const mode = usePrefs((s) => s.mode);
  return narrow || mode === "simple";
}
