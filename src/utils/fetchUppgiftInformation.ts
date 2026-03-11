import { useProductStore } from "../stores/VAHStore.js";

export async function fetchUppgiftInformation(
  handlaggningId: string,
) {
  const store = useProductStore();
  const bffUrl = import.meta.env.VITE_BFF_URL ?? "";
  
  try {
    const url = `${bffUrl}/api/task/${handlaggningId}`;
    const response = await fetch(url);

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
  } catch (error) {
    console.error("Error fetching uppgift information:", error);
    return null;
  }
}
