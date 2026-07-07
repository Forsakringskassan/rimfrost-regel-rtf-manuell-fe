import { env } from "../config/env";
import { useProductStore } from "../stores/VAHStore";

export async function setDone() {
    const store = useProductStore();
    if (!store.uppgift?.ersattningar || !store.uppgift?.handlaggning_id) {
        console.log(`Store ersattningar: ${store.uppgift?.ersattningar}, handlaggning_id: ${store.uppgift?.handlaggning_id}`);
        console.error("Cannot set done: ersattningar or handlaggning_id is missing");
        return;
    }

    const url = `${env.bffUrl}/api/${store.uppgift.handlaggning_id}/patchErsattningar`;
    try {
        const response = await fetch(url, {
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
        store.setError("Kunde inte spara ersättningar. Försök igen senare.");
    }
}