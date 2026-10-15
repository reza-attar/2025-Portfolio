// Builds public/Reza_Attar_Resume.pdf from content/resume.md with headless Chrome.
//
//   node scripts/resume/pdf.mjs build        build the PDF now                     (pnpm resume:pdf)
//   node scripts/resume/pdf.mjs check        rebuild if resume.md changed; fail if  (pnpm build)
//                                            it changed and Chrome isn't available
//   node scripts/resume/pdf.mjs dev [args]   check, rebuild on every save of        (pnpm dev)
//                                            resume.md, and run `next dev [args]`
//
// content/resume.pdf.sha256 records which version of resume.md (and of this script) the PDF
// was built from, so `check` can tell when the PDF is out of date, even on a machine
// without Chrome, such as a CI or hosting build.
// Chrome is found at its default install path, or set CHROME_PATH.

import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import parser from "./parse.cjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const SOURCE = path.join(root, "content/resume.md");
const HASH_FILE = path.join(root, "content/resume.pdf.sha256");
const OUTPUT = path.join(root, "public/Reza_Attar_Resume.pdf");
const rel = (file) => path.relative(root, file);

// The PDF depends on the resume text and on how it's parsed and laid out
function currentHash() {
  const hash = createHash("sha256");
  for (const file of [SOURCE, path.join(here, "parse.cjs"), fileURLToPath(import.meta.url)]) {
    hash.update(fs.readFileSync(file));
  }
  return hash.digest("hex");
}

function isUpToDate() {
  try {
    return fs.existsSync(OUTPUT) && fs.readFileSync(HASH_FILE, "utf8").trim() === currentHash();
  } catch {
    return false;
  }
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);
  for (const candidate of candidates) if (fs.existsSync(candidate)) return candidate;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    try {
      return execFileSync("which", [name], { encoding: "utf8" }).trim();
    } catch {}
  }
  return null;
}

function build(chrome) {
  const hash = currentHash();
  const resume = parser.parseResume(fs.readFileSync(SOURCE, "utf8"));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "resume-pdf-"));
  const html = path.join(tmp, "resume.html");
  const pdf = path.join(tmp, "resume.pdf");
  try {
    fs.writeFileSync(html, renderHtml(resume));
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${path.join(tmp, "profile")}`,
        "--no-pdf-header-footer",
        // Gives the web font time to load before printing
        "--virtual-time-budget=10000",
        `--print-to-pdf=${pdf}`,
        `file://${html}`,
      ],
      { stdio: "ignore", timeout: 60_000 },
    );
    if (!fs.existsSync(pdf)) throw new Error("Chrome did not produce a PDF");
    fs.copyFileSync(pdf, OUTPUT);
    fs.writeFileSync(HASH_FILE, `${hash}\n`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  console.log(`resume: wrote ${rel(OUTPUT)} from ${rel(SOURCE)}`);
}

// ---------------------------------------------------------------------------
// PDF layout: one A4 document, same content and order as the /resume page

