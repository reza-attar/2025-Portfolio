"use client";
import Button from "@/shared/components/ui/Button";
import { openApp } from "../open-app";

export default function EmptyDesktop() {
  return (
    <div className="empty-desk">
      <p className="empty-desk-title">You closed everything. Respect.</p>
      <p className="hint">The desktop icons still work, or start over from the top.</p>
      <Button variant="dark" onClick={(e) => openApp("about", e)}>
        Reopen about.md
      </Button>
    </div>
  );
}
