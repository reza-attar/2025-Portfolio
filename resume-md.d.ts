// content/resume.md is parsed at build time by scripts/resume/md-loader.cjs
declare module "*.md" {
  const data: import("@/lib/resume").ResumeData;
  export default data;
}
