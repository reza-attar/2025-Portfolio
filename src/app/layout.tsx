import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import GradientImage from "@public/Gradient.png";
import { ClassValue } from "clsx";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Nanum_Pen_Script } from "next/font/google";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { site } from "@/lib/site";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nanum",
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
        className={`${inter.variable} ${mono.variable} ${nanum.variable} relative mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-between overflow-x-hidden font-inter text-ink antialiased`}
      >
        <TopGradient />

        <Providers>
          <Header />
          {children}

          <Footer />
          <Navbar />
        </Providers>

        <BottomGradient />
      </body>
    </html>
  );
}

function Gradient({ className }: { className: ClassValue }) {
  return (
    <Image
      priority={false}
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
  return <Gradient className="top-0" />;
}

function BottomGradient() {
  return <Gradient className="bottom-0 -scale-y-100" />;
}
