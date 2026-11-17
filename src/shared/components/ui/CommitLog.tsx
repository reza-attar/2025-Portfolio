export type Commit = {
  type: "feat" | "chore" | "fix";
  scope: string;
  text: string;
  dates?: string;
  detail?: string;
};

// History as conventional commits: a vertical rule, dots, and `feat(career): …` headings
export default function CommitLog({ entries }: { entries: Commit[] }) {
  return (
    <ol className="clog">
      {entries.map((c) => (
        <li key={`${c.scope}-${c.text}`} className="clog-item">
          <span className="clog-dot" aria-hidden="true" />
          <p className="clog-head">
            <span className={`clog-type clog-${c.type}`}>{c.type}</span>({c.scope}): {c.text}
          </p>
          {c.dates && <p className="clog-dates">{c.dates}</p>}
          {c.detail && <p className="clog-detail">{c.detail}</p>}
        </li>
      ))}
    </ol>
  );
}
