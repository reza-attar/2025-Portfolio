// The four layers of a product, from schema to interface.
// The home page diagram, the "layer by layer" section and the project cards read from here.
// Metrics come from src/lib/resume.ts; keep them in sync.

export type LayerId = "data" | "backend" | "ai" | "interface";

export type Layer = {
  id: LayerId;
  index: string;
  name: string;
  // Shown on the hero diagram node
  tech: string;
  // Label on the connector from this layer to the next one
  edge?: string;
  summary: string;
  stack: string[];
  metric: { value: string; caption: string };
  href?: string;
};

export const layers: Layer[] = [
  {
    id: "data",
    index: "01",
    name: "Data",
    tech: "PostgreSQL · pgvector",
    edge: "Prisma",
    summary:
      "Schemas that hold up under real traffic: relational models, vector search and fuzzy matching, inside one Postgres.",
    stack: ["PostgreSQL", "pgvector", "pg_trgm", "Prisma"],
    metric: {
      value: "1.15 s → 9 ms",
      caption: "Query time on the hottest read paths",
    },
    href: "/works/medicine-matching",
  },
  {
    id: "backend",
    index: "02",
    name: "Backend",
    tech: "NestJS · Node",
    edge: "jobs · embeddings",
    summary:
      "APIs and the work behind them: auth, multi-tenancy, scheduled jobs, third-party sync and real-time messaging.",
    stack: ["NestJS", "Node.js", "Socket.IO", "Jira REST", "Docker"],
    metric: {
      value: "2m 25s → 34s",
      caption: "Backend compile time after moving to SWC",
    },
    href: "/works/mybody",
  },
  {
    id: "ai",
    index: "03",
    name: "AI",
    tech: "RAG · LLMs",
    edge: "typed JSON",
    summary:
      "Retrieval, structured output and model hosting, built so a model's answer can be checked before a person sees it.",
    stack: ["RAG", "Embeddings", "Vercel AI SDK", "Zod", "Local LLMs", "MCP"],
    metric: {
      value: "3rd place",
      caption: "LLM Agents Hackathon, Sharif University, 2025",
    },
    href: "/works/ticket-yar",
  },
  {
    id: "interface",
    index: "04",
    name: "Interface",
    tech: "Next.js · React",
    summary:
      "Fast, accessible interfaces and the component systems underneath them, in English and right-to-left Persian.",
    stack: ["Next.js", "React", "Tailwind", "shadcn/ui", "PWA", "RTL"],
    metric: {
      value: "58 → 98",
      caption: "Lighthouse performance on the Mora blog",
    },
    href: "/works/mora-blog",
  },
];

export const layerById = Object.fromEntries(
  layers.map((layer) => [layer.id, layer]),
) as Record<LayerId, Layer>;

// Tailwind needs the full class names in source, so map them here.
export const layerBg: Record<LayerId, string> = {
  data: "bg-layer-data",
  backend: "bg-layer-backend",
  ai: "bg-layer-ai",
  interface: "bg-layer-interface",
};

export const layerText: Record<LayerId, string> = {
  data: "text-layer-data",
  backend: "text-layer-backend",
  ai: "text-layer-ai",
  interface: "text-layer-interface",
};

export const layerVar: Record<LayerId, string> = {
  data: "var(--layer-data)",
  backend: "var(--layer-backend)",
  ai: "var(--layer-ai)",
  interface: "var(--layer-interface)",
};
