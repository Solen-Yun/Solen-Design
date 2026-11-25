<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountIsoBlockChart, type IsoBlockChartOptions } from "../../components/iso-block-chart/IsoBlockChartEngine.js";
import type { MotionController } from "../../components/iso-block-chart/motion-runtime";
const props = defineProps<{ options?: IsoBlockChartOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountIsoBlockChart(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="iso-block-chart" /></template>
