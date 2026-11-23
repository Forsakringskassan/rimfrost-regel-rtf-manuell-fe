import {
  devAuthorization,
  expect,
  gotoApp,
  mockBffApis,
  mockUppgiftData,
  setDevAuthorization,
  test,
} from "./fixtures";

const SAKNAR_BEHORIGHET =
  "Kunde inte identifiera dig som handläggare. Logga in i handläggarportalen igen och öppna uppgiften på nytt.";

// Standalone smoke tests for the rtf-manuell MFE, run directly against its own
// preview server (no Module Federation host) using VITE_DEV_HANDLAGGNING_ID as
// the fallback handlaggningId. Covers all three of the app's own BFF endpoints:
// GET /api/task/{id}, GET /api/uppgiftsbeskrivning/{typ}, POST /api/{id}/patchErsattningar.
test.describe("VardAvHusdjur", () => {
  test("laddar och visar kunduppgifter", async ({ page }) => {
    await mockBffApis(page);
    await gotoApp(page);

    await expect(
      page.getByText("Kontrollera frånvaro från arbete", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Lisa Tass")).toBeVisible();
    await expect(page.getByText("Region Dalarna")).toBeVisible();
    await expect(page.locator(".error-message")).not.toBeVisible();
  });

  test("hämtar uppgiftsbeskrivning vid tooltip-klick", async ({ page }) => {
    await mockBffApis(page);
    await gotoApp(page);

    const descriptionRequest = page.waitForRequest("**/api/uppgiftsbeskrivning/VAH");
    await page.getByRole("button", { name: /Läs mer om uppgiften/ }).click();
    await descriptionRequest;
    await expect(
      page.getByText("Kontrollerar frånvaro från arbete under perioden."),
    ).toBeVisible();
  });

  test("visar felmeddelande om beskrivningen inte kan hämtas", async ({ page }) => {
    await mockBffApis(page);
    await page.route("**/api/uppgiftsbeskrivning/VAH", async (route) => {
      await route.fulfill({ status: 500 });
    });
    await gotoApp(page);

    await page.getByRole("button", { name: /Läs mer om uppgiften/ }).click();
    await expect(
      page.getByText("Kunde inte hämta uppgiftsbeskrivningen."),
    ).toBeVisible();
  });

  test("klarmarkerar uppgiften och skickar patchErsattningar", async ({ page }) => {
    await mockBffApis(page);
    await gotoApp(page);

    // FKUI's radio input sits under a styled decorator; clicking the visible
    // label text is more reliable than targeting the (visually zero-size) input.
    await page.getByText("Avslag", { exact: true }).click();

    const patchRequest = page.waitForRequest(
      (req) =>
        req.url().includes(`/api/${mockUppgiftData.handlaggning_id}/patchErsattningar`) &&
        req.method() === "POST",
    );
    await page.getByRole("button", { name: "Klarmarkera" }).click();
    const request = await patchRequest;
    const body = request.postDataJSON();
    expect(body.ersattningar).toEqual([
      {
        ersattningId: mockUppgiftData.ersattningar[0].ersattning_id,
        beslutsutfall: "NEJ",
        avslagsanledning: null,
      },
    ]);
  });

  test("visar felmeddelande när patchErsattningar misslyckas", async ({ page }) => {
    await mockBffApis(page);
    await gotoApp(page);
    await page.route("**/api/*/patchErsattningar", async (route) => {
      await route.fulfill({ status: 500 });
    });

    await page.getByText("Godkänd", { exact: true }).click();
    await page.getByRole("button", { name: "Klarmarkera" }).click();
    await expect(
      page.getByText("Kunde inte spara ersättningar. Försök igen senare."),
    ).toBeVisible();
  });

  test("visar felmeddelande när uppgiftsdata inte kan hämtas", async ({ page }) => {
    await mockBffApis(page, { status: 500 });
    await page.goto("/");

    await expect(
      page.getByText("Kunde inte hämta uppgiftsdata. Försök igen senare."),
    ).toBeVisible({ timeout: 10_000 });
  });

  test.describe("Authorization till BFF:en", () => {
    test("skickar handläggarens token på alla tre BFF-anrop", async ({ page }) => {
      await mockBffApis(page);
      const authByPath = new Map<string, string | undefined>();
      page.on("request", (req) => {
        const path = new URL(req.url()).pathname;
        if (path.startsWith("/api/")) {
          authByPath.set(`${req.method()} ${path}`, req.headers()["authorization"]);
        }
      });
      await gotoApp(page);

      const descriptionResponse = page.waitForResponse("**/api/uppgiftsbeskrivning/VAH");
      await page.getByRole("button", { name: /Läs mer om uppgiften/ }).click();
      await descriptionResponse;

      await page.getByText("Godkänd", { exact: true }).click();
      const patchResponse = page.waitForResponse("**/api/*/patchErsattningar");
      await page.getByRole("button", { name: "Klarmarkera" }).click();
      await patchResponse;

      expect(Object.fromEntries(authByPath)).toEqual({
        [`GET /api/task/${mockUppgiftData.handlaggning_id}`]: devAuthorization,
        "GET /api/uppgiftsbeskrivning/VAH": devAuthorization,
        [`POST /api/${mockUppgiftData.handlaggning_id}/patchErsattningar`]: devAuthorization,
      });
    });

    test("visar begripligt fel och anropar inte BFF:en när token saknas", async ({ page }) => {
      await mockBffApis(page);
      await setDevAuthorization(page, "");
      const bffRequests: string[] = [];
      page.on("request", (req) => {
        if (new URL(req.url()).pathname.startsWith("/api/")) bffRequests.push(req.url());
      });
      await page.goto("/");

      await expect(page.getByText(SAKNAR_BEHORIGHET)).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText("Lisa Tass")).not.toBeVisible();

      await page.getByRole("button", { name: /Läs mer om uppgiften/ }).click();
      await expect(page.getByText("Kunde inte hämta uppgiftsbeskrivningen.")).toBeVisible();
      expect(bffRequests).toEqual([]);
    });

    test("visar begripligt fel när BFF:en svarar 401", async ({ page }) => {
      await mockBffApis(page, { status: 401 });
      await page.goto("/");

      await expect(page.getByText(SAKNAR_BEHORIGHET)).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText("Lisa Tass")).not.toBeVisible();
    });
  });
});
