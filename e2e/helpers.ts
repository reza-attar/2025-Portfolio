import { expect, type Page } from "@playwright/test";

export const win = (page: Page, id: string) => page.locator(`section.win[data-app="${id}"]`);
export const titleBar = (page: Page, id: string) => win(page, id).locator(".win-titlebar");

// Wait for hydration: the live window (data-app) replaces the static one
export async function boot(page: Page, path = "/") {
  await page.goto(path);
  await expect(page.locator("html[data-ready]")).toHaveCount(1);
}

export async function box(page: Page, id: string) {
  const b = await win(page, id).boundingBox();
  if (!b) throw new Error(`${id} is not visible`);
  return b;
}

export async function drag(page: Page, from: { x: number; y: number }, to: { x: number; y: number }) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(from.x + (to.x - from.x) / 2, from.y + (to.y - from.y) / 2, { steps: 5 });
  await page.mouse.move(to.x, to.y, { steps: 5 });
  await page.mouse.up();
}

export const icon = (page: Page, label: string) =>
  page.getByRole("navigation", { name: "Desktop shortcuts" }).getByRole("button", { name: label, exact: true });
