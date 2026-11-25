<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStatusPage, type StatusPageOptions } from "../../components/status-page/StatusPageEngine.js";
import type { MotionController } from "../../components/status-page/motion-runtime";
const props = defineProps<{ options?: StatusPageOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStatusPage(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="status-page" /></template>
