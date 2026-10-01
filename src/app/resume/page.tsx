import { buttonVariants } from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Label from "@/components/ui/Tag";
import { ExperienceGroup, RESUME_PDF_PATH, resume } from "@/lib/resume";
import { site } from "@/lib/site";
import { cn, getLinkedinLink } from "@/lib/utils";
import { Download, SendHorizontal } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `Resume · ${site.name}`,
  description: `Resume of ${site.name}, ${site.title}`,
};

const inlineLink =
  "rounded-[3px] text-ink-strong underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export default function ResumePage() {
  const contactLinks = [
    { label: resume.email, href: `mailto:${resume.email}` },
    { label: "LinkedIn", href: getLinkedinLink() },
    { label: "GitHub", href: resume.links.github },
    { label: "Stack Overflow", href: resume.links.stackOverflow },
  ];

  return (
    <main className="mt-20 w-full max-w-screen-lg space-y-16 print:mt-0 print:space-y-8 [&>*]:px-4 print:[&>*]:px-0">
      <section className="space-y-8 print:hidden">
        <div className="max-w-[80%] space-y-2">
          <h1 className="text-48 font-bold leading-[1.1] text-ink-strong xl:text-80">
            Resume
          </h1>
          <p className="text-16 text-ink-faint xl:text-24">
            Where I&apos;ve worked, what I&apos;ve built, and what I use.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={RESUME_PDF_PATH}
            download="Reza_Attar_Resume.pdf"
            className={cn(
              "text-18 sm:w-fit",
              buttonVariants({ variant: "primary" }),
            )}
          >
            <Download aria-hidden="true" />
            Download PDF
          </a>
          <Link
            href="/contact"
            className={cn(
              "text-18 sm:w-fit",
              buttonVariants({ variant: "secondary" }),
            )}
          >
            <SendHorizontal aria-hidden="true" />
            Get in touch
          </Link>
        </div>
      </section>

      <Divider className="w-full print:hidden" />

      <section className="space-y-3">
        <p className="text-32 font-bold text-ink-strong xl:text-40">
          {resume.name}
        </p>
        <p className="text-16 font-medium text-ink-strong xl:text-18">
          {resume.title}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-15 text-ink-muted">
          <li>{resume.location}</li>
          {contactLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                className={inlineLink}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-15 text-ink-muted">{resume.availability}</p>
      </section>

      <Section title="Summary">
        <p className="text-pretty text-15 leading-[1.7] text-ink-muted xl:text-18">
          {resume.summary}
        </p>
      </Section>

      <Section title="Experience">
        <div className="space-y-12 print:space-y-6">
          {resume.experience.map((job) => (
            <article
              key={job.company}
              className="space-y-4 xl:grid xl:grid-cols-[200px_1fr] xl:gap-8 xl:space-y-0 print:block print:space-y-2"
            >
              <div className="text-14 leading-[1.6] text-ink-muted print:hidden">
                <p>{job.period}</p>
                <p>{job.location}</p>
              </div>
              <div className="space-y-4 print:space-y-2">
                {/* Keep the job heading on the same printed page as its first group */}
                <div className="space-y-4 print:break-inside-avoid print:space-y-2">
                  <div className="print:flex print:items-baseline print:justify-between print:gap-4">
                    <div>
                      <h3 className="text-20 font-bold text-ink-strong">
                        {job.company}
                      </h3>
                      <p className="text-16 font-medium text-ink-strong">
                        {job.role}
                      </p>
                    </div>
                    <p className="hidden shrink-0 text-14 text-ink-muted print:block">
                      {job.period} · {job.location}
                    </p>
                  </div>
                  <JobGroup group={job.groups[0]} />
                </div>
                {job.groups.slice(1).map((group, i) => (
                  <JobGroup key={group.heading ?? i} group={group} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Products & Projects">
        <div className="space-y-10 print:space-y-4">
          {resume.projects.map((group) => (
            <div key={group.heading} className="space-y-4 print:space-y-2">
              <h3 className="text-14 font-semibold uppercase tracking-wide text-ink-muted print:break-after-avoid">
                {group.heading}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 print:block print:space-y-3">
                {group.items.map((project) => (
                  <article
                    key={project.name}
                    className="space-y-2 rounded-2xl border border-panel-border bg-panel p-6 print:break-inside-avoid print:rounded-none print:border-0 print:bg-transparent print:p-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h4 className="text-18 font-bold text-ink-strong">
                        {project.name}
                      </h4>
                      {project.link && (
                        <Link
                          href={project.link.href}
                          target="_blank"
                          className={cn("text-14", inlineLink)}
                        >
                          {project.link.label}
                        </Link>
                      )}
                    </div>
                    <p className="text-pretty text-15 leading-[1.6] text-ink-muted">
                      {project.description}
                    </p>
                    {project.stack && (
                      <p className="text-14 leading-normal text-ink-muted">
                        <span className="font-medium text-ink-strong">
                          Stack:
                        </span>{" "}
                        {project.stack}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Technical Skills">
        <div className="space-y-6 print:space-y-2">
          {resume.skills.map((group) => (
            <div
              key={group.label}
              className="space-y-3 xl:grid xl:grid-cols-[200px_1fr] xl:gap-8 xl:space-y-0 print:hidden"
            >
              <h3 className="text-14 font-semibold uppercase tracking-wide text-ink-muted xl:pt-1.5">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Label key={item}>{item}</Label>
                ))}
              </div>
            </div>
          ))}
          {/* Compact comma-separated version for the PDF / print output */}
          {resume.skills.map((group) => (
            <p key={group.label} className="hidden text-14 print:block">
              <span className="font-semibold">{group.label}:</span>{" "}
              {group.items.join(", ")}
            </p>
          ))}
        </div>
      </Section>

      <div className="grid gap-16 md:grid-cols-2 print:grid-cols-2 print:gap-8">
        <Section title="Awards">
          <ul className="space-y-4 print:space-y-2">
            {resume.awards.map((award) => (
              <li key={award.title} className="space-y-1">
                <p className="text-16 font-semibold text-ink-strong">
                  {award.title}
                </p>
                <p className="text-14 text-ink-muted">
                  {award.org} · {award.date}
                </p>
                {award.note && (
                  <p className="text-14 text-ink-muted">{award.note}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <div className="space-y-16 print:space-y-8">
          <Section title="Education">
            {resume.education.map((edu) => (
              <div key={edu.degree} className="space-y-1">
                <p className="text-16 font-semibold text-ink-strong">
                  {edu.degree}
                </p>
                <p className="text-14 text-ink-muted">{edu.school}</p>
                <p className="text-14 text-ink-muted">
                  {edu.period} · {edu.location}
                </p>
              </div>
            ))}
          </Section>

          <Section title="Languages">
            <ul className="space-y-2">
              {resume.languages.map((lang) => (
                <li key={lang.name} className="flex justify-between gap-4">
                  <span className="text-16 font-semibold text-ink-strong">
                    {lang.name}
                  </span>
                  <span className="text-14 text-ink-muted">{lang.level}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6 print:space-y-3">
      <h2 className="text-16 font-semibold tracking-wide text-ink-label print:border-b print:border-black/20 print:pb-1 print:text-onyx">
        {title.toUpperCase()}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-15 leading-[1.6] text-ink-muted print:space-y-1 print:text-14">
      {items.map((item) => (
        <li key={item} className="text-pretty">
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobGroup({ group }: { group: ExperienceGroup }) {
  return (
    <div className="space-y-2 print:break-inside-avoid">
      {group.heading && (
        <h4 className="text-14 font-semibold uppercase tracking-wide text-ink-muted">
          {group.heading}
        </h4>
      )}
      <Bullets items={group.bullets} />
    </div>
  );
}
