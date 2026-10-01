import { ChevronRight } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { buttonVariants } from "./Button";

export type CardProps = {
  href: string;
  title: ReactNode;
  description: string;
  image: StaticImport;
  logo: string | StaticImport;
  caseHref?: string;
};
export default function Card({
  logo,
  title,
  href,
  description,
  image,
  caseHref,
}: CardProps) {
  return (
    <div className="group flex w-full flex-wrap justify-between gap-4 overflow-hidden rounded-4xl border border-panel-border bg-panel">
      <div className="flex flex-[1_1_300px] flex-col justify-between gap-4 px-6 py-8 xl:px-12 xl:py-14">
        <div className="space-y-4">
          <Image src={logo} width={70} height={70} alt={`${title} logo`} />
          <h3 className="text-20 font-extrabold text-ink-strong">{title}</h3>
          <p className="text-pretty text-15 leading-[1.5] text-ink-muted">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {caseHref && (
            <Link
              href={caseHref}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "w-fit px-[18px] py-2.5 text-[16px]",
              )}
            >
              Read case study
            </Link>
          )}
          <Link
            target="_blank"
            href={href}
            aria-label={`Visit ${title} site (opens in new tab)`}
            className="flex w-fit items-center gap-1 rounded-md text-18 text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            Visit Site
            <ChevronRight aria-hidden="true" width={20} className="pt-0.5" />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-4 flex aspect-[1.12] w-full min-w-0 max-w-[560px] flex-[1_1_420px] items-center justify-center self-center">
        <Image
          src={image}
          alt={`screenshot of ${title} project`}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
