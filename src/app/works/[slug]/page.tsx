import Label from "@/components/ui/Tag";
import {
  caseStudies,
  caseStudyHref,
  CaseStudyImage,
  CaseStudySection,
} from "@/lib/case-studies";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, ReactNode } from "react";

type Props = { params: Promise<{ slug: string }> };

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus";

const prose = "text-pretty text-16 leading-[1.7] text-ink-muted xl:text-18";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.name} · ${site.name}`,
    description: study.lede,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const study = caseStudies[index];
  const count = caseStudies.length;
  const prev = caseStudies[(index - 1 + count) % count];
  const next = caseStudies[(index + 1) % count];

  const meta: { label: string; value: ReactNode }[] = [
    { label: "Role", value: study.role },
    { label: "Type", value: study.type },
    { label: "Period", value: study.period },
    {
      label: "Link",
      value: study.live ? (
        <Link
          href={study.live}
          target="_blank"
          aria-label={`${study.liveLabel} (opens in new tab)`}
          className={cn(
            "rounded-[3px] text-ink-strong underline underline-offset-4",
            focusRing,
            "focus-visible:outline-offset-2",
          )}
        >
          {study.liveLabel}
        </Link>
      ) : (
        "Not public"
      ),
    },
  ];

  return (
    <main className="mt-20 flex w-full max-w-screen-lg flex-col gap-14 px-4">
      <Link
        href="/works"
        className={cn(
          "inline-flex w-fit items-center gap-1 rounded text-16 text-ink-muted hover:text-ink-strong",
          focusRing,
          "focus-visible:outline-offset-[3px]",
        )}
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        All work
      </Link>

      <section className="flex flex-col gap-6">
        <div className="flex max-w-[820px] flex-col gap-3">
          <h1 className="text-balance text-48 font-bold leading-[1.05] text-ink-strong xl:text-80">
            {study.name}
            {study.nameFa && (
              <>
                {" "}
                <span
                  lang="fa"
                  dir="rtl"
                  className="align-middle text-[.4em] font-medium text-ink-muted"
                >
                  {study.nameFa}
                </span>
              </>
            )}
          </h1>
          <p className="text-pretty text-18 leading-[1.45] text-ink-muted xl:text-24">
            {study.lede}
          </p>
        </div>

        <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-6 gap-y-5 border-y border-divider py-6">
          {meta.map((item) => (
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

        {study.note && (
          <p className="text-15 italic leading-[1.6] text-ink-muted">
            {study.note}
          </p>
        )}
      </section>

      {study.hero && (
        <figure className="overflow-hidden rounded-4xl border border-panel-border bg-panel">
          <Image
            src={study.hero.src}
            alt={study.hero.alt}
            priority
            sizes="(min-width: 1024px) 992px, 100vw"
            className="block h-auto w-full"
          />
        </figure>
      )}

      <div className="flex flex-col">
        {study.sections.map((section) => (
          <Section key={section.label} section={section} />
        ))}
      </div>

      <nav
        aria-label="More case studies"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4"
      >
        <PagerLink href={caseStudyHref(prev.slug)} name={prev.name}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          Previous
        </PagerLink>
        <PagerLink href={caseStudyHref(next.slug)} name={next.name} alignEnd>
          Next
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </PagerLink>
      </nav>
    </main>
  );
}

function Section({ section }: { section: CaseStudySection }) {
  return (
    <section
      aria-label={section.label}
      className="flex flex-wrap gap-x-8 gap-y-3 border-t border-divider py-10"
    >
      <h2 className="max-w-full flex-[0_0_200px] pt-1 text-14 font-semibold uppercase tracking-[.06em] text-ink-label">
        {section.label}
      </h2>
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
        {section.metrics && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {section.metrics.map((metric) => (
              <div
                key={metric.caption}
                className="flex flex-col gap-1.5 rounded-[20px] border border-panel-border bg-panel px-6 py-5"
              >
                <span className="text-[28px] font-extrabold tabular-nums leading-[1.15] text-ink-strong">
                  {metric.value}
                </span>
                <span className="text-14 leading-[1.45] text-ink-muted">
                  {metric.caption}
                </span>
              </div>
            ))}
          </div>
        )}

        {section.paras?.map((para) => (
          <p key={para} className={prose}>
            <Rich text={para} />
          </p>
        ))}

        {section.tags && (
          <div className="flex flex-wrap gap-2">
            {section.tags.map((tag) => (
              <Label key={tag}>{tag}</Label>
            ))}
          </div>
        )}

        {section.steps && (
          <ol className="flex flex-col gap-4">
            {section.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-8 flex-[0_0_32px] place-items-center rounded-full border border-panel-border bg-panel text-14 font-semibold text-ink-strong"
                >
                  {i + 1}
                </span>
                <p className={cn(prose, "pt-0.5")}>
                  <Rich text={step} />
                </p>
              </li>
            ))}
          </ol>
        )}

        {section.list && (
          <ul className="flex list-disc flex-col gap-3 pl-[22px]">
            {section.list.map((item) => (
              <li key={item} className={prose}>
                <Rich text={item} />
              </li>
            ))}
          </ul>
        )}

        {section.flow && (
          <div className="flex flex-col gap-3 rounded-[20px] border border-panel-border bg-panel p-6">
            {section.flow.map((row, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                {row.map((item, j) =>
                  "node" in item ? (
                    <span
                      key={j}
                      className="rounded-[10px] border border-tag-border bg-tag px-3.5 py-2 text-15 font-medium text-ink-strong"
                    >
                      {item.node}
                    </span>
                  ) : (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1 text-[13px] text-ink-muted"
                    >
                      {item.edge}
                      <ArrowRight
                        aria-label={item.edge ? undefined : "to"}
                        aria-hidden={item.edge ? "true" : undefined}
                        className="h-[18px] w-[18px]"
                      />
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        )}

        {section.after?.map((para) => (
          <p key={para} className={prose}>
            <Rich text={para} />
          </p>
        ))}

        {section.table && (
          <div className="overflow-x-auto rounded-2xl border border-panel-border">
            <table className="w-full border-collapse text-15 tabular-nums">
              <thead>
                <tr>
                  {section.table.head.map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="border-b border-panel-border bg-panel px-4 py-3 text-left font-semibold text-ink-strong"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map(([name, before, after]) => (
                  <tr
                    key={name}
                    className="[&>*]:border-b [&>*]:border-divider last:[&>*]:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-left font-medium text-ink"
                    >
                      {name}
                    </th>
                    <td className="px-4 py-3 text-ink-muted">{before}</td>
                    <td className="px-4 py-3 font-bold text-ink-strong">
                      {after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section.footnote && (
          <p className="text-14 leading-[1.6] text-ink-muted">
            {section.footnote}
          </p>
        )}

        {section.images?.map((image) => (
          <Figure key={image.alt} image={image} />
        ))}
      </div>
    </section>
  );
}

function Figure({ image }: { image: CaseStudyImage }) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={image.src}
        alt={image.alt}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="block h-auto w-full rounded-2xl border border-panel-border"
      />
      {image.caption && (
        <figcaption className="text-14 text-ink-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function PagerLink({
  href,
  name,
  alignEnd = false,
  children,
}: {
  href: string;
  name: string;
  alignEnd?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-1.5 rounded-3xl border border-panel-border bg-panel px-7 py-6 transition-[border-color] duration-200 hover:border-card-hover",
        alignEnd && "items-end text-right",
        focusRing,
        "focus-visible:outline-offset-[3px]",
      )}
    >
      <span className="inline-flex items-center gap-0.5 text-14 text-ink-muted">
        {children}
      </span>
      <span className="text-20 font-extrabold text-ink-strong">{name}</span>
    </Link>
  );
}

// Renders **bold** and `code` inside otherwise plain copy.
function Rich({ text }: { text: string }) {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**"))
        return (
          <strong key={i} className="font-semibold text-ink-strong">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("`"))
        return (
          <code
            key={i}
            className="font-mono rounded-md border border-tag-border bg-tag px-1.5 py-px text-[.88em] text-tag-fg"
          >
            {part.slice(1, -1)}
          </code>
        );
      return <Fragment key={i}>{part}</Fragment>;
    });
}
