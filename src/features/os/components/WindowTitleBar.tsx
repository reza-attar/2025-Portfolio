import IconButton from "@/shared/components/ui/IconButton";
import type { HTMLAttributes, PointerEvent } from "react";
import type { AppMeta } from "../app-meta";

type Props = {
  meta: AppMeta;
  titleId: string;
  maximized?: boolean;
  handlers?: HTMLAttributes<HTMLDivElement>;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
};

// Window controls stop pointerdown, so pressing — □ × never starts a drag
const stop = (e: PointerEvent) => e.stopPropagation();

// Accent dot, mono title, and minimize / maximize / close. Shared by the live and static windows.
export default function WindowTitleBar({ meta, titleId, maximized, handlers, onMinimize, onMaximize, onClose }: Props) {
  return (
    <div className="win-titlebar" {...handlers}>
      <span className="win-dot" style={{ background: meta.dot }} aria-hidden="true" />
      <h2 id={titleId} className="win-title" tabIndex={-1}>
        {meta.title}
      </h2>
      <span className="win-spacer" />
      <IconButton size="sm" className="win-min" label={`Minimize ${meta.title}`} icon="minimize" onPointerDown={stop} onClick={onMinimize} />
      <IconButton
        size="sm"
        className="win-max"
        label={`${maximized ? "Restore" : "Maximize"} ${meta.title}`}
        icon={maximized ? "restore" : "maximize"}
        onPointerDown={stop}
        onClick={onMaximize}
      />
      <IconButton size="sm" variant="danger" label={`Close ${meta.title}`} icon="close" onPointerDown={stop} onClick={onClose} />
    </div>
  );
}
