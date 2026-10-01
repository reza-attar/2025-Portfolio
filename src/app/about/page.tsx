import { buttonVariants } from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import PortraitImage from "@public/portrait.jpg";
import { ChevronRight, Download, SendHorizontal } from "lucide-react";

import Signature from "@/components/about/Signature";
import { resume } from "@/lib/resume";
import { site, siteLanguages } from "@/lib/site";
import { cn, getLinkedinLink, getYoutubeLink } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus";

const inlineLink = cn(
  "rounded-[3px] text-ink-strong underline underline-offset-[3px] hover:text-ink-strong",
  focusRing,
  "focus-visible:outline-offset-2",
);

const glance = [
  { label: "Role", value: `${site.role}, ${site.company}` },
  { label: "Based in", value: `${site.country} · ${site.relocation.short}` },
  { label: "Languages", value: siteLanguages },
  { label: "Focus", value: site.focus },
];

export default function AboutPage() {
  return (
    <main className="mt-20 flex max-w-screen-lg flex-col gap-16 [&>*]:px-4">
      <section className="flex max-w-[80%] flex-col gap-2">
        <h1 className="text-balance text-48 font-bold leading-[1.1] text-ink-strong xl:text-80">
          A little bit about me
        </h1>
        <p className="text-16 text-ink-faint xl:text-24">
          Who I am and what I do.
        </p>
      </section>

      <Divider className="w-full" />

      <div className="flex flex-row-reverse flex-wrap justify-between gap-16">
        <div className="mx-auto flex w-[320px] max-w-full flex-col gap-8 xl:mx-0">
          <Image
            width={320}
            height={400}
            quality={100}
            priority={false}
            placeholder="blur"
            src={PortraitImage}
            className="aspect-[4/5] w-full rounded-lg border border-panel-border object-cover"
            alt="A portrait of Reza Attar"
          />
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className={cn("text-18", buttonVariants({ variant: "primary" }))}
            >
              <SendHorizontal aria-hidden="true" />
              Get in touch
            </Link>
            <Link
              href="/resume"
              className={cn(
                "text-18",
                buttonVariants({ variant: "secondary" }),
              )}
            >
              <Download aria-hidden="true" />
              Download resume
            </Link>
          </div>
        </div>

        <div className="flex min-w-[min(100%,300px)] max-w-full flex-[1_1_360px] flex-col gap-14 xl:max-w-[50%]">
          <dl
            aria-label="At a glance"
            className="grid grid-cols-1 gap-x-6 gap-y-5 border-y border-divider py-6 sm:grid-cols-2"
          >
            {glance.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-12 font-semibold uppercase tracking-[.06em] text-ink-label">
                  {item.label}
                </dt>
                <dd className="text-16 font-medium text-ink-strong">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-8">
            <AboutBlock title="Who I am">
              I&apos;m <Strong>{site.name.split(" ")[0]}</Strong> (pronounced “
              {site.pronunciation}”), a full-stack engineer based in{" "}
              {site.country}. I build the whole path from database schema to
              interface, and I&apos;m {site.relocation.sentence}.
            </AboutBlock>
            <AboutBlock title="What I do">
              I&apos;m a {site.role} at {site.company}, where I lead{" "}
              <Strong>{site.products.myca.name}</Strong>, an AI support platform
              for banking software. I moved its backend to NestJS, built the
              Jira and RAG pipeline on PostgreSQL and pgvector, and{" "}
              <Strong>cut compile time by 77%</Strong>. Before that, I led a
              three-person frontend team for a German company, fully remote. I
              also run a{" "}
              <Link
                href={getYoutubeLink()}
                target="_blank"
                aria-label="YouTube channel (opens in new tab)"
                className={inlineLink}
              >
                YouTube channel
              </Link>{" "}
              where I teach web development.
            </AboutBlock>
            <AboutBlock title="What I did">
              I started at 15 with Linux and WordPress, curious about how things
              work. That turned into <Strong>{site.experience}</Strong> of
              production JavaScript and TypeScript. Along the way I{" "}
              <Strong>won two coding contests</Strong> and took third place at
              the Sharif University LLM Agents Hackathon in 2025.
            </AboutBlock>
          </div>

          <p className="text-pretty text-15 leading-[1.6] text-ink-muted">
            Feel free to reach out via{" "}
            <Link href={`mailto:${resume.email}`} className={inlineLink}>
              e-mail
            </Link>
            , read my{" "}
            <Link href="/resume" className={inlineLink}>
              resume
            </Link>
            , or connect with me on{" "}
            <Link
              href={getLinkedinLink()}
              target="_blank"
              aria-label="LinkedIn (opens in new tab)"
              className={inlineLink}
            >
              LinkedIn
            </Link>
            .
          </p>

          <div className="flex flex-col gap-4">
            <p className="text-16 text-ink-muted">
              Let&apos;s build something great,
            </p>
            <Signature />
          </div>
        </div>
      </div>

      <section aria-label="experience" className="flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-14 font-semibold tracking-[.06em] text-ink-label">
            EXPERIENCE
          </h2>
          <Link
            href="/resume"
            className={cn(
              "inline-flex items-center gap-1 rounded text-16 text-ink-strong hover:underline hover:underline-offset-4",
              focusRing,
              "focus-visible:outline-offset-[3px]",
            )}
          >
            Full resume
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ol className="flex flex-col border-t border-divider">
          {resume.experience.map((job) => (
            <li
              key={job.company}
              className="grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-divider py-5 sm:grid-cols-[minmax(140px,200px)_minmax(0,1fr)_auto]"
            >
              <span className="text-14 text-ink-muted">{job.period}</span>
              <span className="text-18 font-bold text-ink-strong">
                {job.company}{" "}
                <span className="font-medium text-ink-muted">· {job.role}</span>
              </span>
              <span className="text-14 text-ink-muted">{job.location}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <span className="text-ink-strong">{children}</span>;
}

function AboutBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-14 font-semibold uppercase tracking-[.06em] text-ink-label">
        {title}
      </h2>
      <p className="text-pretty text-18 leading-[1.6] text-ink-muted">
        {children}
      </p>
    </div>
  );
}
