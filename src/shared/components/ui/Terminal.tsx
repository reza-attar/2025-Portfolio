export type TerminalLine =
  | { kind: "cmd"; text: string }
  | { kind: "kv"; k: string; v: string }
  | { kind: "out"; text: string };

// Dark terminal block: `$` prompt in yellow, keys in blue, commands in green, blinking cursor
export default function Terminal({ lines, label }: { lines: TerminalLine[]; label?: string }) {
  return (
    <pre className="terminal" aria-label={label}>
      {lines.map((l, i) => (
        <span key={i} className="term-line">
          {l.kind === "cmd" && (
            <>
              <span className="term-prompt">$ </span>
              <span className="term-cmd">{l.text}</span>
            </>
          )}
          {l.kind === "kv" && (
            <>
              <span className="term-key">{l.k}</span>
              <span className="term-sep"> = </span>
              {l.v}
            </>
          )}
          {l.kind === "out" && l.text}
          {"\n"}
        </span>
      ))}
      <span className="term-prompt">$ </span>
      <span className="term-cursor" aria-hidden="true" />
    </pre>
  );
}
