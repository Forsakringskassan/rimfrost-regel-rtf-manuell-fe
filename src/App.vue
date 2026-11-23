<script setup lang="ts">
import VardAvHusdjur from './components/VardAvHusdjur.vue';
import { env } from './config/env';

const props = defineProps<{
  handlaggningId: string;
  authorization?: string | null;
}>();

const handlaggningId = props.handlaggningId || env.devHandlaggningId;
const authorization = props.authorization ?? (env.devAuthorization || null);
</script>

<template>
  <div>
    <VardAvHusdjur :handlaggning-id="handlaggningId" :authorization="authorization" />
  </div>
</template>

<style scoped></style>
