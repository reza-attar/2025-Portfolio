import type { ReactNode } from "react";

export type FileRow = { key: string; cells: ReactNode[] };

// Mono uppercase headers, 1px rules, yellow row hover. The first cell of each row is
// expected to hold the control that opens the item.
export default function FileTable({ head, rows, caption }: { head: string[]; rows: FileRow[]; caption: string }) {
  return (
    <div className="ftable-wrap">
      <table className="ftable">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              {r.cells.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
