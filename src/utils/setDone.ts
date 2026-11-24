import { useProductStore } from "../stores/VAHStore";
import { bffFetch, SaknarBehorighetError, SAKNAR_BEHORIGHET_MEDDELANDE } from "./bffFetch";

export async function setDone() {
    const store = useProductStore();
    if (!store.uppgift?.ersattningar || !store.uppgift?.handlaggning_id) {
        console.log(`Store ersattningar: ${store.uppgift?.ersattningar}, handlaggning_id: ${store.uppgift?.handlaggning_id}`);
        console.error("Cannot set done: ersattningar or handlaggning_id is missing");
        return;
    }

    try {
        const response = await bffFetch(`/api/${store.uppgift.handlaggning_id}/patchErsattningar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ersattningar: store.uppgift.ersattningar.map((e) => ({
                    ersattningId: e.ersattning_id,
                    beslutsutfall: e.beslutsutfall,
                    avslagsanledning: e.avslagsanledning ?? null,
                })),
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend error: ${errorText}`);
            store.setError("Kunde inte spara ersättningar. Försök igen senare.");
            return;
        }

        window.dispatchEvent(new CustomEvent('task-done', {
            detail: { handlaggningId: store.uppgift.handlaggning_id },
        }));
    } catch (error) {
        console.error("Error posting to backend:", error);
        store.setError(
            error instanceof SaknarBehorighetError
                ? SAKNAR_BEHORIGHET_MEDDELANDE
                : "Kunde inte spara ersättningar. Försök igen senare.",
        );
    }
}
