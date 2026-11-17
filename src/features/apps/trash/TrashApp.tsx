import Tile from "@/shared/components/ui/Tile";

export default function TrashApp() {
  return (
    <div className="app app-trash">
      <h1 className="sr-only">Trash</h1>
      <div className="trash-row">
        <Tile color="yellow" icon="folder" size={32} />
        <span className="mono-sm">old-portfolio-jquery/</span>
      </div>
      <p className="hint">
        A parallax hero, a loading spinner for a page with nothing to load, and a skills section measured in
        percentages. It stays in here.
      </p>
    </div>
  );
}
