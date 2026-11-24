import { env, ensureEnvLoaded } from "../config/env";
import { useProductStore } from "../stores/VAHStore";

export const SAKNAR_BEHORIGHET_MEDDELANDE =
  "Kunde inte identifiera dig som handläggare. Logga in i handläggarportalen igen och öppna uppgiften på nytt.";

/**
 * Thrown when there is no token to send, or when the BFF rejects the one
 * sent (401). Callers show SAKNAR_BEHORIGHET_MEDDELANDE instead of a generic
 * error, so a missing login never looks like a broken service.
 */
export class SaknarBehorighetError extends Error {
  constructor(message = "Missing or rejected Authorization") {
    super(message);
    this.name = "SaknarBehorighetError";
  }
}

/**
 * fetch against this app's own BFF, as the logged-in handläggare.
 *
 * The token comes from the portal (prop `authorization`, see
 * VardAvHusdjur.vue) and is put unchanged in the Authorization header —
 * its content is owned by FK's identity service and must not be parsed here.
 * Without a token no request is made.
 */
export async function bffFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const authorization = useProductStore().authorization;
  if (!authorization) {
    throw new SaknarBehorighetError("No Authorization from the portal");
  }

  await ensureEnvLoaded();
  const headers = new Headers(init.headers);
  headers.set("Authorization", authorization);
  const response = await fetch(`${env.bffUrl}${path}`, { ...init, headers });

  if (response.status === 401) {
    throw new SaknarBehorighetError("BFF responded 401");
  }
  return response;
}
