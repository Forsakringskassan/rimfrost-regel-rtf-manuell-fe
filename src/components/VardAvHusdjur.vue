<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { FStaticField, FTooltip, FLoader } from "@fkui/vue";
import { useProductStore } from "../stores/VAHStore";
import { fetchUppgiftInformation } from "../utils/fetchUppgiftInformation";
import { fetchUppgiftsbeskrivning } from "../utils/fetchUppgiftsbeskrivning";
import ListaDatum from "./ListaDatum.vue";

// `authorization` is the logged-in handläggare's token from the portal
// (PORT-FR-03.6/03.7): the full Authorization header value, sent unchanged
// on every BFF call. Declared directly on this exposed component — the
// portal only passes it to remotes that declare it.
const { handlaggningId, authorization } = defineProps<{
  handlaggningId?: string | null;
  authorization?: string | null;
}>();

const store = useProductStore();
// Set before onMounted fetches. The portal remounts this component when the
// token changes; the watch keeps the store in step should it not.
watch(
  () => authorization,
  (value) => store.setAuthorization(value ?? null),
  { immediate: true },
);
const isDescriptionFetched = ref(false);
const isInfoLoading = ref(true);

const handleTooltipOpen = () => {
  if (!isDescriptionFetched.value && !store.descriptionLoading) {
    isDescriptionFetched.value = true;
    fetchUppgiftsbeskrivning("VAH");
  }
};

onMounted(async () => {
  isInfoLoading.value = true;
  await fetchUppgiftInformation(handlaggningId ?? "");
  isInfoLoading.value = false;
});
</script>

<template>
  <div>
    <f-static-field>
      <template #label>
        Kontrollera frånvaro från arbete
      </template>
      <template #tooltip>
        <f-tooltip
          screen-reader-text="Läs mer om uppgiften kontrollera frånvaro från arbete"
          header-tag="h2"
          @toggle="handleTooltipOpen"
        >
        <template #header>
          Läs mer om uppgiften "Kontrollera frånvaro från arbete"
        </template>
          <template #body>
            <span v-if="store.descriptionLoading">
              <f-loader :show="store.descriptionLoading" :delay="true" style="margin-top: 2rem !important; min-height: 6.25rem;">
                Vänligen vänta
              </f-loader>
            </span>
            <span v-else-if="store.uppgiftsbeskrivning">
              {{ store.uppgiftsbeskrivning }}
            </span>
            <span v-else-if="store.descriptionError">
              Kunde inte hämta uppgiftsbeskrivningen.
            </span>
            <span v-else>
              Ingen beskrivning tillgänglig.
            </span>
          </template>
        </f-tooltip>
      </template>
    </f-static-field>
  </div>
  <div>
    <f-loader :show="isInfoLoading" :delay="true" style="margin-top: 7rem !important; min-height: 6.25rem;">
      Vänligen vänta
    </f-loader>
    <p v-if="store.error" class="error-message">{{ store.error }}</p>
    <div v-if="!isInfoLoading && store.uppgift" class="arende-information">
      <f-static-field>
        <template #label><span>Kund</span></template>
        <template #default>
          <span>{{
            `${store.uppgift?.kund.fornamn} ${store.uppgift?.kund.efternamn}`
          }}</span>
        </template>
      </f-static-field>
      <f-static-field>
        <template #label><span>Organisationsnamn</span></template>
        <template #default>
          <span>{{
            store.uppgift?.kund.anstallning?.organisationsnamn ?? "Missing"
          }}</span>
        </template>
      </f-static-field>
      <f-static-field>
        <template #label><span>Kontaktperson</span></template>
        <template #default>
          <span>Anna Andersson</span>
        </template>
      </f-static-field>
      <f-static-field>
        <template #label><span>Telefonnummer</span></template>
        <template #default>
          <span>012 345 67 89</span>
        </template>
      </f-static-field>
      <ListaDatum />
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.875rem;
}

.output-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  & .label span {
    font-weight: bold;
  }
}

.arende-information {
  margin-bottom: 1rem;
}
</style>