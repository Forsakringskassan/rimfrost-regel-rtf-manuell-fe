import { useProductStore } from "../stores/VAHStore.js";
import { transformBackendResponse } from "./transformBackendResponse.js";

export async function fetchUppgiftInformation(
  kundbehovsflodeId: string,
  regeltyp: string,
) {
  const store = useProductStore();

  try {
    //Changed fetch from bff instead of backend
    const url = `/api/bff/regel/${regeltyp}/${kundbehovsflodeId}`;
    const response = await fetch(url);

    if (!response.ok) {
      // Try to get the error message from the response body
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${JSON.stringify(errorData)}`;
      } catch {
        const text = await response.text();
        errorMessage += ` - ${text}`;
      }
      throw new Error(errorMessage);
    }
    
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Response is not JSON. Got: ${text.substring(0, 100)}`);
    }

    const backendData = await response.json();
    const transformedData = transformBackendResponse(backendData);
    store.setUppgift(transformedData);
  } catch (error) {
    console.error("Error fetching uppgift information:", error);
    return null;
  }
}
