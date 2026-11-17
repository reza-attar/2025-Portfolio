import { caseStudyHref, getCaseStudy } from "@/lib/case-studies";
import { highlights } from "@/lib/highlights";
import { contributions } from "@/lib/open-source";
import { projects } from "@/lib/projects";
import { resume } from "@/lib/resume";
import { site } from "@/lib/site";
import { getGithubLink, getLinkedinLink } from "@/lib/utils";

export const dynamic = "force-static";

// /llms.txt (llmstxt.org): a plain-text map of the site for AI agents and LLM crawlers.
// Built from content/resume.md and the case studies, so it never drifts from the pages.
export function GET() {
  const url = (path: string) => `${site.url}${path}`;
  const studies = projects.map((p) => getCaseStudy(p.slug)).filter((s) => s !== undefined);

  const text = `# ${site.name}

> ${resume.title}. ${site.tagline} ${resume.role} at ${resume.company}, based in ${resume.location}, ${site.relocation.sentence}.

${resume.summary.join("\n\n")}

Currently: ${resume.product.role.toLowerCase()} on ${resume.product.name}.

## Highlights

${highlights.map((h) => `- ${h.value} ${h.label}: ${h.context}`).join("\n")}

## Experience

${resume.experience.map((j) => `- ${j.role}, ${j.company} (${j.period}, ${j.location})`).join("\n")}
${
  contributions.length > 0
    ? `
## Open source

${contributions.map((c) => `- [${c.project}: ${c.title}](${c.href}) (${c.kind}, ${c.date})`).join("\n")}
`
    : ""
}
## Pages

The site is a small desktop OS: every page opens as a window, and every window is also a plain URL.

- [about.md](${url("/")}): who I am, what I'm doing now, and the career as a commit log
- [~/projects](${url("/projects")}): products built end to end; each one opens its own case study
- [stack.sh](${url("/stack")}): the tools I use, by layer
- [resume.pdf](${url("/resume")}): experience, projects, skills, awards, education and languages
- [Contact](${url("/contact")}): how to get in touch

## Case studies

${studies.map((s) => `- [${s.name}](${url(caseStudyHref(s.slug))}): ${s.lede}`).join("\n")}

## Resume files

- [Resume as Markdown](${url("/resume.md")}): the full resume, the source the site and the PDF are built from
- [Resume as PDF](${url("/Reza_Attar_Resume.pdf")})

## Contact

- Email: ${resume.email}
- [LinkedIn](${getLinkedinLink()})
- [GitHub](${getGithubLink()})
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
