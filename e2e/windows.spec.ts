import { expect, test } from "@playwright/test";
import { boot, box, drag, icon, titleBar, win } from "./helpers";

test("desktop icons, nav links and CTAs open or focus exactly one window", async ({ page }) => {
  await boot(page);
  await icon(page, "stack.sh").click();
  await icon(page, "stack.sh").click();
  await expect(win(page, "stack")).toHaveCount(1);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Work" }).click();
  await expect(win(page, "projects")).toHaveAttribute("data-front", "true");
  await page.locator(".taskbar").getByRole("link", { name: "Hire me" }).click();
  await expect(win(page, "contact")).toHaveAttribute("data-front", "true");
  await expect(page.locator(".tray-btn")).toHaveCount(4);
});

test("clicking a back window brings it to front", async ({ page }) => {
  await boot(page);
  await icon(page, "Projects").click();
  await expect(win(page, "about")).toHaveAttribute("data-front", "false");
  const b = await box(page, "about");
  await page.mouse.click(b.x + b.width - 30, b.y + b.height - 30);
  await expect(win(page, "about")).toHaveAttribute("data-front", "true");
  await expect(win(page, "projects")).toHaveAttribute("data-front", "false");
});

test("dragging moves the window; the title bar can never leave the desktop", async ({ page }) => {
  await boot(page);
  const b = await box(page, "about");
  await drag(page, { x: b.x + 200, y: b.y + 18 }, { x: b.x + 400, y: b.y + 218 });
  const moved = await box(page, "about");
  expect(Math.round(moved.x - b.x)).toBe(200);
  expect(Math.round(moved.y - b.y)).toBe(200);
  // Far off the bottom-right: clamped so the title bar stays reachable
  await drag(page, { x: moved.x + 200, y: moved.y + 18 }, { x: 1430, y: 895 });
  const clamped = await box(page, "about");
  const desk = (await page.locator(".desktop").boundingBox())!;
  expect(clamped.x).toBeLessThanOrEqual(desk.x + desk.width - 90 + 1);
  expect(clamped.y).toBeLessThanOrEqual(desk.y + desk.height - 40 + 1);
});

test("dragging to an edge previews and snaps; dragging away restores the size", async ({ page }) => {
  await boot(page);
  const b = await box(page, "about");
  const desk = (await page.locator(".desktop").boundingBox())!;
  await page.mouse.move(b.x + 200, b.y + 18);
  await page.mouse.down();
  await page.mouse.move(desk.x + 300, desk.y + 300, { steps: 4 });
  await page.mouse.move(desk.x + 4, desk.y + 300, { steps: 6 });
  await expect(page.locator('.snap-preview[data-zone="left"]')).toBeVisible();
  await page.mouse.up();
  await expect(page.locator(".snap-preview")).toHaveCount(0);
  await expect(win(page, "about")).toHaveAttribute("data-snapped", "left");
  await page.waitForTimeout(250);
  const snapped = await box(page, "about");
  expect(Math.round(snapped.width)).toBe(Math.round(desk.width / 2));
  expect(Math.round(snapped.height)).toBe(Math.round(desk.height));

  // Pull it off the edge: the old size comes back
  await drag(page, { x: snapped.x + 100, y: snapped.y + 18 }, { x: snapped.x + 500, y: snapped.y + 200 });
  await expect(win(page, "about")).not.toHaveAttribute("data-snapped", "left");
  const restored = await box(page, "about");
  expect(Math.round(restored.width)).toBe(Math.round(b.width));

  // Top edge maximizes
  await drag(page, { x: restored.x + 100, y: restored.y + 18 }, { x: desk.x + 500, y: desk.y + 3 });
  await expect(win(page, "about")).toHaveAttribute("data-maximized", "true");
});

test("resize stops at 300 × 180", async ({ page }) => {
  await boot(page);
  const handle = win(page, "about").locator(".win-resize");
  const h = (await handle.boundingBox())!;
  await drag(page, { x: h.x + 9, y: h.y + 9 }, { x: h.x - 900, y: h.y - 900 });
  const b = await box(page, "about");
  expect(Math.round(b.width)).toBe(300);
  expect(Math.round(b.height)).toBe(180);
});

test("double-click and the maximize button toggle maximize; the label reads Restore", async ({ page }) => {
  await boot(page);
  await titleBar(page, "about").dblclick({ position: { x: 200, y: 18 } });
  await expect(win(page, "about")).toHaveAttribute("data-maximized", "true");
  await page.getByRole("button", { name: "Restore about.md" }).click();
  await expect(win(page, "about")).toHaveAttribute("data-maximized", "false");
  await page.getByRole("button", { name: "Maximize about.md" }).click();
  await expect(win(page, "about")).toHaveAttribute("data-maximized", "true");
  await page.waitForTimeout(250);
  const desk = (await page.locator(".desktop").boundingBox())!;
  const b = await box(page, "about");
  expect(Math.round(b.width)).toBe(Math.round(desk.width));
});

