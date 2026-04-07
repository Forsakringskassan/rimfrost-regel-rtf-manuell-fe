import { useProductStore } from "../stores/VAHStore";

export async function setDone() {
    const store = useProductStore();
    if (!store.uppgift?.ersattning || !store.uppgift?.handlaggningId) {
        console.log(`Store ersattning: ${store.uppgift?.ersattning}, handlaggningId: ${store.uppgift?.handlaggningId}`);
        console.error("Cannot set done: ersattning or handlaggningId is missing");
        return;
    }

    const url = `/api/${store.uppgift.handlaggningId}/patchErsattning`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ersattning: store.uppgift.ersattning }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend error: ${errorText}`);
            throw new Error('backend-error');
        }

        window.dispatchEvent(new CustomEvent('rtf-manuell-task-done', {
            detail: { handlaggningId: store.uppgift.handlaggningId },
        }));
    } catch (error) {
        console.error("Error posting to backend:", error);
    }
}