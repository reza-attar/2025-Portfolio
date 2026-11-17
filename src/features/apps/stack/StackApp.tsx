import { resume } from "@/lib/resume";
import Terminal, { type TerminalLine } from "@/shared/components/ui/Terminal";

// Short keys for the resume's skill groups
const keys: Record<string, string> = {
  "Front-end": "frontend",
  "Back-end & data": "backend",
  "AI engineering": "ai_ml",
  Infrastructure: "infra",
  Languages: "languages",
  "Testing & tooling": "testing",
};
const order = ["frontend", "backend", "ai_ml", "infra", "languages", "testing"];

export default function StackApp() {
  const groups = resume.skills
    .map((g) => ({ k: keys[g.label] ?? g.label.toLowerCase(), v: g.items.join(", ") }))
    .sort((a, b) => order.indexOf(a.k) - order.indexOf(b.k));
  const lines: TerminalLine[] = [
    { kind: "cmd", text: "./stack.sh --all" },
    ...groups.map((g) => ({ kind: "kv" as const, ...g })),
  ];
  return (
    <div className="app app-stack">
      <h1 className="sr-only">Stack</h1>
      <Terminal lines={lines} label="The tools I use, by layer" />
    </div>
  );
}