test("minimize and tray clicks", async ({ page }) => {
  await boot(page);
  await icon(page, "Projects").click();
  const tray = page.getByRole("toolbar", { name: "Open windows" });
  // Minimize removes the window and dims its tray button
  await page.getByRole("button", { name: "Minimize ~/projects" }).click();
  await expect(win(page, "projects")).toHaveCount(0);
  await expect(tray.locator('.tray-btn[data-min="true"]')).toHaveText("~/projects");
  // Tray click restores it in front
  await tray.getByRole("button", { name: "~/projects" }).click();
  await expect(win(page, "projects")).toHaveAttribute("data-front", "true");
  // On the front window: minimize. On a back window: focus.
  await tray.getByRole("button", { name: "~/projects" }).click();
  await expect(win(page, "projects")).toHaveCount(0);
  await icon(page, "stack.sh").click();
  await tray.getByRole("button", { name: "about.md" }).click();
  await expect(win(page, "about")).toHaveAttribute("data-front", "true");
});

test("close, ⇧W and ⇧X; the empty desktop card", async ({ page }) => {
  await boot(page);
  await icon(page, "Projects").click();
  await page.getByRole("button", { name: "Close ~/projects" }).click();
  await expect(win(page, "projects")).toHaveCount(0);
  await expect(win(page, "about")).toHaveAttribute("data-front", "true");
  await icon(page, "Contact").click();
  await page.keyboard.press("Shift+W");
  await expect(win(page, "contact")).toHaveCount(0);
  await page.keyboard.press("Shift+X");
  await expect(page.locator(".win")).toHaveCount(0);
  await expect(page.getByText("You closed everything. Respect.")).toBeVisible();
  await page.getByRole("button", { name: "Reopen about.md" }).click();
  await expect(win(page, "about")).toBeVisible();
});

test("pressing window controls never starts a drag", async ({ page }) => {
  await boot(page);
  const before = await box(page, "about");
  const btn = page.getByRole("button", { name: "Maximize about.md" });
  const bb = (await btn.boundingBox())!;
  await page.mouse.move(bb.x + 10, bb.y + 10);
  await page.mouse.down();
  await page.mouse.move(bb.x + 200, bb.y + 200, { steps: 6 });
  await page.mouse.up();
  const after = await box(page, "about");
  expect(after.x).toBe(before.x);
  expect(after.y).toBe(before.y);
});

test("shortcuts: snap, maximize, theme, wallpaper; ignored while typing", async ({ page }) => {
  await boot(page);
  await page.keyboard.press("Shift+ArrowRight");
  await expect(win(page, "about")).toHaveAttribute("data-snapped", "right");
  await page.keyboard.press("Shift+ArrowUp");
  await expect(win(page, "about")).toHaveAttribute("data-maximized", "true");
  await page.keyboard.press("Shift+ArrowDown");
  await expect(win(page, "about")).toHaveAttribute("data-maximized", "false");
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.keyboard.press("\\");
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", theme!);
  await page.keyboard.press("|");
  await expect(page.locator("html")).toHaveAttribute("data-wall", "grid");

  // In an input, nothing fires
  await page.evaluate(() => {
    const i = document.createElement("input");
    i.id = "probe";
    document.body.append(i);
  });
  await page.locator("#probe").focus();
  await page.keyboard.press("Shift+X");
  await expect(win(page, "about")).toHaveCount(1);
});

test("resizing the browser keeps every window reachable; snapped windows re-fit", async ({ page }) => {
  await boot(page);
  await icon(page, "Projects").click();
  await page.keyboard.press("Shift+ArrowRight");
  const a = await box(page, "about");
  await drag(page, { x: a.x + 200, y: a.y + 18 }, { x: 1300, y: 800 });
  await page.setViewportSize({ width: 900, height: 600 });
  await page.waitForTimeout(300);
  const desk = (await page.locator(".desktop").boundingBox())!;
  const about = await box(page, "about");
  expect(about.x).toBeLessThanOrEqual(desk.x + desk.width - 90 + 1);
  expect(about.y).toBeLessThanOrEqual(desk.y + desk.height - 40 + 1);
  const projects = await box(page, "projects");
  expect(Math.round(projects.width)).toBe(Math.round(desk.width / 2));
  expect(Math.round(projects.x)).toBe(Math.round(desk.x + desk.width / 2));
});
