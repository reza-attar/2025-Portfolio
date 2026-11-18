"use client";
import { useEffect, useState } from "react";

// Local time somewhere else; renders nothing until mounted (no hydration mismatch)
export default function Clock({ timeZone, label }: { timeZone: string; label: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const t = setInterval(tick, 20_000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="tb-clock" />;
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
  return (
    <span className="tb-clock" title={`Local time in ${label}`}>
      <span className="tb-clock-label">{label}</span> {time}
    </span>
  );
}
