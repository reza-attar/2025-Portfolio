import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Link from "next/link";
import { useId } from "react";

type Props = {
  className?: ClassValue;
  size: "large" | "small";
};

const dimensions = {
  small: { width: 40, height: 26 },
  large: { width: 92, height: 60 },
};

// The [ra] mark from public/Logos, drawn in currentColor so it follows the theme
// through CSS instead of waiting for JavaScript to know the theme.
export default function Logo({ size, className }: Props) {
  // Two logos can be on one page (header and footer); each needs its own clip id
  const clipId = `ra-cap-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <Link
      href="/"
      aria-label="Home"
      className={cn(
        "flex shrink-0 rounded-md text-ink-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus",
        className,
      )}
    >
      <svg {...dimensions[size]} viewBox="0 0 92 60" fill="none" aria-hidden="true">
        <path
          d="M0 0H14.0063V5.7732H6.06723V54.2268H14.0063V60H0V0Z"
          fill="currentColor"
        />
        <path
          d="M77.9937 0H92V60H77.9937V54.2268H85.9328V5.7732H77.9937V0Z"
          fill="currentColor"
        />
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="9" width="92" height="42" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect x="18.5" y="9" width="8.5" height="42" fill="currentColor" />
          <path
            d="M22.75 13.25H33.5C38.5 13.25 41 16.2 41 20.9C41 25.6 38.5 28.5 33.5 28.5H27"
            stroke="currentColor"
            strokeWidth="8.5"
          />
          <path d="M32.5 29L43.6 52" stroke="currentColor" strokeWidth="8.5" />
          <path
            d="M50.5 51L58.6 9H67.4L75.5 51H67L63 17L59 51Z"
            fill="currentColor"
          />
          <rect x="56" y="31" width="14.5" height="7" fill="currentColor" />
        </g>
      </svg>
    </Link>
  );
}
