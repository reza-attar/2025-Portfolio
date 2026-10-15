import { ChevronRight } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

import { LayerId, layerBg } from "@/lib/layers";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { buttonVariants } from "./Button";
import LayerStrip from "./LayerStrip";

// One stop on the way through a product, for cards without a screenshot
export type CardStep = {
  label: string;
  text: string;
  // Colours the marker; leave out for parts I didn't build
  layer?: LayerId;
  // Label on the connector to the next step
  edge?: string;
};

export type CardProps = {
  // Omit when the project is no longer live; the "Visit Site" link is hidden
  href?: string;
  title: ReactNode;
  // Role and kind of project, e.g. "Senior engineer · Dotin"
  meta?: string;
  description: string;
  // A screenshot, or `steps` to draw how the product works instead
  image?: StaticImport;
  steps?: CardStep[];
  logo?: string | StaticImport;
  caseHref?: string;
  // Shown where "Visit Site" would be when there's no public link
  note?: string;
  // Which system layers the project touched (see src/lib/layers.ts)
  layers?: LayerId[];
};
export default function Card({
  logo,
  title,
  meta,
  href,
  description,
  image,
  steps,
  caseHref,
  note,
  layers,
}: CardProps) {
  return (
    <div className="group flex w-full flex-wrap justify-between gap-4 overflow-hidden rounded-4xl border border-panel-border bg-panel">
      <div className="flex flex-[1_1_300px] flex-col justify-between gap-4 px-6 py-8 xl:px-12 xl:py-14">
        <div className="space-y-4">
          {logo && (
            <Image src={logo} width={70} height={70} alt={`${title} logo`} />
          )}
          <div className="space-y-1">
            <h3 className="text-20 font-extrabold text-ink-strong">{title}</h3>
            {meta && <p className="text-14 text-ink-faint">{meta}</p>}
          </div>
          <p className="text-pretty text-15 leading-[1.5] text-ink-muted">
            {description}
          </p>
          {layers && <LayerStrip active={layers} className="pt-2" />}
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
          {href && (
            <Link
              target="_blank"
              href={href}
              aria-label={`Visit ${title} site (opens in new tab)`}
              className="flex w-fit items-center gap-1 rounded-md text-18 text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              Visit Site
              <ChevronRight aria-hidden="true" width={20} className="pt-0.5" />
            </Link>
          )}
          {!href && note && <p className="text-14 text-ink-faint">{note}</p>}
        </div>
      </div>
      {image ? (
        <div className="mx-auto flex w-full min-w-0 max-w-[560px] flex-[1_1_420px] items-center justify-center self-center px-4 pb-6 md:mt-4 md:aspect-[1.12] md:px-0 md:pb-0">
          <Image
            src={image}
            alt={`screenshot of ${title} project`}
            className="h-auto w-full object-contain md:h-full"
          />
        </div>
      ) : (
        steps && (
          <div className="flex w-full min-w-0 flex-[1_1_420px] items-center px-6 pb-8 md:py-10 md:pr-10 xl:py-14 xl:pr-12">
            <Steps steps={steps} title={title} />
          </div>
        )
      )}
    </div>
  );
}

// The same vertical path as the hero's SystemDiagram, without the animation
function Steps({ steps, title }: { steps: CardStep[]; title: ReactNode }) {
  return (
    <div className="bg-dot-grid w-full rounded-3xl border border-panel-border p-5 sm:p-6">
      <ol aria-label={`How ${title} works`} className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-3 top-8 w-px -translate-x-1/2 bg-sep"
        />
        {steps.map((step, i) => (
          <li key={step.label}>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-panel-border bg-background"
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-sm",
                    step.layer ? layerBg[step.layer] : "bg-dash",
                  )}
                />
              </span>
              <div className="flex min-h-16 min-w-0 flex-1 flex-col justify-center rounded-2xl border border-panel-border bg-background px-4 py-2.5">
                <span className="font-mono text-12 uppercase text-ink-faint">
                  {String(i + 1).padStart(2, "0")} / {step.label}
                </span>
                <span className="text-15 font-semibold text-ink-strong">
                  {step.text}
                </span>
              </div>
            </div>
            {step.edge && (
              <p className="py-2 pl-10 font-mono text-12 text-ink-faint">
                <span aria-hidden="true">↓ </span>
                <span className="sr-only">then, through </span>
                {step.edge}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
