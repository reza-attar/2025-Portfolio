// App registry, metadata only (no components), so the store and the shell can read
// sizes and titles without importing every app. Components live in ./apps.tsx.
import { getProject, projects, type ProjectColor } from "@/lib/projects";

export type BaseAppId = "about" | "projects" | "stack" | "contact" | "resume" | "trash";
export type AppId = BaseAppId | `project:${string}`;

export interface AppMeta {
  // Shown in the title bar and the tray: file-like
  title: string;
  // Canonical route
  href: string;
  // Accent dot colour
  dot: string;
  w: number;
  h: number;
}

export const colorVar: Record<ProjectColor, string> = {
  orange: "var(--accent)",
  yellow: "var(--yellow)",
  blue: "var(--blue)",
  green: "var(--green)",
  purple: "var(--purple)",
};

const base: Record<BaseAppId, AppMeta> = {
  about: { title: "about.md", href: "/", dot: "var(--blue)", w: 620, h: 440 },
  projects: { title: "~/projects", href: "/projects", dot: "var(--yellow)", w: 660, h: 380 },
  stack: { title: "stack.sh", href: "/stack", dot: "var(--green)", w: 440, h: 300 },
  contact: { title: "Contact", href: "/contact", dot: "var(--accent)", w: 420, h: 380 },
  resume: { title: "resume.pdf", href: "/resume", dot: "#C23A00", w: 540, h: 560 },
  trash: { title: "Trash", href: "/trash", dot: "#6B6D64", w: 400, h: 220 },
};

export const BASE_APPS = Object.keys(base) as BaseAppId[];

export const isProjectId = (id: AppId): id is `project:${string}` => id.startsWith("project:");
export const projectSlug = (id: `project:${string}`) => id.slice("project:".length);

export function getAppMeta(id: AppId): AppMeta {
  if (!isProjectId(id)) return base[id];
  const slug = projectSlug(id);
  const p = getProject(slug);
  return {
    title: p?.name ?? slug,
    href: `/projects/${slug}`,
    dot: p ? colorVar[p.color] : "var(--muted)",
    w: 520,
    h: 420,
  };
}

// Every id that has a window, for tests and route checks
export const ALL_APP_IDS: AppId[] = [
  ...BASE_APPS,
  ...projects.map((p) => `project:${p.slug}` as const),
];

export type IconName = "folder" | "doc" | "pdf" | "terminal" | "mail" | "trash";

export const DESKTOP_ICONS: { id: BaseAppId; label: string; tile: string; icon: IconName }[] = [
  { id: "projects", label: "Projects", tile: "#F7A501", icon: "folder" },
  { id: "about", label: "about.md", tile: "#B6C8FF", icon: "doc" },
  { id: "resume", label: "resume.pdf", tile: "#FFC3A8", icon: "pdf" },
  { id: "stack", label: "stack.sh", tile: "#A9E5B6", icon: "terminal" },
  { id: "contact", label: "Contact", tile: "#FFE08A", icon: "mail" },
  { id: "trash", label: "Trash", tile: "#E1E2DA", icon: "trash" },
];
