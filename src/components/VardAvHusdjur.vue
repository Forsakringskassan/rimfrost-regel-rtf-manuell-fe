<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FStaticField, FTooltip, FLoader } from "@fkui/vue";
import { useProductStore } from "../stores/VAHStore";
import { fetchUppgiftInformation } from "../utils/fetchUppgiftInformation";
import { fetchUppgiftsbeskrivning } from "../utils/fetchUppgiftsbeskrivning";
import ListaDatum from "./ListaDatum.vue";

const { kundbehovsflodeId, regeltyp } = defineProps<{
  kundbehovsflodeId?: string | null;
  regeltyp: string | null;
}>();

const store = useProductStore();
const isDescriptionFetched = ref(false);

fetchUppgiftInformation(kundbehovsflodeId ?? "", regeltyp ?? "");
store.setRegeltyp(regeltyp ?? "");

const handleTooltipOpen = () => {
  if (!isDescriptionFetched.value && !store.descriptionLoading) {
    isDescriptionFetched.value = true;
    fetchUppgiftsbeskrivning("VAH");
  }
};

onMounted(() => {
  fetchUppgiftInformation(kundbehovsflodeId ?? "", regeltyp ?? "");
  store.setRegeltyp(regeltyp ?? "");
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
              <f-loader>Vänligen vänta</f-loader>
            </span>
            <span v-else-if="store.uppgiftsbeskrivning">
              {{ store.uppgiftsbeskrivning }}
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
    <div class="arende-information">
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
    </div>
    <ListaDatum />
  </div>
</template>

<style scoped>
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