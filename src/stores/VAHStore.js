import { defineStore } from "pinia";
export const useProductStore = defineStore("VAHStore", {
    state: () => ({
        uppgift: null,
        regeltyp: "",
    }),
    actions: {
        setUppgift(uppgift) {
            this.uppgift = uppgift;
        },
        setRegeltyp(regeltyp) {
            this.regeltyp = regeltyp;
        },
    },
});
