import { defineStore } from "pinia";
import type { GetDataResponse } from "../types.js";

export const useProductStore = defineStore("VAHStore", {
  state: () => ({
    uppgift: null as GetDataResponse | null,
    loading: false,
    error: null as string | null,
    uppgiftsbeskrivning: "",
    descriptionLoading: false,
    descriptionError: false,
  }),
  actions: {
    setUppgift(uppgift: GetDataResponse | null) {
      this.uppgift = uppgift;
      this.error = null;
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
    setUppgiftsbeskrivning(beskrivning: string) {
      this.uppgiftsbeskrivning = beskrivning;
    },
    setDescriptionLoading(loading: boolean) {
      this.descriptionLoading = loading;
    },
    setDescriptionError(value: boolean) {
      this.descriptionError = value;
    },
  },
});