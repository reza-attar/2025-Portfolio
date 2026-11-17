import { appLinkClick } from "@/features/os/components/AppLink";
import { projectSlug, type AppId } from "@/features/os/app-meta";
import { getCaseStudy } from "@/lib/case-studies";
import { getProject, projects } from "@/lib/projects";
import Button from "@/shared/components/ui/Button";
import Chip from "@/shared/components/ui/Chip";
import Icon from "@/shared/components/ui/Icon";
import Tile from "@/shared/components/ui/Tile";
import Image from "next/image";
import ProjectSection from "./ProjectSection";

// A case study: problem → what I built → result
export default function ProjectApp({ id }: { id: AppId }) {
  const slug = projectSlug(id as `project:${string}`);
  const p = getProject(slug);
  const study = getCaseStudy(slug);
  if (!p || !study) return <p className="app">This project is not in ~/projects any more.</p>;
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="app app-project">
      <header className="cs-head">
        <Tile color={p.color} icon="folder" size={44} />
        <div>
          <p className="overline">{study.type} · {study.period}</p>
          <h1 className="h2">{study.name}</h1>
        </div>
      </header>
      <p className="lede">{study.lede}</p>
      <dl className="kv">
        <dt>role</dt>
        <dd>{study.role}</dd>
        <dt>stack</dt>
        <dd className="chips">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</dd>
      </dl>
      <div className="actions">
        {study.live && (
          <Button variant="primary" href={study.live} target="_blank" rel="noopener noreferrer">
            Live demo: {study.liveLabel} <Icon name="external" size={16} />
          </Button>
        )}
        {(study.note || !study.live) && <p className="note">{study.note ?? study.linkNote ?? "Not public."}</p>}
      </div>
      {study.hero && (
        <figure className="shot">
          <Image src={study.hero.src} alt={study.hero.alt} sizes="(max-width: 767px) 100vw, 480px" placeholder="blur" />
        </figure>
      )}
      {study.sections.map((s) => <ProjectSection key={s.label} s={s} />)}
      <a className="next-link" href={`/projects/${next.slug}`} onClick={appLinkClick(`project:${next.slug}`)}>
        Next: {next.name} <Icon name="arrow" size={16} />
      </a>
    </article>
  );
}
