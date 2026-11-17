// Applies every db/migrations/*.sql file in order. Statements are idempotent
// (create ... if not exists), so it is safe to run again.
// Usage: bun run db:migrate   (reads DATABASE_URL from .env.local or the environment)
import { neon } from "@neondatabase/serverless";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const sql = neon(url);
const dir = path.resolve("db/migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

for (const file of files) {
  const text = await readFile(path.join(dir, file), "utf8");
  // The HTTP driver runs one statement per query
  const statements = text
    .replace(/--.*$/gm, "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const statement of statements) await sql.query(statement);
  console.log(`✓ ${file}`);
}
