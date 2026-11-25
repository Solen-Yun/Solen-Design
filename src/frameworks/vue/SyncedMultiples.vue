<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSyncedMultiples, type SyncedMultiplesOptions } from "../../components/synced-multiples/SyncedMultiplesEngine.js";
import type { MotionController } from "../../components/synced-multiples/motion-runtime";
const props = defineProps<{ options?: SyncedMultiplesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSyncedMultiples(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="synced-multiples" /></template>
