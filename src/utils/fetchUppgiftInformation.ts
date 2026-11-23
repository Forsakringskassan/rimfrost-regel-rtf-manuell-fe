import { useProductStore } from "../stores/VAHStore.js";
import { bffFetch, SaknarBehorighetError, SAKNAR_BEHORIGHET_MEDDELANDE } from "./bffFetch";

export async function fetchUppgiftInformation(
  handlaggningId: string,
) {
  const store = useProductStore();

  try {
    const response = await bffFetch(`/api/task/${handlaggningId}`, {
      method: "GET",
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      // Try to get the error message from the response body
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const text = await response.text();
        errorMessage += ` - ${text.substring(0, 200)}`;
      } catch {
        errorMessage += " - Could not read error response";
      }
      throw new Error(errorMessage);
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Response is not JSON. Got: ${text.substring(0, 100)}`);
    }

    const backendData = await response.json();
    store.setUppgift(backendData);
    console.log("Fetched uppgift information:", backendData);
  } catch (error) {
    console.error("Error fetching uppgift information:", error);
    // Clear any uppgift left in the (shared) store, e.g. one fetched with a
    // previous handläggare's token, so it is never shown with this error.
    store.setUppgift(null);
    store.setError(
      error instanceof SaknarBehorighetError
        ? SAKNAR_BEHORIGHET_MEDDELANDE
        : "Kunde inte hämta uppgiftsdata. Försök igen senare.",
    );
    return null;
  }
}
