<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';

const regeltyp = import.meta.env.MOCK_REGELTYP;
const kundbehovsflodeId = import.meta.env.MOCK_KUNDBEHOVSFLODEID;
</script>

<template><div><VardAvHusdjur :regeltyp :kundbehovsflode-id /></div></template>

<style scoped></style>
