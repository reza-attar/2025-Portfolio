"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SignDark from "@public/Signature/signature-white.svg";
import SignLight from "@public/Signature/signature-black.svg";

// Scales down below 329px so the About page fits narrow phones
const size = "h-auto w-[329px] max-w-full";

export default function Signature() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The theme is only known on the client; render an equally sized placeholder until then
  if (!mounted) {
    return (
      <span aria-hidden="true" className={`block aspect-[329/203] ${size}`} />
    );
  }

  if (resolvedTheme === "light") {
    return <SignLight className={size} />;
  } else {
    return <SignDark className={size} />;
  }
}
