<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';

const props = defineProps<{
  regeltyp: string;
  kundbehovsflodeId: string;
}>();

const regeltyp = props.regeltyp || import.meta.env.VITE_MOCK_REGELTYP;
const kundbehovsflodeId = props.kundbehovsflodeId || import.meta.env.VITE_MOCK_KUNDBEHOVSFLODE_ID;
</script>

<template><div><VardAvHusdjur :regeltyp="regeltyp" :kundbehovsflode-id="kundbehovsflodeId" /></div></template>

<style scoped></style>
