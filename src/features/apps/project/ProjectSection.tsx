import type { CaseStudySection } from "@/lib/case-studies";
import Chip from "@/shared/components/ui/Chip";
import Image from "next/image";
import Rich from "./Rich";

// One labelled part of a case study (problem, role, stack, result…)
export default function ProjectSection({ s }: { s: CaseStudySection }) {
  return (
    <section className="cs-section">
      <h2 className="overline">{s.label}</h2>
      {s.metrics && (
        <div className="metrics">
          {s.metrics.map((m) => (
            <p key={m.caption} className="metric">
              <span className="metric-value">{m.value}</span>
              <span className="metric-caption">{m.caption}</span>
            </p>
          ))}
        </div>
      )}
      {s.paras?.map((p) => <p key={p}><Rich text={p} /></p>)}
      {s.tags && (
        <div className="chips">
          {s.tags.map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
      )}
      {s.steps && <ol>{s.steps.map((t) => <li key={t}><Rich text={t} /></li>)}</ol>}
      {s.list && <ul>{s.list.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>}
      {s.flow?.map((row, i) => (
        <p key={i} className="flow mono-sm">
          {row.map((item, j) => ("node" in item ? <span key={j} className="flow-node">{item.node}</span> : <span key={j} className="flow-edge">→ {item.edge} </span>))}
        </p>
      ))}
      {s.after?.map((p) => <p key={p}><Rich text={p} /></p>)}
      {s.table && (
        <div className="ftable-wrap">
          <table className="ftable">
            <thead><tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      {s.footnote && <p className="footnote">{s.footnote}</p>}
      {s.images?.map((img) => (
        <figure key={img.alt} className="shot">
          <Image src={img.src} alt={img.alt} sizes="(max-width: 767px) 100vw, 480px" placeholder="blur" />
          {img.caption && <figcaption>{img.caption}</figcaption>}
        </figure>
      ))}
    </section>
  );
}
