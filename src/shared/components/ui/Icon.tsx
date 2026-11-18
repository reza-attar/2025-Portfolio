// Inline stroke icons (24 × 24 grid, currentColor). No icon font, no emoji.
const paths = {
  folder: "M3 7.5A1.5 1.5 0 0 1 4.5 6h4.4l2 2h8.6A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  pdf: "M6 3h8l4 4v14H6zM14 3v4h4M8.5 16.5v-4h1.5a1.2 1.2 0 0 1 0 2.4H8.5M13 12.5v4h1a2 2 0 0 0 0-4z",
  terminal: "M3.5 5h17v14h-17zM7 9.5l3 2.5-3 2.5M12 15h5",
  mail: "M3.5 6h17v12h-17zM4 6.5l8 6.5 8-6.5",
  trash: "M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13M10 11v5.5M14 11v5.5",
  minimize: "M6 12h12",
  maximize: "M6 6h12v12H6z",
  restore: "M8.5 9.5h9v9h-9zM6.5 14.5V6.5h8",
  close: "M7 7l10 10M17 7 7 17",
  image: "M4 5h16v14H4zM4 15.5l4.5-4.5 4 4 2.5-2.5 5 5M15.5 9.5h.01",
  moon: "M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4",
  menu: "M4 7h16M4 12h16M4 17h16",
  arrow: "M5 12h14M13 6l6 6-6 6",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  download: "M12 4v11M7 10.5l5 5 5-5M4.5 20h15",
  github: "M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  linkedin: "M4.5 9.5v10M4.5 5.2v.1M9.5 19.5v-10M9.5 13.5c0-2.5 1.6-4 3.6-4s3.4 1.3 3.4 4v6",
  sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5 9 15M15 9l2.5-2.5",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 20, strokeWidth = 1.75 }: { name: IconName; size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
