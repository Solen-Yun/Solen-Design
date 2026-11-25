<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountWaffleChart, type WaffleChartOptions } from "../../components/waffle-chart/WaffleChartEngine.js";
import type { MotionController } from "../../components/waffle-chart/motion-runtime";
const props = defineProps<{ options?: WaffleChartOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountWaffleChart(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="waffle-chart" /></template>
