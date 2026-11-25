<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPrizeWheel, type PrizeWheelOptions } from "../../components/prize-wheel/PrizeWheelEngine.js";
import type { MotionController } from "../../components/prize-wheel/motion-runtime";
const props = defineProps<{ options?: PrizeWheelOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPrizeWheel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="prize-wheel" /></template>
