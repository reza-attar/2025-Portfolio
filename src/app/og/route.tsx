import { layers } from "@/lib/layers";
import { site } from "@/lib/site";
import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

// Dark-theme values of the --layer-* tokens in globals.css
const layerColor = {
  data: "#7b93ff",
  backend: "#ff6b70",
  ai: "#c08cf0",
  interface: "#ffc53d",
};

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
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0b0b0f 0%, #1c1c26 100%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, color: "#a1a1aa" }}>{site.name}</div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              marginTop: 20,
              maxWidth: 980,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {layers.map((layer, i) => (
              <div
                key={layer.id}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 20px",
                    borderRadius: 14,
                    border: "1px solid #2e2e38",
                    background: "#121218",
                    fontSize: 26,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: layerColor[layer.id],
                    }}
                  />
                  {layer.name}
                </div>
                {i < layers.length - 1 && (
                  <div style={{ fontSize: 26, color: "#71717a" }}>→</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, color: "#71717a" }}>
            {site.url.replace(/^https:\/\/(www\.)?/, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
