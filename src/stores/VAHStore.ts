import { defineStore } from "pinia";
import type { GetDataResponse } from "../types.js";

export const useProductStore = defineStore("VAHStore", {
  state: () => ({
    uppgift: null as GetDataResponse | null,
    regeltyp: "",
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setUppgift(uppgift: GetDataResponse | null) {
      this.uppgift = uppgift;
      this.error = null;
    },
    setRegeltyp(regeltyp: string) {
      this.regeltyp = regeltyp;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setError(error: string | null) {
      this.error = error;
    },
    clearError() {
      this.error = null;
    },
  },
});
