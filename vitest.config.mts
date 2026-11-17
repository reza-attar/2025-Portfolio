import path from "node:path";
import { createRequire } from "node:module";
import { defineConfig, type Plugin } from "vitest/config";

const require = createRequire(import.meta.url);
const { parseResume } = require("./scripts/resume/parse.cjs");

// content/resume.md goes through the same parser as the Next.js loader; images become stubs.
const assets: Plugin = {
  name: "portfolio-assets",
  transform(code, id) {
    if (id.endsWith(".md")) return `export default ${JSON.stringify(parseResume(code))};`;
  },
  load(id) {
    if (/\.(png|jpe?g|webp|svg|ico)$/.test(id))
      return `export default { src: ${JSON.stringify(id)}, width: 1, height: 1 };`;
  },
};

export default defineConfig({
  plugins: [assets],
  resolve: {
    alias: {
      "@public": path.resolve("public"),
      "@": path.resolve("src"),
    },
  },
  test: { include: ["src/**/*.test.ts"] },
});
