import Shell from "@/features/os/components/Shell";
import { PREFS_KEY } from "@/features/os/store/prefs-store";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "@/styles/index.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata({ title: site.title, path: "/" }),
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION to the Search Console token to verify the domain
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

// Browser UI colour, matching the desktop in each theme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEEFE9" },
    { media: "(prefers-color-scheme: dark)", color: "#22242C" },
  ],
};

// Runs before paint: theme, wallpaper and mode from saved prefs (or the system theme),
// so a dark-mode visitor never sees a light flash and phones never see the floating layout.
const noFlash = `try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(PREFS_KEY)})||'{}').state||{},d=document.documentElement.dataset;
d.theme=p.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.wall=p.wallpaper||'dots';
d.mode=p.mode==='simple'||matchMedia('(max-width: 767px)').matches?'simple':'os';}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} data-wall="dots" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <Shell>{children}</Shell>
        {/* Vercel Web Analytics: cookieless page views, loaded after the page */}
        <Analytics />
      </body>
    </html>
  );
}
