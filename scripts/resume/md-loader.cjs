// Next.js loader (Turbopack and webpack): `import resume from "content/resume.md"`
// gives the parsed resume data, so pages update when the file changes.
const { parseResume } = require("./parse.cjs");

module.exports = function resumeMarkdownLoader(source) {
  return `export default ${JSON.stringify(parseResume(source))};`;
};
