"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SignDark from "@public/Signature/signature-white.svg";
import SignLight from "@public/Signature/signature-black.svg";

export default function Signature() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The theme is only known on the client; render an equally sized placeholder until then
  if (!mounted) {
    return <span aria-hidden="true" className="block h-[203px] w-[329px]" />;
  }

  if (resolvedTheme === "light") {
    return <SignLight />;
  } else {
    return <SignDark />;
  }
}
