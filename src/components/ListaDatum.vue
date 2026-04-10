<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { FButton, FFieldset, FRadioField, FValidationForm } from "@fkui/vue";
import { useProductStore } from "../stores/VAHStore";
import type { Ersattningar } from "../types";
import { setDone } from "../utils/setDone";

const store = useProductStore();

const selections = reactive<Record<string, "JA" | "NEJ" | undefined>>({});
const loading = ref(false);

watch(
  () => store.uppgift?.ersattningar,
  (ersattningar) => {
    if (ersattningar) {
      ersattningar.forEach((item: Ersattningar) => {
        if (item.beslutsutfall) {
          selections[item.ersattningId] = item.beslutsutfall as "JA" | "NEJ";
        }
      });
    }
  },
  { immediate: true },
);

function handleSubmit() {
  // Sync selections to store.uppgift.ersattning before sending
  if (store.uppgift?.ersattningar) {
    store.uppgift.ersattningar.forEach((item) => {
      if (selections[item.ersattningId]) {
        item.beslutsutfall = selections[item.ersattningId];
      }
    });
  }

  // TODO: Handle loading on submit
  setDone();
}
</script>

<template>
  <div v-if="store.uppgift?.ersattningar">
    <f-validation-form @submit.prevent="handleSubmit">
      <template #error-message>
        <p>Du har glömt fylla i något. Gå till fältet som är markerat.</p>
      </template>
      <div
        v-for="item in store.uppgift?.ersattningar"
        :key="item.ersattningId"
        class="radio-container"
      >
        <f-fieldset
          v-validation.required
          horizontal
          :name="`arende-utfall-${String(item.ersattningId)}`"
        >
          <template #label>
            <div class="ersattning-info-container">
              <div class="ersattning-info-item">
                <p>Datum:</p>
                <span>{{ item.from }}</span
                ><span v-if="item.from != item.tom"> - {{ item.tom }}</span>
              </div>
              <div class="ersattning-info-item">
                <p>Omfattning:</p>
                <span>{{ item.omfattningProcent ?? 100 }}%</span>
              </div>
            </div>
          </template>

          <template #error-message="{ hasError, validationMessage }">
            <div class="error-list">
              <p v-if="hasError">
                {{ validationMessage }}
              </p>
            </div>
          </template>

          <template #default="{ sharedName }">
            <f-radio-field
              v-model="selections[String(item.ersattningId)]"
              :name="sharedName"
              value="JA"
            >
              Godkänd
            </f-radio-field>

            <f-radio-field
              v-model="selections[String(item.ersattningId)]"
              :name="sharedName"
              value="NEJ"
            >
              Avslag
            </f-radio-field>
          </template>
        </f-fieldset>
      </div>

      <section ref="submitButton">
        <f-button type="submit" :disabled="loading">Klarmarkera</f-button>
      </section>
    </f-validation-form>
  </div>
</template>

<style scoped>
.radio-container {
  min-width: 7rem;
  max-width: 25rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 0.35rem;
  border: 1px solid black;
  padding: 1.1rem;
}

.fieldset {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}

.fieldset__label {
  flex: 0 0 auto;
}

.fieldset__content {
  flex: 1;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.button-group {
  margin-top: 2rem;
  display: flex;
  gap: 0.75rem;
}

.radio-button-group {
  margin: 0;
  display: flex;
  flex-direction: row !important;
}

.ersattning-info-container {
  display: flex;
  flex-direction: column;
  width: fit-content;
  & p {
    width: 6rem;
  }
}

.ersattning-info-item {
  display: flex;
  gap: 0.5rem;
}

.error-list {
  display: none;
}
</style>
