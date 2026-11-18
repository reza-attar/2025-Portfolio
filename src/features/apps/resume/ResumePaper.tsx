import { resume } from "@/lib/resume";
import { slugify } from "@/lib/utils";

const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function ResumePaper() {
  const { links } = resume;
  return (
    <>
      <header className="paper-head">
        <h1 className="paper-name">{resume.name}</h1>
        <p className="paper-title">{resume.title}</p>
        <p className="paper-contact">
          {resume.location} · <a href={`mailto:${resume.email}`}>{resume.email}</a> ·{" "}
          <a href={links.linkedin}>{short(links.linkedin)}</a> · <a href={links.github}>{short(links.github)}</a>
        </p>
        <p className="paper-contact">{resume.availability}</p>
      </header>

      <section id="summary" aria-labelledby="r-summary">
        <h2 id="r-summary" className="paper-h2">{resume.sectionTitles.summary}</h2>
        {resume.summary.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section id="experience" aria-labelledby="r-experience">
        <h2 id="r-experience" className="paper-h2">{resume.sectionTitles.experience}</h2>
        {resume.experience.map((job) => (
          <div key={job.company} id={slugify(job.company)} className="paper-job">
            <h3 className="paper-h3">
              {job.role}, {job.company}
            </h3>
            <p className="paper-meta">
              {job.period} · {job.location}
            </p>
            {job.groups.map((g, i) => (
              <div key={g.heading ?? i}>
                {g.heading && <h4 className="paper-h4">{g.heading}</h4>}
                <ul>
                  {g.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
