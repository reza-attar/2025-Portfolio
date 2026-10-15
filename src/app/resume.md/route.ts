import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

// /resume.md: content/resume.md as published, for agents that prefer Markdown.
// The editing notes (HTML comments) are left out.
export function GET() {
  const markdown = fs
    .readFileSync(path.join(process.cwd(), "content/resume.md"), "utf8")
    .replace(/<!--[\s\S]*?-->\n*/g, "");

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
