import type { NextConfig } from "next";
import path from "node:path";

// Turns content/resume.md into the resume data (see scripts/resume/parse.cjs)
const resumeLoader = path.resolve("scripts/resume/parse.cjs");

const nextConfig: NextConfig = {
  // Used only by `next build --webpack` (Turbopack is the default in v16)
  webpack(config) {
    config.module.rules.push({ test: /\.md$/i, use: [resumeLoader] });
    return config;
  },

  turbopack: {
    rules: {
      "*.md": { loaders: [resumeLoader], as: "*.js" },
    },
  },

  // Routes from before reza.os, kept so old links and search results still land
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/works", destination: "/projects", permanent: true },
      { source: "/works/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
