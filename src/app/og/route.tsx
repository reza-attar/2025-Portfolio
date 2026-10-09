import { site } from "@/lib/site";
import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

// Share card used by every page (see src/lib/metadata.ts)
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #0b0b0f 0%, #1c1c26 100%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, color: "#a1a1aa" }}>
          {`${site.role} · ${site.focus}`}
        </div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#71717a" }}>
          {site.url.replace(/^https:\/\/(www\.)?/, "")}
        </div>
      </div>
    ),
    size,
  );
}
