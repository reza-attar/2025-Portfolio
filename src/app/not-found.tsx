import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="grid w-full place-items-center px-4 py-32">
      <div className="max-w-[44ch] space-y-6 text-center">
        <p className="font-mono text-13 text-ink-faint">404</p>
        <h1 className="text-balance text-40 font-bold leading-[1.1] text-ink-strong xl:text-60">
          Page not found
        </h1>
        <p className="text-pretty text-16 text-ink-muted xl:text-18">
          The page you followed doesn&apos;t exist, or it has moved. The work
          and the resume are a click away.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(
              "text-18 sm:w-fit",
              buttonVariants({ variant: "primary" }),
            )}
          >
            Go to the home page
          </Link>
          <Link
            href="/works"
            className={cn(
              "text-18 sm:w-fit",
              buttonVariants({ variant: "secondary" }),
            )}
          >
            See the work
          </Link>
        </div>
      </div>
    </main>
  );
}
