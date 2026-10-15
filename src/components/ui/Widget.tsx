import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { cn } from "@/lib/utils";
import { ArrowRight, SendHorizontal, Stars } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./Button";

type WidgetProps = {
  href: string;
  title: string;
  subtitle: string;
  imageAlt: string;
  openInNewTab?: boolean;
  isComingSoon?: boolean;

  image: string | StaticImport;
};
export default function Widget({
  href,
  image,
  title,
  subtitle,
  imageAlt,
  isComingSoon = false,
  openInNewTab = false,
}: WidgetProps) {
  const Content = (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-6 pt-8",
        isComingSoon && "transition-all group-hover:blur group-hover:grayscale",
      )}
    >
      <div className="space-y-1 px-4">
        <h3 className="flex items-center justify-center gap-2 text-24 font-bold text-ink-strong xl:text-32">
          {title}
          <ArrowRight
            aria-hidden="true"
            className={cn("h-6 w-6 shrink-0", openInNewTab && "-rotate-45")}
          />
        </h3>
        <p className="text-15 text-ink-muted xl:text-16">{subtitle}</p>
      </div>

      <div className="flex h-[260px] items-end justify-center overflow-hidden rounded-b-4xl">
        <Image
          src={image}
          alt={imageAlt}
          className="max-h-full object-contain object-bottom"
        />
      </div>
    </div>
  );
  const containerClassNames = cn(
    "group flex max-h-[400px] flex-col justify-between overflow-hidden rounded-4xl border border-panel-border bg-panel text-center text-ink transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[3px]",
  );

  if (isComingSoon)
    return (
      <div className={cn(containerClassNames, "relative")}>
        <div className="absolute z-10 grid h-full w-full cursor-not-allowed select-none place-items-center rounded-4xl bg-onyx/80 pt-0 text-40 font-medium text-white opacity-0 transition-all duration-300 group-hover:grid group-hover:opacity-100">
          <span className="hidden group-hover:block">COMING SOON</span>
        </div>
        {Content}
      </div>
    );

  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : "_self"}
      aria-label={
        openInNewTab ? `${title} on Goodreads (opens in new tab)` : undefined
      }
      className={containerClassNames}
    >
      {Content}
    </Link>
  );
}

export function ProjectPlaceholder() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-between gap-6 rounded-4xl border border-dashed border-dash bg-panel px-6 py-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="grid h-28 w-28 place-items-center">
          <Stars
            width={49}
            height={50}
            aria-hidden="true"
            className="text-ink-muted"
          />
        </div>
        <h3 className="text-20 font-extrabold text-ink-strong xl:text-32">
          YOUR PROJECT GOES HERE
        </h3>
        <p className="mt-2 text-ink-muted xl:text-16">
          Let&apos;s turn your idea into a visual reality
        </p>
      </div>

      <Link
        href={"/contact"}
        className={cn("w-fit text-18", buttonVariants({ variant: "primary" }))}
      >
        <SendHorizontal aria-hidden="true" />
        Get in Touch
      </Link>
    </div>
  );
}

export function LetsWorkTogether() {
  return (
    <section
      aria-labelledby="work-together-title"
      className="bg-dot-grid flex flex-col gap-8 rounded-4xl border border-panel-border bg-panel px-6 py-10 xl:flex-row xl:items-end xl:justify-between xl:px-12 xl:py-14"
    >
      <div className="space-y-3 xl:max-w-[60%]">
        <p className="font-mono text-13 text-ink-faint">
          <span aria-hidden="true">// </span>06 next request
        </p>
        <h2
          id="work-together-title"
          className="text-balance text-32 font-bold leading-[1.15] text-ink-strong xl:text-48"
        >
          Have a product that needs every layer?
        </h2>
        <p className="text-pretty text-16 text-ink-muted xl:text-18">
          From the first table to the last pixel, and the AI in between. Tell me
          what you&apos;re building.
        </p>
      </div>

      <Link
        href="/contact"
        className={cn(
          "shrink-0 text-18 xl:w-fit",
          buttonVariants({ variant: "primary" }),
        )}
      >
        <SendHorizontal aria-hidden="true" />
        Get in Touch
      </Link>
    </section>
  );
}
