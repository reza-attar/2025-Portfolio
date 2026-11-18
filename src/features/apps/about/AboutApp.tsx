import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { appLinkClick } from "@/features/os/components/AppLink";
import Button from "@/shared/components/ui/Button";
import Callout from "@/shared/components/ui/Callout";
import CommitLog from "@/shared/components/ui/CommitLog";
import Icon from "@/shared/components/ui/Icon";
import ProjectCard from "@/shared/components/ui/ProjectCard";
import StatusBadge from "@/shared/components/ui/StatusBadge";
import { careerLog } from "./career";

export default function AboutApp() {
  const [before, accent, after] = profile.headline;
  return (
    <article className="app app-about">
      <div className="badges">
        <StatusBadge>{profile.status}</StatusBadge>
        <StatusBadge tone="yellow">{site.relocation.short}</StatusBadge>
      </div>
      <h1 className="display">
        {before} <span className="accent-text">{accent}</span> {after}
      </h1>
      <p className="lede">{profile.intro}</p>
      <div className="actions">
        <Button variant="primary" size="lg" href="/projects" onClick={appLinkClick("projects")}>
          Open ~/projects <Icon name="arrow" size={18} />
        </Button>
        <Button size="lg" href="/resume" onClick={appLinkClick("resume")}>
          resume.pdf
        </Button>
      </div>

      <h2 className="overline">Recent work</h2>
      <div className="card-grid">
        {projects.slice(0, 3).map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={appLinkClick(`project:${p.slug}`)} />
        ))}
      </div>

      <h2 className="overline">git log --career</h2>
      <CommitLog entries={careerLog} />

      <Callout label="Shameless CTA">
        <p>{profile.availability}. If your team needs someone who ships the schema, the API and the screen, I&apos;d like to hear about it.</p>
        <Button variant="dark" href="/contact" onClick={appLinkClick("contact")}>
          Hire me
        </Button>
      </Callout>
    </article>
  );
}