const esc = (text) =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x"
const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function renderHtml(r) {
  const t = r.sectionTitles;
  const section = (key, body) =>
    `<section id="${key}"><h2>${esc(t[key])}</h2>${body}</section>`;
  const bullets = (items) =>
    `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

  const contact = [
    esc(r.location),
    `<a href="mailto:${esc(r.email)}">${esc(r.email)}</a>`,
    ...[r.links.linkedin, r.links.github, r.links.stackOverflow].map(
      (href) => `<a href="${esc(href)}">${esc(shortUrl(href))}</a>`,
    ),
  ]
    .map((item) => `<span class="nowrap">${item}</span>`)
    .join(' <span class="sep">·</span> ');

  const experience = r.experience
    .map((job) => {
      const [first, ...rest] = job.groups;
      const group = (g) =>
        `<div class="group">${g.heading ? `<h4>${esc(g.heading)}</h4>` : ""}${bullets(g.bullets)}</div>`;
      return `<article class="job">
        <div class="keep">
          <div class="row">
            <div><h3>${esc(job.company)}</h3><p class="role">${esc(job.role)}</p></div>
            <p class="when">${esc(job.period)} · ${esc(job.location)}</p>
          </div>
          ${first ? group(first) : ""}
        </div>
        ${rest.map(group).join("")}
      </article>`;
    })
    .join("");

  const project = (p) => `<article class="project">
      <div class="row">
        <h3>${esc(p.name)}</h3>
        ${p.link ? `<a href="${esc(p.link.href)}">${esc(p.link.label)}</a>` : ""}
      </div>
      <p>${esc(p.description)}</p>
      ${p.stack ? `<p class="stack"><strong>Stack:</strong> ${esc(p.stack)}</p>` : ""}
    </article>`;
  // The group heading stays on the same page as its first project
  const projects = r.projects
    .map(
      (g) => `<div class="project-group">
        <div class="keep"><h4 class="caps">${esc(g.heading)}</h4>${g.items[0] ? project(g.items[0]) : ""}</div>
        ${g.items.slice(1).map(project).join("")}
      </div>`,
    )
    .join("");

  const skills = r.skills
    .map((s) => `<p class="skill"><strong>${esc(s.label)}:</strong> ${esc(s.items.join(", "))}</p>`)
    .join("");

  const awards = `<ul class="plain">${r.awards
    .map(
      (a) => `<li><p class="item-title">${esc(a.title)}</p>
        <p class="muted">${esc(a.org)} · ${esc(a.date)}</p>
        ${a.note ? `<p class="muted">${esc(a.note)}</p>` : ""}</li>`,
    )
    .join("")}</ul>`;

  const education = r.education
    .map(
      (e) => `<div class="edu"><p class="item-title">${esc(e.degree)}</p>
        <p class="muted">${esc(e.school)}</p>
        <p class="muted">${esc(e.period)} · ${esc(e.location)}</p></div>`,
    )
    .join("");

  const languages = `<ul class="plain langs">${r.languages
    .map((l) => `<li><span class="item-title">${esc(l.name)}</span><span class="muted">${esc(l.level)}</span></li>`)
    .join("")}</ul>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(r.name)} · Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
  @page { size: A4; margin: 13mm 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Inter, -apple-system, "Helvetica Neue", Arial, sans-serif;
    font-size: 9.5pt; line-height: 1.45; color: #181818;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  a { color: inherit; text-decoration: none; }
  header { margin-bottom: 14pt; }
  h1 { font-size: 22pt; font-weight: 700; line-height: 1.1; letter-spacing: -0.01em; }
  .headline { font-size: 10.5pt; font-weight: 500; margin-top: 3pt; }
  .contact { margin-top: 5pt; color: #4a4a4a; }
  .contact .sep { margin: 0 2pt; color: #9a9a9a; }
  .nowrap { white-space: nowrap; }
  .availability { color: #4a4a4a; margin-top: 2pt; }
  section { margin-top: 13pt; }
  h2 {
    font-size: 9pt; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    border-bottom: 0.75pt solid rgba(0,0,0,0.2); padding-bottom: 2.5pt; margin-bottom: 7pt;
    break-after: avoid;
  }
  h3 { font-size: 10.5pt; font-weight: 700; }
  h4, .caps { font-size: 8pt; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #4a4a4a; margin-bottom: 2.5pt; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
  .role { font-weight: 500; }
  .when { color: #4a4a4a; flex-shrink: 0; }
  .summary p + p { margin-top: 5pt; }
  .job + .job { margin-top: 10pt; }
  .keep, .group, .project, .edu, .plain li { break-inside: avoid; }
  .group { margin-top: 5pt; }
  ul { padding-left: 13pt; }
  li + li { margin-top: 2pt; }
  ul.plain { list-style: none; padding: 0; }
  ul.plain li + li { margin-top: 6pt; }
  .project-group + .project-group { margin-top: 8pt; }
  .project + .project, .keep + .project { margin-top: 6pt; }
  .project .row a { color: #4a4a4a; }
  .project p { margin-top: 1pt; }
  .stack, .muted { color: #4a4a4a; }
  .skill + .skill { margin-top: 2pt; }
  .item-title { font-weight: 600; }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24pt; break-inside: avoid; }
  .columns section:first-child { margin-top: 0; }
  .langs li { display: flex; justify-content: space-between; gap: 12pt; }
  ul.plain.langs li + li { margin-top: 2pt; }
</style>
</head>
<body>
  <header>
    <h1>${esc(r.name)}</h1>
    <p class="headline">${esc(r.title)}</p>
    <p class="contact">${contact}</p>
    <p class="availability">${esc(r.availability)}</p>
  </header>
  ${section("summary", `<div class="summary">${r.summary.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`)}
  ${section("experience", experience)}
  ${section("projects", projects)}
  ${section("skills", skills)}
  <section class="columns">
    <div>${section("awards", awards)}</div>
    <div>${section("education", education)}${section("languages", languages)}</div>
  </section>
</body>
</html>`;
}

// ---------------------------------------------------------------------------

function tryBuild(chrome) {
  try {
    build(chrome);
  } catch (error) {
    console.error(`resume: PDF not updated: ${error.message}`);
  }
}

const [command = "build", ...rest] = process.argv.slice(2);
const chrome = findChrome();

if (command === "build") {
  if (!chrome) {
    console.error("resume: Chrome not found; install it or set CHROME_PATH");
    process.exit(1);
  }
  build(chrome);
} else if (command === "check") {
  if (isUpToDate()) {
    console.log(`resume: ${rel(OUTPUT)} is up to date with ${rel(SOURCE)}`);
  } else if (chrome) {
    build(chrome);
  } else {
    console.error(
      `resume: ${rel(OUTPUT)} is out of date with ${rel(SOURCE)}, and Chrome isn't available here to rebuild it.\n` +
        "Run `pnpm resume:pdf` on your machine and commit public/Reza_Attar_Resume.pdf and content/resume.pdf.sha256.",
    );
    process.exit(1);
  }
} else if (command === "dev") {
  if (!chrome) {
    console.warn("resume: Chrome not found, so the PDF won't update while you edit; set CHROME_PATH");
  } else if (!isUpToDate()) {
    tryBuild(chrome);
  }

  // Watch the folder rather than the file: editors often save by replacing the file
  let timer;
  if (chrome) {
    fs.watch(path.dirname(SOURCE), (_event, filename) => {
      if (filename !== path.basename(SOURCE)) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (fs.existsSync(SOURCE) && !isUpToDate()) tryBuild(chrome);
      }, 300);
    });
  }

  const next = spawn("next", ["dev", ...rest], { stdio: "inherit", shell: process.platform === "win32" });
  next.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => next.kill(signal));
  }
} else {
  console.error(`resume: unknown command "${command}" (expected build, check or dev)`);
  process.exit(1);
}
