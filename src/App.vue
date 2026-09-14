<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';
import { env } from './config/env';

const props = defineProps<{
  handlaggningId: string;
}>();

const handlaggningId = props.handlaggningId || env.devHandlaggningId;
</script>

<template>
  <div>
    <VardAvHusdjur :handlaggning-id="handlaggningId" />
  </div>
</template>

<style scoped></style>
