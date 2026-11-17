import type { ProjectColor } from "@/lib/projects";
import Icon, { type IconName } from "./Icon";

// Pastel square with a black stroke icon
export default function Tile({ color, icon, size = 44 }: { color: ProjectColor; icon: IconName; size?: number }) {
  return (
    <span className={`tile tile-${color}`} style={{ width: size, height: size }} aria-hidden="true">
      <Icon name={icon} size={Math.round(size / 2)} />
    </span>
  );
}
