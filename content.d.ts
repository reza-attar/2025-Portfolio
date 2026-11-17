// content/resume.md, parsed at build time by scripts/resume/parse.cjs
declare module "*.md" {
  const data: import("@/lib/resume").ResumeData;
  export default data;
}
