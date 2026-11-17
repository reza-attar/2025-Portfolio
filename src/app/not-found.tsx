import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404.txt — Page not found",
  robots: { index: false },
};

// A static window: the desktop icons and taskbar still work around it
export default function NotFound() {
  return (
    <section className="win win-static win-404" data-front="true" aria-labelledby="win-title-404">
      <div className="win-titlebar">
        <span className="win-dot" style={{ background: "var(--accent)" }} aria-hidden="true" />
        <h2 id="win-title-404" className="win-title">404.txt</h2>
      </div>
      <div className="win-body">
        <div className="app">
          <h1 className="h2">File not found.</h1>
          <p className="lede">The page you followed doesn&apos;t exist, or it moved. The work is one click away.</p>
          <div className="actions">
            <Link className="btn btn-primary btn-md" href="/projects">Open ~/projects</Link>
            <Link className="btn btn-secondary btn-md" href="/">about.md</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
