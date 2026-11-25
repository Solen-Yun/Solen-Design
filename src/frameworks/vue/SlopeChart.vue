<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSlopeChart, type SlopeChartOptions } from "../../components/slope-chart/SlopeChartEngine.js";
import type { MotionController } from "../../components/slope-chart/motion-runtime";
const props = defineProps<{ options?: SlopeChartOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSlopeChart(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="slope-chart" /></template>
