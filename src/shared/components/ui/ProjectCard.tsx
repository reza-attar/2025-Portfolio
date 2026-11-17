import type { Project } from "@/lib/projects";
import type { MouseEvent } from "react";
import Tile from "./Tile";

// White card; the whole card is the link
export default function ProjectCard({ project, onOpen }: { project: Project; onOpen?: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a className="pcard" href={`/projects/${project.slug}`} onClick={onOpen}>
      <Tile color={project.color} icon="folder" size={40} />
      <span className="pcard-title">{project.name}</span>
      <span className="pcard-line">{project.oneLiner}</span>
      <span className="pcard-stack">{project.stack.join(" · ")}</span>
    </a>
  );
}
