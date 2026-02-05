<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';

const props = defineProps<{
  regeltyp: string;
  kundbehovsflodeId: string;
}>();
</script>

<template><div><VardAvHusdjur :regeltyp="props.regeltyp" :kundbehovsflode-id="props.kundbehovsflodeId" /></div></template>

<style scoped></style>
