import { type Page, expect, test as base } from "@playwright/test";

export { expect };

// The standalone app (App.vue) falls back to VITE_DEV_HANDLAGGNING_ID from .env
// when no handlaggningId prop is passed in (i.e. when not embedded via Module
// Federation) — see src/App.vue and src/config/env.ts.
export const devHandlaggningId = "00be1ee0-5ffd-4394-bec2-4634770d9351";

// GetDataResponse shape, snake_case — passed through by the backend unchanged
// (captured live against the local minikube regel-rtf-manuell service).
export const mockUppgiftData = {
  handlaggning_id: devHandlaggningId,
  kund: {
    fornamn: "Lisa",
    efternamn: "Tass",
    kon: "K",
    anstallning: {
      organisationsnummer: "123456-7890",
      organisationsnamn: "Region Dalarna",
      arbetstid_procent: 100,
      anstallningsdag: "2022-09-10",
      sista_anstallningsdag: null,
    },
  },
  ersattningar: [
    {
      ersattning_id: "8e4c207b-6fdc-4f4d-9084-53455eb459dd",
      ersattningstyp: "042bd313-d5ef-4886-97c5-e0a1c828baca",
      omfattning_procent: 100,
      belopp: 40000,
      berakningsgrund: null,
      from: "2025-12-01",
      tom: "2025-12-31",
      beslutsutfall: "FU",
      avslagsanledning: null,
    },
  ],
};

export async function mockBffApis(
  page: Page,
  data: typeof mockUppgiftData | { status: number } = mockUppgiftData,
) {
  await page.route("**/api/task/**", async (route) => {
    if ("status" in data) {
      await route.fulfill({ status: data.status });
    } else {
      await route.fulfill({ json: data });
    }
  });
  await page.route("**/api/uppgiftsbeskrivning/VAH", async (route) => {
    await route.fulfill({
      json: { beskrivning: "Kontrollerar frånvaro från arbete under perioden." },
    });
  });
  await page.route("**/api/*/patchErsattningar", async (route) => {
    await route.fulfill({ status: 204 });
  });
}

export async function gotoApp(page: Page) {
  const ready = page.waitForResponse("**/api/task/**");
  await page.goto("/");
  await ready;
}

export const test = base.extend<{ setupMocks: Page }>({
  setupMocks: async ({ page }, use) => {
    await mockBffApis(page);
    await gotoApp(page);
    await use(page);
  },
});
