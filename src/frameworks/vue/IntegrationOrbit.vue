<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountIntegrationOrbit, type IntegrationOrbitOptions } from "../../components/integration-orbit/IntegrationOrbitEngine.js";
import type { MotionController } from "../../components/integration-orbit/motion-runtime";
const props = defineProps<{ options?: IntegrationOrbitOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountIntegrationOrbit(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="integration-orbit" /></template>
