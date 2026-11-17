"use client";
import Icon from "@/shared/components/ui/Icon";
import type { MouseEvent } from "react";
import type { IconName } from "../app-meta";

type Props = { label: string; tile: string; icon: IconName; onOpen: (e: MouseEvent<HTMLButtonElement>) => void };

// Single click opens: one-click access matters more than OS purity
export default function DesktopIcon({ label, tile, icon, onOpen }: Props) {
  return (
    <button type="button" className="dicon" onClick={onOpen}>
      <span className="dicon-tile" style={{ background: tile }} aria-hidden="true">
        <Icon name={icon} size={22} />
      </span>
      <span className="dicon-label">{label}</span>
    </button>
  );
}
