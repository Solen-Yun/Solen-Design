<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPopulationPyramid, type PopulationPyramidOptions } from "../../components/population-pyramid/PopulationPyramidEngine.js";
import type { MotionController } from "../../components/population-pyramid/motion-runtime";
const props = defineProps<{ options?: PopulationPyramidOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPopulationPyramid(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="population-pyramid" /></template>
