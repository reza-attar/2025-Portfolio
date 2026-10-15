declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: any;
  export default content;
}

// content/resume.md, parsed at build time by scripts/resume/parse.cjs
declare module "*.md" {
  const data: import("@/lib/resume").ResumeData;
  export default data;
}
