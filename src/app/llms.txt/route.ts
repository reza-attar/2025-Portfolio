import { caseStudies, caseStudyHref } from "@/lib/case-studies";
import { moreCaseStudies, projects } from "@/lib/projects";
import { resume } from "@/lib/resume";
import { site } from "@/lib/site";
import { getGithubLink, getLinkedinLink } from "@/lib/utils";

export const dynamic = "force-static";

// /llms.txt (llmstxt.org): a plain-text map of the site for AI agents and LLM crawlers.
// Built from content/resume.md and the case studies, so it never drifts from the pages.
export function GET() {
  const url = (path: string) => `${site.url}${path}`;
  const studies = [...projects, ...moreCaseStudies]
    .map((p) => caseStudies.find((s) => caseStudyHref(s.slug) === p.caseHref))
    .filter((s) => s !== undefined);

  const text = `# ${site.name}

> ${resume.title}. ${site.tagline} ${resume.role} at ${resume.company}, based in ${resume.location}, ${site.relocation.sentence}.

${resume.summary.join("\n\n")}

Currently: ${resume.product.role.toLowerCase()} on ${resume.product.name}.

## Pages

- [About](${url("/about")}): background, current work and past roles
- [Works](${url("/works")}): products built end to end, with the layers (data, backend, AI, interface) built for each
- [Resume](${url("/resume")}): experience, projects, skills, awards, education and languages
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
