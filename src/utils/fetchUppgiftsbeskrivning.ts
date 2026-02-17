import { useProductStore } from "../stores/VAHStore.js";

export async function fetchUppgiftsbeskrivning(uppgiftstyp: string) {
  const store = useProductStore();
  store.setDescriptionLoading(true);

  try {
    const url = `${import.meta.env.VITE_BFF_URL}/api/uppgiftsbeskrivning/${uppgiftstyp}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Response is not JSON. Got: ${text.substring(0, 100)}`);
    }

    const data = await response.json();
    if (data && typeof data.beskrivning === "string") {
      store.setUppgiftsbeskrivning(data.beskrivning);
    } else {
      throw new Error("Invalid response format from backend");
    }
  } catch (error) {
    console.error("Error fetching description:", error);
    store.setUppgiftsbeskrivning("");
  } finally {
    store.setDescriptionLoading(false);
  }
}

export async function fetchUppgiftInformation(
  kundbehovsflodeId: string,
  regeltyp: string,
) {
  const store = useProductStore();
console.log("fetchUppgiftInformation called with:", {
  kundbehovsflodeId,
  regeltyp,
});

  try {
    // Split regeltyp by slash (e.g., 'regel/rtf-manuell' -> ['regel', 'rtf-manuell'])
    const parts = regeltyp.split('/');
    const url = `/api/${parts.join('/')}/${kundbehovsflodeId}`;
    const response = await fetch(url);

    const contentType = response.headers.get("content-type");
    console.log(`Response content-type: ${contentType}`);

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

    // BFF returnerar redan transformerad data i camelCase
    const data = await response.json();
    store.setUppgift(data);
  } catch (error) {
    console.error("Error fetching uppgift information:", error);
    return null;
  }
}