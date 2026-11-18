import { resume } from "@/lib/resume";

// Projects, skills, awards, education and languages
export default function ResumeExtras() {
  const t = resume.sectionTitles;
  return (
    <>
      <section id="projects" aria-labelledby="r-projects">
        <h2 id="r-projects" className="paper-h2">{t.projects}</h2>
        {resume.projects.map((group) => (
          <div key={group.heading}>
            <h3 className="paper-h4">{group.heading}</h3>
            <ul>
              {group.items.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  {p.link && (
                    <>
                      {" "}· <a href={p.link.href}>{p.link.label}</a>
                    </>
                  )}
                  : {p.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="skills" aria-labelledby="r-skills">
        <h2 id="r-skills" className="paper-h2">{t.skills}</h2>
        <ul>
          {resume.skills.map((s) => (
            <li key={s.label}>
              <strong>{s.label}:</strong> {s.items.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section id="awards" aria-labelledby="r-awards">
        <h2 id="r-awards" className="paper-h2">{t.awards}</h2>
        <ul>
          {resume.awards.map((a) => (
            <li key={a.title}>
              <strong>{a.title}</strong>, {a.org} · {a.date}
              {a.note && <> — {a.note}</>}
            </li>
          ))}
        </ul>
      </section>

      <section id="education" aria-labelledby="r-education">
        <h2 id="r-education" className="paper-h2">{t.education}</h2>
        {resume.education.map((e) => (
          <p key={e.degree}>
            <strong>{e.degree}</strong>, {e.school} · {e.period} · {e.location}
          </p>
        ))}
      </section>

      <section id="languages" aria-labelledby="r-languages">
        <h2 id="r-languages" className="paper-h2">{t.languages}</h2>
        <p>{resume.languages.map((l) => `${l.name}: ${l.level}`).join(" · ")}</p>
      </section>
    </>
  );
}
