<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDotGridWave, type DotGridWaveOptions } from "../../components/dot-grid-wave/DotGridWaveEngine.js";
import type { MotionController } from "../../components/dot-grid-wave/motion-runtime";
const props = defineProps<{ options?: DotGridWaveOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDotGridWave(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="dot-grid-wave" /></template>
