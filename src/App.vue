<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';

const props = defineProps<{
  handlaggningId: string;
}>();

const handlaggningId = props.handlaggningId || import.meta.env.VITE_DEV_HANDLAGGNING_ID;
</script>

<template>
  <div>
    <VardAvHusdjur :handlaggning-id="handlaggningId" />
  </div>
</template>

<style scoped></style>
