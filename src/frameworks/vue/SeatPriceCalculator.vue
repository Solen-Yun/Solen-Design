<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSeatPriceCalculator, type SeatPriceCalculatorOptions } from "../../components/seat-price-calculator/SeatPriceCalculatorEngine.js";
import type { MotionController } from "../../components/seat-price-calculator/motion-runtime";
const props = defineProps<{ options?: SeatPriceCalculatorOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSeatPriceCalculator(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="seat-price-calculator" /></template>
