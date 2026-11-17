import type { Zone } from "../store/wm-store";

// Dashed blue outline over the area a window will snap to
export default function SnapPreview({ zone }: { zone: Zone }) {
  return <div className="snap-preview" data-zone={zone} aria-hidden="true" />;
}
