import { useProductStore } from "../stores/VAHStore";

export async function setDone() {
    const store = useProductStore();
    if (!store.uppgift?.ersattningar || !store.uppgift?.handlaggningId) {
        console.log(`Store ersattningar: ${store.uppgift?.ersattningar}, handlaggningId: ${store.uppgift?.handlaggningId}`);
        console.error("Cannot set done: ersattningar or handlaggningId is missing");
        return;
    }

    const url = `/api/${store.uppgift.handlaggningId}/patchErsattningar`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ersattningar: store.uppgift.ersattningar }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend error: ${errorText}`);
            throw new Error('backend-error');
        }

        window.dispatchEvent(new CustomEvent('task-done', {
            detail: { handlaggningId: store.uppgift.handlaggningId },
        }));
    } catch (error) {
        console.error("Error posting to backend:", error);
    }
}