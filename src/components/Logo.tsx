"use client";

import { cn } from "@/lib/utils";
import LogoLargeBlack from "@public/Logos/ra-lg-dark.svg";
import LogoLargeWhite from "@public/Logos/ra-lg-light.svg";
import LogoSmallBlack from "@public/Logos/ra-sm-dark.svg";
import LogoSmallWhite from "@public/Logos/ra-sm-light.svg";
import { ClassValue } from "clsx";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  className?: ClassValue;
  size: "large" | "small";
};
export default function DynamicLogo({ size, className }: Props) {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );
  }

  const logos = {
    large: {
      dark: LogoLargeBlack,
      light: LogoLargeWhite,
    },
    small: {
      dark: LogoSmallBlack,
      light: LogoSmallWhite,
    },
  };

  const Logo = logos[size][resolvedTheme === "dark" ? "light" : "dark"];

  return (
    <Link
      href={"/"}
      aria-label="Home"
      className={cn(
        "my-auto flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus",
        className,
      )}
    >
      <Logo />
    </Link>
  );
}
