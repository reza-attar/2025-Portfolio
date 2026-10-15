import SystemDiagram from "@/components/SystemDiagram";
import { buttonVariants } from "@/components/ui/Button";
import { caseStudyHref } from "@/lib/case-studies";
import { productLaunch, resume } from "@/lib/resume";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Portrait from "@public/portrait.jpg";
import Image from "next/image";
import Link from "next/link";

const highlight =
  "underline decoration-[3px] underline-offset-[6px] xl:decoration-4 xl:underline-offset-8";

export default function Hero() {
  return (
    <section
      aria-label="introduction"
      className="mt-12 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
    >
      <div className="space-y-6 xl:space-y-8">
        <div className="flex items-center gap-3">
          <Image
            width={44}
            height={44}
            quality={90}
            src={Portrait}
            placeholder="blur"
            alt={`${site.name} portrait`}
            className="h-11 w-11 shrink-0 rounded-full border border-panel-border object-cover"
          />
          <p className="leading-tight">
            <span className="block text-16 font-bold text-ink-strong">
              {site.name}
            </span>
            <span className="font-mono text-12 text-ink-faint">
              {resume.role.toLowerCase()} @ {resume.company.toLowerCase()}
            </span>
          </p>
        </div>

        <h1 className="text-balance text-40 font-extrabold leading-[1.08] tracking-[-0.02em] text-ink-strong sm:text-48 xl:text-60">
          I build products from{" "}
          <span className={cn(highlight, "decoration-layer-data")}>schema</span>{" "}
          to{" "}
          <span className={cn(highlight, "decoration-layer-interface")}>
            interface
          </span>
          .
        </h1>

        <p className="max-w-[52ch] text-pretty text-16 leading-[1.55] text-ink-muted xl:text-18">
          Full-stack engineer with{" "}
          <span className="font-semibold text-ink-strong">
            {resume.experienceYears}
          </span>{" "}
          of production TypeScript. I design the database, the backend, the AI
          layer and the UI, and the joins between them. Right now I work on{" "}
          <Link
            href={caseStudyHref("ticket-yar")}
            className="rounded-[3px] font-semibold text-ink-strong underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {resume.product.name}
          </Link>
          , an AI support platform built on RAG and LLMs that launched in{" "}
          {productLaunch.month}.
        </p>

        <div
          aria-label="call to actions"
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href={"/works"}
            className={cn(
              "text-18 sm:w-fit",
              buttonVariants({ variant: "primary" }),
            )}
          >
            See the work
          </Link>
          <Link
            href={"/resume"}
            className={cn(
              "text-18 sm:w-fit",
              buttonVariants({ variant: "secondary" }),
            )}
          >
            Read my resume
          </Link>
        </div>

        <p className="font-mono text-12 text-ink-faint">
          based in {resume.location.toLowerCase()} · {site.relocation.short}
        </p>
      </div>

      <SystemDiagram />
    </section>
  );
}
