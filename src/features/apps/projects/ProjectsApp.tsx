import { projects } from "@/lib/projects";
import { appLinkClick } from "@/features/os/components/AppLink";
import FileTable from "@/shared/components/ui/FileTable";
import Tile from "@/shared/components/ui/Tile";

export default function ProjectsApp() {
  const rows = projects.map((p) => ({
    key: p.slug,
    cells: [
      <a key="name" className="ftable-name" href={`/projects/${p.slug}`} onClick={appLinkClick(`project:${p.slug}`)}>
        <Tile color={p.color} icon="folder" size={26} />
        {p.name}
      </a>,
      p.oneLiner,
      <span key="stack" className="mono-sm">{p.stack.join(", ")}</span>,
    ],
  }));

  return (
    <div className="app app-projects">
      <div className="pathbar">
        <h1 className="pathbar-path">~/projects</h1>
        <span className="pathbar-count">{projects.length} items</span>
      </div>
      <FileTable caption="Projects: open one to read the case study" head={["Name", "What it is", "Stack"]} rows={rows} />
      <p className="hint">Click a name to open its window. Every window is also a link you can share.</p>
    </div>
  );
}
