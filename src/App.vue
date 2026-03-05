<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';

const props = defineProps<{
  regeltyp: string;
  handlaggningId: string;
}>();

const regeltyp = props.regeltyp || import.meta.env.VITE_DEV_REGELTYP;
const handlaggningId = props.handlaggningId || import.meta.env.VITE_DEV_handlaggning_ID;
</script>

<template>
  <div>
    <VardAvHusdjur :regeltyp="regeltyp" :handlaggning-id="handlaggningId" />
  </div>
</template>

<style scoped></style>
