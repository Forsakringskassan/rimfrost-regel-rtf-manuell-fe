import { useProductStore } from "../stores/VAHStore.js";
import { transformBackendResponse } from "./transformBackendResponse.js";

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

  // This functionality should be moved to the BFF (transformBackendResponse), so that the data has the correct shape already when it reaches the frontend.
    const backendData = await response.json();
    const transformedData = transformBackendResponse(backendData);
    store.setUppgift(transformedData);
  } catch (error) {
    console.error("Error fetching uppgift information:", error);
    return null;
  }
}
