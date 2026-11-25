<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountParallelCoords, type ParallelCoordsOptions } from "../../components/parallel-coords/ParallelCoordsEngine.js";
import type { MotionController } from "../../components/parallel-coords/motion-runtime";
const props = defineProps<{ options?: ParallelCoordsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountParallelCoords(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="parallel-coords" /></template>
