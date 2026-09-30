import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import GradientImage from "@public/Gradient.png";
import { ClassValue } from "clsx";
import type { Metadata } from "next";
import { Inter, Nanum_Pen_Script } from "next/font/google";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const nanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nanum",
});

export const metadata: Metadata = {
  title: "Reza Attar Portfolio Website",
  description: "Full Stack Developer - NextJS NestJS Typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${nanum.variable} relative mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-between overflow-x-hidden font-inter text-onyx antialiased dark:text-white`}
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
      alt="gradient image"
      className={cn(
        "pointer-events-none absolute -z-10 h-96 w-[100vw] object-cover print:hidden",
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
