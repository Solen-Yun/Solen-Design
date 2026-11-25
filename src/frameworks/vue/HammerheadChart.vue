<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountHammerheadChart, type HammerheadChartOptions } from "../../components/hammerhead-chart/HammerheadChartEngine.js";
import type { MotionController } from "../../components/hammerhead-chart/motion-runtime";
const props = defineProps<{ options?: HammerheadChartOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountHammerheadChart(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="hammerhead-chart" /></template>
