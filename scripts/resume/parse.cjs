// Parses content/resume.md into the data the site and the PDF render.
// Shared by the Next.js loader (md-loader.cjs) and the PDF script (scripts/resume/pdf.mjs).
// The format is described at the top of content/resume.md; anything it doesn't
// recognise is an error with a line number, so a typo can't silently drop content.

const REQUIRED_FIELDS = [
  "name",
  "headline",
  "role",
  "company",
  "location",
  "experience",
  "email",
  "linkedin",
  "github",
  "stackoverflow",
  "availability",
  "product",
  "product_role",
  "product_launched",
];

// "## Heading" text (lower-cased) -> section key. The key is also the /resume#anchor.
const SECTIONS = {
  summary: "summary",
  experience: "experience",
  "products & projects": "projects",
  projects: "projects",
  "technical skills": "skills",
  skills: "skills",
  awards: "awards",
  education: "education",
  languages: "languages",
};

function parseResume(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const fail = (lineIndex, message) => {
    throw new Error(`content/resume.md:${lineIndex + 1}: ${message}`);
  };

  // Blank out HTML comments, keeping line numbers intact for error messages
  let inComment = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let out = "";
    while (line.length) {
      if (inComment) {
        const end = line.indexOf("-->");
        if (end === -1) line = "";
        else {
          line = line.slice(end + 3);
          inComment = false;
        }
      } else {
        const start = line.indexOf("<!--");
        if (start === -1) {
          out += line;
          line = "";
        } else {
          out += line.slice(0, start);
          line = line.slice(start + 4);
          inComment = true;
        }
      }
    }
    lines[i] = out.trim() === "" ? "" : out;
  }

  // Front matter: "key: value" lines between two "---" lines
  let i = lines.findIndex((l) => l.trim() !== "");
  if (lines[i]?.trim() !== "---") fail(i, 'expected front matter starting with "---"');
  const fields = {};
  for (i++; i < lines.length && lines[i].trim() !== "---"; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const colon = line.indexOf(":");
    if (colon === -1) fail(i, `expected "key: value", got "${line}"`);
    fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  if (i === lines.length) fail(i - 1, 'front matter is missing its closing "---"');
  for (const key of REQUIRED_FIELDS) {
    if (!fields[key]) fail(i, `front matter is missing "${key}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.product_launched)) {
    fail(i, "product_launched must be a date like 2026-10-13");
  }

  const data = {
    name: fields.name,
    title: fields.headline,
    role: fields.role,
    company: fields.company,
    location: fields.location,
    experienceYears: fields.experience,
    email: fields.email,
    availability: fields.availability,
    links: {
      linkedin: fields.linkedin,
      github: fields.github,
      stackOverflow: fields.stackoverflow,
    },
    product: {
      name: fields.product,
      role: fields.product_role,
      launched: fields.product_launched,
    },
    sectionTitles: {},
    summary: [],
    experience: [],
    projects: [],
    skills: [],
    awards: [],
    education: [],
    languages: [],
  };

  // Body: walk the lines, tracking the current "##" section and its open items
  let section = null;
  let job = null; // experience: current ### company
  let group = null; // experience: current #### group, or projects: current ### group
  let project = null; // projects: current #### project
  let degree = null; // education: current ### degree
  let paragraph = null; // summary: lines of the open paragraph
  let lastList = null; // { target, key } the last bullet goes to, for wrapped lines

  const needsMeta = (item, idx) => {
    if (item && item.needsMeta) fail(idx, `"${item.label}" needs a "… · … · …" line under its heading`);
  };
  const closeOpen = (idx) => {
    if (paragraph) {
      data.summary.push(paragraph.join(" "));
      paragraph = null;
    }
    needsMeta(job, idx);
    needsMeta(degree, idx);
    lastList = null;
  };
  const metaParts = (text, idx, what) => {
    const parts = text.split(" · ").map((p) => p.trim());
    if (parts.length !== 3) fail(idx, `${what} line needs three parts separated by " · ", got "${text}"`);
    return parts;
  };

  for (i++; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      if (paragraph) {
        data.summary.push(paragraph.join(" "));
        paragraph = null;
      }
      continue;
    }

    // Indented line right after a bullet continues that bullet
    if (/^\s{2,}\S/.test(raw) && lastList && !line.startsWith("- ")) {
      const { target, key } = lastList;
      target[key] = target[key] ? `${target[key]} ${line}` : line;
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading && heading[1].length === 1) {
      closeOpen(i); // "# Name" title line, shown only when reading the file itself
      continue;
    }
    if (heading && heading[1].length === 2) {
      closeOpen(i);
      const key = SECTIONS[heading[2].toLowerCase()];
      if (!key) fail(i, `unknown section "${heading[2]}" (expected one of: ${Object.keys(SECTIONS).join(", ")})`);
      section = key;
      data.sectionTitles[key] = heading[2];
      job = group = project = degree = null;
      continue;
    }
    if (!section) fail(i, `content before the first "## Section": "${line}"`);

    if (section === "summary") {
      if (heading || line.startsWith("- ")) fail(i, "Summary takes plain paragraphs only");
      (paragraph ??= []).push(line);
      continue;
    }

    if (section === "experience") {
      if (heading && heading[1].length === 3) {
        closeOpen(i);
        job = { company: heading[2], groups: [], needsMeta: true, label: heading[2] };
        group = null;
        data.experience.push(job);
      } else if (!job) {
        fail(i, 'start each job with "### Company"');
      } else if (job.needsMeta) {
        if (heading || line.startsWith("- ")) fail(i, `"${job.company}" needs a "Role · Period · Location" line under its heading`);
        [job.role, job.period, job.location] = metaParts(line, i, "Role · Period · Location");
        delete job.needsMeta;
        delete job.label;
      } else if (heading && heading[1].length === 4) {
        lastList = null;
        group = { heading: heading[2], bullets: [] };
        job.groups.push(group);
      } else if (line.startsWith("- ")) {
        if (!group) {
          group = { bullets: [] };
          job.groups.push(group);
        }
        group.bullets.push(line.slice(2).trim());
        lastList = { target: group.bullets, key: group.bullets.length - 1 };
      } else {
        fail(i, `unexpected line in "${job.company}": "${line}" (use "- " for bullets)`);
      }
      continue;
    }

    if (section === "projects") {
      if (heading && heading[1].length === 3) {
        group = { heading: heading[2], items: [] };
        project = null;
        data.projects.push(group);
      } else if (heading && heading[1].length === 4) {
        if (!group) fail(i, 'put projects under a "### Group" heading');
        // "#### Name" or "#### Name · [label](https://…)"
        const m = /^(.*?)(?:\s+·\s+\[([^\]]+)\]\(([^)]+)\))?$/.exec(heading[2]);
        project = { name: m[1].trim(), description: "" };
        if (m[2]) project.link = { label: m[2], href: m[3] };
        group.items.push(project);
      } else if (!project) {
        fail(i, 'start each project with "#### Name"');
      } else if (/^stack:/i.test(line)) {
        project.stack = line.replace(/^stack:\s*/i, "");
      } else if (line.startsWith("- ")) {
        fail(i, "project descriptions are plain text, not bullets");
      } else {
        project.description = project.description ? `${project.description} ${line}` : line;
      }
      continue;
    }

    if (section === "skills") {
      const m = /^- \*\*(.+?):?\*\*:?\s*(.*)$/.exec(line);
      if (!m) fail(i, `skills lines look like "- **Label:** a, b, c", got "${line}"`);
      data.skills.push({ label: m[1], items: splitOutsideParens(m[2]) });
      continue;
    }

    if (section === "awards") {
      const m = /^- \*\*(.+?)\*\*\s+—\s+(.*)$/.exec(line);
      if (!m) fail(i, `awards look like "- **Title** — Organisation · Date", got "${line}"`);
      const at = m[2].lastIndexOf(" · ");
      if (at === -1) fail(i, `award needs "Organisation · Date" after the dash, got "${m[2]}"`);
      const award = { title: m[1], org: m[2].slice(0, at), date: m[2].slice(at + 3) };
      data.awards.push(award);
      lastList = { target: award, key: "note" };
      continue;
    }

    if (section === "education") {
      if (heading && heading[1].length === 3) {
        closeOpen(i);
        degree = { degree: heading[2], needsMeta: true, label: heading[2] };
        data.education.push(degree);
      } else if (degree && degree.needsMeta) {
        [degree.school, degree.period, degree.location] = metaParts(line, i, "School · Period · Location");
        delete degree.needsMeta;
        delete degree.label;
      } else {
        fail(i, `education entries are "### Degree" plus one "School · Period · Location" line, got "${line}"`);
      }
      continue;
    }

    if (section === "languages") {
      const m = /^- (.+?):\s*(.+)$/.exec(line);
      if (!m) fail(i, `languages look like "- English: Full professional", got "${line}"`);
      data.languages.push({ name: m[1], level: m[2] });
      continue;
    }
  }
  closeOpen(lines.length - 1);

  for (const key of new Set(Object.values(SECTIONS))) {
    if (!data.sectionTitles[key]) {
      throw new Error(`content/resume.md: missing the "## ${key[0].toUpperCase()}${key.slice(1)}" section`);
    }
  }
  return data;
}

// "a, b (c, d), e" -> ["a", "b (c, d)", "e"]
function splitOutsideParens(text) {
  const items = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      items.push(current.trim());
      current = "";
    } else current += ch;
  }
  if (current.trim()) items.push(current.trim());
  return items;
}

module.exports = { parseResume };
