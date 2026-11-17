// App registry, components. Only Window and StaticWindow import this file; everything
// else reads ./app-meta, which has no components (avoids an import cycle with the store).
import AboutApp from "@/features/apps/about/AboutApp";
import ContactApp from "@/features/apps/contact/ContactApp";
import ProjectsApp from "@/features/apps/projects/ProjectsApp";
import StackApp from "@/features/apps/stack/StackApp";
import TrashApp from "@/features/apps/trash/TrashApp";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { isProjectId, type AppId, type BaseAppId } from "./app-meta";

// The heavier bodies load on demand (they still render on the server)
const ProjectApp = dynamic<{ id: AppId }>(() => import("@/features/apps/project/ProjectApp"));
const ResumeApp = dynamic<{ id: AppId }>(() => import("@/features/apps/resume/ResumeApp"));

const components: Record<BaseAppId, ComponentType<{ id: AppId }>> = {
  about: AboutApp,
  projects: ProjectsApp,
  stack: StackApp,
  contact: ContactApp,
  resume: ResumeApp,
  trash: TrashApp,
};

export function getAppComponent(id: AppId): ComponentType<{ id: AppId }> {
  return isProjectId(id) ? ProjectApp : components[id];
}
