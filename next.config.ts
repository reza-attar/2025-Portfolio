import type { NextConfig } from "next";
import path from "node:path";

// Turns content/resume.md into the resume data (see scripts/resume/parse.cjs)
const resumeLoader = path.resolve("scripts/resume/md-loader.cjs");

const nextConfig: NextConfig = {
  // Custom webpack only used when running next build --webpack (Turbopack is default in v16)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      test: /\.md$/i,
      use: [resumeLoader],
    });

    return config;
  },

  // Turbopack config (top-level in v16; used by next dev and next build by default)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
      "*.md": {
        loaders: [resumeLoader],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
