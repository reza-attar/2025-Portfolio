import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import GradientImage from "@public/Gradient.webp";
import { Analytics } from "@vercel/analytics/next";
import { ClassValue } from "clsx";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { site } from "@/lib/site";
import "./globals.css";
import { Providers } from "./providers";

// Inter and JetBrains Mono are variable fonts: leaving out `weight` loads one file per
// subset with every weight, and keeps one @font-face rule per subset in the
// render-blocking CSS instead of one per weight.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata({ title: site.title, path: "/" }),
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // Let search engines show large image previews and full snippets
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Set GOOGLE_SITE_VERIFICATION to the Search Console token to verify the domain
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Browser UI colour, matching the page background in each theme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} relative mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-between overflow-x-hidden font-inter text-ink antialiased`}
      >
        <TopGradient />

        <Providers>
          <Header />
          {children}

          <Footer />
          <Navbar />
        </Providers>

        <BottomGradient />

        {/* Vercel Web Analytics: cookieless page views, so no consent banner is needed */}
        <Analytics />
      </body>
    </html>
  );
}

// A soft blur, so a small 320px WebP scaled up looks the same as a full-size image and
// costs a few KB. It is served as is (no optimizer round trip), and the top one is
// preloaded because it is often the largest paint on the first screen.
function Gradient({
  className,
  preload = false,
}: {
  className: ClassValue;
  preload?: boolean;
}) {
  return (
    <Image
      unoptimized
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      src={GradientImage}
      alt=""
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-96 w-[100vw] object-cover dark:opacity-40 print:hidden",
        className,
      )}
    />
  );
}

function TopGradient() {
  return <Gradient preload className="top-0" />;
}

function BottomGradient() {
  return <Gradient className="bottom-0 -scale-y-100" />;
}
