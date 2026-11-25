<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSpeedGauge, type SpeedGaugeOptions } from "../../components/speed-gauge/SpeedGaugeEngine.js";
import type { MotionController } from "../../components/speed-gauge/motion-runtime";
const props = defineProps<{ options?: SpeedGaugeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSpeedGauge(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="speed-gauge" /></template>
