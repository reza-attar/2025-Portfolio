import { expect, test } from "@playwright/test";
import { boot, icon, win } from "./helpers";

test("deep link opens that window plus about, with full content in the server HTML", async ({ page, request }) => {
  const html = await (await request.get("/projects/cashio")).text();
  expect(html).toContain("Farsi-first personal finance PWA");
  expect(html).toContain("Debts with instalments");
  await boot(page, "/projects/cashio");
  await expect(win(page, "project:cashio")).toHaveAttribute("data-front", "true");
  await expect(win(page, "about")).toHaveCount(1);
  await expect(page.locator(".win-static")).toHaveCount(0);
});

test("old routes redirect", async ({ request }) => {
  const r = await request.get("/works/maica", { maxRedirects: 0 });
  expect(r.status()).toBe(308);
  expect(r.headers().location).toBe("/projects/maica");
});

test("focusing a window updates the URL without adding history entries", async ({ page }) => {
  await boot(page);
  const length = await page.evaluate(() => history.length);
  await icon(page, "Projects").click();
  await expect(page).toHaveURL(/\/projects$/);
  await win(page, "projects").getByRole("link", { name: "Maica" }).click();
  await expect(page).toHaveURL(/\/projects\/maica$/);
  await page.getByRole("toolbar", { name: "Open windows" }).getByRole("button", { name: "about.md" }).click();
  await expect(page).toHaveURL(/localhost:\d+\/$/);
  expect(await page.evaluate(() => history.length)).toBe(length);
});

test("nav link reopens a closed window even when the URL already matches", async ({ page }) => {
  await boot(page, "/stack");
  await page.getByRole("button", { name: "Close stack.sh" }).click();
  await expect(win(page, "stack")).toHaveCount(0);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Stack" }).click();
  await expect(win(page, "stack")).toHaveAttribute("data-front", "true");
});

test("dark mode persists with no light flash on reload", async ({ page }) => {
  await boot(page);
  await page.getByRole("button", { name: "Toggle dark mode" }).click();
  await page.getByRole("button", { name: "Next wallpaper" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  // Record the theme at the very first paint of the next load
  await page.addInitScript(() => {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "interactive") (window as unknown as { firstTheme?: string }).firstTheme = document.documentElement.dataset.theme;
    });
  });
  await page.reload();
  expect(await page.evaluate(() => (window as unknown as { firstTheme?: string }).firstTheme)).toBe("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-wall", "grid");
});

test("keyboard: open from an icon focuses the title; closing returns focus to the opener", async ({ page }) => {
  await boot(page);
  const opener = icon(page, "stack.sh");
  await opener.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#win-title-stack")).toBeFocused();
  await page.keyboard.press("Shift+W");
  await expect(win(page, "stack")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("system menu: arrow keys, Esc, simple mode", async ({ page }) => {
  await boot(page);
  const logo = page.getByRole("button", { name: "reza.os" });
  await logo.click();
  const menu = page.getByRole("menu", { name: "System" });
  await expect(menu.getByRole("menuitem").first()).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(menu.getByRole("menuitem", { name: "Open every window (chaos)" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(logo).toBeFocused();
  await logo.click();
  await page.getByRole("menuitem", { name: "Open every window (chaos)" }).click();
  await expect(page.locator(".win")).toHaveCount(6);
  await logo.click();
  await page.getByRole("menuitemcheckbox", { name: "Simple mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-mode", "simple");
  await expect(page.locator(".win-resize")).toHaveCount(0);
});

test("screen-reader announcements", async ({ page }) => {
  await boot(page);
  const live = page.locator('[aria-live="polite"]');
  await icon(page, "Projects").click();
  await expect(live).toHaveText(/~\/projects opened/);
  await page.getByRole("button", { name: "Minimize ~/projects" }).click();
  await expect(live).toHaveText(/~\/projects minimized/);
  await page.keyboard.press("Shift+ArrowLeft");
  await expect(live).toHaveText(/snapped left/);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("no animations", async ({ page }) => {
    await boot(page);
    await icon(page, "Projects").click();
    const anim = await win(page, "projects").evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe("none");
    await page.getByRole("button", { name: "Close ~/projects" }).click();
    await expect(win(page, "projects")).toHaveCount(0);
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("stacked cards, no drag or resize, 44px targets, no horizontal overflow", async ({ page }) => {
    for (const path of ["/", "/projects", "/projects/mora-blog", "/resume", "/stack", "/contact"]) {
      await boot(page, path);
      await expect(page.locator("html")).toHaveAttribute("data-mode", "simple");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    }
    await boot(page, "/projects");
    // A shared link shows its own card, not about.md first
    await expect(page.locator(".win")).toHaveCount(1);
    await expect(page.locator(".win-resize, .win-max:visible, .win-min:visible")).toHaveCount(0);
    for (const el of await page.locator(".taskbar button:visible, .taskbar a:visible, .win-titlebar button:visible, .dicon").all()) {
      const b = (await el.boundingBox())!;
      expect(b.height, await el.innerText()).toBeGreaterThanOrEqual(44);
    }
    // Opening an app scrolls its card into view and focuses its heading
    await icon(page, "Contact").tap();
    await expect(page.locator("#win-title-contact")).toBeFocused();
    await expect(win(page, "contact")).toBeInViewport();
  });
});
