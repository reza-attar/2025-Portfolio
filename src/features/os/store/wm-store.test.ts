import { beforeEach, describe, expect, it } from "vitest";
import { getCaseStudy } from "@/lib/case-studies";
import { projects } from "@/lib/projects";
import { getAppMeta } from "../app-meta";
import { cascade, frontId, MIN_H, MIN_W, useWM } from "./wm-store";

const wm = () => useWM.getState();
const win = (id: string) => wm().wins[id];

beforeEach(() => {
  useWM.setState({ wins: {}, z: 10, seq: 0, snapZone: null, desk: null, booted: false });
});

describe("open", () => {
  it("creates a window at the default size, cascaded", () => {
    wm().open("about");
    wm().open("projects");
    expect(win("about")).toMatchObject({ x: 150, y: 24, w: 620, h: 440 });
    expect(win("projects")).toMatchObject({ x: 184, y: 54, w: 660, h: 380 });
    expect(frontId(wm().wins)).toBe("projects");
    expect(wm().booted).toBe(true);
  });

  it("wraps the cascade after six windows", () => {
    expect(cascade(6)).toEqual(cascade(0));
  });

  it("re-opening an existing window focuses it instead of duplicating", () => {
    wm().open("about");
    wm().open("projects");
    wm().open("about");
    expect(Object.keys(wm().wins)).toHaveLength(2);
    expect(frontId(wm().wins)).toBe("about");
  });

  it("restores a minimized window", () => {
    wm().open("about");
    wm().minimize("about");
    wm().open("about");
    expect(win("about").minimized).toBe(false);
  });

  it("shrinks the default size to fit a small desktop, never below the minimum", () => {
    wm().clampAll(700, 400);
    wm().open("resume");
    expect(win("resume").w).toBe(700 - 150 - 12);
    expect(win("resume").h).toBe(400 - 24 - 12);
    wm().clampAll(320, 200);
    wm().open("about");
    expect(win("about")).toMatchObject({ w: MIN_W, h: MIN_H });
  });

  it("names project windows after the project", () => {
    expect(getAppMeta("project:cashio")).toMatchObject({ title: "Cashio", href: "/projects/cashio", w: 520, h: 420 });
  });
});

describe("focus and close", () => {
  it("focus raises z and is a no-op for the front window", () => {
    wm().open("about");
    wm().open("projects");
    const z = wm().z;
    wm().focus("projects");
    expect(wm().z).toBe(z);
    wm().focus("about");
    expect(win("about").z).toBe(z + 1);
    expect(frontId(wm().wins)).toBe("about");
  });

  it("close removes the window and the next-highest z becomes front", () => {
    wm().open("about");
    wm().open("projects");
    wm().open("stack");
    wm().focus("about");
    wm().close("about");
    expect(win("about")).toBeUndefined();
    expect(frontId(wm().wins)).toBe("stack");
  });

  it("closeAll empties the desktop", () => {
    wm().open("about");
    wm().open("projects");
    wm().closeAll();
    expect(wm().wins).toEqual({});
  });

  it("announces actions for the live region", () => {
    wm().open("about");
    expect(wm().announcement.text).toBe("about.md opened");
    wm().minimize("about");
    expect(wm().announcement.text).toBe("about.md minimized");
  });
});

describe("tray", () => {
  beforeEach(() => {
    wm().open("about");
    wm().open("projects");
  });

  it("front window → minimize", () => {
    wm().trayClick("projects");
    expect(win("projects").minimized).toBe(true);
    expect(frontId(wm().wins)).toBe("about");
  });

  it("minimized → restore and front", () => {
    wm().minimize("projects");
    wm().trayClick("projects");
    expect(win("projects").minimized).toBe(false);
    expect(frontId(wm().wins)).toBe("projects");
  });

  it("back window → front", () => {
    wm().trayClick("about");
    expect(win("about").minimized).toBe(false);
    expect(frontId(wm().wins)).toBe("about");
  });
});

describe("geometry", () => {
  it("resize stops at 300 × 180", () => {
    wm().open("about");
    wm().resize("about", 10, 10);
    expect(win("about")).toMatchObject({ w: 300, h: 180 });
  });

  it("toggleMax flips maximized and brings to front", () => {
    wm().open("about");
    wm().open("projects");
    wm().toggleMax("about");
    expect(win("about").maximized).toBe(true);
    expect(frontId(wm().wins)).toBe("about");
    wm().toggleMax("about");
    expect(win("about").maximized).toBe(false);
  });

  it("snap left/right fills half the desktop and remembers the old geometry", () => {
    wm().open("about");
    wm().snap("about", "right", 1000, 700);
    expect(win("about")).toMatchObject({ x: 500, y: 0, w: 500, h: 700, snapped: "right" });
    expect(win("about").restore).toEqual({ x: 150, y: 24, w: 620, h: 440 });
    // Snapping again keeps the original restore rect
    wm().snap("about", "left", 1000, 700);
    expect(win("about").restore).toEqual({ x: 150, y: 24, w: 620, h: 440 });
  });

  it("snap top maximizes", () => {
    wm().open("about");
    wm().snap("about", "top", 1000, 700);
    expect(win("about").maximized).toBe(true);
  });

  it("unsnap restores the saved size at the given point", () => {
    wm().open("about");
    wm().snap("about", "left", 1000, 700);
    wm().unsnap("about", 40, 0);
    expect(win("about")).toMatchObject({ x: 40, y: 0, w: 620, h: 440, snapped: null });
  });

  it("clampAll keeps title bars reachable and re-fits snapped windows", () => {
    wm().open("about");
    wm().open("projects");
    wm().move("about", 5000, 5000);
    wm().snap("projects", "right", 1200, 800);
    wm().clampAll(800, 600);
    expect(win("about")).toMatchObject({ x: 710, y: 560 });
    expect(win("projects")).toMatchObject({ x: 400, w: 400, h: 600 });
    wm().move("about", -9999, -50);
    wm().clampAll(800, 600);
    expect(win("about")).toMatchObject({ x: -240, y: 0 });
  });

  it("tidy re-cascades by open order and resets state", () => {
    wm().open("about");
    wm().open("projects");
    wm().toggleMax("about");
    wm().minimize("projects");
    wm().move("projects", 600, 400);
    wm().tidy();
    expect(win("about")).toMatchObject({ x: 150, y: 24, maximized: false });
    expect(win("projects")).toMatchObject({ x: 184, y: 54, minimized: false });
    expect(frontId(wm().wins)).toBe("projects");
  });
});

describe("content", () => {
  it("every project has a case study with the same name", () => {
    for (const p of projects) expect(getCaseStudy(p.slug)?.name).toBe(p.name);
  });
});
