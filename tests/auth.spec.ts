import { expect, test, type Page } from "@playwright/test";

const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserPassword = process.env.TEST_USER_PASSWORD;

function getTestCredentials() {
  if (!testUserEmail || !testUserPassword) {
    return null;
  }

  return {
    email: testUserEmail,
    password: testUserPassword,
  };
}

async function signIn(
  page: Page,
  credentials: { email: string; password: string },
) {
  await page.goto("/login");

  await page.getByLabel("Email").fill(credentials.email);
  await page.getByLabel("Password").fill(credentials.password);

  await Promise.all([
    page.waitForURL(/\/projects\/?$/),
    page.getByRole("button", { name: /^sign in$/i }).click(),
  ]);
}

test("Login page is visible and exposes the sign-in form controls", async ({
  page,
}) => {
  await page.goto("/login");

  await expect(page).toHaveURL(/\/login\/?$/);
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
});

test("Successful login redirects to the projects dashboard", async ({
  page,
}) => {
  const credentials = getTestCredentials();

  test.skip(
    !credentials,
    "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run authenticated auth tests.",
  );

  if (!credentials) {
    return;
  }

  await signIn(page, credentials);

  await expect(page).toHaveURL(/\/projects\/?$/);
  await expect(
    page.getByRole("heading", { name: /project portfolio/i }),
  ).toBeVisible();
});

test("Sidebar navigation links are visible after login", async ({ page }) => {
  const credentials = getTestCredentials();

  test.skip(
    !credentials,
    "Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run authenticated auth tests.",
  );

  if (!credentials) {
    return;
  }

  await signIn(page, credentials);

  const overviewLink = page.getByRole("link", { name: "Overview" });

  if (!(await overviewLink.isVisible())) {
    await page.getByRole("button", { name: /toggle sidebar/i }).click();
  }

  const sidebarMenu = page.getByRole("list").first();

  await expect(
    sidebarMenu.getByRole("link", { name: "Overview" }),
  ).toBeVisible();
  await expect(
    sidebarMenu.getByRole("link", { name: "Projects" }),
  ).toBeVisible();
  await expect(
    sidebarMenu.getByRole("link", { name: "Settings" }),
  ).toBeVisible();
});
